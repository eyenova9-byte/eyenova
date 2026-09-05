"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function RefundPolicyPage() {
  const { lang } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 font-sans">
      <div className="mb-8">
        <Link href="/" className="text-sm text-[#5c2d76] hover:underline mb-4 inline-block">
          ← {lang === "ar" ? "العودة للرئيسية" : "Back to Home"}
        </Link>
        <h1 className="text-3xl font-semibold text-[#121212] tracking-tight">
          {lang === "ar" ? "سياسة الاستبدال والاسترجاع" : "Refund & Return Policy"}
        </h1>
        <p className="text-sm text-[#707070] mt-2">
          {lang === "ar" ? "وفقاً للوائح حماية المستهلك في دولة قطر" : "In accordance with Qatar Consumer Protection Regulations"}
        </p>
      </div>

      <div className="prose prose-neutral max-w-none space-y-6 text-[#444444] text-sm sm:text-base leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-[#121212] mb-2">
            {lang === "ar" ? "1. شروط الاسترجاع للعدسات اللاصقة" : "1. Contact Lenses Return Conditions"}
          </h2>
          <p>
            {lang === "ar"
              ? "نظراً لأن العدسات اللاصقة ومنتجات العناية بالعين هي منتجات طبية وشخصية معقمة، يُشترط للاسترجاع أو الاستبدال أن تكون العلبة غير مفتوحة إطلاقاً، وفي غلافها الأصلي المختوم وبحالتها الأصلية كما استلمتها خلال 14 يوماً من تاريخ الشراء."
              : "Because contact lenses and solutions are sterile medical products regulated by MOPH Qatar, items eligible for return or exchange must be completely unopened, sealed in their original packaging, in pristine condition within 14 days of purchase."}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[#121212] mb-2">
            {lang === "ar" ? "2. المنتجات التالفة أو الخاطئة" : "2. Defective or Incorrect Items"}
          </h2>
          <p>
            {lang === "ar"
              ? "في حال استلام منتج تالف من المصنع أو غير مطابق للطلب، نلتزم باستبداله فوراً دون أي تكلفة شحن إضافية أو رد كامل المبلغ المدفوع."
              : "If you receive a defective or incorrectly fulfilled item, we will immediately replace it with free same-day courier dispatch or issue a full refund."}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[#121212] mb-2">
            {lang === "ar" ? "3. طريقة تقديم طلب الاسترجاع" : "3. How to Request a Return"}
          </h2>
          <p>
            {lang === "ar"
              ? "تواصل معنا مباشرة عبر الواتساب على +974 5512 3456 مع إرفاق رقم الفاتورة وصورة للمنتج المختوم، وسيقوم فريق التوصيل باستلام المنتج وتأكيد الإرجاع."
              : "Simply message our Qatar customer team on WhatsApp (+974 5512 3456) with your order number, and our courier will arrange pickup."}
          </p>
        </section>
      </div>
    </div>
  );
}
