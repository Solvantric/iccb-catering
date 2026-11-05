import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { generatePageMetadata } from "@/lib/seo";
import { SITE_INFO } from "@/data/site";

export const metadata: Metadata = generatePageMetadata({
  title: "Terms & Conditions | ICCB Catering",
  description: "Terms and conditions governing event bookings and catering services by ICCB.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-6">
        <Breadcrumbs items={[{ label: "Terms of Service" }]} />
        <h1 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-950">
          TERMS & CONDITIONS
        </h1>
        <p className="text-xs text-ink-400">Effective: 1 January 2015 &bull; Revised: November 2026</p>

        <div className="space-y-4 text-xs sm:text-sm text-ink-700 leading-relaxed border-t border-ink-100 pt-6">
          <p>
            Welcome to <strong>{SITE_INFO.fullName}</strong>. By reserving hall dates, placing catering orders, or signing a banquet contract, clients agree to the following terms and guidelines.
          </p>

          <h3 className="font-display font-bold text-base uppercase text-ink-950 pt-3">
            1. Booking Confirmation & Payment Terms
          </h3>
          <p>
            An event date is officially confirmed only upon receipt of the agreed deposit (standard 25%) and formal contract signing. 50% of the remaining balance is due 14 days before the event following final menu sign-off. The final 25% balance is due on the event day prior to commencement.
          </p>

          <h3 className="font-display font-bold text-base uppercase text-ink-950 pt-3">
            2. Menu Finalization & Guest Headcount
          </h3>
          <p>
            Final guaranteed guest headcount and finalized dish selections must be locked in writing at least 7 days before the event to enable proper live slaughtering and raw ingredient procurement. Increases in headcount can be accommodated up to 48 hours in advance based on kitchen capacity.
          </p>

          <h3 className="font-display font-bold text-base uppercase text-ink-950 pt-3">
            3. Hygiene & Outside Food Policy
          </h3>
          <p>
            To uphold our strict HACCP food safety standards and modern slaughterhouse certifications, no outside cooked food or perishable catering items may be brought into ICCB premises without prior written authorization from the Executive Chef.
          </p>
        </div>
      </div>
    </div>
  );
}

