import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { MOCK_PRODUCTS } from "@/lib/mockData";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    let dbProduct = null;
    try {
      dbProduct = await prisma.product.findFirst({
        where: {
          OR: [
            { id: slug },
            { slug: slug },
            { slug: `${slug}-30-pack` },
            { slug: `${slug}-90-pack` },
          ],
          isActive: true,
        },
        include: {
          images: {
            orderBy: { sortOrder: "asc" },
          },
          category: true,
          attributes: {
            include: {
              attribute: true,
            },
          },
          storeStocks: {
            include: {
              store: true,
            },
          },
        },
      });
    } catch (e) {
      console.warn("DB find product error:", e);
    }

    if (dbProduct) {
      // Aggregate total quantity across all stores
      const totalStoreQuantity =
        dbProduct.storeStocks && dbProduct.storeStocks.length > 0
          ? dbProduct.storeStocks.reduce((sum, s) => sum + (s.stockQuantity || 0), 0)
          : dbProduct.stockQuantity;

      const formatted = {
        ...dbProduct,
        categorySlug: dbProduct.category?.slug || "colored-lenses",
        // Total combined quantity from every store branch:
        stockQuantity: totalStoreQuantity,
        totalInventoryAcrossAllStores: totalStoreQuantity,
        storeBreakdown: (dbProduct.storeStocks || []).map((s) => ({
          storeId: s.storeId,
          storeName: s.store?.name,
          storeCode: s.store?.code,
          quantity: s.stockQuantity,
        })),
        basePriceQar: Number(dbProduct.basePriceQar),
        salePriceQar: dbProduct.salePriceQar ? Number(dbProduct.salePriceQar) : undefined,
        costPriceQar: dbProduct.costPriceQar ? Number(dbProduct.costPriceQar) : undefined,
        baseCurve: dbProduct.baseCurve ? Number(dbProduct.baseCurve) : undefined,
        diameter: dbProduct.diameter ? Number(dbProduct.diameter) : undefined,
        waterContent: dbProduct.waterContent ? Number(dbProduct.waterContent) : undefined,
        lensWidth: dbProduct.lensWidth ? Number(dbProduct.lensWidth) : undefined,
        bridgeWidth: dbProduct.bridgeWidth ? Number(dbProduct.bridgeWidth) : undefined,
        templeLength: dbProduct.templeLength ? Number(dbProduct.templeLength) : undefined,
      };
      return NextResponse.json({ success: true, product: formatted });
    }

    // Fallback to MOCK_PRODUCTS
    const mock =
      MOCK_PRODUCTS.find(
        (p) =>
          p.id === slug ||
          p.slug === slug ||
          p.slug === `${slug}-30-pack` ||
          (slug === "1-day-acuvue-moist" && p.slug.startsWith("1-day-acuvue-moist"))
      ) ||
      MOCK_PRODUCTS.find((p) => p.slug === "1-day-acuvue-moist") ||
      MOCK_PRODUCTS[0];

    return NextResponse.json({ success: true, product: mock });
  } catch (error) {
    console.error("Product [slug] GET error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const {
      titleEn,
      titleAr,
      sku,
      barcode,
      brandName,
      basePriceQar,
      salePriceQar,
      isActive,
      stockQuantity,
      descriptionEn,
    } = body;

    // Find product by id or slug
    const target = await prisma.product.findFirst({
      where: {
        OR: [{ id: slug }, { slug }],
      },
    });

    if (!target) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    const updated = await prisma.product.update({
      where: { id: target.id },
      data: {
        ...(titleEn ? { titleEn } : {}),
        ...(titleAr ? { titleAr } : {}),
        ...(sku ? { sku } : {}),
        ...(barcode ? { barcode } : {}),
        ...(brandName ? { brandName } : {}),
        ...(basePriceQar !== undefined ? { basePriceQar: Number(basePriceQar) } : {}),
        ...(salePriceQar !== undefined ? { salePriceQar: salePriceQar ? Number(salePriceQar) : null } : {}),
        ...(isActive !== undefined ? { isActive: Boolean(isActive) } : {}),
        ...(stockQuantity !== undefined ? { stockQuantity: Number(stockQuantity) } : {}),
        ...(descriptionEn ? { descriptionEn } : {}),
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

    const totalStock =
      updated.storeStocks && updated.storeStocks.length > 0
        ? updated.storeStocks.reduce((sum, s) => sum + (s.stockQuantity || 0), 0)
        : updated.stockQuantity;

    return NextResponse.json({
      success: true,
      product: {
        ...updated,
        stockQuantity: totalStock,
        totalInventoryAcrossAllStores: totalStock,
        basePriceQar: Number(updated.basePriceQar),
        salePriceQar: updated.salePriceQar ? Number(updated.salePriceQar) : undefined,
      },
    });
  } catch (error) {
    console.error("Product PUT error:", error);
    return NextResponse.json({ success: false, error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const target = await prisma.product.findFirst({
      where: {
        OR: [{ id: slug }, { slug }],
      },
    });

    if (!target) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    // Clean relations
    await prisma.storeStock.deleteMany({ where: { productId: target.id } });
    await prisma.productBatch.deleteMany({ where: { productId: target.id } });
    await prisma.stockAdjustment.deleteMany({ where: { productId: target.id } });
    await prisma.productImage.deleteMany({ where: { productId: target.id } });
    await prisma.productAttribute.deleteMany({ where: { productId: target.id } });

    await prisma.product.delete({
      where: { id: target.id },
    });

    return NextResponse.json({ success: true, message: "Product deleted from database" });
  } catch (error) {
    console.error("Product DELETE error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete product" }, { status: 500 });
  }
}
