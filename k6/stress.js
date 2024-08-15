import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 20 }, // Ramp-up to 20 users over 2 minutes
    { duration: '2m', target: 50 }, // Ramp-up to 50 users over 2 minutes
    { duration: '1m', target: 0 }, // Ramp-down to 0 users over 2 minutes
  ],
};

export default function () {
  const res = http.get('https://pariahs.fans');
  
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time is less than 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}
