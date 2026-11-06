"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IMAGES, PLACEHOLDER_BLUR } from "@/data/images";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useUIStore } from "@/store/uiStore";
import { translations } from "@/lib/i18n";

export function OccasionGridSection() {
  const { locale } = useUIStore();
  const t = translations[locale].occasions;

  const occasions = [
    {
      id: "private-party",
      title: t.cards.privateParty.title,
      desc: t.cards.privateParty.desc,
      image: IMAGES.privateParty,
      href: "/services/birthday-party-catering",
    },
    {
      id: "wedding-reception",
      title: t.cards.weddingReception.title,
      desc: t.cards.weddingReception.desc,
      image: IMAGES.weddingReception,
      href: "/services/wedding-catering",
    },
    {
      id: "corporate-event",
      title: t.cards.corporateEvent.title,
      desc: t.cards.corporateEvent.desc,
      image: IMAGES.corporateEvent,
      href: "/services/corporate-catering",
    },
    {
      id: "birthday-party",
      title: t.cards.birthdayParty.title,
      desc: t.cards.birthdayParty.desc,
      image: IMAGES.birthdayParty,
      href: "/services/birthday-party-catering",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-ink-950 relative transition-colors">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto space-y-3 mb-16">
          <span className="font-serif italic text-brand-600 dark:text-brand-400 text-lg font-semibold block">
            {t.tag}
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-ink-950 dark:text-ink-50">
            {t.heading}
          </h2>
          <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 2x2 Image Cards with White Overlay Label Boxes (Exact Reference Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {occasions.map((occ, idx) => (
            <motion.div
              key={occ.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative h-[340px] sm:h-[400px] rounded-3xl overflow-hidden shadow-soft group border border-ink-100 dark:border-white/10"
            >
              {/* Background Photo */}
              <Image
                src={occ.image}
                alt={occ.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL={PLACEHOLDER_BLUR}
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Subtle dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* White Overlay Box on Bottom (Exact Reference Card Feature) */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-ink-900/95 backdrop-blur-md p-6 rounded-2xl shadow-xl text-left border border-white/60 dark:border-white/10 transition-all duration-300 group-hover:bg-white dark:group-hover:bg-ink-900 group-hover:translate-y-[-4px]">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-black text-lg sm:text-xl uppercase tracking-wider text-ink-950 dark:text-ink-50">
                    {occ.title}
                  </h3>
                  <Link
                    href={occ.href}
                    className="w-9 h-9 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-500 flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-colors shrink-0"
                    aria-label={`View ${occ.title}`}
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </Link>
                </div>
                <p className="text-xs text-ink-600 dark:text-ink-300 mt-2 line-clamp-2 leading-relaxed">
                  {occ.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

