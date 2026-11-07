"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Venue, VENUES, COMMON_GALLERY } from "@/data/venues";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Modal } from "@/components/ui/Modal";
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

  // Seat types that exist
  const seatsList: { label: string; count: string }[] = [];
  if (venue.seats?.theater) {
    seatsList.push({
      label: isBn ? "থিয়েটার" : "THEATER",
      count: venue.seats.theater,
    });
  }
  if (venue.seats?.banquet) {
    seatsList.push({
      label: isBn ? "ব্যাঙ্কোয়েট" : "BANQUET",
      count: venue.seats.banquet,
    });
  }
  if (venue.seats?.classroom) {
    seatsList.push({
      label: isBn ? "ক্লাসরুম" : "CLASSROOM",
      count: venue.seats.classroom,
    });
  }
  if (venue.seats?.uShape) {
    seatsList.push({
      label: isBn ? "ইউ-শেপ" : "U-SHAPE",
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
    <div className="bg-[#F7F3EE] dark:bg-ink-950 text-ink-950 dark:text-white min-h-screen transition-colors text-[16px]">
      {/* 1. Hero: full-bleed (h-[60vh] min-h-[420px]) with black/55 overlay */}
      <section className="relative w-full h-[60vh] min-h-[420px] overflow-hidden bg-ink-950">
        <Image
          src={venue.image}
          alt={venue.name}
          fill
          priority
          sizes="100vw"
          className="object-cover transition-transform duration-[12000ms] scale-105 hover:scale-100 ease-out"
        />
        <div className="absolute inset-0 bg-black/55 pointer-events-none" />

        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 space-y-3">
          <div className="flex justify-center text-white/80 mb-2">
            <Breadcrumbs
              items={[
                { label: isBn ? "ভেন্যুসমূহ" : "Venues", href: "/venues" },
                { label: venue.name },
              ]}
            />
          </div>

          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-300 block">
            {venue.label}
          </span>

          <h1 className="font-serif uppercase tracking-[0.1em] text-[clamp(2.25rem,4.5vw,4rem)] text-white font-normal leading-tight max-w-4xl drop-shadow-md">
            {venue.name}
          </h1>

          <div className="w-12 h-[2px] bg-brand-500 mx-auto" />
        </div>
      </section>

      {/* 2. Numbers row (halls only): only existing seat types, Playfair 44px */}
      {isHall && seatsList.length > 0 && (
        <section className="py-10 bg-white dark:bg-ink-900 border-b border-ink-200/60 dark:border-white/10 transition-colors">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`grid grid-cols-2 md:grid-cols-${Math.min(
                seatsList.length,
                4
              )} gap-8 text-center`}
            >
              {seatsList.map((st) => (
                <div key={st.label} className="space-y-1">
                  <span className="font-serif text-[38px] sm:text-[44px] font-bold text-ink-950 dark:text-white block leading-none">
                    {st.count}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400 font-semibold block">
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
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400 block">
                {isBn ? "ভেন্যু পরিচিতি" : "Overview"}
              </span>
              <p className="font-serif text-lg sm:text-xl text-ink-900 dark:text-ink-100 leading-relaxed">
                {venue.intro}
              </p>
            </div>

            {/* Hall Measurements Table (only existing fields: mezzanine, width, height, length) */}
            {venue.size && (
              <div className="space-y-4 pt-4 border-t border-ink-200/60 dark:border-white/10">
                <div className="flex items-center gap-2 text-ink-900 dark:text-white">
                  <Ruler className="w-5 h-5 text-brand-500" />
                  <h3 className="font-serif uppercase tracking-[0.12em] text-xl font-normal">
                    {isBn ? "হলের পরিমাপ" : "Hall Measurements"}
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-[2px] bg-white/70 dark:bg-white/[0.03] border border-ink-200/60 dark:border-white/10 text-center">
                  {venue.size.length && (
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-ink-400 block">
                        Length
                      </span>
                      <span className="font-serif text-lg font-bold text-ink-900 dark:text-white">
                        {venue.size.length}
                      </span>
                    </div>
                  )}
                  {venue.size.width && (
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-ink-400 block">
                        Width
                      </span>
                      <span className="font-serif text-lg font-bold text-ink-900 dark:text-white">
                        {venue.size.width}
                      </span>
                    </div>
                  )}
                  {venue.size.height && (
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-ink-400 block">
                        Height
                      </span>
                      <span className="font-serif text-lg font-bold text-ink-900 dark:text-white">
                        {venue.size.height}
                      </span>
                    </div>
                  )}
                  {venue.size.mezzanine && (
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-ink-400 block">
                        Mezzanine Floor
                      </span>
                      <span className="font-serif text-lg font-bold text-ink-900 dark:text-white">
                        {venue.size.mezzanine}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Parking and Event size lines if present */}
            {(venue.parking || venue.maxEvent) && (
              <div className="space-y-3 pt-4 border-t border-ink-200/60 dark:border-white/10 text-sm">
                {venue.parking && (
                  <div className="flex items-center gap-2.5 text-ink-800 dark:text-ink-200">
                    <Car className="w-4 h-4 text-brand-500 shrink-0" />
                    <span>
                      <strong>Parking:</strong> {venue.parking}
                    </span>
                  </div>
                )}
                {venue.maxEvent && (
                  <div className="flex items-center gap-2.5 text-ink-800 dark:text-ink-200">
                    <Users className="w-4 h-4 text-brand-500 shrink-0" />
                    <span>
                      <strong>Event Size:</strong> {venue.maxEvent}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Layouts list if present */}
            {venue.layouts && venue.layouts.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-ink-200/60 dark:border-white/10">
                <h3 className="font-serif uppercase tracking-[0.12em] text-lg text-ink-950 dark:text-white font-normal">
                  {isBn ? "সম্ভাব্য লেআউট" : "Available Layouts"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {venue.layouts.map((l, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm text-ink-800 dark:text-ink-200"
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
              <div className="space-y-8 pt-4 border-t border-ink-200/60 dark:border-white/10">
                {venue.facts && (
                  <div className="space-y-3">
                    <h3 className="font-serif uppercase tracking-[0.12em] text-lg text-ink-950 dark:text-white font-normal">
                      {isBn ? "এক্সপো ভিলেজের বৈশিষ্ট্য" : "Key Facts & Features"}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-ink-800 dark:text-ink-200">
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
                <div className="relative aspect-video w-full rounded-[2px] overflow-hidden bg-black border border-ink-900/10 dark:border-white/10 group">
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
                        className="absolute top-3 right-3 z-20 w-[36px] h-[36px] rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/40 text-white flex items-center justify-center shadow-md transition-all active:scale-95"
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

                      {/* Small white Play icon top-right */}
                      <div className="absolute top-3 right-3 z-10 w-[36px] h-[36px] rounded-full bg-black/35 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110 pointer-events-none">
                        <Play className="w-[18px] h-[18px] fill-white text-white translate-x-[1px]" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Dining: Note only */}
            {isDining && venue.note && (
              <div className="p-5 rounded-[2px] bg-white/70 dark:bg-white/[0.03] border border-ink-200/60 dark:border-white/10">
                <p className="text-sm text-ink-700 dark:text-ink-300 italic">
                  * {venue.note}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Booking / Rent Panel */}
          <div className="lg:col-span-4 sticky top-[calc(var(--header-h)+24px)]">
            <div className="border border-ink-200/80 dark:border-white/10 rounded-[4px] bg-[#F7F3EE] dark:bg-white/[0.03] p-8 space-y-6 text-left shadow-xs">
              {/* Hall Rent if present */}
              {venue.rent && (
                <div className="space-y-1.5 pb-4 border-b border-ink-200/60 dark:border-white/10">
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-ink-500 dark:text-ink-400 block">
                    HALL RENT
                  </span>
                  <div className="font-serif text-[26px] sm:text-[30px] font-bold text-ink-950 dark:text-white leading-tight">
                    {venue.rent}
                  </div>
                  <p className="text-[11px] text-ink-400 dark:text-ink-500 italic">
                    Please confirm current rates with our booking team.
                  </p>
                </div>
              )}

              {/* Facilities check list if present */}
              {venue.facilities && venue.facilities.length > 0 && (
                <div className="space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-ink-500 dark:text-ink-400 block">
                    INCLUDED FACILITIES
                  </span>
                  <ul className="space-y-2 text-sm text-ink-700 dark:text-ink-300">
                    {venue.facilities.map((fac, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                        <span>{fac}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <Link href="/inquiry" className="block">
                  <button
                    type="button"
                    className="w-full bg-brand-500 hover:bg-brand-600 text-white font-medium uppercase tracking-[0.2em] text-[12px] py-3.5 rounded-none transition-colors"
                  >
                    {isBn ? "অনুসন্ধান করুন" : "Enquire"}
                  </button>
                </Link>

                <a href="tel:+88-02-41091551" className="block">
                  <button
                    type="button"
                    className="w-full border border-ink-900/40 dark:border-white/40 text-ink-900 dark:text-white uppercase tracking-[0.15em] text-[12px] py-3.5 rounded-none font-medium hover:border-brand-500 hover:text-brand-500 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <Phone size={14} />
                    <span>Call booking team</span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Common Gallery: ~ A Look Around ~, MORE FROM ICCB */}
        <div className="mt-24 pt-16 border-t border-ink-200/60 dark:border-white/10 text-center">
          <div className="max-w-2xl mx-auto space-y-2 mb-10">
            <span className="font-serif italic text-brand-600 dark:text-brand-400 text-sm sm:text-base font-semibold block">
              ~ A Look Around ~
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-ink-950 dark:text-white">
              MORE FROM ICCB
            </h2>
          </div>

          {/* 4 photos in 2-column grid, gap-1.5, max-w-5xl */}
          <div className="max-w-5xl mx-auto grid grid-cols-2 gap-1.5">
            {/* Left Column: aspect-[4/5] then aspect-[4/3] */}
            <div className="space-y-1.5">
              {colLeft.map((photo) => (
                <div
                  key={photo.originalIdx}
                  onClick={() => setSelectedPhotoIdx(photo.originalIdx)}
                  className={`relative ${photo.aspect} w-full overflow-hidden bg-ink-900 rounded-[2px] cursor-pointer group`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.label || "ICCB Venue"}
                    fill
                    sizes="(max-width: 1024px) 50vw, 40vw"
                    className="object-cover transition-transform duration-[600ms] group-hover:scale-[1.04]"
                  />
                  {/* Captions ONLY on heritage restaurant venues page */}
                  {isDining && photo.label && (
                    <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-[2px] text-[11px] uppercase tracking-wider text-white">
                      {photo.label}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Column: aspect-[4/3] then aspect-[4/5] */}
            <div className="space-y-1.5">
              {colRight.map((photo) => (
                <div
                  key={photo.originalIdx}
                  onClick={() => setSelectedPhotoIdx(photo.originalIdx)}
                  className={`relative ${photo.aspect} w-full overflow-hidden bg-ink-900 rounded-[2px] cursor-pointer group`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.label || "ICCB Venue"}
                    fill
                    sizes="(max-width: 1024px) 50vw, 40vw"
                    className="object-cover transition-transform duration-[600ms] group-hover:scale-[1.04]"
                  />
                  {/* Captions ONLY on heritage restaurant venues page */}
                  {isDining && photo.label && (
                    <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-[2px] text-[11px] uppercase tracking-wider text-white">
                      {photo.label}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Other Venues row */}
        <div className="mt-20 pt-12 border-t border-ink-200/60 dark:border-white/10 text-left">
          <div className="space-y-2 mb-8">
            <h3 className="font-serif uppercase tracking-[0.12em] text-2xl text-ink-950 dark:text-white font-normal">
              {isBn ? "অন্যান্য ভেন্যুসমূহ" : "Other Venues"}
            </h3>
            <div className="w-10 h-[1.5px] bg-brand-500" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {otherVenues.map((ov) => (
              <Link
                key={ov.slug}
                href={`/venues/${ov.slug}`}
                className="group flex flex-col space-y-2"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-900 rounded-[2px]">
                  <Image
                    src={ov.image}
                    alt={ov.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="pt-1">
                  <h4 className="font-serif text-sm sm:text-base font-normal text-ink-950 dark:text-white truncate">
                    {ov.name}
                  </h4>
                  {ov.seats?.banquet && (
                    <span className="text-[11px] text-ink-500 dark:text-ink-400 block">
                      Banquet: {ov.seats.banquet}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Modal with large photo and prev/next */}
      {selectedPhotoIdx !== null && (
        <Modal
          isOpen={selectedPhotoIdx !== null}
          onClose={() => setSelectedPhotoIdx(null)}
          maxWidth="5xl"
          className="!bg-black/95 !border-white/10"
        >
          <div className="relative w-full aspect-[16/10] max-h-[80vh] flex items-center justify-center">
            <Image
              src={COMMON_GALLERY[selectedPhotoIdx].src}
              alt={COMMON_GALLERY[selectedPhotoIdx].label || "ICCB Photo"}
              fill
              className="object-contain"
            />

            {/* Prev/Next Buttons */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhotoIdx(
                  (prev) => (prev! - 1 + COMMON_GALLERY.length) % COMMON_GALLERY.length
                );
              }}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhotoIdx(
                  (prev) => (prev! + 1) % COMMON_GALLERY.length
                );
              }}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

