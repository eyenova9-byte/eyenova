"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Globe,
  MapPin,
  Sparkles,
} from "lucide-react";

export function Navbar() {
  const { lang, setLang, t, isRtl } = useLanguage();
  const { itemCount, setIsCartOpen } = useCart();
  const { user, setIsAuthModalOpen } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const colorBrands = [
    { name: "Amara", slug: "amara" },
    { name: "Bella", slug: "bella" },
    { name: "Diva", slug: "diva" },
    { name: "Lens Me", slug: "lensme" },
    { name: "FreshLook", slug: "freshlook" },
    { name: "Acuvue Define", slug: "acuvue-define" },
    { name: "Celena", slug: "celena" },
    { name: "Daya", slug: "daya" },
  ];

  const medicalBrands = [
    { name: "Acuvue", slug: "acuvue" },
    { name: "Alcon", slug: "alcon" },
    { name: "Bausch & Lomb", slug: "bausch-lomb" },
    { name: "Coopervision", slug: "coopervision" },
    { name: "Dailies", slug: "dailies" },
    { name: "Biofinity", slug: "biofinity" },
    { name: "Air Optix", slug: "air-optix" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* 1. Top Eyenk-Style Announcement Bar */}
      <div className="bg-[#f8edeb] text-slate-800 text-[11px] sm:text-xs py-2 px-4 border-b border-[#f0dedb]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold">
            <span className="bg-slate-900 text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded">
              OFFER
            </span>
            <span>
              {lang === "ar"
                ? "استخدمي كود RETURN10 لخصم 10% للعملاء الدائمين | توصيل سريع في قطر"
                : "Use code RETURN10 for 10% off for Returning Customers | Express Delivery in Qatar"}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-bold">
            <span className="hidden md:inline font-mono">QAR (ر.ق)</span>
            <span className="hidden md:inline text-gray-300">|</span>
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="hover:text-emerald-700 transition flex items-center gap-1"
            >
              <Globe size={13} />
              <span>{lang === "en" ? "العربية" : "English"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Header (Logo, Search, Account, Cart) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-900 hover:bg-gray-100 rounded-lg transition"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Brand Logo - Eyenk Clean Minimalist Styling */}
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl sm:text-3xl font-black tracking-tighter text-slate-950 flex items-center">
            <span>EYE</span>
            <span className="text-emerald-600">NOVA</span>
            <span className="text-xs font-serif font-light text-gray-400 ml-1">.qa</span>
          </div>
        </Link>

        {/* Search Bar - Center */}
        <div className="hidden md:flex flex-1 max-w-xl mx-6">
          <div className="relative w-full">
            <input
              type="text"
              placeholder={
                lang === "ar"
                  ? "ابحثي عن العدسات، الماركات، المحاليل، النظارات..."
                  : "Search for contact lenses, brands, solutions..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs font-semibold bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-slate-900 focus:bg-white transition"
            />
            <Search
              size={16}
              className="absolute left-3.5 top-3 text-gray-400"
            />
          </div>
        </div>

        {/* Right Actions: Account, Admin, Cart */}
        <div className="flex items-center gap-3">
          {/* User Account Login */}
          {user ? (
            <Link
              href="/profile"
              className="flex items-center gap-1.5 p-2 text-slate-800 hover:text-emerald-600 transition"
              title={user.phone}
            >
              <User size={22} />
              <span className="hidden sm:inline text-xs font-bold font-mono">
                {user.fullName || user.phone}
              </span>
            </Link>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1 p-2 text-slate-800 hover:text-emerald-600 transition text-xs font-bold"
            >
              <User size={22} />
              <span className="hidden sm:inline">
                {lang === "ar" ? "تسجيل الدخول" : "Account"}
              </span>
            </button>
          )}

          {/* Cart Bag Icon with Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-slate-900 hover:text-emerald-600 transition"
          >
            <ShoppingBag size={24} />
            {itemCount > 0 && (
              <span className="absolute 0 right-0 bg-slate-900 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 3. Eyenk Main Navigation Bar (Exact Eyenk Links) */}
      <nav className="hidden lg:block border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-start gap-7 text-xs font-bold text-slate-800">
          {/* Home */}
          <Link
            href="/"
            className="py-3 border-b-2 border-transparent hover:border-slate-900 hover:text-slate-900 transition"
          >
            {lang === "ar" ? "الرئيسية" : "Home"}
          </Link>

          {/* Daily Lens */}
          <Link
            href="/shop?category=medical-lenses&duration=DAILY_DISPOSABLE"
            className="py-3 border-b-2 border-transparent hover:border-slate-900 hover:text-slate-900 transition"
          >
            {lang === "ar" ? "عدسات يومية" : "Daily Lens"}
          </Link>

          {/* Monthly Lens */}
          <Link
            href="/shop?category=medical-lenses&duration=MONTHLY"
            className="py-3 border-b-2 border-transparent hover:border-slate-900 hover:text-slate-900 transition"
          >
            {lang === "ar" ? "عدسات شهرية" : "Monthly Lens"}
          </Link>

          {/* Color Contact Lens Dropdown */}
          <div
            className="relative py-3 group"
            onMouseEnter={() => setOpenDropdown("color")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <Link
              href="/shop?category=colored-lenses"
              className="flex items-center gap-1 border-b-2 border-transparent group-hover:border-slate-900 group-hover:text-slate-900 transition"
            >
              <span>{lang === "ar" ? "عدسات ملونة" : "Color Contact Lens"}</span>
              <ChevronDown size={14} className="text-gray-400 group-hover:rotate-180 transition" />
            </Link>

            {/* Dropdown Menu */}
            {openDropdown === "color" && (
              <div className="absolute top-full left-0 w-48 bg-white border border-gray-200 shadow-xl rounded-b-xl py-2 z-50 animate-fade-in">
                {colorBrands.map((b) => (
                  <Link
                    key={b.slug}
                    href={`/shop?brand=${b.slug}`}
                    className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-gray-50 hover:text-emerald-600 transition"
                  >
                    {b.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Medical Lenses Dropdown */}
          <div
            className="relative py-3 group"
            onMouseEnter={() => setOpenDropdown("medical")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <Link
              href="/shop?category=medical-lenses"
              className="flex items-center gap-1 border-b-2 border-transparent group-hover:border-slate-900 group-hover:text-slate-900 transition"
            >
              <span>{lang === "ar" ? "عدسات طبية" : "Medical Lenses"}</span>
              <ChevronDown size={14} className="text-gray-400 group-hover:rotate-180 transition" />
            </Link>

            {/* Dropdown Menu */}
            {openDropdown === "medical" && (
              <div className="absolute top-full left-0 w-48 bg-white border border-gray-200 shadow-xl rounded-b-xl py-2 z-50 animate-fade-in">
                {medicalBrands.map((b) => (
                  <Link
                    key={b.slug}
                    href={`/shop?brand=${b.slug}`}
                    className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-gray-50 hover:text-blue-600 transition"
                  >
                    {b.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Astigmatism / Toric */}
          <Link
            href="/shop?category=medical-lenses"
            className="py-3 border-b-2 border-transparent hover:border-slate-900 hover:text-slate-900 transition"
          >
            {lang === "ar" ? "انحراف (Astigmatism)" : "Astigmatism"}
          </Link>

          {/* Solutions */}
          <Link
            href="/shop?category=solutions-drops"
            className="py-3 border-b-2 border-transparent hover:border-slate-900 hover:text-slate-900 transition"
          >
            {lang === "ar" ? "محاليل وقطرات" : "Lens Solutions"}
          </Link>

          {/* Lashes */}
          <Link
            href="/shop?category=lashes"
            className="py-3 border-b-2 border-transparent hover:border-slate-900 hover:text-slate-900 transition"
          >
            {lang === "ar" ? "الرموش" : "Lashes"}
          </Link>

          {/* Eyeglasses */}
          <Link
            href="/shop?category=eyeglasses"
            className="py-3 border-b-2 border-transparent hover:border-slate-900 hover:text-slate-900 transition"
          >
            {lang === "ar" ? "نظارات طبية" : "Eyeglasses"}
          </Link>

          {/* Store Locations */}
          <a
            href="#locations"
            className="py-3 border-b-2 border-transparent hover:border-slate-900 hover:text-slate-900 transition flex items-center gap-1 text-slate-600"
          >
            <MapPin size={13} />
            <span>{lang === "ar" ? "فروعنا في قطر" : "Store Locations"}</span>
          </a>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white p-4 space-y-3">
          <div className="mb-3">
            <input
              type="text"
              placeholder={
                lang === "ar"
                  ? "ابحثي عن العدسات، الماركات..."
                  : "Search lenses, brands..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2.5 text-xs bg-gray-50 border rounded-lg"
            />
          </div>

          <div className="space-y-2 text-xs font-bold text-slate-800">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded hover:bg-gray-50"
            >
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <Link
              href="/shop?category=colored-lenses"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded hover:bg-gray-50 text-emerald-600 font-extrabold"
            >
              {lang === "ar" ? "عدسات ملونة (Bella, Amara, Lensme)" : "Color Contact Lens (Bella, Amara, Lensme)"}
            </Link>
            <Link
              href="/shop?category=medical-lenses"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded hover:bg-gray-50 text-blue-600 font-extrabold"
            >
              {lang === "ar" ? "عدسات طبية (Acuvue, Alcon, Biofinity)" : "Medical Lenses (Acuvue, Alcon, Biofinity)"}
            </Link>
            <Link
              href="/shop?category=solutions-drops"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded hover:bg-gray-50"
            >
              {lang === "ar" ? "محاليل العدسات وقطرات الترطيب" : "Lens Solutions & Drops"}
            </Link>
            <Link
              href="/shop?category=eyeglasses"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded hover:bg-gray-50"
            >
              {lang === "ar" ? "النظارات الطبية" : "Eyeglasses"}
            </Link>
            <Link
              href="/shop?category=lashes"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded hover:bg-gray-50"
            >
              {lang === "ar" ? "الرموش" : "Lashes"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
