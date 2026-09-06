"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { BrandLogo } from "@/components/BrandLogo";
import {
  Eye,
  ShieldCheck,
  Truck,
  MapPin,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  Award,
} from "lucide-react";

export default function AboutPage() {
  const { lang } = useLanguage();

  return (
    <div className="bg-white min-h-screen font-sans pb-16">
      {/* 1. Hero Header Banner */}
      <section className="bg-gradient-to-b from-[#FAF5F2] via-[#FDFBFA] to-white py-14 sm:py-20 border-b border-[#F0E6DF] text-center px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E8DED8] text-[#5c2d76] text-xs font-medium shadow-2xs">
            <Sparkles size={14} />
            <span>{lang === "ar" ? "قصة عين نوفا في قطر" : "The EyeNova Qatar Story"}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-[#121212] leading-tight">
            {lang === "ar" ? (
              <>
                نلهم الثقة، <br />
                <span className="font-semibold text-[#5c2d76]">ونضيء جمال عينيك</span>
              </>
            ) : (
              <>
                Inspiring Confidence, <br />
                <span className="font-semibold text-[#5c2d76]">Illuminating Your Vision</span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-[#555555] max-w-2xl mx-auto leading-relaxed pt-2">
            {lang === "ar"
              ? "تأسست عين نوفا في الدوحة لتكون الوجهة الأولى في قطر للعدسات الطبية المعتمدة، وأحدث ألوان العدسات التجميلية العالمية بأعلى معايير الرعاية البصرية."
              : "EyeNova was founded in Doha to become Qatar's premier optical destination for certified medical contact lenses, luxury cosmetic eye shades, and optical care."}
          </p>
        </div>
      </section>

      {/* 2. Core Pillars Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#FAF5F2] border border-[#E8DED8] rounded-2xl p-8 text-center space-y-4 shadow-2xs hover:shadow-sm transition-shadow">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#5c2d76] shadow-xs mx-auto">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-xl font-semibold text-[#121212]">
              {lang === "ar" ? "معتمدة من الصحة القطرية" : "MOPH Qatar Certified"}
            </h3>
            <p className="text-sm text-[#666666] leading-relaxed">
              {lang === "ar"
                ? "جميع العدسات الطبية والمحاليل في متجرنا مرخصة رسمياً ومطابقة للمواصفات الصحية المعتمدة من وزارة الصحة العامة بدولة قطر."
                : "Every medical contact lens, solution, and care drop in our catalog is officially licensed and compliant with the Ministry of Public Health (MOPH) Qatar."}
            </p>
          </div>

          <div className="bg-[#FAF5F2] border border-[#E8DED8] rounded-2xl p-8 text-center space-y-4 shadow-2xs hover:shadow-sm transition-shadow">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#5c2d76] shadow-xs mx-auto">
              <Truck size={28} />
            </div>
            <h3 className="text-xl font-semibold text-[#121212]">
              {lang === "ar" ? "توصيل سريع بنفس اليوم" : "Same-Day Express Delivery"}
            </h3>
            <p className="text-sm text-[#666666] leading-relaxed">
              {lang === "ar"
                ? "أسطول توصيل متخصص يغطي كافة مناطق الدوحة، لوسيل، الريان، والوكرة خلال ساعات قليلة من إتمام الطلب."
                : "Our dedicated courier fleet delivers directly to your door across Doha, Lusail, Al Rayyan, Al Wakrah, and all Qatar within hours."}
            </p>
          </div>

          <div className="bg-[#FAF5F2] border border-[#E8DED8] rounded-2xl p-8 text-center space-y-4 shadow-2xs hover:shadow-sm transition-shadow">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#5c2d76] shadow-xs mx-auto">
              <Award size={28} />
            </div>
            <h3 className="text-xl font-semibold text-[#121212]">
              {lang === "ar" ? "أشهر الماركات العالمية" : "World-Renowned Brands"}
            </h3>
            <p className="text-sm text-[#666666] leading-relaxed">
              {lang === "ar"
                ? "موزع معتمد لأرقى بيوت البصريات: أكيوفيو، ألكون، بوش آند لومب، بيلا، أمارا، لينس مي، ديفا وسيلينا."
                : "Authorized retailer for global optical leaders: Acuvue, Alcon, Bausch + Lomb, CooperVision, Bella, Amara, LensMe, and Diva."}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Opening Soon in Qatar */}
      <section className="bg-[#FAF5F2] border-y border-[#EBE0DA] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E0D2C8] text-[#5c2d76] text-xs font-semibold shadow-2xs">
            <Sparkles size={14} />
            <span>{lang === "ar" ? "قريباً في دولة قطر" : "Opening Soon in Qatar"}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-semibold text-[#121212]">
            {lang === "ar" ? "عين نوفا — قريباً في قطر" : "EyeNova — Launching Soon Across Qatar"}
          </h2>

          <p className="text-sm sm:text-base text-[#707070] max-w-2xl mx-auto leading-relaxed">
            {lang === "ar"
              ? "نستعد لتقديم تجربة بصرية وبوتيكات رقمية فائقة الفخامة لعملائنا الكرام في دولة قطر. نسعى لأن نكون خياركم الأول للعدسات الطبية والملونة المعتمدة والنظارات الراقية مع خدمة التوصيل السريع."
              : "We are preparing an exceptional luxury optical experience for our customers in Qatar, becoming your premier destination for certified contact lenses and high-end eyewear with express national delivery."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="bg-white p-5 rounded-2xl border border-[#E8DED8] text-center shadow-2xs">
              <h4 className="font-semibold text-sm text-[#121212]">
                {lang === "ar" ? "منتجات طبية معتمدة" : "Certified Medical Grade"}
              </h4>
              <p className="text-xs text-[#707070] mt-1">
                {lang === "ar" ? "معتمدة من وزارة الصحة وهيئات الدواء العالمية" : "MoPH and FDA/CE certified lenses"}
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#E8DED8] text-center shadow-2xs">
              <h4 className="font-semibold text-sm text-[#121212]">
                {lang === "ar" ? "توصيل سريع لكافة المناطق" : "Fast Qatar Delivery"}
              </h4>
              <p className="text-xs text-[#707070] mt-1">
                {lang === "ar" ? "توصيل لكافة مدن ومناطق دولة قطر" : "Covering all Qatar municipalities"}
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#E8DED8] text-center shadow-2xs">
              <h4 className="font-semibold text-sm text-[#121212]">
                {lang === "ar" ? "خدمة عملاء راقية" : "Luxury Concierge"}
              </h4>
              <p className="text-xs text-[#707070] mt-1">
                {lang === "ar" ? "استشارات بصرية مخصصة عبر الواتساب" : "Direct WhatsApp assistance"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Official Contact & Support Channels */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-[#FAF5F2] border border-[#E8DED8] rounded-3xl p-8 sm:p-10 text-center space-y-6">
          <h3 className="text-xl sm:text-2xl font-semibold text-[#121212]">
            {lang === "ar" ? "قنوات التواصل الرسمية لعين نوفا قطر" : "Official EyeNova Qatar Contact Channels"}
          </h3>
          <p className="text-sm text-[#707070] max-w-xl mx-auto">
            {lang === "ar"
              ? "يسعدنا الرد على جميع استفساراتكم والطلبات المسبقة عبر بريدنا الرسمي وقنوات الواتساب المباشرة."
              : "We welcome all customer inquiries, optical guidance, and corporate partnerships through our official channels."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-white p-5 rounded-2xl border border-[#E8DED8] text-center shadow-2xs space-y-1">
              <span className="text-xs font-bold text-[#5c2d76] uppercase tracking-wider block">Customer Support</span>
              <h4 className="font-semibold text-sm text-[#121212]">{lang === "ar" ? "خدمة العملاء" : "Customer Concierge"}</h4>
              <a href="mailto:support@eyenova.com.qa" className="text-xs font-mono text-[#5c2d76] hover:underline block pt-1 font-medium">
                support@eyenova.com.qa
              </a>
              <p className="text-[11px] text-[#707070]">Orders, fitting & inquiries</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8DED8] text-center shadow-2xs space-y-1">
              <span className="text-xs font-bold text-[#5c2d76] uppercase tracking-wider block">General Inquiries</span>
              <h4 className="font-semibold text-sm text-[#121212]">{lang === "ar" ? "الاستفسارات والمعلومات" : "Information Desk"}</h4>
              <a href="mailto:info@eyenova.com.qa" className="text-xs font-mono text-[#5c2d76] hover:underline block pt-1 font-medium">
                info@eyenova.com.qa
              </a>
              <p className="text-[11px] text-[#707070]">General info & brand questions</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8DED8] text-center shadow-2xs space-y-1">
              <span className="text-xs font-bold text-[#5c2d76] uppercase tracking-wider block">Corporate & Admin</span>
              <h4 className="font-semibold text-sm text-[#121212]">{lang === "ar" ? "الإدارة والشراكات" : "Corporate Office"}</h4>
              <a href="mailto:admin@eyenova.com.qa" className="text-xs font-mono text-[#5c2d76] hover:underline block pt-1 font-medium">
                admin@eyenova.com.qa
              </a>
              <p className="text-[11px] text-[#707070]">Suppliers & administration</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Call to Action */}
      <section className="max-w-4xl mx-auto px-4 pt-16 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#121212]">
          {lang === "ar" ? "جاهز لاكتشاف عدساتك المفضلة؟" : "Ready to Find Your Perfect Lenses?"}
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/shop"
            className="bg-[#5c2d76] hover:bg-[#4a245f] text-white text-sm font-medium px-6 py-3 rounded-lg shadow-xs transition-colors"
          >
            {lang === "ar" ? "تسوق تشكيلة العدسات" : "Shop All Collections"}
          </Link>
          <a
            href="https://wa.me/97455123456"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white hover:bg-[#FAF5F2] text-[#121212] border border-[#D5C7BF] text-sm font-medium px-6 py-3 rounded-lg transition-colors"
          >
            {lang === "ar" ? "استشر أخصائي البصريات" : "Chat with Optometrist on WhatsApp"}
          </a>
        </div>
      </section>
    </div>
  );
}
