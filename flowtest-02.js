// import { Checkbox } from 'element-ui'
import {
    sleep,
    group,
    check
} from 'k6'
import http from 'k6/http'
import randomIntBetween from "./utils/k6-utils.js";

export const options = {
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
        'group_duration{group:::Home}': ['avg < 5000'],
        'group_duration{group:::Show}': ['avg < 5000'],
        'group_duration{group:::Schedule}': ['avg < 5000'],
        'group_duration{group:::Reserve}': ['avg < 5000'],
        'group_duration{group:::Ticket}': ['avg < 5000'],
        'group_duration{group:::PDF}': ['avg < 5000'],
    },
    scenarios: {
        Scenario_1: {
            executor: 'ramping-vus',
            gracefulStop: '1s',
            stages: [{
                target: 1,
                duration: '5m'
            }],
            gracefulRampDown: '5s',
            exec: 'Scenario_1',
        },
    },
}

const Base_URL = "http://prod.irantic.com/"
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOm51bGwsImF1ZCI6bnVsbCwibmJmIjoxNjYxOTQ5NzAwLCJleHAiOjE2OTM0ODU3MDEsImlkIjo0MTIsIm1vYmlsZSI6IjA5MTczODcyNDg0IiwibmFtZSI6Ilx1MDYyN1x1MDYyZFx1MDYzM1x1MDYyN1x1MDY0NiBcdTA2MzRcdTA2MjdcdTA2YTlcdTA2MzFcdTA2Y2MgXHUwNjdlXHUwNjQ4XHUwNjMxIiwicHJvdmluY2VfaWQiOjh9.IktS9lGqWfGj3fPiH-IC5oxHTH23iBbbku6kLBBxQiQ";
const customer_id = 412
const show = "concert/45057";
const dates = [
    "api/schedule/dates?show_id=45057&place_id=18&date=2022-09-10",
    "api/schedule/dates?show_id=45057&place_id=18&date=2022-09-11",
    "api/schedule/dates?show_id=45057&place_id=18&date=2022-09-12",
    "api/schedule/dates?show_id=45057&place_id=18&date=2022-09-13",
];
// const schedules = [955973, 955955, 955958, 955960, 955963, 955966, 955969, 956072];

// const Base_URL = "http://192.168.99.207:8020/"
// // const Base_URL_Static = "http://panel.irantic.test/" // static assets from storage
// const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9pcmFudGljLnRlc3QiLCJhdWQiOiJodHRwOlwvXC9pcmFudGljLnRlc3QiLCJuYmYiOjE2NjIxMjU1MjIsImV4cCI6MTY5MzY2MTUyMywiaWQiOjMsIm1vYmlsZSI6IjA5MTczODcyNDg0IiwibmFtZSI6Ilx1MDYyN1x1MDYyZFx1MDYzM1x1MDYyN1x1MDY0NiBcdTA2MzRcdTA2MjdcdTA2YTlcdTA2MzFcdTA2Y2MgXHUwNjdlXHUwNjQ4XHUwNjMxIiwicHJvdmluY2VfaWQiOjh9.S9cm1jZHBKOPVg3zUiopHKbjZl2kwIyGGmSwzqx7G3E";
// const customer_id = 3
// const show = "concert/45003";
// const dates = [
//     "api/schedule/dates?show_id=45003&place_id=18&date=2022-09-11",
//     "api/schedule/dates?show_id=45003&place_id=18&date=2022-09-12"
// ];
// const schedules = [70, 71, 72, 73, 74, 75];

let date = dates[(Math.random() * dates.length) | 0]
// let schedule = schedules[(Math.random() * schedules.length) | 0]
let schedule = Math.floor(Math.random() * (956072 - 955973 + 1)) + 955973

let seats = [];
const blocks = [1323, 1324]

export function Scenario_1() {
    let response

    group('Home', function () {
        response = http.get(Base_URL)
        check(response, {
            'status is 200': (r) => r.status === 200,
            'Homepage has expected test': (r) =>
                r.body.includes('کنسرت قربانی'),
        });
        // response = http.get(
        //     Base_URL_Static + 'storage/dynamic/slider/Cicw83LScuZWGtIxjGz7MF6ElmP2YctP4PVWJTdI.jpg'
        // )
        response = http.get(Base_URL + 'assets/style/grids.css')
        response = http.get(Base_URL + 'assets/vue.js')
        response = http.get(Base_URL + 'assets/style/default.css?v=1811')
        response = http.get(Base_URL + 'assets/style/home.css?v=1811')
        response = http.get(Base_URL + 'assets/style/Desktop/default_1366.css?v=1811')
        response = http.get(Base_URL + 'assets/style/Desktop/home_1366.css?v=1811')
        response = http.get(Base_URL + 'assets/icons/city/unknown.svg')
        response = http.get(Base_URL + 'assets/icons/login_phone.svg')
        response = http.get(Base_URL + 'assets/icons/login_otp.svg')
        response = http.get(Base_URL + 'assets/icons/login_password.svg')
        response = http.get(Base_URL + 'assets/icons/login_forget_password.svg')
        response = http.get(Base_URL + 'assets/icons/login_change_password.svg')
        response = http.get(Base_URL + 'assets/logo/irantic_logo_light.svg?v=1')
        response = http.get(Base_URL + 'assets/images/banner_scape.jpg')
        response = http.get(Base_URL + 'assets/icons/irantic_logo_sign.svg')
        response = http.get(Base_URL + 'assets/logo/irantic_logo_light.svg')
        response = http.get(Base_URL + 'assets/icons/track_order.svg')
        response = http.get(Base_URL + 'assets/icons/faq.svg')
        response = http.get(Base_URL + 'assets/js/main.js?v=1811')
        response = http.get(Base_URL + 'assets/JsBarcode.js')
        response = http.get(Base_URL + 'assets/icons/audience_club.svg')
        response = http.get(Base_URL + 'assets/icons/toman_regular_light.svg')
        response = http.get(Base_URL + 'assets/icons/wallet.svg')
        response = http.get(Base_URL + 'assets/icons/place_holder.svg')
        response = http.get(Base_URL + 'assets/icons/movie.svg')
        response = http.get(Base_URL + 'assets/icons/theater.svg')
        response = http.get(Base_URL + 'assets/icons/concert.svg')
        response = http.get(Base_URL + 'assets/icons/game.svg')
        response = http.get(Base_URL + 'assets/fonts/Shabnam-FD.ttf', {
            headers: {
                origin: Base_URL,
            },
        })
        response = http.get(Base_URL + 'assets/fonts/irantic.ttf', {
            headers: {
                origin: Base_URL,
            },
        })
        response = http.get(Base_URL + 'assets/fonts/Shabnam-Bold-FD.ttf', {
            headers: {
                origin: Base_URL,
            },
        })
        response = http.get(Base_URL + 'assets/icons/profile.svg')
        response = http.get(Base_URL + 'assets/icons/city/all_province.svg')
        response = http.get(Base_URL + 'assets/icons/city/province_1.svg?v=1')
        response = http.get(Base_URL + 'assets/icons/city/province_2.svg?v=1')
        response = http.get(Base_URL + 'assets/icons/city/province_3.svg?v=1')
        response = http.get(Base_URL + 'assets/icons/city/province_4.svg?v=1')
        response = http.get(Base_URL + 'assets/icons/city/province_5.svg?v=1')
        response = http.get(Base_URL + 'assets/icons/city/province_6.svg?v=1')
        response = http.get(Base_URL + 'assets/icons/city/province_7.svg?v=1')
        response = http.get(Base_URL + 'assets/icons/city/province_8.svg?v=1')
        response = http.get(Base_URL + 'assets/icons/city/province_9.svg?v=1')
        response = http.get(Base_URL + 'assets/icons/city/province_10.svg?v=1')
        response = http.get(Base_URL + 'assets/icons/city/province_11.svg?v=1')
        response = http.get(Base_URL + 'assets/icons/city/province_12.svg?v=1')
        response = http.get(Base_URL + 'assets/icons/city/province_13.svg?v=1')
        response = http.get(Base_URL + 'assets/icons/city/province_14.svg?v=1')
        response = http.get(Base_URL + 'assets/icons/city/province_15.svg?v=1')
        response = http.get(Base_URL + 'assets/icons/city/province_16.svg?v=1')
        response = http.get(Base_URL + 'assets/icons/city/province_17.svg?v=1')
        response = http.get(Base_URL + 'assets/icons/city/province_18.svg?v=1')
        response = http.get(Base_URL + 'assets/icons/city/province_19.svg?v=1')
        response = http.get(Base_URL + 'assets/icons/city/province_20.svg?v=1')
        response = http.get(Base_URL + 'assets/icons/city/province_21.svg?v=1')
        response = http.get(Base_URL + 'assets/icons/city/province_22.svg?v=1')
        response = http.get(Base_URL + 'assets/icons/city/province_23.svg?v=1')
        response = http.get(Base_URL + 'assets/icons/city/province_24.svg?v=1')
        response = http.get(Base_URL + 'assets/icons/city/province_25.svg?v=1')
        response = http.get(Base_URL + 'assets/icons/city/province_26.svg?v=1')
        response = http.get(Base_URL + 'assets/icons/city/province_27.svg?v=1')
        response = http.get(Base_URL + 'assets/icons/city/province_28.svg?v=1')
        response = http.get(Base_URL + 'assets/icons/city/province_29.svg?v=1')
        response = http.get(Base_URL + 'assets/icons/city/province_30.svg?v=1')
        response = http.get(Base_URL + 'assets/icons/city/province_31.svg?v=1')
        // response = http.get(
        //     Base_URL_Static + 'storage/dynamic/slider/dkDGl9HxmkIsLvXQ0H9YgTNw153dfEbZNG4a9WGu.jpg'
        // )
        // response = http.get(
        //     Base_URL_Static + 'storage/show/show_image/Ql9BlwGFCv0lO7sYrdkQROpB4R5d3IlwTSbFaGnp.jpg'
        // )
        // response = http.get(
        //     Base_URL_Static + 'storage/show/show_image/RFMWJ0xwbTBISpPknNvRYUSZ6VMXmw0zuDuW5omz.jpg'
        // )
        // response = http.get(
        //     Base_URL_Static + 'storage/show/show_image/KWLkUHXr07GK4aJ93WxyEYPYEhlu8sBf1qZscIZA.jpg'
        // )
        response = http.get(Base_URL + 'assets/favicon/favicon-32x32.png')

        sleep(1)
    })

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
        check(response, {
            'seats-status is 200': (r) => r.status === 200,
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
            let maxSeats = freeSeats > 11 ? 11 : freeSeats
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
                'code exist': (r) => r.json().data.code > 0,
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