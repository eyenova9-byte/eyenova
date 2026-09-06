import crypto from "crypto";

export type TapCustomer = {
  first_name: string;
  last_name?: string;
  email?: string;
  phone: {
    country_code: string;
    number: string;
  };
};

export type CreateTapChargeParams = {
  orderId: string;
  orderNumber: string;
  amountQar: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  redirectUrl: string;
  postUrl: string; // Webhook URL
};

export type TapChargeResponse = {
  id: string;
  status: string; // "INITIATED" | "CAPTURED" | "FAILED" | "ABANDONED"
  amount: number;
  currency: string;
  transaction?: {
    authorization_id?: string;
    url?: string;
  };
  redirect?: {
    url: string;
  };
};

const TAP_API_BASE = "https://api.tap.company/v2";

/**
 * Creates a hosted 3D-Secure 2.0 checkout charge session via Tap Payments.
 * Customer is redirected to Tap's official hosted page; no card details ever touch EyeNova.
 */
export async function createTapCharge(params: CreateTapChargeParams): Promise<{ success: boolean; checkoutUrl?: string; chargeId?: string; error?: string }> {
  const secretKey = process.env.TAP_SECRET_KEY;

  if (!secretKey) {
    console.warn("[TAP WARNING] TAP_SECRET_KEY not set. Operating in Sandbox simulation mode.");
    const simulatedChargeId = `chg_tap_sim_${Date.now()}`;
    return {
      success: true,
      chargeId: simulatedChargeId,
      checkoutUrl: `${params.redirectUrl}?tap_id=${simulatedChargeId}&order_id=${params.orderId}`,
    };
  }

  try {
    const cleanPhone = params.customerPhone.replace(/[^0-9]/g, "");
    const phoneDigits = cleanPhone.startsWith("974") ? cleanPhone.substring(3) : cleanPhone;
    const nameParts = params.customerName.trim().split(" ");
    const firstName = nameParts[0] || "Customer";
    const lastName = nameParts.slice(1).join(" ") || "EyeNova";

    const payload = {
      amount: Number(params.amountQar.toFixed(2)),
      currency: "QAR",
      threeDSecure: true,
      save_card: false,
      description: `EyeNova Qatar Order ${params.orderNumber}`,
      statement_descriptor: "EYENOVA QATAR",
      metadata: {
        orderId: params.orderId,
        orderNumber: params.orderNumber,
      },
      reference: {
        transaction: `TXN-${params.orderNumber}`,
        order: params.orderId,
      },
      receipt: {
        email: Boolean(params.customerEmail),
        sms: true,
      },
      customer: {
        first_name: firstName,
        last_name: lastName,
        email: params.customerEmail || `customer_${phoneDigits}@eyenova.com.qa`,
        phone: {
          country_code: "974",
          number: phoneDigits,
        },
      },
      source: {
        id: "src_all", // Allows credit cards, debit cards, and Apple Pay
      },
      redirect: {
        url: params.redirectUrl,
      },
      post: {
        url: params.postUrl,
      },
    };

    const response = await fetch(`${TAP_API_BASE}/charges`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data: TapChargeResponse = await response.json();

    if (!response.ok || !data.id) {
      console.error("[TAP CHARGE ERROR]", data);
      return {
        success: false,
        error: (data as any)?.errors?.[0]?.description || "Failed to initialize Tap checkout session.",
      };
    }

    const redirectUrl = data.transaction?.url || data.redirect?.url;
    return {
      success: true,
      chargeId: data.id,
      checkoutUrl: redirectUrl,
    };
  } catch (err: any) {
    console.error("[TAP API EXCEPTION]", err);
    return {
      success: false,
      error: err.message || "Network error connecting to Tap Payments API.",
    };
  }
}

/**
 * Server-to-Server Inquiry: Verify True Charge Status directly with Tap API
 * Never trust redirect query parameters alone!
 */
export async function verifyTapTransaction(chargeId: string): Promise<{
  verified: boolean;
  status: string;
  amount: number;
  orderId?: string;
  raw?: any;
}> {
  const secretKey = process.env.TAP_SECRET_KEY;

  if (!secretKey) {
    // Sandbox / Test fallback
    return {
      verified: true,
      status: "CAPTURED",
      amount: 0,
      raw: { simulated: true },
    };
  }

  try {
    const response = await fetch(`${TAP_API_BASE}/charges/${chargeId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    });

    if (!response.ok) {
      console.error(`[TAP VERIFY ERROR] Tap API responded with status ${response.status}`);
      return { verified: false, status: "FAILED", amount: 0 };
    }

    const data = await response.json();
    const isCaptured = data.status === "CAPTURED";

    return {
      verified: isCaptured,
      status: data.status,
      amount: Number(data.amount || 0),
      orderId: data.metadata?.orderId || data.reference?.order,
      raw: data,
    };
  } catch (error) {
    console.error("[TAP VERIFICATION EXCEPTION]", error);
    return { verified: false, status: "ERROR", amount: 0 };
  }
}

/**
 * Webhook HMAC Signature Verification for Tap Payments
 */
export function verifyTapWebhookSignature(rawBody: string, incomingSignature: string | null): boolean {
  const webhookSecret = process.env.TAP_WEBHOOK_SECRET;

  // In local development / test without webhook secret configured, permit if deliberate test
  if (!webhookSecret) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[TAP WARNING] TAP_WEBHOOK_SECRET not configured. Allowing test payload in development.");
      return true;
    }
    return false;
  }

  if (!incomingSignature) {
    return false;
  }

  try {
    const computedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    const bufA = Buffer.from(computedSignature, "hex");
    const bufB = Buffer.from(incomingSignature, "hex");
    if (bufA.length !== bufB.length) {
      return false;
    }

    return crypto.timingSafeEqual(bufA, bufB);
  } catch (e) {
    console.error("[TAP SIGNATURE ERROR]", e);
    return false;
  }
}
