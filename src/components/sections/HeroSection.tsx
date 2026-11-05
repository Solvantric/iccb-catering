"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { IMAGES, PLACEHOLDER_BLUR } from "@/data/images";
import { SITE_INFO } from "@/data/site";
import { useUIStore } from "@/store/uiStore";
import { translations } from "@/lib/i18n";
import { ShieldCheck, CheckCircle2, Flame, Award } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  const { locale } = useUIStore();
  const t = translations[locale].hero;

  return (
    <section className="relative bg-ink-950 text-white min-h-[90vh] flex items-center overflow-hidden pt-24 pb-16 lg:py-28">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Script Tagline */}
            <div className="inline-flex items-center gap-2">
              <span className="font-serif italic text-brand-400 text-lg sm:text-2xl font-semibold tracking-wide">
                ~ {locale === "bn" ? SITE_INFO.taglineBn : SITE_INFO.tagline} ~
              </span>
            </div>

            {/* Giant Display H1 */}
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight leading-[0.95] text-white">
              {t.title}
            </h1>

            {/* Sub-copy from verified facts */}
            <p className="text-sm sm:text-base text-ink-300 max-w-xl leading-relaxed">
              {t.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Link href="/quote">
                <Button size="lg" withArrow variant="primary">
                  {t.ctaQuote}
                </Button>
              </Link>
              <Link href="/menu">
                <Button size="lg" variant="secondary">
                  {t.ctaMenu}
                </Button>
              </Link>
            </div>

            {/* Verified Trust Badges */}
            <div className="pt-6 border-t border-ink-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-ink-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-500 shrink-0" />
                <span className="font-medium">{t.trust1}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                <span className="font-medium">{t.trust2}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-brand-500 shrink-0" />
                <span className="font-medium">{t.trust3}</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-brand-500 shrink-0" />
                <span className="font-medium">{t.trust4}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Full-Bleed Floating Plate (matches reference layout) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Outer Circular Ring */}
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[440px] lg:h-[440px]">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-brand-500/30 animate-spin-slow pointer-events-none" />
              <div className="absolute inset-3 rounded-full border border-white/10 pointer-events-none" />

              {/* Main Circular Food Plate */}
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-ink-800">
                <Image
                  src={IMAGES.heroFood}
                  alt="ICCB Catering Royal Signature Banquet Dish"
                  fill
                  priority
                  sizes="(max-width: 768px) 300px, 450px"
                  placeholder="blur"
                  blurDataURL={PLACEHOLDER_BLUR}
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating Small Pill Card: Halal & Slaughterhouse */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 sm:bottom-4 sm:-left-6 bg-ink-900/90 backdrop-blur-md border border-ink-700 p-3 sm:p-4 rounded-2xl shadow-xl flex items-center gap-3 text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-brand-400 tracking-wider">
                    In-House Safety
                  </p>
                  <p className="text-xs font-bold text-white">Modern Slaughterhouse</p>
                </div>
              </motion.div>

              {/* Floating Capacity Pill */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-3 -right-3 bg-brand-500 text-white p-3 sm:p-4 rounded-2xl shadow-floating text-center"
              >
                <p className="text-xs font-black uppercase font-display tracking-widest leading-none">
                  Capacity
                </p>
                <p className="text-lg sm:text-xl font-black font-display leading-tight mt-0.5">
                  10,000+
                </p>
                <p className="text-[9px] uppercase tracking-wider opacity-90">Guests Served</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
