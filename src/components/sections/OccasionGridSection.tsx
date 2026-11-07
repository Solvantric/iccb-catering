"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IMAGES, PLACEHOLDER_BLUR } from "@/data/images";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useUIStore } from "@/store/uiStore";
import { translations } from "@/lib/i18n";

export function OccasionGridSection() {
  const { locale } = useUIStore();
  const t = translations[locale].occasions;

  const occasions = [
    {
      id: "wedding-reception",
      title: locale === "bn" ? "রাজকীয় বিবাহ সংবর্ধনা" : "Royal Wedding Reception",
      desc: locale === "bn"
        ? "ঐতিহ্যবাহী মুঘল কাচ্চি বিরিয়ানি, শাহী রেজালা ও মনোরম পরিবেশন সেবা।"
        : "Signature Dum Pukht Kacchi feasts, Shahi Rezala, and dedicated banquet hospitality.",
      capacity: locale === "bn" ? "১০,০০০+ ধারণক্ষমতা" : "Up to 10,000 Guests",
      image: IMAGES.weddingReception,
      href: "/services/wedding-catering",
      cta: locale === "bn" ? "বিবাহ ক্যাটারিং বুক করুন" : "Book Wedding Catering",
    },
    {
      id: "corporate-event",
      title: locale === "bn" ? "কর্পোরেট সম্মেলন ও ডিনার" : "Corporate Summit & AGM",
      desc: locale === "bn"
        ? "আন্তর্জাতিক মানসম্পন্ন সময়নিষ্ঠ কন্টিনেন্টাল ও মাল্টি-কুইজিন বুফে।"
        : "Precision multi-cuisine buffets, executive lunch boxes, and prompt service.",
      capacity: locale === "bn" ? "কর্পোরেট সম্মেলন" : "Executive Summits",
      image: IMAGES.corporateEvent,
      href: "/services/corporate-catering",
      cta: locale === "bn" ? "কর্পোরেট ক্যাটারিং বুক করুন" : "Book Corporate Catering",
    },
    {
      id: "private-party",
      title: locale === "bn" ? "ঘরোয়া ও সামাজিক উৎসব" : "Private Social Galas",
      desc: locale === "bn"
        ? "পারিবারিক পুনর্মিলনী ও বিবাহবার্ষিকীর জন্য লাইভ গ্রিল ও বিশেষ আপ্যায়ন।"
        : "Live sizzler grills, artisanal dessert counters, and warm family dining touch.",
      capacity: locale === "bn" ? "৫০ - ১,৫০০ অতিথি" : "50 to 1,500 Guests",
      image: IMAGES.privateParty,
      href: "/services/birthday-party-catering",
      cta: locale === "bn" ? "সোশ্যাল ইভেন্ট বুক করুন" : "Book Social Banquet",
    },
    {
      id: "birthday-party",
      title: locale === "bn" ? "জন্মদিন ও মাইলফলক" : "Birthday & Milestones",
      desc: locale === "bn"
        ? "সব বয়সের উপযোগী মজাদার খাবারের স্টেশন ও স্পেশাল কেক কাটিং আয়োজন।"
        : "Interactive food stations, finger foods, and custom dessert counters for milestones.",
      capacity: locale === "bn" ? "কাস্টম আয়োজন" : "All Age Banquets",
      image: IMAGES.birthdayParty,
      href: "/services/birthday-party-catering",
      cta: locale === "bn" ? "বার্থডে ক্যাটারিং বুক করুন" : "Book Birthday Catering",
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white dark:bg-ink-950 text-ink-950 dark:text-white relative overflow-hidden transition-colors">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Fresh, Clean & Minimal */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-white/10 border border-brand-100 dark:border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span className="font-serif italic text-brand-600 dark:text-brand-300 text-xs font-semibold tracking-wide">
              {t.tag}
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-ink-950 dark:text-white">
            {t.heading}
          </h2>
          <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 max-w-xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 2x2 Clean Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {occasions.map((occ, idx) => (
            <motion.div
              key={occ.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white dark:bg-ink-900 rounded-3xl overflow-hidden border border-ink-100 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-brand-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-ink-100 dark:bg-ink-950">
                  <Image
                    src={occ.image}
                    alt={occ.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL={PLACEHOLDER_BLUR}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Top Capacity Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 dark:bg-ink-950/80 backdrop-blur-md text-[11px] font-bold text-ink-900 dark:text-white shadow-sm border border-black/5 dark:border-white/10">
                      {occ.capacity}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 space-y-2">
                  <h3 className="font-display font-black text-2xl uppercase tracking-tight text-ink-950 dark:text-white group-hover:text-brand-500 transition-colors">
                    {occ.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
                    {occ.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Action: Lite, One-Color, Premium Link */}
              <div className="px-6 pb-6 pt-0">
                <Link
                  href={occ.href}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-500 hover:text-brand-600 transition-colors group/link"
                >
                  <span>{occ.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1" strokeWidth={1.75} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
