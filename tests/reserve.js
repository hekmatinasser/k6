import {sleep, group, check} from 'k6'

import http from 'k6/http'

import {randomItem, url, env, info} from "../utils/k6-utils.js";

const schedules = env('schedules').split(',');

const headers = {
    "headers": {
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
        'group_duration{group:::ScheduleSeat}': ['avg < 1000'],
        'group_duration{group:::ScheduleSeatStatus}': ['avg < 1000'],
        'group_duration{group:::Reserve}': ['avg < 1500'],
    },
    scenarios: {
        ScenarioReserve: {
            executor: 'ramping-vus',
            gracefulStop: '1m',
            stages: [
                {duration: '30s', target: 200},
                {duration: '30s', target: 300},
                {duration: '60s', target: 400},
                {duration: '60s', target: 600},
                {duration: '60s', target: 350},
                {duration: '60s', target: 100},
                {duration: '30s', target: 0},
            ],
            gracefulRampDown: '1m',
            exec: 'ScenarioReserve',
        },
    },
}

export function ScenarioReserve() {

    info()

    let schedule_id = randomItem(schedules)

    let seats = [];
    let blocks = []
    let response
    let order_id

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
        // select random block
        let block = randomItem(blocks);
        let block_id = block['block_id'];

        // create object {seat_id: block_id, ...}
        let seatsBlocks = {}
        for (let key in blocks) {
            let block = blocks[key]

            for (let index in block.seats) {
                let seat_id = block.seats[index][1]
                seatsBlocks[seat_id] = block.block_id
            }
        }

        let freeSeats = [];
        for (let blockSeat in seatsBlocks) {
            if (seats[blockSeat] === 0 && seatsBlocks[blockSeat] === block_id) {
                freeSeats.push(blockSeat)
            }
        }

        if (freeSeats.length === 0) {
            console.error('fill seat in block:', block_id);
        }
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
        } else {
            order_id = null
        }
        sleep(1)

    })
}