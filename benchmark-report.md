
# 🚀 Urban Farming API Load Test Report

⚠️ Note:
This benchmark was executed on a local development environment.
Performance metrics may vary in production deployment.

## 📅 Date
04/18/2026, 07:54:18

## 📊 Summary
- Total Requests: 10513
- Avg Response Time: 28.59 ms
- Success: 10510
- Failed: 0

## ⚡ Performance
- p90: 108.13 ms
- p95: 112.12 ms
- Max: 5980.12 ms

## 📈 Requests/sec
82.82

## 📦 Detailed Metrics
```json
{
  "http_req_duration{expected_response:true}": {
    "values": {
      "p(90)": 108.12979659999999,
      "p(95)": 112.1192698,
      "avg": 28.59223546066777,
      "min": 0.158716,
      "med": 0.626834,
      "max": 5980.11904
    },
    "type": "trend",
    "contains": "time"
  },
  "http_req_tls_handshaking": {
    "type": "trend",
    "contains": "time",
    "values": {
      "p(90)": 0,
      "p(95)": 0,
      "avg": 0,
      "min": 0,
      "med": 0,
      "max": 0
    }
  },
  "http_req_blocked": {
    "type": "trend",
    "contains": "time",
    "values": {
      "p(95)": 0.011467999999999999,
      "avg": 0.004385329211452521,
      "min": 0.001074,
      "med": 0.002407,
      "max": 0.489835,
      "p(90)": 0.009416800000000001
    }
  },
  "vus": {
    "type": "gauge",
    "contains": "default",
    "values": {
      "value": 1,
      "min": 0,
      "max": 20
    }
  },
  "data_received": {
    "type": "counter",
    "contains": "data",
    "values": {
      "count": 16300538,
      "rate": 128411.07349779955
    }
  },
  "iterations": {
    "type": "counter",
    "contains": "default",
    "values": {
      "count": 1051,
      "rate": 8.279483673863238
    }
  },
  "vus_max": {
    "type": "gauge",
    "contains": "default",
    "values": {
      "value": 20,
      "min": 20,
      "max": 20
    }
  },
  "http_req_waiting": {
    "type": "trend",
    "contains": "time",
    "values": {
      "p(90)": 108.04966519999999,
      "p(95)": 112.0360484,
      "avg": 28.53474915276339,
      "min": 0.139589,
      "med": 0.58405,
      "max": 5979.980747
    }
  },
  "http_req_duration": {
    "contains": "time",
    "values": {
      "max": 5980.11904,
      "p(90)": 108.12979659999999,
      "p(95)": 112.1192698,
      "avg": 28.59223546066777,
      "min": 0.158716,
      "med": 0.626834
    },
    "thresholds": {
      "p(95)<800": {
        "ok": true
      }
    },
    "type": "trend"
  },
  "http_req_failed": {
    "type": "rate",
    "contains": "default",
    "values": {
      "rate": 0,
      "passes": 0,
      "fails": 10513
    },
    "thresholds": {
      "rate<0.01": {
        "ok": true
      }
    }
  },
  "http_req_connecting": {
    "type": "trend",
    "contains": "time",
    "values": {
      "avg": 0.0003051932845048987,
      "min": 0,
      "med": 0,
      "max": 0.340208,
      "p(90)": 0,
      "p(95)": 0
    }
  },
  "checks": {
    "type": "rate",
    "contains": "default",
    "values": {
      "rate": 1,
      "passes": 10510,
      "fails": 0
    }
  },
  "iteration_duration": {
    "contains": "time",
    "values": {
      "avg": 1281.5101656688869,
      "min": 1206.663432,
      "med": 1225.218575,
      "max": 2784.815621,
      "p(90)": 1494.763032,
      "p(95)": 1583.5660625
    },
    "type": "trend"
  },
  "http_req_receiving": {
    "contains": "time",
    "values": {
      "avg": 0.04592278864263254,
      "min": 0.010884,
      "med": 0.030459,
      "max": 0.962878,
      "p(90)": 0.10499400000000002,
      "p(95)": 0.13028059999999997
    },
    "type": "trend"
  },
  "http_reqs": {
    "type": "counter",
    "contains": "default",
    "values": {
      "rate": 82.8184698985007,
      "count": 10513
    }
  },
  "http_req_sending": {
    "type": "trend",
    "contains": "time",
    "values": {
      "avg": 0.011563519261866296,
      "min": 0.002978,
      "med": 0.006296,
      "max": 0.551237,
      "p(90)": 0.030335400000000002,
      "p(95)": 0.036883599999999996
    }
  },
  "data_sent": {
    "type": "counter",
    "contains": "data",
    "values": {
      "count": 2959179,
      "rate": 23311.58346197806
    }
  }
}
```

## 🧠 Analysis
- System handled concurrent load successfully
- No major failures observed
- Response time increases under load
- Optimization recommended for DB & caching

## 🏁 Verdict
✅ Stable  
⚠️ Needs optimization for high scalability  
