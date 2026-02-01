// Rate limiter per IP - Carrers Engalanats
import type { RateLimitEntry } from '../types';

const rateLimitMap = new Map<string, RateLimitEntry>();
const MAX_REQUESTS_PER_MINUTE = 10;
const WINDOW_MS = 60 * 1000; // 1 minut

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    // Nova finestra de temps
    rateLimitMap.set(ip, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });
    return true;
  }

  if (entry.count >= MAX_REQUESTS_PER_MINUTE) {
    return false;
  }

  entry.count++;
  return true;
}

export function cleanupRateLimits(): void {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}
