import {
    sleep,
    group,
    check
} from 'k6'
import http from 'k6/http'

import {randomItem, url, env} from "./utils/k6-utils.js";


const show_id = 44915;

const schedules = [4788261];

let schedule_id = schedules[0]

let seats = [];
let blocks = []
let response
let order_id


const headers = {
    "headers" : {
        "accept": "application/json",
        "authorization": `Bearer ${env('token')}`,
        "content-type": "application/json; charset=UTF-8"
    }
}

export const options = {
    insecureSkipTLSVerify: true,
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<2000'], // 95% of requests should be below 2000ms
        'group_duration{group:::ScheduleList}': ['avg < 1000'],
        'group_duration{group:::ScheduleSeat}': ['avg < 1000'],
        'group_duration{group:::ScheduleSeatStatus}': ['avg < 1000'],
        'group_duration{group:::Reserve}': ['avg < 1500'],
        'group_duration{group:::Confirm}': ['avg < 1000'],
        'group_duration{group:::Cancel}': ['avg < 1000'],
    },
    scenarios: {
        Scenario_1: {
            executor: 'ramping-vus',
            gracefulStop: '1m',
            stages: [{
                target: 100,
                duration: '1m'
            }],
            gracefulRampDown: '1m',
            exec: 'Scenario_Sell',
        },
    },
}


export function Scenario_Sell() {
    group('ScheduleList', function () {
        response = http.get(url(`api/v1/schedule?show_id=${show_id}`), headers)

        if (!check(response, {'ok': (r) => r.json().success})) {
            console.error('Unexpected response:', response.url, response.body);
        }
    })


    group('ScheduleSeat', function () {
        response = http.get(url(`api/v1/schedule/${schedule_id}/seats`), headers)
        if (!check(response, {'ok': (r) => r.json().success})) {
            console.error('Unexpected response:', response.url, response.body);
        }
        response = response.json()
        if (response.success) {
            blocks = response.data.blocks;
        }
    })


    group('ScheduleSeatStatus', function () {
        response = http.get(url(`api/v1/schedule/${schedule_id}/seats-status`), headers)
        if (!check(response, {'ok': (r) => r.json().success})) {
            console.error('Unexpected response:', response.url, response.body);
        }
        response = response.json()
        if (response.success) {
            seats = response.data;
        }
    })


    group('Reserve', function () {

        let block = randomItem(blocks); // random block
        let block_id = block['block_id'];

        let blocksSeats = {}
        for (let key in blocks) {
            let block = blocks[key]

            for (let index in block.seats) {
                let seat = block.seats[index]
                blocksSeats[seat[1]] = block.block_id // create object {seat_id: block_id}
            }
        }

        let freeSeats = [];
        for (let blockSeat in blocksSeats) {
            if (seats[blockSeat] === 0 && blocksSeats[blockSeat] === block_id) {
                freeSeats.push(blockSeat)
            }
        }

        if (freeSeats.length) {
            let maxSeats = Math.min(freeSeats.length, 2)
            let randSeats = []
            for (let i = 0; i < Math.random() * maxSeats; i++) {
                randSeats.push(randomItem(freeSeats))
            }

            let payload = JSON.stringify({
                "seat_ids": randSeats,
                "schedule_id": schedule_id,
                "block_id": block_id
            });

            response = http.post(url('api/v1/order/reserve'), payload, headers)
            if (!check(response, {'ok': (r) => r.json().success})) {
                console.error('Unexpected response:', response.url, payload, response.body);
            }

            response = response.json()
            if (response.success) {
                order_id = response.data.order_id
            }
            else {
                order_id = null
            }
            sleep(1)
        } else {
            console.error('empty seat in block:', block_id);
        }
    })

    if (order_id) {
        group('Confirm', function () {
            let payload = JSON.stringify({
                "order_id": order_id,
                "seller_final_price" : 0
            });
            response = http.post(url('api/v1/order/success'), payload, headers)
            if (!check(response, {'ok': (r) => r.json().success})) {
                console.error('Unexpected response:', response.url, payload, response.body);
            }
        })

        group('Cancel', function () {
            response = http.get(url(`api/v1/order/${order_id}/cancel`), headers)
            if (!check(response, {'ok': (r) => r.json().success})) {
                console.error('Unexpected response:', response.url, response.body);
            }
        })
    }
}