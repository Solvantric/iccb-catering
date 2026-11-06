"use client";

import React from "react";
import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";
import { FAQS } from "@/data/faqs";
import { Button } from "@/components/ui/Button";
import { useUIStore } from "@/store/uiStore";
import { translations } from "@/lib/i18n";

export function FAQSection() {
  const { locale } = useUIStore();
  const t = translations[locale].faq;

  const faqItems = FAQS.slice(0, 5).map((f) => ({
    id: f.id,
    title: locale === "bn" && f.questionBn ? f.questionBn : f.question,
    content: locale === "bn" && f.answerBn ? f.answerBn : f.answer,
  }));

  return (
    <section className="py-24 bg-white dark:bg-ink-950 relative transition-colors">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading & Support Note */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <span className="font-serif italic text-brand-600 dark:text-brand-400 text-lg font-semibold block">
              {t.tag}
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-ink-950 dark:text-ink-50 leading-tight">
              {t.heading}
            </h2>
            <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
              {t.subtitle}
            </p>

            <div className="pt-4 space-y-3">
              <div className="p-5 rounded-2xl bg-brand-50/70 dark:bg-ink-900 border border-brand-100 dark:border-white/10 text-left">
                <p className="text-xs font-bold uppercase text-brand-700 dark:text-brand-400 tracking-wider">
                  {t.needMore}
                </p>
                <p className="text-xs text-ink-600 dark:text-ink-300 mt-1">
                  {t.callSupport}
                </p>
                <a
                  href="tel:+8801991197719"
                  className="inline-block mt-3 font-display font-bold text-sm text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300"
                >
                  +88-01991-197719 &rarr;
                </a>
              </div>

              <div>
                <Link href="/faq">
                  <Button variant="outline" size="sm" className="dark:border-white/20 dark:text-ink-100">
                    {t.viewAll}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7">
            <Accordion items={faqItems} />
          </div>
        </div>
      </div>
    </section>
  );
}

