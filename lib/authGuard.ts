import crypto from "crypto";

export type AdminSession = {
  id: string;
  username: string;
  email: string;
  role: string;
  expiresAt: number;
};

// In-memory token store (in multi-server production, backed by Redis or DB)
const activeSessions = new Map<string, AdminSession>();

// Failed login attempt tracking for brute-force prevention
const failedAttempts = new Map<string, { count: number; lockedUntil: number }>();

/**
 * Check if an IP is locked out due to excessive failed attempts
 */
export function isIpRateLimited(ip: string): boolean {
  const record = failedAttempts.get(ip);
  if (!record) return false;

  if (Date.now() < record.lockedUntil) {
    return true;
  }

  // Lock expired
  failedAttempts.delete(ip);
  return false;
}

/**
 * Record a failed attempt from an IP
 */
export function recordFailedAttempt(ip: string): { remaining: number; locked: boolean } {
  const now = Date.now();
  const record = failedAttempts.get(ip) || { count: 0, lockedUntil: 0 };

  record.count += 1;

  if (record.count >= 5) {
    record.lockedUntil = now + 15 * 60 * 1000; // 15-minute lockout after 5 fails
    failedAttempts.set(ip, record);
    return { remaining: 0, locked: true };
  }

  failedAttempts.set(ip, record);
  return { remaining: 5 - record.count, locked: false };
}

/**
 * Clear failed attempts on successful login
 */
export function clearFailedAttempts(ip: string): void {
  failedAttempts.delete(ip);
}

/**
 * Issue a cryptographically secure 256-bit session token
 */
export function createAdminSession(user: { id: string; username: string; email: string; role: string }): string {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours validity

  activeSessions.set(token, {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    expiresAt,
  });

  return token;
}

/**
 * Validate an incoming API request for admin privileges
 */
export function verifyAdminRequest(request: Request): { authorized: boolean; user?: AdminSession } {
  // Extract token from Authorization header, custom header, or cookie
  const authHeader = request.headers.get("authorization");
  let token = "";

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7).trim();
  }

  if (!token) {
    token = request.headers.get("x-admin-token") || "";
  }

  if (!token) {
    const cookieHeader = request.headers.get("cookie") || "";
    const match = cookieHeader.match(/eyenova_admin_token=([^;]+)/);
    if (match) {
      token = match[1].trim();
    }
  }

  if (!token) {
    return { authorized: false };
  }

  const session = activeSessions.get(token);
  if (!session) {
    return { authorized: false };
  }

  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token);
    return { authorized: false };
  }

  return { authorized: true, user: session };
}
