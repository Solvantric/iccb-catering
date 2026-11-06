"use client";

import React from "react";
import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";
import { REAL_FAQS, SITE_FACTS } from "@/content/content";

export function FAQSection() {
  const faqItems = REAL_FAQS.map((f) => ({
    id: f.id,
    title: f.question,
    content: f.answer,
  }));

  return (
    <section className="py-24 lg:py-32 bg-paper text-ink border-b border-rule">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-baseline justify-between border-b border-rule pb-3 mb-16">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent font-semibold">
            &sect; 08 / FAQ
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
            Information
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Hotline Note */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <h2 className="font-serif text-4xl sm:text-5xl font-normal leading-tight">
              Direct answers to <em className="italic text-accent">common queries.</em>
            </h2>
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed font-mono">
              Key guidance on booking procedures, venue access, hall amenities, and location along 300 ft highway.
            </p>

            <div className="border border-rule p-6 bg-paper-2 space-y-2">
              <p className="font-mono text-[10px] uppercase tracking-widest text-accent font-semibold">
                Direct Booking Desk
              </p>
              <p className="text-xs font-mono text-ink">
                Hotline:{" "}
                <a href={`tel:${SITE_FACTS.bookingPhones[1]}`} className="font-bold underline underline-offset-4 hover:text-accent">
                  {SITE_FACTS.bookingPhones[1]}
                </a>
              </p>
              <p className="text-xs font-mono text-ink">
                Email:{" "}
                <a href={`mailto:${SITE_FACTS.bookingEmail}`} className="font-bold underline underline-offset-4 hover:text-accent">
                  {SITE_FACTS.bookingEmail}
                </a>
              </p>
            </div>
          </div>

          {/* Right Column: Two-Column/Full Accordion */}
          <div className="lg:col-span-7">
            <Accordion items={faqItems} />
          </div>
        </div>
      </div>
    </section>
  );
}
