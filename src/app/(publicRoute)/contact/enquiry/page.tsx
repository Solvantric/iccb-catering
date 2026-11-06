import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Official Event Enquiry | ICCB",
  description: "Submit an official hall booking and event inquiry to International Convention City Bashundhara.",
  path: "/contact/enquiry",
});

export default function EnquiryPage() {
  return (
    <div className="bg-paper text-ink min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 space-y-12">
        <Breadcrumbs
          items={[
            { label: "Contact Us", href: "/contact" },
            { label: "Event Enquiry" },
          ]}
        />

        <div className="space-y-4 border-b border-rule pb-8">
          <span className="mono text-ink-soft">§ Official Requisition</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ink tracking-tight">
            Event <span className="italic text-accent">Enquiry</span>
          </h1>
          <p className="text-base sm:text-lg text-ink-soft leading-relaxed">
            Please submit your event details below. Our reservations and banquet desk will verify hall availability and contact you promptly.
          </p>
        </div>

        <div className="border border-rule p-8 sm:p-10 bg-paper-2">
          <EnquiryForm />
        </div>
      </div>
    </div>
  );
}

