// ============================================================================
// EyeNova - Mock Catalog Data (Matches Eyenk.com Qatar Catalog)
// ============================================================================

export type MockProduct = {
  id: string;
  sku: string;
  productType: "COLORED_CONTACT_LENSES" | "MEDICAL_CONTACT_LENSES" | "LENS_SOLUTION_CARE" | "SPECTACLES" | "SUNGLASSES" | "LASHES_BEAUTY";
  titleEn: string;
  titleAr: string;
  slug: string;
  descriptionEn: string;
  descriptionAr: string;
  categorySlug: string;
  brandName: string;
  collectionName?: string;
  basePriceQar: number;
  salePriceQar?: number;
  stockQuantity: number;
  isFeatured: boolean;
  lensDuration?: string; // DAILY_DISPOSABLE, MONTHLY, YEARLY
  packSize?: number;
  baseCurve?: number;
  diameter?: number;
  waterContent?: number;
  colorNameEn?: string;
  colorNameAr?: string;
  colorHex?: string;
  availablePowers?: string[];
  lensWidth?: number;
  bridgeWidth?: number;
  templeLength?: number;
  tryOnModelUrl?: string;
  images: { imageUrl: string; isPrimary: boolean; isEyeShot?: boolean }[];
};

export const MOCK_PRODUCTS: MockProduct[] = [
  {
    id: "p1",
    sku: "BEL-DIA-GRY-01",
    productType: "COLORED_CONTACT_LENSES",
    titleEn: "Bella Diamond Gray Shadow Contact Lenses",
    titleAr: "عدسات بيلا دايموند جراي شادو اللاصقة",
    slug: "bella-diamond-gray-shadow",
    descriptionEn: "Seductive gray shade with a soft limbal ring for an enchanting eye enlargement look.",
    descriptionAr: "درجة رمادية ساحرة مع تحديد ناعم لتوسيع شكل العين وإبراز جمالها.",
    categorySlug: "colored-lenses",
    brandName: "Bella",
    collectionName: "Bella Diamond",
    basePriceQar: 145.0,
    salePriceQar: 130.0,
    stockQuantity: 50,
    isFeatured: true,
    lensDuration: "MONTHLY",
    packSize: 2,
    baseCurve: 8.6,
    diameter: 14.5,
    waterContent: 38.0,
    colorNameEn: "Gray Shadow",
    colorNameAr: "جراي شادو",
    colorHex: "#708090",
    availablePowers: ["0.00", "-0.50", "-0.75", "-1.00", "-1.25", "-1.50", "-1.75", "-2.00", "-2.50", "-3.00", "-3.50", "-4.00", "-4.50", "-5.00", "-6.00"],
    images: [
      { imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop", isPrimary: true, isEyeShot: true },
    ],
  },
  {
    id: "p2",
    sku: "LNS-CAF-BRN-02",
    productType: "COLORED_CONTACT_LENSES",
    titleEn: "Lensme Caffe Natural Warm Brown Lenses",
    titleAr: "عدسات لينس مي كافيه بني دافئ طبيعي",
    slug: "lensme-caffe-brown",
    descriptionEn: "Warm coffee brown tone designed for dark Middle Eastern eyes with seamless blending.",
    descriptionAr: "درجة البني الدافئ كافيه المصممة خصيصاً للعيون العربية الداكنة.",
    categorySlug: "colored-lenses",
    brandName: "Lensme",
    collectionName: "Lensme Natural",
    basePriceQar: 160.0,
    stockQuantity: 40,
    isFeatured: true,
    lensDuration: "MONTHLY",
    packSize: 2,
    baseCurve: 8.6,
    diameter: 14.2,
    waterContent: 38.0,
    colorNameEn: "Caffe Brown",
    colorNameAr: "كافيه بني",
    colorHex: "#6F4E37",
    availablePowers: ["0.00", "-0.50", "-0.75", "-1.00", "-1.50", "-2.00", "-2.50", "-3.00", "-3.50", "-4.00", "-5.00"],
    images: [
      { imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop", isPrimary: true, isEyeShot: true },
    ],
  },
  {
    id: "p3",
    sku: "AMR-TOF-HZL-03",
    productType: "COLORED_CONTACT_LENSES",
    titleEn: "Amara Toffee Hazel Contact Lenses",
    titleAr: "عدسات أمارا توفي عسلي لاصقة",
    slug: "amara-toffee-hazel",
    descriptionEn: "Rich caramel & honey hazel tone endorsed by Middle Eastern celebrity makeup artists.",
    descriptionAr: "درجة العسلي والكراميل الغنية المفضلة لدى أخصائيي المكياج في الخليج.",
    categorySlug: "colored-lenses",
    brandName: "Amara",
    collectionName: "Amara Celebrity",
    basePriceQar: 155.0,
    salePriceQar: 140.0,
    stockQuantity: 65,
    isFeatured: true,
    lensDuration: "MONTHLY",
    packSize: 2,
    baseCurve: 8.7,
    diameter: 14.5,
    waterContent: 38.0,
    colorNameEn: "Toffee Hazel",
    colorNameAr: "توفي عسلي",
    colorHex: "#D2691E",
    availablePowers: ["0.00", "-0.50", "-1.00", "-1.50", "-2.00", "-2.50", "-3.00", "-4.00", "-5.00"],
    images: [
      { imageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&auto=format&fit=crop", isPrimary: true, isEyeShot: true },
    ],
  },
  {
    id: "p4",
    sku: "ACU-MST-30PK",
    productType: "MEDICAL_CONTACT_LENSES",
    titleEn: "1-Day Acuvue Moist (30 Lenses / Box)",
    titleAr: "عدسات 1-داي أكوفيو مويست الشفافة (30 عدسة)",
    slug: "1-day-acuvue-moist-30-pack",
    descriptionEn: "LARCENON technology keeps moisture locked in for 16 hours of daily wear comfort.",
    descriptionAr: "تقنية الترطيب الفائق الممتد طوال اليوم لحماية العين من الجفاف.",
    categorySlug: "medical-lenses",
    brandName: "Acuvue",
    collectionName: "1-Day Acuvue",
    basePriceQar: 110.0,
    stockQuantity: 120,
    isFeatured: true,
    lensDuration: "DAILY_DISPOSABLE",
    packSize: 30,
    baseCurve: 8.5,
    diameter: 14.2,
    waterContent: 58.0,
    availablePowers: ["-0.50", "-0.75", "-1.00", "-1.25", "-1.50", "-1.75", "-2.00", "-2.25", "-2.50", "-2.75", "-3.00", "-3.25", "-3.50", "-3.75", "-4.00", "-4.50", "-5.00", "-5.50", "-6.00", "-7.00", "-8.00"],
    images: [
      { imageUrl: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=600&auto=format&fit=crop", isPrimary: true },
    ],
  },
  {
    id: "p5",
    sku: "OPT-PUR-300ML",
    productType: "LENS_SOLUTION_CARE",
    titleEn: "Opti-Free PureMoist Multi-Purpose Solution (300ml)",
    titleAr: "محلول أوبتي فري بيور مويست لتعقيم العدسات (300 مل)",
    slug: "opti-free-puremoist-300ml",
    descriptionEn: "HydraGlyde Moisture Matrix creates a continuous shield of moisture for soft contact lenses.",
    descriptionAr: "محلول التعقيم الشامل الذي يوفر غلاف ترطيب مستمر للعدسات طوال اليوم.",
    categorySlug: "solutions-drops",
    brandName: "Alcon",
    basePriceQar: 45.0,
    stockQuantity: 80,
    isFeatured: false,
    images: [
      { imageUrl: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&auto=format&fit=crop", isPrimary: true },
    ],
  },
  {
    id: "p6",
    sku: "EYE-TIT-BLK-01",
    productType: "SPECTACLES",
    titleEn: "EyeNova Pure Titanium Ultra-Light Frame",
    titleAr: "إطار عين نوفا تيتانيوم نقي فائق الخفة",
    slug: "eyenova-pure-titanium-black",
    descriptionEn: "Japanese pure titanium frame weighing only 14 grams. Corrosion resistant & hypoallergenic.",
    descriptionAr: "إطار تيتانيوم نقي ياباني بوزن 14 جرام فقط. مقاوم للتآكل ولطيف على البشرة.",
    categorySlug: "eyeglasses",
    brandName: "EyeNova",
    basePriceQar: 350.0,
    salePriceQar: 295.0,
    stockQuantity: 25,
    isFeatured: true,
    lensWidth: 52.0,
    bridgeWidth: 18.0,
    templeLength: 140.0,
    tryOnModelUrl: "/models/frame-black.png",
    images: [
      { imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop", isPrimary: true },
    ],
  },
];
