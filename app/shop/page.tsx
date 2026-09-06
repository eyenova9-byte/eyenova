"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { MOCK_PRODUCTS } from "@/lib/mockData";
import { ProductCard } from "@/components/ProductCard";
import { ChevronDown, X, SlidersHorizontal } from "lucide-react";

function CollectionContent() {
  const { lang } = useLanguage();
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get("category") || "all";
  const brandParam = searchParams.get("brand") || "all";

  // Filter state
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    brandParam !== "all" ? [brandParam.toLowerCase()] : []
  );
  const [selectedUsage, setSelectedUsage] = useState<string[]>(
    categoryParam === "daily-lens" ? ["daily"] : []
  );
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPowers, setSelectedPowers] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("best-selling");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [allProducts, setAllProducts] = useState<any[]>(MOCK_PRODUCTS);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.products && data.products.length > 0) {
          setAllProducts(data.products);
        }
      })
      .catch((err) => console.error("Error fetching shop products:", err));
  }, []);

  // Available Filter Options (Matching EyeNova exactly)
  const filterOptions = {
    usage: ["Daily", "Monthly"],
    type: [
      "Standard Prescription Lens",
      "Astigmatism Lenses (Toric)",
      "Multifocal Lenses",
      "Colored Lenses",
    ],
    brands: [
      "Acuvue",
      "Alcon",
      "Bella",
      "Amara",
      "LensMe",
      "Diva",
      "CooperVision",
      "Bausch + Lomb",
    ],
    powers: [
      "-0.50",
      "-0.75",
      "-1.00",
      "-1.25",
      "-1.50",
      "-1.75",
      "-2.00",
      "-2.50",
      "-3.00",
      "-3.50",
      "-4.00",
      "-4.50",
      "-5.00",
      "-5.50",
      "-6.00",
      "-7.00",
      "-8.00",
    ],
  };

  // Toggle helpers
  const toggleBrand = (brand: string) => {
    const b = brand.toLowerCase();
    setSelectedBrands((prev) =>
      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]
    );
  };

  const toggleUsage = (usage: string) => {
    const u = usage.toLowerCase();
    setSelectedUsage((prev) =>
      prev.includes(u) ? prev.filter((x) => x !== u) : [...prev, u]
    );
  };

  const toggleType = (t: string) => {
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const togglePower = (p: string) => {
    setSelectedPowers((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const removeAllFilters = () => {
    setSelectedBrands([]);
    setSelectedUsage([]);
    setSelectedTypes([]);
    setSelectedPowers([]);
  };

  const activeFiltersCount =
    selectedBrands.length +
    selectedUsage.length +
    selectedTypes.length +
    selectedPowers.length;

  // Filter and sort products
  const products = useMemo(() => {
    let list = allProducts.filter((p) => {
      // Category / Usage
      if (categoryParam !== "all" && categoryParam !== "daily-lens") {
        if (p.categorySlug !== categoryParam) return false;
      }
      if (selectedUsage.length > 0) {
        const isDaily = p.lensDuration === "DAILY_DISPOSABLE";
        const isMonthly = p.lensDuration === "MONTHLY";
        const match =
          (selectedUsage.includes("daily") && isDaily) ||
          (selectedUsage.includes("monthly") && isMonthly);
        if (!match) return false;
      }
      // Brands
      if (selectedBrands.length > 0) {
        if (!selectedBrands.includes(p.brandName.toLowerCase())) return false;
      }
      // Powers
      if (selectedPowers.length > 0 && p.availablePowers) {
        const hasPower = selectedPowers.some((pow) =>
          p.availablePowers?.includes(pow)
        );
        if (!hasPower) return false;
      }
      return true;
    });

    // Sort
    if (sortBy === "price-ascending") {
      list.sort((a, b) => (a.salePriceQar || a.basePriceQar) - (b.salePriceQar || b.basePriceQar));
    } else if (sortBy === "price-descending") {
      list.sort((a, b) => (b.salePriceQar || b.basePriceQar) - (a.salePriceQar || a.basePriceQar));
    } else if (sortBy === "title-ascending") {
      list.sort((a, b) => a.titleEn.localeCompare(b.titleEn));
    } else if (sortBy === "title-descending") {
      list.sort((a, b) => b.titleEn.localeCompare(a.titleEn));
    }

    return list;
  }, [allProducts, categoryParam, selectedUsage, selectedBrands, selectedPowers, sortBy]);

  const pageTitle = useMemo(() => {
    if (categoryParam === "daily-lens") return "Daily Lens";
    if (categoryParam === "colored-lenses") return "Colour Lenses";
    if (categoryParam === "medical-lenses") return "Medical Lenses";
    if (categoryParam === "solutions-drops") return "Lens Solutions";
    if (brandParam !== "all") return brandParam.charAt(0).toUpperCase() + brandParam.slice(1);
    return "Daily Lens";
  }, [categoryParam, brandParam]);

  return (
    <div className="bg-white min-h-screen text-[#121212] font-sans antialiased">
      {/* 1. Collection Banner (Matching EyeNova: clean large title on pure white) */}
      <div className="border-b border-gray-100 bg-white scroll-trigger animate--fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <h1 className="text-[28px] sm:text-[34px] font-normal tracking-tight text-[#121212]">
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* 2. Main Collection Grid Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Mobile Filter & Sort Bar */}
        <div className="lg:hidden flex items-center justify-between border-b border-gray-200 pb-4 mb-6 scroll-trigger animate--fade-in">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 text-sm font-normal text-[#121212] cursor-pointer"
          >
            <SlidersHorizontal size={16} />
            <span>Filter and sort</span>
            {activeFiltersCount > 0 && (
              <span className="text-xs bg-[#f8edeb] text-[#121212] px-2 py-0.5 rounded-full font-medium">
                {activeFiltersCount}
              </span>
            )}
          </button>
          <span className="text-sm text-gray-500">{products.length} products</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* ========================================================================= */}
          {/* Left Vertical Accordion Filters (Exact EyeNova Parity) */}
          {/* ========================================================================= */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-1 text-sm text-[#121212] scroll-trigger animate--fade-in">
            {/* Filter Header & Remove All */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-2">
              <span className="text-[15px] font-normal text-[#121212]">Filter:</span>
              {activeFiltersCount > 0 && (
                <button
                  onClick={removeAllFilters}
                  className="text-xs text-gray-600 underline hover:text-black transition"
                >
                  Remove all
                </button>
              )}
            </div>

            {/* Filter 1: Usage (Daily, Monthly) */}
            <details className="group border-b border-gray-200 py-3" open>
              <summary className="flex items-center justify-between cursor-pointer list-none text-[14px] font-normal text-[#121212] select-none">
                <span>
                  Usage {selectedUsage.length > 0 && `(${selectedUsage.length})`}
                </span>
                <ChevronDown
                  size={15}
                  className="text-gray-500 group-open:rotate-180 transition-transform duration-200"
                />
              </summary>
              <div className="pt-3 pb-1 space-y-2">
                {filterOptions.usage.map((u) => {
                  const checked = selectedUsage.includes(u.toLowerCase());
                  return (
                    <label
                      key={u}
                      className="flex items-center gap-2.5 cursor-pointer text-[13px] text-gray-700 hover:text-black select-none"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleUsage(u)}
                        className="w-4 h-4 rounded-xs border-gray-300 text-black focus:ring-black cursor-pointer accent-black"
                      />
                      <span>{u}</span>
                    </label>
                  );
                })}
              </div>
            </details>

            {/* Filter 2: Type (Standard Prescription, Astigmatism, etc.) */}
            <details className="group border-b border-gray-200 py-3">
              <summary className="flex items-center justify-between cursor-pointer list-none text-[14px] font-normal text-[#121212] select-none">
                <span>
                  Type {selectedTypes.length > 0 && `(${selectedTypes.length})`}
                </span>
                <ChevronDown
                  size={15}
                  className="text-gray-500 group-open:rotate-180 transition-transform duration-200"
                />
              </summary>
              <div className="pt-3 pb-1 space-y-2">
                {filterOptions.type.map((t) => {
                  const checked = selectedTypes.includes(t);
                  return (
                    <label
                      key={t}
                      className="flex items-center gap-2.5 cursor-pointer text-[13px] text-gray-700 hover:text-black select-none"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleType(t)}
                        className="w-4 h-4 rounded-xs border-gray-300 text-black focus:ring-black cursor-pointer accent-black"
                      />
                      <span>{t}</span>
                    </label>
                  );
                })}
              </div>
            </details>

            {/* Filter 3: Power (Negative Diopters -0.50 to -8.00) */}
            <details className="group border-b border-gray-200 py-3">
              <summary className="flex items-center justify-between cursor-pointer list-none text-[14px] font-normal text-[#121212] select-none">
                <span>
                  Power {selectedPowers.length > 0 && `(${selectedPowers.length})`}
                </span>
                <ChevronDown
                  size={15}
                  className="text-gray-500 group-open:rotate-180 transition-transform duration-200"
                />
              </summary>
              <div className="pt-3 pb-1 max-h-48 overflow-y-auto space-y-2 pr-1">
                {filterOptions.powers.map((p) => {
                  const checked = selectedPowers.includes(p);
                  return (
                    <label
                      key={p}
                      className="flex items-center gap-2.5 cursor-pointer text-[13px] text-gray-700 hover:text-black select-none"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => togglePower(p)}
                        className="w-4 h-4 rounded-xs border-gray-300 text-black focus:ring-black cursor-pointer accent-black"
                      />
                      <span>{p}</span>
                    </label>
                  );
                })}
              </div>
            </details>

            {/* Filter 4: Brand */}
            <details className="group border-b border-gray-200 py-3" open>
              <summary className="flex items-center justify-between cursor-pointer list-none text-[14px] font-normal text-[#121212] select-none">
                <span>
                  Brand {selectedBrands.length > 0 && `(${selectedBrands.length})`}
                </span>
                <ChevronDown
                  size={15}
                  className="text-gray-500 group-open:rotate-180 transition-transform duration-200"
                />
              </summary>
              <div className="pt-3 pb-1 space-y-2">
                {filterOptions.brands.map((b) => {
                  const checked = selectedBrands.includes(b.toLowerCase());
                  return (
                    <label
                      key={b}
                      className="flex items-center gap-2.5 cursor-pointer text-[13px] text-gray-700 hover:text-black select-none"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleBrand(b)}
                        className="w-4 h-4 rounded-xs border-gray-300 text-black focus:ring-black cursor-pointer accent-black"
                      />
                      <span>{b}</span>
                    </label>
                  );
                })}
              </div>
            </details>
          </aside>

          {/* ========================================================================= */}
          {/* Right Product Grid & Top Sort Header */}
          {/* ========================================================================= */}
          <main className="flex-1 w-full">
            {/* Desktop Sort By & Count Bar (Exact EyeNova Layout) */}
            <div className="hidden lg:flex items-center justify-end gap-6 pb-6 text-sm text-[#121212]">
              <div className="flex items-center gap-2">
                <label htmlFor="SortBy" className="text-[13px] text-gray-700">
                  Sort by:
                </label>
                <div className="relative">
                  <select
                    id="SortBy"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-transparent border-none py-1 pl-1 pr-6 text-[13px] text-[#121212] focus:outline-none cursor-pointer font-normal"
                  >
                    <option value="best-selling">Best selling</option>
                    <option value="featured">Featured</option>
                    <option value="title-ascending">Alphabetically, A-Z</option>
                    <option value="title-descending">Alphabetically, Z-A</option>
                    <option value="price-ascending">Price, low to high</option>
                    <option value="price-descending">Price, high to low</option>
                  </select>
                  <ChevronDown
                    size={13}
                    className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
                  />
                </div>
              </div>

              <span className="text-[13px] text-gray-500">
                {products.length} {products.length === 1 ? "product" : "products"}
              </span>
            </div>

            {/* Product Cards Grid: 4 columns desktop matching EyeNova */}
            {products.length === 0 ? (
              <div className="py-20 text-center text-gray-500">
                <p className="text-base font-normal">No products found matching your filters.</p>
                <button
                  onClick={removeAllFilters}
                  className="mt-4 px-4 py-2 text-xs underline text-black hover:text-gray-600 font-normal"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 items-start">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>

        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-xs bg-white h-full p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <h3 className="font-normal text-base text-[#121212]">Filter and sort</h3>
                <button onClick={() => setMobileFilterOpen(false)}>
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Mobile Sort */}
              <div className="py-4 border-b border-gray-200">
                <label className="text-xs font-semibold text-gray-500 block mb-2">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 text-xs rounded-none bg-white"
                >
                  <option value="best-selling">Best selling</option>
                  <option value="featured">Featured</option>
                  <option value="title-ascending">Alphabetically, A-Z</option>
                  <option value="title-descending">Alphabetically, Z-A</option>
                  <option value="price-ascending">Price, low to high</option>
                  <option value="price-descending">Price, high to low</option>
                </select>
              </div>

              {/* Mobile Brands */}
              <div className="py-4 border-b border-gray-200">
                <span className="text-xs font-semibold text-gray-500 block mb-3">Brand</span>
                <div className="space-y-2">
                  {filterOptions.brands.map((b) => (
                    <label key={b} className="flex items-center gap-2 text-xs">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(b.toLowerCase())}
                        onChange={() => toggleBrand(b)}
                        className="accent-black"
                      />
                      <span>{b}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 flex gap-2">
              <button
                onClick={removeAllFilters}
                className="flex-1 py-2.5 border border-gray-300 text-xs text-gray-700"
              >
                Clear
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 bg-[#121212] text-white text-xs"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-gray-500 font-normal">Loading...</div>}>
      <CollectionContent />
    </Suspense>
  );
}
