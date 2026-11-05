import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { generatePageMetadata } from "@/lib/seo";
import { SITE_INFO } from "@/data/site";

export const metadata: Metadata = generatePageMetadata({
  title: "Privacy Policy | ICCB Catering",
  description: "Information about how ICCB Catering collects, uses, and safeguards client information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-6">
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
        <h1 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-950">
          PRIVACY POLICY
        </h1>
        <p className="text-xs text-ink-400">Last updated: November 2026</p>

        <div className="space-y-4 text-xs sm:text-sm text-ink-700 leading-relaxed border-t border-ink-100 pt-6">
          <p>
            This Privacy Policy explains how <strong>{SITE_INFO.fullName}</strong> (&ldquo;ICCB Catering&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;) collects, processes, and protects personal information provided by clients and prospective hosts through our website, phone booking lines, and tasting appointments.
          </p>

          <h3 className="font-display font-bold text-base uppercase text-ink-950 pt-3">
            1. Information We Collect
          </h3>
          <p>
            When you request a quotation, book an event date, or schedule a food tasting session, we collect:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Contact details: Full Name, email address, phone numbers, and city.</li>
            <li>Event parameters: Target event date, anticipated guest headcount, venue hall, and cuisine choices.</li>
            <li>Corporate information: Company / institution name for business accounts.</li>
          </ul>

          <h3 className="font-display font-bold text-base uppercase text-ink-950 pt-3">
            2. How We Use Your Information
          </h3>
          <p>
            We use your data solely to prepare itemized banquet quotations, coordinate hall arrangements, schedule tastings, confirm dates, and contact you with relevant seasonal privileges. We never sell your personal information to third-party marketers.
          </p>

          <h3 className="font-display font-bold text-base uppercase text-ink-950 pt-3">
            3. Contacting our Data Officer
          </h3>
          <p>
            If you have questions regarding your data or wish to have your lead information removed, please email us at <strong className="text-ink-950">{SITE_INFO.contact.cateringEmail}</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}

