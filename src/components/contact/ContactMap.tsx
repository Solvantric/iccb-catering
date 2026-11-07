"use client";

import React, { useState } from "react";
import { MapPin, Navigation, ExternalLink, MousePointerClick } from "lucide-react";
import { useUIStore } from "@/store/uiStore";

export function ContactMap() {
  const { locale } = useUIStore();
  const [isInteractive, setIsInteractive] = useState(false);

  const directionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=International+Convention+City+Bashundhara%2C+Kuril+Bishwa+Road%2C+Dhaka+1229";
  const searchUrl =
    "https://www.google.com/maps/search/?api=1&query=International+Convention+City+Bashundhara";

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Rounded frame container with brand-tinted shadow */}
        <div
          className="relative w-full h-[460px] rounded-[20px] overflow-hidden border border-brand-100 dark:border-white/10 shadow-[0_12px_32px_rgba(226,79,95,0.12)] bg-ink-100 dark:bg-ink-950"
          onMouseLeave={() => setIsInteractive(false)}
        >
          {/* Iframe: natural colours, dark mode only brightness(0.85) */}
          <iframe
            src="https://www.google.com/maps?q=International+Convention+City+Bashundhara,+Kuril+Bishwa+Road,+Dhaka+1229&output=embed"
            className={`w-full h-full border-0 dark:brightness-[0.85] transition-opacity ${
              isInteractive ? "pointer-events-auto" : "pointer-events-none"
            }`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="ICCB location map"
          />

          {/* Click to move the map pill */}
          {!isInteractive && (
            <div
              onClick={() => setIsInteractive(true)}
              className="absolute inset-0 z-10 cursor-pointer flex items-center justify-center bg-black/5 hover:bg-black/10 transition-colors"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-ink-900/95 text-ink-900 dark:text-white text-xs font-semibold shadow-md backdrop-blur-sm border border-brand-100 dark:border-white/10 hover:border-brand-500 transition-colors">
                <MousePointerClick className="w-3.5 h-3.5 text-brand-500" />
                <span>
                  {locale === "bn" ? "ম্যাপ ব্যবহার করতে ক্লিক করুন" : "Click to move the map"}
                </span>
              </div>
            </div>
          )}

          {/* Desktop Overlay Card bottom-left */}
          <div className="hidden md:block absolute bottom-6 left-6 z-20 max-w-sm w-full bg-white dark:bg-ink-900 p-6 rounded-[12px] border border-ink-100 dark:border-white/10 shadow-xl">
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-500" />
              <span>{locale === "bn" ? "আমাদের অবস্থান" : "Find us"}</span>
            </div>
            <h3 className="font-display font-bold text-base text-ink-950 dark:text-white uppercase tracking-tight">
              International Convention City Bashundhara
            </h3>
            <p className="text-xs text-ink-600 dark:text-ink-300 mt-1.5 leading-relaxed">
              Next to 300 ft Purbachal Express Highway, Kuril Bishwa Road, Dhaka 1229
            </p>
            <div className="mt-4 pt-3.5 border-t border-ink-100 dark:border-white/10 flex items-center gap-3">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{locale === "bn" ? "দিকনির্দেশ পান" : "Get directions"}</span>
              </a>
              <a
                href={searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-ink-600 dark:text-ink-400 hover:text-brand-500 dark:hover:text-white font-medium transition-colors"
              >
                <span>{locale === "bn" ? "ম্যাপে দেখুন" : "Open in Maps"}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Overlay Card (below the map) */}
        <div className="block md:hidden mt-4 p-6 bg-white dark:bg-ink-900 rounded-[12px] border border-brand-100 dark:border-white/10 shadow-sm">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-500" />
            <span>{locale === "bn" ? "আমাদের অবস্থান" : "Find us"}</span>
          </div>
          <h3 className="font-display font-bold text-base text-ink-950 dark:text-white uppercase tracking-tight">
            International Convention City Bashundhara
          </h3>
          <p className="text-xs text-ink-600 dark:text-ink-300 mt-1.5 leading-relaxed">
            Next to 300 ft Purbachal Express Highway, Kuril Bishwa Road, Dhaka 1229
          </p>
          <div className="mt-4 pt-3.5 border-t border-ink-100 dark:border-white/10 flex items-center gap-3">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{locale === "bn" ? "দিকনির্দেশ পান" : "Get directions"}</span>
            </a>
            <a
              href={searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-ink-600 dark:text-ink-400 hover:text-brand-500 dark:hover:text-white font-medium transition-colors"
            >
              <span>{locale === "bn" ? "ম্যাপে দেখুন" : "Open in Maps"}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
