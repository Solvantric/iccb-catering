"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { IMAGES, PLACEHOLDER_BLUR } from "@/data/images";
import { motion } from "framer-motion";
import { useUIStore } from "@/store/uiStore";
import { translations } from "@/lib/i18n";
import { Sparkles } from "lucide-react";

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
      cuisine: locale === "bn" ? "মুঘল ঐতিহ্য" : "Mughal Heritage",
      href: "/cuisines/mughal",
    },
    {
      id: "continental",
      title: t.categories.continental.title,
      subtitle: t.categories.continental.subtitle,
      desc: t.categories.continental.desc,
      image: IMAGES.salmonPlatter,
      tag: t.categories.continental.tag,
      cuisine: locale === "bn" ? "কন্টিনেন্টাল বুফে" : "Continental Gourmet",
      href: "/cuisines/continental",
    },
    {
      id: "multicuisine",
      title: t.categories.multicuisine.title,
      subtitle: t.categories.multicuisine.subtitle,
      desc: t.categories.multicuisine.desc,
      image: IMAGES.grilledKebab,
      tag: t.categories.multicuisine.tag,
      cuisine: locale === "bn" ? "মাল্টি-কুইজিন ফিউশন" : "Multi-Cuisine Fusion",
      href: "/cuisines/multi-cuisine",
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white dark:bg-ink-950 text-ink-950 dark:text-white border-y border-ink-100 dark:border-ink-900 relative overflow-hidden transition-colors">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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

        {/* Menu Cards: Same Design as /menu Page Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menuCategories.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="bg-white dark:bg-ink-900 rounded-3xl p-6 border border-ink-100 dark:border-white/10 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Hero Dish Image */}
                <div className="relative h-56 rounded-2xl overflow-hidden mb-5 border border-ink-100 dark:border-ink-800 bg-ink-100 dark:bg-ink-950">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    placeholder="blur"
                    blurDataURL={PLACEHOLDER_BLUR}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Floating Tag Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-ink-950/80 text-white backdrop-blur-sm border border-white/10">
                      {card.tag}
                    </span>
                  </div>
                </div>

                {/* Category & Cuisine */}
                <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-brand-600 dark:text-brand-400 mb-1.5">
                  <span>{card.cuisine}</span>
                  <span className="text-ink-400 dark:text-ink-500 font-medium">Bespoke Course</span>
                </div>

                {/* Title */}
                <Link href={card.href}>
                  <h3 className="font-display font-bold text-xl uppercase text-ink-950 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {card.title}
                  </h3>
                </Link>

                {/* Subtitle */}
                {card.subtitle && (
                  <p className="text-xs text-brand-600 dark:text-brand-400 font-serif italic mb-2">
                    {card.subtitle}
                  </p>
                )}

                {/* Description */}
                <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed mb-6">
                  {card.desc}
                </p>
              </div>

              {/* Footer Details & Explore Action */}
              <div className="pt-4 border-t border-ink-100 dark:border-ink-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-ink-400 dark:text-ink-500 uppercase tracking-wider block font-semibold">
                    Service
                  </span>
                  <span className="font-display font-bold text-sm text-ink-900 dark:text-white">
                    ICCB Master Chef
                  </span>
                </div>
                <Link href={card.href}>
                  <Button size="sm" variant="outline" withArrow>
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
