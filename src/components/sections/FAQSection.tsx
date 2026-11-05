"use client";

import React from "react";
import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";
import { FAQS } from "@/data/faqs";
import { Button } from "@/components/ui/Button";

export function FAQSection() {
  const faqItems = FAQS.slice(0, 5).map((f) => ({
    id: f.id,
    title: f.question,
    content: f.answer,
  }));

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading & Support Note */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <span className="font-serif italic text-brand-600 text-lg font-semibold block">
              ~ Clear Answers ~
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-ink-950 leading-tight">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
              Have specific questions regarding guest minimums, tasting appointments, outside venues, or payment terms? We are here to help.
            </p>

            <div className="pt-4 space-y-3">
              <div className="p-5 rounded-2xl bg-brand-50/70 border border-brand-100 text-left">
                <p className="text-xs font-bold uppercase text-brand-700 tracking-wider">
                  Still have queries?
                </p>
                <p className="text-xs text-ink-600 mt-1">
                  Our dedicated catering consultation hotline is available 7 days a week.
                </p>
                <a
                  href="tel:+8801991197719"
                  className="inline-block mt-3 font-display font-bold text-sm text-brand-600 hover:text-brand-700"
                >
                  +88-01991-197719 &rarr;
                </a>
              </div>

              <div>
                <Link href="/faq">
                  <Button variant="outline" size="sm">
                    View All FAQs
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
