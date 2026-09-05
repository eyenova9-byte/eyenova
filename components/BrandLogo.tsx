"use client";

import React from "react";
import Link from "next/link";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "dark" | "light";
  withText?: boolean;
  className?: string;
}

export function BrandLogo({
  size = "md",
  variant = "dark",
  withText = true,
  className = "",
}: BrandLogoProps) {
  const iconDimensions = {
    sm: "w-7 h-5",
    md: "w-8 h-6 sm:w-9 sm:h-6.5",
    lg: "w-11 h-8 sm:w-13 sm:h-9.5",
  };

  const titleSizes = {
    sm: "text-[14px]",
    md: "text-[16px] sm:text-[18px]",
    lg: "text-[20px] sm:text-[23px]",
  };

  const subtitleSizes = {
    sm: "text-[11px]",
    md: "text-[12px] sm:text-[13px]",
    lg: "text-[14px] sm:text-[15px]",
  };

  const isDark = variant === "dark";
  const textColor = isDark ? "text-[#121212]" : "text-white";
  const subtextColor = isDark ? "text-[#707070]" : "text-white/80";

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 group whitespace-nowrap select-none focus:outline-none ${className}`}
      aria-label="EyeNova - Home"
    >
      <div
        className={`relative ${iconDimensions[size]} flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105`}
      >
        <svg
          viewBox="0 0 48 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Elegant Optical Lens Contour */}
          <path
            d="M3 16C8.5 7 16 3.5 24 3.5C32 3.5 39.5 7 45 16C39.5 25 32 28.5 24 28.5C16 28.5 8.5 25 3 16Z"
            stroke={isDark ? "#121212" : "#ffffff"}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Iris Ring with Brand Violet Tone */}
          <circle
            cx="24"
            cy="16"
            r="8"
            stroke={isDark ? "#5c2d76" : "#e0c3fc"}
            strokeWidth="2"
          />

          {/* Nova Sparkle / Pupil Center */}
          <path
            d="M24 11.5L25.1 14.9L28.5 16L25.1 17.1L24 20.5L22.9 17.1L19.5 16L22.9 14.9L24 11.5Z"
            fill={isDark ? "#121212" : "#ffffff"}
          />
        </svg>
      </div>

      {withText && (
        <div className="flex items-baseline gap-1.5 leading-none">
          <span
            className={`${titleSizes[size]} font-semibold tracking-tight ${textColor} transition-colors group-hover:opacity-80`}
          >
            Eye<span className="font-light tracking-normal">Nova</span>
          </span>
          <span
            className={`font-arabic ${subtitleSizes[size]} font-normal ${subtextColor} transition-colors`}
          >
            عين نوفا
          </span>
        </div>
      )}
    </Link>
  );
}
