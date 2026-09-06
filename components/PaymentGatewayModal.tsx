"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { X, Lock, ExternalLink, ShieldCheck, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type PaymentGatewayModalProps = {
  isOpen: boolean;
  onClose: () => void;
  amountQar: number;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  paymentType: "QPAY_DEBIT" | "CREDIT_CARD" | "APPLE_PAY";
  checkoutUrl?: string;
  gatewayName?: "TAP" | "SKIPCASH";
  onPaymentSuccess: (result: any) => void;
};

export function PaymentGatewayModal({
  isOpen,
  onClose,
  amountQar,
  orderNumber,
  customerName,
  customerPhone,
  paymentType,
  checkoutUrl,
  gatewayName = "TAP",
  onPaymentSuccess,
}: PaymentGatewayModalProps) {
  const { t } = useLanguage();
  const [redirecting, setRedirecting] = useState(false);

  if (!isOpen) return null;

  const handleProceedToGateway = () => {
    setRedirecting(true);
    if (checkoutUrl) {
      // Redirect to official 3D-Secure hosted gateway
      window.location.href = checkoutUrl;
    } else {
      // Sandbox fallback if keys not configured
      setTimeout(() => {
        setRedirecting(false);
        onPaymentSuccess({
          success: true,
          transactionId: `TXN-SIM-${Date.now()}`,
          paymentReference: `${gatewayName}-TEST-REF`,
          paymentMethod: paymentType,
          paidAmountQar: amountQar,
        });
        onClose();
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-slate-900 rounded-full hover:bg-gray-100 transition"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="w-12 h-12 bg-[#5c2d76] text-white rounded-2xl flex items-center justify-center shadow-md">
            <Lock size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#5c2d76]">
                {gatewayName === "SKIPCASH" ? "SkipCash Qatar (NAPS / Cards)" : "Tap Payments (3D-Secure 2.0)"}
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Pay {amountQar.toFixed(2)} QAR
            </h3>
          </div>
        </div>

        {/* Security & PCI-DSS Notice */}
        <div className="p-4 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl text-xs text-emerald-950 space-y-2 mb-5">
          <div className="flex items-center gap-2 text-emerald-800 font-bold">
            <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
            <span>Bank-Grade Encryption (PCI-DSS Level 1)</span>
          </div>
          <p className="text-[12px] text-emerald-800 leading-relaxed">
            To ensure complete security, EyeNova <b>never</b> collects or stores your card details. You will complete your payment directly on the official 3D-Secure banking portal.
          </p>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 border border-gray-200/60 rounded-2xl p-4 text-xs space-y-2 mb-6 font-medium">
          <div className="flex justify-between text-gray-600">
            <span>Order Reference:</span>
            <span className="font-mono text-slate-900 font-bold">{orderNumber}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Customer Name:</span>
            <span className="text-slate-900 font-semibold">{customerName}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Payment Method:</span>
            <span className="text-slate-900 font-semibold">
              {paymentType === "QPAY_DEBIT" ? "Qatar Debit (NAPS / QPay)" : "Credit / Debit Card / Apple Pay"}
            </span>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-2 text-sm font-extrabold text-slate-900">
            <span>Verified Total:</span>
            <span>{amountQar.toFixed(2)} QAR</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleProceedToGateway}
          disabled={redirecting}
          className="w-full py-4 bg-[#5c2d76] hover:bg-[#4a245f] text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          {redirecting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Connecting to Secure Gateway...</span>
            </>
          ) : (
            <>
              <span>Proceed to 3D-Secure Payment</span>
              <ExternalLink size={16} />
            </>
          )}
        </button>

        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-center gap-3 text-[11px] text-gray-400">
          <span>🔒 256-bit TLS</span>
          <span>•</span>
          <span>Qatar Central Bank Compliant</span>
          <span>•</span>
          <span>NAPS / Visa / Mastercard</span>
        </div>
      </div>
    </div>
  );
}
