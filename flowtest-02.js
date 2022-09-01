// import { Checkbox } from 'element-ui'
import {
    sleep,
    group
} from 'k6'
import http from 'k6/http'
import randomIntBetween from "./utils/k6-utils.js";

export const options = {
    thresholds: {},
    scenarios: {
        Scenario_1: {
            executor: 'ramping-vus',
            gracefulStop: '1s',
            stages: [{
                    target: 5,
                    duration: '20s'
                },
                // {
                //     target: 20,
                //     duration: '3m30s'
                // },
                // {
                //     target: 0,
                //     duration: '1m'
                // },
            ],
            // gracefulRampDown: '5s',
            exec: 'Scenario_1',
        },
    },
}
const Base_URL = "http://prod.irantic.com/"
// const Base_URL_Static = "http://panel.irantic.test/" // static assets from storage
const token = "";
const show = "concert/45057";
const dates = [
    "api/schedule/dates?show_id=45057&place_id=18&date=2022-09-06",
    "api/schedule/dates?show_id=45057&place_id=18&date=2022-09-07"
];
let date = dates[(Math.random() * dates.length) | 0]
const schedules = [955952, 955955, 955958, 955960, 955963, 955966];
let schedule = schedules[(Math.random() * schedules.length) | 0]
let seats = [];

export function Scenario_1() {
    let response

    group('Home - ' + Base_URL, function () {
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
            sleep(0.3)
        }
    )

    group('Schedule', function () {
        response = http.get(Base_URL + 'schedule/' + schedule)
        sleep(1)
        response = http.get(Base_URL + 'api/user/wallet', {
            headers: {
                accept: 'application/json',
                authorization: 'Bearer ' + token,
            },
        })
        response = http.get(
            Base_URL + date, {
                headers: {
                    accept: 'application/json',
                    authorization: 'Bearer ' + token,
                },
            }
        )
        seats = http.get(Base_URL + 'api/schedule/' + schedule + '/seats-status')
        seats = seats.json().data;
        // check()

        sleep(1)
    })

    group('Reserve', function () {
        let freeSeats = Object.entries(seats).filter(([key, value]) => value === 0);
        let keys = Object.keys(freeSeats)
        let randSeats = []
        for (let i = 0; i < 3; i++) {
            let randIndex = Math.floor(Math.random() * keys.length)
            let randKey = keys[randIndex]
            randSeats.push(freeSeats[randKey])
        }
        response = http.post(
            Base_URL + 'api/order/reserve',
            `{"seat_ids":[${randSeats}],"schedule_id":"${schedule}","block_ids":{"1323":0,"1324":0},"use_wallet":0,"gateway":"ir_sep_shiraz"}`, {
                headers: {
                    accept: 'application/json',
                    authorization: 'Bearer ' + token,
                    'content-type': 'application/json; charset=UTF-8',
                },
            }
        )
        sleep(1)
    })

    // group('Confirm', function () {

    //     sleep(1)
    // })

    group('Ticket', function () {
        response = http.get(Base_URL + 'order/137', {
            headers: {
                'upgrade-insecure-requests': '1',
            },
        })
        sleep(1)
    })
}