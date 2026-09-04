"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { MOCK_PRODUCTS, MockProduct } from "@/lib/mockData";
import { Package, Plus, Search, Edit3, Trash2, ArrowLeft } from "lucide-react";

export default function AdminProductsPage() {
  const { t, lang } = useLanguage();
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState("");

  const [newTitleEn, setNewTitleEn] = useState("");
  const [newBrand, setNewBrand] = useState("Bella");
  const [newPrice, setNewPrice] = useState(140);
  const [newStock, setNewStock] = useState(50);
  const [newType, setNewType] = useState<any>("COLORED_CONTACT_LENSES");

  const filtered = products.filter(
    (p) =>
      p.titleEn.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProd: MockProduct = {
      id: `p-${Date.now()}`,
      sku: `${newBrand.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      productType: newType,
      titleEn: newTitleEn,
      titleAr: newTitleEn,
      slug: newTitleEn.toLowerCase().replace(/\s+/g, "-"),
      descriptionEn: "New item added via EyeNova Admin Panel.",
      descriptionAr: "منتج جديد تمت إضافته عبر لوحة الإدارة.",
      categorySlug: "colored-lenses",
      brandName: newBrand,
      basePriceQar: Number(newPrice),
      stockQuantity: Number(newStock),
      isFeatured: false,
      images: [
        {
          imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop",
          isPrimary: true,
        },
      ],
    };
    setProducts([newProd, ...products]);
    setShowAddModal(false);
    setNewTitleEn("");
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
                {t.manageProducts}
              </h1>
              <p className="text-xs text-gray-500">
                Manage contact lenses, glasses, inventory & QAR pricing.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow"
          >
            <Plus size={16} />
            <span>Add New Product</span>
          </button>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/80 mb-6 flex items-center gap-3">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by product title or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs font-semibold focus:outline-none"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-100 font-extrabold text-slate-700">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Brand</th>
                <th className="p-4">Price (QAR)</th>
                <th className="p-4">Stock</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50">
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={product.images[0]?.imageUrl}
                      alt={product.titleEn}
                      className="w-10 h-10 rounded-lg object-cover border border-gray-100"
                    />
                    <div>
                      <span className="font-bold text-slate-900 block">{product.titleEn}</span>
                      <span className="text-[10px] text-gray-400">{product.productType}</span>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-slate-600 font-bold">{product.sku}</td>
                  <td className="p-4 font-bold text-slate-800">{product.brandName}</td>
                  <td className="p-4 font-extrabold text-slate-900">{product.basePriceQar} QAR</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        product.stockQuantity < 10
                          ? "bg-red-50 text-red-600"
                          : "bg-emerald-50 text-emerald-600"
                      }`}
                    >
                      {product.stockQuantity} units
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button className="p-1.5 text-gray-500 hover:text-slate-900">
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => setProducts(products.filter((p) => p.id !== product.id))}
                      className="p-1.5 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateProduct}
            className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl"
          >
            <h3 className="font-extrabold text-slate-900 text-base">Add New Product</h3>

            <div>
              <label className="text-xs font-bold text-gray-500 block mb-1">Product Title</label>
              <input
                type="text"
                required
                value={newTitleEn}
                onChange={(e) => setNewTitleEn(e.target.value)}
                placeholder="e.g. Amara Brown Toffee Lenses"
                className="w-full text-xs p-2.5 border rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">Brand</label>
                <select
                  value={newBrand}
                  onChange={(e) => setNewBrand(e.target.value)}
                  className="w-full text-xs p-2.5 border rounded-xl font-bold"
                >
                  <option value="Bella">Bella</option>
                  <option value="Amara">Amara</option>
                  <option value="Lensme">Lensme</option>
                  <option value="Diva">Diva</option>
                  <option value="Acuvue">Acuvue</option>
                  <option value="EyeNova">EyeNova</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">Price (QAR)</label>
                <input
                  type="number"
                  required
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="w-full text-xs p-2.5 border rounded-xl font-bold"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs font-bold text-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
              >
                Save Product
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
