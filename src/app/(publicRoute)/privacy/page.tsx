import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingContactBlock } from "@/components/sections/BookingContactBlock";
import { SITE_FACTS } from "@/content/content";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Privacy Policy | ICCB",
  description: "Official privacy and data handling notice of International Convention City Bashundhara.",
  path: "/privacy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-paper text-ink min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 space-y-12">
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

        <div className="space-y-4 border-b border-rule pb-8">
          <span className="mono text-ink-soft">§ Legal & Privacy</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ink tracking-tight">
            Privacy <span className="italic text-accent">Policy</span>
          </h1>
          <p className="text-base sm:text-lg text-ink-soft leading-relaxed">
            International Convention City Bashundhara respects the privacy of our patrons, clients, and event organizers.
          </p>
        </div>

        <div className="space-y-8 text-sm text-ink-soft leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-ink">1. Information Collection</h2>
            <p>
              When you submit an event enquiry or contact our booking desk, we collect contact credentials (such as name, organization, phone number, and email address) and event-specific requirements strictly to evaluate hall bookings and prepare quotations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-ink">2. Use of Information</h2>
            <p>
              Your contact data is used exclusively by ICCB personnel to respond to booking inquiries, coordinate logistical walk-throughs, and fulfill banquet services. We do not sell or monetize personal client data to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-ink">3. Data Security</h2>
            <p>
              All event records and communications are held in confidential administrative environments compliant with Bashundhara Group&apos;s corporate data protection policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-ink">4. Contacting Us Regarding Privacy</h2>
            <p>
              For questions concerning this notice or your stored information, please email{" "}
              <a href={`mailto:${SITE_FACTS.bookingEmail}`} className="text-accent underline font-mono">
                {SITE_FACTS.bookingEmail}
              </a>
              .
            </p>
          </section>
        </div>
      </div>

      <BookingContactBlock />
    </div>
  );
}

