"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { MOCK_PRODUCTS, MockProduct } from "@/lib/mockData";
import { ProductCard } from "@/components/ProductCard";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Share2,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

// Standard contact lens powers matching Eyenk
const POWER_OPTIONS = [
  "-12.00", "-11.50", "-11.00", "-10.50", "-10.00", "-9.50", "-9.00", "-8.50",
  "-8.00", "-7.50", "-7.00", "-6.50", "-6.00", "-5.75", "-5.50", "-5.25",
  "-5.00", "-4.75", "-4.50", "-4.25", "-4.00", "-3.75", "-3.50", "-3.25",
  "-3.00", "-2.75", "-2.50", "-2.25", "-2.00", "-1.75", "-1.50", "-1.25",
  "-1.00", "-0.75", "-0.50", "0.00 (Plano)",
  "+0.50", "+0.75", "+1.00", "+1.25", "+1.50", "+1.75", "+2.00", "+2.25",
  "+2.50", "+2.75", "+3.00", "+3.25", "+3.50", "+3.75", "+4.00", "+4.25",
  "+4.50", "+4.75", "+5.00", "+5.50", "+6.00"
];

// Eyenk Store Pickup Locations (Opening Soon)
const STORE_LOCATIONS = [
  {
    name: "Tawar Mall, Al Markhiya",
    nameAr: "طوار مول، المرخية",
    status: "Opening Soon (Q4 2026)",
    statusAr: "الافتتاح قريباً (الربع الرابع 2026)",
    hours: "Online Delivery Active Now",
    available: false,
  },
  {
    name: "Place Vendôme, Lusail",
    nameAr: "بلاس فاندوم، لوسيل",
    status: "Opening Soon (Q4 2026)",
    statusAr: "الافتتاح قريباً (الربع الرابع 2026)",
    hours: "Online Delivery Active Now",
    available: false,
  },
  {
    name: "Ezdan Mall, Al Wakrah",
    nameAr: "إزدان مول، الوكرة",
    status: "Coming Soon (2027)",
    statusAr: "قريباً جداً (2027)",
    hours: "Online Delivery Active Now",
    available: false,
  },
  {
    name: "Mall of Qatar, Al Rayyan",
    nameAr: "قطر مول، الريان",
    status: "Coming Soon (2027)",
    statusAr: "قريباً جداً (2027)",
    hours: "Online Delivery Active Now",
    available: false,
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { t, lang, isRtl } = useLanguage();
  const { addItem } = useCart();

  // Find product by exact slug, or prefix match (e.g. 1-day-acuvue-moist)
  const initialProduct =
    MOCK_PRODUCTS.find(
      (p) =>
        p.slug === slug ||
        p.slug === `${slug}-30-pack` ||
        (slug === "1-day-acuvue-moist" && p.slug.startsWith("1-day-acuvue-moist"))
    ) ||
    MOCK_PRODUCTS.find((p) => p.slug === "1-day-acuvue-moist") ||
    MOCK_PRODUCTS[0];

  const [product, setProduct] = useState(initialProduct);

  useEffect(() => {
    fetch(`/api/products/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.product) {
          setProduct(data.product);
        }
      })
      .catch((err) => console.error("Error fetching product from DB:", err));
  }, [slug]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [modalZoomed, setModalZoomed] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [pickupModalOpen, setPickupModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedAlert, setAddedAlert] = useState(false);

  // Swipe navigation helpers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      // Swiped left -> next image
      setActiveImageIndex((prev) =>
        prev < product.images.length - 1 ? prev + 1 : 0
      );
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> prev image
      setActiveImageIndex((prev) =>
        prev > 0 ? prev - 1 : product.images.length - 1
      );
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Power & Quantity State
  const [selectedPower, setSelectedPower] = useState<string>("-1.50");
  const [quantity, setQuantity] = useState<number>(1);
  const [dualEyeMode, setDualEyeMode] = useState<boolean>(false);
  const [rightPower, setRightPower] = useState<string>("-1.50");
  const [rightQty, setRightQty] = useState<number>(1);
  const [leftPower, setLeftPower] = useState<string>("-1.50");
  const [leftQty, setLeftQty] = useState<number>(1);

  // Glasses Customizer State (for frames)
  const [selectedLensPackage, setSelectedLensPackage] = useState<string>("frame-only");

  const price = product.salePriceQar || product.basePriceQar;
  const isContactLens =
    product.productType === "COLORED_CONTACT_LENSES" ||
    product.productType === "MEDICAL_CONTACT_LENSES";

  // Recommended products (You may also like)
  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) =>
      p.slug !== product.slug &&
      (p.brandName === product.brandName || p.categorySlug === product.categorySlug)
  ).slice(0, 4);

  // Add to cart handler
  const handleAddToCart = () => {
    if (isContactLens && dualEyeMode) {
      // Add Right Eye
      addItem({
        productId: `${product.id}-OD`,
        titleEn: `${product.titleEn} (Right Eye / OD: ${rightPower})`,
        titleAr: `${product.titleAr} (العين اليمنى / OD: ${rightPower})`,
        sku: `${product.sku}-OD-${rightPower}`,
        image: product.images[0]?.imageUrl || "",
        unitPriceQar: price,
        quantity: rightQty,
        lensNameEn: `Power: ${rightPower}`,
      });
      // Add Left Eye
      addItem({
        productId: `${product.id}-OS`,
        titleEn: `${product.titleEn} (Left Eye / OS: ${leftPower})`,
        titleAr: `${product.titleAr} (العين اليسرى / OS: ${leftPower})`,
        sku: `${product.sku}-OS-${leftPower}`,
        image: product.images[0]?.imageUrl || "",
        unitPriceQar: price,
        quantity: leftQty,
        lensNameEn: `Power: ${leftPower}`,
      });
    } else {
      addItem({
        productId: product.id,
        titleEn: isContactLens
          ? `${product.titleEn} (Power: ${selectedPower})`
          : product.titleEn,
        titleAr: isContactLens
          ? `${product.titleAr} (${selectedPower})`
          : product.titleAr,
        sku: isContactLens ? `${product.sku}-${selectedPower}` : product.sku,
        image: product.images[0]?.imageUrl || "",
        unitPriceQar: price,
        quantity: quantity,
        lensNameEn: isContactLens ? `Power: ${selectedPower}` : undefined,
      });
    }

    setAddedAlert(true);
    setTimeout(() => setAddedAlert(false), 3500);
  };

  const handleInstantBuy = () => {
    handleAddToCart();
    router.push("/cart");
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Google Schema.org JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.titleEn,
    image: product.images.map((i) => i.imageUrl),
    description: product.descriptionEn,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: product.brandName,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "QAR",
      price: price,
      availability:
        product.stockQuantity > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "EyeNova Qatar",
      },
    },
  };

  return (
    <div className="bg-white text-[#121212] min-h-screen">
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Added to Cart Notification Toast */}
      {addedAlert && (
        <div className="fixed top-5 right-5 z-50 bg-[#121212] text-white px-5 py-3.5 shadow-2xl flex items-center gap-3 text-sm animate-fade-in border border-neutral-700">
          <Check size={16} className="text-emerald-400 shrink-0" />
          <span>Added to your cart successfully!</span>
          <Link
            href="/cart"
            className="underline font-bold ml-2 text-white hover:text-neutral-300"
          >
            View Cart
          </Link>
        </div>
      )}

      {/* Main PDP Container */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ================================================================= */}
          {/* LEFT COLUMN: Sticky Media Gallery (Eyenk 45% column, borderless)   */}
          {/* ================================================================= */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start z-10">
            <div className="flex flex-col gap-3">
              
              {/* Main Featured Image Display - Eyenk 1:1 borderless, natural fit */}
              <div
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onClick={() => {
                  setModalZoomed(false);
                  setLightboxOpen(true);
                }}
                className="relative w-full max-w-[420px] mx-auto flex items-center justify-center cursor-zoom-in select-none group"
              >
                <img
                  src={
                    product.images[activeImageIndex]?.imageUrl ||
                    product.images[0]?.imageUrl
                  }
                  alt={product.titleEn}
                  className="w-full max-h-[380px] sm:max-h-[420px] object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Zoom Plus Icon (matching Eyenk exact plus icon in top-right) */}
                <div className="absolute top-2 right-2 text-[#121212]/60 hover:text-[#121212] p-1.5 transition flex items-center justify-center">
                  <ZoomIn size={18} />
                </div>

                {/* Left/Right Click Nav Arrows for Multi-image */}
                {product.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIndex((prev) =>
                          prev > 0 ? prev - 1 : product.images.length - 1
                        );
                      }}
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white shadow-xs flex items-center justify-center text-[#121212] transition opacity-0 group-hover:opacity-100 sm:opacity-75 cursor-pointer"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIndex((prev) =>
                          prev < product.images.length - 1 ? prev + 1 : 0
                        );
                      }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white shadow-xs flex items-center justify-center text-[#121212] transition opacity-0 group-hover:opacity-100 sm:opacity-75 cursor-pointer"
                      aria-label="Next image"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
                
                {/* Mobile Image Counter Badge */}
                <span className="lg:hidden absolute bottom-2 right-2 text-[11px] bg-black/60 text-white px-2.5 py-0.5 rounded-full backdrop-blur-xs font-mono">
                  {activeImageIndex + 1} / {product.images.length || 1}
                </span>
              </div>

              {/* Thumbnails Row: Clean Borderless Thumbnails underneath */}
              {product.images.length > 1 && (
                <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 scrollbar-none max-w-[420px] mx-auto w-full">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 p-1 flex items-center justify-center cursor-pointer transition ${
                        activeImageIndex === idx
                          ? "border border-[#121212] opacity-100"
                          : "border border-neutral-200 opacity-60 hover:opacity-100"
                      }`}
                      aria-label={`View image ${idx + 1}`}
                    >
                      <img
                        src={img.imageUrl}
                        alt={`thumb-${idx}`}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ================================================================= */}
          {/* RIGHT COLUMN: Product Information & Purchase Form (Eyenk 55%)     */}
          {/* ================================================================= */}
          <div className="lg:col-span-7 lg:pl-6">
            <div className="flex flex-col">
              
              {/* Vendor / Brand (Eyenk uppercase caption) */}
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#707070] font-normal mb-1">
                {product.brandName}
              </p>

              {/* Product Title */}
              <h1 className="text-2xl sm:text-[30px] font-normal text-[#121212] tracking-tight leading-tight mb-2">
                {lang === "ar" ? product.titleAr : product.titleEn}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-[17px] text-[#121212] font-normal">
                  QAR {price.toFixed(2)}
                </span>
                {product.salePriceQar && (
                  <span className="text-[15px] text-[#707070] line-through font-normal">
                    QAR {product.basePriceQar.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Tax Included Note (Eyenk exact subtext) */}
              <p className="text-[12px] text-[#707070] mb-5">
                Tax included.
              </p>

              {/* Instant Delivery Available Banner (Eyenk exact green badge) */}
              <div className="bg-[#f2faf3] border border-[#d3eed7] rounded-none px-4 py-3 mb-6">
                <div className="flex items-center gap-2 text-[13px] font-semibold text-[#186b2b]">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#186b2b] animate-pulse" />
                  <span>Instant Delivery Available</span>
                </div>
                <p className="text-[12px] text-[#2e5937] mt-0.5 ml-4">
                  Paid orders only, 10 am to 10 pm
                </p>
              </div>

              {/* Power Selector & Configurations */}
              {isContactLens ? (
                <div className="space-y-4 mb-6">
                  {!dualEyeMode ? (
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[13px] font-normal text-[#121212]">
                          Power
                        </label>
                        <button
                          type="button"
                          onClick={() => setDualEyeMode(true)}
                          className="text-[12px] text-[#121212] underline hover:text-[#555] transition"
                        >
                          Different power for each eye?
                        </button>
                      </div>

                      <div className="relative">
                        <select
                          value={selectedPower}
                          onChange={(e) => setSelectedPower(e.target.value)}
                          className="w-full h-11 px-3.5 pr-9 border border-[#d2d2d2] rounded-none text-[13px] text-[#121212] bg-white appearance-none focus:outline-none focus:border-black cursor-pointer"
                        >
                          {POWER_OPTIONS.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={16}
                          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500"
                        />
                      </div>
                    </div>
                  ) : (
                    /* Dual Eye (OD / OS) Mode */
                    <div className="p-4 border border-neutral-200 bg-[#fafafa] space-y-4">
                      <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                        <span className="text-[13px] font-semibold text-[#121212]">
                          Prescription per Eye
                        </span>
                        <button
                          type="button"
                          onClick={() => setDualEyeMode(false)}
                          className="text-[11px] text-neutral-500 underline"
                        >
                          Single Power Mode
                        </button>
                      </div>

                      {/* Right Eye (OD) */}
                      <div>
                        <div className="flex justify-between items-center text-[12px] mb-1 font-medium">
                          <span>Right Eye (OD)</span>
                          <span className="text-neutral-500">Box Qty: {rightQty}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="col-span-2 relative">
                            <select
                              value={rightPower}
                              onChange={(e) => setRightPower(e.target.value)}
                              className="w-full h-10 px-3 pr-8 border border-[#d2d2d2] text-[13px] bg-white appearance-none focus:outline-none"
                            >
                              {POWER_OPTIONS.map((p) => (
                                <option key={p} value={p}>
                                  {p}
                                </option>
                              ))}
                            </select>
                            <ChevronDown
                              size={14}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500"
                            />
                          </div>
                          <div className="flex items-center border border-[#d2d2d2] bg-white h-10 justify-between px-2 text-xs">
                            <button
                              type="button"
                              onClick={() => setRightQty(Math.max(1, rightQty - 1))}
                            >
                              <Minus size={12} />
                            </button>
                            <span>{rightQty}</span>
                            <button
                              type="button"
                              onClick={() => setRightQty(rightQty + 1)}
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Left Eye (OS) */}
                      <div>
                        <div className="flex justify-between items-center text-[12px] mb-1 font-medium">
                          <span>Left Eye (OS)</span>
                          <span className="text-neutral-500">Box Qty: {leftQty}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="col-span-2 relative">
                            <select
                              value={leftPower}
                              onChange={(e) => setLeftPower(e.target.value)}
                              className="w-full h-10 px-3 pr-8 border border-[#d2d2d2] text-[13px] bg-white appearance-none focus:outline-none"
                            >
                              {POWER_OPTIONS.map((p) => (
                                <option key={p} value={p}>
                                  {p}
                                </option>
                              ))}
                            </select>
                            <ChevronDown
                              size={14}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500"
                            />
                          </div>
                          <div className="flex items-center border border-[#d2d2d2] bg-white h-10 justify-between px-2 text-xs">
                            <button
                              type="button"
                              onClick={() => setLeftQty(Math.max(1, leftQty - 1))}
                            >
                              <Minus size={12} />
                            </button>
                            <span>{leftQty}</span>
                            <button
                              type="button"
                              onClick={() => setLeftQty(leftQty + 1)}
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Single Quantity Stepper (if not dual eye) */}
                  {!dualEyeMode && (
                    <div>
                      <label className="text-[13px] font-normal text-[#121212] mb-1.5 block">
                        Quantity
                      </label>
                      <div className="inline-flex items-center border border-[#d2d2d2] h-11 w-36 justify-between px-3">
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="text-[#121212] hover:text-[#707070] transition"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-[13px] font-normal select-none">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(quantity + 1)}
                          className="text-[#121212] hover:text-[#707070] transition"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Spectacles / Frame Options */
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-[13px] font-normal text-[#121212] mb-2 block">
                      Select Lens Option
                    </label>
                    <div className="space-y-2">
                      <label
                        className={`flex items-center justify-between p-3 border cursor-pointer text-xs transition ${
                          selectedLensPackage === "frame-only"
                            ? "border-black bg-white"
                            : "border-neutral-200 bg-[#fafafa]"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="lens"
                            checked={selectedLensPackage === "frame-only"}
                            onChange={() => setSelectedLensPackage("frame-only")}
                            className="accent-black"
                          />
                          <span>Frame Only (Demo Lenses)</span>
                        </div>
                        <span className="font-semibold">+0 QAR</span>
                      </label>

                      <label
                        className={`flex items-center justify-between p-3 border cursor-pointer text-xs transition ${
                          selectedLensPackage === "blue-shield"
                            ? "border-black bg-white"
                            : "border-neutral-200 bg-[#fafafa]"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="lens"
                            checked={selectedLensPackage === "blue-shield"}
                            onChange={() => setSelectedLensPackage("blue-shield")}
                            className="accent-black"
                          />
                          <span>Zero Power Blue Light Shield UV420</span>
                        </div>
                        <span className="font-semibold">+95 QAR</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons (Eyenk 1:1 Black Button) */}
              <div className="space-y-2.5 mb-6">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full h-12 border border-[#121212] bg-[#121212] hover:bg-[#2b2b2b] text-[13px] font-medium tracking-wider transition rounded-none uppercase flex items-center justify-center active:scale-[0.99] cursor-pointer"
                >
                  <span className="text-white font-medium">Add to cart</span>
                </button>

                <button
                  type="button"
                  onClick={handleInstantBuy}
                  className="w-full h-12 bg-black hover:bg-neutral-800 text-[13px] font-medium tracking-wide transition rounded-none flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <span className="text-white">Buy with</span>
                  <span className="text-white font-bold flex items-center gap-1">
                    <svg className="w-4 h-4 fill-white text-white" viewBox="0 0 170 170">
                      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.74 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.08-7.61-7.8-11.73-14.15-5.91-9.14-10.45-19.38-13.62-30.73-3.17-11.35-4.76-22.18-4.76-32.49 0-14.99 3.7-27.42 11.09-37.3 7.39-9.87 16.74-14.92 28.05-15.14 4.8 0 10.15 1.25 16.06 3.75 5.91 2.5 9.71 3.86 11.41 4.08 2.01-.33 6.03-1.8 12.06-4.41 6.03-2.61 11.3-3.78 15.81-3.52 12.24.65 22.02 5.23 29.35 13.73-10.66 6.42-15.88 15.34-15.66 26.77.22 8.92 3.7 16.48 10.45 22.68 6.74 6.2 14.79 9.89 24.15 11.08-2.07 6.42-4.53 12.73-7.39 18.93zM119.22 32.74c0-7.18 2.61-13.92 7.84-20.23 5.22-6.31 11.69-10.48 19.4-12.51.22 1.09.33 2.18.33 3.27 0 7.07-2.67 13.98-8.02 20.73-5.34 6.74-11.85 10.77-19.55 12.08z" />
                    </svg>
                    Pay
                  </span>
                </button>
              </div>

              {/* Store Pickup Section (Eyenk exact pickup note) */}
              <div className="border-t border-neutral-200 pt-5 pb-6">
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-emerald-600 shrink-0">
                    <Check size={16} />
                  </span>
                  <div className="text-[13px] leading-relaxed">
                    <p className="font-normal text-[#121212]">
                      Pickup available at <span className="font-semibold">Tawar Mall, Al Markhiya</span>
                    </p>
                    <p className="text-[12px] text-[#707070] mt-0.5">
                      Usually ready in 2 hours
                    </p>
                    <button
                      type="button"
                      onClick={() => setPickupModalOpen(true)}
                      className="text-[12px] text-[#121212] underline mt-1 block hover:text-neutral-500"
                    >
                      Check availability at other stores
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Details Section (Eyenk exact technical specs & copy) */}
              <div className="border-t border-neutral-200 pt-6">
                <h3 className="text-[15px] font-semibold text-[#121212] mb-3">
                  Product Details
                </h3>

                {/* Specs List */}
                <ul className="text-[13px] text-[#121212] space-y-1.5 mb-5">
                  <li>
                    <span className="font-medium">Product Name:</span>{" "}
                    {product.titleEn}
                  </li>
                  <li>
                    <span className="font-medium">Manufacturer:</span>{" "}
                    {product.brandName === "Acuvue"
                      ? "Johnson and Johnson Vistakon"
                      : product.brandName}
                  </li>
                  {product.diameter && (
                    <li>
                      <span className="font-medium">Diameter:</span>{" "}
                      {product.diameter}
                    </li>
                  )}
                  {product.baseCurve && (
                    <li>
                      <span className="font-medium">Base Curve:</span>{" "}
                      {product.baseCurve}
                    </li>
                  )}
                  {product.packSize && (
                    <li>
                      <span className="font-medium">Packaging:</span>{" "}
                      {product.packSize} lenses per box
                    </li>
                  )}
                  {product.lensDuration && (
                    <li>
                      <span className="font-medium">Wear schedule:</span>{" "}
                      {product.lensDuration === "DAILY_DISPOSABLE"
                        ? "Daily Disposable"
                        : product.lensDuration}
                    </li>
                  )}
                </ul>

                {/* Description Paragraphs */}
                <div className="text-[13px] text-[#555] leading-relaxed space-y-3 mb-6">
                  <p>
                    {product.titleEn} are so comfortable, you may even forget they're
                    there. They're crafted with a patented technology called LACREON®, a
                    wetting agent that holds water like nothing else on the market,
                    even when you blink.
                  </p>
                  <p>
                    {product.titleEn} lenses also help protect your eyes from the
                    damaging rays of the sun, blocking 97% of UVB and 82% of UVA. This
                    added feature can help reduce your risk of macular degeneration and
                    cataracts.
                  </p>
                  <p>
                    Our boxes are packed with enough lenses for an entire month of
                    effortlessly clear vision.
                  </p>
                </div>

                {/* Share Button (Eyenk exact style) */}
                <div className="pt-2 border-t border-neutral-100 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 text-[13px] text-[#121212] hover:text-[#707070] transition py-2"
                  >
                    <Share2 size={15} />
                    <span>{copiedLink ? "Link Copied!" : "Share"}</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* =================================================================== */}
        {/* BOTTOM SECTION: "You may also like" (Eyenk 1:1 Recommendations)     */}
        {/* =================================================================== */}
        <section className="mt-16 sm:mt-24 pt-12 border-t border-neutral-200">
          <h2 className="text-2xl sm:text-[28px] font-normal text-[#121212] text-center tracking-tight mb-10">
            You may also like
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      </div>

      {/* ===================================================================== */}
      {/* Lightbox / Zoom Modal with Click-to-Zoom & Swipe                      */}
      {/* ===================================================================== */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-between p-4 select-none"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Header Bar */}
          <div className="w-full flex items-center justify-between px-2 sm:px-6 py-2 z-10" onClick={(e) => e.stopPropagation()}>
            <span className="text-white/80 text-sm font-light">
              {activeImageIndex + 1} / {product.images.length || 1}
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setModalZoomed((prev) => !prev)}
                className="text-white hover:text-white/80 p-2 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
                title={modalZoomed ? "Zoom out" : "Zoom in"}
              >
                {modalZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
              </button>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="text-white hover:text-white/80 p-2 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
                title="Close"
              >
                <X size={22} />
              </button>
            </div>
          </div>

          {/* Main Zoomable View Area */}
          <div 
            className="relative flex-1 w-full max-w-5xl flex items-center justify-center overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={(e) => {
              e.stopPropagation();
              setModalZoomed((prev) => !prev);
            }}
          >
            <img
              src={
                product.images[activeImageIndex]?.imageUrl ||
                product.images[0]?.imageUrl
              }
              alt={product.titleEn}
              className={`max-w-full max-h-[70vh] sm:max-h-[78vh] object-contain transition-transform duration-300 ${
                modalZoomed ? "scale-175 sm:scale-200 cursor-zoom-out" : "cursor-zoom-in"
              }`}
            />

            {/* Left/Right Arrow Navigation */}
            {product.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalZoomed(false);
                    setActiveImageIndex((prev) =>
                      prev > 0 ? prev - 1 : product.images.length - 1
                    );
                  }}
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-xs transition cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalZoomed(false);
                    setActiveImageIndex((prev) =>
                      prev < product.images.length - 1 ? prev + 1 : 0
                    );
                  }}
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-xs transition cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails Strip in Lightbox */}
          {product.images.length > 1 && (
            <div 
              className="flex items-center gap-2 overflow-x-auto py-3 max-w-full z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setModalZoomed(false);
                    setActiveImageIndex(idx);
                  }}
                  className={`w-14 h-14 sm:w-16 sm:h-16 bg-white shrink-0 p-1 flex items-center justify-center cursor-pointer rounded-sm transition ${
                    activeImageIndex === idx
                      ? "border-2 border-white opacity-100 ring-2 ring-white/50"
                      : "border border-white/20 opacity-40 hover:opacity-80"
                  }`}
                >
                  <img
                    src={img.imageUrl}
                    alt={`thumb-lightbox-${idx}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* Store Pickup Availability Modal                                       */}
      {/* ===================================================================== */}
      {pickupModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 relative shadow-2xl animate-fade-in">
            <button
              onClick={() => setPickupModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-black"
            >
              <X size={20} />
            </button>

            <h3 className="text-lg font-medium text-[#121212] mb-1">
              {lang === "ar" ? "فروع الاستلام - قريباً" : "Physical Boutiques — Opening Soon"}
            </h3>
            <p className="text-xs text-neutral-500 mb-5">
              {lang === "ar"
                ? "صالات العرض ونقاط الاستلام قيد التجهيز. حالياً نوفر خدمة التوصيل السريع لجميع مناطق قطر."
                : "Physical boutiques are preparing for grand opening. Express home delivery across Qatar is fully active."}
            </p>

            <div className="space-y-4 divide-y divide-neutral-100">
              {STORE_LOCATIONS.map((loc, idx) => (
                <div key={idx} className="pt-3 first:pt-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#121212]">
                        {lang === "ar" ? loc.nameAr : loc.name}
                      </p>
                      <p className="text-xs text-[#5c2d76] font-medium mt-0.5">
                        {lang === "ar" ? loc.statusAr : loc.status}
                      </p>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        {lang === "ar" ? "خدمة التوصيل المنزلي متاحة الآن" : loc.hours}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FAF5F2] text-[#5c2d76] border border-[#E8DED8] mt-1">
                      {lang === "ar" ? "قريباً" : "Coming Soon"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setPickupModalOpen(false)}
              className="mt-6 w-full py-3 bg-[#121212] text-white text-xs uppercase tracking-wider font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
