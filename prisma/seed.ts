import {
  PrismaClient,
  ProductType,
  ContactLensDuration,
  AttributeType,
  LensUsage,
  OrderStatus,
  PaymentMethod,
  InvoiceStatus,
  OrderSource,
  FulfillmentType,
} from "@prisma/client";
import { MOCK_PRODUCTS } from "../lib/mockData";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding EyeNova Multi-Store Database & Billing Records...");

  // 1. Clear existing data in correct relational dependency order
  console.log("Cleaning old tables...");
  await prisma.invoice.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.storeStock.deleteMany();
  await prisma.productBatch.deleteMany();
  await prisma.stockAdjustment.deleteMany();
  await prisma.userAccount.deleteMany();
  await prisma.store.deleteMany();
  await prisma.productAttribute.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.attribute.deleteMany();
  await prisma.lensOption.deleteMany();
  await prisma.banner.deleteMany();
  await prisma.companyProfile.deleteMany();
  await prisma.storeSetting.deleteMany();

  // 2. Company Profile (For POS Receipts & Invoices)
  console.log("Creating Company Profile...");
  await prisma.companyProfile.create({
    data: {
      nameEn: "EyeNova Optical & Eye Care",
      nameAr: "عين نوفا للبصريات والعناية بالعين",
      email: "support@eyenova.com",
      phone: "+974 4411 2233",
      addressEn: "Shop 12, Villaggio Mall, West Bay, Doha, Qatar",
      addressAr: "محل ١٢، فيلاجو مول، الخليج الغربي، الدوحة، قطر",
      crNumber: "CR-974-88392",
      vatNumber: "VAT-QAT-00129",
      currency: "QAR",
      taxRate: 0.0, // Qatar 0% VAT
      invoiceFooter: "Thank you for trusting EyeNova for your eye care & beauty! / شكراً لثقتكم بعين نوفا",
    },
  });

  // 3. Create Retail Stores & Branches in Qatar
  console.log("Creating Retail Stores & Fulfillment Branches...");
  const storeVillaggio = await prisma.store.create({
    data: {
      name: "EyeNova Villaggio Mall",
      code: "DOH-VIL-01",
      address: "Shop 12, Luxury Wing, Villaggio Mall, Aspire Zone, Doha",
      phone: "+974 4411 2231",
      isActive: true,
    },
  });

  const storeFestivalCity = await prisma.store.create({
    data: {
      name: "EyeNova Doha Festival City",
      code: "DOH-DFC-02",
      address: "Ground Floor, Court 3, Doha Festival City, Umm Salal",
      phone: "+974 4411 2232",
      isActive: true,
    },
  });

  const storeMallOfQatar = await prisma.store.create({
    data: {
      name: "EyeNova Mall of Qatar",
      code: "DOH-MOQ-03",
      address: "First Floor, Fashion Avenue, Mall of Qatar, Al Rayyan",
      phone: "+974 4411 2233",
      isActive: true,
    },
  });

  const storeCentralHub = await prisma.store.create({
    data: {
      name: "EyeNova Central Warehouse & E-Commerce Hub",
      code: "DOH-WH-01",
      address: "Building 8, Logistics Village, Industrial Area, Doha",
      phone: "+974 4411 2230",
      isActive: true,
    },
  });

  const stores = [storeVillaggio, storeFestivalCity, storeMallOfQatar, storeCentralHub];

  // 4. Categories (Eyenk.com Structure)
  console.log("Creating Categories...");
  const categoriesData = [
    {
      nameEn: "Colored Contact Lenses",
      nameAr: "عدسات لاصقة ملونة",
      slug: "colored-lenses",
      descriptionEn: "Top Middle Eastern & global colored lenses from Bella, Amara, Lensme, and Diva.",
      descriptionAr: "أفخم ماركات العدسات الملونة: بيلا، أمارا، لينس مي، وديفا.",
      imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop",
      sortOrder: 1,
    },
    {
      nameEn: "Medical Clear Lenses",
      nameAr: "عدسات طبية شفافة",
      slug: "medical-lenses",
      descriptionEn: "Daily, bi-weekly & monthly clear prescription lenses from Acuvue, Alcon & Biofinity.",
      descriptionAr: "عدسات تصحيح النظر الشفافة اليومية والشهرية من أكوفيو وألكون.",
      imageUrl: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=600&auto=format&fit=crop",
      sortOrder: 2,
    },
    {
      nameEn: "Solutions & Eye Drops",
      nameAr: "المحاليل وقطرات العين",
      slug: "solutions-drops",
      descriptionEn: "Multi-purpose disinfecting solutions and dry-eye lubricating drops.",
      descriptionAr: "محاليل تعقيم العدسات وقطرات ترطيب العين والجفاف.",
      imageUrl: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&auto=format&fit=crop",
      sortOrder: 3,
    },
    {
      nameEn: "Optical Eyeglasses",
      nameAr: "النظارات الطبية",
      slug: "eyeglasses",
      descriptionEn: "Ultra-light titanium, TR90 memory plastic & acetate frames with custom blue light lenses.",
      descriptionAr: "إطارات تيتانيوم وفائقة الخفة مع عدسات حماية الضوء الأزرق.",
      imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop",
      sortOrder: 4,
    },
    {
      nameEn: "Sunglasses",
      nameAr: "النظارات الشمسية",
      slug: "sunglasses",
      descriptionEn: "100% UV400 protection and polarized designer sunglasses.",
      descriptionAr: "نظارات شمسية مستقطبة وحماية كاملة من الأشعة فوق البنفسجية.",
      imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop",
      sortOrder: 5,
    },
    {
      nameEn: "Lashes & Beauty Accessories",
      nameAr: "الرموش ومستلزمات التجميل",
      slug: "lashes",
      descriptionEn: "Luxury 3D silk lashes, applicators and cosmetic eye care.",
      descriptionAr: "رموش حريرية فاخرة ثلاثية الأبعاد وأدوات تركيب ومستحضرات تجميل العين.",
      imageUrl: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=600&auto=format&fit=crop",
      sortOrder: 6,
    },
  ];

  const categoryMap = new Map<string, string>();
  for (const c of categoriesData) {
    const created = await prisma.category.create({ data: c });
    categoryMap.set(c.slug, created.id);
  }

  // 5. Dynamic Attributes (Brands & Color Shades)
  console.log("Creating Attributes (Brands & Color Shades)...");
  const brandsData = [
    { nameEn: "Bella", nameAr: "بيلا", slug: "bella" },
    { nameEn: "Lensme", nameAr: "لينس مي", slug: "lensme" },
    { nameEn: "Amara", nameAr: "أمارا", slug: "amara" },
    { nameEn: "Diva", nameAr: "ديفا", slug: "diva" },
    { nameEn: "Acuvue", nameAr: "أكوفيو", slug: "acuvue" },
    { nameEn: "Alcon", nameAr: "ألكون", slug: "alcon" },
    { nameEn: "CooperVision", nameAr: "كوبر فيجن", slug: "coopervision" },
    { nameEn: "Bausch & Lomb", nameAr: "بوش أند لومب", slug: "bausch-lomb" },
    { nameEn: "Allergan", nameAr: "أليرجان", slug: "allergan" },
    { nameEn: "EyeNova", nameAr: "عين نوفا", slug: "eyenova" },
  ];

  const brandMap = new Map<string, string>();
  for (const b of brandsData) {
    const attr = await prisma.attribute.create({
      data: {
        type: AttributeType.BRAND,
        nameEn: b.nameEn,
        nameAr: b.nameAr,
        slug: b.slug,
      },
    });
    brandMap.set(b.nameEn.toLowerCase(), attr.id);
  }

  const shadesData = [
    { nameEn: "Gray", nameAr: "رمادي", slug: "gray", hexColor: "#808080" },
    { nameEn: "Brown", nameAr: "بني", slug: "brown", hexColor: "#8B4513" },
    { nameEn: "Hazel", nameAr: "عسلي", slug: "hazel", hexColor: "#D2691E" },
    { nameEn: "Green", nameAr: "أخضر", slug: "green", hexColor: "#2E8B57" },
    { nameEn: "Blue", nameAr: "أزرق", slug: "blue", hexColor: "#1E90FF" },
    { nameEn: "Olive", nameAr: "زيتي", slug: "olive", hexColor: "#808000" },
  ];

  const shadeMap = new Map<string, string>();
  for (const s of shadesData) {
    const attr = await prisma.attribute.create({
      data: {
        type: AttributeType.COLOR_SHADE,
        nameEn: s.nameEn,
        nameAr: s.nameAr,
        slug: s.slug,
        hexColor: s.hexColor,
      },
    });
    shadeMap.set(s.slug, attr.id);
  }

  // Helpers
  const mapDuration = (d?: string): ContactLensDuration | null => {
    if (!d) return null;
    switch (d) {
      case "DAILY_DISPOSABLE":
        return ContactLensDuration.DAILY_DISPOSABLE;
      case "BI_WEEKLY":
        return ContactLensDuration.BI_WEEKLY;
      case "MONTHLY":
        return ContactLensDuration.MONTHLY;
      case "3_MONTHS":
        return ContactLensDuration.QUARTERLY;
      case "6_MONTHS":
        return ContactLensDuration.SEMI_ANNUAL;
      case "YEARLY":
        return ContactLensDuration.YEARLY;
      default:
        return null;
    }
  };

  const mapType = (t: string): ProductType => {
    switch (t) {
      case "COLORED_CONTACT_LENSES":
        return ProductType.COLORED_CONTACT_LENSES;
      case "MEDICAL_CONTACT_LENSES":
        return ProductType.MEDICAL_CONTACT_LENSES;
      case "LENS_SOLUTION_CARE":
        return ProductType.LENS_SOLUTION_CARE;
      case "SPECTACLES":
        return ProductType.SPECTACLES;
      case "SUNGLASSES":
        return ProductType.SUNGLASSES;
      case "LASHES_BEAUTY":
        return ProductType.LASHES_BEAUTY;
      default:
        return ProductType.COLORED_CONTACT_LENSES;
    }
  };

  // 6. Seed all 24 Products, Images & StoreStock Multi-Store Allocations
  console.log(`Seeding ${MOCK_PRODUCTS.length} Products with images & multi-store stock...`);
  const createdProducts = [];

  for (let i = 0; i < MOCK_PRODUCTS.length; i++) {
    const p = MOCK_PRODUCTS[i];
    const categoryId = categoryMap.get(p.categorySlug) || categoryMap.get("colored-lenses")!;
    const barcode = `629110829${String(1000 + i).padStart(4, "0")}`;
    const totalQty = p.stockQuantity;

    // Distribute inventory across 4 stores so the total sum = totalQty
    // e.g. Store 1: ~25%, Store 2: ~30%, Store 3: ~20%, Store 4: remainder
    const q1 = Math.floor(totalQty * 0.25);
    const q2 = Math.floor(totalQty * 0.30);
    const q3 = Math.floor(totalQty * 0.20);
    const q4 = totalQty - (q1 + q2 + q3);
    const storeQtyAllocation = [q1, q2, q3, q4];

    const createdProd = await prisma.product.create({
      data: {
        id: p.id,
        sku: p.sku,
        barcode: barcode,
        productType: mapType(p.productType),
        titleEn: p.titleEn,
        titleAr: p.titleAr,
        slug: p.slug,
        descriptionEn: p.descriptionEn,
        descriptionAr: p.descriptionAr,
        categoryId: categoryId,
        brandName: p.brandName,
        collectionName: p.collectionName || null,
        basePriceQar: p.basePriceQar,
        salePriceQar: p.salePriceQar || null,
        // The total quantity across all stores combined:
        stockQuantity: totalQty,
        minStockAlert: 3,
        manufactureDate: new Date("2025-01-15"),
        expiryDate: new Date("2029-12-31"),
        isFeatured: p.isFeatured,
        isActive: true,
        lensDuration: mapDuration(p.lensDuration),
        packSize: p.packSize || null,
        baseCurve: p.baseCurve || null,
        diameter: p.diameter || null,
        waterContent: p.waterContent || null,
        hasPrescription: p.productType.includes("CONTACT_LENSES"),
        hasPlanoOption: p.productType === "COLORED_CONTACT_LENSES",
        colorNameEn: p.colorNameEn || null,
        colorNameAr: p.colorNameAr || null,
        colorHex: p.colorHex || null,
        availablePowers: p.availablePowers ? p.availablePowers : [],
        lensWidth: p.lensWidth || null,
        bridgeWidth: p.bridgeWidth || null,
        templeLength: p.templeLength || null,
        tryOnModelUrl: p.tryOnModelUrl || null,
        images: {
          create: p.images.map((img, idx) => ({
            imageUrl: img.imageUrl,
            isPrimary: img.isPrimary,
            isEyeShot: !!img.isEyeShot,
            sortOrder: idx,
            altEn: p.titleEn,
            altAr: p.titleAr,
          })),
        },
      },
    });

    // Populate StoreStock for each of the 4 stores
    for (let sIdx = 0; sIdx < stores.length; sIdx++) {
      await prisma.storeStock.create({
        data: {
          storeId: stores[sIdx].id,
          productId: createdProd.id,
          stockQuantity: storeQtyAllocation[sIdx],
          minStockAlert: 3,
        },
      });
    }

    // Populate ProductBatch for central warehouse
    await prisma.productBatch.create({
      data: {
        productId: createdProd.id,
        storeId: storeCentralHub.id,
        batchNumber: `BATCH-2025-Q1-${createdProd.sku.substring(0, 5)}`,
        manufactureDate: new Date("2025-01-15"),
        expiryDate: new Date("2029-12-31"),
        quantity: q4,
      },
    });

    // Link brand attribute
    const brandId = brandMap.get(p.brandName.toLowerCase());
    if (brandId) {
      await prisma.productAttribute.create({
        data: {
          productId: createdProd.id,
          attributeId: brandId,
        },
      });
    }

    createdProducts.push(createdProd);
  }

  // 7. Seed Lens Options
  console.log("Creating Lens Options for Optical Glasses...");
  await prisma.lensOption.createMany({
    data: [
      {
        nameEn: "Zero Power Digital Blue Shield UV420",
        nameAr: "حماية الضوء الأزرق للأجهزة بدون مقاس (0.00)",
        lensUsage: LensUsage.ZERO_POWER_COMPUTER,
        lensIndex: "1.56",
        coating: "Blue Shield UV420 + Anti-Scratch",
        priceQar: 95.0,
      },
      {
        nameEn: "Single Vision Thin 1.61 Anti-Reflective",
        nameAr: "رؤية فردية رقيقة 1.61 مع طبقة منع الانعكاس",
        lensUsage: LensUsage.SINGLE_VISION_DISTANCE,
        lensIndex: "1.61",
        coating: "Anti-Reflective + Hydrophobic",
        priceQar: 150.0,
      },
      {
        nameEn: "Progressive Free-Form Ultra Thin 1.67",
        nameAr: "عدسات تدريجية متعددة البؤر 1.67 رقيقة جداً",
        lensUsage: LensUsage.PROGRESSIVE,
        lensIndex: "1.67",
        coating: "Free-Form Digital + Photochromic Sun Tint",
        priceQar: 380.0,
      },
    ],
  });

  // 8. Seed Banners & Store Settings
  console.log("Creating Promotional Banners & Store Settings...");
  await prisma.banner.create({
    data: {
      titleEn: "Qatar's #1 Online Contact Lens & Optical Store",
      titleAr: "المتجر الأول في قطر للعدسات اللاصقة والنظارات",
      subtitleEn: "Discover Bella, Amara, Lensme & Acuvue with Same-Day Delivery in Doha.",
      subtitleAr: "اكتشفي أجمل تشكيلة عدسات بيلا، أمارا، ولينس مي مع توصيل سريع بنفس اليوم.",
      imageUrlEn: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&auto=format&fit=crop",
      imageUrlAr: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&auto=format&fit=crop",
      linkUrl: "/shop?category=colored-lenses",
      badgeTextEn: "⚡ Same Day Delivery",
      badgeTextAr: "⚡ توصيل في نفس اليوم",
      sortOrder: 1,
    },
  });

  await prisma.storeSetting.createMany({
    data: [
      { key: "FREE_DELIVERY_THRESHOLD_QAR", value: "200", description: "Free shipping threshold in Qatar" },
      { key: "WHATSAPP_SUPPORT_PHONE", value: "+97455123456", description: "Direct optical WhatsApp support" },
      { key: "INVENTORY_SYNC_POLICY", value: "ALL_STORES_AGGREGATED", description: "Website displays total stock from all branches" },
    ],
  });

  // 9. Seed Orders & Invoices (Distinguishing WEBSITE vs IN_STORE_POS)
  console.log("Seeding realistic POS & WEBSITE Invoices & Orders...");

  const prodAcuvue90 = createdProducts.find((p) => p.slug === "1-day-acuvue-moist-90-pack") || createdProducts[0];
  const prodOptiFree = createdProducts.find((p) => p.slug === "opti-free-puremoist-300ml") || createdProducts[1];

  // Order 1: POS Physical Store Register Sale at Villaggio Mall
  const order1 = await prisma.order.create({
    data: {
      orderNumber: "EN-QAT-984210",
      orderSource: OrderSource.IN_STORE_POS, // In-Store POS register terminal
      fulfillmentType: FulfillmentType.IN_STORE_TAKEOUT,
      storeId: storeVillaggio.id,
      orderStatus: OrderStatus.PAYMENT_CONFIRMED,
      paymentMethod: PaymentMethod.DEBIT_CARD_QPAY,
      customerName: "Fatima Al-Kuwari",
      customerPhone: "+974 5521 8844",
      customerEmail: "fatima.alkuwari@example.qa",
      deliveryZone: "West Bay, Doha",
      shippingAddress: {
        city: "Doha",
        zone: "West Bay",
        street: "Diplomatic Area St",
        building: "Tower 4, Apt 1202",
      },
      subtotalQar: 473.0,
      deliveryFeeQar: 0.0,
      discountQar: 0.0,
      totalQar: 473.0,
      items: {
        create: [
          {
            productId: prodAcuvue90.id,
            quantity: 1,
            unitPriceQar: 428.0,
            lensPriceQar: 0.0,
            totalPriceQar: 428.0,
            isContactLensOrder: true,
            rightEyePower: -2.5,
            rightEyeBoxes: 1,
            leftEyePower: -2.0,
            leftEyeBoxes: 1,
          },
          {
            productId: prodOptiFree.id,
            quantity: 1,
            unitPriceQar: 45.0,
            lensPriceQar: 0.0,
            totalPriceQar: 45.0,
          },
        ],
      },
    },
  });

  await prisma.invoice.create({
    data: {
      invoiceNumber: "INV-2026-00841",
      orderId: order1.id,
      customerName: "Fatima Al-Kuwari",
      customerPhone: "+974 5521 8844",
      customerEmail: "fatima.alkuwari@example.qa",
      subtotalQar: 473.0,
      taxRate: 0.0,
      taxTotalQar: 0.0,
      discountQar: 0.0,
      deliveryFeeQar: 0.0,
      totalQar: 473.0,
      status: InvoiceStatus.PAID,
      issuedAt: new Date(),
      paidAt: new Date(),
      notes: "In-Store POS register sale at Villaggio Mall branch.",
    },
  });

  // Order 2: E-Commerce Online Store Sale (orderSource: WEBSITE)
  const prodBella = createdProducts.find((p) => p.slug === "bella-diamond-gray-shadow") || createdProducts[0];
  const prodBiotrue = createdProducts.find((p) => p.slug === "biotrue-multi-purpose-solution") || createdProducts[1];

  const order2 = await prisma.order.create({
    data: {
      orderNumber: "EN-QAT-984211",
      orderSource: OrderSource.WEBSITE, // Online Store E-Commerce Sale!
      fulfillmentType: FulfillmentType.HOME_DELIVERY,
      storeId: storeCentralHub.id,
      orderStatus: OrderStatus.READY_FOR_DISPATCH,
      paymentMethod: PaymentMethod.CASH_ON_DELIVERY,
      customerName: "Maryam Al-Thani",
      customerPhone: "+974 6633 9922",
      customerEmail: "m.althani@example.qa",
      deliveryZone: "The Pearl, Doha",
      shippingAddress: {
        city: "Doha",
        zone: "The Pearl-Qatar",
        street: "Porto Arabia, Tower 18",
      },
      subtotalQar: 180.0,
      deliveryFeeQar: 15.0,
      discountQar: 0.0,
      totalQar: 195.0,
      items: {
        create: [
          {
            productId: prodBella.id,
            quantity: 1,
            unitPriceQar: 130.0,
            lensPriceQar: 0.0,
            totalPriceQar: 130.0,
            isContactLensOrder: true,
            isPlano: true,
            rightEyePower: 0.0,
            leftEyePower: 0.0,
          },
          {
            productId: prodBiotrue.id,
            quantity: 1,
            unitPriceQar: 50.0,
            lensPriceQar: 0.0,
            totalPriceQar: 50.0,
          },
        ],
      },
    },
  });

  await prisma.invoice.create({
    data: {
      invoiceNumber: "INV-2026-00842",
      orderId: order2.id,
      customerName: "Maryam Al-Thani",
      customerPhone: "+974 6633 9922",
      customerEmail: "m.althani@example.qa",
      subtotalQar: 180.0,
      taxRate: 0.0,
      taxTotalQar: 0.0,
      discountQar: 0.0,
      deliveryFeeQar: 15.0,
      totalQar: 195.0,
      status: InvoiceStatus.ISSUED,
      issuedAt: new Date(),
      notes: "Website online order with home delivery in Qatar.",
    },
  });

  console.log(`\n🎉 SEED COMPLETED!`);
  console.log(`- 4 Retail & Fulfillment Stores created in Qatar.`);
  console.log(`- 24 Products seeded with total stock distributed across StoreStock.`);
  console.log(`- Website aggregates all store stocks into total quantity.`);
  console.log(`- Orders seeded with explicit orderSource (WEBSITE & IN_STORE_POS).`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
