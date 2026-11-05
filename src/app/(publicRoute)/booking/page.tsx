import React from "react";
import { Metadata } from "next";
import { BookingForm } from "@/components/forms/BookingForm";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Book an Event or Hall | ICCB Catering & Venues",
  description:
    "Reserve your event date for wedding banquets, corporate summits, or outdoor catering with ICCB Catering.",
  path: "/booking",
});

export default function BookingPage() {
  return (
    <div className="bg-white py-12">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-4">
          <Breadcrumbs items={[{ label: "Book an Event" }]} />
        </div>

        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="font-serif italic text-brand-600 text-lg font-semibold block">
            ~ Date Reservation ~
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-ink-950">
            EVENT DATE BOOKING
          </h1>
          <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
            Reserve your preferred date across ICCB&apos;s 4 grand convention halls or for off-premises catering in Greater Dhaka.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white p-6 sm:p-10 rounded-3xl border border-ink-100 shadow-soft">
          <BookingForm />
        </div>
      </div>
    </div>
  );
}

