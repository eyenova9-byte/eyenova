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
    <div className="py-10 sm:py-14 bg-white min-h-screen text-[#121212]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#f8edeb] text-[#121212] flex items-center justify-center text-lg font-normal">
            <User size={24} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-normal text-[#121212]">
              Welcome, Customer (+974 5512 3456)
            </h1>
            <p className="text-[13px] text-[#707070]">
              Manage your orders, optical prescriptions, and 1-click reorders.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#e5e5e5] mb-8 gap-8 text-[14px] font-normal">
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 transition border-b-2 cursor-pointer ${
              activeTab === "orders"
                ? "border-[#121212] text-[#121212] font-medium"
                : "border-transparent text-[#707070] hover:text-[#121212]"
            }`}
          >
            {t.myOrders}
          </button>
          <button
            onClick={() => setActiveTab("prescriptions")}
            className={`pb-3 transition border-b-2 cursor-pointer ${
              activeTab === "prescriptions"
                ? "border-[#121212] text-[#121212] font-medium"
                : "border-transparent text-[#707070] hover:text-[#121212]"
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
                className="bg-white p-6 border border-[#e5e5e5] space-y-4"
              >
                <div className="flex flex-wrap justify-between items-center border-b border-[#e5e5e5] pb-3 gap-2">
                  <div>
                    <span className="text-[14px] font-normal text-[#121212]">
                      {order.orderNumber}
                    </span>
                    <span className="text-[12px] text-[#707070] block">{order.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-normal text-[#186b2b] bg-[#f8edeb] px-3 py-0.5 border border-[#e8dcd9]">
                      ✓ {order.status}
                    </span>
                    <span className="text-[14px] font-normal text-[#121212]">
                      {order.totalQar} QAR
                    </span>
                  </div>
                </div>

                {/* Items in order */}
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.titleEn}
                        className="w-16 h-16 object-cover border border-[#e5e5e5]"
                      />
                      <div>
                        <h4 className="text-[13px] sm:text-[14px] font-normal text-[#121212]">{item.titleEn}</h4>
                        <span className="text-[12px] text-[#707070] font-normal block mt-0.5">
                          OD (Right): {item.rightPower} SPH | OS (Left): {item.leftPower} SPH
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleReorder(item)}
                      className="px-4 py-2 bg-[#121212] text-white text-[12px] uppercase tracking-[0.06em] font-medium hover:bg-black transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw size={13} />
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
              <h3 className="font-normal text-[#121212] text-[16px] sm:text-[18px]">
                Saved Optical Prescriptions
              </h3>
              <button className="px-4 py-2 bg-[#121212] text-white text-[12px] uppercase tracking-[0.06em] font-medium hover:bg-black flex items-center gap-1.5 cursor-pointer">
                <Plus size={15} />
                <span>{t.addPrescription}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {prescriptions.map((rx) => (
                <div
                  key={rx.id}
                  className="bg-white p-6 border border-[#e5e5e5] space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-2">
                    <span className="font-normal text-[#121212] text-[14px]">{rx.title}</span>
                    <span className="text-[11px] bg-[#f8edeb] text-[#121212] px-2 py-0.5 border border-[#e8dcd9]">
                      Verified
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[12px]">
                    <div className="p-3 bg-[#fafafa] border border-[#e5e5e5]">
                      <span className="font-normal text-[#707070] block mb-1">Right Eye (OD)</span>
                      <div className="font-normal text-[#121212]">SPH: {rx.odSph}</div>
                      {rx.odAdd && <div className="text-[#707070]">ADD: {rx.odAdd}</div>}
                    </div>

                    <div className="p-3 bg-[#fafafa] border border-[#e5e5e5]">
                      <span className="font-normal text-[#707070] block mb-1">Left Eye (OS)</span>
                      <div className="font-normal text-[#121212]">SPH: {rx.osSph}</div>
                      {rx.osAdd && <div className="text-[#707070]">ADD: {rx.osAdd}</div>}
                    </div>
                  </div>

                  {rx.pdSingle && (
                    <div className="text-[12px] text-[#707070] pt-1 font-normal">
                      Pupillary Distance (PD): <span className="font-medium text-[#121212]">{rx.pdSingle} mm</span>
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
