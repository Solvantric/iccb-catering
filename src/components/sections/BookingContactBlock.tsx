import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Calendar } from "lucide-react";
import { SITE_FACTS } from "@/content/content";

interface BookingContactBlockProps {
  title?: string;
  subtitle?: string;
}

export function BookingContactBlock({
  title = "Direct Booking & Event Support",
  subtitle = "Connect directly with our banquet and reservation desk at Kuril Bishwa Road.",
}: BookingContactBlockProps) {
  return (
    <section className="border-t border-rule bg-paper-2 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <span className="mono text-ink-soft">§ Reservation Desk</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-ink tracking-tight">
            {title}
          </h2>
          <p className="text-sm text-ink-soft leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-rule">
          {/* Phone channels */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-ink-soft">
              <Phone className="w-3.5 h-3.5 text-accent" />
              <span>Direct Booking Hotlines</span>
            </div>
            <ul className="space-y-1 text-xs text-ink font-mono">
              {SITE_FACTS.bookingPhones.map((phone: string) => (
                <li key={phone}>
                  <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} className="hover:text-accent transition-colors">
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
            <div className="pt-2 text-xs text-ink-soft">
              <span>Catering Direct: </span>
              <a href={`tel:${SITE_FACTS.cateringPhone.replace(/[^0-9+]/g, "")}`} className="font-mono text-ink hover:text-accent">
                {SITE_FACTS.cateringPhone}
              </a>
            </div>
          </div>

          {/* Electronic Mail */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-ink-soft">
              <Mail className="w-3.5 h-3.5 text-accent" />
              <span>Official Correspondence</span>
            </div>
            <div className="space-y-1 text-xs text-ink">
              <div>
                <span className="text-ink-soft block text-[11px]">General & Venue Inquiries:</span>
                <a href={`mailto:${SITE_FACTS.bookingEmail}`} className="font-mono hover:text-accent">
                  {SITE_FACTS.bookingEmail}
                </a>
              </div>
              <div className="pt-2">
                <span className="text-ink-soft block text-[11px]">Catering Division:</span>
                <a href={`mailto:${SITE_FACTS.cateringEmail}`} className="font-mono hover:text-accent">
                  {SITE_FACTS.cateringEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Physical Address */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-ink-soft">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span>Physical Location</span>
            </div>
            <p className="text-xs text-ink leading-relaxed">
              {SITE_FACTS.address}
            </p>
            <p className="text-[11px] text-ink-soft">
              Operating since {SITE_FACTS.operatingSince} • {SITE_FACTS.architect ? `Designed by ${SITE_FACTS.architect}` : ""}
            </p>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between border-t border-rule flex-wrap gap-4">
          <p className="text-xs text-ink-soft">
            All appointments and venue visits are coordinated directly with the management office.
          </p>
          <Link
            href="/contact/enquiry"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-ink text-paper text-xs uppercase tracking-wider font-mono hover:bg-accent hover:text-white transition-colors"
          >
            Enquire for Dates
          </Link>
        </div>
      </div>
    </section>
  );
}

