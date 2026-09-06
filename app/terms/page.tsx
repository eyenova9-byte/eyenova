"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function TermsPage() {
  const { lang } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 font-sans">
      <div className="mb-8">
        <Link href="/" className="text-sm text-[#5c2d76] hover:underline mb-4 inline-block">
          ← {lang === "ar" ? "العودة للرئيسية" : "Back to Home"}
        </Link>
        <h1 className="text-3xl font-semibold text-[#121212] tracking-tight">
          {lang === "ar" ? "الشروط والأحكام" : "Terms of Service"}
        </h1>
        <p className="text-sm text-[#707070] mt-2">
          {lang === "ar" ? "آخر تحديث: سبتمبر 2026" : "Last updated: September 2026"}
        </p>
      </div>

      <div className="prose prose-neutral max-w-none space-y-6 text-[#444444] text-sm sm:text-base leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-[#121212] mb-2">
            {lang === "ar" ? "1. نظرة عامة" : "1. Overview"}
          </h2>
          <p>
            {lang === "ar"
              ? "مرحباً بكم في متجر عين نوفا قطر. تنطبق هذه الشروط والأحكام على جميع عمليات الشراء واستخدام الموقع الإلكتروني الخاص بنا. بدخولك إلى هذا الموقع، فإنك توافق على الالتزام بجميع القوانين واللوائح المعمول بها في دولة قطر."
              : "Welcome to EyeNova Qatar. These Terms of Service apply to all purchases and use of our optical e-commerce platform. By accessing or using our service, you agree to be bound by applicable laws and regulations of the State of Qatar."}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[#121212] mb-2">
            {lang === "ar" ? "2. المنتجات والوصفات الطبية" : "2. Prescription & Medical Contact Lenses"}
          </h2>
          <p>
            {lang === "ar"
              ? "جميع العدسات الطبية المباعة عبر منصتنا معتمدة ومرخصة من وزارة الصحة العامة في قطر (MOPH). يتحمل العميل مسؤولية التأكد من صحة قياسات النظر المدخلة من قبل أخصائي البصريات."
              : "All medical contact lenses sold through EyeNova are licensed and approved by the Ministry of Public Health (MOPH) in Qatar. Customers are responsible for providing valid and accurate prescription parameters obtained from an authorized eye care professional."}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[#121212] mb-2">
            {lang === "ar" ? "3. التوصيل والمدفوعات" : "3. Delivery & Payments"}
          </h2>
          <p>
            {lang === "ar"
              ? "نقدم خدمة التوصيل بنفس اليوم داخل مدينة الدوحة ومناطق قطر لجميع الطلبات المؤكدة قبل الموعد المحدد. نقبل الدفع عبر كيو باي (QPay)، وبطاقات مدى، وApple Pay، والبطاقات الائتمانية والدفع عند الاستلام."
              : "We provide same-day express delivery across Doha and all regions in Qatar for orders placed before daily cutoff times. We accept QPay, mada, Apple Pay, credit cards, and cash on delivery."}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[#121212] mb-2">
            {lang === "ar" ? "4. خدمة العملاء والدعم" : "4. Customer Inquiries & Contact"}
          </h2>
          <p>
            {lang === "ar"
              ? "لأي استفسارات حول الطلبات أو الشروط، يمكنكم التواصل مع فريق خدمة العملاء عبر الواتساب على +974 5512 3456 أو البريد الإلكتروني support@eyenova.com.qa."
              : "For any questions regarding orders or our terms, please contact our support concierge via WhatsApp at +974 5512 3456 or email support@eyenova.com.qa."}
          </p>
        </section>
      </div>
    </div>
  );
}
