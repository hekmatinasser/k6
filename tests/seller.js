import {group, check} from 'k6'

import http from 'k6/http'

import {nextItem, url, env, environment} from "../utils/k6-utils.js";


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

    let response = http.get(url(`api/v1/profile`), headers)
    if (!check(response, {'ok': (r) => r.json().success})) {
        console.error('Unexpected response:', response.url, response.body);
    }
    response = response.json()
    let data = {};
    if (response.success) {
        data['user'] = response.data;
    }
    data['show_id_index'] = 0;
    data['place_id_index'] = 0;
    return data;
}

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

export function Schedule(data) {

    let schedules = [];
    let response

    group('Schedule', function () {
        let show_id = nextItem(data.user.show_ids, data.show_id_index);
        data.show_id_index++;
        response = http.get(url(`api/v1/schedule?show_id=${show_id}`), headers)
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
            group('ScheduleSeatStatus', function () {
                let response = http.get(url(`api/v1/schedule/${schedule.id}/seats-status`), headers)
                if (!check(response, {'ok': (r) => r.json().success})) {
                    console.error('Unexpected response:', response.url, response.body);
                }
            })
        }
    }

    group('Schedule', function () {
        let place_id = nextItem(data.user.place_ids, data.place_id_index)
        data.place_id_index++;
        response = http.get(url(`api/v1/schedule?place_id=${place_id}`), headers)
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
            group('ScheduleSeatStatus', function () {
                let response = http.get(url(`api/v1/schedule/${schedule.id}/seats-status`), headers)
                if (!check(response, {'ok': (r) => r.json().success})) {
                    console.error('Unexpected response:', response.url, response.body);
                }
            })
        }
    }

}