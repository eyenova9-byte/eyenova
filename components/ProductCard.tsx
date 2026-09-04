"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { MockProduct } from "@/lib/mockData";
import { DualEyeModal } from "@/components/DualEyeModal";

type ProductCardProps = {
  product: MockProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  const { lang } = useLanguage();
  const [dualEyeOpen, setDualEyeOpen] = useState(false);

  const price = product.salePriceQar || product.basePriceQar;
  const isContactLens =
    product.productType === "COLORED_CONTACT_LENSES" ||
    product.productType === "MEDICAL_CONTACT_LENSES";

  return (
    <>
      <div className="flex flex-col items-center text-center group w-full">
        <Link
          href={`/products/${product.slug}`}
          className="w-full flex flex-col items-center focus:outline-none"
        >
          {/* Product Box Image (Centered, Clean White/Transparent, Natural Proportions) */}
          <div className="w-full h-36 sm:h-44 md:h-48 flex items-center justify-center p-2 mb-3 group-hover:scale-105 transition-transform duration-300">
            <img
              src={product.images[0]?.imageUrl}
              alt={product.titleEn}
              className="max-h-full max-w-full object-contain mix-blend-multiply"
            />
          </div>

          {/* Product Title (Centered, Regular Weight, Clean line wrapping) */}
          <h3 className="text-[13px] sm:text-[14px] font-normal text-[#121212] leading-snug text-center mb-1.5 min-h-[38px] flex items-center justify-center group-hover:text-[#707070] transition px-1">
            {lang === "ar" ? product.titleAr : product.titleEn}
          </h3>

          {/* Price (Centered, Clean: QAR 159.00) */}
          <span className="text-[13px] sm:text-[14px] font-normal text-[#121212] text-center tracking-[0.04em]">
            QAR {price.toFixed(2)}
          </span>
        </Link>
      </div>

      {/* Dual Eye Modal for Contact Lenses if opened */}
      {isContactLens && (
        <DualEyeModal
          product={product}
          isOpen={dualEyeOpen}
          onClose={() => setDualEyeOpen(false)}
        />
      )}
    </>
  );
}
