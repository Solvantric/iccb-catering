"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IMAGES, PLACEHOLDER_BLUR } from "@/data/images";
import { ArrowUpRight, Users, Sparkles, Building2, Utensils } from "lucide-react";
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
      tagline: locale === "bn" ? "হাজারো অতিথির জন্য অবিস্মরণীয় ভোজ" : "Regal Grand Banquets for 500 to 10,000+ Guests",
      desc: locale === "bn"
        ? "ঐতিহ্যবাহী মুঘল কাচ্চি বিরিয়ানি, শাহী রেজালা ও মনোরম সাজসজ্জার সাথে পূর্ণাঙ্গ ভোজ সেবা।"
        : "Signature Dum Pukht Kacchi, Shahi Rezala, porcelain dinnerware, and dedicated VIP bridal room catering.",
      capacity: locale === "bn" ? "১০,০০০+ অতিথির ধারণক্ষমতা" : "10,000+ Guest Capacity",
      hall: "ICCB Rajdarshan & Gulnaksha",
      image: IMAGES.weddingReception,
      href: "/services/wedding-catering",
      badge: locale === "bn" ? "সবচেয়ে জনপ্রিয়" : "Regal Weddings",
      icon: Sparkles,
    },
    {
      id: "corporate-event",
      title: locale === "bn" ? "কর্পোরেট সম্মেলন ও এজিএম" : "Corporate Summit & AGM",
      tagline: locale === "bn" ? "আন্তর্জাতিক মানসম্পন্ন পেশাদার আতিথেয়তা" : "Diplomatic Galas, Summits & Annual General Meetings",
      desc: locale === "bn"
        ? "বহুজাতিক ও কূটনৈতিক সম্মেলনের জন্য দ্রুত পরিবেশন উপযোগী স্বাস্থ্যসম্মত কন্টিনেন্টাল ও ফিউশন বুফে।"
        : "Precision multi-cuisine buffets, executive lunch boxes, and continuous live hot-tea stations with strict punctuality.",
      capacity: locale === "bn" ? "শীর্ষ করপোরেট পছন্দ" : "Executive Choice",
      hall: "Pushpaguchha & Naboratna",
      image: IMAGES.corporateEvent,
      href: "/services/corporate-catering",
      badge: locale === "bn" ? "কর্পোরেট এক্সিলেন্স" : "Corporate Excellence",
      icon: Building2,
    },
    {
      id: "private-party",
      title: locale === "bn" ? "সামাজিক ও পারিবারিক উৎসব" : "Private Social Galas",
      tagline: locale === "bn" ? "পরিবারের আনন্দঘন মুহূর্তের বিশেষ ভোজ" : "Anniversaries, Reunions & Exclusive Family Evenings",
      desc: locale === "bn"
        ? "লাইভ কাবাব ও গ্রিল কাউন্টার, মুখরোচক ডেজার্ট এবং উষ্ণ পারিবারিক আপ্যায়ন।"
        : "Live sizzler grills, bespoke live carving counters, and artisanal Dhaka sweets served at optimal 65°C+ temperatures.",
      capacity: locale === "bn" ? "৫০ - ৫০০ অতিথি" : "50 to 1,500 Guests",
      hall: "Heritage Suite & Banquets",
      image: IMAGES.privateParty,
      href: "/services/birthday-party-catering",
      badge: locale === "bn" ? "উৎসবের আনন্দ" : "Social Milestones",
      icon: Utensils,
    },
    {
      id: "birthday-party",
      title: locale === "bn" ? "জন্মদিন ও বিশেষ অনুষ্ঠান" : "Birthday & Milestones",
      tagline: locale === "bn" ? "রঙিন ও আনন্দমুখর ক্যাটারিং অভিজ্ঞতা" : "Vibrant Theme Celebrations, High-Tea & Kids' Banquets",
      desc: locale === "bn"
        ? "সব বয়সের উপযোগী মজাদার খাবার, ফিঙ্গার ফুডস ও স্পেশাল কেক কাটিং ব্যবস্থাপনা।"
        : "Gourmet finger foods, mocktail towers, interactive dessert bars, and customized dietary menus for all ages.",
      capacity: locale === "bn" ? "কাস্টম আয়োজন" : "Intimate to Grand",
      hall: "All ICCB Halls & Outdoor",
      image: IMAGES.birthdayParty,
      href: "/services/birthday-party-catering",
      badge: locale === "bn" ? "আনন্দময় ক্ষণ" : "Celebrations",
      icon: Users,
    },
  ];

  return (
    <section className="py-28 bg-ink-950 text-white relative overflow-hidden">
      {/* Decorative ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span className="font-serif italic text-brand-300 text-sm font-semibold tracking-wide">
              {t.tag}
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-tight">
            {t.heading}
          </h2>
          <p className="text-xs sm:text-sm text-ink-300 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 2x2 Ultra-Luxury Editorial Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {occasions.map((occ, idx) => {
            const Icon = occ.icon;
            return (
              <motion.div
                key={occ.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className="group relative h-[440px] sm:h-[480px] rounded-[32px] overflow-hidden border border-white/15 shadow-2xl transition-all duration-500 hover:border-brand-500/80 hover:shadow-[0_20px_60px_-15px_rgba(220,5,17,0.35)]"
              >
                {/* Background Image with Zoom on Hover */}
                <Image
                  src={occ.image}
                  alt={occ.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL={PLACEHOLDER_BLUR}
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />

                {/* Multi-layered Cinematic Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-black/30 transition-opacity duration-500 group-hover:opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-6 inset-x-6 flex items-center justify-between z-10 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-ink-950/70 backdrop-blur-md border border-white/15 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                    <Icon className="w-3.5 h-3.5 text-brand-400" />
                    <span>{occ.badge}</span>
                  </span>

                  <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[11px] font-medium text-white/85">
                    <Users className="w-3 h-3 text-brand-400" />
                    <span>{occ.capacity}</span>
                  </span>
                </div>

                {/* Bottom Glassmorphic Card Container */}
                <div className="absolute bottom-6 inset-x-6 z-10">
                  <div className="p-6 sm:p-7 rounded-2xl bg-ink-950/85 backdrop-blur-xl border border-white/15 shadow-2xl transition-all duration-300 group-hover:border-brand-500/50 group-hover:bg-ink-950/95 group-hover:translate-y-[-4px]">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1 min-w-0">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-brand-400 block">
                          {occ.hall}
                        </span>
                        <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white group-hover:text-brand-400 transition-colors">
                          {occ.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-ink-300 line-clamp-2 leading-relaxed">
                          {occ.desc}
                        </p>
                      </div>

                      {/* Sculpted Luxury Arrow Trigger */}
                      <Link
                        href={occ.href}
                        aria-label={`Explore ${occ.title}`}
                        className="w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-brand-500 group-hover:border-brand-500 group-hover:shadow-[0_0_20px_rgba(220,5,17,0.6)] group-hover:scale-105"
                      >
                        <ArrowUpRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>

                    {/* Tagline Footer inside card */}
                    <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
                      <span className="font-serif italic text-white/90 truncate">
                        {occ.tagline}
                      </span>
                      <Link
                        href={occ.href}
                        className="font-bold text-brand-400 hover:text-white uppercase tracking-wider text-[11px] shrink-0 ml-3 flex items-center gap-1 transition-colors"
                      >
                        <span>{locale === "bn" ? "বিস্তারিত দেখুন" : "Explore Packages"}</span>
                        <span>&rarr;</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
