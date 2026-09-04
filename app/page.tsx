"use client";

import React from "react";
import { HeroBanner } from "@/components/HeroBanner";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck, Truck, Clock, Sparkles } from "lucide-react";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero Carousel */}
      <HeroBanner />

      {/* Featured Collections Grid */}
      <CategoryGrid />

      {/* Eyenk Parity Product Showcase */}
      <FeaturedProducts />

      {/* Qatar Brand Partner Carousel */}
      <section className="py-12 bg-slate-900 text-white border-t border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 block mb-2">
            Authorized Middle East Distributor Partners
          </span>
          <h3 className="text-lg font-extrabold mb-8 text-slate-200">
            Available at EyeNova Qatar
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 opacity-80 font-black text-xl tracking-wider text-slate-400">
            <span>BELLA</span>
            <span>AMARA</span>
            <span>LENSME</span>
            <span>DIVA</span>
            <span>ACUVUE</span>
            <span>ALCON</span>
            <span>BAUSCH & LOMB</span>
          </div>
        </div>
      </section>
    </div>
  );
}
