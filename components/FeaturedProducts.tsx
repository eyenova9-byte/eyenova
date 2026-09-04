"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { MOCK_PRODUCTS, MockProduct } from "@/lib/mockData";
import { DualEyeModal } from "@/components/DualEyeModal";
import { VirtualTryOnModal } from "@/components/VirtualTryOnModal";
import { ShoppingBag, Eye, Star, Check } from "lucide-react";

export function FeaturedProducts() {
  const { t, lang } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<MockProduct | null>(null);
  const [vtoOpen, setVtoOpen] = useState(false);
  const [vtoProductTitle, setVtoProductTitle] = useState("");

  const featured = MOCK_PRODUCTS.filter((p) => p.isFeatured);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 block mb-1">
            Top Picks in Qatar
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Best-Selling Lenses & Eyewear
          </h2>
          <p className="text-xs text-gray-500 mt-2">
            Available with prescription options & same-day delivery across Doha.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((product) => {
            const price = product.salePriceQar || product.basePriceQar;
            const hasDiscount = !!product.salePriceQar;
            const isContactLens =
              product.productType === "COLORED_CONTACT_LENSES" ||
              product.productType === "MEDICAL_CONTACT_LENSES";

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-gray-100 p-4 shadow-sm hover:shadow-xl transition duration-300 flex flex-col justify-between group"
              >
                <div>
                  <Link href={`/products/${product.slug}`} className="block">
                    {/* Image Container */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-4 border border-gray-100">
                      <img
                        src={product.images[0]?.imageUrl}
                        alt={product.titleEn}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />

                      {/* Brand Badge */}
                      <span className="absolute top-3 left-3 text-[10px] font-extrabold uppercase tracking-wider bg-slate-900 text-white px-2.5 py-1 rounded-full shadow-sm">
                        {product.brandName}
                      </span>

                      {/* Color Swatch Dot */}
                      {product.colorHex && (
                        <span
                          style={{ backgroundColor: product.colorHex }}
                          className="absolute top-3 right-3 w-5 h-5 rounded-full border-2 border-white shadow"
                          title={product.colorNameEn}
                        />
                      )}

                      {/* Discount Badge */}
                      {hasDiscount && (
                        <span className="absolute bottom-3 left-3 bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                          SALE
                        </span>
                      )}
                    </div>

                    {/* Title & Collection */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {product.collectionName || product.categorySlug}
                      </span>
                      <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-emerald-600 transition line-clamp-1">
                        {lang === "ar" ? product.titleAr : product.titleEn}
                      </h3>
                    </div>
                  </Link>
                </div>

                {/* Footer Price & Add CTA */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-extrabold text-slate-900">
                        {price} QAR
                      </span>
                      {hasDiscount && (
                        <span className="text-xs text-gray-400 line-through font-medium">
                          {product.basePriceQar} QAR
                        </span>
                      )}
                    </div>
                    {product.packSize && (
                      <span className="text-[10px] text-gray-400 block font-medium">
                        {product.packSize} lenses / box
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      if (isContactLens) {
                        setSelectedProduct(product);
                      } else {
                        // For glasses/solutions, open directly or redirect
                        setSelectedProduct(product);
                      }
                    }}
                    className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition shadow flex items-center gap-1.5"
                  >
                    <ShoppingBag size={14} />
                    <span>{t.addToCart}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dual-Eye Contact Lens Selector Modal */}
      <DualEyeModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Virtual Try-On Modal */}
      <VirtualTryOnModal
        isOpen={vtoOpen}
        onClose={() => setVtoOpen(false)}
        frameTitle={vtoProductTitle}
      />
    </section>
  );
}
