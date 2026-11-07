"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Clock,
  ShieldCheck,
  Headphones,
  CheckCircle2,
} from "lucide-react";
import { SITE_INFO } from "@/data/site";
import { useUIStore } from "@/store/uiStore";
import { translations } from "@/lib/i18n";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactMap } from "@/components/contact/ContactMap";

export function ContactPageClient() {
  const { locale } = useUIStore();
  const isBn = locale === "bn";
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
      <section className="relative min-h-[38vh] sm:min-h-[42vh] flex items-center justify-center text-center overflow-hidden bg-ink-950">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="ICCB Grand Convention Venue"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 text-white space-y-4">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-brand-400 block">
            {isBn ? "আইসিসিবি সরাসরি যোগাযোগ" : "DIRECT HOSPITALITY DESK"}
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-white leading-tight">
            {isBn ? "যোগাযোগ ও বুকিং ডেস্ক" : "GET IN TOUCH WITH US"}
          </h1>
          <div className="w-14 h-1 bg-brand-500 mx-auto rounded-full" />
          <p className="text-xs sm:text-sm text-ink-200 font-sans max-w-xl mx-auto leading-relaxed">
            {t.heroSub}
          </p>
        </div>
      </section>

      {/* 2. Main Section: Left Form & Right 3 Cards */}
      <section className="py-16 sm:py-20 bg-white dark:bg-ink-950 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* LEFT Column (Col 7): The Inquiry Form */}
            <div className="lg:col-span-7 bg-white dark:bg-ink-900 rounded-3xl p-8 sm:p-10 border border-ink-100 dark:border-white/10 shadow-xl space-y-6 text-left">
              <div className="space-y-2 border-b border-ink-100 dark:border-white/10 pb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  {isBn ? "সরাসরি বার্তা" : "DIRECT MESSAGE"}
                </span>
                <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-ink-950 dark:text-white">
                  {isBn ? "অনুষ্ঠানের বিস্তারিত পাঠান" : "SEND AN INQUIRY"}
                </h2>
                <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-400 font-sans">
                  {isBn
                    ? "মেন্যু, ভেন্যু বা তারিখ নির্ধারণ সম্পর্কিত যেকোনো প্রশ্নে ফর্মটি পূরণ করুন।"
                    : "Have inquiries regarding date availability, menu selections, or guest capacity? Drop us a note below."}
                </p>
              </div>

              <ContactForm />
            </div>

            {/* RIGHT Column (Col 5): The 3 Cards */}
            <div className="lg:col-span-5 space-y-6 text-left">
              {/* Card 1: Booking Hotline */}
              <div className="bg-white dark:bg-ink-900 rounded-2xl p-6 sm:p-7 border border-ink-100 dark:border-white/10 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                      {t.bookingTitle}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-white/10 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                      <Phone className="w-5 h-5 stroke-[1.75]" />
                    </div>
                  </div>

                  <div>
                    <a
                      href={`tel:${primaryBookingPhone}`}
                      className="font-display font-black text-xl sm:text-2xl text-ink-950 dark:text-white leading-tight hover:text-brand-600 transition-colors block tracking-tight"
                    >
                      {primaryBookingPhone}
                    </a>
                    <a
                      href={`mailto:${SITE_INFO.contact.bookingEmail}`}
                      className="text-xs text-ink-500 dark:text-ink-400 mt-1 block hover:text-brand-500 transition-colors font-sans"
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
                      <div className="mt-3 pt-3 border-t border-ink-100 dark:border-white/10 grid grid-cols-1 gap-1 text-xs text-ink-600 dark:text-ink-300">
                        {additionalBookingPhones.map((ph, idx) => (
                          <a
                            key={idx}
                            href={`tel:${ph}`}
                            className="hover:text-brand-600 transition-colors font-medium py-0.5"
                          >
                            {ph}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-ink-100 dark:border-white/10 mt-4">
                  <a
                    href={`tel:${primaryBookingPhone}`}
                    className="text-xs font-bold text-brand-600 dark:text-brand-400 inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
                  >
                    <span>{t.callNow}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Card 2: Catering Inquiries */}
              <div className="bg-white dark:bg-ink-900 rounded-2xl p-6 sm:p-7 border border-ink-100 dark:border-white/10 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                      {t.cateringTitle}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-white/10 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                      <Mail className="w-5 h-5 stroke-[1.75]" />
                    </div>
                  </div>

                  <div>
                    <a
                      href={`tel:${SITE_INFO.contact.cateringPhone}`}
                      className="font-display font-black text-xl sm:text-2xl text-ink-950 dark:text-white leading-tight hover:text-brand-600 transition-colors block tracking-tight"
                    >
                      {SITE_INFO.contact.cateringPhone}
                    </a>
                    <a
                      href={`mailto:${SITE_INFO.contact.cateringEmail}`}
                      className="text-xs text-ink-500 dark:text-ink-400 mt-1 block hover:text-brand-500 transition-colors font-sans"
                    >
                      {SITE_INFO.contact.cateringEmail}
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t border-ink-100 dark:border-white/10 mt-4">
                  <a
                    href={`tel:${SITE_INFO.contact.cateringPhone}`}
                    className="text-xs font-bold text-brand-600 dark:text-brand-400 inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
                  >
                    <span>{t.callCatering}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Card 3: Visit Us */}
              <div className="bg-white dark:bg-ink-900 rounded-2xl p-6 sm:p-7 border border-ink-100 dark:border-white/10 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                      {t.visitTitle}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-white/10 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                      <MapPin className="w-5 h-5 stroke-[1.75]" />
                    </div>
                  </div>

                  <div>
                    <p className="font-display font-black text-xl sm:text-2xl text-ink-950 dark:text-white leading-tight tracking-tight">
                      Kuril Bishwa Road
                    </p>
                    <p className="text-xs text-ink-500 dark:text-ink-400 mt-1 leading-relaxed font-sans">
                      Next to 300 ft Purbachal Express Highway, Kuril Bishwa Road, Dhaka 1229
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-ink-100 dark:border-white/10 mt-4">
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-brand-600 dark:text-brand-400 inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
                  >
                    <span>{t.getDirections}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom Map Section */}
      <section className="py-12 bg-ink-50/50 dark:bg-ink-900/50 border-t border-ink-100 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 mb-8">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-600 dark:text-brand-400">
            {isBn ? "লোকেশন ও দিকনির্দেশনা" : "VENUE MAP & DIRECTIONS"}
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-950 dark:text-white">
            {isBn ? "আমাদের ভেন্যুতে সহজে পৌঁছান" : "LOCATE ICCB ON THE MAP"}
          </h2>
          <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 font-sans max-w-xl mx-auto">
            {isBn
              ? "কুড়িল বিশ্বরোড ও ৩০০ ফিট পূর্বাচল এক্সপ্রেসওয়ের ঠিক পাশেই আইসিসিবি অবস্থিত।"
              : "Strategically located right off Kuril Bishwa Road & 300 Feet Purbachal Expressway."}
          </p>
        </div>

        <ContactMap />
      </section>
    </div>
  );
}
