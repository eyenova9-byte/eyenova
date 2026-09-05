"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function DeleteAccountPage() {
  const { lang } = useLanguage();
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 font-sans">
      <div className="mb-8">
        <Link href="/" className="text-sm text-[#5c2d76] hover:underline mb-4 inline-block">
          ← {lang === "ar" ? "العودة للرئيسية" : "Back to Home"}
        </Link>
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#121212] tracking-tight">
          {lang === "ar" ? "طلب حذف الحساب" : "Delete My Account"}
        </h1>
        <p className="text-sm text-[#707070] mt-2">
          {lang === "ar"
            ? "نحترم خصوصيتك بالكامل. يمكنك طلب حذف حسابك وبياناتك المسجلة لدينا في أي وقت."
            : "We respect your privacy. You can request permanent deletion of your EyeNova account and stored data."}
        </p>
      </div>

      {submitted ? (
        <div className="bg-[#FAF5F2] border border-[#E8DED8] rounded-xl p-6 text-center space-y-3">
          <h3 className="text-lg font-semibold text-[#121212]">
            {lang === "ar" ? "تم استلام طلبك بنجاح" : "Request Received"}
          </h3>
          <p className="text-sm text-[#555555]">
            {lang === "ar"
              ? "سيتم مراجعة طلبك وحذف بيانات الحساب المرتبطة بالرقم المدخل خلال 48 ساعة."
              : "Our team will verify your request and remove your account records within 48 hours."}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-[#FAF5F2] border border-[#E8DED8] rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#121212] mb-1">
              {lang === "ar" ? "رقم الهاتف المسجل" : "Registered Phone Number"}
            </label>
            <input
              type="tel"
              required
              placeholder="+974 XXXX XXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-white border border-[#D5C7BF] px-3.5 py-2.5 rounded-lg text-sm text-[#121212] focus:outline-none focus:border-[#5c2d76]"
            />
          </div>
          <p className="text-xs text-[#707070]">
            {lang === "ar"
              ? "ملاحظة: سيؤدي حذف الحساب إلى إزالة سجل الطلبات ونقاط الولاء نهائياً."
              : "Note: Deleting your account will permanently remove your purchase history and loyalty points."}
          </p>
          <button
            type="submit"
            className="w-full bg-[#e11d48] hover:bg-[#be123c] text-white text-sm font-medium py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            {lang === "ar" ? "تأكيد طلب حذف الحساب" : "Confirm Account Deletion"}
          </button>
        </form>
      )}
    </div>
  );
}
