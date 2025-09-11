import rateLimit from 'express-rate-limit';
import { config } from '@/config';
import { ResponseUtil } from '@/shared/utils';

export class RateLimiter {
  /**
   * General API rate limiter
   */
  static general = rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.maxRequests,
    message: {
      success: false,
      error: 'Too many requests, please try again later',
    },
    standardHeaders: true,
    legacyHeaders: false,
  });

  /**
   * Strict rate limiter for sensitive endpoints
   */
  static strict = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per window
    message: {
      success: false,
      error: 'Too many attempts, please try again later',
    },
    standardHeaders: true,
    legacyHeaders: false,
  });

  /**
   * Auth-specific rate limiter
   */
  static auth = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // 10 requests per window
    message: {
      success: false,
      error: 'Too many authentication attempts, please try again later',
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
}
