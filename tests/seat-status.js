import {group, check} from 'k6'

import http from 'k6/http'

import {randomItem, url, env, environment} from "../utils/k6-utils.js";

const schedules = env('schedules');
const schedule_id = randomItem(schedules)

const headers = {
    "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${env('token')}`,
        "content-type": "application/json; charset=UTF-8"
    }
}
export function setup() {

    console.info(`environment: ${environment()}`);
    console.info(`base url: ${env('baseUrl')}\n`);

    let data = {
        'schedule_id': schedule_id
    };

    return data;
}

export const options = {
    insecureSkipTLSVerify: true,
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<2000'], // 95% of requests should be below 2000ms
        'group_duration{group:::ScheduleSeatStatus}': ['avg < 1500'],
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
                {duration: '30s', target: 10},
            ],
            gracefulRampDown: '1m',
            exec: 'Schedule',
        },
    }
}

export function Schedule(data) {

    group('ScheduleSeatStatus', function () {
        let response = http.get(url(`api/v1/schedule/${data.schedule_id}/seats-status`), headers)
        if (!check(response, {'ok': (r) => r.json().success})) {
            console.error('Unexpected response:', response.url, response.body);
        }
    })
}