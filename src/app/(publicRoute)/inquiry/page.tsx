import React from "react";
import { Metadata } from "next";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "General Banquet Inquiry | ICCB Catering",
  description:
    "Send a general catering or hall booking inquiry to International Convention City Bashundhara banquet team.",
  path: "/inquiry",
});

export default function InquiryPage() {
  return (
    <div className="bg-white py-12">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-4">
          <Breadcrumbs items={[{ label: "Inquiry" }]} />
        </div>

        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="font-serif italic text-brand-600 text-lg font-semibold block">
            ~ Banquet Desk ~
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-ink-950">
            BANQUET & CATERING INQUIRY
          </h1>
          <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
            Have questions about date availability, menu selections, hall capacity, or off-premises services? Send us an inquiry.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white p-6 sm:p-10 rounded-3xl border border-ink-100 shadow-soft">
          <InquiryForm />
        </div>
      </div>
    </div>
  );
}
