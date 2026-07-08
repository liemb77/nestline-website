// In-memory rate limiter, scoped to a single serverless instance — resets
// on cold start and isn't shared across concurrent instances. Deters
// casual/single-source abuse; a distributed attack needs a real store
// (e.g. Upstash Redis) to stop reliably.
const ipHits = new Map<string, number[]>();
const globalDaily = new Map<string, { count: number; resetAt: number }>();

function nextUtcMidnight(): number {
  const d = new Date();
  d.setUTCHours(24, 0, 0, 0);
  return d.getTime();
}

export interface RateLimitOptions {
  windowMs: number;
  maxPerWindow: number;
  /** Total across ALL callers combined, not per-IP — the circuit breaker
   *  that actually bounds worst-case cost under a distributed attack. */
  maxPerDay: number;
}

export function isRateLimited(scope: string, ip: string, opts: RateLimitOptions): boolean {
  const now = Date.now();

  const daily = globalDaily.get(scope) ?? { count: 0, resetAt: nextUtcMidnight() };
  if (now >= daily.resetAt) {
    daily.count = 0;
    daily.resetAt = nextUtcMidnight();
  }
  if (daily.count >= opts.maxPerDay) {
    globalDaily.set(scope, daily);
    return true;
  }

  const key = `${scope}:${ip}`;
  const recentHits = (ipHits.get(key) ?? []).filter((t) => now - t < opts.windowMs);
  if (recentHits.length >= opts.maxPerWindow) {
    ipHits.set(key, recentHits);
    return true;
  }

  recentHits.push(now);
  ipHits.set(key, recentHits);
  daily.count += 1;
  globalDaily.set(scope, daily);
  return false;
}

export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  return forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";
}
