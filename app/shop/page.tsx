"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { MOCK_PRODUCTS, MockProduct } from "@/lib/mockData";
import { ProductCard } from "@/components/ProductCard";
import { DualEyeModal } from "@/components/DualEyeModal";
import { VirtualTryOnModal } from "@/components/VirtualTryOnModal";
import { ShoppingBag, Eye, SlidersHorizontal, Check } from "lucide-react";

function ShopContent() {
  const { t, lang } = useLanguage();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
  const brandParam = searchParams.get("brand") || "all";

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [selectedBrand, setSelectedBrand] = useState<string>(brandParam);
  const [selectedShade, setSelectedShade] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(400);

  const [selectedProduct, setSelectedProduct] = useState<MockProduct | null>(null);
  const [vtoOpen, setVtoOpen] = useState(false);
  const [vtoProductTitle, setVtoProductTitle] = useState("");

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) => {
      if (selectedCategory !== "all" && p.categorySlug !== selectedCategory) return false;
      if (selectedBrand !== "all" && p.brandName.toLowerCase() !== selectedBrand.toLowerCase()) return false;
      if (selectedShade !== "all" && p.colorNameEn?.toLowerCase() !== selectedShade.toLowerCase()) return false;
      if ((p.salePriceQar || p.basePriceQar) > maxPrice) return false;
      return true;
    });
  }, [selectedCategory, selectedBrand, selectedShade, maxPrice]);

  return (
    <div className="py-10 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="mb-8">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 block mb-1">
            Qatar Catalog
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900">
            {t.allProducts}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Showing {filteredProducts.length} items with same-day Qatar delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Dynamic Sidebar Filters */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm h-fit space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-slate-900" />
                <h3 className="font-extrabold text-slate-900 text-sm">{t.filterTitle}</h3>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedBrand("all");
                  setSelectedShade("all");
                  setMaxPrice(400);
                }}
                className="text-[11px] text-emerald-600 font-bold hover:underline"
              >
                {t.clearFilters}
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs font-bold p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                <option value="all">All Categories</option>
                <option value="colored-lenses">Colored Contact Lenses</option>
                <option value="medical-lenses">Medical Clear Lenses</option>
                <option value="solutions-drops">Solutions & Eye Drops</option>
                <option value="eyeglasses">Optical Eyeglasses</option>
                <option value="sunglasses">Sunglasses</option>
              </select>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">
                Brand
              </label>
              <div className="space-y-1.5 text-xs font-medium text-gray-700">
                {["all", "bella", "amara", "lensme", "acuvue", "alcon", "eyenova"].map((b) => (
                  <button
                    key={b}
                    onClick={() => setSelectedBrand(b)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg flex items-center justify-between transition ${
                      selectedBrand === b ? "bg-slate-900 text-white font-bold" : "hover:bg-gray-100"
                    }`}
                  >
                    <span className="capitalize">{b === "all" ? "All Brands" : b}</span>
                    {selectedBrand === b && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">
                Max Price: <span className="text-slate-900 font-extrabold">{maxPrice} QAR</span>
              </label>
              <input
                type="range"
                min="40"
                max="400"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
              />
            </div>
          </div>

          {/* Product Grid Column */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center text-gray-500">
                <p className="font-bold text-sm">No products found matching your filters.</p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedBrand("all");
                    setSelectedShade("all");
                    setMaxPrice(400);
                  }}
                  className="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <DualEyeModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <VirtualTryOnModal
        isOpen={vtoOpen}
        onClose={() => setVtoOpen(false)}
        frameTitle={vtoProductTitle}
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs font-bold">Loading EyeNova Catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
