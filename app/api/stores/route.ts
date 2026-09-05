import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const stores = await prisma.store.findMany({
      include: {
        _count: {
          select: {
            stocks: true,
            orders: true,
          },
        },
      },
      orderBy: { code: "asc" },
    });

    return NextResponse.json({ success: true, stores });
  } catch (error) {
    console.error("Stores GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stores" },
      { status: 500 }
    );
  }
}
