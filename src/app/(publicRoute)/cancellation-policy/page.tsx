import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { generatePageMetadata } from "@/lib/seo";
import { SITE_INFO } from "@/data/site";

export const metadata: Metadata = generatePageMetadata({
  title: "Cancellation & Refund Policy | ICCB Catering",
  description: "Official cancellation timelines and refund guidelines for banquet bookings at ICCB.",
  path: "/cancellation-policy",
});

export default function CancellationPolicyPage() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-6">
        <Breadcrumbs items={[{ label: "Cancellation Policy" }]} />
        <h1 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-950">
          CANCELLATION & REFUND POLICY
        </h1>
        <p className="text-xs text-ink-400">Policy effective since 2015</p>

        <div className="space-y-4 text-xs sm:text-sm text-ink-700 leading-relaxed border-t border-ink-100 pt-6">
          <p>
            Because ICCB allocates dedicated kitchen teams, hall dates, and procurement schedules well in advance, cancellations are handled according to the following schedule:
          </p>

          <div className="space-y-3">
            <div className="p-4 bg-ink-50 rounded-xl border border-ink-200">
              <span className="font-bold text-ink-950 block">60+ Days Prior to Event Date:</span>
              <p className="text-xs text-ink-600 mt-0.5">
                Eligible for full date rescheduling without penalty (subject to hall availability) or an 80% refund of the deposit paid.
              </p>
            </div>
            <div className="p-4 bg-ink-50 rounded-xl border border-ink-200">
              <span className="font-bold text-ink-950 block">30 to 59 Days Prior to Event Date:</span>
              <p className="text-xs text-ink-600 mt-0.5">
                Date rescheduling subject to a 10% administrative fee, or a 50% refund of the deposit paid.
              </p>
            </div>
            <div className="p-4 bg-ink-50 rounded-xl border border-ink-200">
              <span className="font-bold text-ink-950 block">Less Than 30 Days Prior:</span>
              <p className="text-xs text-ink-600 mt-0.5">
                Deposits are non-refundable due to raw inventory reservations, livestock screening, and staff locking. Rescheduling may be considered on a compassionate basis.
              </p>
            </div>
          </div>

          <h3 className="font-display font-bold text-base uppercase text-ink-950 pt-3">
            Force Majeure
          </h3>
          <p>
            In the event of government restrictions or natural disasters, ICCB will provide complimentary credit vouchers for 100% of the funds paid, valid for 12 months.
          </p>
        </div>
      </div>
    </div>
  );
}

