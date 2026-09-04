"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { MOCK_PRODUCTS } from "@/lib/mockData";
import { StoryHighlights } from "@/components/StoryHighlights";
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
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {
  const { t, lang, isRtl } = useLanguage();

  // Filter products by category
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
    (p) => p.categorySlug === "eyeglasses"
  );
  const sunglasses = MOCK_PRODUCTS.filter(
    (p) => p.categorySlug === "sunglasses"
  );
  const lashes = MOCK_PRODUCTS.filter((p) => p.categorySlug === "lashes");

  const brands = [
    { name: "Bella", logo: "BELLA", desc: "Diamond, Elite & Glow", slug: "bella" },
    { name: "Amara", logo: "AMARA", desc: "Celebrity Shades", slug: "amara" },
    { name: "Lensme", logo: "LENSME", desc: "Natural Arab Eyes", slug: "lensme" },
    { name: "Diva", logo: "DIVA", desc: "Moisture & Olive Tones", slug: "diva" },
    { name: "Acuvue", logo: "ACUVUE", desc: "Moist & Oasys Daily", slug: "acuvue" },
    { name: "Alcon", logo: "ALCON", desc: "Dailies Total 1 & Opti-Free", slug: "alcon" },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Instagram / Eyenk Circular Story Highlights */}
      <StoryHighlights />

      {/* 2. Hero Slider Banner */}
      <HeroBanner />

      {/* 3. Value Proposition / Trust Strip (Qatar Localization) */}
      <section className="border-b border-gray-100 bg-gray-50/70 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3 p-2">
              <div className="p-2.5 bg-emerald-100/80 text-emerald-700 rounded-2xl shrink-0">
                <Truck size={20} />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900">
                  {lang === "ar" ? "توصيل سريع في قطر" : "Same-Day Doha Delivery"}
                </h4>
                <p className="text-[11px] text-gray-500 font-medium">
                  {lang === "ar" ? "خلال 2-4 ساعات في الدوحة" : "Express delivery to your door"}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3 p-2">
              <div className="p-2.5 bg-blue-100/80 text-blue-700 rounded-2xl shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900">
                  {lang === "ar" ? "100% أصلي ومصرح" : "100% Authentic Guaranteed"}
                </h4>
                <p className="text-[11px] text-gray-500 font-medium">
                  {lang === "ar" ? "وكيل معتمد وموزع رسمي" : "Direct from licensed brands"}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3 p-2">
              <div className="p-2.5 bg-purple-100/80 text-purple-700 rounded-2xl shrink-0">
                <CreditCard size={20} />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900">
                  {lang === "ar" ? "دفع بالبطاقة أو كاش" : "QPay, Card or Cash"}
                </h4>
                <p className="text-[11px] text-gray-500 font-medium">
                  {lang === "ar" ? "كيوباي / فيزا / دفع عند الاستلام" : "Qatar NAPS, Cards & COD"}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3 p-2">
              <div className="p-2.5 bg-amber-100/80 text-amber-700 rounded-2xl shrink-0">
                <Headphones size={20} />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900">
                  {lang === "ar" ? "دعم واستشارات بصرية" : "WhatsApp Optician Support"}
                </h4>
                <p className="text-[11px] text-gray-500 font-medium">
                  {lang === "ar" ? "مساعدة فورية لاختيار القياس" : "+974 5512 3456"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION 1: COLORED CONTACT LENSES (عدسات ملونة) */}
      <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6 pb-3 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                {lang === "ar" ? "الأكثر طلباً في قطر" : "Best Selling in Qatar"}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {lang === "ar" ? "العدسات اللاصقة الملونة" : "Colored Contact Lenses"}
            </h2>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              {lang === "ar"
                ? "تشكيلة بيلا، أمارا، لينس مي وديفا - متوفرة بزينة وبقياس نظر"
                : "Bella, Amara, Lensme & Diva - Available in Plano 0.00 and Prescription"}
            </p>
          </div>

          <Link
            href="/shop?category=colored-lenses"
            className="text-xs font-extrabold text-slate-900 hover:text-emerald-600 transition flex items-center gap-1 shrink-0 pb-1"
          >
            <span>{lang === "ar" ? "عرض الكل" : "View All"}</span>
            {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
          {coloredLenses.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. SECTION 2: CLEAR & MEDICAL CONTACT LENSES (عدسات طبية وشفافة) */}
      <section className="py-10 sm:py-14 bg-gray-50/50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6 pb-3 border-b border-gray-200/80">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
                  {lang === "ar" ? "بصريات معتمدة" : "Optometrist Approved"}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {lang === "ar" ? "العدسات الطبية والشفافة" : "Daily & Monthly Clear Medical Lenses"}
              </h2>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                {lang === "ar"
                  ? "أكوفيو، ألكون ديليز، وبايوفينيتي - راحة فائقة وترطيب متواصل"
                  : "1-Day Acuvue Moist, Oasys, Alcon Dailies Total 1 & Biofinity"}
              </p>
            </div>

            <Link
              href="/shop?category=medical-lenses"
              className="text-xs font-extrabold text-slate-900 hover:text-blue-600 transition flex items-center gap-1 shrink-0 pb-1"
            >
              <span>{lang === "ar" ? "عرض الكل" : "View All"}</span>
              {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {medicalLenses.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. SECTION 3: SOLUTIONS & EYE DROPS (محاليل العدسات وقطرات الترطيب) */}
      <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6 pb-3 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-600">
                {lang === "ar" ? "عناية وترطيب فائق" : "Hydration & Lens Care"}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {lang === "ar" ? "المحاليل وقطرات ترطيب العين" : "Contact Lens Solutions & Eye Drops"}
            </h2>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              {lang === "ar"
                ? "أوبتي فري، بايوترو، سيستان ألترا، وقطرات ريفريش بلس"
                : "Opti-Free PureMoist, Biotrue, Systane Ultra & Refresh Plus"}
            </p>
          </div>

          <Link
            href="/shop?category=solutions-drops"
            className="text-xs font-extrabold text-slate-900 hover:text-cyan-600 transition flex items-center gap-1 shrink-0 pb-1"
          >
            <span>{lang === "ar" ? "عرض الكل" : "View All"}</span>
            {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {solutions.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. SECTION 4: SHOP BY OFFICIAL BRANDS (تسوق حسب الماركة) */}
      <section className="py-10 sm:py-14 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-400 block mb-1">
              {lang === "ar" ? "الماركات العالمية المعتمدة" : "Authorized Qatar Distributor"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              {lang === "ar" ? "تسوقي حسب الماركة المفضلة" : "Shop by Official Brand"}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {brands.map((b) => (
              <Link
                key={b.slug}
                href={`/shop?brand=${b.slug}`}
                className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 p-5 rounded-2xl text-center group transition duration-300 hover:scale-105 hover:border-emerald-500/50 shadow-md flex flex-col justify-between"
              >
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-900 transition">
                  <Eye size={22} />
                </div>
                <div>
                  <h3 className="text-base font-black text-white group-hover:text-emerald-400 transition tracking-wider">
                    {b.logo}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium mt-1">
                    {b.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SECTION 5: OPTICAL EYEGLASSES & FRAMES (النظارات الطبية) */}
      <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6 pb-3 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">
                {lang === "ar" ? "إطارات يابانية وسويسرية" : "Ultra-Lightweight Eyewear"}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {lang === "ar" ? "النظارات الطبية وإطارات حماية الشاشات" : "Optical Eyeglasses & Blue Light Shield"}
            </h2>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              {lang === "ar"
                ? "إطارات تيتانيوم نقي وخامات TR90 خفيفة مع عدسات حماية UV420"
                : "Pure Titanium & TR90 frames with Blue Light UV420 lenses"}
            </p>
          </div>

          <Link
            href="/shop?category=eyeglasses"
            className="text-xs font-extrabold text-slate-900 hover:text-indigo-600 transition flex items-center gap-1 shrink-0 pb-1"
          >
            <span>{lang === "ar" ? "عرض الكل" : "View All"}</span>
            {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {eyeglasses.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {sunglasses.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 9. SECTION 6: LASHES & ACCESSORIES (الرموش والاكسسوارات) */}
      <section className="py-10 sm:py-14 bg-gray-50/50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6 pb-3 border-b border-gray-200/80">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span className="text-xs font-extrabold uppercase tracking-widest text-rose-600">
                  {lang === "ar" ? "جمال وعناية بالعين" : "Beauty & Accessories"}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {lang === "ar" ? "الرموش واكسسوارات السفر للعدسات" : "Lashes & Travel Care Kits"}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {lashes.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
