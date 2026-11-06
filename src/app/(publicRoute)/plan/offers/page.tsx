import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingContactBlock } from "@/components/sections/BookingContactBlock";
import { SITE_FACTS } from "@/content/content";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Current Offers | ICCB Event Planning",
  description: "Seasonal banquet and venue booking arrangements at International Convention City Bashundhara.",
  path: "/plan/offers",
});

export default function OffersPage() {
  return (
    <div className="bg-paper text-ink min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 space-y-12">
        <Breadcrumbs
          items={[
            { label: "Plan Your Event", href: "/plan/wedding" },
            { label: "Current Offers" },
          ]}
        />

        <div className="space-y-4 border-b border-rule pb-8">
          <span className="mono text-ink-soft">§ Promotions</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ink tracking-tight">
            Current <span className="italic text-accent">Offers</span>
          </h1>
          <p className="text-base sm:text-lg text-ink-soft max-w-3xl leading-relaxed">
            Special seasonal packages and event arrangements are customized based on the nature, scale, and timing of each booking.
          </p>
        </div>

        <div className="border border-rule p-8 bg-paper-2 space-y-4">
          <span className="mono text-accent">§ Official Notice</span>
          <h2 className="font-serif text-2xl text-ink">Please contact our booking team</h2>
          <p className="text-sm text-ink-soft leading-relaxed">
            All seasonal arrangements, combination discounts, and customized banquet privileges are managed directly through our reservations desk. Please reach out to our team with your desired date range and event specifications to receive current offerings.
          </p>
        </div>
      </div>

      <BookingContactBlock
        title="Inquire With Our Booking Team"
        subtitle="Speak directly with our reservations desk for custom pricing and seasonal dates."
      />
    </div>
  );
}

