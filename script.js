import http from 'k6/http';
import {
    check
} from 'k6'

export default function () {
    let response = http.get('http://0.0.0.0:4444/schedule/98')
    // let response = http.get('http://prod-order.irantic.com/schedule/956163')
    check(response, {
        'status is 200': (r) => r.status === 200,
    });
}
// export default function () {
//     let response = http.get('http://0.0.0.0:4444/schedule/dates?show_id=45003&place_id=1551&date=2022-09-22&seller_id=1')
//     // let response = http.get('http://prod-order.irantic.com/schedule/956163')
//     check(response, {
//         'status is 200': (r) => r.status === 200,
//     });
// }