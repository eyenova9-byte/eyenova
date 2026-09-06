"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronDown, HelpCircle, MessageCircle, Phone } from "lucide-react";

export default function FAQPage() {
  const { lang } = useLanguage();

  const faqs = [
    {
      qEn: "How fast is delivery in Qatar?",
      qAr: "ما هي سرعة التوصيل داخل دولة قطر؟",
      aEn: "We offer Same-Day Express Delivery for orders confirmed before 6:00 PM across Doha, Lusail, Al Rayyan, Al Wakrah, and surrounding areas. Delivery usually takes 2 to 4 hours.",
      aAr: "نوفر خدمة التوصيل السريع في نفس اليوم لجميع الطلبات المؤكدة قبل الساعة 6:00 مساءً في الدوحة، لوسيل، الريان، الوكرة، وكافة مناطق قطر، وتصلكم خلال ساعتين إلى 4 ساعات.",
    },
    {
      qEn: "Can I order different prescription powers for each eye?",
      qAr: "هل يمكنني طلب قياسات نظر مختلفة لكل عين؟",
      aEn: "Yes! EyeNova uniquely supports dual-eye optical configuration. When ordering contact lenses, simply select your Right Eye (OD) sphere/cylinder power and Left Eye (OS) power, along with the desired box count for each.",
      aAr: "نعم بالتأكيد! توفر عين نوفا ميزة تحديد مقاس مختلف للعين اليمنى (OD) ومقاس مختلف للعين اليسرى (OS) مع تحديد عدد العلب المطلوبة لكل عين بكل سهولة.",
    },
    {
      qEn: "Are all your lenses approved by Qatar Ministry of Public Health (MOPH)?",
      qAr: "هل جميع العدسات مرخصة من وزارة الصحة العامة في قطر؟",
      aEn: "100% Yes. We only retail genuine medical and cosmetic lenses sourced from authorized manufacturers and verified under Qatar MOPH standards.",
      aAr: "نعم بنسبة 100%. جميع العدسات الطبية والملونة أصلية ومعتمدة رسمياً ومطابقة لمعايير وزارة الصحة العامة في دولة قطر.",
    },
    {
      qEn: "What payment methods are accepted?",
      qAr: "ما هي طرق الدفع المتاحة لديكم؟",
      aEn: "We accept QPay (Qatar National Debit Card Gateway), Apple Pay, mada, VISA, Mastercard, American Express, and Cash on Delivery (COD).",
      aAr: "نقبل الدفع عبر بوابة كيو باي (QPay) لبطاقات الخصم القطرية، وApple Pay، وبطاقات مدى، وفيزا، وماستركارد، وأمريكان إكسبريس، بالإضافة للدفع نقداً عند الاستلام.",
    },
    {
      qEn: "What is your return and refund policy?",
      qAr: "ما هي سياسة الاستبدال والاسترجاع؟",
      aEn: "For hygiene and medical safety, contact lenses must be unopened, in their factory-sealed box, and reported within 14 days of purchase. Damaged or defective items are replaced immediately free of charge.",
      aAr: "حرصاً على سلامتكم الطبية، يُشترط للاسترجاع أن تكون علب العدسات غير مفتوحة وفي غلافها المصنعي الأصلي خلال 14 يوماً من الشراء. ويتم استبدال أي منتج تالف فوراً دون أي رسوم.",
    },
    {
      qEn: "What does '0.00 / Plano' mean for colored lenses?",
      qAr: "ماذا تعني قوة '0.00 / Plano' في العدسات الملونة؟",
      aEn: "'Plano' or 0.00 means cosmetic colored lenses without prescription vision correction, suitable for anyone wanting to change eye color without affecting sight.",
      aAr: "كلمة 'Plano' أو 0.00 تعني عدسات تجميلية ملونة بدون درجات تصحيح نظر، وهي مخصصة لمن يرغبون في تغيير لون العين فقط دون التأثير على الرؤية.",
    },
    {
      qEn: "How can I contact customer care for help with my prescription?",
      qAr: "كيف يمكنني التواصل مع خدمة العملاء للمساعدة في وصفتي الطبية؟",
      aEn: "Our licensed optometrists are available 24/7 on WhatsApp at +974 5512 3456. You can also send a photo of your doctor's prescription note, and we will configure your lenses for you.",
      aAr: "فريقنا وأخصائيو البصريات متاحون لمساعدتكم على مدار الساعة عبر الواتساب على +974 5512 3456. يمكنكم ببساطة تصوير وصفتكم الطبية وسنقوم بضبط القياسات لكم.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-white min-h-screen font-sans pb-16">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#FAF5F2] to-white py-12 sm:py-16 border-b border-[#F0E6DF] text-center px-4">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8DED8] text-[#5c2d76] text-xs font-medium shadow-2xs">
            <HelpCircle size={14} />
            <span>{lang === "ar" ? "مركز المساعدة والأسئلة" : "Help & Knowledge Base"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-[#121212] tracking-tight">
            {lang === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
          </h1>
          <p className="text-sm sm:text-base text-[#666666]">
            {lang === "ar"
              ? "إليك إجابات مفصلة حول طلب العدسات، التوصيل في قطر، والقياسات الطبية."
              : "Everything you need to know about lens ordering, express delivery in Qatar, and prescriptions."}
          </p>
        </div>
      </section>

      {/* Accordion List */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-[#E8DED8] rounded-xl overflow-hidden transition-all bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-medium text-base text-[#121212] hover:bg-[#FAF5F2] transition-colors cursor-pointer"
                >
                  <span className="leading-snug">{lang === "ar" ? faq.qAr : faq.qEn}</span>
                  <ChevronDown
                    size={18}
                    className={`text-[#707070] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#5c2d76]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-[#555555] leading-relaxed border-t border-[#F0E6DF] bg-[#FAF5F2]/40 animate-fade-in">
                    {lang === "ar" ? faq.aAr : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Instant Contact & Support Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#FAF5F2] border border-[#E8DED8] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-semibold text-[#121212]">
              {lang === "ar" ? "هل لديك أي استفسار آخر؟" : "Still have questions?"}
            </h4>
            <p className="text-xs text-[#707070]">
              {lang === "ar"
                ? "فريق الدعم وأخصائيو البصريات جاهزون لمساعدتك فوراً عبر الواتساب أو البريد الإلكتروني"
                : "Our optical specialists and customer concierge are ready to assist you on WhatsApp or official email"}
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2 text-xs">
              <a href="mailto:support@eyenova.com.qa" className="text-[#5c2d76] hover:underline font-mono">
                support@eyenova.com.qa
              </a>
              <span className="text-[#D5C7BF]">•</span>
              <a href="mailto:info@eyenova.com.qa" className="text-[#5c2d76] hover:underline font-mono">
                info@eyenova.com.qa
              </a>
            </div>
          </div>
          <a
            href="https://wa.me/97455123456"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-medium px-5 py-3 rounded-full transition-colors shadow-xs shrink-0"
          >
            <MessageCircle size={16} />
            <span>{lang === "ar" ? "محادثة عبر الواتساب (+974 5512 3456)" : "Chat on WhatsApp (+974 5512 3456)"}</span>
          </a>
        </div>
      </section>
    </div>
  );
}
