"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { language, setLanguage } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#FAF4F2] text-[#2D2D2D] border-t border-[#EDE5E2] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        
        {/* ========================================================================= */}
        {/* Top Grid: Quick links, Contact Us, and Eyenk Logo (Screenshot 2) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* Column 1: Quick links */}
          <div>
            <h3 className="text-[16px] font-normal text-[#1e232d] mb-4">Quick links</h3>
            <ul className="space-y-2.5 text-[14px] text-gray-700">
              <li>
                <Link href="/shop" className="hover:text-black transition">
                  Search
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-black transition">
                  Terms of service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-black transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-black transition">
                  Refund policy
                </Link>
              </li>
              <li>
                <Link href="/delete-account" className="hover:text-black transition">
                  Delete My Account
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-black transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Contact Us */}
          <div>
            <h3 className="text-[16px] font-normal text-[#1e232d] mb-4">Contact Us</h3>
            <div className="space-y-3 text-[14px] text-gray-700">
              <p>
                Email:{" "}
                <a href="mailto:support@eyenk.com" className="hover:underline text-gray-800">
                  support@eyenk.com
                </a>
              </p>
              <p>
                Call/WhatsApp:{" "}
                <a
                  href="https://wa.me/97466921362"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-gray-800"
                >
                  +974 6692 1362
                </a>
              </p>
            </div>
          </div>

          {/* Column 3: Eyenk Logo & Arabic Title on Right */}
          <div className="flex md:justify-end items-start">
            <Link href="/" className="flex flex-col items-center group">
              <div className="w-16 h-9 flex items-center justify-center text-[#5c2d76]">
                <svg className="w-14 h-8" viewBox="0 0 100 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 22.5C18 7 42 2 50 2C58 2 82 7 95 22.5C82 38 58 43 50 43C42 43 18 38 5 22.5Z"
                    stroke="#5c2d76"
                    strokeWidth="3.2"
                    fill="none"
                  />
                  <circle cx="50" cy="22.5" r="11" stroke="#5c2d76" strokeWidth="3.2" fill="none" />
                  <circle cx="50" cy="22.5" r="5" fill="#5c2d76" />
                  <path d="M12 28C17 22 25 18 34 16" stroke="#5c2d76" strokeWidth="2.5" strokeDasharray="2 3" />
                  <path d="M66 16C75 18 83 22 88 28" stroke="#5c2d76" strokeWidth="2.5" strokeDasharray="2 3" />
                </svg>
              </div>
              <span className="text-[15px] font-semibold text-[#5c2d76] tracking-tight mt-0.5">
                Eyenk عينك
              </span>
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Subscribe to our emails + Social Icons (Screenshot 2 & 3) */}
        {/* ========================================================================= */}
        <div className="mt-12 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="w-full max-w-sm">
            <h4 className="text-[16px] font-normal text-[#1e232d] mb-3">Subscribe to our emails</h4>
            {subscribed ? (
              <p className="text-xs text-emerald-700 bg-emerald-50 py-2 px-3 border border-emerald-200">
                Thank you for subscribing to Eyenk updates!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="relative w-full">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full bg-transparent border border-gray-400 px-4 py-2.5 pr-10 text-[14px] text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-black rounded-none transition"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-0 top-0 bottom-0 px-3.5 flex items-center justify-center text-gray-800 hover:text-black transition"
                >
                  <span className="text-lg leading-none">→</span>
                </button>
              </form>
            )}
          </div>

          {/* Social Icons (Instagram, TikTok) */}
          <div className="flex items-center gap-4 text-gray-800">
            <a
              href="https://www.instagram.com/eyenk_qa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-1 hover:opacity-75 transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@eyenk_qa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="p-1 hover:opacity-75 transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.77 1.81-.02 3.32-1.5 3.37-3.31.05-3.88.02-7.77.03-11.66.01-2.12-.01-4.24.02-6.36z" />
              </svg>
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Bottom Row: Language Selector, Copyright & Payment Badges (Screenshot 3) */}
        {/* ========================================================================= */}
        <div className="mt-12 pt-6 border-t border-[#EDE5E2] flex flex-col md:flex-row items-start md:items-end justify-between gap-6 text-xs text-gray-700">
          {/* Language Selector + Copyright */}
          <div className="space-y-3">
            <div>
              <label htmlFor="footer-lang" className="block text-[13px] text-gray-600 mb-1">
                Language
              </label>
              <div className="relative inline-block">
                <select
                  id="footer-lang"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as "en" | "ar")}
                  className="appearance-none bg-transparent border border-gray-400 px-3 py-1.5 pr-8 text-[13px] text-gray-800 rounded-none focus:outline-none cursor-pointer"
                >
                  <option value="en">English</option>
                  <option value="ar">العربية</option>
                </select>
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-[10px]">
                  ▼
                </span>
              </div>
            </div>
            <p className="text-[13px] text-gray-600">
              © {new Date().getFullYear()}, Eyenk.com
            </p>
          </div>

          {/* Payment Method Badges from Screenshot 3 */}
          <div className="flex flex-wrap items-center gap-1.5">
            {/* AMEX */}
            <span className="inline-flex items-center justify-center bg-[#006FCF] text-white font-bold text-[9px] px-2 py-1 rounded-xs tracking-tighter shadow-2xs h-6 w-10">
              AMEX
            </span>

            {/* Apple Pay */}
            <span className="inline-flex items-center justify-center bg-black text-white font-medium text-[9px] px-2 py-1 rounded-xs tracking-tight shadow-2xs h-6 w-11">
              Pay
            </span>

            {/* QPay / NAPS Qatar */}
            <span className="inline-flex items-center justify-center bg-white text-[#8A1538] border border-gray-200 font-bold text-[8.5px] px-1.5 py-1 rounded-xs shadow-2xs h-6">
              QPay
            </span>

            {/* mada */}
            <span className="inline-flex items-center justify-center bg-[#005B94] text-[#00A859] bg-white border border-gray-200 font-bold text-[8.5px] px-1.5 py-1 rounded-xs shadow-2xs h-6">
              mada
            </span>

            {/* Mastercard */}
            <span className="inline-flex items-center justify-center bg-[#222] text-white px-1.5 py-1 rounded-xs shadow-2xs h-6 w-10">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EB001B] inline-block -mr-1 opacity-90"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#F79E1B] inline-block opacity-90"></span>
            </span>

            {/* Benefit / Fawry */}
            <span className="inline-flex items-center justify-center bg-white text-[#E41E26] border border-gray-200 font-bold text-[8px] px-1.5 py-1 rounded-xs shadow-2xs h-6">
              NAPS
            </span>

            {/* VISA */}
            <span className="inline-flex items-center justify-center bg-[#1A1F71] text-white font-extrabold italic text-[9px] px-2 py-1 rounded-xs tracking-tight shadow-2xs h-6 w-10">
              VISA
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
