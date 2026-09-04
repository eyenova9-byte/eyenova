"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, ArrowRight, ArrowLeft } from "lucide-react";

export function CategoryGrid() {
  const { t, isRtl } = useLanguage();

  const categories = [
    {
      title: t.coloredLenses,
      slug: "colored-lenses",
      subtitle: "Bella, Amara, Lensme, Diva & FreshLook",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop",
      badge: "Popular in Qatar",
    },
    {
      title: t.medicalLenses,
      slug: "medical-lenses",
      subtitle: "1-Day Acuvue Moist, Oasys & Biofinity",
      image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=600&auto=format&fit=crop",
      badge: "Clear Vision",
    },
    {
      title: t.solutions,
      slug: "solutions-drops",
      subtitle: "Opti-Free, Biotrue, Renu & Systane Drops",
      image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&auto=format&fit=crop",
      badge: "Eye Care",
    },
    {
      title: t.eyeglasses,
      slug: "eyeglasses",
      subtitle: "Pure Titanium & TR90 Blue Light Glasses",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop",
      badge: "Custom Prescriptions",
    },
    {
      title: t.sunglasses,
      slug: "sunglasses",
      subtitle: "Polarized & UV400 Protection Shades",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop",
      badge: "100% UV Protection",
    },
  ];

  return (
    <section className="py-16 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 block mb-1">
              Browse Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {t.categories}
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-extrabold text-slate-900 hover:text-emerald-600 transition flex items-center gap-1 mt-2 sm:mt-0"
          >
            <span>{t.allProducts}</span>
            {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
          </Link>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className="group relative h-72 rounded-3xl overflow-hidden shadow-md border border-gray-200/80 transition duration-500 hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Badge */}
              <span className="absolute top-4 left-4 text-[10px] font-extrabold uppercase tracking-wider bg-white/90 text-slate-900 px-3 py-1 rounded-full backdrop-blur-xs shadow-sm">
                {cat.badge}
              </span>

              {/* Content Bottom */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h3 className="text-xl font-extrabold mb-1 group-hover:text-emerald-400 transition">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  {cat.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
