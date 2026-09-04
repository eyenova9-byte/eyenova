"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, Camera, Upload, Eye, Check } from "lucide-react";

export default function VirtualTryOnPage() {
  const { t } = useLanguage();
  const [selectedFrameColor, setSelectedFrameColor] = useState("#1E293B");
  const [selectedLensColor, setSelectedLensColor] = useState("transparent");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setUploadedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="py-12 bg-slate-950 text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold mb-4">
          <Sparkles size={16} />
          <span>EyeNova 3D Browser Studio</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">
          Virtual Try-On Fitting Studio
        </h1>
        <p className="text-xs text-slate-400 max-w-lg mx-auto mb-8">
          Test prescription titanium frames and colored lenses live on a demo face model or upload your photo.
        </p>

        {/* Studio Canvas */}
        <div className="relative w-full max-w-2xl h-96 bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl mx-auto mb-8 flex items-center justify-center">
          {uploadedImage ? (
            <img src={uploadedImage} alt="User Upload" className="w-full h-full object-cover" />
          ) : (
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop"
              alt="Model Preview"
              className="w-full h-full object-cover opacity-90"
            />
          )}

          {/* Glasses Frame SVG Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg className="w-56 h-28 drop-shadow-2xl transition-all duration-300" viewBox="0 0 200 80" fill="none">
              <circle cx="55" cy="40" r="30" stroke={selectedFrameColor} strokeWidth="5" fill={selectedLensColor} fillOpacity="0.35" />
              <circle cx="145" cy="40" r="30" stroke={selectedFrameColor} strokeWidth="5" fill={selectedLensColor} fillOpacity="0.35" />
              <path d="M 85 36 Q 100 28 115 36" stroke={selectedFrameColor} strokeWidth="5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Controls Panel */}
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 max-w-2xl mx-auto space-y-6 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Frame Material & Color
              </label>
              <div className="flex gap-2">
                {[
                  { name: "Obsidian Black", hex: "#1E293B" },
                  { name: "Luxury Gold", hex: "#D4AF37" },
                  { name: "Silver Metal", hex: "#94A3B8" },
                  { name: "Rose Crimson", hex: "#E11D48" },
                ].map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => setSelectedFrameColor(c.hex)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-9 h-9 rounded-full border-2 transition ${
                      selectedFrameColor === c.hex ? "border-white ring-2 ring-indigo-500" : "border-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Lens Tint Simulation
              </label>
              <div className="flex gap-2">
                {[
                  { name: "Clear", hex: "transparent" },
                  { name: "Blue Shield", hex: "#3B82F6" },
                  { name: "Sun Dark", hex: "#000000" },
                ].map((t) => (
                  <button
                    key={t.name}
                    onClick={() => setSelectedLensColor(t.hex)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition ${
                      selectedLensColor === t.hex
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-slate-800 text-slate-300 border-slate-700"
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
            <label className="cursor-pointer px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl flex items-center gap-2">
              <Upload size={16} />
              <span>Upload Personal Photo</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
