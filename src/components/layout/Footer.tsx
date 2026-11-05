import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { FOOTER_LINKS } from "@/data/navigation";
import { SITE_INFO } from "@/data/site";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ink-950 text-white border-t border-ink-900 pt-16 pb-20 md:pb-12">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-ink-900">
          {/* Col 1 & 2: Brand / Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <Logo light />
            <p className="text-xs text-ink-300 leading-relaxed max-w-sm mt-3">
              {SITE_INFO.positioning}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-400 bg-brand-950/60 border border-brand-900 px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                South Asia&apos;s Largest Venue &bull; Since 2015
              </span>
            </div>
            {/* Quick Contact & WhatsApp Pill */}
            <div className="pt-3">
              <Link
                href="/quote"
                className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-white bg-brand-500 hover:bg-brand-600 px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                Request a Custom Quote &rarr;
              </Link>
            </div>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-xs font-bold font-display uppercase tracking-widest text-brand-500 mb-4">
              Catering Services
            </h4>
            <ul className="space-y-2 text-xs text-ink-300">
              {FOOTER_LINKS.services.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Company */}
          <div>
            <h4 className="text-xs font-bold font-display uppercase tracking-widest text-brand-500 mb-4">
              Company & Halls
            </h4>
            <ul className="space-y-2 text-xs text-ink-300">
              {FOOTER_LINKS.company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-display uppercase tracking-widest text-brand-500 mb-4">
              Verified Contacts
            </h4>
            <div className="text-xs text-ink-300 space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{SITE_INFO.contact.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-500 shrink-0" />
                <a href={`tel:${SITE_INFO.contact.cateringPhone}`} className="hover:text-white font-semibold">
                  {SITE_INFO.contact.cateringPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-500 shrink-0" />
                <a href={`mailto:${SITE_INFO.contact.cateringEmail}`} className="hover:text-white">
                  {SITE_INFO.contact.cateringEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-brand-500 shrink-0" />
                <span>{SITE_INFO.contact.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ink-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} {SITE_INFO.fullName}. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy-policy" className="hover:text-ink-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-ink-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cancellation-policy" className="hover:text-ink-300 transition-colors">
              Cancellation Policy
            </Link>
            <Link href="/sitemap.xml" className="hover:text-ink-300 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

