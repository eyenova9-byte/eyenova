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
          <div className="p-5 border-b border-[#e5e5e5] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-[#121212]" />
              <h3 className="font-normal text-[#121212] text-[16px] sm:text-[17px]">{t.yourCart}</h3>
              <span className="text-xs bg-[#f8edeb] text-[#121212] font-normal px-2 py-0.5 rounded-xs">
                {items.length}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#707070] hover:text-[#121212] transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Qatar Free Shipping Progress Bar */}
          <div className="p-4 bg-[#f8edeb] border-b border-[#e8dcd9]">
            <div className="flex items-center gap-2 text-xs font-normal text-[#121212] mb-1.5">
              <Truck size={15} className="text-[#186b2b]" />
              <span>
                {remainingForFreeShipping === 0
                  ? "🎉 You unlocked FREE Delivery anywhere in Qatar!"
                  : `Add ${remainingForFreeShipping.toFixed(0)} QAR more for FREE Delivery`}
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#e8dcd9] rounded-none overflow-hidden">
              <div
                className="h-full bg-[#186b2b] transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#707070]">
                <ShoppingBag size={44} className="mb-3 text-[#d2d2d2] stroke-1" />
                <p className="font-normal text-[14px] text-[#121212]">{t.emptyCart}</p>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-6 py-2.5 bg-[#121212] text-white text-[13px] font-medium tracking-wide uppercase hover:bg-[#2b2b2b] transition"
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
                    className="p-3.5 bg-white border border-[#e5e5e5] flex gap-3.5 relative group"
                  >
                    <img
                      src={item.image}
                      alt={item.titleEn}
                      className="w-16 h-16 object-contain border border-[#f0f0f0] shrink-0"
                    />

                    <div className="flex-1 min-w-0 pr-6">
                      <h4 className="text-[13px] font-normal text-[#121212] truncate">
                        {lang === "ar" ? item.titleAr : item.titleEn}
                      </h4>

                      {/* Contact Lens Power Config Display */}
                      {item.isContactLens && (
                        <div className="text-[12px] text-[#707070] mt-0.5 space-y-0.5">
                          {item.isPlano ? (
                            <span className="text-[#186b2b] font-normal">Plano 0.00 (Cosmetic)</span>
                          ) : (
                            <>
                              <div>
                                <span className="font-normal text-[#121212]">Right (OD):</span> {item.rightEyePower} SPH ({item.rightEyeBoxes} box)
                              </div>
                              {item.leftEyeBoxes ? (
                                <div>
                                  <span className="font-normal text-[#121212]">Left (OS):</span> {item.leftEyePower} SPH ({item.leftEyeBoxes} box)
                                </div>
                              ) : null}
                            </>
                          )}
                        </div>
                      )}

                      {/* Eyeglasses Lens Package Display */}
                      {item.lensNameEn && (
                        <div className="text-[12px] text-[#121212] mt-0.5">
                          + {item.lensNameEn} (+{item.lensPriceQar} QAR)
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#d2d2d2] bg-white h-8 px-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-xs text-[#121212] hover:text-[#707070]"
                          >
                            -
                          </button>
                          <span className="text-xs font-normal w-5 text-center text-[#121212]">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-xs text-[#121212] hover:text-[#707070]"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-[13px] font-normal text-[#121212]">
                          QAR {itemTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-3 right-3 text-[#a0a0a0] hover:text-[#121212] transition"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#e5e5e5] bg-white space-y-3">
              <div className="flex justify-between items-center text-[14px] text-[#121212]">
                <span>{t.subtotal}</span>
                <span className="text-[15px] font-normal">QAR {subtotalQar.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-[#707070]">
                <span>{t.deliveryFee}</span>
                <span className="text-[#186b2b]">
                  {remainingForFreeShipping === 0 ? t.freeDelivery : "15 QAR"}
                </span>
              </div>

              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full h-12 bg-[#121212] text-white font-medium text-[13px] uppercase tracking-wider hover:bg-[#2b2b2b] transition flex items-center justify-center gap-2 rounded-none"
              >
                <span>{t.proceedToCheckout}</span>
                {isRtl ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
