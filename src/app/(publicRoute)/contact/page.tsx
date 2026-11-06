import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import { SITE_FACTS } from "@/content/content";
import { generatePageMetadata } from "@/lib/seo";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact Us | ICCB",
  description: "Official contact details for ICCB, Kuril Bishwa Road, Dhaka. Direct hotlines and booking desks.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="bg-paper text-ink min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 space-y-12">
        <Breadcrumbs items={[{ label: "Contact Us" }]} />

        <div className="space-y-4 border-b border-rule pb-8">
          <span className="mono text-ink-soft">§ 01 / Get in Touch</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ink tracking-tight">
            Contact <span className="italic text-accent">ICCB</span>
          </h1>
          <p className="text-base sm:text-lg text-ink-soft max-w-3xl leading-relaxed">
            Our banquet and venue reservation desk operates at Kuril Bishwa Road to assist event organizers, corporate planners, and families.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border border-rule p-6 bg-paper-2 space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                <h2 className="font-serif text-xl text-ink">Complex Address</h2>
              </div>
              <p className="text-xs text-ink-soft leading-relaxed font-mono">
                {SITE_FACTS.address}
              </p>
            </div>

            <div className="border border-rule p-6 bg-paper-2 space-y-4">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                <h2 className="font-serif text-xl text-ink">Booking Desks</h2>
              </div>
              <ul className="space-y-1.5 text-xs font-mono text-ink">
                {SITE_FACTS.bookingPhones.map((ph) => (
                  <li key={ph}>
                    <a href={`tel:${ph.replace(/[^0-9+]/g, "")}`} className="hover:text-accent">
                      {ph}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-rule text-xs font-mono">
                <span className="text-ink-soft block">Catering Direct:</span>
                <a href={`tel:${SITE_FACTS.cateringPhone.replace(/[^0-9+]/g, "")}`} className="text-ink hover:text-accent font-semibold">
                  {SITE_FACTS.cateringPhone}
                </a>
              </div>
            </div>

            <div className="border border-rule p-6 bg-paper-2 space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                <h2 className="font-serif text-xl text-ink">Official Inquiries</h2>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div>
                  <span className="text-ink-soft block text-[11px]">Venue Booking:</span>
                  <a href={`mailto:${SITE_FACTS.bookingEmail}`} className="text-ink hover:text-accent">
                    {SITE_FACTS.bookingEmail}
                  </a>
                </div>
                <div>
                  <span className="text-ink-soft block text-[11px]">Catering Division:</span>
                  <a href={`mailto:${SITE_FACTS.cateringEmail}`} className="text-ink hover:text-accent">
                    {SITE_FACTS.cateringEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7 border border-rule p-8 bg-paper-2 space-y-6">
            <div className="space-y-2">
              <span className="mono text-ink-soft">§ Message Form</span>
              <h2 className="font-serif text-2xl text-ink">Send an Immediate Message</h2>
              <p className="text-xs text-ink-soft">
                For detailed hall availability, please use our comprehensive{" "}
                <Link href="/contact/enquiry" className="text-accent underline font-mono">
                  Enquiry Form
                </Link>
                .
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
