"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { BrandLogo } from "@/components/BrandLogo";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MessageCircle,
  MapPin,
  Sparkles,
  Eye,
  ShieldCheck,
  Globe,
  Phone,
} from "lucide-react";

function NavbarContent() {
  const { lang, setLang, isRtl } = useLanguage();
  const { itemCount, setIsCartOpen } = useCart();
  const { user, setIsAuthModalOpen } = useAuth();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const brandParam = searchParams.get("brand");

  useEffect(() => {
    setMounted(true);
  }, []);

  const drawerCardsScrollRef = useRef<HTMLDivElement>(null);

  const scrollDrawerCards = (direction: "left" | "right") => {
    if (drawerCardsScrollRef.current) {
      drawerCardsScrollRef.current.scrollBy({
        left: direction === "left" ? -180 : 180,
        behavior: "smooth",
      });
    }
  };

  // Lock body scroll whenever mobile menu is open to prevent page bleed-through
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow || "unset";
      };
    }
  }, [mobileMenuOpen]);

  // Determine active menu state
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
    { name: "Daily Disposable", href: "/shop?category=medical-lenses&duration=DAILY_DISPOSABLE" },
    { name: "Monthly Disposable", href: "/shop?category=medical-lenses&duration=MONTHLY" },
    { name: "Astigmatism (Toric)", href: "/shop?category=medical-lenses" },
    { name: "Multifocal (Presbyopia)", href: "/shop?category=medical-lenses" },
    { name: "Acuvue (Johnson & Johnson)", href: "/shop?brand=acuvue" },
    { name: "Alcon Precision", href: "/shop?brand=alcon" },
    { name: "Bausch + Lomb", href: "/shop?brand=bausch-lomb" },
    { name: "CooperVision", href: "/shop?brand=coopervision" },
  ];

  const colorLensLinks = [
    { name: "Amara Luxury Lenses", href: "/shop?brand=amara" },
    { name: "Bella Natural Collection", href: "/shop?brand=bella" },
    { name: "Diva Cosmetic Series", href: "/shop?brand=diva" },
    { name: "LensMe Korea Collection", href: "/shop?brand=lensme" },
    { name: "FreshLook Classic", href: "/shop?brand=freshlook" },
    { name: "Acuvue Define Ring", href: "/shop?brand=acuvue-define" },
    { name: "Celena Shades", href: "/shop?brand=celena" },
    { name: "Daya Eye Color", href: "/shop?brand=daya" },
  ];

  const popularKeywords = [
    "Acuvue Moist",
    "Bella Contour",
    "LensMe Korea",
    "Daily Lenses",
    "Opti-Free Solution",
    "Amara One Day",
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const handleKeywordClick = (kw: string) => {
    setSearchQuery(kw);
    router.push(`/shop?q=${encodeURIComponent(kw)}`);
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#ececec] transition-all duration-200">
      {/* 1. Subtle Announcement Strip with micro perks */}
      <div className="bg-[#FAF5F2] border-b border-[#EFE5DF] text-[#121212] text-[12px] sm:text-[13px] py-2 px-4 tracking-[0.02em]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left / Center announcement */}
          <div className="flex-1 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 hover:text-[#5c2d76] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#5c2d76] animate-pulse"></span>
              <span className="font-medium">
                {lang === "ar"
                  ? "توصيل سريع بنفس اليوم في قطر | كود خصم RETURN10"
                  : "Same-Day Delivery in Qatar | Use code RETURN10 for 10% off"}
              </span>
              <span className="text-xs">→</span>
            </Link>
          </div>

          {/* Right quick contact info (desktop only) */}
          <div className="hidden md:flex items-center gap-4 text-[12px] text-[#707070]">
            <a
              href="https://wa.me/97455123456"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#121212] flex items-center gap-1 transition-colors"
            >
              <MessageCircle size={13} className="text-[#25D366]" />
              <span>+974 5512 3456</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 lg:h-[76px] flex items-center justify-between relative">
        {/* Mobile Left: Hamburger Button */}
        <div className="flex items-center lg:hidden z-10">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-1.5 -ml-1 text-[#121212] hover:bg-[#FAF5F2] rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            <Menu size={22} strokeWidth={1.8} />
          </button>
        </div>

        {/* Logo: Centered on mobile with strict bounding box, Left-aligned on desktop */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 lg:static lg:translate-x-0 lg:translate-y-0 z-0 flex items-center justify-center pointer-events-auto">
          <BrandLogo size="md" />
        </div>

        {/* Center Desktop Navigation Menu */}
        <nav className="hidden lg:flex items-center gap-8 text-[14px] font-normal text-[#121212] tracking-[0.02em]">
          {/* Home Link */}
          <Link
            href="/"
            className="relative py-6 group transition-colors hover:text-[#5c2d76]"
          >
            <span>{lang === "ar" ? "الرئيسية" : "Home"}</span>
            <span
              className={`absolute bottom-4 left-0 right-0 h-[2px] bg-[#5c2d76] transition-all duration-200 ${
                isHomeActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
              }`}
            />
          </Link>

          {/* Medical Lens Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("medical")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href="/collections/daily-lens"
              className="relative py-6 flex items-center gap-1 group transition-colors hover:text-[#5c2d76]"
            >
              <span>{lang === "ar" ? "عدسات طبية" : "Medical Lens"}</span>
              <ChevronDown
                size={13}
                className={`text-[#707070] transition-transform duration-200 ${
                  activeDropdown === "medical" ? "rotate-180" : ""
                }`}
              />
              <span
                className={`absolute bottom-4 left-0 right-0 h-[2px] bg-[#5c2d76] transition-all duration-200 ${
                  isMedicalActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                }`}
              />
            </Link>

            {activeDropdown === "medical" && (
              <div className="absolute top-full left-0 w-60 bg-white border border-[#eaeaea] shadow-xl rounded-b-xl py-2 z-50 animate-fade-in">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-[#888888] uppercase tracking-wider">
                  {lang === "ar" ? "الفئات الطبية" : "Medical Categories"}
                </div>
                {medicalLensLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 text-[13px] text-[#222222] hover:bg-[#FAF5F2] hover:text-[#5c2d76] transition-colors"
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
              className="relative py-6 flex items-center gap-1 group transition-colors hover:text-[#5c2d76]"
            >
              <span>{lang === "ar" ? "عدسات ملونة" : "Colour Lenses"}</span>
              <ChevronDown
                size={13}
                className={`text-[#707070] transition-transform duration-200 ${
                  activeDropdown === "color" ? "rotate-180" : ""
                }`}
              />
              <span
                className={`absolute bottom-4 left-0 right-0 h-[2px] bg-[#5c2d76] transition-all duration-200 ${
                  isColorActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                }`}
              />
            </Link>

            {activeDropdown === "color" && (
              <div className="absolute top-full left-0 w-60 bg-white border border-[#eaeaea] shadow-xl rounded-b-xl py-2 z-50 animate-fade-in">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-[#888888] uppercase tracking-wider">
                  {lang === "ar" ? "الماركات الأكثر طلباً" : "Trending Brands"}
                </div>
                {colorLensLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 text-[13px] text-[#222222] hover:bg-[#FAF5F2] hover:text-[#5c2d76] transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Solutions & Eye Drops */}
          <Link
            href="/shop?category=solutions-drops"
            className="relative py-6 group transition-colors hover:text-[#5c2d76]"
          >
            <span>{lang === "ar" ? "محاليل وقطرات" : "Solutions & Drops"}</span>
            <span
              className={`absolute bottom-4 left-0 right-0 h-[2px] bg-[#5c2d76] transition-all duration-200 ${
                isSolutionsActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
              }`}
            />
          </Link>

          {/* Lashes */}
          <Link
            href="/shop?category=lashes"
            className="relative py-6 group transition-colors hover:text-[#5c2d76]"
          >
            <span>{lang === "ar" ? "رموش وإكسسوارات" : "Lashes & Accessories"}</span>
            <span
              className={`absolute bottom-4 left-0 right-0 h-[2px] bg-[#5c2d76] transition-all duration-200 ${
                isLashesActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
              }`}
            />
          </Link>
        </nav>

        {/* Right Action Icons: Language Switch (desktop), Search, Account, Bag */}
        <div className="flex items-center justify-end gap-1 sm:gap-2 z-10">
          {/* Compact Language Switch for Small Screens & Desktop */}
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="inline-flex items-center bg-[#FAF5F2] hover:bg-[#F3EBE7] active:bg-[#ede3de] text-[#121212] border border-[#EBE0DA] text-[11px] font-medium px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full transition-all cursor-pointer hover:border-[#5c2d76]"
            aria-label="Toggle language"
          >
            {lang === "en" ? "العربية" : "EN"}
          </button>

          {/* Search Trigger */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-[#121212] hover:text-[#5c2d76] p-1.5 sm:p-2 hover:bg-[#FAF5F2] rounded-full transition-colors cursor-pointer"
            aria-label="Search"
          >
            <Search size={19} strokeWidth={1.8} />
          </button>

          {/* Account (Desktop) */}
          <div className="hidden lg:block">
            {user ? (
              <Link
                href="/profile"
                className="text-[#121212] hover:text-[#5c2d76] p-2 hover:bg-[#FAF5F2] rounded-full transition-colors inline-block"
                aria-label="Account profile"
              >
                <User size={19} strokeWidth={1.8} />
              </Link>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="text-[#121212] hover:text-[#5c2d76] p-2 hover:bg-[#FAF5F2] rounded-full transition-colors cursor-pointer"
                aria-label="Login"
              >
                <User size={19} strokeWidth={1.8} />
              </button>
            )}
          </div>

          {/* Cart Bag Icon with Live Count */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-[#121212] hover:text-[#5c2d76] p-1.5 sm:p-2 hover:bg-[#FAF5F2] rounded-full relative transition-colors cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag size={20} strokeWidth={1.8} />
            {itemCount > 0 && (
              <span className="absolute 0 right-0 bg-[#5c2d76] text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs animate-scale-in">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 3. Fast Interactive Search Overlay with Popular Chips */}
      {searchOpen && (
        <div className="border-t border-[#ececec] bg-white p-4 sm:p-5 animate-fade-in shadow-lg">
          <div className="max-w-3xl mx-auto space-y-3">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888888]" />
                <input
                  type="text"
                  placeholder={lang === "ar" ? "ابحث عن عدسات، ماركات، محاليل..." : "Search lenses, brands, solutions..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FAF5F2] border border-[#E8DED8] rounded-lg text-[14px] text-[#121212] focus:outline-none focus:border-[#5c2d76] focus:bg-white transition-colors"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="bg-[#5c2d76] text-white text-[13px] font-medium px-4 py-2.5 rounded-lg hover:bg-[#4a245f] transition-colors cursor-pointer"
              >
                {lang === "ar" ? "بحث" : "Search"}
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-[13px] text-[#707070] hover:text-[#121212] px-2 py-2 cursor-pointer"
              >
                {lang === "ar" ? "إلغاء" : "Cancel"}
              </button>
            </form>

            {/* Instant Quick-Search Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[12px] text-[#707070] flex items-center gap-1">
                <Sparkles size={12} className="text-[#5c2d76]" />
                {lang === "ar" ? "الأكثر بحثاً:" : "Popular:"}
              </span>
              {popularKeywords.map((kw) => (
                <button
                  key={kw}
                  type="button"
                  onClick={() => handleKeywordClick(kw)}
                  className="text-[12px] bg-[#FAF5F2] hover:bg-[#F3EBE7] text-[#444444] hover:text-[#121212] border border-[#E8DED8] px-2.5 py-1 rounded-full transition-colors cursor-pointer"
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Luxury Off-Canvas Mobile Drawer mounted to body root via Portal */}
      {mounted && mobileMenuOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex lg:hidden">
          {/* Full Screen Dark Backdrop covering all page elements & bottom navigation */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel: Smooth slide-in, strictly full viewport height, luxury look */}
          <div
            className={`relative w-[85vw] max-w-[340px] bg-white h-[100dvh] shadow-2xl flex flex-col justify-between overflow-hidden z-10 ${
              isRtl ? "animate-drawer-right ml-auto" : "animate-drawer-left"
            }`}
          >
            {/* 1. Header Bar: Brand Logo & Close Button */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#F0EBE6] bg-white shrink-0">
              <BrandLogo size="sm" showArabic={false} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 flex items-center justify-center text-[#121212] hover:bg-[#FAF5F2] active:bg-[#F3EBE7] rounded-full transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X size={20} strokeWidth={1.8} />
              </button>
            </div>

            {/* 2. Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
              {/* Quick Category Hero Cards - One Single Line Scrollable */}
              <div>
                <div
                  ref={drawerCardsScrollRef}
                  className="flex items-stretch gap-2.5 overflow-x-auto no-scrollbar scroll-smooth pb-1"
                >
                  <Link
                    href="/shop?category=medical-lenses"
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex-shrink-0 w-[145px] bg-[#FAF5F2] hover:bg-[#F4ECE8] p-3 rounded-xl border border-[#EFE5DF] transition-all flex flex-col justify-between"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#5c2d76] shadow-2xs mb-2 group-hover:scale-105 transition-transform">
                      <Eye size={16} />
                    </div>
                    <div>
                      <span className="text-[13px] font-semibold text-[#121212] block leading-tight">
                        {lang === "ar" ? "عدسات طبية" : "Medical Lenses"}
                      </span>
                      <span className="text-[10px] text-[#707070] mt-0.5 block">
                        Acuvue, Alcon
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/shop?category=colored-lenses"
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex-shrink-0 w-[145px] bg-[#FAF5F2] hover:bg-[#F4ECE8] p-3 rounded-xl border border-[#EFE5DF] transition-all flex flex-col justify-between"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#5c2d76] shadow-2xs mb-2 group-hover:scale-105 transition-transform">
                      <Sparkles size={16} />
                    </div>
                    <div>
                      <span className="text-[13px] font-semibold text-[#121212] block leading-tight">
                        {lang === "ar" ? "عدسات ملونة" : "Colour Lenses"}
                      </span>
                      <span className="text-[10px] text-[#707070] mt-0.5 block">
                        Bella, Amara
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/shop?category=solutions-drops"
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex-shrink-0 w-[145px] bg-[#FAF5F2] hover:bg-[#F4ECE8] p-3 rounded-xl border border-[#EFE5DF] transition-all flex flex-col justify-between"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#5c2d76] shadow-2xs mb-2 group-hover:scale-105 transition-transform">
                      <ShieldCheck size={16} />
                    </div>
                    <div>
                      <span className="text-[13px] font-semibold text-[#121212] block leading-tight">
                        {lang === "ar" ? "محاليل وقطرات" : "Solutions"}
                      </span>
                      <span className="text-[10px] text-[#707070] mt-0.5 block">
                        Opti-Free, Biotrue
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/shop?category=lashes"
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex-shrink-0 w-[145px] bg-[#FAF5F2] hover:bg-[#F4ECE8] p-3 rounded-xl border border-[#EFE5DF] transition-all flex flex-col justify-between"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#5c2d76] shadow-2xs mb-2 group-hover:scale-105 transition-transform">
                      <Sparkles size={16} />
                    </div>
                    <div>
                      <span className="text-[13px] font-semibold text-[#121212] block leading-tight">
                        {lang === "ar" ? "رموش وإكسسوارات" : "Lashes & Beauty"}
                      </span>
                      <span className="text-[10px] text-[#707070] mt-0.5 block">
                        Cases, Accessories
                      </span>
                    </div>
                  </Link>
                </div>

                {/* Bottom Navigation Buttons for Drawer Quick Cards */}
                <div className="flex items-center justify-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => scrollDrawerCards("left")}
                    className="w-7 h-7 rounded-full border border-[#E5DDD7] bg-white hover:bg-[#FAF5F2] active:bg-[#F3EBE7] text-[#121212] flex items-center justify-center transition-all shadow-2xs cursor-pointer"
                    aria-label="Scroll cards left"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollDrawerCards("right")}
                    className="w-7 h-7 rounded-full border border-[#E5DDD7] bg-white hover:bg-[#FAF5F2] active:bg-[#F3EBE7] text-[#121212] flex items-center justify-center transition-all shadow-2xs cursor-pointer"
                    aria-label="Scroll cards right"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Navigation Items */}
              <nav className="divide-y divide-[#F3EFEA] text-[14px]">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3 font-medium text-[#121212] hover:text-[#5c2d76] transition-colors"
                >
                  <span>{lang === "ar" ? "الرئيسية" : "Home"}</span>
                  <ChevronRight size={15} className={`text-[#A09890] ${isRtl ? "rotate-180" : ""}`} />
                </Link>

                {/* Medical Lens Accordion */}
                <details className="group py-2.5">
                  <summary className="flex items-center justify-between cursor-pointer list-none select-none font-medium text-[#121212] hover:text-[#5c2d76] py-1">
                    <span>{lang === "ar" ? "عدسات طبية" : "Medical Lens"}</span>
                    <ChevronDown size={16} className="text-[#888888] group-open:rotate-180 transition-transform duration-200" />
                  </summary>
                  <div className="pt-2 pb-1 pl-3 space-y-2 text-[13px] text-[#555555]">
                    {medicalLensLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 hover:text-[#5c2d76] transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </details>

                {/* Color Lens Accordion */}
                <details className="group py-2.5">
                  <summary className="flex items-center justify-between cursor-pointer list-none select-none font-medium text-[#121212] hover:text-[#5c2d76] py-1">
                    <span>{lang === "ar" ? "عدسات ملونة" : "Colour Lenses"}</span>
                    <ChevronDown size={16} className="text-[#888888] group-open:rotate-180 transition-transform duration-200" />
                  </summary>
                  <div className="pt-2 pb-1 pl-3 space-y-2 text-[13px] text-[#555555]">
                    {colorLensLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 hover:text-[#5c2d76] transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </details>

                <Link
                  href="/shop?category=solutions-drops"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3 text-[#121212] hover:text-[#5c2d76] transition-colors font-medium"
                >
                  <span>{lang === "ar" ? "محاليل وقطرات العين" : "Solutions & Eye Drops"}</span>
                  <ChevronRight size={15} className={`text-[#A09890] ${isRtl ? "rotate-180" : ""}`} />
                </Link>

                <Link
                  href="/shop?category=lashes"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3 text-[#121212] hover:text-[#5c2d76] transition-colors font-medium"
                >
                  <span>{lang === "ar" ? "رموش وإكسسوارات" : "Lashes & Accessories"}</span>
                  <ChevronRight size={15} className={`text-[#A09890] ${isRtl ? "rotate-180" : ""}`} />
                </Link>

                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3 text-[#121212] hover:text-[#5c2d76] transition-colors"
                >
                  <span>{lang === "ar" ? "من نحن" : "About EyeNova"}</span>
                  <ChevronRight size={15} className={`text-[#A09890] ${isRtl ? "rotate-180" : ""}`} />
                </Link>

                <Link
                  href="/faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3 text-[#121212] hover:text-[#5c2d76] transition-colors"
                >
                  <span>{lang === "ar" ? "الأسئلة الشائعة" : "FAQ & Help"}</span>
                  <ChevronRight size={15} className={`text-[#A09890] ${isRtl ? "rotate-180" : ""}`} />
                </Link>
              </nav>

              {/* Trust Badge Strip */}
              <div className="pt-2">
                <div className="bg-[#FAF5F2] rounded-xl p-3 flex items-center gap-2.5 border border-[#EFE5DF]">
                  <ShieldCheck size={18} className="text-[#5c2d76] shrink-0" />
                  <span className="text-[11px] text-[#555555] leading-snug">
                    {lang === "ar"
                      ? "100% منتجات أصلية معتمدة | توصيل سريع لجميع مناطق قطر"
                      : "100% Authentic Products | Same-Day Delivery in Doha"}
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Pinned Bottom Footer Bar */}
            <div className="p-4 border-t border-[#F0EBE6] bg-[#FAF5F2]/90 backdrop-blur-sm space-y-2.5 shrink-0">
              {/* Language Switcher */}
              <div className="flex items-center justify-between bg-white px-3.5 py-2 rounded-xl border border-[#E8DED8]">
                <div className="flex items-center gap-2 text-[#707070] text-[12px]">
                  <Globe size={15} className="text-[#5c2d76]" />
                  <span>{lang === "ar" ? "اللغة" : "Language"}</span>
                </div>
                <button
                  onClick={() => setLang(lang === "en" ? "ar" : "en")}
                  className="bg-[#FAF5F2] hover:bg-[#F3EBE7] text-[#121212] border border-[#E8DED8] text-[11px] font-semibold px-3 py-1 rounded-full cursor-pointer hover:border-[#5c2d76] transition-colors"
                >
                  {lang === "en" ? "العربية" : "English"}
                </button>
              </div>

              {/* Account Link / Login */}
              <Link
                href={user ? "/profile" : "#"}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (!user) setIsAuthModalOpen(true);
                }}
                className="flex items-center justify-between text-[13px] text-[#121212] font-medium bg-white px-3.5 py-2.5 rounded-xl border border-[#E8DED8] hover:border-[#5c2d76] transition-colors"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div className="w-6 h-6 rounded-full bg-[#FAF5F2] flex items-center justify-center text-[#5c2d76] shrink-0">
                    <User size={14} />
                  </div>
                  <span className="truncate">{user ? user.phone : (lang === "ar" ? "تسجيل الدخول / حسابي" : "Log In / My Account")}</span>
                </div>
                <ChevronRight size={14} className={`text-[#A09890] shrink-0 ${isRtl ? "rotate-180" : ""}`} />
              </Link>

              {/* WhatsApp Concierge */}
              <a
                href="https://wa.me/97455123456"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-[13px] text-white font-medium bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da850] py-2.5 px-3 rounded-xl transition-all shadow-xs"
              >
                <MessageCircle size={17} fill="white" className="text-[#25D366]" />
                <span>WhatsApp Customer Support</span>
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}

export function Navbar() {
  return (
    <Suspense fallback={<header className="sticky top-0 z-50 bg-white border-b border-[#ececec] h-[76px]" />}>
      <NavbarContent />
    </Suspense>
  );
}
