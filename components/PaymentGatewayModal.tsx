"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { processOnlinePayment, PaymentResult } from "@/lib/paymentGateway";
import { X, Lock, CreditCard, ShieldCheck, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type PaymentGatewayModalProps = {
  isOpen: boolean;
  onClose: () => void;
  amountQar: number;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  paymentType: "QPAY_DEBIT" | "CREDIT_CARD" | "APPLE_PAY";
  onPaymentSuccess: (result: PaymentResult) => void;
};

export function PaymentGatewayModal({
  isOpen,
  onClose,
  amountQar,
  orderNumber,
  customerName,
  customerPhone,
  paymentType,
  onPaymentSuccess,
}: PaymentGatewayModalProps) {
  const { t } = useLanguage();

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState(customerName || "");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState<"card" | "3ds" | "success">("card");
  const [error, setError] = useState("");
  const [otpCode, setOtpCode] = useState("");

  if (!isOpen) return null;

  // Format Card Number (adds spaces every 4 digits)
  const handleCardNumberChange = (val: string) => {
    const raw = val.replace(/\D/g, "").slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formatted);
  };

  // Format Expiry (MM/YY)
  const handleExpiryChange = (val: string) => {
    const raw = val.replace(/\D/g, "").slice(0, 4);
    if (raw.length >= 2) {
      setExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`);
    } else {
      setExpiry(raw);
    }
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cardNumber.replace(/\s/g, "").length < 15) {
      setError("Please enter a valid card number.");
      return;
    }
    if (expiry.length < 5) {
      setError("Please enter a valid MM/YY expiration date.");
      return;
    }
    if (cvv.length < 3) {
      setError("Please enter a 3-digit CVV.");
      return;
    }

    setError("");
    setProcessing(true);

    // Simulate 3D-Secure Bank Redirect
    setTimeout(() => {
      setProcessing(false);
      setStep("3ds");
    }, 1200);
  };

  const handleAuthorize3DS = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    const result = await processOnlinePayment({
      amountQar,
      currency: "QAR",
      orderNumber,
      customerName,
      customerPhone,
      paymentMethod: paymentType,
      cardDetails: {
        cardNumber,
        cardHolder,
        expiryDate: expiry,
        cvv,
      },
    });

    setProcessing(false);
    if (result.success) {
      setStep("success");
      setTimeout(() => {
        onPaymentSuccess(result);
        onClose();
      }, 1500);
    } else {
      setError(result.errorMessage || "Payment declined by issuing bank.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative overflow-hidden">
        {/* Close Button */}
        {step !== "success" && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-gray-400 hover:text-slate-900 rounded-full hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>
        )}

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="w-12 h-12 bg-slate-900 text-emerald-400 rounded-2xl flex items-center justify-center shadow-md">
            <Lock size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">
                {paymentType === "QPAY_DEBIT" ? "Qatar NAPS / QPay Gateway" : "Secure Payment Gateway"}
              </span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900">
              Pay {amountQar} QAR
            </h3>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100 flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Step 1: Card Details */}
        {step === "card" && (
          <form onSubmit={handlePay} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                required
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                placeholder="Name as printed on card"
                className="w-full text-xs font-bold p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={cardNumber}
                  onChange={(e) => handleCardNumberChange(e.target.value)}
                  placeholder="4000 1234 5678 9010"
                  className="w-full text-xs font-mono font-bold p-3 pr-10 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:bg-white focus:outline-none"
                />
                <CreditCard size={18} className="absolute right-3 top-3 text-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Expiry (MM/YY)
                </label>
                <input
                  type="text"
                  required
                  value={expiry}
                  onChange={(e) => handleExpiryChange(e.target.value)}
                  placeholder="12/28"
                  className="w-full text-xs font-mono font-bold p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:bg-white focus:outline-none text-center"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  CVV / CVC
                </label>
                <input
                  type="password"
                  required
                  maxLength={4}
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                  placeholder="123"
                  className="w-full text-xs font-mono font-bold p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:bg-white focus:outline-none text-center"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full py-4 bg-slate-900 text-white font-extrabold text-xs rounded-2xl hover:bg-slate-800 transition shadow-lg flex items-center justify-center gap-2 mt-4"
            >
              {processing ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Connecting to Bank...</span>
                </>
              ) : (
                <span>Pay {amountQar} QAR Securely</span>
              )}
            </button>
          </form>
        )}

        {/* Step 2: 3D Secure / QPay Bank Verification */}
        {step === "3ds" && (
          <form onSubmit={handleAuthorize3DS} className="space-y-4 text-center">
            <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl text-xs text-indigo-900 space-y-2">
              <ShieldCheck size={28} className="mx-auto text-indigo-600" />
              <h4 className="font-extrabold text-sm text-indigo-950">
                Qatar Central Bank 3D-Secure
              </h4>
              <p className="text-[11px] text-indigo-800">
                A verification code has been sent by your Qatar issuing bank to your registered phone.
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                Enter Bank SMS Code
              </label>
              <input
                type="text"
                required
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="123456"
                className="w-40 mx-auto text-center text-lg font-mono font-extrabold p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:bg-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full py-3.5 bg-emerald-600 text-white font-extrabold text-xs rounded-2xl hover:bg-emerald-500 transition shadow-lg flex items-center justify-center gap-2"
            >
              {processing ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Authorizing Payment...</span>
                </>
              ) : (
                <span>Confirm & Authorize {amountQar} QAR</span>
              )}
            </button>
          </form>
        )}

        {/* Step 3: Success */}
        {step === "success" && (
          <div className="text-center py-6 space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Payment Successful!
            </h3>
            <p className="text-xs text-gray-500">
              Your payment of {amountQar} QAR was approved and authorized.
            </p>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-center gap-4 text-[11px] text-gray-400">
          <span>🔒 256-bit TLS Encryption</span>
          <span>•</span>
          <span>PCI-DSS Certified</span>
          <span>•</span>
          <span>Qatar NAPS</span>
        </div>
      </div>
    </div>
  );
}
