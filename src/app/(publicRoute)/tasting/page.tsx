import React from "react";
import { Metadata } from "next";
import { TastingForm } from "@/components/forms/TastingForm";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Request a Food Tasting Session | ICCB Catering",
  description:
    "Experience our authentic Mughal recipes and continental dishes firsthand at ICCB Heritage Restaurant VIP tasting room before your event.",
  path: "/tasting",
});

export default function TastingPage() {
  return (
    <div className="bg-white py-12">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-4">
          <Breadcrumbs items={[{ label: "Food Tasting" }]} />
        </div>

        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="font-serif italic text-brand-600 text-lg font-semibold block">
            ~ Experience Before You Confirm ~
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-ink-950">
            PRIVATE FOOD TASTING
          </h1>
          <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
            We invite prospective wedding couples and corporate conveners to sample our signature dishes at the ICCB Heritage Restaurant VIP tasting suite.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white p-6 sm:p-10 rounded-3xl border border-ink-100 shadow-soft">
          <TastingForm />
        </div>
      </div>
    </div>
  );
}
