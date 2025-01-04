import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 100 },  // ramp-up to 100 users in 30 seconds
    { duration: '1m', target: 50 },   // keep 50 users for 1 minute
    { duration: '30s', target: 0 },   // ramp-down to 0 users
  ],
};

export default function () {
  // GET request to fetch users
  let res = http.get('http://localhost:5000/api/users');  // Replace with your API endpoint
  check(res, { 'status is 200': (r) => r.status === 200 });

  // POST request to create a new user
  let payload = JSON.stringify({
    name: 'John Doe',
    email: `john.doe${Math.floor(Math.random() * 10000)}@example.com`,
  });

  let postRes = http.post('http://localhost:5000/api/users', payload, {
    headers: { 'Content-Type': 'application/json' },
  });
  check(postRes, { 'status is 201': (r) => r.status === 201 });

  sleep(1);  // simulate user think time
}
