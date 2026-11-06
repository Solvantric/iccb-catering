import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingContactBlock } from "@/components/sections/BookingContactBlock";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Latest Events & Calendar | ICCB",
  description: "Public event schedule, expos, trade shows, and fairs hosted at International Convention City Bashundhara.",
  path: "/events",
});

export default function EventsPage() {
  return (
    <div className="bg-paper text-ink min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 space-y-12">
        <Breadcrumbs items={[{ label: "Events" }]} />

        <div className="space-y-4 border-b border-rule pb-8">
          <span className="mono text-ink-soft">§ Calendar</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ink tracking-tight">
            Latest <span className="italic text-accent">Events</span>
          </h1>
          <p className="text-base sm:text-lg text-ink-soft max-w-3xl leading-relaxed">
            International Convention City Bashundhara regularly hosts major international trade expos, consumer exhibitions, cultural performances, and corporate summits.
          </p>
        </div>

        <div className="border border-rule p-8 bg-paper-2 space-y-4">
          <span className="mono text-ink-soft">§ Event Calendar & Registration</span>
          <p className="text-sm text-ink-soft leading-relaxed">
            For current public expo schedules, ticketing details, or host organizer inquiries, please contact our event relations desk directly.
          </p>
        </div>
      </div>

      <BookingContactBlock
        title="Host Your Event at ICCB"
        subtitle="Speak with our calendar scheduling desk to verify hall availability for upcoming dates."
      />
    </div>
  );
}

