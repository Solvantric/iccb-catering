import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingContactBlock } from "@/components/sections/BookingContactBlock";
import { SITE_FACTS } from "@/content/content";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Rates & Fees | ICCB Venue Booking",
  description: "Official venue rental schedules, technical rider specifications, and banqueting fee structures.",
  path: "/plan/rates",
});

export default function RatesPage() {
  return (
    <div className="bg-paper text-ink min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 space-y-12">
        <Breadcrumbs
          items={[
            { label: "Plan Your Event", href: "/plan/wedding" },
            { label: "Rates & Fees" },
          ]}
        />

        <div className="space-y-4 border-b border-rule pb-8">
          <span className="mono text-ink-soft">§ Tariff Schedule</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ink tracking-tight">
            Rates & <span className="italic text-accent">Fees</span>
          </h1>
          <p className="text-base sm:text-lg text-ink-soft max-w-3xl leading-relaxed">
            Venue rental rates, utility allocations, technical riders, and banqueting tariffs are determined according to hall selection, day shift, and event requirements.
          </p>
        </div>

        <div className="border border-rule p-8 bg-paper-2 space-y-4">
          <span className="mono text-accent">§ Official Notice</span>
          <h2 className="font-serif text-2xl text-ink">Please contact our booking team</h2>
          <p className="text-sm text-ink-soft leading-relaxed">
            Official tariff sheets, session breakdown options (morning, evening, full day), and catering rate cards are provided upon direct inquiry with our booking office. Please contact our team with your expected attendance and preferred dates for a customized proposal.
          </p>
        </div>
      </div>

      <BookingContactBlock
        title="Request Official Tariff Sheet"
        subtitle="Our booking team will provide current rates and slot availability for your chosen halls."
      />
    </div>
  );
}

