import {group, check} from 'k6'

import http from 'k6/http'

import {randomItem, url, env, environment} from "../utils/k6-utils.js";

const schedules = env('schedules');
const schedule_id = randomItem(schedules)

const headers = {
    "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${env('token')}`,
        "content-type": "application/json; charset=UTF-8"
    }
}
export function setup() {

    console.info(`environment: ${environment()}`);
    console.info(`base url: ${env('baseUrl')}\n`);

    let data = {
        'seats': {},
        'blocks': {},
    };

    let response = http.get(url(`api/v1/schedule/${schedule_id}/seats-status`), headers)
    let json = response.json()
    if(json.success) {
        data.seats = json.data;
    }

    response = http.get(url(`api/v1/schedule/${schedule_id}/seats`), headers)
    json = response.json()
    if(json.success) {
        let blocks = json.data.blocks;
        for (let key in blocks) {
            let block = blocks[key]

            for (let index in block.seats) {
                let seat_id = block.seats[index][1]
                data['blocks'][seat_id] = block.block_id
            }
        }

    }

    return data;
}

export const options = {
    insecureSkipTLSVerify: true,
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<2000'], // 95% of requests should be below 2000ms
        'group_duration{group:::Reserve}': ['avg < 1500'],
    },
    scenarios: {
        ScenarioReserve: {
            executor: 'ramping-vus',
            gracefulStop: '1m',
            stages: [
                {duration: '10s', target: 1000},
            ],
            gracefulRampDown: '1m',
            exec: 'ScenarioReserve',
        },
    },
}

export function ScenarioReserve(data) {

    let response, json, order_id
    group('Reserve', function () {
        // select random block
        let block_id = randomItem(Object.values(data.blocks));


        let freeSeats = [];
        for (let seat_id in data.seats) {
            if (data.seats[seat_id] === 0 && data.blocks[seat_id] === block_id) {
                freeSeats.push(seat_id)
            }
        }

        if (freeSeats.length === 0) {
            console.error('sold all seat in block:', block_id);
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
        json = response.json()
        check(response, {'ok': () => json.success})
        if (json.success) {
            let order_id = json.data.order_id
            let final_price = json.data.final_price
            if (order_id) {
                group('Confirm', function () {
                    payload = JSON.stringify({
                        "seller_final_price": final_price,
                        "order_id": order_id
                    });
                    response = http.post(url('api/v1/order/success'), payload, headers)
                   check(response, {'ok': (r) => r.json().success})
                })
            }
        }
    })
}