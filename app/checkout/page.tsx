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
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [checkoutSession, setCheckoutSession] = useState<{
    checkoutUrl?: string;
    orderNumber?: string;
    gateway?: "TAP" | "SKIPCASH";
  } | null>(null);

  const deliveryFee = subtotalQar >= 250 ? 0 : 15;
  const grandTotal = subtotalQar + deliveryFee;

  const handleStartCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutError("");
    setLoadingCheckout(true);

    try {
      const cleanPhone = phone.trim().replace(/\s+/g, "");
      const res = await fetch("/api/orders/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: fullName.trim() || "Valued Customer",
          customerPhone: cleanPhone.startsWith("+") ? cleanPhone : `+974${cleanPhone.replace(/^974/, "")}`,
          customerEmail: email.trim() || undefined,
          district: district || "Doha",
          streetAddress: `Zone ${zoneNo || "00"}, Street ${streetNo || "00"}, Building ${buildingNo || "00"}`,
          paymentMethod: paymentMethod === "COD" ? "CASH_ON_DELIVERY" : paymentMethod === "QPAY_DEBIT" ? "DEBIT_CARD_QPAY" : "CREDIT_CARD",
          preferredGateway: paymentMethod === "QPAY_DEBIT" ? "SKIPCASH" : "TAP",
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            isContactLensOrder: Boolean(item.isContactLens),
            isPlano: Boolean(item.isPlano),
            rightEyePower: item.rightEyePower ? Number(item.rightEyePower) : undefined,
            leftEyePower: item.leftEyePower ? Number(item.leftEyePower) : undefined,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setCheckoutError(data.error || "Failed to process checkout. Please check your information.");
        setLoadingCheckout(false);
        return;
      }

      if (data.isCod) {
        setOrderId(data.orderNumber);
        setPaymentResult({
          success: true,
          transactionId: `COD-${data.orderNumber}`,
          paymentReference: `COD-${data.orderNumber}`,
          paymentMethod: "COD",
          paidAmountQar: data.totalQar,
          status: "PAID",
        });
        setIsOrdered(true);
        clearCart();
        return;
      }

      // Online payment session created
      setCheckoutSession({
        checkoutUrl: data.checkoutUrl,
        orderNumber: data.orderNumber,
        gateway: data.gateway,
      });
      setIsGatewayOpen(true);
    } catch {
      setCheckoutError("Network error. Please try again.");
    } finally {
      setLoadingCheckout(false);
    }
  };

  const handleOnlinePaymentFinished = (result: any) => {
    setOrderId(checkoutSession?.orderNumber || `EN-QAT-${Date.now()}`);
    setPaymentResult({
      success: true,
      transactionId: result.transactionId || `TXN-${Date.now()}`,
      paymentReference: result.paymentReference || "ONLINE-CONFIRMED",
      paymentMethod: paymentMethod,
      paidAmountQar: grandTotal,
      status: "PAID",
    });
    setIsOrdered(true);
    clearCart();
  };

  if (isOrdered) {
    return (
      <div className="py-16 sm:py-24 bg-white min-h-screen flex items-center justify-center p-4">
        <div className="bg-white border border-[#e5e5e5] p-6 sm:p-10 max-w-lg w-full text-center space-y-5">
          <div className="w-16 h-16 bg-[#f8edeb] text-[#121212] rounded-full flex items-center justify-center mx-auto mb-2">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal text-[#121212]">
            {t.orderSuccessTitle}
          </h2>
          <p className="text-[13px] text-[#707070]">
            {t.orderSuccessDesc} <span className="font-medium text-[#121212]">{orderId}</span>
          </p>

          {/* Payment Gateway Receipt Details */}
          {paymentResult && paymentResult.paymentMethod !== "COD" && (
            <div className="p-4 bg-white border border-[#e5e5e5] text-[13px] text-left space-y-2 font-normal">
              <div className="flex justify-between">
                <span className="text-[#707070]">Payment Status:</span>
                <span className="font-medium text-[#186b2b]">✓ PAID Online</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#707070]">Gateway Ref:</span>
                <span className="font-mono text-[#121212]">{paymentResult.paymentReference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#707070]">Transaction ID:</span>
                <span className="font-mono text-[#707070] text-[12px]">{paymentResult.transactionId}</span>
              </div>
              <div className="flex justify-between border-t border-[#e5e5e5] pt-2 font-medium text-[#121212]">
                <span>Amount Paid:</span>
                <span>{grandTotal} QAR</span>
              </div>
            </div>
          )}

          <div className="bg-[#f8edeb] border border-[#e8dcd9] p-3.5 text-[13px] text-[#121212] font-normal">
            {t.orderTrackingNotice}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <Link
              href="/profile"
              className="py-3 px-4 bg-[#121212] text-white text-[13px] uppercase tracking-[0.06em] font-medium hover:bg-black transition text-center"
            >
              {t.myOrders}
            </Link>
            <Link
              href="/shop"
              className="py-3 px-4 border border-[#121212] text-[#121212] text-[13px] uppercase tracking-[0.06em] font-medium hover:bg-[#f8edeb] transition text-center"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 bg-white min-h-screen text-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-normal text-[#121212]">
            {t.checkoutTitle}
          </h1>
          <p className="text-[13px] text-[#707070] mt-1">
            Complete your order with secure online Qatar payment or cash on delivery.
          </p>
        </div>

        <form onSubmit={handleStartCheckout} className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Form Fields: 2-column on Desktop, 1-col on mobile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Details */}
            <div className="bg-white p-5 sm:p-7 border border-[#e5e5e5] space-y-4">
              <h3 className="font-normal text-[#121212] text-[15px] sm:text-[16px] flex items-center gap-2 border-b border-[#e5e5e5] pb-3">
                <Phone size={16} className="text-[#121212]" />
                <span>{t.customerInfo}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[12px] font-normal text-[#707070] block mb-1">
                    {t.fullName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sheikh Hamad Al-Thani"
                    className="w-full text-[13px] text-[#121212] p-3 bg-white border border-[#d2d2d2] focus:border-[#121212] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-normal text-[#707070] block mb-1">
                    {t.mobilePhone} *
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+974 5512 3456"
                    className="w-full text-[13px] text-[#121212] p-3 bg-white border border-[#d2d2d2] focus:border-[#121212] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Qatar Shipping Address */}
            <div className="bg-white p-5 sm:p-7 border border-[#e5e5e5] space-y-4">
              <h3 className="font-normal text-[#121212] text-[15px] sm:text-[16px] flex items-center gap-2 border-b border-[#e5e5e5] pb-3">
                <MapPin size={16} className="text-[#121212]" />
                <span>{t.shippingAddress}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[12px] font-normal text-[#707070] block mb-1">
                    {t.cityDistrict} *
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full text-[13px] text-[#121212] p-3 bg-white border border-[#d2d2d2] focus:border-[#121212] focus:outline-none"
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
                  <label className="text-[12px] font-normal text-[#707070] block mb-1">
                    {t.zoneNo} (Optional)
                  </label>
                  <input
                    type="text"
                    value={zoneNo}
                    onChange={(e) => setZoneNo(e.target.value)}
                    placeholder="e.g. Zone 55 (Al Aziziya)"
                    className="w-full text-[13px] text-[#121212] p-3 bg-white border border-[#d2d2d2] focus:border-[#121212] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-normal text-[#707070] block mb-1">
                    {t.streetNo} *
                  </label>
                  <input
                    type="text"
                    required
                    value={streetNo}
                    onChange={(e) => setStreetNo(e.target.value)}
                    placeholder="e.g. Street 840"
                    className="w-full text-[13px] text-[#121212] p-3 bg-white border border-[#d2d2d2] focus:border-[#121212] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-normal text-[#707070] block mb-1">
                    {t.buildingVillaNo} *
                  </label>
                  <input
                    type="text"
                    required
                    value={buildingNo}
                    onChange={(e) => setBuildingNo(e.target.value)}
                    placeholder="e.g. Villa 24 / Building 12"
                    className="w-full text-[13px] text-[#121212] p-3 bg-white border border-[#d2d2d2] focus:border-[#121212] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Real Online Payment Gateway Selector */}
            <div className="bg-white p-5 sm:p-7 border border-[#e5e5e5] space-y-4">
              <div className="flex justify-between items-center border-b border-[#e5e5e5] pb-3">
                <h3 className="font-normal text-[#121212] text-[15px] sm:text-[16px] flex items-center gap-2">
                  <CreditCard size={16} className="text-[#121212]" />
                  <span>Payment Method</span>
                </h3>
                <span className="text-[11px] bg-[#f8edeb] text-[#121212] font-normal px-2.5 py-0.5 border border-[#e8dcd9] flex items-center gap-1">
                  <Lock size={11} /> 256-Bit Encrypted
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Qatar Debit Card (QPay / NAPS) */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("QPAY_DEBIT")}
                  className={`p-4 border text-[13px] flex flex-col items-start gap-1 transition cursor-pointer ${
                    paymentMethod === "QPAY_DEBIT"
                      ? "border-[#121212] bg-[#121212] text-white"
                      : "border-[#d2d2d2] bg-white text-[#121212] hover:border-[#121212]"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <CreditCard size={16} />
                    <span className="font-medium">QPay / NAPS</span>
                  </div>
                  <span className="text-[11px] opacity-75">Qatar Local Debit Cards</span>
                </button>

                {/* Credit / Debit Card (Visa / Mastercard) */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("CREDIT_CARD")}
                  className={`p-4 border text-[13px] flex flex-col items-start gap-1 transition cursor-pointer ${
                    paymentMethod === "CREDIT_CARD"
                      ? "border-[#121212] bg-[#121212] text-white"
                      : "border-[#d2d2d2] bg-white text-[#121212] hover:border-[#121212]"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Lock size={16} />
                    <span className="font-medium">Credit Card</span>
                  </div>
                  <span className="text-[11px] opacity-75">Visa & Mastercard</span>
                </button>

                {/* Cash on Delivery */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("COD")}
                  className={`p-4 border text-[13px] flex flex-col items-start gap-1 transition cursor-pointer ${
                    paymentMethod === "COD"
                      ? "border-[#121212] bg-[#121212] text-white"
                      : "border-[#d2d2d2] bg-white text-[#121212] hover:border-[#121212]"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Banknote size={16} />
                    <span className="font-medium">Pay on Delivery</span>
                  </div>
                  <span className="text-[11px] opacity-75">Cash upon arrival</span>
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary Column */}
          <div className="bg-white p-5 sm:p-7 border border-[#e5e5e5] h-fit space-y-5">
            <h3 className="font-normal text-[#121212] text-[15px] sm:text-[16px] border-b border-[#e5e5e5] pb-3">
              Order Summary ({items.length} items)
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-[13px]">
                  <span className="font-normal text-[#121212] truncate max-w-[180px]">
                    {item.quantity}x {item.titleEn}
                  </span>
                  <span className="font-normal text-[#121212]">
                    {(item.unitPriceQar + (item.lensPriceQar || 0)) * item.quantity} QAR
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#e5e5e5] space-y-2 text-[13px]">
              <div className="flex justify-between text-[#707070] font-normal">
                <span>{t.subtotal}</span>
                <span>{subtotalQar} QAR</span>
              </div>
              <div className="flex justify-between text-[#707070] font-normal">
                <span>{t.deliveryFee}</span>
                <span className="text-[#186b2b]">
                  {deliveryFee === 0 ? t.freeDelivery : "15 QAR"}
                </span>
              </div>
              <div className="flex justify-between text-[15px] font-normal text-[#121212] pt-2 border-t border-[#e5e5e5]">
                <span>{t.grandTotal}</span>
                <span>{grandTotal} QAR</span>
              </div>
            </div>

            {checkoutError && (
              <div className="p-3 bg-red-50 text-red-700 text-xs font-medium border border-red-200">
                {checkoutError}
              </div>
            )}

            <button
              type="submit"
              disabled={loadingCheckout}
              className="w-full py-3.5 bg-[#121212] text-white text-[13px] uppercase tracking-[0.06em] font-medium hover:bg-black transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {loadingCheckout ? (
                <span>Validating Order with Server...</span>
              ) : paymentMethod === "COD" ? (
                <>
                  <span>Confirm Order (Cash on Delivery)</span>
                  <ArrowRight size={15} />
                </>
              ) : (
                <>
                  <Lock size={14} />
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
        orderNumber={checkoutSession?.orderNumber || `EN-QAT-${Math.floor(100000 + Math.random() * 900000)}`}
        customerName={fullName}
        customerPhone={phone}
        paymentType={paymentMethod as "QPAY_DEBIT" | "CREDIT_CARD"}
        checkoutUrl={checkoutSession?.checkoutUrl}
        gatewayName={checkoutSession?.gateway}
        onPaymentSuccess={handleOnlinePaymentFinished}
      />
    </div>
  );
}
