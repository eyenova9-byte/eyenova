"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { MockProduct } from "@/lib/mockData";
import { DualEyeModal } from "@/components/DualEyeModal";
import { VirtualTryOnModal } from "@/components/VirtualTryOnModal";
import { ShoppingBag, Eye, Sparkles } from "lucide-react";

type ProductCardProps = {
  product: MockProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  const { lang, t } = useLanguage();
  const { addItem } = useCart();

  const [dualEyeOpen, setDualEyeOpen] = useState(false);
  const [vtoOpen, setVtoOpen] = useState(false);

  const price = product.salePriceQar || product.basePriceQar;
  const hasDiscount = product.salePriceQar && product.salePriceQar < product.basePriceQar;
  const isContactLens =
    product.productType === "COLORED_CONTACT_LENSES" ||
    product.productType === "MEDICAL_CONTACT_LENSES";

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isContactLens) {
      // Open Eyenk Dual-Eye Power Selector
      setDualEyeOpen(true);
    } else {
      // Direct add to cart for solutions, lashes, or frames
      addItem({
        productId: product.id,
        titleEn: product.titleEn,
        titleAr: product.titleAr,
        sku: product.sku,
        image: product.images[0]?.imageUrl || "",
        unitPriceQar: price,
        quantity: 1,
      });
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100/90 p-3 sm:p-4 shadow-xs hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col justify-between group relative">
        <Link href={`/products/${product.slug}`} className="block">
          {/* Product Image Area */}
          <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50/80 mb-3 border border-gray-100 flex items-center justify-center">
            <img
              src={product.images[0]?.imageUrl}
              alt={product.titleEn}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Brand Badge */}
            <span className="absolute top-2.5 left-2.5 text-[10px] font-black uppercase tracking-wider bg-slate-900/90 backdrop-blur-xs text-white px-2 py-0.5 rounded-md shadow-xs">
              {product.brandName}
            </span>

            {/* Color Swatch Dot */}
            {product.colorHex && (
              <span
                style={{ backgroundColor: product.colorHex }}
                className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full border-2 border-white shadow-xs"
                title={product.colorNameEn}
              />
            )}

            {/* Discount Pill */}
            {hasDiscount && (
              <span className="absolute bottom-2.5 left-2.5 bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-xs uppercase">
                {product.basePriceQar - (product.salePriceQar || 0)} QAR OFF
              </span>
            )}

            {/* Virtual Try-on Shortcut */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setVtoOpen(true);
              }}
              className="absolute bottom-2.5 right-2.5 p-1.5 bg-white/95 text-slate-800 rounded-full shadow-md hover:bg-white hover:text-indigo-600 transition backdrop-blur-xs opacity-90 group-hover:opacity-100"
              title={t.virtualTryOn}
            >
              <Eye size={15} />
            </button>
          </div>

          {/* Product Metadata */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              <span>{product.collectionName || product.categorySlug}</span>
              {product.lensDuration && <span>{product.lensDuration.replace("_", " ")}</span>}
            </div>

            <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-600 transition line-clamp-1 leading-snug">
              {lang === "ar" ? product.titleAr : product.titleEn}
            </h3>
          </div>
        </Link>

        {/* Footer: Price in QAR & Action Button */}
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm sm:text-base font-black text-slate-900">
                {price} QAR
              </span>
              {hasDiscount && (
                <span className="text-[11px] text-gray-400 line-through font-semibold">
                  {product.basePriceQar}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-600 font-bold block">
              In Stock (Doha)
            </span>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className="px-3 py-2 bg-slate-900 text-white rounded-xl text-xs font-black hover:bg-slate-800 transition shadow-xs flex items-center gap-1 shrink-0"
          >
            <ShoppingBag size={14} />
            <span>{isContactLens ? "Select Power" : "Add"}</span>
          </button>
        </div>
      </div>

      {/* Dual Eye Modal for Contact Lenses */}
      <DualEyeModal
        product={product}
        isOpen={dualEyeOpen}
        onClose={() => setDualEyeOpen(false)}
      />

      {/* Virtual Try-On Studio Modal */}
      <VirtualTryOnModal
        isOpen={vtoOpen}
        onClose={() => setVtoOpen(false)}
        frameTitle={product.titleEn}
      />
    </>
  );
}
