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
      className="bottomTabs fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 lg:hidden h-[62px] pb-[env(safe-area-inset-bottom)] grid grid-cols-4 items-center select-none shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
      id="bottomTb"
      aria-label="Mobile Navigation Bar"
    >
      {/* 1. Tab 1: Home on index, or Back on inner pages */}
      <div className="h-full flex items-center justify-center">
        {isHome ? (
          <Link
            href="/"
            className={`flex flex-col items-center justify-center h-full w-full py-1 transition-colors ${
              isHome ? "text-slate-950 font-bold" : "text-slate-500 hover:text-slate-800 font-medium"
            }`}
          >
            <div className={`p-1 rounded-full transition ${isHome ? "bg-sky-50 text-sky-600" : ""}`}>
              <Home size={19} strokeWidth={isHome ? 2.2 : 1.8} />
            </div>
            <span className="text-[10.5px] mt-0.5 leading-none">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </span>
          </Link>
        ) : (
          <button
            type="button"
            id="go-back-btn"
            onClick={handleBack}
            className="flex flex-col items-center justify-center h-full w-full py-1 transition-colors text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
          >
            <div className="p-1 rounded-full">
              <ArrowLeft size={19} strokeWidth={1.8} />
            </div>
            <span className="text-[10.5px] mt-0.5 leading-none">
              {lang === "ar" ? "رجوع" : "Back"}
            </span>
          </button>
        )}
      </div>

      {/* 2. Tab 2: Categories / Shop */}
      <div className="h-full flex items-center justify-center">
        <Link
          href="/shop"
          className={`flex flex-col items-center justify-center h-full w-full py-1 transition-colors ${
            isShopActive ? "text-slate-950 font-bold" : "text-slate-500 hover:text-slate-800 font-medium"
          }`}
        >
          <div className={`p-1 rounded-full transition ${isShopActive ? "bg-sky-50 text-sky-600" : ""}`}>
            <LayoutGrid size={19} strokeWidth={isShopActive ? 2.2 : 1.8} />
          </div>
          <span className="text-[10.5px] mt-0.5 leading-none">
            {lang === "ar" ? "المتجر" : "Shop"}
          </span>
        </Link>
      </div>

      {/* 3. Tab 3: Bag with Cart Counter Bubble */}
      <div className="h-full flex items-center justify-center">
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className={`flex flex-col items-center justify-center h-full w-full py-1 transition-colors relative cursor-pointer ${
            isCartActive ? "text-slate-950 font-bold" : "text-slate-500 hover:text-slate-800 font-medium"
          }`}
          aria-label="Shopping Bag"
        >
          <div className="relative p-1">
            <ShoppingBag size={19} strokeWidth={isCartActive ? 2.2 : 1.8} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-slate-950 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                <span className="counter">{itemCount}</span>
              </span>
            )}
          </div>
          <span className="text-[10.5px] mt-0.5 leading-none">
            {lang === "ar" ? "الحقيبة" : "Bag"}
          </span>
        </button>
      </div>

      {/* 4. Tab 4: Account */}
      <div className="h-full flex items-center justify-center">
        <Link
          href={user ? "/profile" : "#"}
          onClick={handleAccountClick}
          className={`flex flex-col items-center justify-center h-full w-full py-1 transition-colors ${
            isProfileActive ? "text-slate-950 font-bold" : "text-slate-500 hover:text-slate-800 font-medium"
          }`}
        >
          <div className={`p-1 rounded-full transition ${isProfileActive ? "bg-sky-50 text-sky-600" : ""}`}>
            <User size={19} strokeWidth={isProfileActive ? 2.2 : 1.8} />
          </div>
          <span className="text-[10.5px] mt-0.5 leading-none">
            {lang === "ar" ? "حسابي" : "Account"}
          </span>
        </Link>
      </div>
    </nav>
  );
}
