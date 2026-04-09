import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 10, // Virtual Users
  duration: '30s',
};

export default function () {
  const url = __ENV.API_URL || 'http://localhost:5000/posts';
  const res = http.get(url);
  
  check(res, {
    'status is 200': (r) => r.status === 200,
    'transaction time < 200ms': (r) => r.timings.duration < 200,
  });
  
  sleep(1);
}
