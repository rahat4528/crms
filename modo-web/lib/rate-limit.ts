import { NextRequest, NextResponse } from "next/server"

interface RateLimitRecord {
  count: number
  expiresAt: number
}

// In-memory sliding-window store
const rateLimitStore = new Map<string, RateLimitRecord>()

// Periodically prune expired entries (every 5 minutes)
let lastCleanup = Date.now()
function pruneExpiredEntries() {
  const now = Date.now()
  if (now - lastCleanup < 300000) return
  lastCleanup = now

  for (const [key, record] of rateLimitStore.entries()) {
    if (record.expiresAt <= now) {
      rateLimitStore.delete(key)
    }
  }
}

/**
 * Resets the in-memory rate limit store. Useful for unit testing.
 */
export function clearRateLimitsForTesting() {
  rateLimitStore.clear()
}

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
  retryAfterSeconds: number
}

/**
 * Check and increment rate limit for a specific key.
 *
 * @param key Unique identifier (e.g. `login:192.168.1.1` or `register:192.168.1.1`)
 * @param limit Maximum allowed requests in the time window
 * @param windowMs Time window in milliseconds
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  pruneExpiredEntries()

  const now = Date.now()
  const record = rateLimitStore.get(key)

  if (!record || record.expiresAt <= now) {
    // New or expired window
    rateLimitStore.set(key, {
      count: 1,
      expiresAt: now + windowMs,
    })

    return {
      success: true,
      limit,
      remaining: Math.max(0, limit - 1),
      reset: Math.ceil((now + windowMs) / 1000),
      retryAfterSeconds: 0,
    }
  }

  // Active window
  record.count += 1
  const remaining = Math.max(0, limit - record.count)
  const isAllowed = record.count <= limit
  const retryAfterSeconds = isAllowed ? 0 : Math.ceil((record.expiresAt - now) / 1000)

  return {
    success: isAllowed,
    limit,
    remaining,
    reset: Math.ceil(record.expiresAt / 1000),
    retryAfterSeconds,
  }
}

/**
 * Extract client IP from NextRequest with multi-proxy fallback
 */
export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for")
  if (forwarded) {
    const firstIp = forwarded.split(",")[0].trim()
    if (firstIp) return firstIp
  }

  const realIp = req.headers.get("x-real-ip")
  if (realIp) return realIp.trim()

  const cfIp = req.headers.get("cf-connecting-ip")
  if (cfIp) return cfIp.trim()

  return "127.0.0.1"
}

/**
 * Standard HTTP rate-limit response headers
 */
export function addRateLimitHeaders(
  res: NextResponse,
  result: RateLimitResult
): NextResponse {
  res.headers.set("X-RateLimit-Limit", result.limit.toString())
  res.headers.set("X-RateLimit-Remaining", result.remaining.toString())
  res.headers.set("X-RateLimit-Reset", result.reset.toString())

  if (!result.success && result.retryAfterSeconds > 0) {
    res.headers.set("Retry-After", result.retryAfterSeconds.toString())
  }

  return res
}

/**
 * Pre-configured rate limit checkers for critical flows
 */
export const RateLimits = {
  // Login: 5 attempts per 5 minutes per IP/account
  LOGIN: { limit: 5, windowMs: 5 * 60 * 1000 },
  // Registration: 5 registrations per 15 minutes per IP
  REGISTER: { limit: 5, windowMs: 15 * 60 * 1000 },
  // Orders: 10 orders per 10 minutes per IP
  ORDERS: { limit: 10, windowMs: 10 * 60 * 1000 },
  // Profile Update: 15 updates per 5 minutes per user
  PROFILE: { limit: 15, windowMs: 5 * 60 * 1000 },
  // Address updates: 15 updates per 5 minutes per user
  ADDRESS: { limit: 15, windowMs: 5 * 60 * 1000 },
}
