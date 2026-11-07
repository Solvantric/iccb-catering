"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { VENUES, Venue } from "@/data/venues";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useUIStore } from "@/store/uiStore";
import { translations } from "@/lib/i18n";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

function HallCard({ venue, idx, isBn }: { venue: Venue; idx: number; isBn: boolean }) {
  const [imgError, setImgError] = useState(false);

  // Extract existing seat types: Banquet, Theater, Classroom, U-Shape
  const seatParts: string[] = [];
  if (venue.seats?.banquet) {
    seatParts.push(`${isBn ? "ব্যাঙ্কোয়েট" : "Banquet"} ${venue.seats.banquet}`);
  }
  if (venue.seats?.theater) {
    seatParts.push(`${isBn ? "থিয়েটার" : "Theater"} ${venue.seats.theater}`);
  }
  if (venue.seats?.classroom && seatParts.length < 2) {
    seatParts.push(`${isBn ? "ক্লাসরুম" : "Classroom"} ${venue.seats.classroom}`);
  }
  const seatsLine = seatParts.join(" · ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.08 }}
      className="relative aspect-[3/4] rounded-[2px] overflow-hidden group bg-ink-900 border border-ink-900/10 dark:border-white/10"
    >
      <Link href={`/venues/${venue.slug}`} className="block w-full h-full relative">
        {/* Cover Image or Fallback */}
        {!imgError ? (
          <Image
            src={venue.image}
            alt={venue.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[700ms] group-hover:scale-[1.06]"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-ink-900 flex flex-col items-center justify-center p-6 text-center select-none">
            <span className="font-serif text-6xl text-white/10 font-bold">
              {venue.no}
            </span>
            <span className="font-serif text-lg text-white/60 uppercase tracking-widest mt-2">
              {venue.name}
            </span>
          </div>
        )}

        {/* Bottom gradient black/75 to transparent (lower 50%) */}
        <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none" />

        {/* Top-left: number in Playfair italic white */}
        <span className="absolute top-4 left-4 font-serif italic text-white text-xl font-medium drop-shadow-sm select-none">
          {venue.no}
        </span>

        {/* Top-right: small caps label in a 1px white/40 pill with backdrop-blur */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/40 text-[11px] uppercase tracking-wider text-white font-medium">
          {venue.label}
        </div>

        {/* Bottom details: Name + Seats + View hall row */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-left space-y-1.5 z-10">
          <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white leading-tight">
            {venue.name}
          </h3>

          {seatsLine && (
            <p className="text-xs uppercase tracking-wider text-white/90 font-sans line-clamp-1">
              {seatsLine}
            </p>
          )}

          {/* Hidden row "View hall →" that slides up on hover */}
          <div className="pt-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 font-sans">
            <span>{isBn ? "হলটি দেখুন" : "View hall"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* 2px brand-500 line grows along the bottom */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-brand-500 transition-all duration-300 group-hover:w-full" />
      </Link>
    </motion.div>
  );
}

export default function VenuesPage() {
  const { locale } = useUIStore();
  const isBn = locale === "bn";

  const halls = VENUES.filter((v) => v.type === "hall");
  const moreSpaces = VENUES.filter((v) => v.type !== "hall");

  // Banquet seating sorted high to low for 6 halls
  const banquetHalls = halls
    .filter((h) => h.seats?.banquet)
    .map((h) => ({
      name: h.name,
      label: h.label,
      seats: parseInt(h.seats!.banquet!.replace(/[^0-9]/g, ""), 10),
      rawSeats: h.seats!.banquet!,
    }))
    .sort((a, b) => b.seats - a.seats);

  const maxBanquet = Math.max(...banquetHalls.map((b) => b.seats), 1200);

  return (
    <div className="bg-white dark:bg-ink-950 text-ink-950 dark:text-white transition-colors">
      {/* a) Hero (min-h-[56vh]) */}
      <section className="relative min-h-[56vh] flex items-center justify-center overflow-hidden bg-ink-950 text-center px-4 py-20">
        <Image
          src="https://www.iccbbg.com/assets/upload/wallpaper/wallpaper_1720856910.jpg"
          alt="ICCB Venues"
          fill
          priority
          sizes="100vw"
          className="object-cover transition-transform duration-[10000ms] scale-105 hover:scale-100 ease-out"
        />
        {/* Black/60 overlay and bottom fade */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white dark:from-ink-950 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <div className="flex justify-center text-white/80">
            <Breadcrumbs items={[{ label: isBn ? "ভেন্যুসমূহ" : "Venues" }]} />
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-white leading-tight">
            {isBn ? "আমাদের বিশেষ ভেন্যুসমূহ" : "OUR ICONIC VENUES"}
          </h1>

          <div className="w-12 h-[2px] bg-brand-500 mx-auto" />

          <p className="text-xs sm:text-sm text-white/90 max-w-2xl mx-auto leading-relaxed font-sans">
            {isBn
              ? "মেলা ও প্রদর্শনী, আন্তর্জাতিক সম্মেলন, ফ্যাশন শো, অ্যাওয়ার্ড নাইট, সমাবর্তন এবং রাজকীয় বিবাহের জন্য নির্মিত।"
              : "Built for fairs and expos, conferences, fashion shows, award nights, convocations and weddings."}
          </p>
        </div>
      </section>

      {/* b) Intro strip: Display statement + 3 count-ups */}
      <section className="py-14 sm:py-16 border-b border-ink-100 dark:border-white/10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 text-left">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-ink-950 dark:text-white leading-snug uppercase tracking-tight">
              {isBn
                ? "কনভেনশন হল, এক্সপো ভিলেজ এবং প্রাইভেট ডাইনিং রুম। একই ঠিকানায়।"
                : "Halls, an expo village and private dining rooms. One address."}
            </h2>
          </div>

          <div className="lg:col-span-6 grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <span className="font-display font-black text-3xl sm:text-4xl text-brand-600 dark:text-brand-400">
                2015
              </span>
              <p className="text-[11px] uppercase tracking-wider text-ink-500 dark:text-ink-400 font-sans">
                {isBn ? "যাত্রা শুরু" : "Operating since"}
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-display font-black text-3xl sm:text-4xl text-brand-600 dark:text-brand-400">
                6
              </span>
              <p className="text-[11px] uppercase tracking-wider text-ink-500 dark:text-ink-400 font-sans">
                {isBn ? "টি হল" : "Halls"}
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-display font-black text-3xl sm:text-4xl text-brand-600 dark:text-brand-400">
                1
              </span>
              <p className="text-[11px] uppercase tracking-wider text-ink-500 dark:text-ink-400 font-sans">
                {isBn ? "এক্সপো ভিলেজ" : "Expo Village"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* c) Hall Grid: 6 halls, all visible, 3 cols lg, 2 cols sm, 1 col mobile */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-8 space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            {isBn ? "কনভেনশন হলসমূহ" : "Convention Halls"}
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-ink-950 dark:text-white">
            {isBn ? "আমাদের ৬টি বিশেষ হল" : "Our Six Signature Halls"}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {halls.map((hall, idx) => (
            <HallCard key={hall.slug} venue={hall} idx={idx} isBn={isBn} />
          ))}
        </div>
      </section>

      {/* d) More Spaces: Expo Village + Heritage Dining (2 wide cards, aspect-[16/10]) */}
      <section className="pb-16 lg:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-8 space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            {isBn ? "অন্যান্য বিশেষ স্পেস" : "More Spaces"}
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-ink-950 dark:text-white">
            {isBn ? "এক্সপো ভিলেজ ও প্রাইভেট ডাইনিং" : "Expo Village & Dining"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {moreSpaces.map((space, idx) => {
            const shortFact =
              space.slug === "expo-village"
                ? "12,500 sq m · 13 m height"
                : space.note || "Seating from 20 to 40 people";

            return (
              <motion.div
                key={space.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="relative aspect-[16/10] rounded-3xl overflow-hidden group bg-ink-900 border border-ink-100 dark:border-white/10 shadow-sm hover:shadow-lg transition-all"
              >
                <Link
                  href={`/venues/${space.slug}`}
                  className="block w-full h-full relative"
                >
                  <Image
                    src={space.image}
                    alt={space.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[700ms] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none" />

                  {/* Top-right pill */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[11px] uppercase tracking-wider text-white font-bold font-sans">
                    {space.label}
                  </div>

                  {/* Bottom details */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-left space-y-1.5 z-10">
                    <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white leading-tight">
                      {space.name}
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-white/80 font-sans">
                      {shortFact}
                    </p>
                    <div className="pt-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 font-sans">
                      <span>{isBn ? "বিস্তারিত দেখুন" : "View details"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-brand-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* e) Banquet seating at a glance: horizontal animated bars from VENUES */}
      <section className="py-16 bg-white dark:bg-ink-900 border-t border-ink-100 dark:border-white/10 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-8">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              {isBn ? "ধারণক্ষমতা এক নজরে" : "Capacity Overview"}
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-ink-950 dark:text-white">
              {isBn ? "ব্যাঙ্কোয়েট টেবিল আসন সংখ্যা" : "Banquet Seating at a Glance"}
            </h2>
            <p className="text-xs text-ink-500 dark:text-ink-400 font-sans">
              {isBn
                ? "ব্যাঙ্কোয়েট টেবিল সেটআপের সর্বোচ্চ ধারণক্ষমতা।"
                : "Seats with banquet tables."}
            </p>
          </div>

          <div className="space-y-5">
            {banquetHalls.map((hall) => {
              const pct = (hall.seats / maxBanquet) * 100;
              return (
                <div key={hall.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs sm:text-sm font-semibold font-sans">
                    <span className="text-ink-900 dark:text-white">
                      {hall.name} ({hall.label})
                    </span>
                    <span className="font-display font-black text-brand-600 dark:text-brand-400">
                      {hall.rawSeats}
                    </span>
                  </div>

                  {/* 1px track with 4px brand-500 bar that grows from 0 in 900ms */}
                  <div className="relative h-1.5 w-full bg-ink-100 dark:bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                      className="h-full bg-brand-500 rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* f) Closing Band: Pure white in light mode with display typography */}
      <section className="py-16 bg-white dark:bg-ink-950 text-ink-950 dark:text-white border-t border-ink-100 dark:border-white/10 text-center px-4">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-950 dark:text-white">
            {isBn ? "আইসিসিবিতে আপনার ইভেন্ট পরিকল্পনা করুন" : "Plan your event at ICCB"}
          </h2>
          <p className="text-xs sm:text-sm text-ink-600 dark:text-white/70 max-w-lg mx-auto font-sans">
            {isBn
              ? "আমাদের অভিজ্ঞ ব্যাঙ্কোয়েট টিম আপনার আয়োজন নিখুঁত করতে প্রস্তুত।"
              : "Our experienced banquet specialists are ready to tailor our venues to your exact specifications."}
          </p>
          <div className="pt-2">
            <Link href="/inquiry">
              <button
                type="button"
                className="bg-brand-500 hover:bg-brand-600 text-white uppercase tracking-wider text-xs px-8 py-3.5 rounded-full font-bold transition-all shadow-md inline-block"
              >
                {isBn ? "অনুসন্ধান করুন" : "Enquire"}
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
