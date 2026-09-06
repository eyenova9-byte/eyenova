import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminRequest } from "@/lib/authGuard";
import { InventoryAdjustSchema } from "@/lib/validations/schemas";

export async function POST(request: Request) {
  try {
    const auth = verifyAdminRequest(request);
    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Administrator session required." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validation = InventoryAdjustSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid inventory adjustment data",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      productId,
      storeId,
      newQuantity,
      deltaQuantity,
      reason,
      note,
    } = validation.data;

    if (!productId) {
      return NextResponse.json(
        { success: false, error: "productId is required" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        storeStocks: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    let targetStoreId = storeId;
    if (!targetStoreId) {
      const defaultStore = await prisma.store.findFirst();
      targetStoreId = defaultStore?.id;
    }

    if (!targetStoreId) {
      return NextResponse.json(
        { success: false, error: "No store branch available" },
        { status: 400 }
      );
    }

    // Find current stock at this store
    const existingStoreStock = await prisma.storeStock.findUnique({
      where: {
        storeId_productId: {
          storeId: targetStoreId,
          productId,
        },
      },
    });

    const currentStoreQty = existingStoreStock ? existingStoreStock.stockQuantity : 0;
    let finalStoreQty = currentStoreQty;

    if (newQuantity !== undefined) {
      finalStoreQty = Math.max(0, Number(newQuantity));
    } else if (deltaQuantity !== undefined) {
      finalStoreQty = Math.max(0, currentStoreQty + Number(deltaQuantity));
    }

    const calculatedDelta = finalStoreQty - currentStoreQty;

    // 1. Upsert storeStock
    await prisma.storeStock.upsert({
      where: {
        storeId_productId: {
          storeId: targetStoreId,
          productId,
        },
      },
      update: {
        stockQuantity: finalStoreQty,
      },
      create: {
        storeId: targetStoreId,
        productId,
        stockQuantity: finalStoreQty,
        minStockAlert: 3,
      },
    });

    // 2. Recalculate total product stock across all stores
    const allStoreStocks = await prisma.storeStock.findMany({
      where: { productId },
    });
    const totalAggregatedStock = allStoreStocks.reduce(
      (sum, s) => sum + s.stockQuantity,
      0
    );

    // 3. Update Product record with new total combined quantity
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        stockQuantity: totalAggregatedStock,
      },
      include: {
        images: true,
        category: true,
        storeStocks: {
          include: {
            store: true,
          },
        },
      },
    });

    // 4. Record audit trail in StockAdjustment table
    await prisma.stockAdjustment.create({
      data: {
        productId,
        systemQty: currentStoreQty,
        countedQty: finalStoreQty,
        deltaQty: calculatedDelta,
        reason: reason || "STOCK_COUNT",
        note: note || `Stock adjusted via Admin Store Control Center.`,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Stock adjusted successfully across store branches.",
      product: {
        ...updatedProduct,
        stockQuantity: totalAggregatedStock,
        totalInventoryAcrossAllStores: totalAggregatedStock,
        basePriceQar: Number(updatedProduct.basePriceQar),
      },
    });
  } catch (error) {
    console.error("Inventory adjustment error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to adjust inventory in database" },
      { status: 500 }
    );
  }
}
