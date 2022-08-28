import {
    sleep,
    group
} from 'k6'
import http from 'k6/http'

export const options = {
    thresholds: {},
    scenarios: {
        Scenario_1: {
            executor: 'ramping-vus',
            gracefulStop: '10s',
            stages: [{
                    target: 100,
                    duration: '30s'
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
const Base_URL = "http://192.168.99.207:8020/"
const Base_URL_Panel = "http://panel.irantic.test/" // static assets from storage

export function Scenario_1() {
    let response

    group('Home - ' + Base_URL, function () {
        response = http.get(
            Base_URL_Panel + 'storage/dynamic/slider/Cicw83LScuZWGtIxjGz7MF6ElmP2YctP4PVWJTdI.jpg'
        )
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
        response = http.get(
            Base_URL_Panel + 'storage/dynamic/slider/dkDGl9HxmkIsLvXQ0H9YgTNw153dfEbZNG4a9WGu.jpg'
        )
        response = http.get(
            Base_URL_Panel + 'storage/show/show_image/Ql9BlwGFCv0lO7sYrdkQROpB4R5d3IlwTSbFaGnp.jpg'
        )
        response = http.get(
            Base_URL_Panel + 'storage/show/show_image/RFMWJ0xwbTBISpPknNvRYUSZ6VMXmw0zuDuW5omz.jpg'
        )
        response = http.get(
            Base_URL_Panel + 'storage/show/show_image/KWLkUHXr07GK4aJ93WxyEYPYEhlu8sBf1qZscIZA.jpg'
        )
        response = http.get(Base_URL + 'assets/favicon/favicon-32x32.png')

        sleep(1)
    })

    group(
        'Show',
        function () {
            response = http.get(
                Base_URL + 'theater/45001/%D9%87%DB%8C%DA%86%DA%A9%D8%B3-%DA%A9%D8%A7%D8%B1%DB%8C%D8%B4-%D9%86%D8%AF%D8%A7%D8%B4%D8%AA%D9%87-%D8%A8%D8%A7%D8%B4%D9%87', {
                    headers: {
                        'upgrade-insecure-requests': '1',
                    },
                }
            )
            response = http.get(Base_URL + 'assets/style/grids.css')
            response = http.get(Base_URL + 'assets/vue.js')
            response = http.get(Base_URL + 'assets/style/default.css?v=1811')
            response = http.get(Base_URL + 'assets/style/show.css?v=1811')
            response = http.get(Base_URL + 'assets/style/Desktop/default_1366.css?v=1811')
            response = http.get(Base_URL + 'assets/style/Desktop/show_1366.css?v=1811')
            response = http.get(Base_URL + 'assets/icons/city/unknown.svg')
            response = http.get(Base_URL + 'assets/icons/login_phone.svg')
            response = http.get(Base_URL + 'assets/icons/login_otp.svg')
            response = http.get(Base_URL + 'assets/icons/login_password.svg')
            response = http.get(Base_URL + 'assets/icons/login_forget_password.svg')
            response = http.get(Base_URL + 'assets/icons/login_change_password.svg')
            response = http.get(Base_URL + 'assets/logo/irantic_logo_light.svg?v=1')
            response = http.get(Base_URL + 'assets/icons/special_pattern.svg')
            response = http.get(Base_URL + 'assets/icons/no_data.svg')
            response = http.get(Base_URL + 'assets/icons/no_result_found.svg')
            response = http.get(Base_URL + 'assets/icons/irantic_logo_sign.svg')
            response = http.get(Base_URL + 'assets/logo/irantic_logo_light.svg')
            response = http.get(Base_URL + 'assets/icons/track_order.svg')
            response = http.get(Base_URL + 'assets/icons/faq.svg')
            response = http.get(Base_URL + 'assets/js/show.js?v=1811')
            response = http.get(Base_URL + 'assets/JsBarcode.js')
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
            response = http.get(Base_URL + 'assets/fonts/Shabnam-Bold-FD.ttf', {
                headers: {
                    origin: Base_URL,
                },
            })
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
            response = http.get(Base_URL + 'assets/icons/place_holder.svg')
            response = http.get(Base_URL + 'assets/icons/audience_club.svg')
            response = http.get(Base_URL + 'assets/icons/wallet.svg')
            response = http.get(Base_URL + 'assets/icons/profile.svg')
            response = http.get(
                Base_URL_Panel + 'storage/show/banner/m3Wssl7mNLURxFFNBhvT2IOye6ioTyJpDqrdhPZP.jpg'
            )
            response = http.get(
                Base_URL_Panel + 'storage/place/place_image/kGX4TdGDQIR46aDfOb5STgrQd85met4NFX5ynz7Y.jpeg'
            )
            response = http.get(
                Base_URL + 'api/schedule/dates?show_id=45001&place_id=1551&date=2022-09-13', {
                    headers: {
                        accept: 'application/json',
                        authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9pcmFudGljLnRlc3QiLCJhdWQiOiJodHRwOlwvXC9pcmFudGljLnRlc3QiLCJuYmYiOjE2NjE2MTY3MzcsImV4cCI6MTY5MzE1MjczOCwiaWQiOjMsIm1vYmlsZSI6IjA5MTczODcyNDg0IiwibmFtZSI6Ilx1MDYyN1x1MDYyZFx1MDYzM1x1MDYyN1x1MDY0NiBcdTA2MzRcdTA2MjdcdTA2YTlcdTA2MzFcdTA2Y2MgXHUwNjdlXHUwNjQ4XHUwNjMxIiwicHJvdmluY2VfaWQiOjh9.fml7RhQTCMAIgjpOE2rdB86OKM7r28TqS1aPCULRvM8',
                    },
                }
            )
            response = http.get(Base_URL + 'assets/icons/toman_regular_gray.svg')

            sleep(1)
        }
    )

    group('Schedule', function () {
        response = http.get(Base_URL + 'schedule/32', {
            headers: {
                'upgrade-insecure-requests': '1',
            },
        })

        response = http.get(Base_URL + 'assets/style/grids.css')
        response = http.get(Base_URL + 'assets/vue.js')
        response = http.get(Base_URL + 'assets/style/default.css?v=1811')
        response = http.get(Base_URL + 'assets/style/order.css?v=1811')
        response = http.get(Base_URL + 'assets/style/Desktop/default_1366.css?v=1811')
        response = http.get(Base_URL + 'assets/style/Desktop/order_1366.css?v=1811')
        response = http.get(Base_URL + 'assets/icons/city/unknown.svg')
        response = http.get(Base_URL + 'assets/icons/login_phone.svg')
        response = http.get(Base_URL + 'assets/icons/login_otp.svg')
        response = http.get(Base_URL + 'assets/icons/login_password.svg')
        response = http.get(Base_URL + 'assets/icons/login_forget_password.svg')
        response = http.get(Base_URL + 'assets/icons/login_change_password.svg')
        response = http.get(Base_URL + 'assets/logo/irantic_logo_light.svg?v=1')
        response = http.get(Base_URL + 'assets/icons/irantic_logo_sign.svg')
        response = http.get(Base_URL + 'assets/logo/irantic_logo_light.svg')
        response = http.get(Base_URL + 'assets/icons/track_order.svg')
        response = http.get(Base_URL + 'assets/icons/faq.svg')
        response = http.get(Base_URL + 'assets/js/order.js?v=1811')
        response = http.get(Base_URL + 'assets/JsBarcode.js')
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
        response = http.get(Base_URL + 'assets/fonts/Shabnam-Bold-FD.ttf', {
            headers: {
                origin: Base_URL,
            },
        })
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
        response = http.get(Base_URL + 'assets/icons/place_holder.svg')
        response = http.get(Base_URL + 'assets/icons/audience_club.svg')
        response = http.get(Base_URL + 'assets/icons/wallet.svg')
        response = http.get(Base_URL + 'assets/icons/profile.svg')
        response = http.get(Base_URL + 'api/user/wallet', {
            headers: {
                accept: 'application/json',
                authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9pcmFudGljLnRlc3QiLCJhdWQiOiJodHRwOlwvXC9pcmFudGljLnRlc3QiLCJuYmYiOjE2NjE2MTY3MzcsImV4cCI6MTY5MzE1MjczOCwiaWQiOjMsIm1vYmlsZSI6IjA5MTczODcyNDg0IiwibmFtZSI6Ilx1MDYyN1x1MDYyZFx1MDYzM1x1MDYyN1x1MDY0NiBcdTA2MzRcdTA2MjdcdTA2YTlcdTA2MzFcdTA2Y2MgXHUwNjdlXHUwNjQ4XHUwNjMxIiwicHJvdmluY2VfaWQiOjh9.fml7RhQTCMAIgjpOE2rdB86OKM7r28TqS1aPCULRvM8',
            },
        })
        response = http.get(Base_URL + 'assets/icons/toman_regular_light.svg')
        response = http.get(Base_URL + 'assets/icons/toman_regular_dark.svg')
        response = http.get(Base_URL + 'assets/icons/toman_regular_gray.svg')

        response = http.get(
            Base_URL + 'api/schedule/dates?show_id=45001&place_id=1551&date=2022-09-13', {
                headers: {
                    accept: 'application/json',
                    authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9pcmFudGljLnRlc3QiLCJhdWQiOiJodHRwOlwvXC9pcmFudGljLnRlc3QiLCJuYmYiOjE2NjE2MTY3MzcsImV4cCI6MTY5MzE1MjczOCwiaWQiOjMsIm1vYmlsZSI6IjA5MTczODcyNDg0IiwibmFtZSI6Ilx1MDYyN1x1MDYyZFx1MDYzM1x1MDYyN1x1MDY0NiBcdTA2MzRcdTA2MjdcdTA2YTlcdTA2MzFcdTA2Y2MgXHUwNjdlXHUwNjQ4XHUwNjMxIiwicHJvdmluY2VfaWQiOjh9.fml7RhQTCMAIgjpOE2rdB86OKM7r28TqS1aPCULRvM8',
                },
            }
        )

        response = http.get(Base_URL + 'api/schedule/32/seats-status', {
            headers: {
                accept: 'application/json',
                authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9pcmFudGljLnRlc3QiLCJhdWQiOiJodHRwOlwvXC9pcmFudGljLnRlc3QiLCJuYmYiOjE2NjE2MTY3MzcsImV4cCI6MTY5MzE1MjczOCwiaWQiOjMsIm1vYmlsZSI6IjA5MTczODcyNDg0IiwibmFtZSI6Ilx1MDYyN1x1MDYyZFx1MDYzM1x1MDYyN1x1MDY0NiBcdTA2MzRcdTA2MjdcdTA2YTlcdTA2MzFcdTA2Y2MgXHUwNjdlXHUwNjQ4XHUwNjMxIiwicHJvdmluY2VfaWQiOjh9.fml7RhQTCMAIgjpOE2rdB86OKM7r28TqS1aPCULRvM8',
            },
        })


        response = http.post(
            Base_URL + 'api/order/reserve',
            '{"seat_ids":[354167],"schedule_id":"32","block_ids":{"448647":0,"448648":0},"use_wallet":0,"gateway":"ir_igp"}', {
                headers: {
                    accept: 'application/json',
                    authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9pcmFudGljLnRlc3QiLCJhdWQiOiJodHRwOlwvXC9pcmFudGljLnRlc3QiLCJuYmYiOjE2NjE2MTY3MzcsImV4cCI6MTY5MzE1MjczOCwiaWQiOjMsIm1vYmlsZSI6IjA5MTczODcyNDg0IiwibmFtZSI6Ilx1MDYyN1x1MDYyZFx1MDYzM1x1MDYyN1x1MDY0NiBcdTA2MzRcdTA2MjdcdTA2YTlcdTA2MzFcdTA2Y2MgXHUwNjdlXHUwNjQ4XHUwNjMxIiwicHJvdmluY2VfaWQiOjh9.fml7RhQTCMAIgjpOE2rdB86OKM7r28TqS1aPCULRvM8',
                    'content-type': 'application/json; charset=UTF-8',
                },
            }
        )
        sleep(3)
    })

    group('Ticket', function () {
        response = http.get(Base_URL + 'order/137', {
            headers: {
                'upgrade-insecure-requests': '1',
            },
        })
        response = http.get(Base_URL + 'assets/style/grids.css')
        response = http.get(Base_URL + 'assets/vue.js')
        response = http.get(Base_URL + 'assets/style/default.css?v=1811')
        response = http.get(Base_URL + 'assets/style/ticket.css?v=1811')
        response = http.get(Base_URL + 'assets/style/Desktop/default_1366.css?v=1811')
        response = http.get(Base_URL + 'assets/style/Desktop/ticket_1366.css?v=1811')
        response = http.get(Base_URL + 'assets/icons/city/unknown.svg')
        response = http.get(Base_URL + 'assets/icons/login_phone.svg')
        response = http.get(Base_URL + 'assets/icons/login_otp.svg')
        response = http.get(Base_URL + 'assets/icons/login_password.svg')
        response = http.get(Base_URL + 'assets/icons/login_forget_password.svg')
        response = http.get(Base_URL + 'assets/icons/login_change_password.svg')
        response = http.get(Base_URL + 'assets/logo/irantic_logo_light.svg?v=1')
        response = http.get(Base_URL + 'assets/icons/irantic_logo_sign.svg')
        response = http.get(Base_URL + 'assets/logo/irantic_logo_light.svg')
        response = http.get(Base_URL + 'assets/icons/track_order.svg')
        response = http.get(Base_URL + 'assets/icons/faq.svg')
        response = http.get(Base_URL + 'assets/js/ticket.js?v=1811')
        response = http.get(Base_URL + 'assets/JsBarcode.js')
        response = http.get(Base_URL + 'assets/icons/audience_club.svg')
        response = http.get(Base_URL + 'assets/icons/toman_regular_light.svg')
        response = http.get(Base_URL + 'assets/icons/wallet.svg')
        response = http.get(Base_URL + 'assets/icons/place_holder.svg')
        response = http.get(Base_URL + 'assets/icons/download_light.svg')
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
        response = http.get(Base_URL + 'api/order/137', {
            headers: {
                accept: 'application/json',
                authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9pcmFudGljLnRlc3QiLCJhdWQiOiJodHRwOlwvXC9pcmFudGljLnRlc3QiLCJuYmYiOjE2NjE2MTY3MzcsImV4cCI6MTY5MzE1MjczOCwiaWQiOjMsIm1vYmlsZSI6IjA5MTczODcyNDg0IiwibmFtZSI6Ilx1MDYyN1x1MDYyZFx1MDYzM1x1MDYyN1x1MDY0NiBcdTA2MzRcdTA2MjdcdTA2YTlcdTA2MzFcdTA2Y2MgXHUwNjdlXHUwNjQ4XHUwNjMxIiwicHJvdmluY2VfaWQiOjh9.fml7RhQTCMAIgjpOE2rdB86OKM7r28TqS1aPCULRvM8',
            },
        })
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

        sleep(1)
    })
}