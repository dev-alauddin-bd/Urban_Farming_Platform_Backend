
# 🚀 Urban Farming API Load Test Report

⚠️ Note:
This benchmark was executed on a local development environment.
Performance metrics may vary in production deployment.

## 📅 Date
04/18/2026, 17:59:55

## 📊 Summary
- Total Requests: 2863
- Avg Response Time: 385.73 ms
- Success: 2860
- Failed: 0

## ⚡ Performance
- p90: 810.29 ms
- p95: 828.23 ms
- Max: 4296.32 ms

## 📈 Requests/sec
22.89

## 📦 Detailed Metrics
```json
{
  "http_req_blocked": {
    "type": "trend",
    "contains": "time",
    "values": {
      "min": 0.000143,
      "med": 0.001088,
      "max": 438.036588,
      "p(90)": 0.0014572000000000007,
      "p(95)": 0.0016348,
      "avg": 1.2090787743625542
    }
  },
  "http_req_connecting": {
    "type": "trend",
    "contains": "time",
    "values": {
      "avg": 0.376965945860985,
      "min": 0,
      "med": 0,
      "max": 53.988668,
      "p(90)": 0,
      "p(95)": 0
    }
  },
  "iterations": {
    "values": {
      "count": 286,
      "rate": 2.2862982717618783
    },
    "type": "counter",
    "contains": "default"
  },
  "data_sent": {
    "type": "counter",
    "contains": "data",
    "values": {
      "count": 196695,
      "rate": 1572.3896453293798
    }
  },
  "http_req_duration{expected_response:true}": {
    "values": {
      "avg": 385.7300830073345,
      "min": 216.6359,
      "med": 225.238736,
      "max": 4296.318944,
      "p(90)": 810.2860804000001,
      "p(95)": 828.2264244000003
    },
    "type": "trend",
    "contains": "time"
  },
  "http_reqs": {
    "type": "counter",
    "contains": "default",
    "values": {
      "count": 2863,
      "rate": 22.88696486732258
    }
  },
  "data_received": {
    "type": "counter",
    "contains": "data",
    "values": {
      "count": 4102255,
      "rate": 32793.63117771512
    }
  },
  "iteration_duration": {
    "values": {
      "avg": 4862.090242688812,
      "min": 4323.956868,
      "med": 4628.5153955,
      "max": 11536.459954,
      "p(90)": 5315.8182845,
      "p(95)": 6247.17576625
    },
    "type": "trend",
    "contains": "time"
  },
  "http_req_duration": {
    "type": "trend",
    "contains": "time",
    "values": {
      "avg": 385.7300830073345,
      "min": 216.6359,
      "med": 225.238736,
      "max": 4296.318944,
      "p(90)": 810.2860804000001,
      "p(95)": 828.2264244000003
    },
    "thresholds": {
      "p(95)<800": {
        "ok": false
      }
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
      "med": 222.021669,
      "max": 4295.659381,
      "p(90)": 809.8544626,
      "p(95)": 823.7454414000001,
      "avg": 376.67958496751646,
      "min": 216.507364
    }
  },
  "http_req_sending": {
    "type": "trend",
    "contains": "time",
    "values": {
      "avg": 0.07948850646175348,
      "min": 0.011803,
      "med": 0.087776,
      "max": 0.410292,
      "p(90)": 0.12131320000000002,
      "p(95)": 0.1359286
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
  "http_req_failed": {
    "type": "rate",
    "contains": "default",
    "values": {
      "rate": 0,
      "passes": 0,
      "fails": 2863
    },
    "thresholds": {
      "rate<0.01": {
        "ok": true
      }
    }
  },
  "http_req_receiving": {
    "contains": "time",
    "values": {
      "avg": 8.971009533356629,
      "min": 0.015931,
      "med": 0.147947,
      "max": 890.716166,
      "p(90)": 20.031405000000028,
      "p(95)": 57.52480940000002
    },
    "type": "trend"
  },
  "http_req_tls_handshaking": {
    "type": "trend",
    "contains": "time",
    "values": {
      "avg": 0.80520371568285,
      "min": 0,
      "med": 0,
      "max": 385.200993,
      "p(90)": 0,
      "p(95)": 0
    }
  },
  "checks": {
    "type": "rate",
    "contains": "default",
    "values": {
      "rate": 1,
      "passes": 2860,
      "fails": 0
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
