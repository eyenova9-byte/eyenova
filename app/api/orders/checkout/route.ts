import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { MOCK_PRODUCTS } from "@/lib/mockData";
import { CheckoutOrderSchema } from "@/lib/validations/schemas";
import { confirmPayment } from "@/lib/payment/confirmPayment";
import { createTapCharge } from "@/lib/payment/tap";
import { createSkipCashPayment } from "@/lib/payment/skipcash";

export async function POST(request: Request) {
  try {
    const json = await request.json();

    // 1. Strict Input Validation via Zod
    const validationResult = CheckoutOrderSchema.safeParse(json);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      customerName,
      customerPhone,
      customerEmail,
      district,
      streetAddress,
      deliveryNotes,
      paymentMethod,
      preferredGateway,
      items,
    } = validationResult.data;

    // 2. Server-Side Price & Inventory Recalculation (Client prices discarded!)
    const productIds = items.map((i) => i.productId);
    let dbProducts: any[] = [];
    try {
      dbProducts = await prisma.product.findMany({
        where: { id: { in: productIds } },
      });
    } catch {
      // Fallback to in-memory catalogue if DB connection is offline
    }

    let verifiedSubtotal = 0;
    const verifiedItems: any[] = [];

    for (const item of items) {
      const dbProduct = dbProducts.find((p) => p.id === item.productId);
      const mockProduct = MOCK_PRODUCTS.find((p) => p.id === item.productId);
      const matched = dbProduct || mockProduct;

      if (!matched) {
        return NextResponse.json(
          { success: false, error: `Item "${item.productId}" is not available in our catalog.` },
          { status: 400 }
        );
      }

      const activePrice =
        matched.salePriceQar && Number(matched.salePriceQar) > 0
          ? Number(matched.salePriceQar)
          : Number(matched.basePriceQar);

      const itemTotal = activePrice * item.quantity;
      verifiedSubtotal += itemTotal;

      verifiedItems.push({
        productId: matched.id,
        quantity: item.quantity,
        unitPriceQar: activePrice,
        totalPriceQar: itemTotal,
        isContactLensOrder: Boolean(item.isContactLensOrder),
        isPlano: Boolean(item.isPlano),
        rightEyePower: item.rightEyePower ?? null,
        leftEyePower: item.leftEyePower ?? null,
      });
    }

    // 3. Qatar Delivery Fee Calculation (Server-Enforced)
    // Free delivery on orders >= 250 QAR; otherwise 15 QAR delivery across Qatar
    const verifiedDeliveryFee = verifiedSubtotal >= 250 ? 0 : 15;
    const verifiedGrandTotal = Number((verifiedSubtotal + verifiedDeliveryFee).toFixed(2));

    const orderNumber = `EN-QAT-${Math.floor(100000 + Math.random() * 900000)}`;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // 4. Create Order in Database (PENDING_PAYMENT status)
    let order: any = null;
    try {
      order = await prisma.order.create({
        data: {
          orderNumber,
          customerName,
          customerPhone,
          customerEmail: customerEmail || null,
          shippingAddress: {
            district,
            streetAddress,
            notes: deliveryNotes || "",
          },
          deliveryZone: district,
          paymentMethod:
            paymentMethod === "CASH_ON_DELIVERY" || paymentMethod === "COD"
              ? "CASH_ON_DELIVERY"
              : paymentMethod === "QPAY" || paymentMethod === "DEBIT_CARD_QPAY"
              ? "DEBIT_CARD_QPAY"
              : "CREDIT_CARD",
          paymentStatus: "PENDING",
          orderStatus: "PENDING_PAYMENT",
          subtotalQar: verifiedSubtotal,
          deliveryFeeQar: verifiedDeliveryFee,
          totalQar: verifiedGrandTotal,
          items: {
            create: verifiedItems,
          },
        },
      });
    } catch (e) {
      console.warn("Prisma order creation offline fallback:", e);
      order = {
        id: `ord_${Date.now()}`,
        orderNumber,
        totalQar: verifiedGrandTotal,
      };
    }

    // 5. Handle Payment Routing by Method
    const isCod = paymentMethod === "CASH_ON_DELIVERY" || paymentMethod === "COD";

    if (isCod) {
      // Confirm Cash on Delivery via central confirmPayment core
      await confirmPayment({
        orderId: order.id,
        gateway: "COD",
        transactionId: order.orderNumber,
        amountQar: verifiedGrandTotal,
      });

      return NextResponse.json({
        success: true,
        orderId: order.id,
        orderNumber,
        isCod: true,
        totalQar: verifiedGrandTotal,
        message: "Order placed successfully for Cash on Delivery.",
      });
    }

    // 6. Online Gateways (Tap Payments or SkipCash Qatar)
    const useSkipCash =
      preferredGateway === "SKIPCASH" ||
      paymentMethod === "QPAY" ||
      paymentMethod === "DEBIT_CARD_QPAY";

    if (useSkipCash) {
      // Initialize SkipCash Qatar Payment Link
      const skipResult = await createSkipCashPayment({
        orderId: order.id,
        orderNumber,
        amountQar: verifiedGrandTotal,
        customerName,
        customerPhone,
        customerEmail: customerEmail || undefined,
        returnUrl: `${appUrl}/checkout?status=success&order_id=${order.id}`,
      });

      if (!skipResult.success) {
        return NextResponse.json(
          { success: false, error: skipResult.error || "Unable to initialize SkipCash gateway." },
          { status: 502 }
        );
      }

      return NextResponse.json({
        success: true,
        orderId: order.id,
        orderNumber,
        gateway: "SKIPCASH",
        checkoutUrl: skipResult.paymentUrl,
        totalQar: verifiedGrandTotal,
      });
    }

    // Default to Tap Payments (Cards & Apple Pay)
    const tapResult = await createTapCharge({
      orderId: order.id,
      orderNumber,
      amountQar: verifiedGrandTotal,
      customerName,
      customerPhone,
      customerEmail: customerEmail || undefined,
      redirectUrl: `${appUrl}/checkout?status=success&order_id=${order.id}`,
      postUrl: `${appUrl}/api/webhooks/tap`,
    });

    if (!tapResult.success) {
      return NextResponse.json(
        { success: false, error: tapResult.error || "Unable to initialize Tap Payments gateway." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber,
      gateway: "TAP",
      checkoutUrl: tapResult.checkoutUrl,
      totalQar: verifiedGrandTotal,
    });
  } catch (error: any) {
    console.error("[CHECKOUT ERROR]", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Checkout failed due to server error." },
      { status: 500 }
    );
  }
}
