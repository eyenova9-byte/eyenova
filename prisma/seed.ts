import { PrismaClient, ProductType, ContactLensDuration, AttributeType, LensUsage } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding EyeNova Database with Eyenk.com Parity Data...");

  // 1. Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.productAttribute.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.attribute.deleteMany();
  await prisma.lensOption.deleteMany();
  await prisma.banner.deleteMany();
  await prisma.companyProfile.deleteMany();

  // 2. Company Profile (For POS Receipts & Invoices)
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

  // 3. Categories (Eyenk.com Structure)
  const catColorLenses = await prisma.category.create({
    data: {
      nameEn: "Colored Contact Lenses",
      nameAr: "عدسات لاصقة ملونة",
      slug: "colored-lenses",
      descriptionEn: "Top Middle Eastern & global colored lenses from Bella, Amara, Lensme, and Diva.",
      descriptionAr: "أفخم ماركات العدسات الملونة: بيلا، أمارا، لينس مي، وديفا.",
      imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop",
      sortOrder: 1,
    },
  });

  const catMedicalLenses = await prisma.category.create({
    data: {
      nameEn: "Medical Clear Lenses",
      nameAr: "عدسات طبية شفافة",
      slug: "medical-lenses",
      descriptionEn: "Daily, bi-weekly & monthly clear prescription lenses from Acuvue, Alcon & Biofinity.",
      descriptionAr: "عدسات تصحيح النظر الشفافة اليومية والشهرية من أكوفيو وألكون.",
      imageUrl: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=600&auto=format&fit=crop",
      sortOrder: 2,
    },
  });

  const catSolutions = await prisma.category.create({
    data: {
      nameEn: "Solutions & Eye Drops",
      nameAr: "المحاليل وقطرات العين",
      slug: "solutions-drops",
      descriptionEn: "Multi-purpose disinfecting solutions and dry-eye lubricating drops.",
      descriptionAr: "محاليل تعقيم العدسات وقطرات ترطيب العين والجفاف.",
      imageUrl: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&auto=format&fit=crop",
      sortOrder: 3,
    },
  });

  const catEyeglasses = await prisma.category.create({
    data: {
      nameEn: "Optical Eyeglasses",
      nameAr: "النظارات الطبية",
      slug: "eyeglasses",
      descriptionEn: "Ultra-light titanium, TR90 memory plastic & acetate frames with custom blue light lenses.",
      descriptionAr: "إطارات تيتانيوم وفائقة الخفة مع عدسات حماية الضوء الأزرق.",
      imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop",
      sortOrder: 4,
    },
  });

  const catSunglasses = await prisma.category.create({
    data: {
      nameEn: "Sunglasses",
      nameAr: "النظارات الشمسية",
      slug: "sunglasses",
      descriptionEn: "100% UV400 protection and polarized designer sunglasses.",
      descriptionAr: "نظارات شمسية مستقطبة وحماية كاملة من الأشعة فوق البنفسجية.",
      imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop",
      sortOrder: 5,
    },
  });

  // 4. Dynamic Attributes (Brands, Color Shades, Disposal)
  const brandBella = await prisma.attribute.create({ data: { type: AttributeType.BRAND, nameEn: "Bella", nameAr: "بيلا", slug: "bella" } });
  const brandAmara = await prisma.attribute.create({ data: { type: AttributeType.BRAND, nameEn: "Amara", nameAr: "أمارا", slug: "amara" } });
  const brandLensme = await prisma.attribute.create({ data: { type: AttributeType.BRAND, nameEn: "Lensme", nameAr: "لينس مي", slug: "lensme" } });
  const brandDiva = await prisma.attribute.create({ data: { type: AttributeType.BRAND, nameEn: "Diva", nameAr: "ديفا", slug: "diva" } });
  const brandAcuvue = await prisma.attribute.create({ data: { type: AttributeType.BRAND, nameEn: "Acuvue", nameAr: "أكوفيو", slug: "acuvue" } });

  const shadeGray = await prisma.attribute.create({ data: { type: AttributeType.COLOR_SHADE, nameEn: "Gray", nameAr: "رمادي", slug: "gray", hexColor: "#808080" } });
  const shadeBrown = await prisma.attribute.create({ data: { type: AttributeType.COLOR_SHADE, nameEn: "Brown", nameAr: "بني", slug: "brown", hexColor: "#8B4513" } });
  const shadeHazel = await prisma.attribute.create({ data: { type: AttributeType.COLOR_SHADE, nameEn: "Hazel", nameAr: "عسلي", slug: "hazel", hexColor: "#D2691E" } });
  const shadeGreen = await prisma.attribute.create({ data: { type: AttributeType.COLOR_SHADE, nameEn: "Green", nameAr: "أخضر", slug: "green", hexColor: "#2E8B57" } });

  // 5. Products (Matching Eyenk.com Catalog)
  
  // Product 1: Bella Diamond Gray Shadow
  const pBella = await prisma.product.create({
    data: {
      sku: "BEL-DIA-GRY-01",
      barcode: "6291108291021",
      productType: ProductType.COLORED_CONTACT_LENSES,
      titleEn: "Bella Diamond Gray Shadow Contact Lenses",
      titleAr: "عدسات بيلا دايموند جراي شادو اللاصقة",
      slug: "bella-diamond-gray-shadow",
      descriptionEn: "Seductive gray shade with a soft limbal ring for an enchanting eye enlargement look.",
      descriptionAr: "درجة رمادية ساحرة مع تحديد ناعم لتوسيع شكل العين وإبراز جمالها.",
      categoryId: catColorLenses.id,
      brandName: "Bella",
      collectionName: "Bella Diamond",
      basePriceQar: 145.00,
      salePriceQar: 130.00,
      stockQuantity: 50,
      isFeatured: true,
      lensDuration: ContactLensDuration.MONTHLY,
      packSize: 2,
      baseCurve: 8.6,
      diameter: 14.5,
      waterContent: 38.0,
      hasPrescription: true,
      hasPlanoOption: true,
      colorNameEn: "Gray Shadow",
      colorNameAr: "جراي شادو (رمادي ظلال)",
      colorHex: "#708090",
      availablePowers: ["0.00", "-0.50", "-0.75", "-1.00", "-1.25", "-1.50", "-1.75", "-2.00", "-2.25", "-2.50", "-3.00", "-3.50", "-4.00", "-4.50", "-5.00", "-6.00"],
      images: {
        create: [
          { imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop", isPrimary: true, isEyeShot: true },
        ]
      },
      attributes: {
        create: [
          { attributeId: brandBella.id },
          { attributeId: shadeGray.id },
        ]
      }
    }
  });

  // Product 2: Lensme Caffe
  const pLensme = await prisma.product.create({
    data: {
      sku: "LNS-CAF-BRN-02",
      barcode: "6291108291038",
      productType: ProductType.COLORED_CONTACT_LENSES,
      titleEn: "Lensme Caffe Natural Warm Brown Lenses",
      titleAr: "عدسات لينس مي كافيه بني دافئ طبيعي",
      slug: "lensme-caffe-brown",
      descriptionEn: "Warm coffee brown tone designed for dark Middle Eastern eyes with seamless blending.",
      descriptionAr: "درجة البني الدافئ كافيه المصممة خصيصاً للعيون العربية الداكنة.",
      categoryId: catColorLenses.id,
      brandName: "Lensme",
      collectionName: "Lensme Natural",
      basePriceQar: 160.00,
      stockQuantity: 40,
      isFeatured: true,
      lensDuration: ContactLensDuration.MONTHLY,
      packSize: 2,
      baseCurve: 8.6,
      diameter: 14.2,
      waterContent: 38.0,
      hasPrescription: true,
      hasPlanoOption: true,
      colorNameEn: "Caffe Brown",
      colorNameAr: "كافيه بني",
      colorHex: "#6F4E37",
      availablePowers: ["0.00", "-0.50", "-0.75", "-1.00", "-1.50", "-2.00", "-2.50", "-3.00", "-3.50", "-4.00", "-5.00"],
      images: {
        create: [
          { imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop", isPrimary: true, isEyeShot: true },
        ]
      },
      attributes: {
        create: [
          { attributeId: brandLensme.id },
          { attributeId: shadeBrown.id },
        ]
      }
    }
  });

  // Product 3: Amara NMR Toffee
  const pAmara = await prisma.product.create({
    data: {
      sku: "AMR-TOF-HZL-03",
      barcode: "6291108291045",
      productType: ProductType.COLORED_CONTACT_LENSES,
      titleEn: "Amara Toffee Hazel Contact Lenses",
      titleAr: "عدسات أمارا توفي عسلي لاصقة",
      slug: "amara-toffee-hazel",
      descriptionEn: "Rich caramel & honey hazel tone endorsed by Middle Eastern celebrity makeup artists.",
      descriptionAr: "درجة العسلي والكراميل الغنية المفضلة لدى أخصائيي المكياج في الخليج.",
      categoryId: catColorLenses.id,
      brandName: "Amara",
      collectionName: "Amara Celebrity",
      basePriceQar: 155.00,
      salePriceQar: 140.00,
      stockQuantity: 65,
      isFeatured: true,
      lensDuration: ContactLensDuration.MONTHLY,
      packSize: 2,
      baseCurve: 8.7,
      diameter: 14.5,
      waterContent: 38.0,
      hasPrescription: true,
      hasPlanoOption: true,
      colorNameEn: "Toffee Hazel",
      colorNameAr: "توفي عسلي",
      colorHex: "#D2691E",
      availablePowers: ["0.00", "-0.50", "-1.00", "-1.50", "-2.00", "-2.50", "-3.00", "-4.00", "-5.00"],
      images: {
        create: [
          { imageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&auto=format&fit=crop", isPrimary: true, isEyeShot: true },
        ]
      },
      attributes: {
        create: [
          { attributeId: brandAmara.id },
          { attributeId: shadeHazel.id },
        ]
      }
    }
  });

  // Product 4: 1-Day Acuvue Moist (30 Lenses)
  const pAcuvueMoist = await prisma.product.create({
    data: {
      sku: "ACU-MST-30PK",
      barcode: "0733905541019",
      productType: ProductType.MEDICAL_CONTACT_LENSES,
      titleEn: "1-Day Acuvue Moist (30 Lenses / Box)",
      titleAr: "عدسات 1-داي أكوفيو مويست الشفافة (30 عدسة)",
      slug: "1-day-acuvue-moist-30-pack",
      descriptionEn: "LARCENON technology keeps moisture locked in for 16 hours of daily wear comfort.",
      descriptionAr: "تقنية الترطيب الفائق الممتد طوال اليوم لحماية العين من الجفاف.",
      categoryId: catMedicalLenses.id,
      brandName: "Acuvue",
      collectionName: "1-Day Acuvue",
      basePriceQar: 110.00,
      stockQuantity: 120,
      isFeatured: true,
      lensDuration: ContactLensDuration.DAILY_DISPOSABLE,
      packSize: 30,
      baseCurve: 8.5,
      diameter: 14.2,
      waterContent: 58.0,
      hasPrescription: true,
      hasPlanoOption: false,
      availablePowers: ["-0.50", "-0.75", "-1.00", "-1.25", "-1.50", "-1.75", "-2.00", "-2.25", "-2.50", "-2.75", "-3.00", "-3.25", "-3.50", "-3.75", "-4.00", "-4.50", "-5.00", "-5.50", "-6.00", "-7.00", "-8.00"],
      images: {
        create: [
          { imageUrl: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=600&auto=format&fit=crop", isPrimary: true },
        ]
      },
      attributes: {
        create: [
          { attributeId: brandAcuvue.id },
        ]
      }
    }
  });

  // Product 5: Opti-Free PureMoist Solution 300ml
  await prisma.product.create({
    data: {
      sku: "OPT-PUR-300ML",
      barcode: "300650356012",
      productType: ProductType.LENS_SOLUTION_CARE,
      titleEn: "Opti-Free PureMoist Multi-Purpose Solution (300ml)",
      titleAr: "محلول أوبتي فري بيور مويست لتعقيم العدسات (300 مل)",
      slug: "opti-free-puremoist-300ml",
      descriptionEn: "HydraGlyde Moisture Matrix creates a continuous shield of moisture for soft contact lenses.",
      descriptionAr: "محلول التعقيم الشامل الذي يوفر غلاف ترطيب مستمر للعدسات طوال اليوم.",
      categoryId: catSolutions.id,
      brandName: "Alcon",
      basePriceQar: 45.00,
      stockQuantity: 80,
      isFeatured: false,
      volumeMl: 300,
      images: {
        create: [
          { imageUrl: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&auto=format&fit=crop", isPrimary: true },
        ]
      }
    }
  });

  // Product 6: EyeNova Pure Titanium Frame
  await prisma.product.create({
    data: {
      sku: "EYE-TIT-BLK-01",
      barcode: "6299001122334",
      productType: ProductType.SPECTACLES,
      titleEn: "EyeNova Pure Titanium Ultra-Light Frame",
      titleAr: "إطار عين نوفا تيتانيوم نقي فائق الخفة",
      slug: "eyenova-pure-titanium-black",
      descriptionEn: "Japanese pure titanium frame weighing only 14 grams. Corrosion resistant & hypoallergenic.",
      descriptionAr: "إطار تيتانيوم نقي ياباني بوزن 14 جرام فقط. مقاوم للتآكل ولطيف على البشرة.",
      categoryId: catEyeglasses.id,
      brandName: "EyeNova",
      basePriceQar: 350.00,
      salePriceQar: 295.00,
      stockQuantity: 25,
      isFeatured: true,
      lensWidth: 52.0,
      bridgeWidth: 18.0,
      templeLength: 140.0,
      frameWidth: 138.0,
      weightGrams: 14.2,
      tryOnModelUrl: "/models/frame-black.png",
      images: {
        create: [
          { imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop", isPrimary: true },
        ]
      }
    }
  });

  // 6. Lens Packages (For Glasses Customizer)
  await prisma.lensOption.createMany({
    data: [
      {
        nameEn: "Zero Power Digital Blue Shield UV420",
        nameAr: "حماية الضوء الأزرق للأجهزة بدون مقاس (0.00)",
        lensUsage: LensUsage.ZERO_POWER_COMPUTER,
        lensIndex: "1.56",
        coating: "Blue Shield UV420 + Anti-Scratch",
        priceQar: 95.00,
      },
      {
        nameEn: "Single Vision Thin 1.61 Anti-Reflective",
        nameAr: "رؤية فردية رقيقة 1.61 مع طبقة منع الانعكاس",
        lensUsage: LensUsage.SINGLE_VISION_DISTANCE,
        lensIndex: "1.61",
        coating: "Anti-Reflective + Hydrophobic",
        priceQar: 150.00,
      },
      {
        nameEn: "Progressive Free-Form Ultra Thin 1.67",
        nameAr: "عدسات تدريجية متعددة البؤر 1.67 رقيقة جداً",
        lensUsage: LensUsage.PROGRESSIVE,
        lensIndex: "1.67",
        coating: "Free-Form Digital + Photochromic Sun Tint",
        priceQar: 380.00,
      },
    ],
  });

  // 7. Banners
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

  console.log("✅ Seed completed successfully! EyeNova database is ready.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
