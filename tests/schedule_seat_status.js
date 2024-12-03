import {group, check} from 'k6'

import http from 'k6/http'

import {randomItem, url, env, info} from "../utils/k6-utils.js";

const schedules = env('schedules').split(',');

const headers = {
    "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${env('token')}`,
        "content-type": "application/json; charset=UTF-8"
    }
}

export const options = {
    insecureSkipTLSVerify: true,
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<1000'], // 95% of requests should be below 2000ms
        'group_duration{group:::ScheduleSeatStatus}': ['avg < 2000'],
    },
    scenarios: {
        ScheduleSeatStatus: {
            executor: 'ramping-vus',
            gracefulStop: '1m',
            stages: [
                {duration: '30s', target: 300},
                {duration: '30s', target: 500},
                {duration: '60s', target: 700},
                {duration: '60s', target: 1000},
                {duration: '60s', target: 600},
                {duration: '60s', target: 200},
                {duration: '30s', target: 0},
            ],
            gracefulRampDown: '1m',
            exec: 'ScheduleSeatStatus',
        },
    },
}

export function ScheduleSeatStatus() {

    info()

    let schedule_id = randomItem(schedules)

    let response

    group('ScheduleSeatStatus', function () {
        response = http.get(url(`api/v1/schedule/${schedule_id}/seats-status`), headers)
        if (!check(response, {'ok': (r) => r.json().success})) {
            console.error('Unexpected response:', response.url, response.body);
        }
    })
}