// import { Checkbox } from 'element-ui'
import {
    sleep,
    group,
    check
} from 'k6'
import http from 'k6/http'
import randomIntBetween from "./utils/k6-utils.js";
import {
    getStaticResources
} from './modules/static-resources.js';

export const options = {
    insecureSkipTLSVerify: true,
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<3000'], // 95% of requests should be below 500ms
        // 'group_duration{group:::Home}': ['avg < 5000'],
        // 'group_duration{group:::Show}': ['avg < 5000'],
        'group_duration{group:::Confirm}': ['avg < 1000'],
        'group_duration{group:::Reserve}': ['avg < 1000'],
        'group_duration{group:::ScheduleList}': ['avg < 1000'],
        'group_duration{group:::ScheduleSeat}': ['avg < 1000'],
        'group_duration{group:::ScheduleSeatStatus}': ['avg < 1000'],
        // 'group_duration{group:::Ticket}': ['avg < 5000'],
        // 'group_duration{group:::PDF}': ['avg < 5000'],
    },
    scenarios: {
        Scenario_1: {
            executor: 'ramping-vus',
            gracefulStop: '1m',
            stages: [{
                target: 10,
                duration: '2m'
            }],
            gracefulRampDown: '1m',
            exec: 'Scenario_Seller',
        },
    },
}

const Base_URL = "https://stage-seller.samfaa.ir/"
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzYW1mYWEuaXIiLCJpZCI6MjM2MywidGl0bGUiOiJpVGlja2V0IiwiaXBzIjpbIjE5My4xNTEuMTMyLjE5MiJdfQ.tNF9GhWoqKU5Z6oLSvzwTsfFuvJ3WR7fwEBFJACk2GqE_Z1aNQiAyruFLI66IfBXOeewlqsdxQwYFbW55vSgaQ";

const show_id = 44915;

const schedules = [4788261];

let schedule = schedules[0]


let seats = [];
let response
const blocks = [44833]

export function Scenario_Seller() {
    group('ScheduleList', function () {
        response = http.get(Base_URL + `api/v1/schedule?show_id=${show_id}`, {
            headers: {
                accept: 'application/json',
                authorization: 'Bearer ' + token,
                'content-type': 'application/json; charset=UTF-8',
            },
        })
        check(response, {
            'ScheduleList status is 200': (r) => r.status === 200,
        });
    })

    group('ScheduleSeat', function () {
        seats = http.get(Base_URL + `api/v1/schedule/${schedule}/seats`, {
            headers: {
                accept: 'application/json',
                authorization: 'Bearer ' + token,
                'content-type': 'application/json; charset=UTF-8',
            },
        })

        check(seats, {
            'ScheduleSeat status is 200': (s) => s.status === 200,
        });
    })

    group('ScheduleSeatStatus', function () {
        seats = http.get(Base_URL + `api/v1/schedule/${schedule}/seats-status`, {
            headers: {
                accept: 'application/json',
                authorization: 'Bearer ' + token,
                'content-type': 'application/json; charset=UTF-8',
            },
        })
        check(seats, {
            'ScheduleSeatStatus is 200': (s) => s.status === 200,
            // 'seats-status success is true': (s) => s.json().success === true,
        });
        seats = seats.json().data;
    })

    let order_id = null;
    group('Reserve', function () {
        let freeSeats = Object.entries(seats).filter(([key, value]) => value === 0);
        let keys = Object.keys(freeSeats)
        if (freeSeats.length) {
            let maxSeats = freeSeats.length > 11 ? 11 : freeSeats.length
            let randSeats = []
            for (let i = 0; i < Math.random() * maxSeats; i++) {
                let randIndex = Math.floor(Math.random() * keys.length)
                let randKey = keys[randIndex]
                randSeats.push(freeSeats[randKey][0])
            }

            response = http.post(
                Base_URL + 'api/v1/order/reserve',
                `{"seat_ids":[${randSeats}],"schedule_id":"${schedule}","block_id":"44833"}`, {
                    headers: {
                        accept: 'application/json',
                        authorization: 'Bearer ' + token,
                        'content-type': 'applicatiنon/json; charset=UTF-8',
                    },
                }
            )

            if (response.json().success === false) {

                response = http.post(
                    Base_URL + 'api/v1/order/reserve',
                    `{"seat_ids":[${randSeats}],"schedule_id":"${schedule}","block_id":"44833"}`, {
                        headers: {
                            accept: 'application/json',
                            authorization: 'Bearer ' + token,
                            'content-type': 'application/json; charset=UTF-8',
                        },
                    }
                )
            }

            check(response, {
                'order/reserve status is 200': (r) => r.status === 200,
            });

            response = response.json()
            check(response, {
                'reserve has been succeed': (r) => r.success === true
            });
            if (response.success) {
                check(response, {
                    'order_id is not NULL': (r) => r.data.order_id > 0,
                    'order_code is not NULL': (r) => r.data.code > 0,
                });
                order_id = response.data.order_id
            }
            sleep(1)
        }
    })
    if (order_id) {
        group('Confirm', function () {
            response = http.post(
                Base_URL + 'api/v1/order/success',
                `{"order_id":${order_id}}`, {
                    headers: {
                        accept: 'application/json',
                        authorization: 'Bearer ' + token,
                        'content-type': 'application/json; charset=UTF-8',
                    },
                }
            )
            check(seats, {
                'seats-status is 200': (s) => s.status === 200,
                // 'seats-status success is true': (s) => s.json().success === true,
            });
            // seats = seats.json().data;
        })
    }
}