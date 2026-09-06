/**
 * EyeNova Qatar — Structured Security Audit Logger (OWASP #9)
 * Logs authentication, payment, and authorization security events in a standardized format.
 * Automatically redacts passwords, PINs, tokens, and sensitive customer data.
 */

export type SecuritySeverity = "INFO" | "WARN" | "SECURITY_ALERT";

export type SecurityEvent = {
  eventType:
    | "AUTH_SUCCESS"
    | "AUTH_FAILURE"
    | "ACCOUNT_LOCKED"
    | "PAYMENT_CONFIRMED"
    | "PAYMENT_FAILED"
    | "PAYMENT_UNDERPAID"
    | "WEBHOOK_FORGED_SIGNATURE"
    | "UNAUTHORIZED_ADMIN_ACCESS"
    | "INVENTORY_ADJUSTED"
    | "PRICE_MANIPULATION_ATTEMPT";
  severity: SecuritySeverity;
  ip?: string;
  userId?: string;
  orderNumber?: string;
  details?: Record<string, unknown>;
};

const SENSITIVE_KEYS = new Set([
  "pin",
  "pincode",
  "password",
  "token",
  "secret",
  "cardnumber",
  "cvv",
  "authorization",
  "hashstring",
]);

function redactSensitiveData(data: Record<string, unknown>): Record<string, unknown> {
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (SENSITIVE_KEYS.has(key.toLowerCase())) {
      clean[key] = "[REDACTED]";
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      clean[key] = redactSensitiveData(value as Record<string, unknown>);
    } else {
      clean[key] = value;
    }
  }
  return clean;
}


export function logSecurityEvent(event: SecurityEvent): void {
  const timestamp = new Date().toISOString();
  const sanitizedDetails = event.details ? redactSensitiveData(event.details) : undefined;

  const logEntry = {
    timestamp,
    service: "eyenova-qatar-store",
    environment: process.env.NODE_ENV || "development",
    ...event,
    details: sanitizedDetails,
  };

  const output = JSON.stringify(logEntry);

  if (event.severity === "SECURITY_ALERT") {
    console.error(`🚨 [SECURITY ALERT] ${event.eventType}:`, output);
  } else if (event.severity === "WARN") {
    console.warn(`⚠️ [SECURITY WARNING] ${event.eventType}:`, output);
  } else {
    console.log(`ℹ️ [SECURITY EVENT] ${event.eventType}:`, output);
  }
}
