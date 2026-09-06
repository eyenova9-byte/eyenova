/**
 * EyeNova Qatar — Input Sanitization & Anti-XSS Protection
 * Sanitizes user-generated strings (customer names, delivery notes, profile fields, search queries)
 * to prevent Stored and Reflected Cross-Site Scripting (XSS).
 */

export function sanitizeText(input: unknown): string {
  if (typeof input !== "string") return "";

  return input
    .replace(/[<>]/g, "") // Strip HTML opening and closing tags
    .replace(/javascript:/gi, "") // Neutralize javascript: URIs
    .replace(/on\w+=/gi, "") // Neutralize inline event handlers (onclick=, onload=, etc.)
    .trim();
}

export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      result[key] = sanitizeText(value);
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      result[key] = sanitizeObject(value as Record<string, unknown>);
    } else {
      result[key] = value;
    }
  }
  return result as T;
}

