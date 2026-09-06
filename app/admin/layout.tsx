"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import {
  ShieldCheck,
  Lock,
  KeyRound,
  LogOut,
  User,
  Store,
  FileText,
  Package,
  Layers,
  ShoppingBag,
  ArrowRight,
  Delete,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pin, setPin] = useState("");
  const [username, setUsername] = useState("admin");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);

  useEffect(() => {
    try {
      const session = sessionStorage.getItem("eyenova_admin_session");
      if (session) {
        const parsed = JSON.parse(session);
        setAdminUser(parsed);
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error("Failed to read admin session", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleKeypadPress = (digit: string) => {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      if (newPin.length === 4) {
        performLogin(newPin);
      }
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
    setError("");
  };

  const performLogin = async (pinToVerify: string) => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          pinCode: pinToVerify,
        }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setAdminUser(data.user);
        setIsAuthenticated(true);
        sessionStorage.setItem("eyenova_admin_session", JSON.stringify(data.user));
        if (data.token) {
          sessionStorage.setItem("eyenova_admin_token", data.token);
        }
      } else {
        setError(data.error || "Incorrect PIN code. Try again.");
        setPin("");
      }
    } catch {
      setError("Network error. Please try again.");
      setPin("");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("eyenova_admin_session");
    sessionStorage.removeItem("eyenova_admin_token");
    setIsAuthenticated(false);
    setAdminUser(null);
    setPin("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF5F2] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#5c2d76] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // 1. PIN Lock Screen Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FAF5F2] via-[#F5EBE6] to-white flex flex-col items-center justify-center p-4 font-sans select-none">
        <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl border border-[#EBE0DA] p-6 sm:p-8 text-center animate-fade-in">
          {/* Logo & Shield Header */}
          <div className="flex flex-col items-center mb-6">
            <BrandLogo size="md" />
            <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5F2] border border-[#E8DED8] text-[12px] font-medium text-[#5c2d76]">
              <ShieldCheck size={14} />
              <span>Admin Access Only</span>
            </div>
            <h2 className="text-xl font-semibold text-[#121212] mt-3">Administrator Access</h2>
            <p className="text-xs text-[#707070] mt-1">
              Enter your 4-digit security PIN to access the store management portal
            </p>
          </div>

          <div className="text-[11px] text-[#707070] mb-3 font-mono">
            Access: <span className="text-[#121212] font-semibold">admin@eyenova.com.qa</span>
          </div>

          {/* PIN Dots Display */}
          <div className="flex justify-center items-center gap-3 my-3">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                  pin.length > idx
                    ? "bg-[#5c2d76] border-[#5c2d76] scale-110"
                    : "bg-white border-[#D5C7BF]"
                }`}
              />
            ))}
          </div>

          {error && (
            <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 py-1.5 px-3 rounded-lg mb-3 animate-shake">
              {error}
            </p>
          )}

          {/* Quick Keypad (POS Style) */}
          <div className="grid grid-cols-3 gap-2.5 max-w-[260px] mx-auto my-2">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
              <button
                key={digit}
                type="button"
                disabled={submitting}
                onClick={() => handleKeypadPress(digit)}
                className="h-13 rounded-2xl bg-[#FAF5F2] hover:bg-[#F3EBE7] active:bg-[#EBE0DA] text-[#121212] text-xl font-semibold transition-all cursor-pointer border border-[#E8DED8] shadow-2xs hover:scale-105 active:scale-95"
              >
                {digit}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setPin("");
                setError("");
              }}
              className="h-13 rounded-2xl text-xs font-medium text-[#707070] hover:bg-[#FAF5F2] transition-colors cursor-pointer"
            >
              Clear
            </button>
            <button
              type="button"
              disabled={submitting}
              onClick={() => handleKeypadPress("0")}
              className="h-13 rounded-2xl bg-[#FAF5F2] hover:bg-[#F3EBE7] active:bg-[#EBE0DA] text-[#121212] text-xl font-semibold transition-all cursor-pointer border border-[#E8DED8] shadow-2xs hover:scale-105 active:scale-95"
            >
              0
            </button>
            <button
              type="button"
              onClick={handleBackspace}
              className="h-13 rounded-2xl text-[#121212] hover:bg-[#FAF5F2] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Backspace"
            >
              <Delete size={20} className="text-[#707070]" />
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-[#EBE0DA] flex items-center justify-between text-xs text-[#707070]">
            <Link href="/" className="hover:text-[#5c2d76] transition-colors">
              ← Return to Store
            </Link>
            <span className="font-mono text-[11px] bg-gray-100 px-2 py-0.5 rounded text-gray-500">
              Default PIN: 1234
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 2. Authenticated Admin Wrapper
  return (
    <div className="min-h-screen bg-gray-50/60 font-sans">
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E5E5E5] px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-6">
          <BrandLogo size="sm" />
          <div className="hidden md:flex items-center gap-1 text-xs font-medium text-[#707070]">
            <Link
              href="/admin"
              className="px-3 py-1.5 rounded-lg hover:text-[#121212] hover:bg-[#FAF5F2] transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/products"
              className="px-3 py-1.5 rounded-lg hover:text-[#121212] hover:bg-[#FAF5F2] transition-colors"
            >
              Products & Multi-Store Stock
            </Link>
            <Link
              href="/admin/invoices"
              className="px-3 py-1.5 rounded-lg hover:text-[#121212] hover:bg-[#FAF5F2] transition-colors"
            >
              POS Invoices
            </Link>
            <Link
              href="/admin/orders"
              className="px-3 py-1.5 rounded-lg hover:text-[#121212] hover:bg-[#FAF5F2] transition-colors"
            >
              Customer Orders
            </Link>
          </div>
        </div>

        {/* User Info & Logout Button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#FAF5F2] border border-[#E8DED8] px-3 py-1 rounded-full text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-medium text-[#121212]">{adminUser?.email || adminUser?.fullName || "Admin"}</span>
            <span className="text-[#707070] hidden sm:inline">({adminUser?.role})</span>
          </div>
          <button
            onClick={handleLogout}
            title="Lock & Logout"
            className="p-2 text-[#707070] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            aria-label="Logout"
          >
            <LogOut size={17} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main>{children}</main>
    </div>
  );
}
