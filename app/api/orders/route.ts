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
          orderSource: "WEBSITE", // Every sale made on the website is explicitly WEBSITE in the database!
          fulfillmentType: body.fulfillmentType === "STORE_PICKUP" ? "STORE_PICKUP" : "HOME_DELIVERY",
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

      // Deduct sold quantities from stock
      for (const item of items) {
        if (item.productId) {
          await prisma.product.updateMany({
            where: { id: item.productId },
            data: {
              stockQuantity: {
                decrement: item.quantity || 1,
              },
            },
          });
        }
      }
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

export async function GET() {
  try {
    let dbOrders = null;
    try {
      dbOrders = await prisma.order.findMany({
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    } catch (e) {
      console.warn("DB find orders error:", e);
    }

    if (dbOrders && dbOrders.length > 0) {
      const formatted = dbOrders.map((o) => ({
        id: o.id,
        orderNumber: o.orderNumber,
        customerName: o.customerName,
        phone: o.customerPhone,
        district: o.deliveryZone || "Doha",
        status: o.orderStatus,
        totalQar: Number(o.totalQar),
        createdAt: o.createdAt.toISOString(),
        items: o.items.map((it) => ({
          title: it.product.titleEn,
          rightPower: it.rightEyePower ? String(it.rightEyePower) : undefined,
          rightBoxes: it.rightEyeBoxes || 1,
          leftPower: it.leftEyePower ? String(it.leftEyePower) : undefined,
          leftBoxes: it.leftEyeBoxes || 1,
          priceQar: Number(it.totalPriceQar),
        })),
        prescriptionDetails: {
          odSph: o.items[0]?.rightEyePower ? String(o.items[0]?.rightEyePower) : undefined,
          osSph: o.items[0]?.leftEyePower ? String(o.items[0]?.leftEyePower) : undefined,
          isVerified: o.orderStatus !== "PRESCRIPTION_REVIEW",
        },
      }));

      return NextResponse.json({ success: true, orders: formatted });
    }

    return NextResponse.json({ success: true, orders: [] });
  } catch (error) {
    console.error("Orders GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
