import rateLimit from "express-rate-limit";

/* =========================
   🔐 AUTH LIMITERS
========================= */

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

/* =========================
   🛒 MARKETPLACE LIMITERS
========================= */

export const produceLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: "Too many requests on produces.",
  },
});

/* =========================
   📦 ORDER LIMITER
========================= */

export const orderLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many orders in short time.",
  },
});

/* =========================
   💬 COMMUNITY LIMITER
========================= */

export const communityLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many posts. Please slow down.",
  },
});