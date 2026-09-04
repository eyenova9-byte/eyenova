"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { User, Eye, RefreshCw, Clock, Plus, ShieldCheck, CheckCircle2, Upload } from "lucide-react";

export default function ProfilePage() {
  const { t, isRtl } = useLanguage();
  const { addItem } = useCart();
  const [activeTab, setActiveTab] = useState<"orders" | "prescriptions" | "addresses">("orders");

  // Sample Prescriptions Vault
  const [prescriptions, setPrescriptions] = useState([
    {
      id: "rx1",
      title: "Daily Contact Lens Power",
      odSph: "-2.50",
      osSph: "-3.00",
      pdSingle: "63.0",
      baseCurve: "8.6",
      diameter: "14.2",
    },
    {
      id: "rx2",
      title: "Reading Specs (Work)",
      odSph: "+1.75",
      osSph: "+1.75",
      pdSingle: "62.0",
      odAdd: "+2.00",
      osAdd: "+2.00",
    },
  ]);

  const samplePastOrders = [
    {
      id: "ord-1",
      orderNumber: "EN-QAT-984210",
      date: "2026-08-28",
      status: "Delivered in Doha",
      totalQar: 275,
      items: [
        {
          titleEn: "Bella Diamond Gray Shadow Contact Lenses",
          rightPower: "-2.50",
          leftPower: "-3.00",
          image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop",
          priceQar: 130,
          quantity: 2,
        },
      ],
    },
  ];

  const handleReorder = (orderItem: any) => {
    addItem({
      productId: "p1",
      titleEn: orderItem.titleEn,
      titleAr: orderItem.titleEn,
      sku: "BEL-DIA-GRY-01",
      image: orderItem.image,
      unitPriceQar: orderItem.priceQar,
      quantity: orderItem.quantity,
      isContactLens: true,
      rightEyePower: orderItem.rightPower,
      rightEyeBoxes: 1,
      leftEyePower: orderItem.leftPower,
      leftEyeBoxes: 1,
    });
  };

  return (
    <div className="py-12 bg-gray-50/50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 text-emerald-400 flex items-center justify-center text-xl font-bold shadow-md">
            <User size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Welcome, Customer (+974 5512 3456)
            </h1>
            <p className="text-xs text-gray-500">
              Manage your orders, optical prescriptions, and 1-click reorders.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-8 gap-6 text-sm font-extrabold">
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 transition border-b-2 ${
              activeTab === "orders"
                ? "border-slate-900 text-slate-900"
                : "border-transparent text-gray-400 hover:text-slate-700"
            }`}
          >
            {t.myOrders}
          </button>
          <button
            onClick={() => setActiveTab("prescriptions")}
            className={`pb-3 transition border-b-2 ${
              activeTab === "prescriptions"
                ? "border-slate-900 text-slate-900"
                : "border-transparent text-gray-400 hover:text-slate-700"
            }`}
          >
            {t.prescriptionVault}
          </button>
        </div>

        {/* Tab 1: Orders & 1-Click Reorder */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            {samplePastOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-4"
              >
                <div className="flex flex-wrap justify-between items-center border-b border-gray-100 pb-3 gap-2">
                  <div>
                    <span className="text-xs font-extrabold text-slate-900">
                      {order.orderNumber}
                    </span>
                    <span className="text-xs text-gray-400 block">{order.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                      ✓ {order.status}
                    </span>
                    <span className="text-sm font-extrabold text-slate-900">
                      {order.totalQar} QAR
                    </span>
                  </div>
                </div>

                {/* Items in order */}
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.titleEn}
                        className="w-14 h-14 rounded-xl object-cover border border-gray-100"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{item.titleEn}</h4>
                        <span className="text-[11px] text-gray-500 font-medium block">
                          OD (Right): {item.rightPower} SPH | OS (Left): {item.leftPower} SPH
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleReorder(item)}
                      className="px-4 py-2 bg-slate-900 text-white text-xs font-extrabold rounded-xl hover:bg-slate-800 transition flex items-center gap-1.5 shadow"
                    >
                      <RefreshCw size={14} />
                      <span>{t.reorder}</span>
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Prescription Vault */}
        {activeTab === "prescriptions" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-slate-900 text-base">
                Saved Optical Prescriptions
              </h3>
              <button className="px-4 py-2 bg-slate-900 text-white text-xs font-extrabold rounded-xl flex items-center gap-1.5">
                <Plus size={16} />
                <span>{t.addPrescription}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {prescriptions.map((rx) => (
                <div
                  key={rx.id}
                  className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="font-extrabold text-slate-900 text-xs">{rx.title}</span>
                    <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-md">
                      Verified
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <span className="font-bold text-gray-500 block mb-1">Right Eye (OD)</span>
                      <div className="font-bold text-slate-900">SPH: {rx.odSph}</div>
                      {rx.odAdd && <div className="text-gray-500">ADD: {rx.odAdd}</div>}
                    </div>

                    <div className="p-3 bg-gray-50 rounded-xl">
                      <span className="font-bold text-gray-500 block mb-1">Left Eye (OS)</span>
                      <div className="font-bold text-slate-900">SPH: {rx.osSph}</div>
                      {rx.osAdd && <div className="text-gray-500">ADD: {rx.osAdd}</div>}
                    </div>
                  </div>

                  {rx.pdSingle && (
                    <div className="text-xs text-gray-500 pt-1 font-medium">
                      Pupillary Distance (PD): <span className="font-extrabold text-slate-900">{rx.pdSingle} mm</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
