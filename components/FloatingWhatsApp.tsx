"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  const { lang } = useLanguage();

  const message =
    lang === "ar"
      ? "مرحباً عين نوفا، أود الاستفسار عن توفر العدسات والنظارات والتوصيل في قطر."
      : "Hello EyeNova Qatar, I would like to inquire about contact lenses and delivery in Doha.";

  const whatsappUrl = `https://wa.me/97455123456?text=${encodeURIComponent(message)}`;

  return (
    <aside aria-label="WhatsApp Contact" className="fixed bottom-6 right-6 z-40 flex items-center group">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-emerald-600 text-white px-4 py-3 rounded-full shadow-2xl hover:bg-emerald-500 hover:scale-105 transition duration-300 border-2 border-white/80"
        title="Chat on WhatsApp (+974 5512 3456)"
      >
        <MessageCircle size={24} className="fill-white" />
        <span className="hidden sm:inline font-extrabold text-xs tracking-wide">
          {lang === "ar" ? "طلب سريع عبر الواتساب" : "WhatsApp Order"}
        </span>
      </a>
    </aside>
  );
}
