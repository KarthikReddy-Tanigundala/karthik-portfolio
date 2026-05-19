/**
 * Rate limiter for the /api/chat endpoint.
 *
 * Uses Upstash Redis (free tier — 10k commands/day) for persistence across
 * serverless cold starts. Limits each IP to 20 messages per hour.
 *
 * In local development (NODE_ENV !== 'production'), rate limiting is DISABLED
 * so you can test freely without hitting your own bouncer.
 *
 * If Upstash env vars are missing in production, falls back to in-memory limiter.
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const REQUESTS_PER_HOUR = 20;
const WINDOW = "1 h" as const;

let limiter: Ratelimit | null = null;

function getLimiter(): Ratelimit | null {
  if (limiter) return limiter;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    console.warn(
      "[rate-limit] Upstash env vars missing. Falling back to in-memory limiter."
    );
    return null;
  }

  limiter = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(REQUESTS_PER_HOUR, WINDOW),
    analytics: false,
    prefix: "karthik-portfolio:chat",
  });

  return limiter;
}

// In-memory fallback
const memoryStore = new Map<string, { count: number; resetAt: number }>();
const MEMORY_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function memoryLimit(ip: string): {
  success: boolean;
  remaining: number;
  reset: number;
} {
  const now = Date.now();
  const entry = memoryStore.get(ip);

  if (!entry || entry.resetAt < now) {
    memoryStore.set(ip, { count: 1, resetAt: now + MEMORY_WINDOW_MS });
    return {
      success: true,
      remaining: REQUESTS_PER_HOUR - 1,
      reset: now + MEMORY_WINDOW_MS,
    };
  }

  if (entry.count >= REQUESTS_PER_HOUR) {
    return { success: false, remaining: 0, reset: entry.resetAt };
  }

  entry.count += 1;
  return {
    success: true,
    remaining: REQUESTS_PER_HOUR - entry.count,
    reset: entry.resetAt,
  };
}

export async function checkRateLimit(ip: string): Promise<{
  success: boolean;
  remaining: number;
  reset: number;
}> {
  // ─── DEV MODE: skip rate limiting entirely ─────────────────────
  // In local development we want to test freely without hitting the bouncer.
  // Production deployments on Vercel get full rate limiting.
  if (process.env.NODE_ENV !== "production") {
    return {
      success: true,
      remaining: 999,
      reset: Date.now() + 60 * 60 * 1000,
    };
  }

  const upstash = getLimiter();

  if (upstash) {
    const result = await upstash.limit(ip);
    return {
      success: result.success,
      remaining: result.remaining,
      reset: result.reset,
    };
  }

  return memoryLimit(ip);
}

export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "anonymous";
}