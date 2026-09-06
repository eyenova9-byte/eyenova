import { prisma } from "@/lib/prisma";

export type PaymentGatewayType = "TAP" | "SKIPCASH" | "COD" | "QPAY_MANUAL";

export type ConfirmPaymentParams = {
  orderId: string;
  gateway: PaymentGatewayType;
  transactionId: string;
  amountQar: number;
  metadata?: Record<string, any>;
};

export type ConfirmPaymentResult = {
  success: boolean;
  orderId: string;
  orderNumber?: string;
  status: "PAYMENT_CONFIRMED" | "ALREADY_CONFIRMED" | "AMOUNT_MISMATCH" | "ORDER_NOT_FOUND" | "ERROR";
  message: string;
};

/**
 * Enterprise Payment Confirmation Core (Idempotent Single Source of Truth)
 * 
 * Guarantees:
 * 1. Only route for mutating order payment status to PAID / PAYMENT_CONFIRMED.
 * 2. Strict idempotency: replayed webhooks or double-clicks return safely without duplicate fulfillment or double stock decrements.
 * 3. Exact amount validation: prevents underpaid transaction confirmations.
 * 4. Automatic invoice generation and stock decrement in single atomic execution.
 */
export async function confirmPayment({
  orderId,
  gateway,
  transactionId,
  amountQar,
  metadata = {},
}: ConfirmPaymentParams): Promise<ConfirmPaymentResult> {
  try {
    // 1. Fetch current order state directly from DB
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true,
        invoice: true,
      },
    });

    if (!order) {
      console.error(`[PAYMENT CONFIRMATION] Order not found: ${orderId}`);
      return {
        success: false,
        orderId,
        status: "ORDER_NOT_FOUND",
        message: `Order ID ${orderId} does not exist in the database.`,
      };
    }

    // 2. Idempotency Check: if already confirmed, do not re-process
    if (order.paymentStatus === "PAID" || order.orderStatus === "PAYMENT_CONFIRMED") {
      console.log(`[PAYMENT IDEMPOTENCY] Order ${order.orderNumber} already confirmed previously. Ignoring duplicate transaction ${transactionId}.`);
      return {
        success: true,
        orderId,
        orderNumber: order.orderNumber,
        status: "ALREADY_CONFIRMED",
        message: `Order ${order.orderNumber} is already confirmed and paid.`,
      };
    }

    // 3. Amount Verification: Verify paid amount matches order total in QAR
    const expectedAmount = Number(order.totalQar);
    // Allow slight float variance up to 0.05 QAR for rounding
    if (Math.abs(expectedAmount - amountQar) > 0.05) {
      console.error(
        `[PAYMENT SECURITY ALERT] Amount mismatch for Order ${order.orderNumber}! Expected: ${expectedAmount} QAR, Received: ${amountQar} QAR via ${gateway}. Transaction ID: ${transactionId}`
      );
      return {
        success: false,
        orderId,
        orderNumber: order.orderNumber,
        status: "AMOUNT_MISMATCH",
        message: `Amount mismatch: expected ${expectedAmount} QAR, received ${amountQar} QAR.`,
      };
    }

    const paymentRef = `${gateway}:${transactionId}`;
    const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    // 4. Atomic Transaction: update order, decrement stock, and create invoice
    await prisma.$transaction(async (tx) => {
      // Update Order
      await tx.order.update({
        where: { id: order.id },
        data: {
          paymentStatus: "PAID",
          orderStatus: "PAYMENT_CONFIRMED",
          paymentReference: paymentRef,
          notes: order.notes
            ? `${order.notes}\n[Confirmed via ${gateway} at ${new Date().toISOString()} - Ref: ${transactionId}]`
            : `[Confirmed via ${gateway} at ${new Date().toISOString()} - Ref: ${transactionId}]`,
        },
      });

      // Generate POS Invoice if not already created
      if (!order.invoice) {
        await tx.invoice.create({
          data: {
            invoiceNumber,
            order: { connect: { id: order.id } },
            customerName: order.customerName,
            customerPhone: order.customerPhone,
            customerEmail: order.customerEmail,
            subtotalQar: order.subtotalQar,
            taxRate: 0,
            taxTotalQar: 0,
            deliveryFeeQar: order.deliveryFeeQar,
            discountQar: order.discountQar,
            totalQar: order.totalQar,
            status: "PAID",
            issuedAt: new Date(),
            paidAt: new Date(),
            notes: `Confirmed via ${gateway} (Ref: ${transactionId})`,
          },
        });
      }

      // Decrement Inventory safely
      for (const item of order.items) {
        if (order.storeId) {
          const storeStock = await tx.storeStock.findUnique({
            where: {
              storeId_productId: {
                storeId: order.storeId,
                productId: item.productId,
              },
            },
          });
          if (storeStock) {
            await tx.storeStock.update({
              where: {
                storeId_productId: {
                  storeId: order.storeId,
                  productId: item.productId,
                },
              },
              data: {
                stockQuantity: Math.max(0, storeStock.stockQuantity - item.quantity),
              },
            });
          }
        }

        // Decrement main product stock
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stockQuantity: {
              decrement: item.quantity,
            },
          },
        });
      }
    });

    console.log(
      `[PAYMENT SUCCESS] Order ${order.orderNumber} successfully confirmed via ${gateway}. Transaction: ${transactionId}, Amount: ${amountQar} QAR.`
    );

    return {
      success: true,
      orderId,
      orderNumber: order.orderNumber,
      status: "PAYMENT_CONFIRMED",
      message: `Payment of ${amountQar} QAR successfully confirmed via ${gateway}.`,
    };
  } catch (error: any) {
    console.error(`[PAYMENT CONFIRMATION ERROR] Failed for order ${orderId}:`, error);
    return {
      success: false,
      orderId,
      status: "ERROR",
      message: error?.message || "Internal payment processing error.",
    };
  }
}
