import {
    sleep,
    group,
    check
} from 'k6'
import http from 'k6/http'
import {randomItem} from "./utils/k6-utils.js";


const Base_URL = "https://stage-seller.samfaa.ir/"
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzdGFnZS1zYW1mYWEuaXIiLCJpZCI6MiwidGl0bGUiOiLYs9uM2YbZhdin2KrbjNqp2KoiLCJpcHMiOlsiNzcuMjM4LjEyMy4yMjYiLCI3Ny4yMzguMTIzLjI0MyIsIjE4NS4xNDcuMTc2LjEzOSJdfQ.jvdPKl6uUwm3Tn1Oa8J5rAyx6DOBEl9yCJXJevtXSgKiuMHXn8i4yDtEvO2fgYzvJsyBYw_MfOp2w9OA2eGKJg";

const show_id = 44915;

const schedules = [4788261];

let schedule_id = schedules[0]

let seats = [];
let blocks = []
let response
let order_id

const headers = {
    accept: 'application/json',
    authorization: `Bearer ${token}`,
    'content-type': 'application/json; charset=UTF-8',
};

export const options = {
    insecureSkipTLSVerify: true,
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<3000'], // 95% of requests should be below 500ms
        'group_duration{group:::ScheduleList}': ['avg < 1000'],
        'group_duration{group:::ScheduleSeat}': ['avg < 1000'],
        'group_duration{group:::ScheduleSeatStatus}': ['avg < 1000'],
        'group_duration{group:::Reserve}': ['avg < 1000'],
    },
    scenarios: {
        Scenario_1: {
            executor: 'ramping-vus',
            gracefulStop: '1m',
            stages: [{
                target: 10,
                duration: '10s'
            }],
            gracefulRampDown: '1m',
            exec: 'Scenario_Sell',
        },
    },
}

export function Scenario_Sell() {
    group('ScheduleList', function () {
        response = http.get(Base_URL + `api/v1/schedule?show_id=${show_id}`, {headers})
        check(response, {
            'ScheduleList status is 200': (r) => r.status === 200,
        });
    })


    group('ScheduleSeat', function () {
        response = http.get(Base_URL + `api/v1/schedule/${schedule_id}/seats`, {headers})
        check(response, {
            'ScheduleSeat status is 200': (s) => s.status === 200,
        });
        response = response.json()
        if (response.success) {
            blocks = response.data.blocks;
        }
    })


    group('ScheduleSeatStatus', function () {
        response = http.get(Base_URL + `api/v1/schedule/${schedule_id}/seats-status`, {headers})
        check(response, {
            'ScheduleSeatStatus is 200': (s) => s.status === 200,
        });
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
                blocksSeats[seat[1]] = block_id // create object {seat_id: block_id}
            }
        }

        let freeSeats = [];
        for (let blockSeat in blocksSeats) {
            if (seats[blockSeat] === 0) {
                freeSeats.push(seats[blockSeat])
            }
        }

        if (freeSeats.length) {
            let maxSeats = Math.min(freeSeats.length, 2)
            let randSeats = []
            for (let i = 0; i < Math.random() * maxSeats; i++) {
                randSeats.push(randomItem(freeSeats))
            }

            response = http.post(
                Base_URL + 'api/v1/order/reserve',
                `{"seat_ids":[${randSeats}],"schedule_id":"${schedule_id}","block_id":"44254"}`, {headers}
            )

            check(response, {
                'order/reserve status is 200': (r) => r.status === 200,
            });
            if (!check(response, {'ScheduleList status is 200': (r) => r.status === 200})) {
                console.error('Unexpected response:', response.status, response.body);
            }

            response = response.json()
            if (response.success) {
                order_id = response.data.order_id
            }
            sleep(1)
        } else {
            console.error('empty seat in block:', block_id);
        }
    })
}