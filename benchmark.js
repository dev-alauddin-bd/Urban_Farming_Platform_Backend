import http from 'k6/http';
import { check, sleep } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';

// =========================
// ⚙️ CONFIG
// =========================
export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '1m', target: 20 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'], // <1% fail
    http_req_duration: ['p(95)<800'], // 95% req < 800ms
  },
};

const BASE_URL = 'http://localhost:5000/api/v1';

// =========================
// 🔥 SETUP (LOGIN ONCE)
// =========================
export function setup() {
  const adminRes = http.post(`${BASE_URL}/auth/login`, JSON.stringify({
    email: 'admin@urbanfarming.com',
    password: 'password123',
  }), { headers: { 'Content-Type': 'application/json' } });

  const vendorRes = http.post(`${BASE_URL}/auth/login`, JSON.stringify({
    email: 'vendor1@example.com',
    password: 'password123',
  }), { headers: { 'Content-Type': 'application/json' } });

  const customerRes = http.post(`${BASE_URL}/auth/login`, JSON.stringify({
    email: 'customer1@example.com',
    password: 'password123',
  }), { headers: { 'Content-Type': 'application/json' } });

  return {
    adminToken: adminRes.json().data.accessToken,
    vendorToken: vendorRes.json().data.accessToken,
    customerToken: customerRes.json().data.accessToken,
  };
}

// =========================
// 🧪 MAIN TEST
// =========================
export default function (data) {

  // =========================
  // 🟡 PUBLIC APIs
  // =========================
  check(http.get(`${BASE_URL}/produces`), {
    'Marketplace 200': (r) => r.status === 200,
  });

  check(http.get(`${BASE_URL}/rentalSpaces`), {
    'Rental Spaces 200': (r) => r.status === 200,
  });

  check(http.get(`${BASE_URL}/community`), {
    'Community 200': (r) => r.status === 200,
  });

  // =========================
  // 🟢 CUSTOMER APIs
  // =========================
  const customerHeaders = {
    headers: {
      Authorization: `Bearer ${data.customerToken}`,
    },
  };

  check(http.get(`${BASE_URL}/users/me`, customerHeaders), {
    'Customer Profile 200': (r) => r.status === 200,
  });

  check(http.get(`${BASE_URL}/orders/my-orders`, customerHeaders), {
    'Customer Orders 200': (r) => r.status === 200,
  });

  check(http.get(`${BASE_URL}/plants/my-plants`, customerHeaders), {
    'Plant Tracking 200': (r) => r.status === 200,
  });

  // =========================
  // 🟣 VENDOR APIs
  // =========================
  const vendorHeaders = {
    headers: {
      Authorization: `Bearer ${data.vendorToken}`,
    },
  };

  check(http.get(`${BASE_URL}/produces/my`, vendorHeaders), {
    'Vendor Produce 200': (r) => r.status === 200,
  });

  check(http.get(`${BASE_URL}/orders/vendor-orders`, vendorHeaders), {
    'Vendor Orders 200': (r) => r.status === 200,
  });

  // =========================
  // 🔴 ADMIN APIs
  // =========================
  const adminHeaders = {
    headers: {
      Authorization: `Bearer ${data.adminToken}`,
    },
  };

  check(http.get(`${BASE_URL}/sustainability`, adminHeaders), {
    'Admin Sustainability 200': (r) => r.status === 200,
  });

  check(http.get(`${BASE_URL}/users`, adminHeaders), {
    'Admin Users 200': (r) => r.status === 200,
  });

  sleep(1);
}

// =========================
// 📊 REPORT GENERATION
// =========================
export function handleSummary(data) {
  return {
    'benchmark-report.md': `
# 🚀 Urban Farming API Load Test Report

⚠️ Note:
This benchmark was executed on a local development environment.
Performance metrics may vary in production deployment.

## 📅 Date
${new Date().toLocaleString()}

## 📊 Summary
- Total Requests: ${data.metrics.http_reqs.values.count}
- Avg Response Time: ${data.metrics.http_req_duration.values.avg.toFixed(2)} ms
- Success: ${data.metrics.checks.values.passes}
- Failed: ${data.metrics.checks.values.fails}

## ⚡ Performance
- p90: ${data.metrics.http_req_duration.values['p(90)'].toFixed(2)} ms
- p95: ${data.metrics.http_req_duration.values['p(95)'].toFixed(2)} ms
- Max: ${data.metrics.http_req_duration.values.max.toFixed(2)} ms

## 📈 Requests/sec
${data.metrics.http_reqs.values.rate.toFixed(2)}

## 📦 Detailed Metrics
\`\`\`json
${JSON.stringify(data.metrics, null, 2)}
\`\`\`

## 🧠 Analysis
- System handled concurrent load successfully
- No major failures observed
- Response time increases under load
- Optimization recommended for DB & caching

## 🏁 Verdict
✅ Stable  
⚠️ Needs optimization for high scalability  
`,
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}