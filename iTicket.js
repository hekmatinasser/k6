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
        http_req_waiting: ['p(95)<2000'],
        // 'group_duration{group:::Login}': ['avg < 2000'],
        'group_duration{group:::Home}': ['avg < 3000'],
        'group_duration{group:::Show & Schedule}': ['avg < 3000'],
        'group_duration{group:::Seat}': ['avg < 3000'],
        'group_duration{group:::Reserve}': ['avg < 3000'],
        // 'group_duration{group:::Ticket}': ['avg < 2000'],
        // 'group_duration{group:::PDF}': ['avg < 2000'],
    },
    scenarios: {
        // Scenario_Login: {
        //     executor: 'ramping-vus',
        //     gracefulStop: '1s',
        //     stages: [{
        //         target: 1,
        //         duration: '2s'

        //     }],
        //     gracefulRampDown: '1s',
        //     exec: 'Scenario_Login',
        // },
        Scenario_Home: {
            executor: 'ramping-vus',
            gracefulStop: '5s',
            stages: [{
                target: 1000,
                duration: '10m'
            }],
            gracefulRampDown: '5s',
            exec: 'Scenario_Home',
        },
        Scenario_Schedule: {
            executor: 'ramping-vus',
            gracefulStop: '5s',
            stages: [{
                target: 1000,
                duration: '10m'

            }],
            gracefulRampDown: '5s',
            exec: 'Scenario_Schedule',
        },
        // Scenario_Reserve: {
        //     executor: 'ramping-vus',
        //     gracefulStop: '1s',
        //     stages: [{
        //         target: 1,
        //         duration: '4s'
        //     }],
        //     gracefulRampDown: '1s',
        //     exec: 'Scenario_Reserve',
        // },

    },
}

const Base_URL = "https://prod-api.iticket.ir/api/"
const show_id = 88;
const mobile = '09173872484';
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOm51bGwsImF1ZCI6bnVsbCwibmJmIjoxNjczMTc1ODc0LCJleHAiOjE3MDQ3MTE4NzUsImlkIjo0LCJtb2JpbGUiOiIwOTE3Mzg3MjQ4NCIsIm5hbWUiOiJcdTA2MjdcdTA2MmRcdTA2MzNcdTA2MjdcdTA2NDYiLCJwcm92aW5jZV9pZCI6OH0.oLxaCNiPB15HYNMbe8weFxzQyNpkNxEmH4WZKph1kuA";
// const customer_id = 4

let dates;
let date;
let places;
let place;
let schedules;
let seats;
let seats_status;

let response;
let checkOutput;
const blocks = [3]

export function Scenario_Home() {
    group('Home', function () {
        response = http.get(Base_URL + 'v2')
        check(response, {
            'status is 200': (r) => r.status === 200
        });
        response = response.json();
        check(response, {
            'success is true': (r) => r.success === true,
            'meta title is correct': (r) => r.data.metas.title === 'آی تیکت',
            'popular show exist': (r) => r.data.popular.length > 0
        });
        // getStaticResources(Base_URL);
        sleep(1)
    })
}
export function Scenario_Schedule() {

    let schedule_id;
    group('Show & Schedule',
        function () {
            response = http.get(Base_URL + `v2/show/places-dates/${show_id}`)
            checkOutput = check(response, {
                'status is 200': (r) => r.status === 200
            });
            response = response.json();
            checkOutput = check(response, {
                'success is true': (r) => r.success === true,
                'dates received': (r) => r.data.dates.length > 0,
                'places received': (r) => r.data.places.length > 0,
            });
            if (!checkOutput) {
                fail('unexpected response');
            }

            dates = response.data.dates;
            date = dates[(Math.random() * dates.length) | 0].date;
            places = response.data.places;
            place = places[(Math.random() * places.length) | 0].id;

            let _schedules = http.get(Base_URL +
                `schedule/dates?date=${date}&show_id=${show_id}&place_id=${place}`)
            checkOutput = check(_schedules, {
                'schedules status is 200': (s) => s.status === 200
            });

            _schedules = _schedules.json();
            checkOutput = check(_schedules, {
                'success is true': (s) => s.success === true,
                'code is 20000': (s) => s.code === 20000,
                'schedules data received': (s) => s.data.length > 0
            });

            if (!checkOutput) {
                fail('unexpected response');
            }
            schedules = _schedules.data;
            schedule_id = schedules[(Math.random() * schedules.length) | 0].id;

        }
    )

    let _seats = null;
    let _seats_status = null;
    group('Seat', function () {
        _seats = http.get(Base_URL + `v2/schedule/${schedule_id}/seats`)
        checkOutput = check(_seats, {
            'seats is 200': (s) => s.status === 200,
        });
        if (!checkOutput) {
            fail('unexpected response');
        }
        seats = _seats.json().data;

        _seats_status = http.get(Base_URL + `schedule/${schedule_id}/seats-status`)

        checkOutput = check(_seats_status, {
            'seats_status is 200': (s) => s.status === 200,
        });
        if (!checkOutput) {
            console.log(`schedule_id: ${schedule_id}`);
        }
        seats_status = _seats_status.json().data;
        // response = http.get(Base_URL + 'api/user/wallet', {
        //     headers: {
        //         accept: 'application/json',
        //         authorization: 'Bearer ' + token,
        //     },
        // })
        // check(response, {
        //     'Wallet status is 200': (r) => r.status === 200,
        // });

        // response = http.get(
        //     Base_URL + date, {
        //         headers: {
        //             accept: 'application/json',
        //             authorization: 'Bearer ' + token,
        //         },
        //     }
        // )
        // check(response, {
        //     'Date status is 200': (r) => r.status === 200,
        // });
        sleep(1)
    })
    let order_id = null;

    group('Reserve', function () {
        if (seats_status) {
            let freeSeats = Object.entries(seats_status).filter(([key, value]) => value === 0);
            let keys = Object.keys(freeSeats)
            if (freeSeats.length) {
                let maxSeats = (freeSeats.length > 11 ? 11 : freeSeats.length) * Math.random();
                let randSeats = [];
                for (let i = 1; i < maxSeats; i++) {
                    let randIndex = Math.floor(Math.random() * keys.length)
                    let randKey = keys[randIndex]
                    randSeats.push(freeSeats[randKey][0])
                }
                
                response = http.post(
                    Base_URL + 'order/reserve',
                    `{"seat_ids":[${randSeats}],"schedule_id":"${schedule_id}","block_ids":{"${blocks[0]}":0},"use_wallet":0,"gateway":"ir_pec"}`, {
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
                    'reserve has been succeed': (r) => r.success === true,
                    'order is free': (r) => r.code === 20002
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
        }
    })
}

export function Scenario_Reserve() {


    // if (order_id) {
    //     group('Ticket', function () {
    //         response = http.get(Base_URL + `api/order/${order_id}`, {
    //             headers: {
    //                 accept: 'application/json',
    //                 authorization: 'Bearer ' + token,
    //                 'content-type': 'application/json; charset=UTF-8',
    //             }
    //         })
    //         check(response, {
    //             'status is 200': (r) => r.status === 200,
    //             // 'code exist': (r) => r.json().data.code > 0,
    //         });
    //         sleep(1)
    //     })

    //     group('PDF', function () {
    //         response = http.get(Base_URL + `print?url=${order_id + customer_id}_${order_id}`)
    //         check(response, {
    //             'status is 200': (r) => r.status === 200,
    //             'body size is larger than 5KB': (r) => r.body.length > 5000,
    //         });
    //     })
    // }
}

export function Scenario_Login() {
    group('Login',
        function () {
            const payload = JSON.stringify({
                mobile: mobile
            });
            const params = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            response = http.post(Base_URL + 'login/request', payload, params);
            check(response, {
                'status is 200': (r) => r.status === 200,
                'success is true': (r) => r.json().success === true,
            });
        }
    )
}

function fail(message) {
    console.log(message);
}