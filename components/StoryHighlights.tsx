"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, Eye, Droplets, Glasses, Tag, Flame } from "lucide-react";

export function StoryHighlights() {
  const { t, lang } = useLanguage();

  const stories = [
    {
      id: "bella",
      nameEn: "Bella",
      nameAr: "بيلا",
      href: "/shop?brand=bella",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop",
      badge: "HOT",
      borderColor: "from-amber-400 to-rose-500",
    },
    {
      id: "amara",
      nameEn: "Amara",
      nameAr: "أمارا",
      href: "/shop?brand=amara",
      img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&auto=format&fit=crop",
      badge: "NEW",
      borderColor: "from-purple-500 to-indigo-500",
    },
    {
      id: "lensme",
      nameEn: "Lensme",
      nameAr: "لينس مي",
      href: "/shop?brand=lensme",
      img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop",
      badge: "TOP",
      borderColor: "from-emerald-400 to-teal-600",
    },
    {
      id: "diva",
      nameEn: "Diva",
      nameAr: "ديفا",
      href: "/shop?brand=diva",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop",
      badge: null,
      borderColor: "from-pink-400 to-rose-400",
    },
    {
      id: "medical",
      nameEn: "Medical Clear",
      nameAr: "عدسات طبية",
      href: "/shop?category=medical-lenses",
      img: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=200&auto=format&fit=crop",
      badge: "Acuvue",
      borderColor: "from-blue-500 to-cyan-400",
    },
    {
      id: "solutions",
      nameEn: "Solutions",
      nameAr: "المحاليل",
      href: "/shop?category=solutions-drops",
      img: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=200&auto=format&fit=crop",
      badge: null,
      borderColor: "from-emerald-500 to-lime-500",
    },
    {
      id: "glasses",
      nameEn: "Eyeglasses",
      nameAr: "النظارات",
      href: "/shop?category=eyeglasses",
      img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&auto=format&fit=crop",
      badge: "Titanium",
      borderColor: "from-slate-700 to-slate-900",
    },
    {
      id: "offers",
      nameEn: "Special Offers",
      nameAr: "العروض",
      href: "/shop?category=colored-lenses",
      img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop",
      badge: "SALE",
      borderColor: "from-red-500 to-amber-500",
    },
  ];

  return (
    <div className="bg-white border-b border-gray-100 py-4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
          {stories.map((story) => (
            <Link
              key={story.id}
              href={story.href}
              className="flex flex-col items-center gap-1.5 shrink-0 group focus:outline-none"
            >
              {/* Outer Ring */}
              <div
                className={`relative p-[2.5px] rounded-full bg-gradient-to-tr ${story.borderColor} group-hover:scale-105 transition duration-300 shadow-sm`}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white p-[2px] overflow-hidden">
                  <img
                    src={story.img}
                    alt={story.nameEn}
                    className="w-full h-full rounded-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                {story.badge && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase bg-red-600 text-white px-1.5 py-0.2 rounded-full border border-white shadow-xs">
                    {story.badge}
                  </span>
                )}
              </div>

              {/* Title */}
              <span className="text-[11px] sm:text-xs font-bold text-slate-800 group-hover:text-emerald-600 transition truncate max-w-[72px] text-center">
                {lang === "ar" ? story.nameAr : story.nameEn}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
