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
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<1000'], // 95% of requests should be below 500ms
        http_req_waiting: ['p(95)<5000'],
        'group_duration{group:::Home}': ['avg < 5000'],
        'group_duration{group:::Show}': ['avg < 5000'],
        'group_duration{group:::Schedule}': ['avg < 5000'],
        'group_duration{group:::Reserve}': ['avg < 5000'],
        'group_duration{group:::Ticket}': ['avg < 5000'],
        'group_duration{group:::PDF}': ['avg < 5000'],
    },
    scenarios: {
        Scenario_Home: {
            executor: 'ramping-vus',
            gracefulStop: '1m',
            stages: [{
                target: 1000,
                duration: '5m'
            }],
            gracefulRampDown: '1m',
            exec: 'Scenario_Home',
        },
        Scenario_Schedule: {
            executor: 'ramping-vus',
            gracefulStop: '1m',
            stages: [{
                target: 1000,
                duration: '5m'

            }],
            gracefulRampDown: '2m',
            exec: 'Scenario_Schedule',
        },
        Scenario_Reserve: {
            executor: 'ramping-vus',
            gracefulStop: '1m',
            stages: [{
                target: 1000,
                duration: '10m'
            }],
            gracefulRampDown: '2m',
            exec: 'Scenario_Reserve',
        },
    },
}

const Base_URL = "https://prod.irantic.com/"
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOm51bGwsImF1ZCI6bnVsbCwibmJmIjoxNjY5NjQ0MDQ0LCJleHAiOjE3MDExODAwNDUsImlkIjo0MTIsIm1vYmlsZSI6IjA5MTczODcyNDg0IiwibmFtZSI6Ilx1MDYyN1x1MDYyZFx1MDYzM1x1MDYyN1x1MDY0NiBcdTA2MzRcdTA2MjdcdTA2YTlcdTA2MzFcdTA2Y2MgXHUwNjdlXHUwNjQ4XHUwNjMxIiwicHJvdmluY2VfaWQiOjh9.owffk0e5kVRQVjq9nRhDgxtX_J7s9_QKo5855fWqmoQ";
const customer_id = 412
const show = "concert/45057";
const dates = [
    "api/schedule/dates?show_id=45125&place_id=1169&date=2022-12-03",
    "api/schedule/dates?show_id=45125&place_id=1169&date=2022-12-04"
];
const schedules = [1102725, 1102728, 1102731, 1102734, 1102737, 1102740, 1102743, 1102746];

let date = dates[(Math.random() * dates.length) | 0]
let schedule = schedules[(Math.random() * schedules.length) | 0]

let seats = [];
let response
const blocks = [44436]

export function Scenario_Home() {
    group('Home', function () {
        response = http.get(Base_URL)
        check(response, {
            'status is 200': (r) => r.status === 200,
            'Homepage has expected test': (r) =>
                r.body.includes('تست ایرانتیک'),
        });
        getStaticResources(Base_URL);
        sleep(1)
    })
}
export function Scenario_Schedule() {
    group('Show',
        function () {
            response = http.get(Base_URL + show)
            check(response, {
                'Show status is 200': (r) => r.status === 200,
            });
            sleep(0.3)
            response = http.get(
                Base_URL + date, {
                    headers: {
                        accept: 'application/json',
                        authorization: 'Bearer ' + token,
                    },
                }
            )
            check(response, {
                'Date status is 200': (r) => r.status === 200,
            });
            sleep(0.3)
        }
    )
}
export function Scenario_Reserve() {
    group('Schedule', function () {
        response = http.get(Base_URL + 'schedule/' + schedule)
        check(response, {
            'Schedule status is 200': (r) => r.status === 200,
        });
        sleep(1)

        response = http.get(Base_URL + 'api/user/wallet', {
            headers: {
                accept: 'application/json',
                authorization: 'Bearer ' + token,
            },
        })
        check(response, {
            'Wallet status is 200': (r) => r.status === 200,
        });

        response = http.get(
            Base_URL + date, {
                headers: {
                    accept: 'application/json',
                    authorization: 'Bearer ' + token,
                },
            }
        )
        check(response, {
            'Date status is 200': (r) => r.status === 200,
        });

        seats = http.get(Base_URL + 'api/schedule/' + schedule + '/seats-status')
        check(seats, {
            'seats-status is 200': (s) => s.status === 200,
            'seats-status success is true': (s) => s.json().success === true,
        });
        seats = seats.json().data;
        sleep(1)
    })
    let order_id = null;
    group('Reserve', function () {
        let freeSeats = Object.entries(seats).filter(([key, value]) => value === 0);
        let keys = Object.keys(freeSeats)
        if (freeSeats.length) {
            let maxSeats = freeSeats.length > 11 ? 11 : freeSeats.length
            let randSeats = []
            for (let i = 1; i < Math.random() * maxSeats; i++) {
                let randIndex = Math.floor(Math.random() * keys.length)
                let randKey = keys[randIndex]
                randSeats.push(freeSeats[randKey][0])
            }

            response = http.post(
                Base_URL + 'api/order/reserve',
                `{"seat_ids":[${randSeats}],"schedule_id":"${schedule}","block_ids":{"${blocks[0]}":0,"${blocks[1]}":0},"use_wallet":0,"gateway":"ir_sep_shiraz"}`, {
                    headers: {
                        accept: 'application/json',
                        authorization: 'Bearer ' + token,
                        'content-type': 'application/json; charset=UTF-8',
                    },
                }
            )
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
        group('Ticket', function () {
            response = http.get(Base_URL + `api/order/${order_id}`, {
                headers: {
                    accept: 'application/json',
                    authorization: 'Bearer ' + token,
                    'content-type': 'application/json; charset=UTF-8',
                }
            })
            check(response, {
                'status is 200': (r) => r.status === 200,
                // 'code exist': (r) => r.json().data.code > 0,
            });
            sleep(1)
        })

        group('PDF', function () {
            response = http.get(Base_URL + `print?url=${order_id + customer_id}_${order_id}`)
            check(response, {
                'status is 200': (r) => r.status === 200,
                'body size is larger than 5KB': (r) => r.body.length > 5000,
            });
        })
    }
}