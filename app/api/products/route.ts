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
          images: true,
          category: true,
        },
      });
    } catch (e) {
      // Offline fallback to MOCK_PRODUCTS
    }

    if (dbProducts && dbProducts.length > 0) {
      return NextResponse.json({ success: true, products: dbProducts });
    }

    // Fallback to in-memory mock products
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
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 });
  }
}
