"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { MOCK_PRODUCTS } from "@/lib/mockData";
import { ProductCard } from "@/components/ProductCard";
import { BrandLogo } from "@/components/BrandLogo";
import {
  MessageCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  Eye,
  CheckCircle,
} from "lucide-react";

export function EyenkStorefront() {
  const { lang, isRtl } = useLanguage();

  // Contact Lenses Category Hubs
  const contactLensCircles = [
    {
      name: lang === "ar" ? "عدسات يومية" : "Daily Lens",
      href: "/shop?category=medical-lenses&duration=DAILY_DISPOSABLE",
      bgColor: "bg-[#FFF9E6]", // Soft champagne
      borderColor: "border-[#F5E7B8]",
      img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=350&auto=format&fit=crop",
      packName: "DAILIES TOTAL 1",
    },
    {
      name: lang === "ar" ? "عدسات شهرية" : "Monthly Lens",
      href: "/shop?category=medical-lenses&duration=MONTHLY",
      bgColor: "bg-[#EEF2FF]", // Soft ice blue
      borderColor: "border-[#D6E0FF]",
      img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=350&auto=format&fit=crop",
      packName: "AIR OPTIX plus HydraGlyde",
    },
    {
      name: lang === "ar" ? "عدسات ملونة" : "Color Lenses",
      href: "/shop?category=colored-lenses",
      bgColor: "bg-[#FFF1F2]", // Soft blush
      borderColor: "border-[#FFE0E3]",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=350&auto=format&fit=crop",
      packName: "Freshlook & Bella",
    },
    {
      name: lang === "ar" ? "استجماتيزم (انحراف)" : "Astigmatism",
      href: "/shop?category=medical-lenses",
      bgColor: "bg-[#E6FFFA]", // Soft mint
      borderColor: "border-[#B2F5EA]",
      img: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=350&auto=format&fit=crop",
      packName: "Biofinity Toric",
    },
    {
      name: lang === "ar" ? "متعددة البؤر" : "Multi-Focal",
      href: "/shop?category=medical-lenses",
      bgColor: "bg-[#F3E8FF]", // Soft lilac
      borderColor: "border-[#E9D5FF]",
      img: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=350&auto=format&fit=crop",
      packName: "Bio true ONEDay",
    },
    {
      name: lang === "ar" ? "محاليل وقطرات" : "Solutions",
      href: "/shop?category=solutions-drops",
      bgColor: "bg-[#F0F9FF]", // Soft sky
      borderColor: "border-[#BAE6FD]",
      img: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=350&auto=format&fit=crop",
      packName: "Biotrue & Opti-Free",
    },
  ];

  // Colour Lenses Brand Hubs
  const colourLensesBrandCircles = [
    {
      name: "Amara",
      href: "/shop?brand=amara",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop",
    },
    {
      name: "Bella",
      href: "/shop?brand=bella",
      img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop",
    },
    {
      name: "Diva",
      href: "/shop?brand=diva",
      img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop",
    },
    {
      name: "LensMe",
      href: "/shop?brand=lensme",
      img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&auto=format&fit=crop",
    },
    {
      name: "FreshLook",
      href: "/shop?brand=freshlook",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop",
    },
    {
      name: "Acuvue Define",
      href: "/shop?brand=acuvue-define",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop",
    },
  ];

  // 5 Best Selling Medical Lens Packs
  const medicalOrder = [
    "1-day-acuvue-moist-30-pack",
    "acuvue-oasys-1-day-hydraluxe",
    "alcon-dailies-total-1",
    "dailies-aquacomfort-plus",
    "air-optix-plus-hydraglyde-6-pack",
  ];
  const medicalLenses = medicalOrder
    .map((slug) => MOCK_PRODUCTS.find((p) => p.slug === slug))
    .filter(Boolean) as typeof MOCK_PRODUCTS;

  // NEW LensMe Korea Style
  const koreaStyleLenses = [
    {
      id: "k1",
      name: "LensMe Korea Style - Sylva - 2 Lenses",
      price: "From QAR 185.00",
      slug: "lensme-korea-style-sylva",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop",
    },
    {
      id: "k2",
      name: "LensMe Korea Style - Glow - 2 Lenses",
      price: "From QAR 185.00",
      slug: "lensme-korea-style-glow",
      img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop",
    },
    {
      id: "k3",
      name: "LensMe Korea Style - Nude - 2 Lenses",
      price: "From QAR 185.00",
      slug: "lensme-korea-style-nude",
      img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop",
    },
    {
      id: "k4",
      name: "LensMe Korea Style - Shine - 2 Lenses",
      price: "From QAR 185.00",
      slug: "lensme-korea-style-shine",
      img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=500&auto=format&fit=crop",
    },
  ];

  return (
    <div className="bg-white min-h-screen pb-16 font-sans">
      {/* ========================================================================= */}
      {/* BESPOKE EYENOVA HERO SECTION                                             */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF5F2] via-[#FDFBFA] to-white pt-6 sm:pt-10 pb-10 sm:pb-14 border-b border-[#F0E6DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Hero Content: Headline, Brand Mission, Dual CTAs, Trust Points */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-[#E8DED8] text-[#5c2d76] text-[12px] font-medium shadow-2xs">
                <Sparkles size={13} className="text-[#5c2d76]" />
                <span>
                  {lang === "ar"
                    ? "الوجهة الأولى للعدسات في قطر"
                    : "Qatar's Premier Optical Boutique"}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-[32px] sm:text-[44px] lg:text-[50px] font-normal tracking-tight text-[#121212] leading-[1.15]">
                {lang === "ar" ? (
                  <>
                    رؤية واضحة، <br />
                    <span className="font-semibold text-[#5c2d76]">وأناقة تدوم طويلاً</span>
                  </>
                ) : (
                  <>
                    Clear Vision, <br />
                    <span className="font-semibold text-[#5c2d76]">Timeless Optical Style</span>
                  </>
                )}
              </h1>

              {/* Subheading */}
              <p className="text-[14px] sm:text-[16px] text-[#555555] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {lang === "ar"
                  ? "اكتشف تشكيلة حصرية من العدسات الطبية اليومية والشهرية، وأفخم ألوان العدسات التجميلية العالمية مع توصيل فوري بنفس اليوم في الدوحة."
                  : "Discover certified medical contact lenses, trend-setting colored lenses, and eye care essentials with same-day express delivery across Qatar."}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
                <Link
                  href="/shop?category=medical-lenses"
                  className="inline-flex items-center justify-center gap-2 bg-[#121212] hover:bg-[#5c2d76] text-white text-[14px] font-medium px-6 py-3 rounded-md transition-all shadow-xs hover:shadow-md cursor-pointer"
                >
                  <span>{lang === "ar" ? "تسوق العدسات الطبية" : "Explore Medical Lenses"}</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/shop?category=colored-lenses"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FAF5F2] text-[#121212] border border-[#D5C7BF] text-[14px] font-medium px-6 py-3 rounded-md transition-all shadow-2xs hover:border-[#5c2d76] cursor-pointer"
                >
                  <Eye size={16} className="text-[#5c2d76]" />
                  <span>{lang === "ar" ? "العدسات الملونة" : "Colour Collections"}</span>
                </Link>
              </div>

              {/* Trust Micro-Badges */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-[12px] text-[#666666]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={15} className="text-[#5c2d76]" />
                  <span>{lang === "ar" ? "مرخص من الصحة القطرية" : "MOPH Qatar Approved"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck size={15} className="text-[#5c2d76]" />
                  <span>{lang === "ar" ? "توصيل اليوم نفسه" : "Same-Day Delivery"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={15} className="text-[#5c2d76]" />
                  <span>{lang === "ar" ? "منتجات أصلية 100%" : "100% Guaranteed Authentic"}</span>
                </div>
              </div>
            </div>

            {/* Right Visual Feature Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md bg-white rounded-2xl p-4 sm:p-5 shadow-xl border border-[#EDE4DE] hover-flash group">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#FAF5F2] mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop"
                    alt="EyeNova Qatar Optical"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Floating Tag */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-semibold text-[#121212] shadow-xs">
                    {lang === "ar" ? "وصل حديثاً" : "New Arrival"}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#5c2d76] text-white px-3 py-1 rounded-full text-[11px] font-medium shadow-xs">
                    {lang === "ar" ? "أفضل الماركات في قطر" : "Qatar #1 Optical Store"}
                  </div>
                </div>

                {/* Card Caption */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[14px] font-medium text-[#121212]">
                      {lang === "ar" ? "عدسات بيلا وأمارا الجديدة" : "Bella & Amara Luxury Shades"}
                    </h3>
                    <p className="text-[12px] text-[#707070]">
                      {lang === "ar" ? "متوفرة بقياسات طبية أو بدون" : "Available in Plano & Prescription"}
                    </p>
                  </div>
                  <Link
                    href="/shop?category=colored-lenses"
                    className="text-[12px] font-medium text-[#5c2d76] hover:underline flex items-center gap-0.5"
                  >
                    <span>{lang === "ar" ? "عرض" : "View"}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MAIN STORE CONTENT SECTIONS                                               */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14 pt-10">
        
        {/* SECTION 1: Contact Lenses Categories */}
        <section className="scroll-trigger animate--slide-in" data-cascade>
          <div className="flex items-baseline justify-between mb-6 sm:mb-8">
            <h2 className="text-[22px] sm:text-[26px] font-normal tracking-tight text-[#121212] text-left">
              {lang === "ar" ? "العدسات اللاصقة" : "Contact Lenses"}
            </h2>
            <Link
              href="/shop?category=medical-lenses"
              className="text-[13px] text-[#5c2d76] hover:underline font-medium"
            >
              {lang === "ar" ? "عرض الكل ←" : "View all →"}
            </Link>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-6 text-center">
            {contactLensCircles.map((cat, idx) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group flex flex-col items-center focus:outline-none scroll-trigger animate--slide-in"
                data-cascade
                style={{ "--animation-order": idx + 1 } as React.CSSProperties}
              >
                {/* Clean Circular Frame with subtle border and Hover Flash */}
                <div
                  className={`w-22 h-22 sm:w-30 sm:h-30 rounded-full ${cat.bgColor} border ${cat.borderColor} flex items-center justify-center p-3 mb-2.5 shadow-2xs group-hover:scale-105 group-hover:shadow-xs transition-all duration-300 overflow-hidden relative hover-flash`}
                >
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <span className="text-[12px] sm:text-[14px] font-normal text-[#121212] group-hover:text-[#5c2d76] transition-colors leading-snug">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* SECTION 2: Colour Lenses Brand Showcase */}
        <section className="scroll-trigger animate--slide-in" data-cascade>
          <div className="flex items-baseline justify-between mb-6 sm:mb-8">
            <h2 className="text-[22px] sm:text-[26px] font-normal tracking-tight text-[#121212] text-left">
              {lang === "ar" ? "أفخم ماركات العدسات الملونة" : "Colour Lenses Brands"}
            </h2>
            <Link
              href="/shop?category=colored-lenses"
              className="text-[13px] text-[#5c2d76] hover:underline font-medium"
            >
              {lang === "ar" ? "تسوق الملونة ←" : "Shop All Colours →"}
            </Link>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-6 text-center">
            {colourLensesBrandCircles.map((brand, idx) => (
              <Link
                key={brand.name}
                href={brand.href}
                className="group flex flex-col items-center focus:outline-none scroll-trigger animate--slide-in"
                data-cascade
                style={{ "--animation-order": idx + 1 } as React.CSSProperties}
              >
                <div className="w-22 h-22 sm:w-30 sm:h-30 rounded-full overflow-hidden mb-2.5 border border-[#EFE5DF] shadow-2xs group-hover:scale-105 group-hover:shadow-xs transition-all duration-300 hover-flash">
                  <img
                    src={brand.img}
                    alt={brand.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <span className="text-[13px] sm:text-[15px] font-normal text-[#121212] group-hover:text-[#5c2d76] transition-colors">
                  {brand.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* SECTION 3: Best Selling Medical Lenses */}
        <section className="scroll-trigger animate--slide-in" data-cascade>
          <div className="flex items-baseline justify-between mb-6 sm:mb-8">
            <h2 className="text-[22px] sm:text-[26px] font-normal tracking-tight text-[#121212] text-left">
              {lang === "ar" ? "العدسات الطبية الأكثر مبيعاً" : "Best Selling Medical Lens"}
            </h2>
            <Link
              href="/shop?category=medical-lenses"
              className="text-[13px] text-[#5c2d76] hover:underline font-medium"
            >
              {lang === "ar" ? "المزيد من العدسات ←" : "See more →"}
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-8 items-start">
            {medicalLenses.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* SECTION 4: LensMe Korea Style Collection */}
        <section className="scroll-trigger animate--slide-in" data-cascade>
          <div className="flex items-baseline justify-between mb-6 sm:mb-8">
            <h2 className="text-[22px] sm:text-[26px] font-normal tracking-tight text-[#121212] text-left">
              {lang === "ar" ? "تشكيلة لينس مي الكورية الجديدة" : "NEW LensMe Korea Style"}
            </h2>
            <Link
              href="/shop?brand=lensme"
              className="text-[13px] text-[#5c2d76] hover:underline font-medium"
            >
              {lang === "ar" ? "عرض تشكيلة لينس مي ←" : "View LensMe →"}
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6 text-center">
            {koreaStyleLenses.map((item, idx) => (
              <Link
                key={item.id}
                href="/shop?brand=lensme"
                className="group flex flex-col items-center focus:outline-none scroll-trigger animate--slide-in"
                data-cascade
                style={{ "--animation-order": idx + 1 } as React.CSSProperties}
              >
                <div className="w-full aspect-square max-w-[240px] rounded-[45%_55%_52%_48%/48%_45%_55%_52%] overflow-hidden mb-3 bg-gray-50 shadow-xs group-hover:scale-105 transition-transform duration-300 hover-flash">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-[13px] sm:text-[14px] font-normal text-[#121212] group-hover:text-[#5c2d76] transition mb-1 leading-snug">
                  {item.name}
                </h3>
                <span className="text-[13px] sm:text-[14px] font-normal text-[#707070]">
                  {item.price}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* SECTION 5: Physical Store Locations in Qatar */}
        <section id="locations" className="pt-8 pb-10 scroll-trigger animate--slide-in scroll-mt-24" data-cascade>
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-[26px] sm:text-[30px] font-normal tracking-tight text-[#121212] mb-2">
              {lang === "ar" ? "فروعنا في قطر" : "Our Store Locations"}
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#707070]">
              {lang === "ar"
                ? "تفضلوا بزيارة أي من فروعنا في الدوحة ومختلف مناطق قطر"
                : "Visit us at any of our physical optical boutiques across Qatar"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                name: "Tawar Mall, Al Markhiya",
                nameAr: "طوار مول، المرخية",
                mapsUrl: "https://www.google.com/maps/search/EyeNova+Contact+Lens+Tawar+Mall+Al+Markhiya+Qatar",
              },
              {
                name: "Place Vendôme Mall, Lusail",
                nameAr: "بلاس فاندوم مول، لوسيل",
                mapsUrl: "https://www.google.com/maps/search/EyeNova+Contact+Lens+Place+Vendome+Mall+Lusail+Qatar",
              },
              {
                name: "Ezdan Mall, Al Wakrah",
                nameAr: "إزدان مول، الوكرة",
                mapsUrl: "https://www.google.com/maps/search/EyeNova+Contact+Lens+Ezdan+Mall+Wakrah+Qatar",
              },
              {
                name: "Umm Salal Ali",
                nameAr: "أم صلال علي",
                mapsUrl: "https://www.google.com/maps/search/EyeNova+Contact+Lens+Umm+Salal+Ali+Qatar",
              },
            ].map((loc, idx) => (
              <a
                key={loc.name}
                href={loc.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FAF5F2] hover:bg-[#F3EBE7] transition-all duration-200 py-12 px-6 flex flex-col items-center justify-center text-center group rounded-xl border border-[#E8DED8] hover:border-[#5c2d76] scroll-trigger animate--slide-in hover-flash shadow-2xs hover:shadow-sm"
                data-cascade
                style={{ "--animation-order": idx + 1 } as React.CSSProperties}
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#5c2d76] mb-4 group-hover:scale-110 shadow-xs transition-transform duration-200">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <span className="text-[15px] sm:text-[16px] font-medium text-[#121212] leading-snug">
                  {lang === "ar" ? loc.nameAr : loc.name}
                </span>
                <span className="text-[12px] text-[#5c2d76] mt-2 font-medium group-hover:underline">
                  {lang === "ar" ? "عرض على الخريطة ↗" : "Get Directions ↗"}
                </span>
              </a>
            ))}
          </div>
        </section>

      </div>

      {/* Floating WhatsApp Quick Concierge (bottom right) */}
      <a
        href="https://wa.me/97455123456"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Customer Support on WhatsApp"
        className="fixed bottom-18 lg:bottom-6 right-5 z-40 w-13 h-13 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
      >
        <MessageCircle size={28} fill="white" className="text-transparent" />
      </a>
    </div>
  );
}
