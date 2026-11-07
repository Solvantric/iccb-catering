"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IMAGES, PLACEHOLDER_BLUR } from "@/data/images";
import { ArrowRight, Sparkles, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useUIStore } from "@/store/uiStore";
import { translations } from "@/lib/i18n";

export function OccasionGridSection() {
  const { locale } = useUIStore();
  const t = translations[locale].occasions;

  const occasions = [
    {
      id: "wedding-reception",
      num: "01",
      category: locale === "bn" ? "বিবাহ সংবর্ধনা" : "Grand Weddings",
      subtitle: locale === "bn" ? "শাহী দাওয়াত ও স্মরণীয় আয়োজন" : "Mughal Banquets & Royal Celebrations",
      title: locale === "bn" ? "রাজকীয় বিবাহ সংবর্ধনা" : "Royal Wedding Reception",
      desc: locale === "bn"
        ? "ঐতিহ্যবাহী দম পুখত মুঘল কাচ্চি বিরিয়ানি, শাহী রেজালা ও অনন্য মেহমানদারি সেবা।"
        : "Signature Dum Pukht Kacchi feasts, Shahi Rezala, and dedicated 5-star banquet hospitality.",
      capacity: locale === "bn" ? "১০,০০০+ ধারণক্ষমতা" : "Up to 10,000 Guests",
      image: IMAGES.weddingReception,
      href: "/services/wedding-catering",
      cta: locale === "bn" ? "বিবাহ ক্যাটারিং বুক করুন" : "Book Wedding Catering",
    },
    {
      id: "corporate-event",
      num: "02",
      category: locale === "bn" ? "কর্পোরেট ইভেন্ট" : "Corporate Banquets",
      subtitle: locale === "bn" ? "সময়নিষ্ঠ আন্তর্জাতিক মানের বুফে" : "Executive Summits & AGM Buffets",
      title: locale === "bn" ? "কর্পোরেট সম্মেলন ও ডিনার" : "Corporate Summit & AGM",
      desc: locale === "bn"
        ? "আন্তর্জাতিক মানসম্পন্ন সময়নিষ্ঠ কন্টিনেন্টাল ও মাল্টি-কুইজিন লাঞ্চ ও ডিনার।"
        : "Precision multi-cuisine buffets, executive lunch boxes, and punctual hospitality service.",
      capacity: locale === "bn" ? "কর্পোরেট সম্মেলন" : "Executive Summits",
      image: IMAGES.corporateEvent,
      href: "/services/corporate-catering",
      cta: locale === "bn" ? "কর্পোরেট ক্যাটারিং বুক করুন" : "Book Corporate Catering",
    },
    {
      id: "private-party",
      num: "03",
      category: locale === "bn" ? "সামাজিক উৎসব" : "Social Galas",
      subtitle: locale === "bn" ? "লাইভ কাউন্টার ও ঘরোয়া আপ্যায়ন" : "Live Grills & Family Milestone Celebrations",
      title: locale === "bn" ? "ঘরোয়া ও সামাজিক উৎসব" : "Private Social Galas",
      desc: locale === "bn"
        ? "পারিবারিক পুনর্মিলনী ও বিবাহবার্ষিকীর জন্য লাইভ সিসলার গ্রিল ও বিশেষ আপ্যায়ন।"
        : "Live sizzler grills, artisanal dessert counters, and heartfelt family dining experiences.",
      capacity: locale === "bn" ? "৫০ - ১,৫০০ অতিথি" : "50 to 1,500 Guests",
      image: IMAGES.privateParty,
      href: "/services/birthday-party-catering",
      cta: locale === "bn" ? "সোশ্যাল ইভেন্ট বুক করুন" : "Book Social Banquet",
    },
    {
      id: "birthday-party",
      num: "04",
      category: locale === "bn" ? "জন্মদিন ও মাইলফলক" : "Milestone Celebrations",
      subtitle: locale === "bn" ? "কাস্টম মিষ্টান্ন ও আনন্দঘন পরিবেশ" : "Interactive Stations & Custom Delights",
      title: locale === "bn" ? "জন্মদিন ও মাইলফলক" : "Birthday & Milestones",
      desc: locale === "bn"
        ? "সব বয়সের উপযোগী মজাদার খাবারের স্টেশন ও স্পেশাল কেক কাটিং আয়োজন।"
        : "Interactive food stations, finger foods, and custom dessert counters for celebratory milestones.",
      capacity: locale === "bn" ? "কাস্টম আয়োজন" : "All Age Banquets",
      image: IMAGES.birthdayParty,
      href: "/services/birthday-party-catering",
      cta: locale === "bn" ? "বার্থডে ক্যাটারিং বুক করুন" : "Book Birthday Catering",
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white dark:bg-ink-950 text-ink-950 dark:text-white border-y border-ink-100 dark:border-ink-900 relative overflow-hidden transition-colors">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Minimal Luxury */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-white/10 border border-brand-100 dark:border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" strokeWidth={1.75} />
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

        {/* 2x2 Ultra-Premium Full-Bleed Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {occasions.map((occ, idx) => (
            <motion.div
              key={occ.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="relative h-[440px] sm:h-[480px] lg:h-[520px] rounded-3xl overflow-hidden group border border-ink-200/80 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-700 flex flex-col justify-between p-6 sm:p-8"
            >
              {/* Full-Bleed Background Photography */}
              <div className="absolute inset-0 bg-ink-950">
                <Image
                  src={occ.image}
                  alt={occ.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL={PLACEHOLDER_BLUR}
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-108"
                />
                {/* Cinematic Multi-Stop Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25 group-hover:via-black/65 transition-all duration-700" />
                {/* Border highlight on hover */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-brand-500/50 transition-colors duration-500 pointer-events-none" />
              </div>

              {/* Top Header Floating Badges */}
              <div className="relative z-10 flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono tracking-widest uppercase shadow-sm">
                  <span className="text-brand-400 font-bold">{occ.num}</span>
                  <span className="text-white/40">•</span>
                  <span>{occ.category}</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold tracking-wide shadow-sm">
                  <Users className="w-3.5 h-3.5 text-white/90" strokeWidth={1.75} />
                  <span>{occ.capacity}</span>
                </div>
              </div>

              {/* Bottom Editorial Content */}
              <div className="relative z-10 space-y-3 pt-12">
                <div>
                  <span className="font-serif italic text-brand-300 text-xs sm:text-sm font-semibold tracking-wide block mb-1">
                    ~ {occ.subtitle} ~
                  </span>
                  <Link href={occ.href}>
                    <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white group-hover:text-brand-200 transition-colors duration-300 leading-tight">
                      {occ.title}
                    </h3>
                  </Link>
                </div>

                <p className="text-xs sm:text-sm text-white/85 line-clamp-2 max-w-lg leading-relaxed">
                  {occ.desc}
                </p>

                {/* Bottom Action Pill */}
                <div className="pt-3 flex items-center justify-between">
                  <Link
                    href={occ.href}
                    className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white text-ink-950 font-bold text-xs uppercase tracking-wider group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 shadow-md"
                  >
                    <span>{occ.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} />
                  </Link>

                  <span className="text-[11px] font-mono uppercase tracking-widest text-white/60 group-hover:text-white/90 transition-colors hidden sm:inline">
                    ICCB Grand Banquets
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
