"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronRight, ChevronLeft } from "lucide-react";

export function HeroBanner() {
  const { lang, isRtl } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      titleEn: "Bella Diamond Collection",
      titleAr: "مجموعة بيلا دايموند الساحرة",
      subtitleEn: "Enchanting beauty shades with UV protection for all-day comfort",
      subtitleAr: "أجمل درجات الألوان الطبيعية مع حماية متقدمة للعين",
      btnTextEn: "Shop Bella",
      btnTextAr: "تسوقي بيلا",
      href: "/shop?brand=bella",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1600&auto=format&fit=crop",
      tagEn: "NEW COLLECTION",
      tagAr: "تشكيلة جديدة",
    },
    {
      id: 2,
      titleEn: "1-Day Acuvue Moist & Oasys",
      titleAr: "أكوفيو مويست وأواسيس الطبية",
      subtitleEn: "Qatar's most comfortable daily clear lenses with HydraLuxe technology",
      subtitleAr: "العدسات اليومية الأكثر راحة وترطيباً للعين في قطر",
      btnTextEn: "Shop Medical",
      btnTextAr: "تسوق العدسات الطبية",
      href: "/shop?category=medical-lenses",
      image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=1600&auto=format&fit=crop",
      tagEn: "OPTOMETRIST APPROVED",
      tagAr: "بصريات معتمدة",
    },
    {
      id: 3,
      titleEn: "Amara Celebrity Series",
      titleAr: "مجموعة أمارا برعاية مشاهير الخليج",
      subtitleEn: "Rich caramel & hazel shades designed for dark Middle Eastern eyes",
      subtitleAr: "درجات العسلي والكراميل المصممة خصيصاً للعيون العربية",
      btnTextEn: "Shop Amara",
      btnTextAr: "تسوقي أمارا",
      href: "/shop?brand=amara",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=1600&auto=format&fit=crop",
      tagEn: "BESTSELLER",
      tagAr: "الأكثر طلباً",
    },
  ];

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full overflow-hidden bg-gray-100 h-[380px] sm:h-[460px] md:h-[520px]">
      {/* Background Image with Dark Overlay for Text Readability */}
      <div className="absolute inset-0">
        <img
          src={slide.image}
          alt={slide.titleEn}
          className="w-full h-full object-cover transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
      </div>

      {/* Slide Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-xl text-white space-y-3 sm:space-y-4">
          <span className="inline-block px-2.5 py-1 text-[10px] font-black tracking-widest uppercase bg-white/20 backdrop-blur-xs text-white rounded">
            {lang === "ar" ? slide.tagAr : slide.tagEn}
          </span>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            {lang === "ar" ? slide.titleAr : slide.titleEn}
          </h1>

          <p className="text-xs sm:text-sm text-gray-200 font-medium leading-relaxed max-w-md">
            {lang === "ar" ? slide.subtitleAr : slide.subtitleEn}
          </p>

          <div className="pt-2">
            <Link
              href={slide.href}
              className="inline-block px-6 py-3 bg-white text-slate-950 text-xs font-black rounded-lg hover:bg-gray-100 transition shadow-md"
            >
              {lang === "ar" ? slide.btnTextAr : slide.btnTextEn}
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 backdrop-blur-xs hover:bg-white text-slate-900 flex items-center justify-center transition shadow"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 backdrop-blur-xs hover:bg-white text-slate-900 flex items-center justify-center transition shadow"
      >
        <ChevronRight size={20} />
      </button>

      {/* Slide Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2.5 h-2.5 rounded-full transition ${
              currentSlide === idx ? "bg-white w-6" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
