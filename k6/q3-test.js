import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  thresholds: {
    // 95% of the requests should have a response time below 300ms
    http_req_duration: ['p(95)<500'],
  },
  stages: [
    { duration: '3m', target: 100 },  // Ramp-up to 100 users over 1 minute
    { duration: '2m', target: 0 },    // Ramp-down to 0 users
  ],
};

export default function () {
  let res = http.get('https://pariahs.fans');
  
  check(res, {
    'response time is below 500ms': (r) => r.timings.duration < 300,
  });

  sleep(1); // Simulate wait time between requests
}