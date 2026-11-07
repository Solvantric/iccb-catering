"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FAQS } from "@/data/faqs";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";

const categories = [
  { id: "All", label: "All Questions" },
  { id: "General", label: "General" },
  { id: "Booking & Payment", label: "Booking & Payment" },
  { id: "Menu & Tasting", label: "Menu & Tasting" },
  { id: "Logistics", label: "Logistics & Transport" },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredFaqs = activeCategory === "All"
    ? FAQS
    : FAQS.filter((f) => f.category === activeCategory);

  const accordionItems = filteredFaqs.map((f) => ({
    id: f.id,
    title: f.question,
    content: f.answer,
  }));

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-white dark:bg-ink-950 text-ink-950 dark:text-white py-16 sm:py-20 relative text-center border-b border-ink-100 dark:border-white/10 transition-colors">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ label: "FAQs" }]} />
          </div>
          <span className="font-serif italic text-brand-600 dark:text-brand-400 text-lg font-semibold block">
            ~ Help & Answers ~
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-ink-950 dark:text-white">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about booking catering with ICCB: minimum guests, food tasting appointments, hygiene standards, and event logistics.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-6 bg-brand-50/40 border-b border-brand-100">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <Tabs
            tabs={categories}
            activeTab={activeCategory}
            onChange={setActiveCategory}
          />
        </div>
      </section>

      {/* Accordion List */}
      <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Accordion items={accordionItems} />

        {/* Contact Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-brand-50 border border-brand-100 text-center space-y-3">
          <h3 className="font-display font-bold text-xl uppercase text-ink-950">
            Didn&apos;t find your question?
          </h3>
          <p className="text-xs text-ink-600 max-w-md mx-auto">
            Contact our dedicated catering consultation hotline directly. We are happy to walk you through any details.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link href="/contact">
              <Button size="sm" variant="primary">
                Contact Banquet Desk
              </Button>
            </Link>
            <Link href="/inquiry">
              <Button size="sm" variant="outline">
                Submit an Inquiry
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

