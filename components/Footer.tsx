"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Eye, Phone, Mail, MapPin, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export function Footer() {
  const { t, isRtl } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Guarantees & Features Banner */}
      <div className="border-b border-slate-800 bg-slate-900/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center p-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
              <Truck size={24} />
            </div>
            <h4 className="font-bold text-white mb-1">Same-Day Delivery in Qatar</h4>
            <p className="text-xs text-slate-400">Fast delivery across Doha, Lusail, Al Rayyan & Wakrah.</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3">
              <ShieldCheck size={24} />
            </div>
            <h4 className="font-bold text-white mb-1">100% Authentic Guaranteed</h4>
            <p className="text-xs text-slate-400">Sourced directly from authorized Middle East distributors.</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
              <RefreshCw size={24} />
            </div>
            <h4 className="font-bold text-white mb-1">7-Day Easy Returns</h4>
            <p className="text-xs text-slate-400">Hassle-free replacement for unopened contact lens boxes.</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
              <Eye size={20} />
            </div>
            <span className="text-2xl font-extrabold text-white">{t.siteName}</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t.tagline}. Your trusted online store for Bella, Amara, Lensme, Diva, Acuvue, and luxury titanium frames in Qatar.
          </p>
          <div className="text-xs space-y-2 pt-2 text-slate-400">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-emerald-400 shrink-0" />
              <span>Shop 12, Villaggio Mall & West Bay, Doha, Qatar</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-emerald-400 shrink-0" />
              <span dir="ltr">+974 4411 2233 / +974 5512 3456</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-emerald-400 shrink-0" />
              <span>support@eyenova.com</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-white text-sm mb-4 border-b border-slate-800 pb-2">
            Product Categories
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li><Link href="/shop?category=colored-lenses" className="hover:text-emerald-400 transition">{t.coloredLenses}</Link></li>
            <li><Link href="/shop?category=medical-lenses" className="hover:text-emerald-400 transition">{t.medicalLenses}</Link></li>
            <li><Link href="/shop?category=solutions-drops" className="hover:text-emerald-400 transition">{t.solutions}</Link></li>
            <li><Link href="/shop?category=eyeglasses" className="hover:text-emerald-400 transition">{t.eyeglasses}</Link></li>
            <li><Link href="/shop?category=sunglasses" className="hover:text-emerald-400 transition">{t.sunglasses}</Link></li>
          </ul>
        </div>

        {/* Top Brands */}
        <div>
          <h4 className="font-bold text-white text-sm mb-4 border-b border-slate-800 pb-2">
            Top Brands
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li><Link href="/shop?brand=bella" className="hover:text-emerald-400 transition">Bella Contact Lenses</Link></li>
            <li><Link href="/shop?brand=amara" className="hover:text-emerald-400 transition">Amara Lenses</Link></li>
            <li><Link href="/shop?brand=lensme" className="hover:text-emerald-400 transition">Lensme Colors</Link></li>
            <li><Link href="/shop?brand=diva" className="hover:text-emerald-400 transition">Diva Lenses</Link></li>
            <li><Link href="/shop?brand=acuvue" className="hover:text-emerald-400 transition">Acuvue Moist & Oasys</Link></li>
          </ul>
        </div>

        {/* Customer Care & Qatar Delivery */}
        <div>
          <h4 className="font-bold text-white text-sm mb-4 border-b border-slate-800 pb-2">
            Qatar Delivery Zones
          </h4>
          <p className="text-xs text-slate-400 mb-3">
            We deliver daily to all Qatar municipalities: Doha, Lusail, Al Rayyan, Al Wakrah, Al Khor, West Bay, The Pearl, and Um Salal.
          </p>
          <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
            <span className="text-[11px] text-slate-300 font-bold block mb-1">Accepted Qatar Payments</span>
            <div className="flex flex-wrap gap-1.5 text-[10px] font-bold text-slate-400">
              <span className="bg-slate-800 px-2 py-0.5 rounded text-emerald-400">QPay / NAPS</span>
              <span className="bg-slate-800 px-2 py-0.5 rounded">Cash on Delivery</span>
              <span className="bg-slate-800 px-2 py-0.5 rounded">Apple Pay</span>
              <span className="bg-slate-800 px-2 py-0.5 rounded">Visa / Mastercard</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} EyeNova Optical W.L.L. All rights reserved. Registered in Doha, Qatar.</p>
      </div>
    </footer>
  );
}
