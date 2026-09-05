"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyPage() {
  const { lang } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 font-sans">
      <div className="mb-8">
        <Link href="/" className="text-sm text-[#5c2d76] hover:underline mb-4 inline-block">
          ← {lang === "ar" ? "العودة للرئيسية" : "Back to Home"}
        </Link>
        <h1 className="text-3xl font-semibold text-[#121212] tracking-tight">
          {lang === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
        </h1>
        <p className="text-sm text-[#707070] mt-2">
          {lang === "ar" ? "حماية خصوصيتكم هي أولويتنا في عين نوفا" : "Your privacy and data security are our top priority at EyeNova."}
        </p>
      </div>

      <div className="prose prose-neutral max-w-none space-y-6 text-[#444444] text-sm sm:text-base leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-[#121212] mb-2">
            {lang === "ar" ? "1. المعلومات التي نجمعها" : "1. Information We Collect"}
          </h2>
          <p>
            {lang === "ar"
              ? "نقوم بجمع المعلومات اللازمة فقط لمعالجة وتوصيل طلباتكم، بما في ذلك: الاسم، ورقم الهاتف القطري لتأكيد الطلب عبر الرسائل القصيرة/الواتساب، وعنوان التوصيل في قطر، وتفاصيل وصفة النظر عند شراء العدسات الطبية."
              : "We collect only information essential to process and deliver your optical orders, including your name, Qatar mobile phone number for order/OTP verification, delivery address, and optical prescription details when ordering medical lenses."}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[#121212] mb-2">
            {lang === "ar" ? "2. أمان المدفوعات" : "2. Payment Security"}
          </h2>
          <p>
            {lang === "ar"
              ? "تتم معالجة جميع المعاملات المالية عبر بوابات دفع آمنة ومشفرة ومتوافقة مع معايير مصرف قطر المركزي (QCB) وبوابة QPay الوطنية. لا نقوم بتخزين أي أرقام بطاقات ائتمانية على خوادمنا."
              : "All digital payments are processed through secure, PCI-DSS certified Qatar Central Bank compliant gateways including QPay and Apple Pay. We never store credit card numbers on our servers."}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[#121212] mb-2">
            {lang === "ar" ? "3. حقوق الخصوصية وحذف البيانات" : "3. Your Privacy Rights"}
          </h2>
          <p>
            {lang === "ar"
              ? "يحق للعميل في أي وقت طلب مراجعة بياناته أو تعديلها أو طلب حذف حسابه نهائياً من خلال قسم 'حذف الحساب' أو بالتواصل مع الدعم الفني."
              : "You have full rights to inspect, update, or request deletion of your personal account data at any time via our Delete Account portal or by contacting customer support."}
          </p>
        </section>
      </div>
    </div>
  );
}
