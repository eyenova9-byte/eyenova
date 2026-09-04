"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { X, Trash2, ShoppingBag, ArrowRight, ArrowLeft, Truck } from "lucide-react";

export function CartDrawer() {
  const { t, isRtl, lang } = useLanguage();
  const { items, removeItem, updateQuantity, isCartOpen, setIsCartOpen, subtotalQar } = useCart();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 250;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotalQar);
  const freeShippingProgress = Math.min(100, (subtotalQar / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className={`fixed inset-y-0 ${isRtl ? "left-0" : "right-0"} max-w-full flex pl-10`}>
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-slate-900" />
              <h3 className="font-extrabold text-slate-900 text-base">{t.yourCart}</h3>
              <span className="text-xs bg-slate-200 text-slate-800 font-bold px-2 py-0.5 rounded-full">
                {items.length}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-gray-400 hover:text-slate-900 rounded-full hover:bg-gray-200 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Qatar Free Shipping Progress Bar */}
          <div className="p-4 bg-emerald-50/70 border-b border-emerald-100">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 mb-1.5">
              <Truck size={16} className="text-emerald-600" />
              <span>
                {remainingForFreeShipping === 0
                  ? "🎉 You unlocked FREE Delivery anywhere in Qatar!"
                  : `Add ${remainingForFreeShipping.toFixed(0)} QAR more for FREE Delivery`}
              </span>
            </div>
            <div className="w-full h-2 bg-emerald-200/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
                <ShoppingBag size={48} className="mb-3 text-gray-300 stroke-1" />
                <p className="font-semibold text-sm text-gray-600">{t.emptyCart}</p>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl shadow hover:bg-slate-800 transition"
                >
                  {t.shopNow}
                </Link>
              </div>
            ) : (
              items.map((item) => {
                const itemTotal = (item.unitPriceQar + (item.lensPriceQar || 0)) * item.quantity;
                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex gap-4 relative group"
                  >
                    <img
                      src={item.image}
                      alt={item.titleEn}
                      className="w-16 h-16 rounded-xl object-cover border border-gray-200 shrink-0"
                    />

                    <div className="flex-1 min-w-0 pr-6">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {lang === "ar" ? item.titleAr : item.titleEn}
                      </h4>

                      {/* Contact Lens Power Config Display */}
                      {item.isContactLens && (
                        <div className="text-[11px] text-gray-600 mt-1 space-y-0.5 font-medium">
                          {item.isPlano ? (
                            <span className="text-emerald-600 font-bold">Plano 0.00 (Cosmetic)</span>
                          ) : (
                            <>
                              <div>
                                <span className="font-bold text-slate-800">Right (OD):</span> {item.rightEyePower} SPH ({item.rightEyeBoxes} box)
                              </div>
                              {item.leftEyeBoxes ? (
                                <div>
                                  <span className="font-bold text-slate-800">Left (OS):</span> {item.leftEyePower} SPH ({item.leftEyeBoxes} box)
                                </div>
                              ) : null}
                            </>
                          )}
                        </div>
                      )}

                      {/* Eyeglasses Lens Package Display */}
                      {item.lensNameEn && (
                        <div className="text-[11px] text-indigo-600 font-bold mt-1">
                          + {item.lensNameEn} (+{item.lensPriceQar} QAR)
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 border border-gray-200 bg-white rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-xs font-extrabold text-slate-900">
                          {itemTotal} QAR
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-5 border-t border-gray-100 bg-gray-50/50 space-y-3">
              <div className="flex justify-between items-center text-sm font-bold text-slate-900">
                <span>{t.subtotal}</span>
                <span className="text-base">{subtotalQar} QAR</span>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{t.deliveryFee}</span>
                <span className="font-semibold text-emerald-600">
                  {remainingForFreeShipping === 0 ? t.freeDelivery : "15 QAR"}
                </span>
              </div>

              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3.5 bg-slate-900 text-white font-extrabold text-xs rounded-2xl shadow-lg hover:bg-slate-800 transition flex items-center justify-center gap-2"
              >
                <span>{t.proceedToCheckout}</span>
                {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
