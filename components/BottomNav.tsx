"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import {
  ArrowLeft,
  Home,
  LayoutGrid,
  ShoppingBag,
  User,
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
      className="bottomTabs fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#dbdbdb] lg:hidden h-[58px] grid grid-cols-4 items-center select-none shadow-[0_-2px_10px_rgba(0,0,0,0.03)]"
      id="bottomTb"
      aria-label="Mobile Navigation Bar"
    >
      {/* 1. Tab 1: Home on index, or Back on inner pages (Exact Eyenk behavior) */}
      <div className="tabsHolder h-full">
        {isHome ? (
          <Link
            href="/"
            className={`flex flex-col items-center justify-center h-full w-full transition-colors ${
              isHome ? "bg-[#f8edeb]" : "hover:bg-[#fafafa]"
            }`}
          >
            <Home size={20} strokeWidth={1.6} className="text-[#121212]" />
            <span className="text-[11px] font-normal text-[#121212] mt-0.5">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </span>
          </Link>
        ) : (
          <button
            type="button"
            id="go-back-btn"
            onClick={handleBack}
            className="go-back-btn flex flex-col items-center justify-center h-full w-full transition-colors hover:bg-[#fafafa] cursor-pointer"
          >
            <ArrowLeft size={20} strokeWidth={1.6} className="text-[#121212]" />
            <span className="text-[11px] font-normal text-[#121212] mt-0.5">
              {lang === "ar" ? "رجوع" : "Back"}
            </span>
          </button>
        )}
      </div>

      {/* 2. Tab 2: Categories (Links to /shop collection catalog) */}
      <div className="tabsHolder h-full">
        <Link
          href="/shop"
          className={`flex flex-col items-center justify-center h-full w-full transition-colors ${
            isShopActive ? "bg-[#f8edeb]" : "hover:bg-[#fafafa]"
          }`}
        >
          <LayoutGrid size={20} strokeWidth={1.6} className="text-[#121212]" />
          <span className="text-[11px] font-normal text-[#121212] mt-0.5">
            {lang === "ar" ? "الفئات" : "Categories"}
          </span>
        </Link>
      </div>

      {/* 3. Tab 3: Bag with Cart Counter Bubble */}
      <div className="tabsHolder h-full">
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className={`btm-cart--count flex flex-col items-center justify-center h-full w-full transition-colors relative cursor-pointer ${
            isCartActive ? "bg-[#f8edeb]" : "hover:bg-[#fafafa]"
          }`}
          aria-label="Shopping Bag"
        >
          <div className="relative">
            <ShoppingBag size={20} strokeWidth={1.6} className="text-[#121212]" />
            {itemCount > 0 && (
              <span className="cart-count-bubble absolute -top-1.5 -right-2 bg-[#121212] text-white text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                <span className="counter">{itemCount}</span>
              </span>
            )}
          </div>
          <span className="navBag text-[11px] font-normal text-[#121212] mt-0.5">
            {lang === "ar" ? "الحقيبة" : "Bag"}
          </span>
        </button>
      </div>

      {/* 4. Tab 4: Account */}
      <div className="tabsHolder h-full">
        <Link
          href={user ? "/profile" : "#"}
          onClick={handleAccountClick}
          className={`flex flex-col items-center justify-center h-full w-full transition-colors ${
            isProfileActive ? "bg-[#f8edeb]" : "hover:bg-[#fafafa]"
          }`}
        >
          <User size={20} strokeWidth={1.6} className="text-[#121212]" />
          <span className="navAccount text-[11px] font-normal text-[#121212] mt-0.5">
            {lang === "ar" ? "حسابي" : "Account"}
          </span>
        </Link>
      </div>
    </nav>
  );
}
