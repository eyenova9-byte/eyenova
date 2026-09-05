"use client";

import React from "react";
import Link from "next/link";

interface EyeNovaLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showArabic?: boolean;
  inverted?: boolean;
  className?: string;
  asLink?: boolean;
}

export function EyeNovaLogo({
  size = "md",
  showArabic = true,
  inverted = false,
  className = "",
  asLink = true,
}: EyeNovaLogoProps) {
  const iconDimensions = {
    sm: "w-6 h-4 sm:w-7 sm:h-4.5",
    md: "w-8 h-5 sm:w-9 sm:h-5.5",
    lg: "w-11 h-7 sm:w-14 sm:h-9",
    xl: "w-16 h-10 sm:w-20 sm:h-12",
  }[size];

  const textSize = {
    sm: "text-[14px] sm:text-[15px]",
    md: "text-[16px] sm:text-[18px]",
    lg: "text-[22px] sm:text-[26px]",
    xl: "text-[28px] sm:text-[34px]",
  }[size];

  const arabicSize = {
    sm: "text-[11px]",
    md: "text-[12px] sm:text-[13px]",
    lg: "text-[14px] sm:text-[16px]",
    xl: "text-[18px] sm:text-[20px]",
  }[size];

  const strokeColor = inverted ? "#ffffff" : "#0f172a";
  const accentFill = inverted ? "#38bdf8" : "#0284c7";
  const textColor = inverted ? "text-white" : "text-slate-900";
  const subtextColor = inverted ? "text-slate-300" : "text-slate-500";

  const content = (
    <div className={`inline-flex items-center gap-2 sm:gap-2.5 select-none ${className}`}>
      {/* Precision Optical Eye Icon */}
      <div className={`relative shrink-0 flex items-center justify-center ${iconDimensions}`}>
        <svg
          viewBox="0 0 54 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
        >
          {/* Outer Lens Contour */}
          <path
            d="M2 17C7.5 6 18 2 27 2C36 2 46.5 6 52 17C46.5 28 36 32 27 32C18 32 7.5 28 2 17Z"
            stroke={strokeColor}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Concentric Optical Ring */}
          <circle
            cx="27"
            cy="17"
            r="8.5"
            stroke={strokeColor}
            strokeWidth="2"
            strokeDasharray="2 1.5"
            className="opacity-70"
          />
          {/* Central Pupil / Iris Highlight */}
          <circle cx="27" cy="17" r="4.5" fill={accentFill} />
          <circle cx="28.5" cy="15.5" r="1.5" fill="#ffffff" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-bold tracking-tight ${textColor} ${textSize} transition-colors font-sans`}
          >
            Eye<span className="font-light tracking-normal text-sky-600">Nova</span>
          </span>
          {showArabic && (
            <span
              className={`font-medium font-arabic ${subtextColor} ${arabicSize} border-l border-slate-300/50 pl-1.5 ml-0.5`}
            >
              عين نوفا
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (asLink) {
    return (
      <Link href="/" className="group focus:outline-none" aria-label="EyeNova Home">
        {content}
      </Link>
    );
  }

  return content;
}
