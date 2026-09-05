"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ShoppingBag, Eye, CheckCircle, Clock, ArrowLeft, FileText, Check, Database, RefreshCw } from "lucide-react";

type OrderPrescriptionDetails = {
  odSph?: string;
  osSph?: string;
  odAdd?: string;
  osAdd?: string;
  pd?: string;
  optometrist?: string;
  isVerified?: boolean;
};

type OrderItemType = {
  title: string;
  rightPower?: string;
  rightBoxes?: number;
  leftPower?: string;
  leftBoxes?: number;
  priceQar: number;
};

type AdminOrder = {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  district: string;
  status: string;
  totalQar: number;
  items: OrderItemType[];
  prescriptionDetails: OrderPrescriptionDetails;
};

export default function AdminOrdersPage() {
  const { t } = useLanguage();
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [inspectModal, setInspectModal] = useState<AdminOrder | null>(null);

  const loadOrders = () => {
    setLoading(true);
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.orders && data.orders.length > 0) {
          setOrders(data.orders);
        } else {
          setOrders([
            {
              id: "ord-101",
              orderNumber: "EN-QAT-984210",
              customerName: "Fatima Al-Kuwari",
              phone: "+974 5512 3456",
              district: "West Bay, Doha",
              status: "PRESCRIPTION_REVIEW",
              totalQar: 473,
              items: [
                {
                  title: "1 Day Acuvue Moist 90 Pack",
                  rightPower: "-2.50",
                  rightBoxes: 1,
                  leftPower: "-2.00",
                  leftBoxes: 1,
                  priceQar: 428,
                },
              ],
              prescriptionDetails: {
                odSph: "-2.50",
                osSph: "-2.00",
                pd: "63.0",
                optometrist: "Dr. Al-Mansoori Optics Clinic",
                isVerified: false,
              },
            },
          ]);
        }
      })
      .catch((err) => console.error("Error fetching orders:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleVerifyPrescription = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: "IN_LAB_PRODUCTION",
              prescriptionDetails: { ...o.prescriptionDetails, isVerified: true },
            }
          : o
      )
    );
    setInspectModal(null);
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
                {t.manageOrders}
              </h1>
              <p className="text-xs text-gray-500">
                Review incoming Qatar orders and verify submitted optical prescriptions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadOrders}
              disabled={loading}
              className="p-2.5 bg-white border border-gray-200 rounded-xl text-slate-700 hover:bg-gray-100 flex items-center gap-1.5 text-xs font-semibold"
              title="Refresh database records"
            >
              <RefreshCw size={14} className={loading ? "animate-spin text-emerald-600" : ""} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <div className="hidden md:flex items-center gap-1.5 px-3 py-2 bg-emerald-50 border border-emerald-200/80 rounded-xl text-emerald-700 text-xs font-bold">
              <Database size={13} />
              <span>PostgreSQL ({orders.length} Orders)</span>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-100 font-extrabold text-slate-700">
              <tr>
                <th className="p-4">Order Number</th>
                <th className="p-4">Customer</th>
                <th className="p-4">District</th>
                <th className="p-4">Status</th>
                <th className="p-4">Total (QAR)</th>
                <th className="p-4 text-right">Prescription Review</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50">
                  <td className="p-4 font-mono font-bold text-slate-900">{order.orderNumber}</td>
                  <td className="p-4">
                    <span className="font-bold text-slate-900 block">{order.customerName}</span>
                    <span className="text-[10px] text-gray-400">{order.phone}</span>
                  </td>
                  <td className="p-4 text-gray-600 font-bold">{order.district}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                        order.status === "PRESCRIPTION_REVIEW"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}
                    >
                      {order.status === "PRESCRIPTION_REVIEW" ? "⏳ Needs Approval" : "✓ In Production"}
                    </span>
                  </td>
                  <td className="p-4 font-extrabold text-slate-900">{order.totalQar} QAR</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setInspectModal(order)}
                      className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition"
                    >
                      Inspect Optics
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Prescription Inspection Modal */}
      {inspectModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base">
                Optics Review • {inspectModal.orderNumber}
              </h3>
              <button
                onClick={() => setInspectModal(null)}
                className="text-xs text-gray-400 hover:text-slate-900 font-bold"
              >
                Close
              </button>
            </div>

            <div className="text-xs space-y-1">
              <span className="font-bold text-slate-900 block">{inspectModal.customerName}</span>
              <span className="text-gray-500 block">{inspectModal.district} • {inspectModal.phone}</span>
            </div>

            {/* Prescription Numbers Breakdown */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 text-xs">
              <span className="font-bold text-slate-900 block border-b border-slate-200 pb-1">
                Submitted Prescription Values
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-700 block text-[11px] mb-1">Right Eye (OD)</span>
                  <div className="font-extrabold text-slate-900">SPH: {inspectModal.prescriptionDetails.odSph}</div>
                  {inspectModal.prescriptionDetails.odAdd && (
                    <div>ADD: {inspectModal.prescriptionDetails.odAdd}</div>
                  )}
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-700 block text-[11px] mb-1">Left Eye (OS)</span>
                  <div className="font-extrabold text-slate-900">SPH: {inspectModal.prescriptionDetails.osSph}</div>
                  {inspectModal.prescriptionDetails.osAdd && (
                    <div>ADD: {inspectModal.prescriptionDetails.osAdd}</div>
                  )}
                </div>
              </div>

              {inspectModal.prescriptionDetails.pd && (
                <div className="text-[11px] text-slate-600 font-medium">
                  Pupillary Distance: <span className="font-bold text-slate-900">{inspectModal.prescriptionDetails.pd} mm</span>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setInspectModal(null)}
                className="px-4 py-2 text-xs font-bold text-gray-500"
              >
                Cancel
              </button>
              {!inspectModal.prescriptionDetails.isVerified && (
                <button
                  onClick={() => handleVerifyPrescription(inspectModal.id)}
                  className="px-5 py-2.5 bg-emerald-600 text-white text-xs font-extrabold rounded-xl hover:bg-emerald-500 transition flex items-center gap-1.5"
                >
                  <Check size={16} />
                  <span>{t.verifyPrescription}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
