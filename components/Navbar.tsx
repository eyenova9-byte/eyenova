"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
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
  Sparkles,
  Zap,
  MapPin,
  FileText,
  Phone,
  MessageCircle,
} from "lucide-react";
import { EyeNovaLogo } from "@/components/EyeNovaLogo";

function NavbarContent() {
  const router = useRouter();
  const { lang, setLang, isRtl } = useLanguage();
  const { itemCount, setIsCartOpen } = useCart();
  const { user, setIsAuthModalOpen } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };
  const categoryParam = searchParams.get("category");
  const brandParam = searchParams.get("brand");

  // Determine which top-level menu item is active
  const isHomeActive = pathname === "/";
  const isMedicalActive =
    pathname === "/collections/daily-lens" ||
    pathname === "/collections/bi-weekly-lens" ||
    pathname === "/collections/monthly-lens" ||
    pathname === "/collections/astigmatism" ||
    pathname === "/collections/multi-focal" ||
    (pathname === "/shop" && categoryParam === "medical-lenses") ||
    (pathname.startsWith("/products/") && !brandParam);
  const isColorActive =
    (pathname === "/shop" && categoryParam === "colored-lenses") ||
    pathname === "/collections/colored-lenses";
  const isBrandActive = Boolean(brandParam) || pathname.startsWith("/collections/brand-");
  const isLashesActive = pathname === "/shop" && categoryParam === "lashes";
  const isSolutionsActive = pathname === "/shop" && categoryParam === "solutions-drops";
  const isAboutActive = pathname === "/about";


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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      {/* 1. Announcement Strip */}
      <div className="bg-slate-950 text-slate-200 border-b border-slate-800 text-[11px] sm:text-xs py-1.5 sm:py-2 px-3 tracking-normal">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-center">
          <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium">
              {lang === "ar" ? "توصيل فوري خلال ساعتين في قطر" : "⚡ 2-Hour Express Delivery in Doha"}
            </span>
          </div>
          <div className="mx-auto sm:mx-0 flex items-center gap-1.5 font-medium truncate">
            <span>
              {lang === "ar"
                ? "استخدم الكود EYENOVA10 للحصول على خصم 10%"
                : "Use code EYENOVA10 for 10% off your order"}
            </span>
            <Link href="/shop" className="underline text-sky-400 hover:text-sky-300 font-semibold shrink-0 ml-1">
              {lang === "ar" ? "تسوق" : "Shop"} →
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-400">
            <span>Villaggio • Vendôme • DFC • Ezdan</span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 lg:h-[76px] flex items-center justify-between relative">
        {/* Mobile Left: Hamburger Button */}
        <div className="flex items-center lg:hidden z-10">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 -ml-1.5 text-slate-800 hover:bg-slate-100 rounded-xl transition focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            <Menu size={22} strokeWidth={2} />
          </button>
        </div>

        {/* Logo: Responsive size on mobile and desktop */}
        <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 z-0 flex items-center justify-center pointer-events-auto">
          <div className="hidden sm:block">
            <EyeNovaLogo size="md" />
          </div>
          <div className="block sm:hidden">
            <EyeNovaLogo size="sm" />
          </div>
        </div>

        {/* Center Desktop Navigation Menu (Eyenk: 14px, font-normal, #121212) */}
        <nav className="hidden lg:flex items-center gap-7 text-[14px] font-normal text-[#121212] tracking-[0.03em]">
          {/* Home Link */}
          <Link
            href="/"
            className={`transition py-6 ${
              isHomeActive
                ? "text-[#121212] underline underline-offset-8 decoration-1 decoration-[#121212]"
                : "text-[#121212] hover:underline hover:underline-offset-8 hover:decoration-1 hover:decoration-[#121212]"
            }`}
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
              href="/collections/daily-lens"
              className={`flex items-center gap-1 transition py-6 ${
                isMedicalActive
                  ? "text-[#121212] underline underline-offset-8 decoration-1 decoration-[#121212]"
                  : "text-[#121212] hover:underline hover:underline-offset-8 hover:decoration-1 hover:decoration-[#121212]"
              }`}
            >
              <span>{lang === "ar" ? "عدسات طبية" : "Medical Lens"}</span>
              <ChevronDown size={14} className="text-[#707070] no-underline" />
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
              className={`flex items-center gap-1 transition py-6 ${
                isColorActive
                  ? "text-[#121212] underline underline-offset-8 decoration-1 decoration-[#121212]"
                  : "text-[#121212] hover:underline hover:underline-offset-8 hover:decoration-1 hover:decoration-[#121212]"
              }`}
            >
              <span>{lang === "ar" ? "عدسات ملونة" : "Color Lens"}</span>
              <ChevronDown size={14} className="text-[#707070] no-underline" />
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
            <button 
              type="button"
              className={`flex items-center gap-1 transition py-6 cursor-pointer ${
                isBrandActive
                  ? "text-[#121212] underline underline-offset-8 decoration-1 decoration-[#121212]"
                  : "text-[#121212] hover:underline hover:underline-offset-8 hover:decoration-1 hover:decoration-[#121212]"
              }`}
            >
              <span>{lang === "ar" ? "الماركات" : "By Brand"}</span>
              <ChevronDown size={14} className="text-[#707070] no-underline" />
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

          {/* Lashes Link */}
          <Link 
            href="/shop?category=lashes" 
            className={`transition py-6 ${
              isLashesActive
                ? "text-[#121212] underline underline-offset-8 decoration-1 decoration-[#121212]"
                : "text-[#121212] hover:underline hover:underline-offset-8 hover:decoration-1 hover:decoration-[#121212]"
            }`}
          >
            {lang === "ar" ? "رموش" : "Lashes"}
          </Link>

          {/* Solutions Link */}
          <Link 
            href="/shop?category=solutions-drops" 
            className={`transition py-6 ${
              isSolutionsActive
                ? "text-[#121212] underline underline-offset-8 decoration-1 decoration-[#121212]"
                : "text-[#121212] hover:underline hover:underline-offset-8 hover:decoration-1 hover:decoration-[#121212]"
            }`}
          >
            {lang === "ar" ? "محاليل" : "Solutions"}
          </Link>

          {/* About Us Link */}
          <Link 
            href="/about" 
            className={`transition py-6 ${
              isAboutActive
                ? "text-[#121212] underline underline-offset-8 decoration-1 decoration-[#121212]"
                : "text-[#121212] hover:underline hover:underline-offset-8 hover:decoration-1 hover:decoration-[#121212]"
            }`}
          >
            {lang === "ar" ? "من نحن" : "About Us"}
          </Link>
        </nav>

        {/* Right Icons: Language Switch, Search, (Account desktop), Bag with count */}
        <div className="flex items-center justify-end gap-1 sm:gap-2.5 z-10">
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold transition-all border border-slate-200 cursor-pointer"
            aria-label="Toggle language"
          >
            {lang === "en" ? "عربي" : "EN"}
          </button>

          {/* Search Icon */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            aria-label="Search"
          >
            <Search size={19} strokeWidth={1.8} />
          </button>

          {/* Account Icon (Desktop only, mobile has Account in bottom bar) */}
          <div className="hidden lg:block">
            {user ? (
              <Link
                href="/profile"
                className="p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-xl transition block"
                aria-label="Account"
              >
                <User size={19} strokeWidth={1.8} />
              </Link>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                aria-label="Login"
              >
                <User size={19} strokeWidth={1.8} />
              </button>
            )}
          </div>

          {/* Shopping Bag Icon with Cart Count */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-xl relative transition cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag size={19} strokeWidth={1.8} />
            {itemCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-slate-950 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Expandable Search Drawer */}
      {searchOpen && (
        <div className="border-t border-slate-200 bg-white/98 backdrop-blur-md p-4 animate-fade-in shadow-lg">
          <div className="max-w-3xl mx-auto space-y-3">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder={lang === "ar" ? "ابحث عن ماركة، عدسة، محلول (مثل بيلا، أكوفيو)..." : "Search brand, lens, solution (e.g. Bella, Acuvue)..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-slate-950 text-white text-xs font-semibold hover:bg-sky-600 transition cursor-pointer"
              >
                {lang === "ar" ? "بحث" : "Search"}
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </form>

            {/* Trending Quick Search Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 text-xs">
              <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1">
                <Sparkles size={12} className="text-amber-500" />
                {lang === "ar" ? "الأكثر بحثاً:" : "Popular:"}
              </span>
              {["Bella Diamond", "1-Day Acuvue", "Amara Hazel", "LensMe", "Opti-Free"].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setSearchQuery(tag);
                    router.push(`/shop?search=${encodeURIComponent(tag)}`);
                    setSearchOpen(false);
                  }}
                  className="shrink-0 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-sky-600 text-slate-600 text-[11px] font-medium transition cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Slide-Out Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden animate-fade-in">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-[320px] bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto z-10 animate-slide-in">
            <div>
              {/* Drawer Top Bar */}
              <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/70">
                <EyeNovaLogo size="sm" asLink={false} />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition cursor-pointer"
                  aria-label="Close menu"
                >
                  <X size={20} strokeWidth={2} />
                </button>
              </div>

              {/* Quick Qatar Badges in Drawer */}
              <div className="p-3 bg-sky-50/60 border-b border-sky-100/80 flex items-center justify-around text-[11px] font-semibold text-sky-900">
                <span className="flex items-center gap-1">
                  <Zap size={13} className="text-amber-500 fill-amber-500" />
                  <span>2h Express Doha</span>
                </span>
                <span className="text-sky-300">•</span>
                <span className="flex items-center gap-1">
                  <MapPin size={13} className="text-sky-600" />
                  <span>4 Qatar Stores</span>
                </span>
              </div>

              {/* Drawer Navigation Links */}
              <nav className="p-4 space-y-1 text-xs sm:text-sm text-slate-800">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-slate-50 font-medium text-slate-900"
                >
                  <span>{lang === "ar" ? "الرئيسية" : "Home"}</span>
                </Link>

                {/* Medical Lens Accordion */}
                <details className="group py-1 border-b border-slate-100">
                  <summary className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-slate-50 cursor-pointer list-none select-none font-medium">
                    <span>{lang === "ar" ? "عدسات طبية" : "Medical Lenses"}</span>
                    <ChevronDown size={16} className="text-slate-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="pt-1 pb-2 pl-4 pr-2 space-y-1 text-xs text-slate-600">
                    {medicalLensLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 hover:text-sky-600 transition"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </details>

                {/* Color Lens Accordion */}
                <details className="group py-1 border-b border-slate-100">
                  <summary className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-slate-50 cursor-pointer list-none select-none font-medium">
                    <span>{lang === "ar" ? "عدسات ملونة" : "Colored Lenses"}</span>
                    <ChevronDown size={16} className="text-slate-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="pt-1 pb-2 pl-4 pr-2 space-y-1 text-xs text-slate-600">
                    {colorLensLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 hover:text-sky-600 transition"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </details>

                {/* By Brand Accordion */}
                <details className="group py-1 border-b border-slate-100">
                  <summary className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-slate-50 cursor-pointer list-none select-none font-medium">
                    <span>{lang === "ar" ? "الماركات العالمية" : "Brands"}</span>
                    <ChevronDown size={16} className="text-slate-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="pt-1 pb-2 pl-4 pr-2 space-y-1 text-xs text-slate-600">
                    {brandLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 hover:text-sky-600 transition"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </details>

                <Link
                  href="/shop?category=solutions-drops"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-slate-50 font-medium text-slate-800 border-b border-slate-100"
                >
                  <span>{lang === "ar" ? "المحاليل والقطرات" : "Solutions & Eye Drops"}</span>
                </Link>

                <Link
                  href="/shop?category=eyeglasses"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-slate-50 font-medium text-slate-800 border-b border-slate-100"
                >
                  <span>{lang === "ar" ? "نظارات طبية" : "Spectacles & Frames"}</span>
                </Link>

                <Link
                  href="/shop?category=sunglasses"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-slate-50 font-medium text-slate-800 border-b border-slate-100"
                >
                  <span>{lang === "ar" ? "نظارات شمسية" : "Sunglasses"}</span>
                </Link>

                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-slate-50 font-medium text-slate-800"
                >
                  <span>{lang === "ar" ? "من نحن" : "About EyeNova"}</span>
                </Link>
              </nav>
            </div>

            {/* Drawer Bottom Info */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
              {/* Account button */}
              <Link
                href={user ? "/profile" : "#"}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (!user) setIsAuthModalOpen(true);
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-100 transition"
              >
                <User size={15} />
                <span>{user ? user.phone : (lang === "ar" ? "تسجيل الدخول / حسابي" : "Log In / My Account")}</span>
              </Link>

              {/* Direct WhatsApp button */}
              <a
                href="https://wa.me/97455123456"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold shadow-xs hover:bg-[#20ba5a] transition"
              >
                <MessageCircle size={15} />
                <span>WhatsApp Optometrist</span>
              </a>

              {/* Language Switch */}
              <div className="pt-1 flex items-center justify-between text-xs text-slate-500">
                <span>{lang === "ar" ? "اللغة" : "Language"}</span>
                <button
                  onClick={() => setLang(lang === "en" ? "ar" : "en")}
                  className="font-bold text-sky-600 hover:underline cursor-pointer"
                >
                  {lang === "en" ? "العربية" : "English"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function Navbar() {
  return (
    <Suspense fallback={<header className="sticky top-0 z-50 bg-white border-b border-[#e5e7eb] h-[80px]" />}>
      <NavbarContent />
    </Suspense>
  );
}
