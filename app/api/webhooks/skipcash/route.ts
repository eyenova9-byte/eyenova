import { NextResponse } from "next/server";
import { verifySkipCashWebhookSignature, verifySkipCashPayment } from "@/lib/payment/skipcash";
import { confirmPayment } from "@/lib/payment/confirmPayment";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-signature") || request.headers.get("authorization");

    // 1. Cryptographic HMAC Signature Verification
    const isSignatureValid = verifySkipCashWebhookSignature(rawBody, signature);
    if (!isSignatureValid) {
      console.error("[SKIPCASH WEBHOOK SECURITY ALERT] Invalid HMAC signature detected!");
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

    const paymentId = payload.PaymentId || payload.paymentId;
    const orderId = payload.Uid || payload.uid;

    if (!paymentId || !orderId) {
      return NextResponse.json(
        { success: false, error: "Missing PaymentId or Uid in webhook payload." },
        { status: 400 }
      );
    }

    // 2. Server-to-Server Inquiry: Verify True Status with SkipCash
    const verification = await verifySkipCashPayment(paymentId);
    if (!verification.verified || verification.status !== "PAID") {
      console.warn(`[SKIPCASH WEBHOOK] Payment ${paymentId} is not confirmed paid.`);
      return NextResponse.json({
        success: true,
        message: `Payment status ${verification.status} recorded; not paid.`,
      });
    }

    // 3. Central Idempotent Confirmation
    const result = await confirmPayment({
      orderId,
      gateway: "SKIPCASH",
      transactionId: paymentId,
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
    console.error("[SKIPCASH WEBHOOK ERROR]", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal webhook processing error." },
      { status: 500 }
    );
  }
}
