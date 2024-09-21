import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 10 }, // ramp-up to 10 users over 30 seconds
    { duration: '1m', target: 10 },  // sustain 10 users for 1 minute
    { duration: '10s', target: 0 },  // ramp-down to 0 users
  ],
  thresholds: {
    'http_req_duration': ['p(95)<2000'], // 95% of requests must complete within 2s
  },
};

export default function () {
  let res = http.get('https://pariahs.fans');
  
  check(res, {
    'page load time is less than 2 seconds': (r) => r.timings.duration < 2000,
  });

  sleep(1);
}