import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  isIpRateLimited,
  recordFailedAttempt,
  clearFailedAttempts,
  createAdminSession,
} from "@/lib/authGuard";
import { AdminAuthSchema } from "@/lib/validations/schemas";
import { logSecurityEvent } from "@/lib/security/auditLogger";

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const clientIp = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    // 1. Brute-Force Rate Limiting (15-min lockout after 5 consecutive failures)
    if (isIpRateLimited(clientIp)) {
      logSecurityEvent({
        eventType: "ACCOUNT_LOCKED",
        severity: "SECURITY_ALERT",
        ip: clientIp,
        details: { reason: "Rate limited due to excessive failed attempts" },
      });

      return NextResponse.json(
        {
          success: false,
          error: "Too many failed login attempts. Security lockout active for 15 minutes.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validation = AdminAuthSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: "A valid 4-digit PIN code is required." },
        { status: 400 }
      );
    }

    const { username, pinCode } = validation.data;
    const cleanIdentifier = (username || "admin").trim().toLowerCase();

    // 2. Database account lookup
    let account = null;
    try {
      account = await prisma.userAccount.findFirst({
        where: {
          pinCode: pinCode.trim(),
          ...(cleanIdentifier
            ? {
                OR: [
                  { username: cleanIdentifier },
                  { email: cleanIdentifier },
                ],
              }
            : {}),
          isActive: true,
        },
        include: {
          store: true,
        },
      });
    } catch (e) {
      console.warn("DB user account check error:", e);
    }

    // 3. Fallback master credentials:
    // In production, '1234' is strictly disallowed; requires ADMIN_MASTER_PIN environment variable.
    const isDev = process.env.NODE_ENV !== "production";
    const masterPin = process.env.ADMIN_MASTER_PIN;

    if (!account) {
      const isAllowedDevMaster = isDev && pinCode === "1234";
      const isAllowedProdMaster = masterPin && pinCode === masterPin;

      if (isAllowedDevMaster || isAllowedProdMaster) {
        account = {
          id: "usr-admin-master",
          username: "admin",
          email: "admin@eyenova.com.qa",
          fullName: "System Administrator",
          pinCode,
          role: "SUPER_ADMIN",
          storeId: null,
          isActive: true,
          store: null,
          createdAt: new Date(),
        };
      }
    }

    // 4. Failed Authentication Handling
    if (!account) {
      const attempt = recordFailedAttempt(clientIp);

      logSecurityEvent({
        eventType: attempt.locked ? "ACCOUNT_LOCKED" : "AUTH_FAILURE",
        severity: attempt.locked ? "SECURITY_ALERT" : "WARN",
        ip: clientIp,
        details: { attemptedUser: cleanIdentifier, remaining: attempt.remaining },
      });

      const remainingMsg = attempt.locked
        ? "Account locked for 15 minutes due to repeated failures."
        : `Invalid PIN. ${attempt.remaining} attempts remaining before security lockout.`;

      return NextResponse.json(
        { success: false, error: remainingMsg },
        { status: 401 }
      );
    }

    // 5. Successful Login: Clear lockout and issue cryptographically secure 256-bit token
    clearFailedAttempts(clientIp);

    const token = createAdminSession({
      id: account.id,
      username: account.username,
      email: account.email || "admin@eyenova.com.qa",
      role: account.role,
    });

    logSecurityEvent({
      eventType: "AUTH_SUCCESS",
      severity: "INFO",
      ip: clientIp,
      userId: account.id,
      details: { username: account.username, role: account.role },
    });

    const response = NextResponse.json({
      success: true,
      token,
      user: {
        id: account.id,
        username: account.username,
        email: account.email || `${account.username}@eyenova.com.qa`,
        fullName: account.fullName,
        role: account.role,
        storeId: account.storeId,
        storeName: account.store?.name || "All Branches",
      },
      message: "Authenticated successfully",
    });

    // Set secure HTTP-only session cookie
    response.cookies.set({
      name: "eyenova_admin_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin authentication error:", error);
    return NextResponse.json(
      {
        success: false,
        error: process.env.NODE_ENV === "production" ? "Authentication request could not be completed." : "Authentication failed",
      },
      { status: 500 }
    );
  }
}
