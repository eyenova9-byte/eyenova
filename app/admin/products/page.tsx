"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { MOCK_PRODUCTS } from "@/lib/mockData";
import {
  Package,
  Plus,
  Search,
  Edit3,
  Trash2,
  ArrowLeft,
  Database,
  RefreshCw,
  Store as StoreIcon,
  Sliders,
  CheckCircle,
  X,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

export default function AdminProductsPage() {
  const { t, lang } = useLanguage();
  const [products, setProducts] = useState<any[]>(MOCK_PRODUCTS);
  const [stores, setStores] = useState<any[]>([]);
  const [selectedStoreFilter, setSelectedStoreFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [stockModalProduct, setStockModalProduct] = useState<any | null>(null);
  const [stockStoreId, setStockStoreId] = useState("");
  const [stockAdjustmentQty, setStockAdjustmentQty] = useState<number>(0);
  const [stockReason, setStockReason] = useState("RESTOCK");
  const [stockNote, setStockNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // New Product form state
  const [newTitleEn, setNewTitleEn] = useState("");
  const [newBrand, setNewBrand] = useState("Bella");
  const [newPrice, setNewPrice] = useState(140);
  const [newStock, setNewStock] = useState(50);
  const [newType, setNewType] = useState<any>("COLORED_CONTACT_LENSES");

  const loadData = () => {
    setLoading(true);
    Promise.all([
      fetch("/api/products").then((res) => res.json()),
      fetch("/api/stores").then((res) => res.json()).catch(() => ({ stores: [] })),
    ])
      .then(([prodData, storeData]) => {
        if (prodData.success && prodData.products && prodData.products.length > 0) {
          setProducts(prodData.products);
        }
        if (storeData.success && storeData.stores) {
          setStores(storeData.stores);
          if (storeData.stores.length > 0 && !stockStoreId) {
            setStockStoreId(storeData.stores[0].id);
          }
        }
      })
      .catch((err) => console.error("Error fetching admin data:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const flashMessage = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  // Filter products by search and store
  const filtered = products.filter((p) => {
    const matchesSearch =
      p.titleEn.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      (p.brandName && p.brandName.toLowerCase().includes(search.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedStoreFilter !== "all" && p.storeBreakdown) {
      const branch = p.storeBreakdown.find((b: any) => b.storeId === selectedStoreFilter);
      return branch && branch.quantity > 0;
    }

    return true;
  });

  // Create Product in PostgreSQL
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titleEn: newTitleEn,
          brandName: newBrand,
          basePriceQar: Number(newPrice),
          stockQuantity: Number(newStock),
          productType: newType,
          images: [
            {
              imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop",
              isPrimary: true,
            },
          ],
        }),
      });
      const data = await res.json();
      if (data.success && data.product) {
        setProducts([data.product, ...products]);
        flashMessage(`✓ Product "${data.product.titleEn}" saved to PostgreSQL & Billing Software!`);
      }
    } catch (err) {
      console.error("Failed to add product to DB:", err);
    } finally {
      setIsSubmitting(false);
      setShowAddModal(false);
      setNewTitleEn("");
    }
  };

  // Edit Product in PostgreSQL
  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/products/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titleEn: editingProduct.titleEn,
          sku: editingProduct.sku,
          brandName: editingProduct.brandName,
          basePriceQar: Number(editingProduct.basePriceQar),
          salePriceQar: editingProduct.salePriceQar ? Number(editingProduct.salePriceQar) : null,
          isActive: editingProduct.isActive,
        }),
      });
      const data = await res.json();
      if (data.success && data.product) {
        setProducts(products.map((p) => (p.id === data.product.id ? data.product : p)));
        flashMessage(`✓ Product "${data.product.titleEn}" updated in PostgreSQL!`);
      }
    } catch (err) {
      console.error("Failed to update product:", err);
    } finally {
      setIsSubmitting(false);
      setEditingProduct(null);
    }
  };

  // Adjust Inventory across store branches in PostgreSQL
  const handleAdjustStock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stockModalProduct) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/inventory/adjust", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: stockModalProduct.id,
          storeId: stockStoreId || (stores[0] ? stores[0].id : null),
          newQuantity: Number(stockAdjustmentQty),
          reason: stockReason,
          note: stockNote || "Updated via EyeNova Admin Panel.",
        }),
      });
      const data = await res.json();
      if (data.success && data.product) {
        setProducts(products.map((p) => (p.id === data.product.id ? data.product : p)));
        flashMessage(`✓ Stock updated to ${data.product.stockQuantity} units across all stores in PostgreSQL!`);
      }
    } catch (err) {
      console.error("Failed to adjust inventory:", err);
    } finally {
      setIsSubmitting(false);
      setStockModalProduct(null);
    }
  };

  // Delete Product from PostgreSQL
  const handleDeleteProduct = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${title}" from the database and billing software?`)) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setProducts(products.filter((p) => p.id !== id));
        flashMessage(`✓ Product "${title}" deleted from database.`);
      }
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  return (
    <div className="py-10 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flash Message Banner */}
        {successMessage && (
          <div className="mb-6 p-4 bg-emerald-600 text-white rounded-2xl shadow-lg flex items-center justify-between text-xs font-bold animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} />
              <span>{successMessage}</span>
            </div>
            <button onClick={() => setSuccessMessage(null)} className="hover:opacity-75">
              <X size={14} />
            </button>
          </div>
        )}

        {/* Page Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="p-2 bg-white border border-gray-200 rounded-xl text-slate-700 hover:bg-gray-100"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">
                {t.manageProducts} & Multi-Store Inventory
              </h1>
              <p className="text-xs text-gray-500">
                Manage contact lenses, glasses, QAR pricing, and multi-store stocks synced with the billing software.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={loadData}
              disabled={loading}
              className="p-2.5 bg-white border border-gray-200 rounded-xl text-slate-700 hover:bg-gray-100 flex items-center gap-1.5 text-xs font-semibold"
              title="Refresh database records"
            >
              <RefreshCw size={14} className={loading ? "animate-spin text-emerald-600" : ""} />
              <span className="hidden sm:inline">Refresh DB</span>
            </button>
            <div className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 border border-emerald-200/80 rounded-xl text-emerald-700 text-xs font-bold">
              <Database size={13} />
              <span>PostgreSQL ({products.length} Products)</span>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow"
            >
              <Plus size={16} />
              <span>Add New Product</span>
            </button>
          </div>
        </div>

        {/* Filter Bar: Search + Store Branch Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2 bg-white p-3 rounded-2xl border border-gray-200/80 flex items-center gap-3 shadow-xs">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, SKU, or brand..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs font-semibold focus:outline-none"
            />
          </div>

          <div className="bg-white p-3 rounded-2xl border border-gray-200/80 flex items-center gap-2 shadow-xs">
            <StoreIcon size={16} className="text-gray-400 shrink-0" />
            <select
              value={selectedStoreFilter}
              onChange={(e) => setSelectedStoreFilter(e.target.value)}
              className="w-full text-xs font-bold text-slate-800 focus:outline-none bg-transparent"
            >
              <option value="all">🏢 All Stores (Aggregated Total)</option>
              {stores.map((s) => (
                <option key={s.id} value={s.id}>
                  📍 {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products & Inventory Table */}
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-100 font-extrabold text-slate-700">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">SKU / Code</th>
                <th className="p-4">Brand</th>
                <th className="p-4">Price (QAR)</th>
                <th className="p-4">Total & Branch Inventory</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition">
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={product.images && product.images[0]?.imageUrl ? product.images[0].imageUrl : "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200"}
                      alt={product.titleEn}
                      className="w-12 h-12 rounded-xl object-cover border border-gray-200 shrink-0"
                    />
                    <div>
                      <span className="font-bold text-slate-900 block leading-tight">{product.titleEn}</span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider">{product.productType}</span>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-slate-600 font-bold">{product.sku}</td>
                  <td className="p-4 font-bold text-slate-800">{product.brandName}</td>
                  <td className="p-4">
                    <span className="font-extrabold text-slate-900 block">{product.basePriceQar} QAR</span>
                    {product.salePriceQar && (
                      <span className="text-[10px] text-emerald-600 font-bold">Sale: {product.salePriceQar} QAR</span>
                    )}
                  </td>
                  <td className="p-4">
                    {/* Website Total Stock Badge */}
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold flex items-center gap-1 ${
                          product.stockQuantity < 10
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        <span>{product.stockQuantity} units total</span>
                      </span>
                      <span className="text-[10px] text-gray-400 font-normal">
                        (Website view)
                      </span>
                    </div>

                    {/* Multi-Store Branch Breakdown */}
                    {product.storeBreakdown && product.storeBreakdown.length > 0 ? (
                      <div className="flex flex-wrap gap-1 text-[10px]">
                        {product.storeBreakdown.map((sb: any) => (
                          <span
                            key={sb.storeId}
                            className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded-md font-semibold border border-gray-200/60"
                            title={`${sb.storeName}: ${sb.quantity} units`}
                          >
                            {sb.storeCode || sb.storeName?.substring(0, 10)}: <b className="text-slate-900">{sb.quantity}</b>
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[10px] text-gray-400">Main warehouse</span>
                    )}
                  </td>
                  <td className="p-4 text-right space-x-1.5">
                    {/* Manage Stock button */}
                    <button
                      onClick={() => {
                        setStockModalProduct(product);
                        setStockAdjustmentQty(product.stockQuantity);
                      }}
                      className="px-2.5 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl text-xs font-bold transition inline-flex items-center gap-1 border border-indigo-200"
                      title="Adjust inventory for specific stores"
                    >
                      <Sliders size={13} />
                      <span>Stock</span>
                    </button>

                    {/* Edit Details */}
                    <button
                      onClick={() => setEditingProduct({ ...product })}
                      className="p-1.5 text-gray-500 hover:text-slate-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                      title="Edit Product details"
                    >
                      <Edit3 size={15} />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDeleteProduct(product.id, product.titleEn)}
                      className="p-1.5 text-gray-400 hover:text-red-600 bg-gray-100 hover:bg-red-50 rounded-lg transition"
                      title="Delete Product from database"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adjust Multi-Store Inventory Modal */}
      {stockModalProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleAdjustStock}
            className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-gray-200"
          >
            <div className="flex items-start justify-between border-b pb-3">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                  <StoreIcon size={18} className="text-indigo-600" />
                  <span>Manage Store Stock & Adjustments</span>
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Product: <b className="text-slate-800">{stockModalProduct.titleEn}</b>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStockModalProduct(null)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>

            {/* Current Stock Across Stores */}
            <div>
              <label className="text-xs font-bold text-gray-600 block mb-2">Current Branch Breakdown:</label>
              <div className="grid grid-cols-2 gap-2 bg-gray-50 p-3 rounded-2xl border border-gray-200/80">
                {stockModalProduct.storeBreakdown && stockModalProduct.storeBreakdown.length > 0 ? (
                  stockModalProduct.storeBreakdown.map((sb: any) => (
                    <div key={sb.storeId} className="bg-white p-2 rounded-xl border border-gray-100 text-xs">
                      <span className="text-[11px] text-gray-500 block truncate">{sb.storeName}</span>
                      <span className="font-extrabold text-slate-900 text-sm">{sb.quantity} units</span>
                    </div>
                  ))
                ) : (
                  <span className="text-xs text-gray-500">Stock: {stockModalProduct.stockQuantity} units</span>
                )}
              </div>
            </div>

            {/* Select Target Store to Adjust */}
            <div>
              <label className="text-xs font-bold text-gray-600 block mb-1">Select Store Branch to Adjust</label>
              <select
                value={stockStoreId}
                onChange={(e) => setStockStoreId(e.target.value)}
                className="w-full text-xs p-2.5 border rounded-xl font-semibold text-slate-800 bg-white"
              >
                {stores.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.code})
                  </option>
                ))}
              </select>
            </div>

            {/* New Quantity */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1">New Verified Physical Count</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={stockAdjustmentQty}
                  onChange={(e) => setStockAdjustmentQty(Number(e.target.value))}
                  className="w-full text-xs p-2.5 border rounded-xl font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1">Reason for Adjustment</label>
                <select
                  value={stockReason}
                  onChange={(e) => setStockReason(e.target.value)}
                  className="w-full text-xs p-2.5 border rounded-xl font-semibold bg-white"
                >
                  <option value="RESTOCK">📦 Restock / Supplier Shipment</option>
                  <option value="STOCK_COUNT">📋 Physical Stock Count</option>
                  <option value="CORRECTION">⚙️ Inventory Correction</option>
                  <option value="DAMAGED">⚠️ Damaged / Disposed</option>
                  <option value="EXPIRED">⏳ Expired Batch</option>
                  <option value="LOST">🔍 Lost / Shrinkage</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600 block mb-1">Audit Note (Optional)</label>
              <input
                type="text"
                value={stockNote}
                onChange={(e) => setStockNote(e.target.value)}
                placeholder="e.g. Received shipment from Acuvue Qatar distributor"
                className="w-full text-xs p-2.5 border rounded-xl"
              />
            </div>

            <div className="bg-indigo-50/70 p-3 rounded-xl text-[11px] text-indigo-800 flex items-center gap-2">
              <AlertCircle size={14} className="shrink-0" />
              <span>
                Saving updates PostgreSQL immediately and recalculates the total quantity shown on the website and billing software.
              </span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setStockModalProduct(null)}
                className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl shadow hover:bg-slate-800"
              >
                {isSubmitting ? "Saving to DB..." : "Save Stock Adjustment"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleUpdateProduct}
            className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-200"
          >
            <div className="flex items-start justify-between border-b pb-3">
              <h3 className="font-extrabold text-slate-900 text-base">Edit Product</h3>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 block mb-1">Title (English)</label>
              <input
                type="text"
                required
                value={editingProduct.titleEn}
                onChange={(e) => setEditingProduct({ ...editingProduct, titleEn: e.target.value })}
                className="w-full text-xs p-2.5 border rounded-xl font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">SKU</label>
                <input
                  type="text"
                  required
                  value={editingProduct.sku}
                  onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                  className="w-full text-xs p-2.5 border rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">Brand</label>
                <input
                  type="text"
                  value={editingProduct.brandName}
                  onChange={(e) => setEditingProduct({ ...editingProduct, brandName: e.target.value })}
                  className="w-full text-xs p-2.5 border rounded-xl font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">Regular Price (QAR)</label>
                <input
                  type="number"
                  step="0.5"
                  required
                  value={editingProduct.basePriceQar}
                  onChange={(e) => setEditingProduct({ ...editingProduct, basePriceQar: e.target.value })}
                  className="w-full text-xs p-2.5 border rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">Sale Price (QAR)</label>
                <input
                  type="number"
                  step="0.5"
                  value={editingProduct.salePriceQar || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, salePriceQar: e.target.value })}
                  placeholder="Optional"
                  className="w-full text-xs p-2.5 border rounded-xl font-bold"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl shadow hover:bg-slate-800"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add New Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateProduct}
            className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-start justify-between border-b pb-3">
              <h3 className="font-extrabold text-slate-900 text-base">Add New Product</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>

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
                  className="w-full text-xs p-2.5 border rounded-xl bg-white"
                >
                  <option value="Bella">Bella</option>
                  <option value="Amara">Amara</option>
                  <option value="Lensme">Lensme</option>
                  <option value="Diva">Diva</option>
                  <option value="Acuvue">Acuvue</option>
                  <option value="Alcon">Alcon</option>
                  <option value="CooperVision">CooperVision</option>
                  <option value="EyeNova">EyeNova</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">Category Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full text-xs p-2.5 border rounded-xl bg-white"
                >
                  <option value="COLORED_CONTACT_LENSES">Colored Lenses</option>
                  <option value="MEDICAL_CONTACT_LENSES">Medical Clear Lenses</option>
                  <option value="LENS_SOLUTION_CARE">Solutions & Drops</option>
                  <option value="SPECTACLES">Eyeglasses Frame</option>
                  <option value="SUNGLASSES">Sunglasses</option>
                  <option value="LASHES_BEAUTY">Lashes</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">Price (QAR)</label>
                <input
                  type="number"
                  required
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="w-full text-xs p-2.5 border rounded-xl"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">Total Stock Quantity</label>
                <input
                  type="number"
                  required
                  value={newStock}
                  onChange={(e) => setNewStock(Number(e.target.value))}
                  className="w-full text-xs p-2.5 border rounded-xl"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl shadow hover:bg-slate-800"
              >
                {isSubmitting ? "Creating..." : "Save Product to PostgreSQL"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
