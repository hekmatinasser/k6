import http from "k6/http";
import {
    check,
    group,
    sleep
} from "k6";
import {
    Counter,
    Rate,
    Trend
} from "k6/metrics";
import {
    randomIntBetween
} from "./utils/k6-utils.js";

const loginData = JSON.parse(open("./utils/users.json"));

const url = 'http://seller.irantic.test/api/v1/';

const params = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpcmFudGljLmNvbSIsImlkIjoxMzM3LCJ0aXRsZSI6Itqp24zZvtin2K8iLCJpcHMiOlsiNS4xNjAuMTU2LjU2IiwiNS4xNjAuMTU2LjUwIiwiNS4xNjAuMTU2LjQiLCI1LjE2MC4xNTYuNDIiLCIxOTIuMTY4Ljk5LjIwNyIsIjE5Mi4xNjguOTkuMTk0IiwiMTkyLjE2OC45NC4xNyIsIjE5Mi4xNjguOTQuMTgiLCIxOTIuMTY4Ljk0LjE2IiwiMTkyLjE2OC45NC4xNSIsIjE5Mi4xNjguOTkuMjQ4Il19.UyjzcaYudxN3v_XB011qCYIAOUYex_ZP_KVGk7BlXioqY1M0B-zL-4WUsx1Z6laWlP20cZ3oZ3MQBa8_ANXcSw'
    },
};

/* Options
Global options for your script
stages - Ramping pattern
thresholds - pass/fail criteria for the test
ext - Options used by Load Impact cloud service test name and distribution
*/
export let options = {
    stages: [{
            target: 10,
            duration: "10s"
        },
        // {
        //     target: 200,
        //     duration: "3m"
        // },
        // {
        //     target: 0,
        //     duration: "1m"
        // }
    ],
    thresholds: {
        "http_req_duration": ["p(95)<1000"],
        "check_failure_rate": ["rate<0.3"]
    }
};

let checkFailureRate = new Rate("check_failure_rate");
let timeToFirstByte = new Trend("time_to_first_byte", true);

export default function () {
    group("schedule", function () {
        let res = http.get(url + "schedule?show_id=45001", params);
        
        check(res, {
            'is status 200': (r) => r.status === 200,
        });

    });
}