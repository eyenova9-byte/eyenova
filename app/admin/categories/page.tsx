"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Layers, Plus, ArrowLeft, Tag, Check } from "lucide-react";

export default function AdminCategoriesPage() {
  const { t } = useLanguage();

  const [categories, setCategories] = useState([
    { id: "c1", nameEn: "Colored Contact Lenses", nameAr: "عدسات لاصقة ملونة", slug: "colored-lenses" },
    { id: "c2", nameEn: "Medical Clear Lenses", nameAr: "عدسات طبية شفافة", slug: "medical-lenses" },
    { id: "c3", nameEn: "Solutions & Eye Drops", nameAr: "المحاليل وقطرات العين", slug: "solutions-drops" },
    { id: "c4", nameEn: "Optical Eyeglasses", nameAr: "النظارات الطبية", slug: "eyeglasses" },
    { id: "c5", nameEn: "Sunglasses", nameAr: "النظارات الشمسية", slug: "sunglasses" },
  ]);

  const [attributes, setAttributes] = useState([
    { id: "a1", type: "BRAND", nameEn: "Bella", nameAr: "بيلا", slug: "bella" },
    { id: "a2", type: "BRAND", nameEn: "Amara", nameAr: "أمارا", slug: "amara" },
    { id: "a3", type: "BRAND", nameEn: "Lensme", nameAr: "لينس مي", slug: "lensme" },
    { id: "a4", type: "BRAND", nameEn: "Diva", nameAr: "ديفا", slug: "diva" },
    { id: "a5", type: "COLOR_SHADE", nameEn: "Gray", nameAr: "رمادي", slug: "gray" },
    { id: "a6", type: "COLOR_SHADE", nameEn: "Brown", nameAr: "بني", slug: "brown" },
  ]);

  const [newCatEn, setNewCatEn] = useState("");
  const [newCatAr, setNewCatAr] = useState("");

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatEn) return;
    const newCat = {
      id: `c-${Date.now()}`,
      nameEn: newCatEn,
      nameAr: newCatAr || newCatEn,
      slug: newCatEn.toLowerCase().replace(/\s+/g, "-"),
    };
    setCategories([...categories, newCat]);
    setNewCatEn("");
    setNewCatAr("");
  };

  return (
    <div className="py-10 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="p-2 bg-white border border-gray-200 rounded-xl text-slate-700 hover:bg-gray-100"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">
                {t.manageCategories}
              </h1>
              <p className="text-xs text-gray-500">
                Add new categories, brands, or color shades that update live shop filters.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Categories List */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm border-b border-gray-100 pb-3 flex items-center gap-2">
              <Layers size={18} className="text-emerald-600" />
              <span>Active Storefront Categories</span>
            </h3>

            <form onSubmit={handleAddCategory} className="flex gap-2">
              <input
                type="text"
                required
                placeholder="Category Name (English)"
                value={newCatEn}
                onChange={(e) => setNewCatEn(e.target.value)}
                className="flex-1 text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-slate-900 text-white text-xs font-extrabold rounded-xl shadow hover:bg-slate-800"
              >
                Add Category
              </button>
            </form>

            <div className="space-y-2 pt-2">
              {categories.map((c) => (
                <div
                  key={c.id}
                  className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center text-xs font-bold text-slate-900"
                >
                  <span>{c.nameEn} ({c.nameAr})</span>
                  <span className="text-[10px] text-gray-400 font-mono">/shop?category={c.slug}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Attributes List */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm border-b border-gray-100 pb-3 flex items-center gap-2">
              <Tag size={18} className="text-indigo-600" />
              <span>Dynamic Filter Attributes (Brands & Color Shades)</span>
            </h3>

            <div className="space-y-2">
              {attributes.map((a) => (
                <div
                  key={a.id}
                  className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center text-xs font-bold text-slate-900"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-extrabold">
                      {a.type}
                    </span>
                    <span>{a.nameEn} ({a.nameAr})</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold">✓ Live in Filter</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
