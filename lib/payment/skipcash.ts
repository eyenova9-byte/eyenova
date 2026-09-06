import crypto from "crypto";

export type CreateSkipCashParams = {
  orderId: string;
  orderNumber: string;
  amountQar: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  returnUrl: string;
};

const SKIPCASH_BASE_URL = "https://api.skipcash.app/api/v1";

/**
 * Creates a SkipCash hosted payment link for Qatar Debit / NAPS / Credit cards.
 * Customer is redirected to SkipCash's secure payment page.
 */
export async function createSkipCashPayment(params: CreateSkipCashParams): Promise<{
  success: boolean;
  paymentUrl?: string;
  paymentId?: string;
  error?: string;
}> {
  const secretKey = process.env.SKIPCASH_SECRET_KEY;
  const keyId = process.env.SKIPCASH_KEY_ID;
  const clientId = process.env.SKIPCASH_CLIENT_ID;

  if (!secretKey || !keyId || !clientId) {
    console.warn("[SKIPCASH WARNING] SkipCash credentials not set. Operating in sandbox simulation mode.");
    const simulatedId = `sc_sim_${Date.now()}`;
    return {
      success: true,
      paymentId: simulatedId,
      paymentUrl: `${params.returnUrl}?payment_id=${simulatedId}&order_id=${params.orderId}`,
    };
  }

  try {
    const cleanPhone = params.customerPhone.replace(/[^0-9]/g, "");
    const formattedPhone = cleanPhone.startsWith("974") ? `+${cleanPhone}` : `+974${cleanPhone}`;

    const payload = {
      Uid: params.orderId,
      KeyId: keyId,
      Amount: params.amountQar.toFixed(2),
      FirstName: params.customerName.trim().split(" ")[0] || "Customer",
      LastName: params.customerName.trim().split(" ").slice(1).join(" ") || "EyeNova",
      Phone: formattedPhone,
      Email: params.customerEmail || `customer_${cleanPhone}@eyenova.com.qa`,
      TransactionId: params.orderNumber,
      ReturnUrl: params.returnUrl,
    };

    // SkipCash signature calculation: HMAC-SHA256 of combined fields
    const dataToSign = `Uid=${payload.Uid},KeyId=${payload.KeyId},Amount=${payload.Amount},FirstName=${payload.FirstName},LastName=${payload.LastName},Phone=${payload.Phone},Email=${payload.Email},TransactionId=${payload.TransactionId}`;
    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(dataToSign)
      .digest("base64");

    const response = await fetch(`${SKIPCASH_BASE_URL}/payments`, {
      method: "POST",
      headers: {
        Authorization: signature,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok || !data.resultObj?.payUrl) {
      console.error("[SKIPCASH PAYMENT ERROR]", data);
      return {
        success: false,
        error: data?.returnMessage || "Failed to create SkipCash payment session.",
      };
    }

    return {
      success: true,
      paymentId: data.resultObj.paymentId,
      paymentUrl: data.resultObj.payUrl,
    };
  } catch (err: any) {
    console.error("[SKIPCASH API EXCEPTION]", err);
    return {
      success: false,
      error: err.message || "Network error connecting to SkipCash API.",
    };
  }
}

/**
 * Server-to-Server Inquiry: Verify True Status with SkipCash API
 */
export async function verifySkipCashPayment(paymentId: string): Promise<{
  verified: boolean;
  status: string;
  amount: number;
  orderId?: string;
  raw?: any;
}> {
  const secretKey = process.env.SKIPCASH_SECRET_KEY;
  const clientId = process.env.SKIPCASH_CLIENT_ID;

  if (!secretKey || !clientId) {
    return {
      verified: true,
      status: "PAID",
      amount: 0,
      raw: { simulated: true },
    };
  }

  try {
    const response = await fetch(`${SKIPCASH_BASE_URL}/payments/${paymentId}`, {
      method: "GET",
      headers: {
        "x-client-id": clientId,
        Authorization: secretKey,
      },
    });

    if (!response.ok) {
      console.error(`[SKIPCASH VERIFY ERROR] Status ${response.status}`);
      return { verified: false, status: "FAILED", amount: 0 };
    }

    const data = await response.json();
    const resultObj = data.resultObj;
    const isPaid = resultObj?.statusId === 2 || resultObj?.status === "Paid";

    return {
      verified: isPaid,
      status: isPaid ? "PAID" : "PENDING",
      amount: Number(resultObj?.amount || 0),
      orderId: resultObj?.uid,
      raw: data,
    };
  } catch (error) {
    console.error("[SKIPCASH VERIFICATION EXCEPTION]", error);
    return { verified: false, status: "ERROR", amount: 0 };
  }
}

/**
 * Webhook Signature Verification for SkipCash Qatar
 */
export function verifySkipCashWebhookSignature(rawBody: string, incomingSignature: string | null): boolean {
  const webhookSecret = process.env.SKIPCASH_WEBHOOK_SECRET;

  if (!webhookSecret) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[SKIPCASH WARNING] SKIPCASH_WEBHOOK_SECRET not configured. Allowing in development.");
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
      .digest("base64");

    const bufA = Buffer.from(computedSignature);
    const bufB = Buffer.from(incomingSignature);
    if (bufA.length !== bufB.length) {
      return false;
    }

    return crypto.timingSafeEqual(bufA, bufB);
  } catch (e) {
    console.error("[SKIPCASH SIGNATURE ERROR]", e);
    return false;
  }
}
