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
            gracefulStop: '30s',
            stages: [{
                    target: 20,
                    duration: '10s'
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
            // gracefulRampDown: '30s',
            exec: 'scenario_1',
        },
    },
}

export function scenario_1() {
    let response

    group(
        'page_2 - http://192.168.99.207:8020/theater/45001/%D9%87%DB%8C%DA%86%DA%A9%D8%B3-%DA%A9%D8%A7%D8%B1%DB%8C%D8%B4-%D9%86%D8%AF%D8%A7%D8%B4%D8%AA%D9%87-%D8%A8%D8%A7%D8%B4%D9%87',
        function () {
            response = http.get(
                'http://192.168.99.207:8020/theater/45001/%D9%87%DB%8C%DA%86%DA%A9%D8%B3-%DA%A9%D8%A7%D8%B1%DB%8C%D8%B4-%D9%86%D8%AF%D8%A7%D8%B4%D8%AA%D9%87-%D8%A8%D8%A7%D8%B4%D9%87', {
                    headers: {
                        'upgrade-insecure-requests': '1',
                    },
                }
            )
            sleep(1.4)
            response = http.get(
                'http://192.168.99.207:8020/api/schedule/dates?show_id=45001&place_id=1551&date=2022-09-13', {
                    headers: {
                        accept: 'application/json',
                        authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9pcmFudGljLnRlc3QiLCJhdWQiOiJodHRwOlwvXC9pcmFudGljLnRlc3QiLCJuYmYiOjE2NjE2MTY3MzcsImV4cCI6MTY5MzE1MjczOCwiaWQiOjMsIm1vYmlsZSI6IjA5MTczODcyNDg0IiwibmFtZSI6Ilx1MDYyN1x1MDYyZFx1MDYzM1x1MDYyN1x1MDY0NiBcdTA2MzRcdTA2MjdcdTA2YTlcdTA2MzFcdTA2Y2MgXHUwNjdlXHUwNjQ4XHUwNjMxIiwicHJvdmluY2VfaWQiOjh9.fml7RhQTCMAIgjpOE2rdB86OKM7r28TqS1aPCULRvM8',
                    },
                }
            )
            sleep(1)
        }
    )

    group('page_3 - http://192.168.99.207:8020/schedule/32', function () {
        response = http.get('http://192.168.99.207:8020/schedule/32', {
            headers: {
                'upgrade-insecure-requests': '1',
            },
        })

        response = http.get('http://192.168.99.207:8020/api/schedule/32/seats-status', {
            headers: {
                accept: 'application/json',
                authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9pcmFudGljLnRlc3QiLCJhdWQiOiJodHRwOlwvXC9pcmFudGljLnRlc3QiLCJuYmYiOjE2NjE2MTY3MzcsImV4cCI6MTY5MzE1MjczOCwiaWQiOjMsIm1vYmlsZSI6IjA5MTczODcyNDg0IiwibmFtZSI6Ilx1MDYyN1x1MDYyZFx1MDYzM1x1MDYyN1x1MDY0NiBcdTA2MzRcdTA2MjdcdTA2YTlcdTA2MzFcdTA2Y2MgXHUwNjdlXHUwNjQ4XHUwNjMxIiwicHJvdmluY2VfaWQiOjh9.fml7RhQTCMAIgjpOE2rdB86OKM7r28TqS1aPCULRvM8',
            },
        })

        response = http.get(
            'http://192.168.99.207:8020/api/schedule/dates?show_id=45001&place_id=1551&date=2022-09-13', {
                headers: {
                    accept: 'application/json',
                    authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9pcmFudGljLnRlc3QiLCJhdWQiOiJodHRwOlwvXC9pcmFudGljLnRlc3QiLCJuYmYiOjE2NjE2MTY3MzcsImV4cCI6MTY5MzE1MjczOCwiaWQiOjMsIm1vYmlsZSI6IjA5MTczODcyNDg0IiwibmFtZSI6Ilx1MDYyN1x1MDYyZFx1MDYzM1x1MDYyN1x1MDY0NiBcdTA2MzRcdTA2MjdcdTA2YTlcdTA2MzFcdTA2Y2MgXHUwNjdlXHUwNjQ4XHUwNjMxIiwicHJvdmluY2VfaWQiOjh9.fml7RhQTCMAIgjpOE2rdB86OKM7r28TqS1aPCULRvM8',
                },
            }
        )

        response = http.get('http://192.168.99.207:8020/api/user/wallet', {
            headers: {
                accept: 'application/json',
                authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9pcmFudGljLnRlc3QiLCJhdWQiOiJodHRwOlwvXC9pcmFudGljLnRlc3QiLCJuYmYiOjE2NjE2MTY3MzcsImV4cCI6MTY5MzE1MjczOCwiaWQiOjMsIm1vYmlsZSI6IjA5MTczODcyNDg0IiwibmFtZSI6Ilx1MDYyN1x1MDYyZFx1MDYzM1x1MDYyN1x1MDY0NiBcdTA2MzRcdTA2MjdcdTA2YTlcdTA2MzFcdTA2Y2MgXHUwNjdlXHUwNjQ4XHUwNjMxIiwicHJvdmluY2VfaWQiOjh9.fml7RhQTCMAIgjpOE2rdB86OKM7r28TqS1aPCULRvM8',
            },
        })

        response = http.post(
            'http://192.168.99.207:8020/api/order/reserve',
            '{"seat_ids":[354168,354167],"schedule_id":"32","block_ids":{"448647":0},"use_wallet":0,"gateway":"ir_igp"}', {
                headers: {
                    accept: 'application/json',
                    authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9pcmFudGljLnRlc3QiLCJhdWQiOiJodHRwOlwvXC9pcmFudGljLnRlc3QiLCJuYmYiOjE2NjE2MTY3MzcsImV4cCI6MTY5MzE1MjczOCwiaWQiOjMsIm1vYmlsZSI6IjA5MTczODcyNDg0IiwibmFtZSI6Ilx1MDYyN1x1MDYyZFx1MDYzM1x1MDYyN1x1MDY0NiBcdTA2MzRcdTA2MjdcdTA2YTlcdTA2MzFcdTA2Y2MgXHUwNjdlXHUwNjQ4XHUwNjMxIiwicHJvdmluY2VfaWQiOjh9.fml7RhQTCMAIgjpOE2rdB86OKM7r28TqS1aPCULRvM8',
                    'content-type': 'application/json; charset=UTF-8',
                },
            }
        )
    })
}