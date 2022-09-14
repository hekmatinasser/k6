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
        http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
        // 'group_duration{group:::Home}': ['avg < 5000'],
        // 'group_duration{group:::Show}': ['avg < 5000'],
        'group_duration{group:::Confirm}': ['avg < 300'],
        'group_duration{group:::Reserve}': ['avg < 300'],
        'group_duration{group:::ScheduleList}': ['avg < 300'],
        'group_duration{group:::ScheduleSeat}': ['avg < 300'],
        'group_duration{group:::ScheduleSeatStatus}': ['avg < 300'],
        // 'group_duration{group:::Ticket}': ['avg < 5000'],
        // 'group_duration{group:::PDF}': ['avg < 5000'],
    },
    scenarios: {
        // Scenario_1: {
        //     executor: 'ramping-vus',
        //     gracefulStop: '1m',
        //     stages: [{
        //         target: 5000,
        //         duration: '5m'
        //     }],
        //     // gracefulRampDown: '5m',
        //     exec: 'Scenario_Home',
        // },
        // Scenario_2: {
        //     executor: 'ramping-vus',
        //     gracefulStop: '2m',
        //     stages: [{
        //         target: 3000,
        //         duration: '2m'

        //     }],
        //     gracefulRampDown: '5m',
        //     exec: 'Scenario_Schedule',
        // },
        Scenario_3: {
            executor: 'ramping-vus',
            gracefulStop: '1s',
            stages: [{
                target: 1,
                duration: '1s'
            }],
            // gracefulRampDown: '5m',
            exec: 'Scenario_Order',
        },
    },
}

const Base_URL = "http://prod-order.irantic.com/"
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpcmFudGljLmNvbSIsImlkIjoxLCJ0aXRsZSI6Itin24zYsdin2YbYqtuM2qkiLCJpcHMiOltdfQ.s5I3VwlD0z_ZOIgbAaeom_aRjWt0zQCZSUnM6DP2e6FxbKicS1jJDdpb0EZT6tVubElyuNanzfIcFnTwBr9Fkw";
const customer_id = 412
const show = "concert/45057";
const show_id = 45057;
const dates = [
    "api/schedule/dates?show_id=45057&place_id=18&date=2022-09-10",
    "api/schedule/dates?show_id=45057&place_id=18&date=2022-09-11",
    "api/schedule/dates?show_id=45057&place_id=18&date=2022-09-12",
    "api/schedule/dates?show_id=45057&place_id=18&date=2022-09-13",
    "api/schedule/dates?show_id=45057&place_id=18&date=2022-09-14",
];
const schedules = [956145, 956148, 956151, 956154, 956157, 956160, 956163, 956121, 956124, 956127, 956130, 956133, 956136, 956139, 956142, 956097, 956100, 956103, 956106, 956109, 956112, 956115, 956118, 956073, 956076, 956079, 956082, 956085, 956088, 956091, 956094, 956166, 956169, 956172, 956175, 956178, 956181, 956184];

// const Base_URL = "http://192.168.99.207:8020/"
// // const Base_URL_Static = "http://panel.irantic.test/" // static assets from storage
// const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9pcmFudGljLnRlc3QiLCJhdWQiOiJodHRwOlwvXC9pcmFudGljLnRlc3QiLCJuYmYiOjE2NjIxMjU1MjIsImV4cCI6MTY5MzY2MTUyMywiaWQiOjMsIm1vYmlsZSI6IjA5MTczODcyNDg0IiwibmFtZSI6Ilx1MDYyN1x1MDYyZFx1MDYzM1x1MDYyN1x1MDY0NiBcdTA2MzRcdTA2MjdcdTA2YTlcdTA2MzFcdTA2Y2MgXHUwNjdlXHUwNjQ4XHUwNjMxIiwicHJvdmluY2VfaWQiOjh9.S9cm1jZHBKOPVg3zUiopHKbjZl2kwIyGGmSwzqx7G3E";
// const customer_id = 3
// const show = "concert/45003";
// const dates = [
//     "api/schedule/dates?show_id=45003&place_id=18&date=2022-09-11",
//     "api/schedule/dates?show_id=45003&place_id=18&date=2022-09-12"
// ];
// const schedules = [70, 71, 72, 73, 74, 75]Scenario_Reserve;

let date = dates[(Math.random() * dates.length) | 0]
let schedule = schedules[(Math.random() * schedules.length) | 0]
// let schedule = Math.floor(Math.random() * (956072 - 955973 + 1)) + 955973

let seats = [];
let response
const blocks = [1323, 1324]

export function Scenario_Home() {
    group('Home', function () {
        response = http.get(Base_URL)
        check(response, {
            'status is 200': (r) => r.status === 200,
            // 'Homepage has expected test': (r) =>
            //     r.body.includes('کنسرت قربانی'),
        });
        // getStaticResources();
        // sleep(1)
    })
}
export function Scenario_Schedule() {
    group('Show',
        function () {
            response = http.get(Base_URL + show)
            check(response, {
                'Show status is 200': (r) => r.status === 200,
            });
            sleep(1)
            // response = http.get(
            //     Base_URL_Static + 'storage/show/banner/m3Wssl7mNLURxFFNBhvT2IOye6ioTyJpDqrdhPZP.jpg'
            // )
            // response = http.get(
            //     Base_URL_Static + 'storage/place/place_image/kGX4TdGDQIR46aDfOb5STgrQd85met4NFX5ynz7Y.jpeg'
            // )
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
            // 'seats-status success is true': (s) => s.json().success === true,
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
            for (let i = 0; i < Math.random() * maxSeats; i++) {
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
                'body size is larger than 50KB': (r) => r.body.length > 100000,
            });
        })
    }
}
export function Scenario_Static() {
    getStaticResources(Base_URL);
}
export function Scenario_Order() {
    group('ScheduleList', function () {
        response = http.get(Base_URL + `schedule?show_id=${show_id}&seller_id=1`)
        check(response, {
            'ScheduleList status is 200': (r) => r.status === 200,
        });
    })

    group('ScheduleSeat', function () {
        seats = http.get(Base_URL + `schedule/${schedule}/seats&seller_id=1`)

        check(seats, {
            'ScheduleSeat status is 200': (s) => s.status === 200,
        });
    })

    group('ScheduleSeatStatus', function () {
        seats = http.get(Base_URL + `schedule/${schedule}/seats_status&seller_id=1`)
        console.log(seats);
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
                Base_URL + 'order/reserve',
                `{"seller_id":"1","seat_ids":[${randSeats}],"schedule_id":"${schedule}","block_id":"1323"}`
            )

            if (response.json().success === false) {

                response = http.post(
                    Base_URL + 'order/reserve',
                    `{"seller_id":"1","seat_ids":[${randSeats}],"schedule_id":"${schedule}","block_id":"1324"}`, {
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
                Base_URL + 'order/confirm',
                `{"seller_id":"1","order_id":${order_id}}`, {
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
            seats = seats.json().data;
        })
    }
}