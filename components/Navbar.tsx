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
  ArrowRight,
} from "lucide-react";

export function Navbar() {
  const { lang, setLang, isRtl } = useLanguage();
  const { itemCount, setIsCartOpen } = useCart();
  const { user, setIsAuthModalOpen } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const medicalLensLinks = [
    { name: "Daily Lens", href: "/shop?category=medical-lenses&duration=DAILY_DISPOSABLE" },
    { name: "Bi-Weekly Lens", href: "/shop?category=medical-lenses" },
    { name: "Monthly Lens", href: "/shop?category=medical-lenses&duration=MONTHLY" },
    { name: "Astigmatism", href: "/shop?category=medical-lenses" },
    { name: "Multi-focal", href: "/shop?category=medical-lenses" },
    { name: "Acuvue", href: "/shop?brand=acuvue" },
    { name: "Alcon", href: "/shop?brand=alcon" },
    { name: "Bausch & Lomb", href: "/shop?brand=bausch-lomb" },
    { name: "Coopervision", href: "/shop?brand=coopervision" },
    { name: "Biofinity", href: "/shop?brand=biofinity" },
  ];

  const colorLensLinks = [
    { name: "Amara", href: "/shop?brand=amara" },
    { name: "Bella", href: "/shop?brand=bella" },
    { name: "Diva", href: "/shop?brand=diva" },
    { name: "Lens Me", href: "/shop?brand=lensme" },
    { name: "FreshLook", href: "/shop?brand=freshlook" },
    { name: "Acuvue Define", href: "/shop?brand=acuvue-define" },
    { name: "Celena", href: "/shop?brand=celena" },
    { name: "Daya", href: "/shop?brand=daya" },
  ];

  const brandLinks = [
    { name: "Acuvue", href: "/shop?brand=acuvue" },
    { name: "Alcon", href: "/shop?brand=alcon" },
    { name: "Amara", href: "/shop?brand=amara" },
    { name: "Bella", href: "/shop?brand=bella" },
    { name: "Biofinity", href: "/shop?brand=biofinity" },
    { name: "Diva", href: "/shop?brand=diva" },
    { name: "Lens Me", href: "/shop?brand=lensme" },
    { name: "FreshLook", href: "/shop?brand=freshlook" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      {/* 1. Exact Eyenk Top Announcement Strip (Dark Slate, Centered Coupon with Arrow) */}
      <div className="bg-[#1e232d] text-white text-[12px] sm:text-[13px] py-2 px-4 font-normal tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 hover:underline text-gray-100"
          >
            <span>
              {lang === "ar"
                ? "استخدم الكود RETURN10 للحصول على خصم 10% لعملائنا الدائمين"
                : "Use code RETURN10 for 10% off for Returning Customers"}
            </span>
            <span className="text-sm font-light">→</span>
          </Link>
        </div>
      </div>

      {/* 2. Main Navigation Bar (Clean White, Logo Left, Nav Links Center, Icons Right) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-[88px] flex items-center justify-between">
        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-800 -ml-2"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo: Eye Icon + Eyenk style bilingual logo */}
        <Link href="/" className="flex items-center gap-2.5">
          {/* Stylized Eye Logo mark */}
          <div className="relative w-11 h-7 sm:w-13 sm:h-8 flex items-center justify-center">
            <svg viewBox="0 0 54 32" fill="none" className="w-full h-full text-indigo-700">
              <path
                d="M2 16C7 6 18 2 27 2C36 2 47 6 52 16C47 26 36 30 27 30C18 30 7 26 2 16Z"
                stroke="#4F46E5"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="27" cy="16" r="8" stroke="#4F46E5" strokeWidth="2.5" />
              <circle cx="27" cy="16" r="3.5" fill="#4F46E5" />
              <circle cx="16" cy="10" r="1.5" fill="#4F46E5" />
              <circle cx="38" cy="10" r="1.5" fill="#4F46E5" />
              <circle cx="20" cy="7" r="1" fill="#4F46E5" />
              <circle cx="34" cy="7" r="1" fill="#4F46E5" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[17px] sm:text-[19px] font-medium tracking-tight text-slate-900 leading-tight">
              Eyenk <span className="font-arabic text-[15px] sm:text-[16px] text-slate-800">عينك</span>
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation Menu */}
        <nav className="hidden lg:flex items-center gap-7 text-[14px] font-normal text-slate-800">
          <Link
            href="/"
            className="text-slate-900 font-medium underline underline-offset-8 decoration-2 decoration-slate-900"
          >
            {lang === "ar" ? "الرئيسية" : "Home"}
          </Link>

          {/* Medical Lens Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("medical")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href="/shop?category=medical-lenses"
              className="flex items-center gap-1 hover:text-slate-950 transition py-6"
            >
              <span>{lang === "ar" ? "عدسات طبية" : "Medical Lens"}</span>
              <ChevronDown size={14} className="text-slate-600" />
            </Link>

            {activeDropdown === "medical" && (
              <div className="absolute top-full left-0 w-52 bg-white border border-gray-100 shadow-xl py-2 z-50">
                {medicalLensLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 text-[13px] text-slate-700 hover:bg-gray-50 hover:text-indigo-600"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Color Lens Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("color")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href="/shop?category=colored-lenses"
              className="flex items-center gap-1 hover:text-slate-950 transition py-6"
            >
              <span>{lang === "ar" ? "عدسات ملونة" : "Color Lens"}</span>
              <ChevronDown size={14} className="text-slate-600" />
            </Link>

            {activeDropdown === "color" && (
              <div className="absolute top-full left-0 w-48 bg-white border border-gray-100 shadow-xl py-2 z-50">
                {colorLensLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 text-[13px] text-slate-700 hover:bg-gray-50 hover:text-indigo-600"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* By Brand Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("brand")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 hover:text-slate-950 transition py-6">
              <span>{lang === "ar" ? "الماركات" : "By Brand"}</span>
              <ChevronDown size={14} className="text-slate-600" />
            </button>

            {activeDropdown === "brand" && (
              <div className="absolute top-full left-0 w-48 bg-white border border-gray-100 shadow-xl py-2 z-50">
                {brandLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 text-[13px] text-slate-700 hover:bg-gray-50 hover:text-indigo-600"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/shop?category=lashes" className="hover:text-slate-950 transition">
            {lang === "ar" ? "رموش" : "Lashes"}
          </Link>

          <Link href="/shop?category=solutions-drops" className="hover:text-slate-950 transition">
            {lang === "ar" ? "محاليل" : "Solutions"}
          </Link>

          <Link href="/about" className="hover:text-slate-950 transition">
            {lang === "ar" ? "من نحن" : "About Us"}
          </Link>
        </nav>

        {/* Right Icons (Exact Eyenk: [العربية badge] [Search] [User] [Bag]) */}
        <div className="flex items-center gap-4 sm:gap-5">
          {/* Language Toggle Pill: Exact Black Pill with Arabic text */}
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="bg-[#1e232d] text-white text-[11px] font-bold px-3 py-1.5 rounded-md hover:bg-black transition"
          >
            {lang === "en" ? "العربية" : "English"}
          </button>

          {/* Search Icon */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-slate-800 hover:text-black p-1 transition"
            aria-label="Search"
          >
            <Search size={21} strokeWidth={1.8} />
          </button>

          {/* Account Icon */}
          {user ? (
            <Link
              href="/profile"
              className="text-slate-800 hover:text-black p-1 transition"
              aria-label="Account"
            >
              <User size={21} strokeWidth={1.8} />
            </Link>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="text-slate-800 hover:text-black p-1 transition"
              aria-label="Login"
            >
              <User size={21} strokeWidth={1.8} />
            </button>
          )}

          {/* Shopping Bag Icon with Cart Count */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-slate-800 hover:text-black p-1 relative transition"
            aria-label="Shopping Cart"
          >
            <ShoppingBag size={21} strokeWidth={1.8} />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-slate-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Expandable Search Drawer */}
      {searchOpen && (
        <div className="border-t border-gray-100 bg-gray-50/70 p-4 animate-fade-in">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <input
              type="text"
              placeholder={lang === "ar" ? "ابحث في متجر عينك..." : "Search Eyenk store..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-xs font-medium focus:outline-none focus:border-slate-900"
              autoFocus
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-xs font-semibold text-gray-500 hover:text-slate-900"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white p-5 space-y-4 shadow-lg animate-fade-in">
          <nav className="space-y-3 text-[15px] text-slate-800">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-semibold"
            >
              Home
            </Link>
            <Link
              href="/shop?category=medical-lenses"
              onClick={() => setMobileMenuOpen(false)}
              className="block"
            >
              Medical Lens
            </Link>
            <Link
              href="/shop?category=colored-lenses"
              onClick={() => setMobileMenuOpen(false)}
              className="block"
            >
              Color Lens
            </Link>
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block"
            >
              By Brand
            </Link>
            <Link
              href="/shop?category=lashes"
              onClick={() => setMobileMenuOpen(false)}
              className="block"
            >
              Lashes
            </Link>
            <Link
              href="/shop?category=solutions-drops"
              onClick={() => setMobileMenuOpen(false)}
              className="block"
            >
              Solutions
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block"
            >
              About Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
