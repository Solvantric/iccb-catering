"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GALLERY_ITEMS } from "@/data/gallery";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Tabs } from "@/components/ui/Tabs";
import { PLACEHOLDER_BLUR } from "@/data/images";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  { id: "All", label: "All Photos" },
  { id: "Weddings", label: "Weddings" },
  { id: "Corporate", label: "Corporate Galas" },
  { id: "Plating", label: "Food & Plating" },
  { id: "Venues", label: "Convention Halls" },
  { id: "Social", label: "Social Celebrations" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = activeCategory === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-ink-950 text-white py-20 relative text-center">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ label: "Gallery" }]} />
          </div>
          <span className="font-serif italic text-brand-400 text-lg font-semibold block">
            ~ Visual Moments ~
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight">
            BANQUET & CATERING GALLERY
          </h1>
          <p className="text-xs sm:text-sm text-ink-300 max-w-2xl mx-auto leading-relaxed">
            Witness our regal table setups, chef master artistry, and event ambiance across Bangladesh&apos;s largest venue.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 bg-brand-50/40 border-b border-brand-100">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <Tabs
            tabs={categories}
            activeTab={activeCategory}
            onChange={setActiveCategory}
          />
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(idx)}
              className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-soft group cursor-pointer border border-ink-100"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                placeholder="blur"
                blurDataURL={PLACEHOLDER_BLUR}
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                <span className="text-[10px] uppercase font-bold text-brand-400 tracking-wider">
                  {item.category}
                </span>
                <h3 className="font-display font-bold text-base uppercase text-white mt-1">
                  {item.title}
                </h3>
                {item.caption && (
                  <p className="text-xs text-ink-300 line-clamp-1 mt-1">{item.caption}</p>
                )}
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-brand-400 font-semibold">
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Larger</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal with Next/Prev Controls */}
      <Modal
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        maxWidth="4xl"
      >
        {currentItem && (
          <div className="space-y-4">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <Image
                src={currentItem.imageUrl}
                alt={currentItem.title}
                fill
                className="object-contain"
              />
              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="flex items-center justify-between text-left pt-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-brand-600 tracking-wider">
                  {currentItem.category}
                </span>
                <h4 className="font-display font-bold text-lg uppercase text-ink-950">
                  {currentItem.title}
                </h4>
                {currentItem.caption && (
                  <p className="text-xs text-ink-600 mt-0.5">{currentItem.caption}</p>
                )}
              </div>
              <span className="text-xs text-ink-400">
                {(lightboxIndex ?? 0) + 1} of {filteredItems.length}
              </span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

