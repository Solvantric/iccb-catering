"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { IMAGES, PLACEHOLDER_BLUR } from "@/data/images";
import { motion } from "framer-motion";

const menuCategories = [
  {
    id: "mughal",
    title: "MUGHAL CUISINE",
    subtitle: "Heritage Royal Banquets",
    desc: "Legendary Kacchi Biryani, tender mutton rezala, golden chicken roast, and clay pot firni prepared by master culinary craftsmen.",
    image: IMAGES.kacchiBiryani,
    tag: "Authentic Heritage",
    href: "/cuisines/mughal",
  },
  {
    id: "continental",
    title: "CONTINENTAL DELIGHTS",
    subtitle: "Modern Executive Plating",
    desc: "Herb-crusted beef fillets, Norwegian salmon, creamy pastas, fresh garden salads, and exquisite French high-tea confections.",
    image: IMAGES.salmonPlatter,
    tag: "Corporate & Diplomatic",
    href: "/cuisines/continental",
  },
  {
    id: "multicuisine",
    title: "MULTI-CUISINE FUSION",
    subtitle: "Curated Global Spreads",
    desc: "Szechuan delicacies, live dim sum steamers, tandoori skewers, and festive Bengali spreads tailored for versatile gala occasions.",
    image: IMAGES.grilledKebab,
    tag: "Versatile & Dynamic",
    href: "/cuisines/multi-cuisine",
  },
];

export function ChooseMenuSection() {
  return (
    <section className="py-24 bg-brand-50/50 relative overflow-hidden">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto space-y-3 mb-20">
          <span className="font-serif italic text-brand-600 text-lg font-semibold block">
            ~ Curated Culinary Collections ~
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-ink-950">
            CHOOSE YOUR MENU
          </h2>
          <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
            Select from our royal heritage cuisines or partner with our Executive Master Chefs to engineer a bespoke menu tailored to your guests.
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
              className="relative bg-white rounded-3xl p-8 pt-24 border border-ink-100 shadow-soft hover:shadow-card hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Overlapping Circular Plate Image on Top (Key Reference Feature) */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full overflow-hidden shadow-xl border-4 border-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
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
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                  {card.tag}
                </span>
                <h3 className="font-display font-bold text-xl uppercase tracking-wider text-ink-950">
                  {card.title}
                </h3>
                <p className="text-xs text-brand-600 font-semibold">{card.subtitle}</p>
                <p className="text-xs text-ink-600 leading-relaxed pt-2">
                  {card.desc}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <Link href={card.href} className="block w-full">
                  <Button variant="outline" className="w-full text-xs font-bold uppercase tracking-wider group-hover:bg-brand-500 group-hover:text-white group-hover:border-brand-500 transition-colors" withArrow>
                    Get Menu
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
