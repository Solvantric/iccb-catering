import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import { SITE_INFO } from "@/data/site";
import { generatePageMetadata } from "@/lib/seo";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact ICCB Catering | Location, Phones & Inquiry Desk",
  description:
    "Official contact details for ICCB Catering, Kuril Bishwa Road, Dhaka. Direct catering hotline: +88-01991-197719. Open 7 days a week.",
  path: "/contact",
});

export default function ContactPage() {
  const cleanPhone = SITE_INFO.contact.cateringPhone.replace(/[^0-9]/g, "");

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-ink-950 text-white py-20 relative text-center">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ label: "Contact Us" }]} />
          </div>
          <span className="font-serif italic text-brand-400 text-lg font-semibold block">
            ~ We are Here for You ~
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight">
            GET IN TOUCH WITH ICCB
          </h1>
          <p className="text-xs sm:text-sm text-ink-300 max-w-2xl mx-auto leading-relaxed">
            Our banquet and catering consultants are stationed at Kuril Bishwa Road 7 days a week to assist your event planning.
          </p>
        </div>
      </section>

      {/* Main Content: Info + Form */}
      <section className="py-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Verified Contacts */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                Banquet Desk
              </span>
              <h2 className="font-display font-black text-3xl uppercase tracking-tight text-ink-950 mt-3">
                DIRECT CONTACT CHANNELS
              </h2>
              <p className="text-xs text-ink-600 mt-2 leading-relaxed">
                Reach our catering department directly or connect with our hall booking team.
              </p>
            </div>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-ink-900">
                    Venue & Kitchen Location
                  </h4>
                  <p className="text-xs text-ink-600 mt-0.5 leading-relaxed">
                    {SITE_INFO.contact.address}
                  </p>
                </div>
              </div>

              {/* Catering Hotline */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-ink-900">
                    Catering Inquiries Hotline
                  </h4>
                  <a
                    href={`tel:${SITE_INFO.contact.cateringPhone}`}
                    className="text-sm font-display font-bold text-brand-600 hover:underline block mt-0.5"
                  >
                    {SITE_INFO.contact.cateringPhone}
                  </a>
                  <a
                    href={`mailto:${SITE_INFO.contact.cateringEmail}`}
                    className="text-xs text-ink-600 hover:text-brand-600 block mt-0.5"
                  >
                    {SITE_INFO.contact.cateringEmail}
                  </a>
                </div>
              </div>

              {/* Hall Booking Numbers */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-ink-100 text-ink-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-ink-900">
                    Additional Booking Phones
                  </h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1 text-xs text-ink-600">
                    {SITE_INFO.contact.bookingPhones.map((ph, idx) => (
                      <a key={idx} href={`tel:${ph}`} className="hover:text-brand-600">
                        {ph}
                      </a>
                    ))}
                  </div>
                  <a
                    href={`mailto:${SITE_INFO.contact.generalEmail}`}
                    className="text-xs text-ink-600 hover:text-brand-600 block mt-1"
                  >
                    {SITE_INFO.contact.generalEmail}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-ink-100 text-ink-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-ink-900">
                    Operating Hours
                  </h4>
                  <p className="text-xs text-ink-600 mt-0.5">{SITE_INFO.contact.hours}</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Quick Link */}
            <div className="pt-2">
              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-700 transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat via WhatsApp Directly</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-ink-100 shadow-soft">
            <h3 className="font-display font-bold text-xl uppercase tracking-wider text-ink-950 mb-2">
              Send us a Message
            </h3>
            <p className="text-xs text-ink-500 mb-6">
              Drop us a line and our banquet team will get back to you promptly.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map Embed */}
      <section className="h-80 w-full relative bg-ink-100 border-t border-ink-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.082531617302!2d90.428678!3d23.822345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7075c2e1765%3A0x6d9f7833075c317b!2sInternational%20Convention%20City%20Bashundhara%20(ICCB)!5e0!3m2!1sen!2sbd!4v1700000000000"
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="ICCB Location Map"
        />
      </section>
    </div>
  );
}
