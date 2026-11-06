"use client";

import React, { useState } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingContactBlock } from "@/components/sections/BookingContactBlock";
import { REAL_FAQS } from "@/content/content";
import { ChevronDown } from "lucide-react";

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(REAL_FAQS[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-paper text-ink min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 space-y-12">
        <Breadcrumbs items={[{ label: "Frequently Asked Questions" }]} />

        <div className="space-y-4 border-b border-rule pb-8">
          <span className="mono text-ink-soft">§ 08 / Questions</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ink tracking-tight">
            Frequently Asked <span className="italic text-accent">Questions</span>
          </h1>
          <p className="text-base sm:text-lg text-ink-soft leading-relaxed">
            Essential information regarding booking procedures, venue infrastructure, location access, and on-site hospitality.
          </p>
        </div>

        <div className="border-t border-rule divide-y divide-rule">
          {REAL_FAQS.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="py-6">
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between text-left gap-4 group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4">
                    <span className="mono text-ink-soft">0{index + 1}</span>
                    <h3 className="font-serif text-xl sm:text-2xl text-ink group-hover:text-accent transition-colors">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-ink-soft shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-accent" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="pt-4 pl-8 sm:pl-10 text-sm text-ink-soft leading-relaxed max-w-2xl">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <BookingContactBlock
        title="Still Have Questions?"
        subtitle="Our venue coordination team is available via direct phone and email to clarify specific requirements."
      />
    </div>
  );
}
