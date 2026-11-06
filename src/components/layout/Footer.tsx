import React from "react";
import Link from "next/link";
import { SITE_FACTS } from "@/content/content";
import { FOOTER_NAV } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="border-t border-rule bg-paper dark:bg-paper-2 text-ink pt-20 pb-16">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Giant ICCB Display Wordmark */}
        <div className="border-b border-rule pb-12 mb-16 overflow-hidden text-left">
          <span className="font-serif italic text-6xl sm:text-8xl lg:text-9xl block tracking-tighter opacity-90 leading-none">
            ICCB
          </span>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft mt-3">
            {SITE_FACTS.fullName} &bull; {SITE_FACTS.parentOrg}
          </p>
        </div>

        {/* 4 Clean Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-left pb-16 border-b border-rule">
          {/* Col 1: Visit */}
          <div className="space-y-4">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft font-semibold">
              Visit
            </h4>
            <p className="text-xs text-ink leading-relaxed max-w-xs font-mono">
              {SITE_FACTS.address}
            </p>
            <div className="pt-2">
              <Link
                href="/venue-map"
                className="text-xs font-mono uppercase tracking-wider underline underline-offset-4 text-ink hover:text-accent transition-colors"
              >
                Venue Map & Direction &rarr;
              </Link>
            </div>
          </div>

          {/* Col 2: Venues */}
          <div className="space-y-4">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft font-semibold">
              Venues
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              {FOOTER_NAV.venues.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-ink hover:text-accent transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Plan Your Event */}
          <div className="space-y-4">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft font-semibold">
              Plan Your Event
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              {FOOTER_NAV.plan.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-ink hover:text-accent transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="space-y-4">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft font-semibold">
              Contact
            </h4>
            <div className="space-y-2 text-xs font-mono">
              <p>
                Booking:{" "}
                <a href="tel:+880241091551" className="hover:text-accent font-medium">
                  +88-02-41091551
                </a>
              </p>
              <p>
                Hotline:{" "}
                <a href="tel:+8801991197719" className="hover:text-accent font-medium">
                  +88-01991-197719
                </a>
              </p>
              <p>
                Email:{" "}
                <a href="mailto:iccb@bga-bd.com" className="hover:text-accent">
                  iccb@bga-bd.com
                </a>
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="text-xs uppercase tracking-wider underline underline-offset-4 hover:text-accent"
                >
                  More Numbers & Desk Info &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between font-mono text-[11px] text-ink-soft gap-4">
          <p>&copy; {new Date().getFullYear()} ICCB. {SITE_FACTS.parentOrg}.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-ink transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-ink transition-colors">
              Contact Desk
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
