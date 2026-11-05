"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IMAGES, PLACEHOLDER_BLUR } from "@/data/images";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const occasions = [
  {
    id: "private-party",
    title: "PRIVATE / SOCIAL PARTY",
    desc: "Intimate family celebrations, anniversaries, and reunions catered with personalized dining touch.",
    image: IMAGES.privateParty,
    href: "/services/birthday-party-catering",
  },
  {
    id: "wedding-reception",
    title: "WEDDING RECEPTION",
    desc: "Grand royal wedding feasts, Holud nights, and Walima banquets with signature Mughal cuisine.",
    image: IMAGES.weddingReception,
    href: "/services/wedding-catering",
  },
  {
    id: "corporate-event",
    title: "CORPORATE EVENT",
    desc: "Punctual, sophisticated catering for AGMs, conferences, international expos, and executive galas.",
    image: IMAGES.corporateEvent,
    href: "/services/corporate-catering",
  },
  {
    id: "birthday-party",
    title: "BIRTHDAY CELEBRATION",
    desc: "Fun, vibrant culinary stations, finger food platters, and custom dessert counters for milestone birthdays.",
    image: IMAGES.birthdayParty,
    href: "/services/birthday-party-catering",
  },
];

export function OccasionGridSection() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto space-y-3 mb-16">
          <span className="font-serif italic text-brand-600 text-lg font-semibold block">
            ~ Versatile Hospitality ~
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-ink-950">
            CATERING FOR ANY OCCASION
          </h2>
          <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
            From intimate gatherings of 30 family members to national summits of 10,000+ delegates, our team executes with flawless hospitality.
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
              className="relative h-[340px] sm:h-[400px] rounded-3xl overflow-hidden shadow-soft group border border-ink-100"
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
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl text-left border border-white/60 transition-all duration-300 group-hover:bg-white group-hover:translate-y-[-4px]">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-black text-lg sm:text-xl uppercase tracking-wider text-ink-950">
                    {occ.title}
                  </h3>
                  <Link
                    href={occ.href}
                    className="w-9 h-9 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-colors shrink-0"
                    aria-label={`View ${occ.title}`}
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </Link>
                </div>
                <p className="text-xs text-ink-600 mt-2 line-clamp-2 leading-relaxed">
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

