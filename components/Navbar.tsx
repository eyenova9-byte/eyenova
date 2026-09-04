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
    <header className="sticky top-0 z-50 bg-white border-b border-[#e5e5e5]">
      {/* 1. Announcement Strip matching Eyenk #f8edeb aesthetic */}
      <div className="bg-[#f8edeb] border-b border-[#e8dcd9] text-[#121212] text-[13px] py-2.5 px-4 font-normal tracking-[0.03em]">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 hover:underline text-[#121212]"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-[84px] flex items-center justify-between">
        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#121212] -ml-2"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo: Eye Icon + Eyenk style bilingual logo */}
        <Link href="/" className="flex items-center gap-2.5">
          {/* Stylized Eye Logo mark */}
          <div className="relative w-11 h-7 sm:w-13 sm:h-8 flex items-center justify-center">
            <svg viewBox="0 0 54 32" fill="none" className="w-full h-full text-[#121212]">
              <path
                d="M2 16C7 6 18 2 27 2C36 2 47 6 52 16C47 26 36 30 27 30C18 30 7 26 2 16Z"
                stroke="#121212"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <circle cx="27" cy="16" r="8" stroke="#121212" strokeWidth="2.4" />
              <circle cx="27" cy="16" r="3.5" fill="#121212" />
              <circle cx="16" cy="10" r="1.5" fill="#121212" />
              <circle cx="38" cy="10" r="1.5" fill="#121212" />
              <circle cx="20" cy="7" r="1" fill="#121212" />
              <circle cx="34" cy="7" r="1" fill="#121212" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[18px] sm:text-[20px] font-normal tracking-tight text-[#121212] leading-tight">
              EyeNova <span className="font-arabic text-[15px] sm:text-[16px] text-[#121212]">عين نوفا</span>
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation Menu (Eyenk: 14px, font-normal, #121212) */}
        <nav className="hidden lg:flex items-center gap-7 text-[14px] font-normal text-[#121212] tracking-[0.03em]">
          <Link
            href="/"
            className="text-[#121212] underline underline-offset-8 decoration-1 decoration-[#121212]"
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
              className="flex items-center gap-1 hover:text-[#707070] transition py-6"
            >
              <span>{lang === "ar" ? "عدسات طبية" : "Medical Lens"}</span>
              <ChevronDown size={14} className="text-[#707070]" />
            </Link>

            {activeDropdown === "medical" && (
              <div className="absolute top-full left-0 w-52 bg-white border border-[#e5e5e5] shadow-lg py-2 z-50">
                {medicalLensLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2.5 text-[13px] text-[#121212] hover:bg-[#f8edeb] hover:text-[#121212] transition"
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
              className="flex items-center gap-1 hover:text-[#707070] transition py-6"
            >
              <span>{lang === "ar" ? "عدسات ملونة" : "Color Lens"}</span>
              <ChevronDown size={14} className="text-[#707070]" />
            </Link>

            {activeDropdown === "color" && (
              <div className="absolute top-full left-0 w-48 bg-white border border-[#e5e5e5] shadow-lg py-2 z-50">
                {colorLensLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2.5 text-[13px] text-[#121212] hover:bg-[#f8edeb] hover:text-[#121212] transition"
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
            <button className="flex items-center gap-1 hover:text-[#707070] transition py-6">
              <span>{lang === "ar" ? "الماركات" : "By Brand"}</span>
              <ChevronDown size={14} className="text-[#707070]" />
            </button>

            {activeDropdown === "brand" && (
              <div className="absolute top-full left-0 w-48 bg-white border border-[#e5e5e5] shadow-lg py-2 z-50">
                {brandLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2.5 text-[13px] text-[#121212] hover:bg-[#f8edeb] hover:text-[#121212] transition"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/shop?category=lashes" className="hover:text-[#707070] transition">
            {lang === "ar" ? "رموش" : "Lashes"}
          </Link>

          <Link href="/shop?category=solutions-drops" className="hover:text-[#707070] transition">
            {lang === "ar" ? "محاليل" : "Solutions"}
          </Link>

          <Link href="/about" className="hover:text-[#707070] transition">
            {lang === "ar" ? "من نحن" : "About Us"}
          </Link>
        </nav>

        {/* Right Icons (Exact Eyenk: [العربية badge] [Search] [User] [Bag]) */}
        <div className="flex items-center gap-4 sm:gap-5">
          {/* Language Toggle Pill: Clean light pill with Arabic text */}
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="bg-[#f8edeb] hover:bg-[#f0e4e1] text-[#121212] border border-[#e8dcd9] text-[12px] font-normal px-3 py-1.5 rounded-sm transition"
          >
            {lang === "en" ? "العربية" : "English"}
          </button>

          {/* Search Icon */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-[#121212] hover:text-[#707070] p-1 transition"
            aria-label="Search"
          >
            <Search size={20} strokeWidth={1.5} />
          </button>

          {/* Account Icon */}
          {user ? (
            <Link
              href="/profile"
              className="text-[#121212] hover:text-[#707070] p-1 transition"
              aria-label="Account"
            >
              <User size={20} strokeWidth={1.5} />
            </Link>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="text-[#121212] hover:text-[#707070] p-1 transition"
              aria-label="Login"
            >
              <User size={20} strokeWidth={1.5} />
            </button>
          )}

          {/* Shopping Bag Icon with Cart Count */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-[#121212] hover:text-[#707070] p-1 relative transition"
            aria-label="Shopping Cart"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#121212] text-white text-[10px] font-normal w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Expandable Search Drawer */}
      {searchOpen && (
        <div className="border-t border-[#e5e5e5] bg-white p-4 animate-fade-in shadow-md">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <input
              type="text"
              placeholder={lang === "ar" ? "ابحث في متجر عين نوفا..." : "Search EyeNova store..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-white border border-[#d2d2d2] rounded-none text-[13px] text-[#121212] focus:outline-none focus:border-[#121212]"
              autoFocus
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-[13px] text-[#707070] hover:text-[#121212]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#e5e5e5] bg-white p-6 space-y-4 shadow-lg animate-fade-in">
          <nav className="space-y-3.5 text-[15px] text-[#121212]">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-medium"
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
