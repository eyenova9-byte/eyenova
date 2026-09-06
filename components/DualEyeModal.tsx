"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { MockProduct } from "@/lib/mockData";
import { X, Check, ShoppingBag, Eye, Info } from "lucide-react";

type DualEyeModalProps = {
  product: MockProduct | null;
  isOpen: boolean;
  onClose: () => void;
};

export function DualEyeModal({ product, isOpen, onClose }: DualEyeModalProps) {
  const { t, isRtl, lang } = useLanguage();
  const { addItem } = useCart();

  const [isPlano, setIsPlano] = useState(false);
  const [rightPower, setRightPower] = useState("-1.00");
  const [rightBoxes, setRightBoxes] = useState(1);
  const [leftPower, setLeftPower] = useState("-1.00");
  const [leftBoxes, setLeftBoxes] = useState(1);

  if (!isOpen || !product) return null;

  const powers = product.availablePowers || [
    "0.00", "-0.50", "-0.75", "-1.00", "-1.25", "-1.50", "-1.75", "-2.00",
    "-2.25", "-2.50", "-2.75", "-3.00", "-3.50", "-4.00", "-4.50", "-5.00", "-6.00"
  ];

  const itemPrice = product.salePriceQar || product.basePriceQar;
  const totalBoxes = isPlano ? rightBoxes : rightBoxes + leftBoxes;
  const totalPriceQar = itemPrice * totalBoxes;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      titleEn: product.titleEn,
      titleAr: product.titleAr,
      sku: product.sku,
      image: product.images[0]?.imageUrl || "",
      unitPriceQar: itemPrice,
      quantity: totalBoxes,
      isContactLens: true,
      isPlano,
      rightEyePower: isPlano ? "0.00" : rightPower,
      rightEyeBoxes: rightBoxes,
      leftEyePower: isPlano ? "0.00" : leftPower,
      leftEyeBoxes: isPlano ? 0 : leftBoxes,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-8 shadow-2xl border border-gray-100 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-slate-900 rounded-full hover:bg-gray-100 transition"
        >
          <X size={20} />
        </button>

        {/* Product Title Header */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={product.images[0]?.imageUrl}
            alt={product.titleEn}
            className="w-16 h-16 rounded-2xl object-cover border border-gray-100 shadow-sm"
          />
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">
              {product.brandName} • {product.lensDuration}
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              {lang === "ar" ? product.titleAr : product.titleEn}
            </h3>
            <span className="text-sm font-semibold text-slate-700">
              {itemPrice} QAR <span className="text-xs text-gray-400">{t.perBox}</span>
            </span>
          </div>
        </div>

        {/* Plano vs Prescription Toggle */}
        <div className="mb-6">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">
            Select Purpose
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setIsPlano(false)}
              className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                !isPlano
                  ? "border-slate-900 bg-slate-900 text-white shadow-md"
                  : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Eye size={16} />
              <span>{t.prescriptionWithPower}</span>
            </button>
            <button
              type="button"
              onClick={() => setIsPlano(true)}
              className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                isPlano
                  ? "border-slate-900 bg-slate-900 text-white shadow-md"
                  : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Check size={16} />
              <span>{t.planoCosmetic}</span>
            </button>
          </div>
        </div>

        {/* Informational Banner */}
        {!isPlano && (
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-3 mb-6 flex items-start gap-2.5 text-xs text-indigo-900">
            <Info size={16} className="text-indigo-600 shrink-0 mt-0.5" />
            <span>{t.differentPowersNote}</span>
          </div>
        )}

        {/* Dual Eye Power Selector Cards (EyeNova signature) */}
        {!isPlano ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Right Eye (OD) */}
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-900">
                  👁️ {t.rightEye}
                </span>
                <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                  OD
                </span>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-500 block mb-1">
                  {t.powerSph}
                </label>
                <select
                  value={rightPower}
                  onChange={(e) => setRightPower(e.target.value)}
                  className="w-full text-xs font-bold p-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none"
                >
                  {powers.map((p) => (
                    <option key={`r-${p}`} value={p}>
                      {p === "0.00" ? "0.00 (Plano)" : `${p} SPH`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-500 block mb-1">
                  {t.boxQuantity}
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setRightBoxes(Math.max(1, rightBoxes - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-gray-300 text-slate-900 font-bold text-sm hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="text-xs font-extrabold w-6 text-center">{rightBoxes}</span>
                  <button
                    type="button"
                    onClick={() => setRightBoxes(rightBoxes + 1)}
                    className="w-8 h-8 rounded-lg bg-white border border-gray-300 text-slate-900 font-bold text-sm hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Left Eye (OS) */}
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-900">
                  👁️ {t.leftEye}
                </span>
                <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                  OS
                </span>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-500 block mb-1">
                  {t.powerSph}
                </label>
                <select
                  value={leftPower}
                  onChange={(e) => setLeftPower(e.target.value)}
                  className="w-full text-xs font-bold p-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none"
                >
                  {powers.map((p) => (
                    <option key={`l-${p}`} value={p}>
                      {p === "0.00" ? "0.00 (Plano)" : `${p} SPH`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-500 block mb-1">
                  {t.boxQuantity}
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setLeftBoxes(Math.max(1, leftBoxes - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-gray-300 text-slate-900 font-bold text-sm hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="text-xs font-extrabold w-6 text-center">{leftBoxes}</span>
                  <button
                    type="button"
                    onClick={() => setLeftBoxes(leftBoxes + 1)}
                    className="w-8 h-8 rounded-lg bg-white border border-gray-300 text-slate-900 font-bold text-sm hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 mb-6 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">
              Quantity ({t.boxQuantity})
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setRightBoxes(Math.max(1, rightBoxes - 1))}
                className="w-9 h-9 rounded-xl bg-white border border-gray-300 font-bold text-slate-900"
              >
                -
              </button>
              <span className="text-sm font-extrabold">{rightBoxes}</span>
              <button
                type="button"
                onClick={() => setRightBoxes(rightBoxes + 1)}
                className="w-9 h-9 rounded-xl bg-white border border-gray-300 font-bold text-slate-900"
              >
                +
              </button>
            </div>
          </div>
        )}

        {/* Footer Summary & Add to Cart */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-xs text-gray-500 block">{t.totalPrice} ({totalBoxes} boxes)</span>
            <span className="text-xl font-extrabold text-slate-900">{totalPriceQar} QAR</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="px-6 py-3.5 bg-slate-900 text-white text-xs font-extrabold rounded-2xl hover:bg-slate-800 transition shadow-lg flex items-center gap-2"
          >
            <ShoppingBag size={16} />
            <span>{t.addToCart}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
