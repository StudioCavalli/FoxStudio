/**
 * In-memory rate limiter, token-bucket-ish.
 * Per-IP cap, sliding window. Lives only in the running Node process —
 * fine for a single Vercel function instance and dev. For multi-region
 * deployment, swap the backing store to Upstash Redis.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 3;

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  resetAt: number;
};

export function rateLimit(key: string): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: MAX_REQUESTS - 1, resetAt: now + WINDOW_MS };
  }

  if (bucket.count >= MAX_REQUESTS) {
    return { ok: false, remaining: 0, resetAt: bucket.resetAt };
  }

  bucket.count += 1;
  return { ok: true, remaining: MAX_REQUESTS - bucket.count, resetAt: bucket.resetAt };
}
