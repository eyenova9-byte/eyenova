/**
 * EyeNova Qatar — SSRF (Server-Side Request Forgery) Defense
 * Validates outgoing URLs to prevent internal network scanning and cloud metadata access.
 */

const BLOCKED_HOSTNAMES = new Set([
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "::1",
  "169.254.169.254", // AWS/GCP instance metadata endpoint
  "metadata.google.internal",
]);

export function isSafeExternalUrl(urlStr: string): boolean {
  try {
    const parsed = new URL(urlStr);

    // Only allow HTTP/HTTPS
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return false;
    }

    const hostname = parsed.hostname.toLowerCase();

    // Check blocked hostnames
    if (BLOCKED_HOSTNAMES.has(hostname)) {
      return false;
    }

    // Check private RFC 1918 IP ranges
    const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const match = hostname.match(ipv4Regex);
    if (match) {
      const [_, o1, o2] = match.map(Number);
      if (o1 === 10) return false; // 10.0.0.0/8
      if (o1 === 172 && o2 >= 16 && o2 <= 31) return false; // 172.16.0.0/12
      if (o1 === 192 && o2 === 168) return false; // 192.168.0.0/16
      if (o1 === 127) return false; // 127.0.0.0/8
      if (o1 === 169 && o2 === 254) return false; // 169.254.0.0/16 (link-local)
    }

    return true;
  } catch {
    return false;
  }
}
