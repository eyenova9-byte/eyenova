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

      {/* 2. Main Navigation Bar (Eyenk header--middle-left header--mobile-center) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[60px] lg:h-[80px] grid grid-cols-3 lg:flex items-center justify-between">
        {/* Mobile Left: Hamburger Button */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 -ml-2 text-[#121212] focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            <Menu size={22} strokeWidth={1.8} />
          </button>
        </div>

        {/* Logo: Centered on mobile, Left-aligned on desktop (header--mobile-center) */}
        <div className="flex justify-center lg:justify-start">
          <Link href="/" className="flex items-center gap-2 group">
            {/* Stylized Eye Logo mark */}
            <div className="relative w-9 h-6 sm:w-11 sm:h-7 flex items-center justify-center">
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
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[17px] sm:text-[19px] font-normal tracking-tight text-[#121212] leading-tight">
                EyeNova <span className="font-arabic text-[14px] sm:text-[15px] text-[#121212]">عين نوفا</span>
              </span>
            </div>
          </Link>
        </div>

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
            <button className="flex items-center gap-1 hover:text-[#707070] transition py-6 cursor-pointer">
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

        {/* Right Icons: Language Switch, Search, (Account desktop), Bag with count */}
        <div className="flex items-center justify-end gap-2 sm:gap-3.5">
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="bg-[#f8edeb] hover:bg-[#f0e4e1] text-[#121212] border border-[#e8dcd9] text-[11px] sm:text-[12px] font-normal px-2.5 py-1 rounded-xs transition cursor-pointer"
          >
            {lang === "en" ? "العربية" : "English"}
          </button>

          {/* Search Icon */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-[#121212] hover:text-[#707070] p-1.5 transition cursor-pointer"
            aria-label="Search"
          >
            <Search size={19} strokeWidth={1.6} />
          </button>

          {/* Account Icon (Desktop only, mobile has Account in bottom bar) */}
          <div className="hidden lg:block">
            {user ? (
              <Link
                href="/profile"
                className="text-[#121212] hover:text-[#707070] p-1.5 transition"
                aria-label="Account"
              >
                <User size={19} strokeWidth={1.6} />
              </Link>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="text-[#121212] hover:text-[#707070] p-1.5 transition cursor-pointer"
                aria-label="Login"
              >
                <User size={19} strokeWidth={1.6} />
              </button>
            )}
          </div>

          {/* Shopping Bag Icon with Cart Count */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-[#121212] hover:text-[#707070] p-1.5 relative transition cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag size={19} strokeWidth={1.6} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#121212] text-white text-[10px] font-normal w-4 h-4 rounded-full flex items-center justify-center">
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
              className="text-[13px] text-[#707070] hover:text-[#121212] cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Mobile Slide-Out Menu Drawer (Eyenk header-drawer parity) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-[320px] bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto z-10">
            <div>
              {/* Drawer Top Bar */}
              <div className="flex items-center justify-between p-4 border-b border-[#e5e5e5]">
                <span className="text-[15px] font-normal text-[#121212]">
                  {lang === "ar" ? "القائمة" : "Menu"}
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-[#121212] hover:text-[#707070] cursor-pointer"
                  aria-label="Close menu"
                >
                  <X size={20} strokeWidth={1.8} />
                </button>
              </div>

              {/* Drawer Navigation Links */}
              <nav className="p-4 space-y-1 text-[14px] text-[#121212]">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2.5 border-b border-[#f0f0f0] font-normal text-[#121212] hover:text-[#707070]"
                >
                  {lang === "ar" ? "الرئيسية" : "Home"}
                </Link>

                {/* Medical Lens Accordion */}
                <details className="group border-b border-[#f0f0f0] py-2.5">
                  <summary className="flex items-center justify-between cursor-pointer list-none select-none">
                    <span>{lang === "ar" ? "عدسات طبية" : "Medical Lens"}</span>
                    <ChevronDown size={16} className="text-[#707070] group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="pt-2 pl-3 space-y-2 text-[13px] text-[#707070]">
                    {medicalLensLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 hover:text-[#121212]"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </details>

                {/* Color Lens Accordion */}
                <details className="group border-b border-[#f0f0f0] py-2.5">
                  <summary className="flex items-center justify-between cursor-pointer list-none select-none">
                    <span>{lang === "ar" ? "عدسات ملونة" : "Colour Lenses"}</span>
                    <ChevronDown size={16} className="text-[#707070] group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="pt-2 pl-3 space-y-2 text-[13px] text-[#707070]">
                    {colorLensLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 hover:text-[#121212]"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </details>

                {/* By Brand Accordion */}
                <details className="group border-b border-[#f0f0f0] py-2.5">
                  <summary className="flex items-center justify-between cursor-pointer list-none select-none">
                    <span>{lang === "ar" ? "الماركات" : "By Brand"}</span>
                    <ChevronDown size={16} className="text-[#707070] group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="pt-2 pl-3 space-y-2 text-[13px] text-[#707070]">
                    {brandLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 hover:text-[#121212]"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </details>

                <Link
                  href="/shop?category=lashes"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2.5 border-b border-[#f0f0f0] hover:text-[#707070]"
                >
                  {lang === "ar" ? "رموش" : "Lashes"}
                </Link>

                <Link
                  href="/shop?category=solutions-drops"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2.5 border-b border-[#f0f0f0] hover:text-[#707070]"
                >
                  {lang === "ar" ? "محاليل" : "Solutions"}
                </Link>

                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2.5 border-b border-[#f0f0f0] hover:text-[#707070]"
                >
                  {lang === "ar" ? "من نحن" : "About Us"}
                </Link>
              </nav>
            </div>

            {/* Drawer Bottom Info */}
            <div className="p-4 border-t border-[#e5e5e5] bg-[#fafafa] space-y-3">
              <Link
                href={user ? "/profile" : "#"}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (!user) setIsAuthModalOpen(true);
                }}
                className="flex items-center gap-2 text-[13px] text-[#121212] font-normal"
              >
                <User size={16} />
                <span>{user ? user.phone : (lang === "ar" ? "تسجيل الدخول / حسابي" : "Log in / Account")}</span>
              </Link>
              <a
                href="https://wa.me/97455123456"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[13px] text-[#186b2b] font-normal"
              >
                <span>WhatsApp Customer Support (+974 5512 3456)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
