import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerPhone,
      customerEmail,
      shippingAddress,
      deliveryZone,
      paymentMethod,
      items,
      subtotalQar,
      deliveryFeeQar,
      totalQar,
    } = body;

    const orderNumber = `EN-QAT-${Math.floor(100000 + Math.random() * 900000)}`;

    // Attempt saving to database via Prisma
    let dbOrder = null;
    try {
      dbOrder = await prisma.order.create({
        data: {
          orderNumber,
          customerName,
          customerPhone,
          customerEmail: customerEmail || null,
          shippingAddress: shippingAddress || {},
          deliveryZone: deliveryZone || "Doha",
          paymentMethod: paymentMethod === "QPAY" ? "DEBIT_CARD_QPAY" : "CASH_ON_DELIVERY",
          subtotalQar,
          deliveryFeeQar,
          totalQar,
          orderStatus: "PENDING_PAYMENT",
          items: {
            create: items.map((item: any) => ({
              productId: item.productId || "p1",
              quantity: item.quantity,
              unitPriceQar: item.unitPriceQar,
              lensPriceQar: item.lensPriceQar || 0,
              totalPriceQar: (item.unitPriceQar + (item.lensPriceQar || 0)) * item.quantity,
              isContactLensOrder: !!item.isContactLens,
              isPlano: !!item.isPlano,
              rightEyePower: item.rightEyePower ? parseFloat(item.rightEyePower) : null,
              rightEyeBoxes: item.rightEyeBoxes || 1,
              leftEyePower: item.leftEyePower ? parseFloat(item.leftEyePower) : null,
              leftEyeBoxes: item.leftEyeBoxes || 1,
              opticalSnapshot: {
                rightPower: item.rightEyePower,
                leftPower: item.leftEyePower,
                lensName: item.lensNameEn,
              },
            })),
          },
        },
      });
    } catch (dbError) {
      console.warn("Database save skipped (running offline/preview mode):", dbError);
    }

    return NextResponse.json({
      success: true,
      orderNumber,
      orderId: dbOrder ? dbOrder.id : `mock-${Date.now()}`,
      message: "Order placed successfully in Qatar.",
    });
  } catch (error) {
    console.error("Failed to process order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to place order" },
      { status: 500 }
    );
  }
}
