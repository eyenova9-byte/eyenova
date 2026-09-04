"use client";

import React, { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { MOCK_PRODUCTS, MockProduct } from "@/lib/mockData";
import { DualEyeModal } from "@/components/DualEyeModal";
import { VirtualTryOnModal } from "@/components/VirtualTryOnModal";
import {
  ShoppingBag,
  Eye,
  Star,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Info,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { t, lang, isRtl } = useLanguage();
  const { addItem } = useCart();

  const product = MOCK_PRODUCTS.find((p) => p.slug === slug) || MOCK_PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [dualEyeOpen, setDualEyeOpen] = useState(false);
  const [vtoOpen, setVtoOpen] = useState(false);

  // For Glasses Customizer
  const [selectedLensPackage, setSelectedLensPackage] = useState<string>("frame-only");
  const [odSph, setOdSph] = useState("-1.50");
  const [osSph, setOsSph] = useState("-1.50");
  const [pd, setPd] = useState("63.0");

  const price = product.salePriceQar || product.basePriceQar;
  const isContactLens =
    product.productType === "COLORED_CONTACT_LENSES" ||
    product.productType === "MEDICAL_CONTACT_LENSES";

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
      availability: product.stockQuantity > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "EyeNova Qatar",
      },
    },
  };

  const handleAddGlassesToCart = () => {
    let lensAddonPrice = 0;
    let lensTitle = "Frame Only (Demo Lenses)";
    if (selectedLensPackage === "blue-shield") {
      lensAddonPrice = 95;
      lensTitle = "Zero Power Blue Light Shield UV420";
    } else if (selectedLensPackage === "single-vision") {
      lensAddonPrice = 150;
      lensTitle = "Single Vision Thin 1.61 Anti-Reflective";
    }

    addItem({
      productId: product.id,
      titleEn: `${product.titleEn} (${lensTitle})`,
      titleAr: `${product.titleAr} (${lensTitle})`,
      sku: product.sku,
      image: product.images[0]?.imageUrl || "",
      unitPriceQar: price,
      quantity: 1,
      lensNameEn: lensTitle,
      lensPriceQar: lensAddonPrice,
    });
  };

  return (
    <div className="py-10 bg-gray-50/50 min-h-screen">
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-slate-900">{t.allProducts}</Link>
          <span>/</span>
          <span className="font-bold text-slate-900 truncate">{product.titleEn}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-sm">
          {/* Left Column: Image Gallery & 360 View */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-inner">
              <img
                src={product.images[activeImageIndex]?.imageUrl || product.images[0]?.imageUrl}
                alt={product.titleEn}
                className="w-full h-full object-cover"
              />

              <span className="absolute top-4 left-4 text-xs font-extrabold uppercase tracking-widest bg-slate-900 text-white px-3 py-1 rounded-full">
                {product.brandName}
              </span>

              {/* Virtual Try-On Trigger Overlay */}
              <button
                onClick={() => setVtoOpen(true)}
                className="absolute bottom-4 right-4 px-4 py-2 bg-white/95 text-slate-900 rounded-2xl text-xs font-extrabold shadow-lg hover:bg-white transition flex items-center gap-1.5 backdrop-blur-xs"
              >
                <Sparkles size={16} className="text-indigo-600" />
                <span>{t.virtualTryOn}</span>
              </button>
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition shrink-0 ${
                    activeImageIndex === idx ? "border-slate-900 shadow-md" : "border-gray-200 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img.imageUrl} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Qatar Authenticity & Shipping Guarantee */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <Truck size={18} className="text-emerald-600 shrink-0" />
                <span>Same-Day Delivery in Doha</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <ShieldCheck size={18} className="text-blue-600 shrink-0" />
                <span>100% Authentic Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Info & Eyenk Customizer */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 block mb-1">
                {product.collectionName || product.categorySlug}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {lang === "ar" ? product.titleAr : product.titleEn}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-400 text-sm">
                  {"★".repeat(5)}
                </div>
                <span className="text-xs font-bold text-gray-500">(48 Qatar Reviews)</span>
              </div>
            </div>

            {/* Price in QAR */}
            <div className="flex items-baseline gap-3 pb-4 border-b border-gray-100">
              <span className="text-3xl font-extrabold text-slate-900">
                {price} QAR
              </span>
              {product.salePriceQar && (
                <span className="text-sm text-gray-400 line-through font-medium">
                  {product.basePriceQar} QAR
                </span>
              )}
              <span className="text-xs text-gray-500 font-medium">
                ({product.packSize ? `${product.packSize} lenses / box` : "Tax Included"})
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-600 leading-relaxed">
              {lang === "ar" ? product.descriptionAr : product.descriptionEn}
            </p>

            {/* Contact Lens Quick Buy vs Glasses Config */}
            {isContactLens ? (
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-sm">
                    Select Power & Eye Quantities
                  </span>
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                    Plano or Prescription
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Select separate sphere powers and box quantities for your Right Eye (OD) and Left Eye (OS).
                </p>

                <button
                  onClick={() => setDualEyeOpen(true)}
                  className="w-full py-4 bg-slate-900 text-white font-extrabold text-xs rounded-2xl hover:bg-slate-800 transition shadow-lg flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={18} />
                  <span>Choose Power & Add to Cart</span>
                </button>
              </div>
            ) : (
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-4">
                <span className="font-extrabold text-slate-900 text-sm block">
                  Select Lens Package for Frames
                </span>

                <div className="space-y-2">
                  <label className={`p-3 rounded-2xl border flex justify-between items-center cursor-pointer transition ${
                    selectedLensPackage === "frame-only" ? "border-slate-900 bg-white shadow-sm" : "border-gray-200 bg-gray-50"
                  }`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="lens-pkg"
                        checked={selectedLensPackage === "frame-only"}
                        onChange={() => setSelectedLensPackage("frame-only")}
                        className="accent-slate-900"
                      />
                      <span className="text-xs font-bold text-slate-900">Frame Only (Demo Lenses)</span>
                    </div>
                    <span className="text-xs font-extrabold text-slate-900">+0 QAR</span>
                  </label>

                  <label className={`p-3 rounded-2xl border flex justify-between items-center cursor-pointer transition ${
                    selectedLensPackage === "blue-shield" ? "border-slate-900 bg-white shadow-sm" : "border-gray-200 bg-gray-50"
                  }`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="lens-pkg"
                        checked={selectedLensPackage === "blue-shield"}
                        onChange={() => setSelectedLensPackage("blue-shield")}
                        className="accent-slate-900"
                      />
                      <span className="text-xs font-bold text-slate-900">Zero Power Blue Light Shield UV420</span>
                    </div>
                    <span className="text-xs font-extrabold text-slate-900">+95 QAR</span>
                  </label>

                  <label className={`p-3 rounded-2xl border flex justify-between items-center cursor-pointer transition ${
                    selectedLensPackage === "single-vision" ? "border-slate-900 bg-white shadow-sm" : "border-gray-200 bg-gray-50"
                  }`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="lens-pkg"
                        checked={selectedLensPackage === "single-vision"}
                        onChange={() => setSelectedLensPackage("single-vision")}
                        className="accent-slate-900"
                      />
                      <span className="text-xs font-bold text-slate-900">Single Vision Thin 1.61 Prescription</span>
                    </div>
                    <span className="text-xs font-extrabold text-slate-900">+150 QAR</span>
                  </label>
                </div>

                <button
                  onClick={handleAddGlassesToCart}
                  className="w-full py-4 bg-slate-900 text-white font-extrabold text-xs rounded-2xl hover:bg-slate-800 transition shadow-lg flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={18} />
                  <span>{t.addToCart}</span>
                </button>
              </div>
            )}

            {/* Technical Specifications Table */}
            <div className="pt-6 border-t border-gray-100">
              <h3 className="font-extrabold text-slate-900 text-sm mb-3">
                {t.specifications}
              </h3>
              <div className="grid grid-cols-2 gap-y-2 text-xs">
                {product.lensDuration && (
                  <>
                    <span className="text-gray-500">{t.durationFilter}:</span>
                    <span className="font-bold text-slate-900">{product.lensDuration}</span>
                  </>
                )}
                {product.baseCurve && (
                  <>
                    <span className="text-gray-500">{t.baseCurve}:</span>
                    <span className="font-bold text-slate-900">{product.baseCurve} mm</span>
                  </>
                )}
                {product.diameter && (
                  <>
                    <span className="text-gray-500">{t.diameter}:</span>
                    <span className="font-bold text-slate-900">{product.diameter} mm</span>
                  </>
                )}
                {product.waterContent && (
                  <>
                    <span className="text-gray-500">{t.waterContent}:</span>
                    <span className="font-bold text-slate-900">{product.waterContent}%</span>
                  </>
                )}
                {product.lensWidth && (
                  <>
                    <span className="text-gray-500">{t.lensWidth}:</span>
                    <span className="font-bold text-slate-900">{product.lensWidth} mm</span>
                  </>
                )}
                {product.bridgeWidth && (
                  <>
                    <span className="text-gray-500">{t.bridgeWidth}:</span>
                    <span className="font-bold text-slate-900">{product.bridgeWidth} mm</span>
                  </>
                )}
                {product.templeLength && (
                  <>
                    <span className="text-gray-500">{t.templeLength}:</span>
                    <span className="font-bold text-slate-900">{product.templeLength} mm</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dual Eye Modal */}
      <DualEyeModal
        product={product}
        isOpen={dualEyeOpen}
        onClose={() => setDualEyeOpen(false)}
      />

      {/* Virtual Try-On Modal */}
      <VirtualTryOnModal
        isOpen={vtoOpen}
        onClose={() => setVtoOpen(false)}
        frameTitle={product.titleEn}
      />
    </div>
  );
}
