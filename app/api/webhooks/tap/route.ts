import { NextResponse } from "next/server";
import { verifyTapWebhookSignature, verifyTapTransaction } from "@/lib/payment/tap";
import { confirmPayment } from "@/lib/payment/confirmPayment";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("hashstring") || request.headers.get("x-tap-signature");

    // 1. Cryptographic HMAC Signature Verification
    const isSignatureValid = verifyTapWebhookSignature(rawBody, signature);
    if (!isSignatureValid) {
      console.error("[TAP WEBHOOK SECURITY ALERT] Invalid HMAC signature detected on webhook payload!");
      return NextResponse.json(
        { success: false, error: "Invalid webhook cryptographic signature." },
        { status: 401 }
      );
    }

    let payload: any;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ success: false, error: "Malformed JSON" }, { status: 400 });
    }

    const chargeId = payload.id;
    const orderId = payload.metadata?.orderId || payload.reference?.order;

    if (!chargeId || !orderId) {
      return NextResponse.json(
        { success: false, error: "Missing charge ID or order ID in webhook payload." },
        { status: 400 }
      );
    }

    // 2. Server-to-Server Inquiry: Never trust the webhook body alone!
    // Query Tap's API directly with our secret key to verify the charge is truly CAPTURED.
    const verification = await verifyTapTransaction(chargeId);
    if (!verification.verified || verification.status !== "CAPTURED") {
      console.warn(`[TAP WEBHOOK] Charge ${chargeId} is not captured. Current status: ${verification.status}`);
      return NextResponse.json({
        success: true,
        message: `Charge status ${verification.status} recorded; not yet captured.`,
      });
    }

    // 3. Central Idempotent Confirmation
    const result = await confirmPayment({
      orderId,
      gateway: "TAP",
      transactionId: chargeId,
      amountQar: verification.amount,
      metadata: payload,
    });

    if (!result.success && result.status === "AMOUNT_MISMATCH") {
      return NextResponse.json(
        { success: false, error: "Payment amount does not match order requirement." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      orderNumber: result.orderNumber,
    });
  } catch (error: any) {
    console.error("[TAP WEBHOOK ERROR]", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal webhook processing error." },
      { status: 500 }
    );
  }
}
