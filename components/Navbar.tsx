"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { ShoppingBag, Globe, Search, User, Shield, Menu, X, Phone, Eye } from "lucide-react";

export function Navbar() {
  const { lang, setLang, t, isRtl } = useLanguage();
  const { itemCount, setIsCartOpen } = useCart();
  const { user, setIsAuthModalOpen } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      {/* Top Notification Bar */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 flex flex-wrap justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-emerald-400">{t.sameDayDelivery}</span>
          <span className="hidden sm:inline text-gray-400">|</span>
          <span className="hidden sm:inline">{t.freeShippingNotice}</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://wa.me/97455123456"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-emerald-400 hover:underline font-medium"
          >
            <Phone size={13} />
            <span>{t.whatsappSupport}</span>
          </a>
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="flex items-center gap-1 hover:text-emerald-400 transition font-bold px-2 py-0.5 rounded bg-slate-800 border border-slate-700"
          >
            <Globe size={13} />
            <span>{lang === "en" ? "🇶🇦 العربية" : "🇬🇧 English"}</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-gray-700 hover:text-slate-900"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-indigo-900 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition">
            <Eye size={22} className="text-emerald-400" />
          </div>
          <div>
            <span className="text-2xl font-extrabold tracking-tight text-slate-900">
              {t.siteName}
            </span>
            <span className="hidden sm:block text-[10px] uppercase font-bold tracking-widest text-slate-500">
              Qatar Optical & Lenses
            </span>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md relative mx-4">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition"
          />
          <Search size={18} className="absolute left-3.5 top-2.5 text-gray-400" />
        </div>

        {/* Actions (VTO, Profile, Admin, Cart) */}
        <div className="flex items-center gap-3">
          <Link
            href="/virtual-try-on"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-200 rounded-full text-xs font-bold hover:shadow-sm transition"
          >
            <Eye size={15} />
            <span>{t.virtualTryOn}</span>
          </Link>

          {user ? (
            <Link
              href="/profile"
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-slate-800 bg-gray-100 rounded-full hover:bg-gray-200 transition"
              title={user.phone}
            >
              <User size={16} className="text-emerald-600" />
              <span className="hidden sm:inline text-[11px] font-mono">{user.phone}</span>
            </Link>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-3 py-1.5 bg-slate-900 text-white rounded-full text-xs font-bold hover:bg-slate-800 transition flex items-center gap-1"
            >
              <User size={14} />
              <span>Login</span>
            </button>
          )}

          <Link
            href="/admin"
            className="hidden lg:flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            title={t.adminDashboard}
          >
            <Shield size={14} className="text-slate-600" />
            <span>Admin</span>
          </Link>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition shadow-md flex items-center justify-center"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Primary Category Links Bar */}
      <nav className="hidden lg:block border-t border-gray-100 bg-gray-50/50 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-8 text-sm font-semibold text-gray-700">
          <Link href="/shop?category=colored-lenses" className="hover:text-slate-900 transition">
            {t.coloredLenses}
          </Link>
          <Link href="/shop?category=medical-lenses" className="hover:text-slate-900 transition">
            {t.medicalLenses}
          </Link>
          <Link href="/shop?category=solutions-drops" className="hover:text-slate-900 transition">
            {t.solutions}
          </Link>
          <Link href="/shop?category=eyeglasses" className="hover:text-slate-900 transition">
            {t.eyeglasses}
          </Link>
          <Link href="/shop?category=sunglasses" className="hover:text-slate-900 transition">
            {t.sunglasses}
          </Link>
          <Link href="/shop" className="text-indigo-600 hover:text-indigo-800 transition font-bold">
            {t.allProducts} →
          </Link>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="relative mb-3">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-full"
            />
            <Search size={18} className="absolute left-3.5 top-2.5 text-gray-400" />
          </div>
          <div className="flex flex-col space-y-2 text-sm font-semibold text-gray-800">
            <Link
              href="/shop?category=colored-lenses"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-gray-100"
            >
              {t.coloredLenses}
            </Link>
            <Link
              href="/shop?category=medical-lenses"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-gray-100"
            >
              {t.medicalLenses}
            </Link>
            <Link
              href="/shop?category=solutions-drops"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-gray-100"
            >
              {t.solutions}
            </Link>
            <Link
              href="/shop?category=eyeglasses"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-gray-100"
            >
              {t.eyeglasses}
            </Link>
            <Link
              href="/shop?category=sunglasses"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-gray-100"
            >
              {t.sunglasses}
            </Link>
            <Link
              href="/virtual-try-on"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-indigo-600 font-bold"
            >
              {t.virtualTryOn}
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-slate-600 font-medium"
            >
              Admin Dashboard Suite
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
