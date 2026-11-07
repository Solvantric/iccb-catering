"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { SITE_INFO } from "@/data/site";
import { useUIStore } from "@/store/uiStore";
import { translations } from "@/lib/i18n";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactMap } from "@/components/contact/ContactMap";

export function ContactPageClient() {
  const { locale } = useUIStore();
  const t = translations[locale].contactPage;
  const [showMoreBooking, setShowMoreBooking] = useState(false);

  const heroImage = "https://www.iccbbg.com/assets/upload/wallpaper/wallpaper_1579495968.jpg";
  const primaryBookingPhone = SITE_INFO.contact.bookingPhones[0];
  const additionalBookingPhones = SITE_INFO.contact.bookingPhones.slice(1);
  const directionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=International+Convention+City+Bashundhara%2C+Kuril+Bishwa+Road%2C+Dhaka+1229";

  return (
    <div className="bg-white dark:bg-ink-950 transition-colors">
      {/* 1. Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center text-center overflow-hidden">
        {/* Background Wallpaper - Natural colours, no filter */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="ICCB Grand Convention Venue"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Light gradient overlay (black/35 at top to black/55 at bottom) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 to-black/55" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-20 text-white space-y-4">
          <h1 className="font-serif text-4xl sm:text-6xl tracking-tight leading-tight">
            <span className="italic font-normal text-brand-300">Get in </span>
            <span className="font-bold uppercase tracking-[0.12em] text-white">TOUCH</span>
          </h1>
          {/* 48px brand-500 hairline */}
          <div className="w-12 h-0.5 bg-brand-500 mx-auto my-3" />
          <p className="text-sm sm:text-base text-ink-100 font-light max-w-xl mx-auto leading-relaxed">
            {t.heroSub}
          </p>
        </div>
      </section>

      {/* 2. Three Separate Cards Overlapping Hero */}
      <section className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Booking */}
          <div className="bg-white dark:bg-ink-900 rounded-[16px] p-8 border-t-4 border-brand-500 shadow-[0_12px_32px_rgba(226,79,95,0.12)] border-x border-b border-brand-100/50 dark:border-white/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  {t.bookingTitle}
                </span>
                <div className="w-12 h-12 rounded-full bg-brand-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <Phone className="w-5 h-5 stroke-[1.75]" />
                </div>
              </div>

              <div>
                <a
                  href={`tel:${primaryBookingPhone}`}
                  className="font-serif text-[22px] font-bold text-ink-950 dark:text-white leading-tight hover:text-brand-500 transition-colors block"
                >
                  {primaryBookingPhone}
                </a>
                <a
                  href={`mailto:${SITE_INFO.contact.bookingEmail}`}
                  className="text-xs text-ink-600 dark:text-ink-400 mt-1 block hover:text-brand-500 transition-colors"
                >
                  {SITE_INFO.contact.bookingEmail}
                </a>
              </div>

              {/* More numbers toggle */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowMoreBooking((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  <span>{showMoreBooking ? t.hideNumbers : t.moreNumbers}</span>
                  {showMoreBooking ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>

                {showMoreBooking && (
                  <div className="mt-3 pt-3 border-t border-brand-100/60 dark:border-white/10 grid grid-cols-1 gap-1 text-xs text-ink-600 dark:text-ink-300">
                    {additionalBookingPhones.map((ph, idx) => (
                      <a
                        key={idx}
                        href={`tel:${ph}`}
                        className="hover:text-brand-500 transition-colors font-medium py-0.5"
                      >
                        {ph}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <a
                href={`tel:${primaryBookingPhone}`}
                className="text-xs font-bold text-brand-600 dark:text-brand-400 inline-flex items-center gap-1.5 hover:gap-2 transition-all"
              >
                <span>{t.callNow}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: Catering */}
          <div className="bg-white dark:bg-ink-900 rounded-[16px] p-8 border-t-4 border-brand-500 shadow-[0_12px_32px_rgba(226,79,95,0.12)] border-x border-b border-brand-100/50 dark:border-white/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  {t.cateringTitle}
                </span>
                <div className="w-12 h-12 rounded-full bg-brand-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <Mail className="w-5 h-5 stroke-[1.75]" />
                </div>
              </div>

              <div>
                <a
                  href={`tel:${SITE_INFO.contact.cateringPhone}`}
                  className="font-serif text-[22px] font-bold text-ink-950 dark:text-white leading-tight hover:text-brand-500 transition-colors block"
                >
                  {SITE_INFO.contact.cateringPhone}
                </a>
                <a
                  href={`mailto:${SITE_INFO.contact.cateringEmail}`}
                  className="text-xs text-ink-600 dark:text-ink-400 mt-1 block hover:text-brand-500 transition-colors"
                >
                  {SITE_INFO.contact.cateringEmail}
                </a>
              </div>
            </div>

            <div>
              <a
                href={`tel:${SITE_INFO.contact.cateringPhone}`}
                className="text-xs font-bold text-brand-600 dark:text-brand-400 inline-flex items-center gap-1.5 hover:gap-2 transition-all"
              >
                <span>{t.callCatering}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 3: Visit us */}
          <div className="bg-white dark:bg-ink-900 rounded-[16px] p-8 border-t-4 border-brand-500 shadow-[0_12px_32px_rgba(226,79,95,0.12)] border-x border-b border-brand-100/50 dark:border-white/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  {t.visitTitle}
                </span>
                <div className="w-12 h-12 rounded-full bg-brand-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5 stroke-[1.75]" />
                </div>
              </div>

              <div>
                <p className="font-serif text-[22px] font-bold text-ink-950 dark:text-white leading-tight">
                  Kuril Bishwa Road, Dhaka
                </p>
                <p className="text-xs text-ink-600 dark:text-ink-400 mt-1 leading-relaxed">
                  Next to 300 ft Purbachal Express Highway, Kuril Bishwa Road, Dhaka 1229
                </p>
              </div>
            </div>

            <div>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-brand-600 dark:text-brand-400 inline-flex items-center gap-1.5 hover:gap-2 transition-all"
              >
                <span>{t.getDirections}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Form Band: Background brand-50 (dark: ink-950), py-16 lg:py-24 */}
      <section className="bg-brand-50 dark:bg-ink-950 py-16 lg:py-24 mt-16 transition-colors border-y border-brand-100/60 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Plain text */}
            <div className="lg:col-span-5 space-y-3 text-left">
              <span className="font-serif italic text-brand-600 dark:text-brand-400 text-lg font-normal block">
                {t.formTag}
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-950 dark:text-white">
                {t.formHeading}
              </h2>
              <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-400 leading-relaxed pt-2">
                {t.formDesc}
              </p>
            </div>

            {/* Right Column: White card radius 16px, padding 32px, soft shadow */}
            <div className="lg:col-span-7 bg-white dark:bg-ink-900 rounded-[16px] p-8 shadow-md border border-brand-100/60 dark:border-white/10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Map Section */}
      <ContactMap />
    </div>
  );
}
