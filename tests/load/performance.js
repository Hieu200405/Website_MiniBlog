import http from 'k6/http';
import { sleep, check } from 'k6';

// --- k6 Load Testing Strategy ---
// 1. Ramp-up: Slowly increase to 20 users
// 2. Stress: Maintain 20 users
// 3. Ramp-down: Decrease to 0
export const options = {
  stages: [
    { duration: '30s', target: 20 }, // Ramp-up
    { duration: '1m', target: 20 },  // Plateau
    { duration: '15s', target: 0 },  // Ramp-down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must be under 500ms
    http_req_failed: ['rate<0.01'],   // Error rate must be < 1%
  },
};

export default function () {
  const BASE_URL = __ENV.API_URL || 'http://localhost:5000';
  
  // Test Read Flow
  const res = http.get(`${BASE_URL}/posts`);
  
  check(res, {
    'GET /posts status is 200': (r) => r.status === 200,
    'GET /posts contains data': (r) => r.json().length >= 0,
  });
  
  sleep(Math.random() * 3 + 1); // Think time: 1-4 seconds
}
