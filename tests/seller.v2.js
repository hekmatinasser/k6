import {group, check} from 'k6'

import http from 'k6/http'

import { url, env, info} from "../utils/k6-utils.js";


const headers = {
    "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${env('token')}`,
        "content-type": "application/json; charset=UTF-8"
    }
}

let show_ids = [];
let screening_ids = [];
let place_ids = [];
export const options = {
    insecureSkipTLSVerify: true,
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<1000'], // 95% of requests should be below 2000ms
        'group_duration{group:::Schedule}': ['avg < 1000'],
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
                {duration: '30s', target: 0},
            ],
            gracefulRampDown: '1m',
            exec: 'Schedule',
        },
    },
}

export function Schedule() {

    if (__VU === 1 && __ITER === 0) {
        let response = http.get(url(`api/v1/profile`), headers)
        if (!check(response, {'ok': (r) => r.json().success})) {
            console.error('Unexpected response:', response.url, response.body);
        }
        response = response.json()
        if (response.success) {
            show_ids = response.data.show_ids;
            screening_ids = response.data.screening_ids;
            place_ids = response.data.place_ids;
        }
    }

    let schedules = [];
    let response

    group('Schedule', function () {
        response = http.get(url(`api/v1/schedule?show_id=44178`), headers)
        if (!check(response, {'ok': (r) => r.json().success})) {
            console.error('Unexpected response:', response.url, response.body);
        }
        response = response.json()
        if (response.success) {
            schedules = response.data;
        }
    })

    if(schedules.length) {
        for (let key in schedules) {
            let schedule = schedules[key];
            ScheduleSeatStatus(schedule.id)
        }
    }


    group('Schedule', function () {
        response = http.get(url(`api/v1/schedule?place_id=1169`), headers)
        if (!check(response, {'ok': (r) => r.json().success})) {
            console.error('Unexpected response:', response.url, response.body);
        }
        response = response.json()
        if (response.success) {
            schedules = response.data;
        }
    })

    if (schedules.length) {
        for (let key in schedules) {
            let schedule = schedules[key];
            ScheduleSeatStatus(schedule.id)
        }
    }

}

export function ScheduleSeatStatus(schedule_id) {
    group('ScheduleSeatStatus', function () {
        let response = http.get(url(`api/v1/schedule/${schedule_id}/seats-status`), headers)
        if (!check(response, {'ok': (r) => r.json().success})) {
            console.error('Unexpected response:', response.url, response.body);
        }
    })
}