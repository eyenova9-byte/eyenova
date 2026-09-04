"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { FileText, Printer, ArrowLeft, Eye, CheckCircle } from "lucide-react";

export default function AdminInvoicesPage() {
  const { t } = useLanguage();

  const [invoices, setInvoices] = useState([
    {
      id: "inv-1",
      invoiceNumber: "INV-2026-00841",
      orderNumber: "EN-QAT-984210",
      customerName: "Fatima Al-Kuwari",
      date: "2026-08-28",
      subtotalQar: 260,
      taxTotalQar: 0,
      deliveryFeeQar: 15,
      totalQar: 275,
      status: "ISSUED",
      companyProfile: {
        nameEn: "EyeNova Optical & Eye Care",
        nameAr: "عين نوفا للبصريات والعناية بالعين",
        crNumber: "CR-974-88392",
        vatNumber: "VAT-QAT-00129",
        addressEn: "Shop 12, Villaggio Mall, Doha, Qatar",
        phone: "+974 4411 2233",
      },
    },
  ]);

  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

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
                {t.manageInvoices}
              </h1>
              <p className="text-xs text-gray-500">
                Generate, view, and print Qatar POS receipts & official tax invoices.
              </p>
            </div>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden mb-8">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-100 font-extrabold text-slate-700">
              <tr>
                <th className="p-4">Invoice #</th>
                <th className="p-4">Linked Order</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Total (QAR)</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50/50">
                  <td className="p-4 font-mono font-extrabold text-slate-900">{inv.invoiceNumber}</td>
                  <td className="p-4 font-mono text-slate-600 font-bold">{inv.orderNumber}</td>
                  <td className="p-4 font-bold text-slate-800">{inv.customerName}</td>
                  <td className="p-4 text-gray-500">{inv.date}</td>
                  <td className="p-4 font-extrabold text-slate-900">{inv.totalQar} QAR</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition flex items-center gap-1.5 ml-auto"
                    >
                      <Printer size={14} />
                      <span>{t.printInvoice}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Printable Tax Invoice Card View */}
        {selectedInvoice && (
          <div className="bg-white p-8 rounded-3xl border border-gray-300 shadow-xl max-w-2xl mx-auto font-sans space-y-6">
            {/* Invoice Header */}
            <div className="flex justify-between items-start border-b border-gray-200 pb-6">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 text-emerald-400 flex items-center justify-center font-bold">
                    <Eye size={18} />
                  </div>
                  <h2 className="text-xl font-black text-slate-900">
                    {selectedInvoice.companyProfile.nameEn}
                  </h2>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {selectedInvoice.companyProfile.addressEn} • Phone: {selectedInvoice.companyProfile.phone}
                </p>
                <div className="text-[11px] text-gray-600 font-semibold mt-1">
                  CR#: <span className="font-mono text-slate-900">{selectedInvoice.companyProfile.crNumber}</span> | VAT#: <span className="font-mono text-slate-900">{selectedInvoice.companyProfile.vatNumber}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 block">
                  Official Tax Invoice
                </span>
                <span className="text-base font-extrabold text-slate-900 font-mono">
                  {selectedInvoice.invoiceNumber}
                </span>
                <span className="text-xs text-gray-400 block">{selectedInvoice.date}</span>
              </div>
            </div>

            {/* Customer Details */}
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex justify-between text-xs font-medium">
              <div>
                <span className="text-gray-400 block font-bold uppercase text-[10px]">Billed To:</span>
                <span className="font-bold text-slate-900">{selectedInvoice.customerName}</span>
              </div>
              <div className="text-right">
                <span className="text-gray-400 block font-bold uppercase text-[10px]">Order Reference:</span>
                <span className="font-mono font-bold text-slate-900">{selectedInvoice.orderNumber}</span>
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between font-bold text-slate-700 border-b border-gray-100 pb-2">
                <span>Item Description</span>
                <span>Amount (QAR)</span>
              </div>
              <div className="flex justify-between py-1 font-medium text-slate-900">
                <span>Bella Diamond Gray Shadow Contact Lenses (2 boxes)</span>
                <span>260.00 QAR</span>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="pt-4 border-t border-gray-200 text-xs space-y-1.5 text-right font-medium">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal:</span>
                <span className="font-bold">{selectedInvoice.subtotalQar}.00 QAR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">VAT (0% Qatar):</span>
                <span>0.00 QAR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery Fee:</span>
                <span>{selectedInvoice.deliveryFeeQar}.00 QAR</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-gray-200">
                <span>Total Amount Paid:</span>
                <span>{selectedInvoice.totalQar}.00 QAR</span>
              </div>
            </div>

            {/* Footer Print Trigger */}
            <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-xs">
              <span className="text-gray-400">Thank you for choosing EyeNova Optical Qatar!</span>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-900 text-white font-extrabold rounded-xl hover:bg-slate-800 transition flex items-center gap-1.5 shadow"
              >
                <Printer size={14} />
                <span>Print Document</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
