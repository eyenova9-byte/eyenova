"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Shield, Package, Layers, ShoppingBag, FileText, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

export default function AdminDashboardPage() {
  const { t } = useLanguage();

  return (
    <div className="py-10 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 block mb-1">
              Store Control Center
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900">
              {t.adminTitle}
            </h1>
          </div>
          <span className="text-xs bg-emerald-100 text-emerald-800 font-extrabold px-3 py-1 rounded-full border border-emerald-200">
            ● Retail POS & Website Connected
          </span>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-gray-500 uppercase">{t.totalRevenue}</span>
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <TrendingUp size={20} />
              </div>
            </div>
            <span className="text-2xl font-extrabold text-slate-900 block">48,250 QAR</span>
            <span className="text-[11px] text-emerald-600 font-bold">+18% from last month</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-gray-500 uppercase">{t.totalOrders}</span>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <ShoppingBag size={20} />
              </div>
            </div>
            <span className="text-2xl font-extrabold text-slate-900 block">342</span>
            <span className="text-[11px] text-blue-600 font-bold">24 orders today in Qatar</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-gray-500 uppercase">{t.pendingVerifications}</span>
              <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                <AlertTriangle size={20} />
              </div>
            </div>
            <span className="text-2xl font-extrabold text-slate-900 block">5 Orders</span>
            <span className="text-[11px] text-amber-600 font-bold">Requires optometrist approval</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-gray-500 uppercase">{t.lowStockAlerts}</span>
              <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                <Package size={20} />
              </div>
            </div>
            <span className="text-2xl font-extrabold text-slate-900 block">2 Products</span>
            <span className="text-[11px] text-purple-600 font-bold">Bella Diamond & Lensme Caffe</span>
          </div>
        </div>

        {/* Quick Action Navigation Grid */}
        <h3 className="font-extrabold text-slate-900 text-lg mb-4">
          Management Modules
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            href="/admin/products"
            className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-md transition group"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-105 transition">
              <Package size={24} />
            </div>
            <h4 className="font-extrabold text-slate-900 text-sm mb-1">
              {t.manageProducts}
            </h4>
            <p className="text-xs text-gray-500">
              Manage frames, contact lenses (Bella, Amara, Lensme), solutions & stock.
            </p>
          </Link>

          <Link
            href="/admin/categories"
            className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-md transition group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-105 transition">
              <Layers size={24} />
            </div>
            <h4 className="font-extrabold text-slate-900 text-sm mb-1">
              {t.manageCategories}
            </h4>
            <p className="text-xs text-gray-500">
              Add new brands, frame shapes, or color shades that populate storefront filters.
            </p>
          </Link>

          <Link
            href="/admin/orders"
            className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-md transition group"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-105 transition">
              <ShoppingBag size={24} />
            </div>
            <h4 className="font-extrabold text-slate-900 text-sm mb-1">
              {t.manageOrders}
            </h4>
            <p className="text-xs text-gray-500">
              View incoming Qatar orders, inspect submitted prescriptions & update delivery status.
            </p>
          </Link>

          <Link
            href="/admin/invoices"
            className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-md transition group"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-105 transition">
              <FileText size={24} />
            </div>
            <h4 className="font-extrabold text-slate-900 text-sm mb-1">
              {t.manageInvoices}
            </h4>
            <p className="text-xs text-gray-500">
              Generate & print official Qatar POS receipts with CR# and VAT headers.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
