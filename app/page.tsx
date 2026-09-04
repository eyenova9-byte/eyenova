"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { MOCK_PRODUCTS } from "@/lib/mockData";
import { HeroBanner } from "@/components/HeroBanner";
import { ProductCard } from "@/components/ProductCard";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Truck,
  ShieldCheck,
  CreditCard,
  Headphones,
  Eye,
  MapPin,
  Star,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

export default function HomePage() {
  const { lang, isRtl } = useLanguage();

  // Category filters
  const coloredLenses = MOCK_PRODUCTS.filter(
    (p) => p.categorySlug === "colored-lenses"
  );
  const medicalLenses = MOCK_PRODUCTS.filter(
    (p) => p.categorySlug === "medical-lenses"
  );
  const solutions = MOCK_PRODUCTS.filter(
    (p) => p.categorySlug === "solutions-drops"
  );
  const eyeglasses = MOCK_PRODUCTS.filter(
    (p) => p.categorySlug === "eyeglasses" || p.categorySlug === "sunglasses"
  );

  // Exact 6 Category Highlights from Eyenk.com
  const eyenkCategories = [
    {
      titleEn: "Daily Lens",
      titleAr: "عدسات يومية",
      slug: "daily-lens",
      img: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=400&auto=format&fit=crop",
      href: "/shop?category=medical-lenses&duration=DAILY_DISPOSABLE",
    },
    {
      titleEn: "Monthly Lens",
      titleAr: "عدسات شهرية",
      slug: "monthly-lens",
      img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&auto=format&fit=crop",
      href: "/shop?category=medical-lenses&duration=MONTHLY",
    },
    {
      titleEn: "Color Contact Lens",
      titleAr: "عدسات ملونة",
      slug: "color-lenses",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop",
      href: "/shop?category=colored-lenses",
    },
    {
      titleEn: "Astigmatism Lens",
      titleAr: "انحراف (Toric)",
      slug: "astigmatism",
      img: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&auto=format&fit=crop",
      href: "/shop?category=medical-lenses",
    },
    {
      titleEn: "Multi-Focal Lens",
      titleAr: "متعددة البؤر",
      slug: "multi-focal",
      img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop",
      href: "/shop?category=medical-lenses",
    },
    {
      titleEn: "Lens Solutions",
      titleAr: "محاليل العدسات",
      slug: "solutions",
      img: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&auto=format&fit=crop",
      href: "/shop?category=solutions-drops",
    },
  ];

  // Eyenk Colour Brand Tiles
  const colorBrands = [
    { name: "Amara", slug: "amara", bg: "bg-[#f8edeb]", textColor: "text-rose-950" },
    { name: "Bella", slug: "bella", bg: "bg-[#e8e8e4]", textColor: "text-slate-900" },
    { name: "Diva", slug: "diva", bg: "bg-[#d8e2dc]", textColor: "text-emerald-950" },
    { name: "LensMe", slug: "lensme", bg: "bg-[#ffe5d9]", textColor: "text-amber-950" },
    { name: "FreshLook", slug: "freshlook", bg: "bg-[#d8f3dc]", textColor: "text-teal-950" },
    { name: "Acuvue Define", slug: "acuvue-define", bg: "bg-[#e2eafc]", textColor: "text-blue-950" },
  ];

  // Eyenk Store Locations in Qatar
  const storeLocations = [
    {
      mallEn: "Tawar Mall",
      mallAr: "طوار مول",
      district: "Al Markhiya, Doha",
      phone: "+974 4411 2233",
      timing: "10:00 AM - 10:00 PM",
    },
    {
      mallEn: "Place Vendôme Mall",
      mallAr: "بلاس فاندوم",
      district: "Lusail City, Qatar",
      phone: "+974 4455 6677",
      timing: "10:00 AM - 11:00 PM",
    },
    {
      mallEn: "Ezdan Mall",
      mallAr: "إزدان مول",
      district: "Al Wakrah, Qatar",
      phone: "+974 4422 8899",
      timing: "10:00 AM - 10:00 PM",
    },
    {
      mallEn: "Umm Salal Ali",
      mallAr: "أم صلال علي",
      district: "Northern Express, Qatar",
      phone: "+974 4433 1122",
      timing: "10:00 AM - 10:00 PM",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Promo Banner Slider (Eyenk Style) */}
      <HeroBanner />

      {/* 2. Eyenk 6 Category Grid Tiles with Images & Clean Borders */}
      <section className="py-6 sm:py-8 border-b border-gray-100 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
          {eyenkCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.href}
              className="group flex flex-col items-center text-center p-2 rounded-xl hover:bg-gray-50 transition border border-transparent hover:border-gray-200"
            >
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-2 border border-gray-200 p-0.5 group-hover:scale-105 transition duration-300">
                <img
                  src={cat.img}
                  alt={cat.titleEn}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-emerald-700 transition">
                {lang === "ar" ? cat.titleAr : cat.titleEn}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Eyenk Colour Lenses Brand Bar (Amara, Bella, Diva, LensMe, FreshLook, Acuvue Define) */}
      <section className="py-4 bg-gray-50 border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {colorBrands.map((b) => (
              <Link
                key={b.slug}
                href={`/shop?brand=${b.slug}`}
                className={`${b.bg} p-3 rounded-lg text-center border border-black/5 hover:border-black/20 transition hover:shadow-sm`}
              >
                <span className={`text-xs font-black uppercase tracking-wider ${b.textColor}`}>
                  {b.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECTION: Best Selling Medical Lens (Exact Eyenk Heading) */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950">
              {lang === "ar" ? "العدسات الطبية الأكثر مبيعاً" : "Best Selling Medical Lens"}
            </h2>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              {lang === "ar"
                ? "أكوفيو، ألكون، وبايوفينيتي الموصى بها من أطباء العيون"
                : "Acuvue, Alcon, and Biofinity lenses approved by licensed optometrists"}
            </p>
          </div>

          <Link
            href="/shop?category=medical-lenses"
            className="text-xs font-black text-slate-900 hover:text-emerald-700 transition flex items-center gap-1 shrink-0"
          >
            <span>{lang === "ar" ? "عرض الكل" : "View All"}</span>
            {isRtl ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {medicalLenses.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 5. SECTION: Best Selling Colors (Exact Eyenk Heading) */}
      <section className="py-10 bg-gray-50/50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                {lang === "ar" ? "العدسات الملونة الأكثر طلباً" : "Best Selling Colors"}
              </h2>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                {lang === "ar"
                  ? "أشهر درجات بيلا وأمارا ولينس مي في قطر"
                  : "Qatar's most demanded shades from Bella, Amara, Lensme & Diva"}
              </p>
            </div>

            <Link
              href="/shop?category=colored-lenses"
              className="text-xs font-black text-slate-900 hover:text-emerald-700 transition flex items-center gap-1 shrink-0"
            >
              <span>{lang === "ar" ? "عرض الكل" : "View All"}</span>
              {isRtl ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {coloredLenses.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. SECTION: Lens Solutions & Eye Drops (Exact Eyenk Category) */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950">
              {lang === "ar" ? "محاليل العدسات وقطرات الترطيب" : "Lens Solutions & Eye Drops"}
            </h2>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              {lang === "ar"
                ? "أوبتي فري، بايوترو، سيستان ألترا، وقطرات ريفريش"
                : "Opti-Free, Biotrue, Systane Ultra, and Refresh Plus drops"}
            </p>
          </div>

          <Link
            href="/shop?category=solutions-drops"
            className="text-xs font-black text-slate-900 hover:text-emerald-700 transition flex items-center gap-1 shrink-0"
          >
            <span>{lang === "ar" ? "عرض الكل" : "View All"}</span>
            {isRtl ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {solutions.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 7. SECTION: Optical Eyeglasses & Sunglasses */}
      <section className="py-10 bg-gray-50/50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                {lang === "ar" ? "النظارات الطبية والشمسية" : "Eyeglasses & Sunglasses"}
              </h2>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                {lang === "ar"
                  ? "إطارات تيتانيوم يابانية خفيفة مع عدسات حماية الشاشات"
                  : "Pure Titanium & TR90 frames with Blue Light UV420 lenses"}
              </p>
            </div>

            <Link
              href="/shop?category=eyeglasses"
              className="text-xs font-black text-slate-900 hover:text-emerald-700 transition flex items-center gap-1 shrink-0"
            >
              <span>{lang === "ar" ? "عرض الكل" : "View All"}</span>
              {isRtl ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {eyeglasses.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. SECTION: Our Store Locations in Qatar (Exact Eyenk.com Section) */}
      <section id="locations" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-600 block mb-1">
            {lang === "ar" ? "زورونا في فروعنا" : "Visit Our Stores in Qatar"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
            {lang === "ar" ? "فروعنا داخل دولة قطر" : "Our Store Locations"}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {storeLocations.map((loc, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-gray-200 bg-white shadow-xs hover:border-slate-900 transition"
            >
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-900 mb-3">
                <MapPin size={20} />
              </div>
              <h3 className="text-base font-black text-slate-900 mb-1">
                {lang === "ar" ? loc.mallAr : loc.mallEn}
              </h3>
              <p className="text-xs text-gray-500 font-semibold mb-2">
                {loc.district}
              </p>
              <div className="text-[11px] text-gray-400 border-t border-gray-100 pt-2 space-y-1">
                <div>Phone: <span className="font-mono text-slate-700 font-bold">{loc.phone}</span></div>
                <div>Hours: <span className="text-slate-700">{loc.timing}</span></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. SECTION: Customer Testimonials (Exact Eyenk.com Section) */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-black text-slate-950 mb-8">
            {lang === "ar" ? "آراء وتقييمات عملائنا في قطر" : "Customer Testimonials"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-3">
              <div className="flex text-amber-400 text-sm">★★★★★</div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                {lang === "ar"
                  ? "توصيل سريع جداً في الدوحة! طلبت عدسات بيلا دايموند ووصلتني في نفس اليوم بنفس المقاس الطبي بالضبط."
                  : "Super fast delivery in Doha! Ordered Bella Diamond lenses and received them the exact same afternoon with perfect prescription power."}
              </p>
              <div className="text-xs font-black text-slate-900 border-t border-gray-100 pt-2">
                Fatima Al-Kuwari • <span className="text-gray-400 font-normal">West Bay, Doha</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-3">
              <div className="flex text-amber-400 text-sm">★★★★★</div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                {lang === "ar"
                  ? "محلول أوبتي فري أصلي 100% مع قطرات سيستان. التعامل ممتاز وخيار الدفع بالبطاقة عند الاستلام سهل جداً."
                  : "100% genuine Opti-Free solution and Systane drops. Very smooth ordering and QPay card payment upon delivery."}
              </p>
              <div className="text-xs font-black text-slate-900 border-t border-gray-100 pt-2">
                Mohammed Al-Sulaiti • <span className="text-gray-400 font-normal">Lusail City</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-3">
              <div className="flex text-amber-400 text-sm">★★★★★</div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                {lang === "ar"
                  ? "خاصية اختيار مقاس مختلف لكل عين سهلت علي الطلب بدون الحاجة لشراء علب زيادة. أفضل موقع بصريات في قطر."
                  : "The dual-eye power selector made ordering different powers for my right and left eyes so easy. Hands down the best optical store in Qatar."}
              </p>
              <div className="text-xs font-black text-slate-900 border-t border-gray-100 pt-2">
                Noora Al-Marri • <span className="text-gray-400 font-normal">Al Rayyan</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
