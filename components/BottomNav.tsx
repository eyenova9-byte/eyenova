"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import {
  Home,
  LayoutGrid,
  ShoppingBag,
  User,
  ArrowLeft,
} from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { lang } = useLanguage();
  const { itemCount, setIsCartOpen, isCartOpen } = useCart();
  const { user, setIsAuthModalOpen } = useAuth();

  const isHome = pathname === "/";
  const isShopActive =
    pathname.startsWith("/shop") ||
    pathname.startsWith("/collections") ||
    pathname.startsWith("/categories");
  const isProfileActive = pathname === "/profile";
  const isCartActive = isCartOpen || pathname === "/cart";

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const handleAccountClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setIsAuthModalOpen(true);
    }
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#ececec] lg:hidden h-[60px] grid grid-cols-4 items-center select-none shadow-[0_-4px_16px_rgba(0,0,0,0.04)] px-1"
      id="bottomTb"
      aria-label="Mobile Navigation"
    >
      {/* 1. Tab 1: Home on index, or Back button on inner pages */}
      <div className="h-full flex items-center justify-center">
        {isHome ? (
          <Link
            href="/"
            className="flex flex-col items-center justify-center h-full w-full relative transition-transform active:scale-95"
          >
            <div className="relative">
              <Home
                size={21}
                strokeWidth={isHome ? 2.2 : 1.7}
                className={isHome ? "text-[#5c2d76]" : "text-[#707070]"}
              />
            </div>
            <span
              className={`text-[11px] mt-0.5 ${
                isHome ? "text-[#5c2d76] font-semibold" : "text-[#707070] font-normal"
              }`}
            >
              {lang === "ar" ? "الرئيسية" : "Home"}
            </span>
            {isHome && (
              <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#5c2d76]"></span>
            )}
          </Link>
        ) : (
          <button
            type="button"
            onClick={handleBack}
            className="flex flex-col items-center justify-center h-full w-full relative transition-transform active:scale-95 cursor-pointer"
          >
            <ArrowLeft size={21} strokeWidth={1.8} className="text-[#121212]" />
            <span className="text-[11px] text-[#121212] font-normal mt-0.5">
              {lang === "ar" ? "رجوع" : "Back"}
            </span>
          </button>
        )}
      </div>

      {/* 2. Tab 2: Categories / Catalog */}
      <div className="h-full flex items-center justify-center">
        <Link
          href="/shop"
          className="flex flex-col items-center justify-center h-full w-full relative transition-transform active:scale-95"
        >
          <div className="relative">
            <LayoutGrid
              size={21}
              strokeWidth={isShopActive ? 2.2 : 1.7}
              className={isShopActive ? "text-[#5c2d76]" : "text-[#707070]"}
            />
          </div>
          <span
            className={`text-[11px] mt-0.5 ${
              isShopActive ? "text-[#5c2d76] font-semibold" : "text-[#707070] font-normal"
            }`}
          >
            {lang === "ar" ? "الفئات" : "Categories"}
          </span>
          {isShopActive && (
            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#5c2d76]"></span>
          )}
        </Link>
      </div>

      {/* 3. Tab 3: Bag with Cart Counter Bubble */}
      <div className="h-full flex items-center justify-center">
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center h-full w-full relative transition-transform active:scale-95 cursor-pointer"
          aria-label="Shopping Bag"
        >
          <div className="relative">
            <ShoppingBag
              size={21}
              strokeWidth={isCartActive ? 2.2 : 1.7}
              className={isCartActive ? "text-[#5c2d76]" : "text-[#707070]"}
            />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#5c2d76] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {itemCount}
              </span>
            )}
          </div>
          <span
            className={`text-[11px] mt-0.5 ${
              isCartActive ? "text-[#5c2d76] font-semibold" : "text-[#707070] font-normal"
            }`}
          >
            {lang === "ar" ? "الحقيبة" : "Bag"}
          </span>
          {isCartActive && (
            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#5c2d76]"></span>
          )}
        </button>
      </div>

      {/* 4. Tab 4: Account */}
      <div className="h-full flex items-center justify-center">
        <Link
          href={user ? "/profile" : "#"}
          onClick={handleAccountClick}
          className="flex flex-col items-center justify-center h-full w-full relative transition-transform active:scale-95"
        >
          <div className="relative">
            <User
              size={21}
              strokeWidth={isProfileActive ? 2.2 : 1.7}
              className={isProfileActive ? "text-[#5c2d76]" : "text-[#707070]"}
            />
          </div>
          <span
            className={`text-[11px] mt-0.5 ${
              isProfileActive ? "text-[#5c2d76] font-semibold" : "text-[#707070] font-normal"
            }`}
          >
            {lang === "ar" ? "حسابي" : "Account"}
          </span>
          {isProfileActive && (
            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#5c2d76]"></span>
          )}
        </Link>
      </div>
    </nav>
  );
}
