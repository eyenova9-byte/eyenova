"use client";

import React, { useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { X, Camera, Upload, RefreshCw, Check, Sparkles } from "lucide-react";

type VirtualTryOnModalProps = {
  isOpen: boolean;
  onClose: () => void;
  frameTitle?: string;
};

export function VirtualTryOnModal({ isOpen, onClose, frameTitle }: VirtualTryOnModalProps) {
  const { t } = useLanguage();
  const [mode, setMode] = useState<"camera" | "upload" | "model">("model");
  const [selectedFrameColor, setSelectedFrameColor] = useState("#1E293B");
  const [selectedLensColor, setSelectedLensColor] = useState("transparent");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
        setMode("upload");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-8 shadow-2xl border border-gray-100 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-slate-900 rounded-full hover:bg-gray-100 transition z-10"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-indigo-600" size={20} />
          <h3 className="text-lg font-extrabold text-slate-900">
            EyeNova Virtual Try-On Studio 👓
          </h3>
        </div>

        {/* Studio Canvas Area */}
        <div className="relative w-full h-80 bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-800 shadow-inner mb-6">
          {/* Face Model Background */}
          {mode === "model" && (
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop"
              alt="Model Preview"
              className="w-full h-full object-cover opacity-90"
            />
          )}

          {mode === "upload" && uploadedImage && (
            <img
              src={uploadedImage}
              alt="User Photo"
              className="w-full h-full object-cover"
            />
          )}

          {/* Glasses Overlay Representation */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg
              className="w-48 h-24 drop-shadow-xl transition-all duration-300 transform -translate-y-2"
              viewBox="0 0 200 80"
              fill="none"
            >
              {/* Left Lens */}
              <circle
                cx="55"
                cy="40"
                r="30"
                stroke={selectedFrameColor}
                strokeWidth="5"
                fill={selectedLensColor}
                fillOpacity="0.4"
              />
              {/* Right Lens */}
              <circle
                cx="145"
                cy="40"
                r="30"
                stroke={selectedFrameColor}
                strokeWidth="5"
                fill={selectedLensColor}
                fillOpacity="0.4"
              />
              {/* Bridge */}
              <path
                d="M 85 36 Q 100 28 115 36"
                stroke={selectedFrameColor}
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="absolute bottom-3 left-3 bg-slate-950/70 text-white text-[11px] px-3 py-1 rounded-full backdrop-blur-xs font-semibold">
            Live Preview • {frameTitle || "Pure Titanium Specs"}
          </div>
        </div>

        {/* Frame & Color Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Frame Color Swatches */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
              Frame Color
            </label>
            <div className="flex items-center gap-2">
              {[
                { name: "Obsidian Black", hex: "#1E293B" },
                { name: "Luxury Gold", hex: "#D4AF37" },
                { name: "Silver Metal", hex: "#94A3B8" },
                { name: "Rose Gold", hex: "#E11D48" },
              ].map((color) => (
                <button
                  key={color.hex}
                  onClick={() => setSelectedFrameColor(color.hex)}
                  style={{ backgroundColor: color.hex }}
                  className={`w-8 h-8 rounded-full border-2 transition transform hover:scale-110 ${
                    selectedFrameColor === color.hex ? "border-slate-900 ring-2 ring-indigo-500" : "border-white"
                  }`}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Lens Tint Swatches */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
              Lens Tint / Coating
            </label>
            <div className="flex items-center gap-2">
              {[
                { name: "Clear", hex: "transparent" },
                { name: "Blue Shield", hex: "#3B82F6" },
                { name: "Sun Tint", hex: "#000000" },
                { name: "Green Tint", hex: "#10B981" },
              ].map((tint) => (
                <button
                  key={tint.name}
                  onClick={() => setSelectedLensColor(tint.hex)}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition ${
                    selectedLensColor === tint.hex
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                  }`}
                >
                  {tint.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input Source Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode("model")}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
                mode === "model" ? "bg-slate-900 text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              Demo Model
            </button>

            <label className="cursor-pointer px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs font-bold rounded-xl flex items-center gap-1.5">
              <Upload size={14} />
              <span>Upload Photo</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition"
          >
            Apply to Product
          </button>
        </div>
      </div>
    </div>
  );
}
