import { rateLimit } from "express-rate-limit";

//concepts are still not clear so much to me.. but i do 
//have a rough understanding of these
//creating custom limit for every route

export const tweetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5, //5 per 15 minute
  message: {
    success: false,
    message: "Too many request. Try later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const signupLimiter = rateLimit({
  windowMs: 1 * 60 * 60 * 1000,
  limit: 4, //4 per hour
  message: {
    success: false,
    message: "Too many request. Try later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const loginLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  limit: 5, // 5 per 30 min
  message: {
    success: false,
    message: "Too many request. Try later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const verifyLimiter = rateLimit({
  windowMs: 1 * 60 * 60 * 1000,
  limit: 3, // 3 per hour
  message: {
    success: false,
    message: "Too many request. Try later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const refreshLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 2, //2 per 10 minute
  message: {
    success: false,
    message : "Too many request. We cannot process."
  },
  standardHeaders: true,
  legacyHeaders: false
})

export const paymentLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  limit: 5,
  message: {
    success: false,
    message: "Too many request. We cannot process"
  },
  standardHeaders: true,
  legacyHeaders: false
})