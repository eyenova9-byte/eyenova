import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { MOCK_PRODUCTS } from "@/lib/mockData";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const brand = searchParams.get("brand");
    const search = searchParams.get("search");

    let dbProducts = null;
    try {
      dbProducts = await prisma.product.findMany({
        where: {
          isActive: true,
          ...(category && category !== "all" ? { category: { slug: category } } : {}),
          ...(brand && brand !== "all" ? { brandName: { equals: brand, mode: "insensitive" } } : {}),
          ...(search ? { titleEn: { contains: search, mode: "insensitive" } } : {}),
        },
        include: {
          images: {
            orderBy: { sortOrder: "asc" },
          },
          category: true,
          storeStocks: {
            include: {
              store: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    } catch (e) {
      console.warn("Database product query fallback:", e);
    }

    if (dbProducts && dbProducts.length > 0) {
      const formatted = dbProducts.map((p) => {
        // Compute total quantity across all store branches combined
        const totalStoreStock =
          p.storeStocks && p.storeStocks.length > 0
            ? p.storeStocks.reduce((sum, s) => sum + (s.stockQuantity || 0), 0)
            : p.stockQuantity;

        return {
          ...p,
          categorySlug: p.category?.slug || "colored-lenses",
          // The quantity shown in website is total of all quantities in every store
          stockQuantity: totalStoreStock,
          totalInventoryAcrossAllStores: totalStoreStock,
          storeBreakdown: (p.storeStocks || []).map((s) => ({
            storeId: s.storeId,
            storeName: s.store?.name,
            storeCode: s.store?.code,
            quantity: s.stockQuantity,
          })),
          basePriceQar: Number(p.basePriceQar),
          salePriceQar: p.salePriceQar ? Number(p.salePriceQar) : undefined,
          costPriceQar: p.costPriceQar ? Number(p.costPriceQar) : undefined,
          baseCurve: p.baseCurve ? Number(p.baseCurve) : undefined,
          diameter: p.diameter ? Number(p.diameter) : undefined,
          waterContent: p.waterContent ? Number(p.waterContent) : undefined,
          lensWidth: p.lensWidth ? Number(p.lensWidth) : undefined,
          bridgeWidth: p.bridgeWidth ? Number(p.bridgeWidth) : undefined,
          templeLength: p.templeLength ? Number(p.templeLength) : undefined,
        };
      });
      return NextResponse.json({ success: true, products: formatted });
    }

    // Fallback to in-memory mock products if DB is unreachable
    let filtered = MOCK_PRODUCTS;
    if (category && category !== "all") {
      filtered = filtered.filter((p) => p.categorySlug === category);
    }
    if (brand && brand !== "all") {
      filtered = filtered.filter((p) => p.brandName.toLowerCase() === brand.toLowerCase());
    }
    if (search) {
      filtered = filtered.filter((p) => p.titleEn.toLowerCase().includes(search.toLowerCase()));
    }

    return NextResponse.json({ success: true, products: filtered });
  } catch (error) {
    console.error("Products GET error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      sku,
      titleEn,
      titleAr,
      slug,
      descriptionEn,
      descriptionAr,
      categorySlug,
      brandName,
      basePriceQar,
      salePriceQar,
      stockQuantity,
      productType,
      images,
      lensDuration,
      packSize,
      baseCurve,
      diameter,
      waterContent,
    } = body;

    // Find category
    let category = await prisma.category.findUnique({
      where: { slug: categorySlug || "colored-lenses" },
    });

    if (!category) {
      category = await prisma.category.findFirst();
    }

    const autoSku = sku || `${(brandName || "EYE").substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const autoSlug = slug || titleEn.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const initialQty = Number(stockQuantity || 0);

    const newProduct = await prisma.product.create({
      data: {
        sku: autoSku,
        barcode: `629110${Math.floor(1000000 + Math.random() * 9000000)}`,
        titleEn,
        titleAr: titleAr || titleEn,
        slug: autoSlug,
        descriptionEn: descriptionEn || "Added via EyeNova POS / Management.",
        descriptionAr: descriptionAr || "تمت إضافته عبر نظام إدارة عين نوفا.",
        categoryId: category!.id,
        brandName: brandName || "EyeNova",
        basePriceQar: Number(basePriceQar),
        salePriceQar: salePriceQar ? Number(salePriceQar) : null,
        stockQuantity: initialQty,
        productType: productType || "COLORED_CONTACT_LENSES",
        lensDuration: lensDuration || null,
        packSize: packSize ? Number(packSize) : null,
        baseCurve: baseCurve ? Number(baseCurve) : null,
        diameter: diameter ? Number(diameter) : null,
        waterContent: waterContent ? Number(waterContent) : null,
        images: {
          create: (images || []).map((img: any, idx: number) => ({
            imageUrl: typeof img === "string" ? img : img.imageUrl,
            isPrimary: idx === 0,
            sortOrder: idx,
            altEn: titleEn,
            altAr: titleAr || titleEn,
          })),
        },
      },
      include: {
        images: true,
        category: true,
      },
    });

    // If stores exist, allocate stock to the main store/warehouse by default
    const mainStore = await prisma.store.findFirst();
    if (mainStore && initialQty > 0) {
      await prisma.storeStock.upsert({
        where: {
          storeId_productId: {
            storeId: mainStore.id,
            productId: newProduct.id,
          },
        },
        update: { stockQuantity: initialQty },
        create: {
          storeId: mainStore.id,
          productId: newProduct.id,
          stockQuantity: initialQty,
        },
      });
    }

    return NextResponse.json({
      success: true,
      product: {
        ...newProduct,
        categorySlug: newProduct.category?.slug,
        basePriceQar: Number(newProduct.basePriceQar),
      },
    });
  } catch (error) {
    console.error("Products POST error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create product in database" },
      { status: 500 }
    );
  }
}
