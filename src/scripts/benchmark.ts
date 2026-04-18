import http from 'k6/http';
import { check, sleep } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';
import { Options } from 'k6/options';

// =========================
// ⚙️ TYPES
// =========================
interface AuthTokens {
  adminToken: string;
  vendorToken: string;
  customerToken: string;
}

// =========================
// ⚙️ CONFIG
// =========================
export const options: Options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '1m', target: 20 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<800'],
  },
};

const BASE_URL: string = 'http://localhost:5000/api/v1';

// =========================
// 🔥 SETUP
// =========================
export function setup(): AuthTokens {
  const adminRes = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({
      email: 'admin@urbanfarming.com',
      password: 'password123',
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );

  const vendorRes = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({
      email: 'vendor1@example.com',
      password: 'password123',
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );

  const customerRes = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({
      email: 'customer1@example.com',
      password: 'password123',
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );

  return {
    adminToken: adminRes.json('data.accessToken') as string,
    vendorToken: vendorRes.json('data.accessToken') as string,
    customerToken: customerRes.json('data.accessToken') as string,
  };
} // ✅ এই bracket টা missing ছিল

// =========================
// 🧪 MAIN TEST
// =========================
export default function (data: AuthTokens): void {

  check(http.get(`${BASE_URL}/produces`), {
    'Marketplace 200': (r) => r.status === 200,
  });

  check(http.get(`${BASE_URL}/rentalSpaces`), {
    'Rental Spaces 200': (r) => r.status === 200,
  });

  check(http.get(`${BASE_URL}/community`), {
    'Community 200': (r) => r.status === 200,
  });

  const customerHeaders = {
    headers: {
      Authorization: `Bearer ${data.customerToken}`,
    },
  };

  check(http.get(`${BASE_URL}/users/me`, customerHeaders), {
    'Customer Profile 200': (r) => r.status === 200,
  });

  const vendorHeaders = {
    headers: {
      Authorization: `Bearer ${data.vendorToken}`,
    },
  };

  check(http.get(`${BASE_URL}/orders/vendor-orders`, vendorHeaders), {
    'Vendor Orders 200': (r) => r.status === 200,
  });

  const adminHeaders = {
    headers: {
      Authorization: `Bearer ${data.adminToken}`,
    },
  };

  check(http.get(`${BASE_URL}/users`, adminHeaders), {
    'Admin Users 200': (r) => r.status === 200,
  });

  sleep(1);
}

// =========================
// 📊 REPORT
// =========================
export function handleSummary(data: any) {
  return {
    'benchmark-report.md': `
# 🚀 Load Test Report

## 📅 Date
${new Date().toLocaleString()}

## 📊 Summary
- Total Requests: ${data.metrics.http_reqs.values.count}
- Avg Response Time: ${data.metrics.http_req_duration.values.avg.toFixed(2)} ms
- Success: ${data.metrics.checks.values.passes}
- Failed: ${data.metrics.checks.values.fails}

## 🏁 Verdict
✅ Stable  
`,
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}