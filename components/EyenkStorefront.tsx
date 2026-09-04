"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { MOCK_PRODUCTS } from "@/lib/mockData";
import { ProductCard } from "@/components/ProductCard";
import { MessageCircle } from "lucide-react";

export function EyenkStorefront() {
  const { lang, isRtl } = useLanguage();

  // 1. Exact Contact Lenses Category Circles (from Screenshot 1)
  const contactLensCircles = [
    {
      name: "Daily Lens",
      href: "/shop?category=medical-lenses&duration=DAILY_DISPOSABLE",
      bgColor: "bg-[#fef9c3]", // Soft pastel yellow
      img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=350&auto=format&fit=crop",
      packName: "DAILIES TOTAL 1",
    },
    {
      name: "Monthly Lens",
      href: "/shop?category=medical-lenses&duration=MONTHLY",
      bgColor: "bg-[#e0e7ff]", // Soft pastel blue/indigo
      img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=350&auto=format&fit=crop",
      packName: "AIR OPTIX plus HydraGlyde",
    },
    {
      name: "Color Contact Lens",
      href: "/shop?category=colored-lenses",
      bgColor: "bg-[#ffe4e6]", // Soft pastel pink
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=350&auto=format&fit=crop",
      packName: "Freshlook COLORBLENDS",
    },
    {
      name: "Astigmatism Lens",
      href: "/shop?category=medical-lenses",
      bgColor: "bg-[#cffafe]", // Soft pastel cyan
      img: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=350&auto=format&fit=crop",
      packName: "Biofinity Toric",
    },
    {
      name: "Multi-Focal Lens",
      href: "/shop?category=medical-lenses",
      bgColor: "bg-[#dcfce7]", // Soft pastel mint green
      img: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=350&auto=format&fit=crop",
      packName: "Bio true ONEDay",
    },
    {
      name: "Lens Solutions",
      href: "/shop?category=solutions-drops",
      bgColor: "bg-[#e0f2fe]", // Soft pastel sky blue
      img: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=350&auto=format&fit=crop",
      packName: "Biotrue Twin Pack",
    },
  ];

  // 2. Exact Colour Lenses Brand Circles (from Screenshot 2)
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

  // 3. Exact Best Selling Medical Lens Packs (from Screenshot 1 & 2)
  const medicalLenses = MOCK_PRODUCTS.filter(
    (p) => p.categorySlug === "medical-lenses"
  );

  // 4. Exact NEW LensMe Korea Style (from Screenshot 3: Sylva, Glow, Nude, Shine)
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14 pt-8">
        
        {/* ========================================================================= */}
        {/* SECTION 1: Contact Lenses (Screenshot 1) */}
        {/* ========================================================================= */}
        <section>
          <h2 className="text-[22px] sm:text-[24px] font-normal tracking-tight text-[#1e232d] mb-6 sm:mb-8 text-left">
            Contact Lenses
          </h2>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6 text-center">
            {contactLensCircles.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group flex flex-col items-center focus:outline-none"
              >
                {/* Pastel Colored Circular Frame */}
                <div
                  className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full ${cat.bgColor} flex items-center justify-center p-3 mb-3 shadow-xs group-hover:scale-105 transition-transform duration-300 overflow-hidden relative`}
                >
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <span className="text-[13px] sm:text-[14px] font-normal text-slate-900 group-hover:text-indigo-600 transition leading-snug">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: Colour Lenses (Screenshot 2) */}
        {/* ========================================================================= */}
        <section>
          <h2 className="text-[22px] sm:text-[24px] font-normal tracking-tight text-[#1e232d] mb-6 sm:mb-8 text-left">
            Colour Lenses
          </h2>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6 text-center">
            {colourLensesBrandCircles.map((brand) => (
              <Link
                key={brand.name}
                href={brand.href}
                className="group flex flex-col items-center focus:outline-none"
              >
                {/* Clean Circular Model Face Photo */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-3 border border-gray-100 shadow-xs group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={brand.img}
                    alt={brand.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <span className="text-[14px] sm:text-[15px] font-normal text-slate-900 group-hover:text-indigo-600 transition">
                  {brand.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: Best Selling Medical Lens (Screenshot 1 & 2) */}
        {/* ========================================================================= */}
        <section>
          <h2 className="text-[22px] sm:text-[24px] font-normal tracking-tight text-[#1e232d] mb-6 sm:mb-8 text-left">
            Best Selling Medical Lens
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
            {medicalLenses.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: NEW LensMe Korea Style (Screenshot 3) */}
        {/* ========================================================================= */}
        <section>
          <h2 className="text-[22px] sm:text-[24px] font-normal tracking-tight text-[#1e232d] mb-6 sm:mb-8 text-left">
            NEW LensMe Korea Style
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6 text-center">
            {koreaStyleLenses.map((item) => (
              <Link
                key={item.id}
                href="/shop?brand=lensme"
                className="group flex flex-col items-center focus:outline-none"
              >
                {/* Organic Pebble / Oval Shape Model Shot from Screenshot 3 */}
                <div className="w-full aspect-square max-w-[240px] rounded-[45%_55%_52%_48%/48%_45%_55%_52%] overflow-hidden mb-3 bg-gray-50 shadow-xs group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-[13px] sm:text-[14px] font-normal text-slate-900 group-hover:text-indigo-600 transition mb-1 leading-snug">
                  {item.name}
                </h3>
                <span className="text-[13px] sm:text-[14px] font-normal text-slate-700">
                  {item.price}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: Our Store Locations (Screenshot 1) */}
        {/* ========================================================================= */}
        <section className="pt-8 pb-10">
          <h2 className="text-[26px] sm:text-[32px] font-normal tracking-tight text-[#1e232d] mb-2 text-center">
            Our Store Locations
          </h2>
          <p className="text-[14px] sm:text-[15px] text-gray-700 text-center mb-8 sm:mb-12">
            Visit us at any of our locations across Qatar
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                name: "Tawar Mall, Al Markhiya",
                mapsUrl: "https://www.google.com/maps/search/EyeNova+Contact+Lens+Tawar+Mall+Al+Markhiya+Qatar",
              },
              {
                name: "Place Vendôme Mall, Lusail",
                mapsUrl: "https://www.google.com/maps/search/EyeNova+Contact+Lens+Place+Vendome+Mall+Lusail+Qatar",
              },
              {
                name: "Ezdan Mall, Wakrah",
                mapsUrl: "https://www.google.com/maps/search/EyeNova+Contact+Lens+Ezdan+Mall+Wakrah+Qatar",
              },
              {
                name: "Umm Salal Ali",
                mapsUrl: "https://www.google.com/maps/search/EyeNova+Contact+Lens+Umm+Salal+Ali+Qatar",
              },
            ].map((loc) => (
              <a
                key={loc.name}
                href={loc.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FAF4F2] hover:bg-[#F3ECE8] transition-colors duration-200 py-16 px-6 flex flex-col items-center justify-center text-center group rounded-xs border border-[#F2E8E4]"
              >
                {/* Purple Map Marker Icon with concentric ring matching Screenshot 1 */}
                <div className="w-12 h-12 flex items-center justify-center text-[#5c2d76] mb-6 group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <span className="text-[16px] sm:text-[17px] font-normal text-[#1e232d] leading-snug">
                  {loc.name}
                </span>
              </a>
            ))}
          </div>
        </section>

      </div>

      {/* Floating WhatsApp Quick Icon in Green (bottom right as shown in Screenshot 1, 2, 3) */}
      <a
        href="https://wa.me/97455123456"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Customer Support on WhatsApp"
        className="fixed bottom-5 right-5 z-40 w-13 h-13 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
      >
        <MessageCircle size={30} fill="white" className="text-transparent" />
      </a>
    </div>
  );
}
