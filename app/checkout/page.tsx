"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { PaymentGatewayModal } from "@/components/PaymentGatewayModal";
import { PaymentResult } from "@/lib/paymentGateway";
import {
  CheckCircle2,
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  Phone,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Lock,
} from "lucide-react";

export default function CheckoutPage() {
  const { t, isRtl } = useLanguage();
  const { items, subtotalQar, clearCart } = useCart();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("+974 5512 3456");
  const [email, setEmail] = useState("");
  const [district, setDistrict] = useState("Doha");
  const [zoneNo, setZoneNo] = useState("");
  const [streetNo, setStreetNo] = useState("");
  const [buildingNo, setBuildingNo] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"QPAY_DEBIT" | "CREDIT_CARD" | "COD">("QPAY_DEBIT");

  const [isGatewayOpen, setIsGatewayOpen] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);

  const deliveryFee = subtotalQar >= 250 ? 0 : 15;
  const grandTotal = subtotalQar + deliveryFee;

  const handleStartCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === "COD") {
      // Process Cash on Delivery directly
      submitFinalOrder({
        success: true,
        transactionId: `COD-${Date.now()}`,
        paymentReference: "CASH_ON_DELIVERY",
        paidAmountQar: grandTotal,
        paymentMethod: "COD",
        status: "PAID",
      });
    } else {
      // Launch Real Online Payment Gateway (QPay / Card)
      setIsGatewayOpen(true);
    }
  };

  const submitFinalOrder = async (payResult: PaymentResult) => {
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: fullName,
          customerPhone: phone,
          customerEmail: email,
          deliveryZone: district,
          shippingAddress: { district, zoneNo, streetNo, buildingNo },
          paymentMethod: payResult.paymentMethod,
          paymentReference: payResult.paymentReference,
          transactionId: payResult.transactionId,
          items,
          subtotalQar,
          deliveryFeeQar: deliveryFee,
          totalQar: grandTotal,
        }),
      });
      const data = await res.json();
      setOrderId(data.orderNumber || `EYE-QAT-${Math.floor(100000 + Math.random() * 900000)}`);
    } catch {
      setOrderId(`EYE-QAT-${Math.floor(100000 + Math.random() * 900000)}`);
    }
    setPaymentResult(payResult);
    setIsOrdered(true);
    clearCart();
  };

  if (isOrdered) {
    return (
      <div className="py-16 sm:py-24 bg-gray-50 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-6 sm:p-10 max-w-lg w-full text-center border border-gray-100 shadow-2xl space-y-5">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner">
            <CheckCircle2 size={36} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t.orderSuccessTitle}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            {t.orderSuccessDesc} <span className="font-extrabold text-slate-900">{orderId}</span>
          </p>

          {/* Payment Gateway Receipt Details */}
          {paymentResult && paymentResult.paymentMethod !== "COD" && (
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-xs text-left space-y-1.5 font-medium">
              <div className="flex justify-between">
                <span className="text-gray-500">Payment Status:</span>
                <span className="font-bold text-emerald-600">✓ PAID Online</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Gateway Ref:</span>
                <span className="font-mono text-slate-900 font-bold">{paymentResult.paymentReference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Transaction ID:</span>
                <span className="font-mono text-slate-600 text-[11px]">{paymentResult.transactionId}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-1.5 font-extrabold text-slate-900">
                <span>Amount Paid:</span>
                <span>{grandTotal} QAR</span>
              </div>
            </div>
          )}

          <div className="bg-emerald-50 border border-emerald-100 p-3.5 rounded-2xl text-xs text-emerald-800 font-medium">
            {t.orderTrackingNotice}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <Link
              href="/profile"
              className="py-3 px-4 bg-slate-900 text-white font-extrabold text-xs rounded-2xl hover:bg-slate-800 transition"
            >
              {t.myOrders}
            </Link>
            <Link
              href="/shop"
              className="py-3 px-4 bg-gray-100 text-slate-900 font-extrabold text-xs rounded-2xl hover:bg-gray-200 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t.checkoutTitle}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Complete your order with secure online Qatar payment or cash on delivery.
          </p>
        </div>

        <form onSubmit={handleStartCheckout} className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Form Fields: Responsive 2-column layout on Desktop, 1-col on mobile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Details */}
            <div className="bg-white p-5 sm:p-7 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2 border-b border-gray-100 pb-3">
                <Phone size={18} className="text-emerald-600" />
                <span>{t.customerInfo}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">
                    {t.fullName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sheikh Hamad Al-Thani"
                    className="w-full text-xs font-semibold p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">
                    {t.mobilePhone} *
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+974 5512 3456"
                    className="w-full text-xs font-semibold p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Qatar Shipping Address */}
            <div className="bg-white p-5 sm:p-7 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2 border-b border-gray-100 pb-3">
                <MapPin size={18} className="text-emerald-600" />
                <span>{t.shippingAddress}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">
                    {t.cityDistrict} *
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full text-xs font-bold p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none"
                  >
                    <option value="Doha">Doha</option>
                    <option value="Lusail">Lusail</option>
                    <option value="Al Rayyan">Al Rayyan</option>
                    <option value="Al Wakrah">Al Wakrah</option>
                    <option value="West Bay">West Bay</option>
                    <option value="The Pearl">The Pearl Qatar</option>
                    <option value="Al Khor">Al Khor</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">
                    {t.zoneNo} (Optional)
                  </label>
                  <input
                    type="text"
                    value={zoneNo}
                    onChange={(e) => setZoneNo(e.target.value)}
                    placeholder="e.g. Zone 55 (Al Aziziya)"
                    className="w-full text-xs font-semibold p-3 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">
                    {t.streetNo} *
                  </label>
                  <input
                    type="text"
                    required
                    value={streetNo}
                    onChange={(e) => setStreetNo(e.target.value)}
                    placeholder="e.g. Street 840"
                    className="w-full text-xs font-semibold p-3 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">
                    {t.buildingVillaNo} *
                  </label>
                  <input
                    type="text"
                    required
                    value={buildingNo}
                    onChange={(e) => setBuildingNo(e.target.value)}
                    placeholder="e.g. Villa 24 / Building 12"
                    className="w-full text-xs font-semibold p-3 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Real Online Payment Gateway Selector */}
            <div className="bg-white p-5 sm:p-7 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                  <CreditCard size={18} className="text-emerald-600" />
                  <span>Real Online Payment Gateway</span>
                </h3>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <Lock size={12} /> 256-Bit Encrypted
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Qatar Debit Card (QPay / NAPS) */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("QPAY_DEBIT")}
                  className={`p-4 rounded-2xl border text-xs font-bold flex flex-col items-start gap-1 transition ${
                    paymentMethod === "QPAY_DEBIT"
                      ? "border-slate-900 bg-slate-900 text-white shadow-md"
                      : "border-gray-200 bg-gray-50 text-slate-800 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <CreditCard size={18} className="text-emerald-400" />
                    <span className="font-extrabold">QPay / NAPS</span>
                  </div>
                  <span className="text-[10px] opacity-80">Qatar Local Debit Cards</span>
                </button>

                {/* Credit / Debit Card (Visa / Mastercard) */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("CREDIT_CARD")}
                  className={`p-4 rounded-2xl border text-xs font-bold flex flex-col items-start gap-1 transition ${
                    paymentMethod === "CREDIT_CARD"
                      ? "border-slate-900 bg-slate-900 text-white shadow-md"
                      : "border-gray-200 bg-gray-50 text-slate-800 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Lock size={18} className="text-indigo-400" />
                    <span className="font-extrabold">Credit Card</span>
                  </div>
                  <span className="text-[10px] opacity-80">Visa & Mastercard</span>
                </button>

                {/* Cash on Delivery */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("COD")}
                  className={`p-4 rounded-2xl border text-xs font-bold flex flex-col items-start gap-1 transition ${
                    paymentMethod === "COD"
                      ? "border-slate-900 bg-slate-900 text-white shadow-md"
                      : "border-gray-200 bg-gray-50 text-slate-800 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Banknote size={18} className="text-amber-400" />
                    <span className="font-extrabold">Pay on Delivery</span>
                  </div>
                  <span className="text-[10px] opacity-80">Cash upon arrival</span>
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary Column */}
          <div className="bg-white p-5 sm:p-7 rounded-3xl border border-gray-200/80 shadow-sm h-fit space-y-6">
            <h3 className="font-extrabold text-slate-900 text-sm border-b border-gray-100 pb-3">
              Order Summary ({items.length} items)
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 truncate max-w-[180px]">
                    {item.quantity}x {item.titleEn}
                  </span>
                  <span className="font-extrabold text-slate-900">
                    {(item.unitPriceQar + (item.lensPriceQar || 0)) * item.quantity} QAR
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2 text-xs">
              <div className="flex justify-between text-gray-500 font-medium">
                <span>{t.subtotal}</span>
                <span>{subtotalQar} QAR</span>
              </div>
              <div className="flex justify-between text-gray-500 font-medium">
                <span>{t.deliveryFee}</span>
                <span className="text-emerald-600 font-bold">
                  {deliveryFee === 0 ? t.freeDelivery : "15 QAR"}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-gray-100">
                <span>{t.grandTotal}</span>
                <span>{grandTotal} QAR</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-slate-900 text-white font-extrabold text-xs rounded-2xl hover:bg-slate-800 transition shadow-lg flex items-center justify-center gap-2"
            >
              {paymentMethod === "COD" ? (
                <>
                  <span>Confirm Order (Cash on Delivery)</span>
                  <ArrowRight size={16} />
                </>
              ) : (
                <>
                  <Lock size={15} className="text-emerald-400" />
                  <span>Proceed to Payment ({grandTotal} QAR)</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Online Payment Gateway Sheet / Modal */}
      <PaymentGatewayModal
        isOpen={isGatewayOpen}
        onClose={() => setIsGatewayOpen(false)}
        amountQar={grandTotal}
        orderNumber={`EN-QAT-${Math.floor(100000 + Math.random() * 900000)}`}
        customerName={fullName}
        customerPhone={phone}
        paymentType={paymentMethod as "QPAY_DEBIT" | "CREDIT_CARD"}
        onPaymentSuccess={submitFinalOrder}
      />
    </div>
  );
}
