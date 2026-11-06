"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { IMAGES, PLACEHOLDER_BLUR } from "@/data/images";
import { motion } from "framer-motion";
import { useUIStore } from "@/store/uiStore";
import { translations } from "@/lib/i18n";

export function ChooseMenuSection() {
  const { locale } = useUIStore();
  const t = translations[locale].chooseMenu;

  const menuCategories = [
    {
      id: "mughal",
      title: t.categories.mughal.title,
      subtitle: t.categories.mughal.subtitle,
      desc: t.categories.mughal.desc,
      image: IMAGES.kacchiBiryani,
      tag: t.categories.mughal.tag,
      href: "/cuisines/mughal",
    },
    {
      id: "continental",
      title: t.categories.continental.title,
      subtitle: t.categories.continental.subtitle,
      desc: t.categories.continental.desc,
      image: IMAGES.salmonPlatter,
      tag: t.categories.continental.tag,
      href: "/cuisines/continental",
    },
    {
      id: "multicuisine",
      title: t.categories.multicuisine.title,
      subtitle: t.categories.multicuisine.subtitle,
      desc: t.categories.multicuisine.desc,
      image: IMAGES.grilledKebab,
      tag: t.categories.multicuisine.tag,
      href: "/cuisines/multi-cuisine",
    },
  ];

  return (
    <section className="py-24 bg-brand-50/50 dark:bg-ink-950/70 relative overflow-hidden transition-colors">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto space-y-3 mb-20">
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

        {/* 3 Menu Cards with Overlapping Circular Plate on Top (Exact Reference Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 pt-10">
          {menuCategories.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative bg-white dark:bg-ink-900 rounded-3xl p-8 pt-24 border border-ink-100 dark:border-white/10 shadow-soft hover:shadow-card hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Overlapping Circular Plate Image on Top (Key Reference Feature) */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full overflow-hidden shadow-xl border-4 border-white dark:border-ink-800 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="140px"
                  placeholder="blur"
                  blurDataURL={PLACEHOLDER_BLUR}
                  className="object-cover"
                />
              </div>

              {/* Card Body */}
              <div className="space-y-3 text-center">
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full">
                  {card.tag}
                </span>
                <h3 className="font-display font-bold text-xl uppercase tracking-wider text-ink-950 dark:text-ink-50">
                  {card.title}
                </h3>
                <p className="text-xs text-brand-600 dark:text-brand-400 font-semibold">{card.subtitle}</p>
                <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed pt-2">
                  {card.desc}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <Link href={card.href} className="block w-full">
                  <Button variant="outline" className="w-full text-xs font-bold uppercase tracking-wider group-hover:bg-brand-500 group-hover:text-white group-hover:border-brand-500 dark:border-white/20 dark:text-ink-100 transition-colors" withArrow>
                    {t.exploreBtn}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

