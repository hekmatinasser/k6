// Creator: k6 Browser Recorder 0.6.2

import {
    sleep,
    group
} from 'k6'
import http from 'k6/http'

export const options = {
    vus: 100,
    duration: '1m'
}

const Base_URL = "https://www.irantic.com/"
const Base_URL_STATIC = "https://static.irantic.com/" // static assets from storage

export default function main() {
    let response

    group('Home', function () {
        response = http.get(Base_URL + '', {
            headers: {
                'upgrade-insecure-requests': '1',
                'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Linux"',
            },
        })
        sleep(4.7)
    })

    group(
        'Show',
        function () {
            response = http.get(
                Base_URL + 'movie/45047/%D8%AF%D9%88%D8%B2%DB%8C%D8%B3%D8%AA', {

                }
            )
            sleep(16.3)
            response = http.get(
                Base_URL + '/api/schedule/dates?show_id=45047&place_id=1544&date=2022-09-05', {
                    headers: {
                        accept: 'application/json',
                        authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbmV3LmlyYW50aWMuY29tIiwiYXVkIjoiaHR0cHM6XC9cL25ldy5pcmFudGljLmNvbSIsIm5iZiI6MTY2MDY0MDI5MywiZXhwIjoxNjkyMTc2Mjk0LCJpZCI6NDEyLCJtb2JpbGUiOiIwOTE3Mzg3MjQ4NCIsIm5hbWUiOiJcdTA2MjdcdTA2MmRcdTA2MzNcdTA2MjdcdTA2NDYgXHUwNjM0XHUwNjI3XHUwNmE5XHUwNjMxXHUwNmNjIFx1MDY3ZVx1MDY0OFx1MDYzMSIsInByb3ZpbmNlX2lkIjoxfQ.tjhQimGBBkGeshRA5iqN8wULUqLnUStbGHXR_HW8mwk',
                        'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
                        'sec-ch-ua-mobile': '?0',
                        'sec-ch-ua-platform': '"Linux"',
                    },
                }
            )
            sleep(1.2)
        }
    )

    group('Schedule', function () {
        response = http.get(Base_URL + 'schedule/963174', {
            headers: {
                'upgrade-insecure-requests': '1',
                'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Linux"',
            },
        })
        sleep(0.5)
        response = http.get(Base_URL + '/api/schedule/963174/seats-status', {
            headers: {
                accept: 'application/json',
                authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbmV3LmlyYW50aWMuY29tIiwiYXVkIjoiaHR0cHM6XC9cL25ldy5pcmFudGljLmNvbSIsIm5iZiI6MTY2MDY0MDI5MywiZXhwIjoxNjkyMTc2Mjk0LCJpZCI6NDEyLCJtb2JpbGUiOiIwOTE3Mzg3MjQ4NCIsIm5hbWUiOiJcdTA2MjdcdTA2MmRcdTA2MzNcdTA2MjdcdTA2NDYgXHUwNjM0XHUwNjI3XHUwNmE5XHUwNjMxXHUwNmNjIFx1MDY3ZVx1MDY0OFx1MDYzMSIsInByb3ZpbmNlX2lkIjoxfQ.tjhQimGBBkGeshRA5iqN8wULUqLnUStbGHXR_HW8mwk',
                'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Linux"',
            },
        })
        response = http.get(
            Base_URL + '/api/schedule/dates?show_id=45047&place_id=1544&date=2022-09-05', {
                headers: {
                    accept: 'application/json',
                    authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbmV3LmlyYW50aWMuY29tIiwiYXVkIjoiaHR0cHM6XC9cL25ldy5pcmFudGljLmNvbSIsIm5iZiI6MTY2MDY0MDI5MywiZXhwIjoxNjkyMTc2Mjk0LCJpZCI6NDEyLCJtb2JpbGUiOiIwOTE3Mzg3MjQ4NCIsIm5hbWUiOiJcdTA2MjdcdTA2MmRcdTA2MzNcdTA2MjdcdTA2NDYgXHUwNjM0XHUwNjI3XHUwNmE5XHUwNjMxXHUwNmNjIFx1MDY3ZVx1MDY0OFx1MDYzMSIsInByb3ZpbmNlX2lkIjoxfQ.tjhQimGBBkGeshRA5iqN8wULUqLnUStbGHXR_HW8mwk',
                    'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Linux"',
                },
            }
        )
        response = http.get(Base_URL + '/api/user/wallet', {
            headers: {
                accept: 'application/json',
                authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbmV3LmlyYW50aWMuY29tIiwiYXVkIjoiaHR0cHM6XC9cL25ldy5pcmFudGljLmNvbSIsIm5iZiI6MTY2MDY0MDI5MywiZXhwIjoxNjkyMTc2Mjk0LCJpZCI6NDEyLCJtb2JpbGUiOiIwOTE3Mzg3MjQ4NCIsIm5hbWUiOiJcdTA2MjdcdTA2MmRcdTA2MzNcdTA2MjdcdTA2NDYgXHUwNjM0XHUwNjI3XHUwNmE5XHUwNjMxXHUwNmNjIFx1MDY3ZVx1MDY0OFx1MDYzMSIsInByb3ZpbmNlX2lkIjoxfQ.tjhQimGBBkGeshRA5iqN8wULUqLnUStbGHXR_HW8mwk',
                'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Linux"',
            },
        })
    })
}