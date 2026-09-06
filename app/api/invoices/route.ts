import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminRequest } from "@/lib/authGuard";

export async function GET(request: Request) {
  try {
    const auth = verifyAdminRequest(request);
    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Administrator session required." },
        { status: 401 }
      );
    }
    let dbInvoices = null;
    let companyProfile = null;
    try {
      dbInvoices = await prisma.invoice.findMany({
        include: {
          order: {
            include: {
              items: {
                include: {
                  product: {
                    include: {
                      images: true,
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      companyProfile = await prisma.companyProfile.findFirst();
    } catch (e) {
      console.warn("DB find invoices error:", e);
    }

    if (dbInvoices && dbInvoices.length > 0) {
      const formatted = dbInvoices.map((inv) => ({
        id: inv.id,
        invoiceNumber: inv.invoiceNumber,
        orderNumber: inv.order?.orderNumber || "EN-QAT-POS",
        customerName: inv.customerName,
        customerPhone: inv.customerPhone,
        date: inv.issuedAt ? inv.issuedAt.toISOString().split("T")[0] : inv.createdAt.toISOString().split("T")[0],
        subtotalQar: Number(inv.subtotalQar),
        taxTotalQar: Number(inv.taxTotalQar),
        deliveryFeeQar: Number(inv.deliveryFeeQar),
        totalQar: Number(inv.totalQar),
        status: inv.status,
        companyProfile: companyProfile || {
          nameEn: "EyeNova Optical & Eye Care",
          nameAr: "عين نوفا للبصريات والعناية بالعين",
          crNumber: "CR-974-88392",
          vatNumber: "VAT-QAT-00129",
          addressEn: "Shop 12, Villaggio Mall, Doha, Qatar",
          phone: "+974 4411 2233",
        },
        items: inv.order?.items.map((it) => ({
          title: it.product.titleEn,
          sku: it.product.sku,
          quantity: it.quantity,
          unitPriceQar: Number(it.unitPriceQar),
          totalPriceQar: Number(it.totalPriceQar),
        })) || [],
      }));

      return NextResponse.json({ success: true, invoices: formatted });
    }

    return NextResponse.json({
      success: true,
      invoices: [],
    });
  } catch (error) {
    console.error("Invoices GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch invoices" },
      { status: 500 }
    );
  }
}
