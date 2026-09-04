"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, ArrowRight, ArrowLeft, ShieldCheck, Truck, Clock } from "lucide-react";

export function HeroBanner() {
  const { t, isRtl, lang } = useLanguage();

  return (
    <section className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-16 sm:py-24 overflow-hidden">
      {/* Decorative Glow Background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content Column */}
        <div className="space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold shadow-inner">
            <Sparkles size={15} />
            <span>{t.sameDayBadge} • Qatar #1 Eyewear Store</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            {lang === "ar" ? (
              <>
                اكتشفي أجمل عدسات <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-300">بيلا وأمارا ولينس مي</span>
              </>
            ) : (
              <>
                Qatar's #1 Online <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-300">Contact Lens & Optical</span> Store
              </>
            )}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
            {t.heroSubtitle} Guaranteed 100% authentic medical & cosmetic colored lenses delivered right to your doorstep in Doha, Lusail, and Al Rayyan.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
            <Link
              href="/shop?category=colored-lenses"
              className="px-8 py-4 bg-emerald-500 text-slate-950 font-extrabold text-xs rounded-2xl hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20 flex items-center gap-2"
            >
              <span>{t.coloredLenses}</span>
              {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
            </Link>

            <Link
              href="/virtual-try-on"
              className="px-8 py-4 bg-slate-800 text-white font-extrabold text-xs rounded-2xl hover:bg-slate-700 border border-slate-700 transition flex items-center gap-2"
            >
              <span>{t.virtualTryOn}</span>
            </Link>
          </div>

          {/* Quick Perks */}
          <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center lg:text-left">
            <div>
              <span className="text-lg sm:text-xl font-extrabold text-white block">10,000+</span>
              <span className="text-[11px] text-slate-400">Happy Qatar Customers</span>
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold text-emerald-400 block">Same-Day</span>
              <span className="text-[11px] text-slate-400">Delivery in Doha</span>
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold text-white block">100%</span>
              <span className="text-[11px] text-slate-400">Authentic Guaranteed</span>
            </div>
          </div>
        </div>

        {/* Right Showcase Image Card */}
        <div className="relative flex justify-center">
          <div className="relative w-full max-w-md aspect-4/5 rounded-3xl overflow-hidden border-2 border-slate-700/50 shadow-2xl shadow-emerald-500/10 group">
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop"
              alt="EyeNova Contact Lenses"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">
                Trending Collection
              </span>
              <h3 className="font-bold text-sm">Bella Diamond & Amara Celebrity Series</h3>
              <p className="text-[11px] text-slate-300">Starting from 130 QAR per box with prescription options</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
