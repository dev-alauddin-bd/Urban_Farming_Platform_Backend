import { rateLimit } from 'express-rate-limit';

export const authRateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 105, // Limit each IP to 10 requests per `window`
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
        success: false,
        message: "Too many login/registration attempts, please try again later after 15 minutes",
    }
});
