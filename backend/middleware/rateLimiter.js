const rateLimit = require('express-rate-limit');

/**
 * Global Rate Limiter
 * Limits all requests to the API
 */
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again after 15 minutes'
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

/**
 * Strict Rate Limiter for Auth Routes
 * Prevents brute force attacks on login/register
 */
const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 5, // limit each IP to 5 attempts per windowMs
    message: {
        success: false,
        message: 'Too many login attempts, please try again after 10 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

/**
 * Rate Limiter for Inquiries (Contact Form)
 * Prevents spam submissions
 */
const inquiryLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // limit each IP to 10 inquiries per hour
    message: {
        success: false,
        message: 'Too many inquiries submitted, please try again after an hour'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = {
    globalLimiter,
    authLimiter,
    inquiryLimiter
};
