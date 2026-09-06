import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rate limit store: IP -> { count, resetTime }
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(key: string, limit: number, windowMs: number): { limited: boolean; retryAfter: number } {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return { limited: false, retryAfter: 0 };
  }

  record.count += 1;
  rateLimitMap.set(key, record);

  if (record.count > limit) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { limited: true, retryAfter };
  }

  return { limited: false, retryAfter: 0 };
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";

  // 1. Rate Limiting Rules
  let limit = 0;
  let windowMs = 0;

  if (pathname.startsWith("/api/auth/otp")) {
    limit = 10; // 10 OTP requests
    windowMs = 5 * 60 * 1000; // 5 minutes
  } else if (pathname.startsWith("/api/admin/auth")) {
    limit = 10; // 10 admin login attempts
    windowMs = 5 * 60 * 1000;
  } else if (pathname.startsWith("/api/orders/checkout") || pathname.startsWith("/api/orders")) {
    limit = 30; // 30 checkout submissions
    windowMs = 60 * 1000; // 1 minute
  } else if (pathname.startsWith("/api/products") && request.nextUrl.searchParams.has("search")) {
    limit = 60; // 60 search queries
    windowMs = 60 * 1000;
  }

  if (limit > 0) {
    const rateCheck = isRateLimited(`${ip}:${pathname}`, limit, windowMs);
    if (rateCheck.limited) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: "Too many requests. Please try again later.",
          retryAfterSeconds: rateCheck.retryAfter,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": rateCheck.retryAfter.toString(),
          },
        }
      );
    }
  }

  const response = NextResponse.next();

  // Basic CORS headers for API routes
  if (pathname.startsWith("/api")) {
    const origin = request.headers.get("origin");
    const allowedOrigins = [
      "https://eyenova.qa",
      "https://www.eyenova.qa",
      "http://localhost:3000",
      "http://localhost:3001",
    ];

    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set("Access-Control-Allow-Origin", origin);
      response.headers.set("Access-Control-Allow-Credentials", "true");
      response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, x-admin-token");
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/api/auth/:path*",
    "/api/admin/:path*",
    "/api/orders/:path*",
    "/api/products/:path*",
  ],
};
