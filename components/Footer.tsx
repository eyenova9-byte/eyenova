"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { EyeNovaLogo } from "@/components/EyeNovaLogo";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

export function Footer() {
  const { lang, setLang, isRtl } = useLanguage();
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
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-28 lg:pb-12">
        {/* ========================================================================= */}
        {/* Top Feature Bar (Trust Badges) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-10 mb-10 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
              <Zap size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-tight">2-Hour Express</p>
              <p className="text-[11px] text-slate-400">Across All Qatar Areas</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Clock size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-tight">30-Min In-Store Pickup</p>
              <p className="text-[11px] text-slate-400">4 Prime Mall Branches</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-tight">100% Authentic</p>
              <p className="text-[11px] text-slate-400">Official Factory Sealed</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <MessageCircle size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-tight">Optometry Concierge</p>
              <p className="text-[11px] text-slate-400">Licensed Eye Specialists</p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Main Grid: 4 Responsive Columns */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 items-start">
          {/* Column 1 & 2: Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <EyeNovaLogo size="lg" inverted />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {lang === "ar"
                ? "عين نوفا هي الوجهة الرائدة في قطر للعدسات اللاصقة الطبية والملونة، والنظارات الشمسية والطبية الفاخرة مع خدمة التوصيل الفوري والاستلام من 4 فروع."
                : "Qatar's premier optical destination for certified medical & colored contact lenses, designer spectacles, and eye care solutions with same-day Doha delivery."}
            </p>

            {/* Direct Contact details */}
            <div className="space-y-2 text-xs text-slate-300 pt-1">
              <a
                href="https://wa.me/97455123456"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-sky-400 transition"
              >
                <Phone size={14} className="text-emerald-400" />
                <span>+974 5512 3456 (WhatsApp & Call)</span>
              </a>
              <a
                href="mailto:support@eyenova.com"
                className="flex items-center gap-2 hover:text-sky-400 transition"
              >
                <Mail size={14} className="text-sky-400" />
                <span>support@eyenova.com</span>
              </a>
              <div className="flex items-start gap-2 text-slate-400">
                <MapPin size={14} className="text-slate-400 shrink-0 mt-0.5" />
                <span>Villaggio, Place Vendôme, DFC & Ezdan Mall</span>
              </div>
            </div>
          </div>

          {/* Column 3: Optical Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 sm:mb-4">
              {lang === "ar" ? "الفئات والمنتجات" : "Optical Categories"}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/shop?category=medical-lenses" className="hover:text-white transition">
                  {lang === "ar" ? "العدسات الطبية اليومية والشهرية" : "Medical Contact Lenses"}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=colored-lenses" className="hover:text-white transition">
                  {lang === "ar" ? "العدسات الملونة التجميلية" : "Colored Beauty Lenses"}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=solutions-drops" className="hover:text-white transition">
                  {lang === "ar" ? "محاليل العدسات وقطرات الترطيب" : "Lens Solutions & Eye Drops"}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=eyeglasses" className="hover:text-white transition">
                  {lang === "ar" ? "إطارات ونظارات طبية" : "Spectacles & Frames"}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=sunglasses" className="hover:text-white transition">
                  {lang === "ar" ? "نظارات شمسية أصلية" : "Designer Sunglasses"}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=lashes" className="hover:text-white transition">
                  {lang === "ar" ? "رموش طبيعية وإكسسوارات" : "Beauty Lashes & Tools"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Care & Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 sm:mb-4">
              {lang === "ar" ? "خدمة العملاء" : "Customer Care"}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  {lang === "ar" ? "الشروط والأحكام" : "Terms of Service"}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  {lang === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-white transition">
                  {lang === "ar" ? "سياسة الاستبدال والاسترجاع" : "Refund & Exchange"}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  {lang === "ar" ? "عن عين نوفا قطر" : "About EyeNova Qatar"}
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition">
                  {lang === "ar" ? "البحث في المتجر" : "Search Store"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Newsletter & Qatar Updates */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 sm:mb-4">
              {lang === "ar" ? "عروض حصرية في قطر" : "Stay in the Know"}
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              {lang === "ar"
                ? "اشترك ليصلك كود خصم 10% على طلبك القادم وآخر إصدارات العدسات."
                : "Subscribe to receive 10% off your next order and exclusive lens launches in Qatar."}
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs">
                <CheckCircle2 size={16} className="shrink-0" />
                <span>Thank you! Check your inbox for code EYENOVA10.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500 transition"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition cursor-pointer"
                  >
                    <ArrowRight size={14} className={isRtl ? "rotate-180" : ""} />
                  </button>
                </div>
              </form>
            )}

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-4 text-slate-400">
              <a
                href="https://www.instagram.com/eyenova_qa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 flex items-center justify-center hover:text-white transition"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@eyenova_qa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 flex items-center justify-center hover:text-white transition"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.77 1.81-.02 3.32-1.5 3.37-3.31.05-3.88.02-7.77.03-11.66.01-2.12-.01-4.24.02-6.36z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Bottom Bar: Language, Copyright, Payment Badges */}
        {/* ========================================================================= */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-4 text-center sm:text-left">
            {/* Language dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-500">Language:</span>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as "en" | "ar")}
                className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-sky-500 cursor-pointer"
              >
                <option value="en">English (QAR)</option>
                <option value="ar">العربية (ريال قطري)</option>
              </select>
            </div>

            <p className="text-[11px] text-slate-500">
              © {new Date().getFullYear()} EyeNova W.L.L. (عين نوفا). All rights reserved. Doha, Qatar.
            </p>
          </div>

          {/* Qatar & Global Payment Method Badges */}
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <span className="inline-flex items-center justify-center bg-white border border-slate-300 text-[#006FCF] font-bold text-[9px] px-2 py-1 rounded-sm h-6 shadow-2xs">
              AMEX
            </span>
            <span className="inline-flex items-center justify-center bg-white border border-slate-300 text-slate-950 font-semibold text-[9px] px-2 py-1 rounded-sm h-6 shadow-2xs">
              Pay
            </span>
            <span className="inline-flex items-center justify-center bg-white border border-slate-300 text-[#8A1538] font-bold text-[8.5px] px-2 py-1 rounded-sm h-6 shadow-2xs">
              QPay
            </span>
            <span className="inline-flex items-center justify-center bg-white border border-slate-300 text-[#005B94] font-bold text-[8.5px] px-2 py-1 rounded-sm h-6 shadow-2xs">
              mada
            </span>
            <span className="inline-flex items-center justify-center bg-white border border-slate-300 px-2 py-1 rounded-sm h-6 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EB001B] inline-block -mr-1 opacity-90" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#F79E1B] inline-block opacity-90" />
            </span>
            <span className="inline-flex items-center justify-center bg-white border border-slate-300 text-[#E41E26] font-bold text-[8px] px-2 py-1 rounded-sm h-6 shadow-2xs">
              NAPS
            </span>
            <span className="inline-flex items-center justify-center bg-white border border-slate-300 text-[#1A1F71] font-bold italic text-[9px] px-2 py-1 rounded-sm h-6 shadow-2xs">
              VISA
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
