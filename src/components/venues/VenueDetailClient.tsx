"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Venue, VENUES, COMMON_GALLERY } from "@/data/venues";
import { PLACEHOLDER_BLUR } from "@/data/images";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useUIStore } from "@/store/uiStore";
import {
  Check,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Phone,
  Ruler,
  Car,
  Users,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export function VenueDetailClient({ venue }: { venue: Venue }) {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState<number | null>(null);
  const { locale } = useUIStore();
  const isBn = locale === "bn";

  const otherVenues = VENUES.filter((v) => v.slug !== venue.slug);
  const isExpo = venue.slug === "expo-village";
  const isDining = venue.slug === "heritage-restaurant-venues";
  const isHall = venue.type === "hall";

  // Venue Bengali localized content
  const venueTitle =
    venue.slug === "gulnaksha"
      ? isBn ? "গুলনকশা (কনভেনশন হল ০১)" : "Gulnaksha (Hall 01)"
      : venue.slug === "pushpaguchha"
      ? isBn ? "পুষ্পগুচ্ছ (কনভেনশন হল ০২)" : "Pushpaguchha (Hall 02)"
      : venue.slug === "rajdarshan"
      ? isBn ? "রাজদর্শন (কনভেনশন হল ০৩)" : "Rajdarshan (Hall 03)"
      : venue.slug === "naboratna"
      ? isBn ? "নবরত্ন (কনভেনশন হল ০৪)" : "Naboratna (Hall 04)"
      : venue.name;

  const venueIntro =
    venue.slug === "gulnaksha" && isBn
      ? "আইসিসিবি-তে প্রবেশের মুখে হাতের ডানে অবস্থিত প্রথম হল, যার রয়েছে সবুজ বাগান ও দৃষ্টিনন্দন রোডসাইড ভিউ। ভেতরে কোনো পিলার নেই এবং রয়েছে চমৎকার উঁচু সিলিং, যার ফলে যেকোনো ধরনের স্টেজ, বিয়ের সেটআপ কিংবা কর্পোরেট এক্সপো আয়োজন করা যায় অত্যন্ত স্বাচ্ছন্দ্যে।"
      : venue.intro;

  const venueRent =
    isBn && venue.rent
      ? venue.slug === "gulnaksha"
        ? "ভাড়া: ৪,০০,০০০ টাকা (+ ভ্যাট/অন্যান্য চার্জ)"
        : venue.rent
      : venue.rent;

  const venueParking =
    isBn && venue.parking
      ? "৫০০টিরও বেশি গাড়ির নিজস্ব সুরক্ষিত পার্কিং"
      : venue.parking;

  const venueMaxEvent =
    isBn && venue.maxEvent
      ? "১,৬০০ জন অতিথি পর্যন্ত ধারণক্ষমতা"
      : venue.maxEvent;

  // Seat types that exist
  const seatsList: { label: string; count: string }[] = [];
  if (venue.seats?.theater) {
    seatsList.push({
      label: isBn ? "থিয়েটার স্টাইল" : "THEATER",
      count: venue.seats.theater,
    });
  }
  if (venue.seats?.banquet) {
    seatsList.push({
      label: isBn ? "ব্যাঙ্কোয়েট ডাইনিং" : "BANQUET",
      count: venue.seats.banquet,
    });
  }
  if (venue.seats?.classroom) {
    seatsList.push({
      label: isBn ? "ক্লাসরুম সিটিং" : "CLASSROOM",
      count: venue.seats.classroom,
    });
  }
  if (venue.seats?.uShape) {
    seatsList.push({
      label: isBn ? "ইউ-শেপ বৈঠক" : "U-SHAPE",
      count: venue.seats.uShape,
    });
  }

  // Gallery items split into left and right columns
  const colLeft = [
    { ...COMMON_GALLERY[0], aspect: "aspect-[4/5]", originalIdx: 0 },
    { ...COMMON_GALLERY[2], aspect: "aspect-[4/3]", originalIdx: 2 },
  ];
  const colRight = [
    { ...COMMON_GALLERY[1], aspect: "aspect-[4/3]", originalIdx: 1 },
    { ...COMMON_GALLERY[3], aspect: "aspect-[4/5]", originalIdx: 3 },
  ];

  return (
    <div className="bg-white dark:bg-ink-950 text-ink-950 dark:text-white min-h-screen transition-colors text-base font-sans">
      {/* 1. Hero: full-bleed with cinematic scrim */}
      <section className="relative w-full h-[60vh] min-h-[440px] max-h-[640px] overflow-hidden bg-ink-950">
        <Image
          src={venue.image}
          alt={venueTitle}
          fill
          priority
          sizes="100vw"
          className="object-cover transition-transform duration-[10000ms] scale-105 hover:scale-100 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/35 pointer-events-none" />

        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 space-y-3 max-w-4xl mx-auto">
          <div className="flex justify-center text-white/80 mb-2">
            <Breadcrumbs
              items={[
                { label: isBn ? "ভেন্যুসমূহ" : "Venues", href: "/venues" },
                { label: venueTitle },
              ]}
            />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-brand-300">
              {venue.label}
            </span>
          </div>

          <h1 className="font-display font-black uppercase tracking-tight text-3xl sm:text-5xl lg:text-6xl text-white leading-tight drop-shadow-md">
            {venueTitle}
          </h1>

          <p className="font-serif italic text-brand-200 text-sm sm:text-base max-w-2xl mx-auto">
            ~ {isBn ? "আইসিসিবি বসুন্ধরা আন্তর্জাতিক মানের কনভেনশন সেন্টার" : "International Convention City Bashundhara"} ~
          </p>
        </div>
      </section>

      {/* 2. Numbers row (halls only): Bold Display Typography like Home Page */}
      {isHall && seatsList.length > 0 && (
        <section className="py-10 bg-white dark:bg-ink-900 border-b border-ink-100 dark:border-white/10 transition-colors">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {seatsList.map((st) => (
                <div key={st.label} className="space-y-1">
                  <span className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-brand-600 dark:text-brand-400 block leading-none">
                    {st.count}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-ink-500 dark:text-ink-400 font-semibold block pt-1 font-sans">
                    {st.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Main Content: Left 8 cols / Right 4 cols (sticky) */}
      <section className="py-16 lg:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-10 text-left">
            {/* Intro paragraph */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 block">
                {isBn ? "ভেন্যু পরিচিতি ও বিবরণ" : "Overview"}
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-ink-950 dark:text-white">
                {isBn ? "বিশাল পরিসর ও পিলারলেস স্থাপত্যশৈলী" : "EXPANSIVE PILLARLESS ARCHITECTURE"}
              </h2>
              <p className="text-xs sm:text-sm text-ink-700 dark:text-ink-300 leading-relaxed font-sans">
                {venueIntro}
              </p>
            </div>

            {/* Hall Measurements Table */}
            {venue.size && (
              <div className="space-y-4 pt-4 border-t border-ink-100 dark:border-white/10">
                <div className="flex items-center gap-2 text-ink-950 dark:text-white">
                  <Ruler className="w-5 h-5 text-brand-500" />
                  <h3 className="font-display font-black uppercase tracking-tight text-lg sm:text-xl">
                    {isBn ? "হলের পরিমাপ ও স্পেসিফিকেশন" : "Hall Measurements"}
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-ink-200 dark:border-white/10 text-center">
                  {venue.size.length && (
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-ink-400 block font-sans">
                        {isBn ? "দৈর্ঘ্য" : "Length"}
                      </span>
                      <span className="font-display font-black text-lg text-ink-900 dark:text-white">
                        {venue.size.length}
                      </span>
                    </div>
                  )}
                  {venue.size.width && (
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-ink-400 block font-sans">
                        {isBn ? "প্রস্থ" : "Width"}
                      </span>
                      <span className="font-display font-black text-lg text-ink-900 dark:text-white">
                        {venue.size.width}
                      </span>
                    </div>
                  )}
                  {venue.size.height && (
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-ink-400 block font-sans">
                        {isBn ? "সিলিং উচ্চতা" : "Height"}
                      </span>
                      <span className="font-display font-black text-lg text-ink-900 dark:text-white">
                        {venue.size.height}
                      </span>
                    </div>
                  )}
                  {venue.size.mezzanine && (
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-ink-400 block font-sans">
                        {isBn ? "মেজানাইন ফ্লোর" : "Mezzanine Floor"}
                      </span>
                      <span className="font-display font-black text-lg text-ink-900 dark:text-white">
                        {venue.size.mezzanine}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Parking and Event size lines */}
            {(venue.parking || venue.maxEvent) && (
              <div className="space-y-3 pt-4 border-t border-ink-100 dark:border-white/10 text-xs sm:text-sm font-sans">
                {venue.parking && (
                  <div className="flex items-center gap-2.5 text-ink-800 dark:text-ink-200">
                    <Car className="w-4 h-4 text-brand-500 shrink-0" />
                    <span>
                      <strong>{isBn ? "পার্কিং সুবিধা:" : "Parking:"}</strong> {venueParking}
                    </span>
                  </div>
                )}
                {venue.maxEvent && (
                  <div className="flex items-center gap-2.5 text-ink-800 dark:text-ink-200">
                    <Users className="w-4 h-4 text-brand-500 shrink-0" />
                    <span>
                      <strong>{isBn ? "সর্বোচ্চ অতিথি ধারণক্ষমতা:" : "Event Size:"}</strong> {venueMaxEvent}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Layouts list if present */}
            {venue.layouts && venue.layouts.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-ink-100 dark:border-white/10">
                <h3 className="font-display font-black uppercase tracking-tight text-lg text-ink-950 dark:text-white">
                  {isBn ? "সম্ভাব্য সিটিং লেআউট" : "Available Layouts"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {venue.layouts.map((l, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs sm:text-sm text-ink-800 dark:text-ink-200 font-sans"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      <span>{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Expo Village: Facts checklist + in-tile YouTube Player */}
            {isExpo && (
              <div className="space-y-8 pt-4 border-t border-ink-100 dark:border-white/10">
                {venue.facts && (
                  <div className="space-y-3">
                    <h3 className="font-display font-black uppercase tracking-tight text-lg text-ink-950 dark:text-white">
                      {isBn ? "এক্সপো ভিলেজের মূল বৈশিষ্ট্যসমূহ" : "Key Facts & Features"}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-ink-800 dark:text-ink-200 font-sans">
                      {venue.facts.map((f, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          <Check className="w-4 h-4 text-brand-500 shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* In-tile YouTube Player */}
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-ink-200 dark:border-white/10 group shadow-md">
                  {videoPlaying ? (
                    <>
                      <iframe
                        src="https://www.youtube-nocookie.com/embed/5xrEvhLymd8?autoplay=1&rel=0&modestbranding=1&playsinline=1&fs=0"
                        title="Expo Village Video"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        className="w-full h-full border-0 absolute inset-0"
                      />
                      <button
                        type="button"
                        onClick={() => setVideoPlaying(false)}
                        aria-label="Stop video"
                        className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/40 text-white flex items-center justify-center shadow-md transition-all active:scale-95"
                      >
                        <X size={16} strokeWidth={2} />
                      </button>
                    </>
                  ) : (
                    <div
                      className="cursor-pointer w-full h-full relative"
                      onClick={() => setVideoPlaying(true)}
                    >
                      <Image
                        src="https://img.youtube.com/vi/5xrEvhLymd8/maxresdefault.jpg"
                        alt="Expo Village Video"
                        fill
                        className="object-cover transition-transform duration-[600ms] group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/25 pointer-events-none" />

                      <div className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/35 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110 pointer-events-none">
                        <Play className="w-4 h-4 fill-white text-white translate-x-[1px]" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Booking / Rent Panel (Pure White in Light Mode) */}
          <div className="lg:col-span-4 sticky top-[calc(var(--header-h)+24px)]">
            <div className="border border-ink-200 dark:border-white/10 rounded-3xl bg-white dark:bg-ink-900 p-6 sm:p-8 space-y-6 text-left shadow-soft">
              {/* Hall Rent if present */}
              {venue.rent && (
                <div className="space-y-1.5 pb-4 border-b border-ink-100 dark:border-white/10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 block font-sans">
                    {isBn ? "হল ভাড়া ও চার্জ" : "HALL RENT"}
                  </span>
                  <div className="font-display font-black text-2xl sm:text-3xl text-ink-950 dark:text-white leading-tight">
                    {venueRent}
                  </div>
                  <p className="text-[11px] text-ink-500 italic font-sans">
                    {isBn ? "* বর্তমান ভ্যাট ও চার্জ নিশ্চিত করতে কল করুন" : "Please confirm current rates with our booking team."}
                  </p>
                </div>
              )}

              {/* Facilities check list if present */}
              {venue.facilities && venue.facilities.length > 0 && (
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block font-sans">
                    {isBn ? "অন্তর্ভুক্ত সুযোগ-সুবিধাসমূহ" : "INCLUDED FACILITIES"}
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-ink-700 dark:text-ink-300 font-sans">
                    {venue.facilities.map((fac, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" strokeWidth={1.75} />
                        <span>
                          {isBn
                            ? fac.includes("green room")
                              ? "২টি শীতাতপ নিয়ন্ত্রিত গ্রিন রুম"
                              : fac.includes("air conditioning")
                              ? "কেন্দ্রীয় এয়ার কন্ডিশনিং ব্যবস্থা"
                              : fac.includes("Generator")
                              ? "নিরবচ্ছিন্ন জেনারেটর ব্যাকআপ পাওয়ার"
                              : fac.includes("Fire")
                              ? "আধুনিক অগ্নিনির্বাপণ ব্যবস্থা"
                              : fac.includes("VIP")
                              ? "ভিআইপি স্যুট ও লাউঞ্জ"
                              : fac
                            : fac}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTAs */}
              <div className="space-y-3 pt-2">
                <Link href="/quote" className="block w-full">
                  <Button variant="primary" className="w-full text-xs font-bold uppercase tracking-wider py-3.5 shadow-md" withArrow>
                    {isBn ? "ক্যাটারিং ও ভেন্যু বুক করুন" : "Book Catering & Venue"}
                  </Button>
                </Link>

                <a
                  href="tel:+8801991197719"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl border border-ink-200 dark:border-white/15 text-ink-800 dark:text-ink-100 hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-500" strokeWidth={1.75} />
                  <span>+88-01991-197719</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Common Hall Gallery */}
      <section className="py-16 bg-white dark:bg-ink-950 border-t border-ink-100 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
          <div className="max-w-2xl mx-auto space-y-2">
            <span className="font-serif italic text-brand-600 text-lg font-semibold block">
              ~ {isBn ? "ফটো গ্যালারি" : "Photo Gallery"} ~
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-950 dark:text-white">
              {isBn ? "আন্তর্জাতিক মানের মেগা ইভেন্ট গ্যালারি" : "MAGNIFICENT HALL PERSPECTIVES"}
            </h2>
            <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 font-sans">
              {isBn ? "আমাদের বিভিন্ন সফল ব্যাঙ্কোয়েট ও এক্সপো আয়োজনের কিছু স্থিরচিত্র।" : "A visual glimpse of grand banquet setups, corporate expos, and wedding decors."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {COMMON_GALLERY.map((photo, i) => (
              <div
                key={i}
                className="relative h-60 rounded-2xl overflow-hidden shadow-sm group cursor-pointer border border-ink-100 bg-ink-100"
                onClick={() => setSelectedPhotoIdx(i)}
              >
                <Image
                  src={photo.src}
                  alt={photo.label || "ICCB Venue"}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  placeholder="blur"
                  blurDataURL={PLACEHOLDER_BLUR}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-xs text-white font-medium font-sans">{photo.label || "ICCB Venue"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Explore Other Venues */}
      <section className="py-16 bg-white dark:bg-ink-900 border-t border-ink-100 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
          <div className="max-w-2xl mx-auto space-y-2">
            <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-ink-950 dark:text-white">
              {isBn ? "আইসিসিবি-র অন্যান্য হলসমূহ" : "EXPLORE OTHER HALLS & SPACES"}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {otherVenues.slice(0, 3).map((v) => (
              <Link
                key={v.slug}
                href={`/venues/${v.slug}`}
                className="group block bg-white dark:bg-ink-950 rounded-2xl overflow-hidden border border-ink-200 dark:border-white/10 shadow-sm hover:shadow-md hover:border-brand-500/50 transition-all"
              >
                <div className="relative h-44 w-full bg-ink-100">
                  <Image
                    src={v.image}
                    alt={v.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 text-white text-[10px] font-bold">
                    {v.label}
                  </div>
                </div>
                <div className="p-4 space-y-1">
                  <h4 className="font-display font-black text-lg uppercase text-ink-950 dark:text-white group-hover:text-brand-600 transition-colors">
                    {v.name}
                  </h4>
                  <p className="text-xs text-ink-500 font-sans line-clamp-1">{v.intro}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
