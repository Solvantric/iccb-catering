"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  WEDDING_IMG,
  CORPORATE_IMG,
  SOCIAL_IMG,
  BIRTHDAY_IMG,
} from "@/data/images";
import { motion } from "framer-motion";
import { useUIStore } from "@/store/uiStore";
import { translations } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function TileItem({
  occ,
  idx,
  borderClass,
}: {
  occ: any;
  idx: number;
  borderClass: string;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: idx * 0.08 }}
      className={cn(
        "relative aspect-[16/10] overflow-hidden group bg-ink-950",
        borderClass
      )}
    >
      <Link href={occ.href} className="block w-full h-full relative">
        {/* Photo with next/image, fill, object-cover, scale 1.05 over 600ms */}
        {!imgError ? (
          <Image
            src={occ.image}
            alt={occ.title}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition-transform duration-[600ms] group-hover:scale-[1.05]"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-ink-900 flex items-center justify-center text-white/30" />
        )}

        {/* Gradient only on bottom 35% (black/70 to transparent) */}
        <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

        {/* Top-left number "01" in serif italic white */}
        <span className="absolute top-4 left-4 sm:top-5 sm:left-5 font-serif italic text-white text-xl font-medium drop-shadow-sm select-none">
          {occ.num}
        </span>

        {/* Bottom-left: title in Oswald uppercase 18px white (one line), under it ONE short line 12px white/80 */}
        <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 right-28 text-left space-y-0.5">
          <h3 className="font-display font-bold uppercase text-white text-[18px] leading-tight tracking-wide truncate">
            {occ.title}
          </h3>
          <p className="text-[12px] text-white/80 leading-normal line-clamp-1">
            {occ.desc}
          </p>
        </div>

        {/* Bottom-right: small Enquire link */}
        <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5">
          <span className="text-[13px] font-semibold text-white/90 group-hover:text-brand-400 transition-colors whitespace-nowrap">
            {occ.enquire}
          </span>
        </div>

        {/* 2px brand-500 line grows along bottom */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-brand-500 transition-all duration-300 group-hover:w-full" />
      </Link>
    </motion.div>
  );
}

export function OccasionGridSection() {
  const { locale } = useUIStore();
  const t = translations[locale].occasions;

  const occasions = [
    {
      id: "wedding-reception",
      num: "01",
      title: t.cards.weddingReception.title,
      desc: t.cards.weddingReception.desc,
      image: WEDDING_IMG,
      href: "/services/wedding-catering",
      enquire: t.enquire,
    },
    {
      id: "corporate-event",
      num: "02",
      title: t.cards.corporateEvent.title,
      desc: t.cards.corporateEvent.desc,
      image: CORPORATE_IMG,
      href: "/services/corporate-catering",
      enquire: t.enquire,
    },
    {
      id: "private-party",
      num: "03",
      title: t.cards.privateParty.title,
      desc: t.cards.privateParty.desc,
      image: SOCIAL_IMG,
      href: "/services/birthday-party-catering",
      enquire: t.enquire,
    },
    {
      id: "birthday-party",
      num: "04",
      title: t.cards.birthdayParty.title,
      desc: t.cards.birthdayParty.desc,
      image: BIRTHDAY_IMG,
      href: "/services/birthday-party-catering",
      enquire: t.enquire,
    },
  ];

  const borderClasses = [
    "border-b sm:border-r sm:border-b border-ink-900/10 dark:border-white/10",
    "border-b sm:border-b border-ink-900/10 dark:border-white/10",
    "border-b sm:border-b-0 sm:border-r border-ink-900/10 dark:border-white/10",
    "",
  ];

  return (
    <section className="py-16 lg:py-20 bg-white dark:bg-ink-950 text-ink-950 dark:text-white transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto space-y-2 mb-10 lg:mb-12">
          <span className="font-serif italic text-brand-600 dark:text-brand-400 text-sm sm:text-base font-semibold block">
            {t.tag}
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-ink-950 dark:text-white leading-tight">
            {t.heading}
          </h2>
          <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 max-w-xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 2 x 2 Joined Block: aspect-[16/10], radius 4px */}
        <div className="rounded-[4px] overflow-hidden border border-ink-900/10 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-0">
          {occasions.map((occ, idx) => (
            <TileItem
              key={occ.id}
              occ={occ}
              idx={idx}
              borderClass={borderClasses[idx]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
