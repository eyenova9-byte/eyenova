"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { BrandLogo } from "@/components/BrandLogo";
import { ShieldCheck, Truck, Clock, MessageCircle, MapPin, CheckCircle2 } from "lucide-react";

export function Footer() {
  const { lang, setLang } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#FAF5F2] text-[#121212] border-t border-[#EBE0DA] font-sans">
      {/* 1. Value Props Strip */}
      <div className="border-b border-[#EBE0DA] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#5c2d76] shadow-xs mb-2.5">
              <Truck size={20} />
            </div>
            <h4 className="text-[13px] sm:text-[14px] font-semibold text-[#121212]">
              {lang === "ar" ? "توصيل بنفس اليوم" : "Same-Day Delivery"}
            </h4>
            <p className="text-[11px] sm:text-[12px] text-[#707070] mt-0.5">
              {lang === "ar" ? "في الدوحة وجميع مناطق قطر" : "Across Doha & all Qatar"}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#5c2d76] shadow-xs mb-2.5">
              <ShieldCheck size={20} />
            </div>
            <h4 className="text-[13px] sm:text-[14px] font-semibold text-[#121212]">
              {lang === "ar" ? "100% أصلي ومضمون" : "100% Authentic"}
            </h4>
            <p className="text-[11px] sm:text-[12px] text-[#707070] mt-0.5">
              {lang === "ar" ? "مرخص من وزارة الصحة العامة" : "MOPH Qatar Approved"}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#5c2d76] shadow-xs mb-2.5">
              <Clock size={20} />
            </div>
            <h4 className="text-[13px] sm:text-[14px] font-semibold text-[#121212]">
              {lang === "ar" ? "خدمة عملاء مميزة" : "24/7 Support"}
            </h4>
            <p className="text-[11px] sm:text-[12px] text-[#707070] mt-0.5">
              {lang === "ar" ? "مساعدة عبر الواتساب فوراً" : "Instant WhatsApp concierge"}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#5c2d76] shadow-xs mb-2.5">
              <MapPin size={20} />
            </div>
            <h4 className="text-[13px] sm:text-[14px] font-semibold text-[#121212]">
              {lang === "ar" ? "4 فروع في قطر" : "4 Physical Stores"}
            </h4>
            <p className="text-[11px] sm:text-[12px] text-[#707070] mt-0.5">
              {lang === "ar" ? "طوار مول، لوسيل، الوكرة، أم صلال" : "Tawar, Vendôme, Ezdan, Umm Salal"}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        {/* 2. Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand Info & Vision (Takes 2 cols on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="lg" />
            <p className="text-[13px] text-[#555555] leading-relaxed max-w-md">
              {lang === "ar"
                ? "عين نوفا وجهتكم الرائدة في قطر للعدسات الطبية والملونة المعتمدة، وإطارات النظارات العصرية. نقدم أحدث منتجات العناية بالعين بأعلى معايير الجودة العالمية."
                : "EyeNova is Qatar's premier optical store for certified medical & colored contact lenses, luxury eyewear, and vision care products. Authorized retailer for world-leading eye care brands."}
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://wa.me/97455123456"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white text-[12px] font-medium px-3.5 py-1.5 rounded-full shadow-xs hover:bg-[#20ba59] transition-colors"
              >
                <MessageCircle size={15} />
                <span>+974 5512 3456</span>
              </a>
              <span className="text-[12px] text-[#707070]">support@eyenova.com</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h3 className="text-[14px] font-semibold text-[#121212] mb-3.5 tracking-wide">
              {lang === "ar" ? "العدسات والمنتجات" : "Products"}
            </h3>
            <ul className="space-y-2 text-[13px] text-[#555555]">
              <li>
                <Link href="/shop?category=medical-lenses&duration=DAILY_DISPOSABLE" className="hover:text-[#5c2d76] transition-colors">
                  {lang === "ar" ? "عدسات يومية طبية" : "Daily Contact Lenses"}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=medical-lenses&duration=MONTHLY" className="hover:text-[#5c2d76] transition-colors">
                  {lang === "ar" ? "عدسات شهرية طبية" : "Monthly Contact Lenses"}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=colored-lenses" className="hover:text-[#5c2d76] transition-colors">
                  {lang === "ar" ? "عدسات ملونة تجميلية" : "Colored Lenses"}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=solutions-drops" className="hover:text-[#5c2d76] transition-colors">
                  {lang === "ar" ? "محاليل وقطرات العين" : "Lens Solutions & Drops"}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=lashes" className="hover:text-[#5c2d76] transition-colors">
                  {lang === "ar" ? "رموش طبيعية وملاقط" : "Lashes & Accessories"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Brands */}
          <div>
            <h3 className="text-[14px] font-semibold text-[#121212] mb-3.5 tracking-wide">
              {lang === "ar" ? "أشهر الماركات" : "Top Brands"}
            </h3>
            <ul className="space-y-2 text-[13px] text-[#555555]">
              <li>
                <Link href="/shop?brand=acuvue" className="hover:text-[#5c2d76] transition-colors">
                  Acuvue (Johnson & Johnson)
                </Link>
              </li>
              <li>
                <Link href="/shop?brand=alcon" className="hover:text-[#5c2d76] transition-colors">
                  Alcon Dailies & Air Optix
                </Link>
              </li>
              <li>
                <Link href="/shop?brand=bella" className="hover:text-[#5c2d76] transition-colors">
                  Bella Contact Lenses
                </Link>
              </li>
              <li>
                <Link href="/shop?brand=amara" className="hover:text-[#5c2d76] transition-colors">
                  Amara Celebrity Shades
                </Link>
              </li>
              <li>
                <Link href="/shop?brand=lensme" className="hover:text-[#5c2d76] transition-colors">
                  LensMe Korea Collection
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div>
            <h3 className="text-[14px] font-semibold text-[#121212] mb-3.5 tracking-wide">
              {lang === "ar" ? "خدمة العملاء" : "Customer Care"}
            </h3>
            <ul className="space-y-2 text-[13px] text-[#555555]">
              <li>
                <Link href="/terms" className="hover:text-[#5c2d76] transition-colors">
                  {lang === "ar" ? "الشروط والأحكام" : "Terms of Service"}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#5c2d76] transition-colors">
                  {lang === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-[#5c2d76] transition-colors">
                  {lang === "ar" ? "سياسة الاستبدال والاسترجاع" : "Refund Policy"}
                </Link>
              </li>
              <li>
                <Link href="/#locations" className="hover:text-[#5c2d76] transition-colors inline-flex items-center gap-1.5">
                  <span>{lang === "ar" ? "مواقع فروعنا في قطر" : "Store Locations"}</span>
                  <span className="text-[10px] text-[#5c2d76] font-medium bg-[#FAF5F2] border border-[#E8DED8] px-1.5 py-0.2 rounded-full">
                    {lang === "ar" ? "قريباً" : "Coming Soon"}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#5c2d76] transition-colors text-xs text-[#888888]">
                  {lang === "ar" ? "بوابة الإدارة ونقاط البيع" : "Admin & POS Portal"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-[#EBE0DA] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="w-full max-w-md">
            <h4 className="text-[14px] font-semibold text-[#121212] mb-1">
              {lang === "ar" ? "اشترك للحصول على العروض الحصرية" : "Subscribe for Exclusive Offers"}
            </h4>
            <p className="text-[12px] text-[#707070] mb-3">
              {lang === "ar" ? "احصل على خصم 10% على أول طلب وأحدث تشكيلات العدسات" : "Get 10% off your next order & updates on newest lens arrivals."}
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 py-2 px-3 border border-emerald-200 rounded-md">
                <CheckCircle2 size={14} />
                <span>Thank you for subscribing to EyeNova Qatar updates!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="flex-1 bg-white border border-[#D5C7BF] px-3.5 py-2 text-[13px] text-[#121212] placeholder:text-[#888888] focus:outline-none focus:border-[#5c2d76] rounded-md transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#5c2d76] text-white text-[13px] font-medium px-4 py-2 rounded-md hover:bg-[#4a245f] transition-colors cursor-pointer"
                >
                  {lang === "ar" ? "اشتراك" : "Subscribe"}
                </button>
              </form>
            )}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/eyenova_qa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-white border border-[#D5C7BF] flex items-center justify-center text-[#121212] hover:text-[#5c2d76] hover:border-[#5c2d76] transition-colors"
            >
              <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@eyenova_qa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-9 h-9 rounded-full bg-white border border-[#D5C7BF] flex items-center justify-center text-[#121212] hover:text-[#5c2d76] hover:border-[#5c2d76] transition-colors"
            >
              <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.77 1.81-.02 3.32-1.5 3.37-3.31.05-3.88.02-7.77.03-11.66.01-2.12-.01-4.24.02-6.36z" />
              </svg>
            </a>
          </div>
        </div>

        {/* 4. Bottom Row: Language, Copyright & Qatar Payment Methods */}
        <div className="mt-8 pt-6 border-t border-[#EBE0DA] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#707070]">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} EyeNova Qatar. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Licensed by Qatar MOPH</span>
          </div>

          {/* Payment Badges */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center justify-center bg-white border border-[#D5C7BF] text-[#006FCF] font-bold text-[9px] px-2 py-0.5 rounded h-6 w-11 shadow-2xs">
              AMEX
            </span>
            <span className="inline-flex items-center justify-center bg-white border border-[#D5C7BF] text-[#121212] font-semibold text-[9px] px-2 py-0.5 rounded h-6 w-11 shadow-2xs">
              Pay
            </span>
            <span className="inline-flex items-center justify-center bg-white border border-[#D5C7BF] text-[#8A1538] font-bold text-[8.5px] px-2 py-0.5 rounded h-6 shadow-2xs">
              QPay
            </span>
            <span className="inline-flex items-center justify-center bg-white border border-[#D5C7BF] text-[#005B94] font-bold text-[8.5px] px-2 py-0.5 rounded h-6 shadow-2xs">
              mada
            </span>
            <span className="inline-flex items-center justify-center bg-white border border-[#D5C7BF] px-2 py-0.5 rounded h-6 w-11 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EB001B] inline-block -mr-1 opacity-90"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#F79E1B] inline-block opacity-90"></span>
            </span>
            <span className="inline-flex items-center justify-center bg-white border border-[#D5C7BF] text-[#E41E26] font-bold text-[8px] px-2 py-0.5 rounded h-6 shadow-2xs">
              NAPS
            </span>
            <span className="inline-flex items-center justify-center bg-white border border-[#D5C7BF] text-[#1A1F71] font-bold italic text-[9px] px-2 py-0.5 rounded h-6 w-11 shadow-2xs">
              VISA
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
