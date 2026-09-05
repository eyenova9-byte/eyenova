"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { MOCK_PRODUCTS, MockProduct } from "@/lib/mockData";
import { DualEyeModal } from "@/components/DualEyeModal";
import { EyeNovaLogo } from "@/components/EyeNovaLogo";
import {
  Sparkles,
  Zap,
  ShieldCheck,
  Clock,
  MapPin,
  FileText,
  Search,
  ChevronRight,
  ChevronLeft,
  Star,
  CheckCircle2,
  Phone,
  MessageCircle,
  Eye,
  Glasses,
  Droplets,
  Sun,
  Layers,
  ArrowRight,
  Upload,
  X,
} from "lucide-react";

export function EyeNovaStorefront() {
  const { lang, isRtl } = useLanguage();

  // State for active category filter
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductForModal, setSelectedProductForModal] = useState<MockProduct | null>(null);
  const [isRxModalOpen, setIsRxModalOpen] = useState(false);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  // Hero Slides
  const heroSlides = [
    {
      id: "slide-1",
      badgeEn: "DOHA EXCLUSIVE • TRENDING IN QATAR",
      badgeAr: "حصري في الدوحة • الأكثر رواجاً في قطر",
      titleEn: "Enchanting Beauty With Bella & Amara",
      titleAr: "سحر العيون مع أرقى عدسات بيلا وأمارا",
      descEn: "Designed for dark Middle Eastern eyes. 100% breathable, high-water content colored lenses with natural limbal definition.",
      descAr: "مصممة خصيصاً للعيون العربية الداكنة. ترطيب عالي ونفاذية أكسجين فائقة مع تحديد طبيعي جذاب.",
      btnTextEn: "Shop Colored Lenses",
      btnTextAr: "تسوقي العدسات التجميلية",
      categoryTarget: "colored-lenses",
      bgImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1600&auto=format&fit=crop",
      accentColor: "from-sky-950/90 via-slate-900/80 to-transparent",
    },
    {
      id: "slide-2",
      badgeEn: "DOCTOR APPROVED • MEDICAL DAILY LENSES",
      badgeAr: "معتمد من أطباء البصريات • عدسات يومية طبية",
      titleEn: "1-Day Acuvue Moist & Oasys HydraLuxe",
      titleAr: "أكوفيو مويست وأواسيس الطبية بأحدث تقنيات الترطيب",
      descEn: "Say goodbye to dry eyes in air-conditioned spaces. Superior UV-blocking and HydraLuxe tear-infused technology.",
      descAr: "وداعاً لجفاف العين في الأجواء الحارة والمكيفة. حماية فائقة من الأشعة فوق البنفسجية وترطيب يدوم 16 ساعة.",
      btnTextEn: "Explore Medical Lenses",
      btnTextAr: "استكشف العدسات الطبية",
      categoryTarget: "medical-lenses",
      bgImage: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=1600&auto=format&fit=crop",
      accentColor: "from-slate-950/90 via-blue-950/80 to-transparent",
    },
    {
      id: "slide-3",
      badgeEn: "LUXURY EYEWEAR • HANDCRAFTED FRAMES",
      badgeAr: "نظارات فاخرة • إطارات تيتانيوم يابانية",
      titleEn: "Ultralight Titanium & Blue-Light Protection",
      titleAr: "إطارات تيتانيوم فائقة الخفة مع حماية الشاشات",
      descEn: "Featherlight comfort for screen professionals. Tailored with custom Zeiss or Essilor prescription lenses in Doha.",
      descAr: "راحة تدوم طوال اليوم لرواد الأعمال ومستخدمي الشاشات، مع خيارات تفصيل عدسات زايس وإسيلور المعتمدة.",
      btnTextEn: "Browse Spectacles",
      btnTextAr: "تسوق النظارات الطبية",
      categoryTarget: "eyeglasses",
      bgImage: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1600&auto=format&fit=crop",
      accentColor: "from-stone-950/90 via-slate-900/80 to-transparent",
    },
  ];

  // Auto-advance hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Quick navigation categories
  const filterTabs = [
    { id: "all", labelEn: "All Collections", labelAr: "جميع المنتجات", icon: Layers },
    { id: "medical-lenses", labelEn: "Medical Lenses", labelAr: "عدسات طبية", icon: Eye },
    { id: "colored-lenses", labelEn: "Colored Lenses", labelAr: "عدسات ملونة", icon: Sparkles },
    { id: "solutions-drops", labelEn: "Solutions & Drops", labelAr: "المحاليل والقطرات", icon: Droplets },
    { id: "eyeglasses", labelEn: "Spectacles & Frames", labelAr: "نظارات طبية", icon: Glasses },
    { id: "sunglasses", labelEn: "Sunglasses", labelAr: "نظارات شمسية", icon: Sun },
  ];

  // Filter products based on active category & search query
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchesCategory =
        activeCategory === "all" || product.categorySlug === activeCategory;
      const matchesSearch =
        !searchQuery ||
        product.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.titleAr.includes(searchQuery) ||
        product.brandName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Qatar Store Locations
  const storeBranches = [
    {
      id: "villaggio",
      nameEn: "Villaggio Mall",
      nameAr: "فيلاجيو مول",
      locationEn: "Gate 4, Luxury Avenue, Aspire Zone, Doha",
      locationAr: "بوابة 4، الجناح الراقي، أسباير زون، الدوحة",
      phone: "+974 4413 5521",
      whatsapp: "97455123456",
      hoursEn: "10:00 AM - 11:00 PM Daily",
      hoursAr: "يومياً من 10:00 صباحاً إلى 11:00 مساءً",
      pickupMinutes: "Ready in 30 mins",
      mapQuery: "Villaggio+Mall+Doha+Qatar",
    },
    {
      id: "vendome",
      nameEn: "Place Vendôme Mall",
      nameAr: "بلاس فاندوم مول",
      locationEn: "Canal Walk Floor, Lusail City",
      locationAr: "طابق ممشى القناة، مدينة لوسيل",
      phone: "+974 4413 5522",
      whatsapp: "97455123456",
      hoursEn: "10:00 AM - Midnight Daily",
      hoursAr: "يومياً من 10:00 صباحاً إلى منتصف الليل",
      pickupMinutes: "Ready in 30 mins",
      mapQuery: "Place+Vendome+Mall+Lusail+Qatar",
    },
    {
      id: "dfc",
      nameEn: "Doha Festival City",
      nameAr: "دوحة فستيفال سيتي",
      locationEn: "Ground Floor, Near Cinema Entrance, Umm Salal",
      locationAr: "الطابق الأرضي، بجوار مجمع السينما، أم صلال",
      phone: "+974 4413 5523",
      whatsapp: "97455123456",
      hoursEn: "10:00 AM - 11:00 PM Daily",
      hoursAr: "يومياً من 10:00 صباحاً إلى 11:00 مساءً",
      pickupMinutes: "Ready in 30 mins",
      mapQuery: "Doha+Festival+City+Qatar",
    },
    {
      id: "ezdan",
      nameEn: "Ezdan Mall Al Wakrah",
      nameAr: "إزدان مول الوكرة",
      locationEn: "Ground Floor, Main Entrance, Al Wakrah",
      locationAr: "الطابق الأرضي، المدخل الرئيسي، الوكرة",
      phone: "+974 4413 5524",
      whatsapp: "97455123456",
      hoursEn: "10:00 AM - 10:30 PM Daily",
      hoursAr: "يومياً من 10:00 صباحاً إلى 10:30 مساءً",
      pickupMinutes: "Ready in 30 mins",
      mapQuery: "Ezdan+Mall+Al+Wakrah+Qatar",
    },
  ];

  // Top color brands
  const colorBrands = [
    {
      name: "Bella",
      descEn: "Diamond, Elite & Glow Collections",
      descAr: "مجموعات دايموند، إيليت، وجلو",
      img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop",
      slug: "bella",
    },
    {
      name: "Amara",
      descEn: "Celebrity series & warm hazel hues",
      descAr: "مجموعة المشاهير ودرجات العسلي الساحرة",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop",
      slug: "amara",
    },
    {
      name: "LensMe",
      descEn: "Natural Korean style & soft limbal ring",
      descAr: "الستايل الكوري الطبيعي والعدسات المريحة",
      img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=500&auto=format&fit=crop",
      slug: "lensme",
    },
    {
      name: "Diva",
      descEn: "Glamorous, high-hydration monthly lenses",
      descAr: "إطلالة جذابة وعدسات شهرية غنية بالترطيب",
      img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop",
      slug: "diva",
    },
    {
      name: "FreshLook",
      descEn: "ColorBlends 3-in-1 technology by Alcon",
      descAr: "تقنية الألوان الثلاثية المدمجة من ألكون",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop",
      slug: "freshlook",
    },
    {
      name: "Acuvue Define",
      descEn: "Natural beauty accentuation with UV filter",
      descAr: "إبراز بريق العين الطبيعي مع حماية UV",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop",
      slug: "acuvue-define",
    },
  ];

  const slide = heroSlides[currentHeroSlide];

  return (
    <div className="bg-slate-50/50 min-h-screen pb-20 font-sans">
      {/* ========================================================================= */}
      {/* 1. DISTINCTIVE EYENOVA HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-slate-950 text-white overflow-hidden">
        {/* Ambient Optics Lighting Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Hero Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={slide.bgImage}
            alt={slide.titleEn}
            className="w-full h-full object-cover object-center transition-all duration-1000 transform scale-105"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.accentColor}`} />
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px]" />
        </div>

        {/* Hero Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-14 sm:pb-16 min-h-[500px] sm:min-h-[560px] flex flex-col justify-between">
          {/* Top Brand Emblem & Announcement */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <EyeNovaLogo size="md" inverted asLink={false} />
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-xs font-medium border border-sky-400/30">
                Qatar Official Flagship
              </span>
            </div>

            {/* Quick Doha Delivery Pill */}
            <div className="flex items-center gap-2 text-xs text-slate-200 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
              <Zap size={14} className="text-amber-400 fill-amber-400" />
              <span>
                {lang === "ar"
                  ? "توصيل فوري خلال ساعتين في الدوحة والريان ولوسيل"
                  : "2-Hour Express Delivery Across Doha & Lusail"}
              </span>
            </div>
          </div>

          {/* Hero Main Content */}
          <div className="max-w-2xl space-y-4 my-auto pt-6">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/15 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs font-semibold tracking-wider text-sky-200 uppercase">
              <Sparkles size={13} className="text-sky-300" />
              <span>{lang === "ar" ? slide.badgeAr : slide.badgeEn}</span>
            </div>

            {/* Hero Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              {lang === "ar" ? slide.titleAr : slide.titleEn}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal max-w-xl">
              {lang === "ar" ? slide.descAr : slide.descEn}
            </p>

            {/* CTA Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={() => {
                  setActiveCategory(slide.categoryTarget);
                  const el = document.getElementById("catalog-section");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3.5 rounded-xl bg-white text-slate-950 font-bold text-xs sm:text-sm hover:bg-sky-50 transition-all duration-200 shadow-xl flex items-center gap-2 cursor-pointer group"
              >
                <span>{lang === "ar" ? slide.btnTextAr : slide.btnTextEn}</span>
                <ChevronRight
                  size={16}
                  className={`${isRtl ? "rotate-180" : ""} group-hover:translate-x-0.5 transition-transform`}
                />
              </button>

              <button
                onClick={() => setIsRxModalOpen(true)}
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm backdrop-blur-md border border-white/25 transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <FileText size={16} className="text-sky-300" />
                <span>{lang === "ar" ? "إرسال الوصفة الطبية" : "Upload Prescription"}</span>
              </button>

              <a
                href="#store-branches"
                className="px-4 py-3.5 rounded-xl bg-transparent hover:bg-white/10 text-slate-300 hover:text-white text-xs sm:text-sm transition-all duration-200 flex items-center gap-1.5"
              >
                <MapPin size={15} className="text-slate-400" />
                <span>{lang === "ar" ? "فروعنا في قطر" : "4 Qatar Stores"}</span>
              </a>
            </div>
          </div>

          {/* Slider Controls & Carousel Dots */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <div className="flex items-center gap-2">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentHeroSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentHeroSlide === idx ? "w-8 bg-sky-400" : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setCurrentHeroSlide(
                    (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
                  )
                }
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/15 transition cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft size={16} className={isRtl ? "rotate-180" : ""} />
              </button>
              <button
                onClick={() =>
                  setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length)
                }
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/15 transition cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight size={16} className={isRtl ? "rotate-180" : ""} />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Trust Value Props Strip */}
        <div className="bg-slate-900 border-t border-white/10 py-3.5 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2.5 text-xs text-slate-300">
              <div className="w-8 h-8 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                <Zap size={16} />
              </div>
              <div>
                <p className="font-semibold text-white">2-Hour Express Delivery</p>
                <p className="text-[11px] text-slate-400">Doha, Lusail, Al Rayyan</p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2.5 text-xs text-slate-300">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <MapPin size={16} />
              </div>
              <div>
                <p className="font-semibold text-white">Click & Collect in 30 Mins</p>
                <p className="text-[11px] text-slate-400">Villaggio, Vendôme & DFC</p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2.5 text-xs text-slate-300">
              <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                <ShieldCheck size={16} />
              </div>
              <div>
                <p className="font-semibold text-white">100% Authentic Guaranteed</p>
                <p className="text-[11px] text-slate-400">Authorized Agent Sealed Stock</p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2.5 text-xs text-slate-300">
              <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <CheckCircle2 size={16} />
              </div>
              <div>
                <p className="font-semibold text-white">Licensed Optometrists</p>
                <p className="text-[11px] text-slate-400">Free Rx Check & Consultation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. INSTANT SPEED CATEGORY QUICK-BAR (Mobile Thumb Navigation) */}
      {/* ========================================================================= */}
      <section
        id="catalog-section"
        className="sticky top-14 sm:top-16 lg:top-[80px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          {/* Horizontal Scrolling Pill Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth w-full">
            {filterTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-slate-950 text-white shadow-sm"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  <Icon size={14} className={isActive ? "text-sky-300" : "text-slate-500"} />
                  <span>{lang === "ar" ? tab.labelAr : tab.labelEn}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Search input on desktop */}
          <div className="hidden lg:flex items-center relative w-64 shrink-0">
            <Search size={14} className="absolute left-3 text-slate-400" />
            <input
              type="text"
              placeholder={lang === "ar" ? "ابحث عن ماركة أو عدسة..." : "Search brands, lenses..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-100 rounded-full border border-transparent focus:border-slate-300 focus:bg-white focus:outline-none transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 text-slate-400 hover:text-slate-600"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-14 sm:space-y-16">
        {/* ========================================================================= */}
        {/* 3. TRENDING IN QATAR / ACTIVE PRODUCTS CATALOG */}
        {/* ========================================================================= */}
        <section>
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 text-sky-600 text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles size={14} />
                <span>
                  {lang === "ar" ? "الأعلى طلباً في الدوحة" : "Qatar Optical Bestsellers"}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">
                {activeCategory === "all"
                  ? lang === "ar"
                    ? "تشكيلة عين نوفا المختارة"
                    : "Curated EyeNova Collection"
                  : filterTabs.find((t) => t.id === activeCategory)?.[lang === "ar" ? "labelAr" : "labelEn"]}
              </h2>
            </div>

            <span className="text-xs text-slate-500 font-medium">
              {filteredProducts.length} {lang === "ar" ? "منتج متاح" : "products"}
            </span>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <Eye size={36} className="mx-auto text-slate-400 mb-3" />
              <p className="text-base font-semibold text-slate-800">
                {lang === "ar" ? "لا توجد منتجات مطابقة للبحث" : "No products found"}
              </p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="mt-3 text-xs text-sky-600 font-semibold hover:underline"
              >
                {lang === "ar" ? "إعادة ضبط الفلاتر" : "Reset filters"}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => {
                const price = product.salePriceQar || product.basePriceQar;
                const isContactLens =
                  product.productType === "COLORED_CONTACT_LENSES" ||
                  product.productType === "MEDICAL_CONTACT_LENSES";

                return (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
                  >
                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between pointer-events-none">
                      <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-200/60">
                        {product.brandName}
                      </span>
                      {product.lensDuration && (
                        <span className="bg-slate-100 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded-md">
                          {product.lensDuration.replace("_", " ")}
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/products/${product.slug}`}
                      className="p-4 pt-8 flex flex-col items-center flex-1 focus:outline-none"
                    >
                      {/* Product Image */}
                      <div className="w-full aspect-square max-h-48 flex items-center justify-center p-2 mb-3 group-hover:scale-105 transition-transform duration-300">
                        <img
                          src={product.images[0]?.imageUrl}
                          alt={product.titleEn}
                          className="max-h-full max-w-full object-contain mix-blend-multiply"
                          loading="lazy"
                        />
                      </div>

                      {/* Product Name */}
                      <h3 className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-sky-600 transition text-center line-clamp-2 min-h-[38px] leading-snug">
                        {lang === "ar" ? product.titleAr : product.titleEn}
                      </h3>

                      {/* Star Rating preview */}
                      <div className="flex items-center gap-1 mt-1.5">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={11} fill="currentColor" />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-400">(4.9)</span>
                      </div>
                    </Link>

                    {/* Price & Action Footer */}
                    <div className="p-3 pt-2 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-xs sm:text-sm font-bold text-slate-900">
                          QAR {price.toFixed(2)}
                        </span>
                        {product.salePriceQar && (
                          <span className="text-[10px] text-slate-400 line-through ml-1 block">
                            QAR {product.basePriceQar.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {isContactLens ? (
                        <button
                          type="button"
                          onClick={() => setSelectedProductForModal(product)}
                          className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-sky-600 text-white text-[11px] font-semibold transition-colors duration-200 cursor-pointer shrink-0"
                        >
                          {lang === "ar" ? "تحديد القياس" : "Select Power"}
                        </button>
                      ) : (
                        <Link
                          href={`/products/${product.slug}`}
                          className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-sky-600 text-white text-[11px] font-semibold transition-colors duration-200 shrink-0"
                        >
                          {lang === "ar" ? "التفاصيل" : "View"}
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 4. LUXURY COLORED LENSES LOUNGE (Differentiating Visual Showcase) */}
        {/* ========================================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-1">
              {lang === "ar" ? "مجموعة العدسات الملونة الفاخرة" : "Celebrity & Natural Colored Lenses"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {lang === "ar" ? "تسوقي حسب الماركة الأكثر مبيعاً" : "Shop by Top Middle Eastern Brands"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {lang === "ar"
                ? "أشهر الماركات العالمية المعتمدة بتدرجات طبيعية ساحرة ونفاذية أكسجين فائقة"
                : "Celebrity-endorsed, FDA & CE approved color pigments that enhance dark and light eyes seamlessly."}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
            {colorBrands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/shop?brand=${brand.slug}`}
                className="group flex flex-col items-center text-center p-3 rounded-2xl bg-slate-50 hover:bg-sky-50/50 border border-slate-200/70 hover:border-sky-200 transition-all duration-300"
              >
                {/* Circular Brand Model Photo */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 border-2 border-white shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={brand.img}
                    alt={brand.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition">
                  {brand.name}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                  {lang === "ar" ? brand.descAr : brand.descEn}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. MEDICAL DAILY & MONTHLY LENSES (Optometrist Verified) */}
        {/* ========================================================================= */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-xl space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-400/20 text-sky-300 text-xs font-semibold border border-sky-400/30">
                <ShieldCheck size={14} />
                <span>Optometrist Recommended Clear Lenses</span>
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                {lang === "ar"
                  ? "عدسات النظر الطبية اليومية والشهرية"
                  : "Prescription Medical Lenses with Tear-Infused Technology"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {lang === "ar"
                  ? "متوفرة بقياسات تبدأ من -0.50 إلى -12.00، بالإضافة لعدسات الاستجماتيزم وتوريك مع توصيل فوري خلال ساعتين لكافة مناطق قطر."
                  : "From -0.50 up to -12.00 diopters, plus Toric astigmatism and multi-focal parameters. Certified genuine with express Doha delivery."}
              </p>

              <div className="pt-2 flex flex-wrap gap-3 text-xs">
                <div className="bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/15">
                  💧 38% - 55% Water Content
                </div>
                <div className="bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/15">
                  ☀️ Class 1 UV Blocking
                </div>
                <div className="bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/15">
                  ⚡ 2-Hour Delivery
                </div>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 w-full lg:w-80 space-y-3 shrink-0">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText size={16} className="text-sky-400" />
                <span>{lang === "ar" ? "هل لديك وصفة طبية؟" : "Have a Prescription?"}</span>
              </h4>
              <p className="text-xs text-slate-300">
                {lang === "ar"
                  ? "أرسل صورة وصفتك الطبية وسيقوم أخصائي البصريات بتجهيز طلبك فوراً."
                  : "Upload your prescription card and our licensed optometrist will verify and prepare your exact box."}
              </p>
              <button
                onClick={() => setIsRxModalOpen(true)}
                className="w-full py-2.5 rounded-xl bg-white text-slate-950 font-bold text-xs hover:bg-sky-50 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Upload size={14} />
                <span>{lang === "ar" ? "رفع صورة الوصفة" : "Upload Prescription"}</span>
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. OUR 4 PHYSICAL QATAR STORE BRANCHES (CLICK & COLLECT) */}
        {/* ========================================================================= */}
        <section id="store-branches" className="pt-4">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-1">
              {lang === "ar" ? "فروع عين نوفا في قطر" : "Omnichannel In-Store Experience"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {lang === "ar" ? "فروعنا واستلام الطلبات الفوري" : "Visit Our Stores & Click & Collect"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {lang === "ar"
                ? "اطلب أونلاين واستلم من أقرب فرع إليك خلال 30 دقيقة، أو تفضل بزيارة أخصائي البصريات للفحص المجاني"
                : "Order online and pick up ready in 30 minutes at our prime mall locations, or walk in for free optometry testing."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {storeBranches.map((branch) => (
              <div
                key={branch.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      <Clock size={11} />
                      <span>{branch.pickupMinutes}</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">Open Now</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {lang === "ar" ? branch.nameAr : branch.nameEn}
                  </h3>

                  <p className="text-xs text-slate-500 mb-3 flex items-start gap-1.5">
                    <MapPin size={14} className="text-slate-400 shrink-0 mt-0.5" />
                    <span>{lang === "ar" ? branch.locationAr : branch.locationEn}</span>
                  </p>

                  <p className="text-[11px] text-slate-400 mb-4">
                    {lang === "ar" ? branch.hoursAr : branch.hoursEn}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <a
                    href={`https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(
                      `Hello EyeNova, I am inquiring about stock at ${branch.nameEn}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                  >
                    <MessageCircle size={14} />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`https://www.google.com/maps/search/${branch.mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1 transition"
                  >
                    <MapPin size={13} />
                    <span>{lang === "ar" ? "الاتجاهات" : "Map"}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ========================================================================= */}
      {/* 7. DUAL EYE POWER SELECTION MODAL */}
      {/* ========================================================================= */}
      {selectedProductForModal && (
        <DualEyeModal
          product={selectedProductForModal}
          isOpen={Boolean(selectedProductForModal)}
          onClose={() => setSelectedProductForModal(null)}
        />
      )}

      {/* ========================================================================= */}
      {/* 8. PRESCRIPTION UPLOAD & CONCIERGE MODAL */}
      {/* ========================================================================= */}
      {isRxModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setIsRxModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <FileText size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {lang === "ar" ? "إرسال الوصفة الطبية" : "Upload Prescription"}
                </h3>
                <p className="text-xs text-slate-500">
                  {lang === "ar" ? "فحص مجاني ومطابقة من أخصائي البصريات" : "Free verification by licensed optometrist"}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-5 leading-relaxed">
              {lang === "ar"
                ? "يمكنك تصوير كرت الفحص أو الوصفة الطبية وإرسالها مباشرة لفريق البصريات عبر الواتساب لتجهيز طلبك على الفور."
                : "Snap a photo of your doctor's prescription card or send it directly to our Doha optometry team on WhatsApp for instant fulfilment."}
            </p>

            <div className="space-y-3">
              <a
                href={`https://wa.me/97455123456?text=${encodeURIComponent(
                  "Hello EyeNova Optometrist, I would like to share my prescription for contact lenses/glasses."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-md"
              >
                <MessageCircle size={18} />
                <span>{lang === "ar" ? "إرسال الوصفة عبر الواتساب" : "Send Prescription via WhatsApp"}</span>
              </a>

              <button
                onClick={() => {
                  alert(
                    lang === "ar"
                      ? "تم استلام طلبك! سيتواصل معك أخصائي البصريات خلال دقائق."
                      : "Prescription request received! Our optometrist will contact you shortly."
                  );
                  setIsRxModalOpen(false);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition cursor-pointer"
              >
                {lang === "ar" ? "طلب اتصال من أخصائي البصريات" : "Request a Call From Optometrist"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Quick Concierge */}
      <a
        href="https://wa.me/97455123456"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="EyeNova WhatsApp Concierge"
        className="fixed bottom-18 lg:bottom-6 right-5 z-40 w-13 h-13 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
      >
        <MessageCircle size={28} fill="white" className="text-transparent" />
      </a>
    </div>
  );
}
