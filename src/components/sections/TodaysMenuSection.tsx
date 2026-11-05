"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MENU_ITEMS } from "@/data/menu";
import { formatCurrency } from "@/lib/format";
import { PLACEHOLDER_BLUR } from "@/data/images";
import { Sparkles, Utensils } from "lucide-react";
import { motion } from "framer-motion";

export function TodaysMenuSection() {
  const todaysDishes = MENU_ITEMS.filter((item) => item.isTodaysMenu).slice(0, 6);

  return (
    <section className="py-24 bg-ink-950 text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto space-y-3 mb-16">
          <span className="font-serif italic text-brand-400 text-lg font-semibold block">
            ~ Fresh from the Royal Kitchen ~
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
            TODAY&apos;S SPECIAL MENU
          </h2>
          <p className="text-xs sm:text-sm text-ink-300 leading-relaxed">
            Handpicked signature culinary selections prepared fresh each day with meats from our modern slaughterhouse and tested by food quality inspectors.
          </p>
        </div>

        {/* Menu Items Grid with Circular Thumbnail + Dotted Leader Line + Price (Exact Reference Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10 text-left pt-4">
          {todaysDishes.map((dish, idx) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-center gap-4 sm:gap-6 group"
            >
              {/* Circular Plate Thumbnail */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 border-2 border-brand-500/40 shadow-lg group-hover:scale-105 group-hover:border-brand-500 transition-all duration-300">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  sizes="100px"
                  placeholder="blur"
                  blurDataURL={PLACEHOLDER_BLUR}
                  className="object-cover"
                />
              </div>

              {/* Item Info with Dotted Leader to Price */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between w-full">
                  <h3 className="font-display font-bold text-base sm:text-lg uppercase tracking-wider text-white truncate group-hover:text-brand-400 transition-colors">
                    {dish.name}
                  </h3>

                  {/* Dotted Leader Line (Exact Reference Visual Feature) */}
                  <div className="dotted-leader hidden sm:block" />

                  {/* Price */}
                  <span className="font-display font-bold text-base sm:text-lg text-brand-400 shrink-0 ml-2">
                    {formatCurrency(dish.price)}
                  </span>
                </div>

                {/* Subtitle / Description */}
                <p className="text-xs text-ink-400 line-clamp-2 mt-1 leading-relaxed">
                  {dish.description}
                </p>

                {/* Tags */}
                <div className="flex items-center gap-2 mt-2">
                  {dish.dietTags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] uppercase tracking-wider font-semibold text-brand-300 bg-brand-950/70 border border-brand-800/80 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {dish.preparationTime && (
                    <span className="text-[9px] text-ink-500">
                      &bull; {dish.preparationTime}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="pt-16">
          <Link href="/menu">
            <Button size="lg" withArrow variant="primary">
              View Complete Menu
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
