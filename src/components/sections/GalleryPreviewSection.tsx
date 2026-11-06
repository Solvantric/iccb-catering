"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GALLERY_ITEMS } from "@/data/gallery";

export function GalleryPreviewSection() {
  const items = GALLERY_ITEMS.slice(0, 5);

  return (
    <section className="py-24 lg:py-32 bg-paper text-ink border-b border-rule">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-baseline justify-between border-b border-rule pb-3 mb-16">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent font-semibold">
            &sect; 05 / Gallery
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
            Photography
          </span>
        </div>

        <div className="text-left mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <h2 className="font-serif text-4xl sm:text-6xl font-normal leading-tight">
              Spaces in <em className="italic text-accent">perspective.</em>
            </h2>
            <p className="text-xs sm:text-sm text-ink-soft max-w-lg font-mono">
              Visual records of banquet arrangements, stage choreography, and convention hall architecture.
            </p>
          </div>
          <Link
            href="/gallery"
            className="font-mono text-xs uppercase tracking-wider underline underline-offset-4 hover:text-accent shrink-0"
          >
            Complete Archive &rarr;
          </Link>
        </div>

        {/* 12-Column Asymmetric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
          {/* Main Large Item: 7 cols */}
          {items[0] && (
            <div className="sm:col-span-7 relative aspect-[16/10] border border-rule overflow-hidden bg-paper-2 group">
              <Image
                src={items[0].imageUrl}
                alt={items[0].title}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
              />
              {items[0].caption && (
                <div className="absolute bottom-0 inset-x-0 bg-paper/95 dark:bg-paper-2/95 border-t border-rule py-2 px-3 text-left">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                    {items[0].caption}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Tall Item: 5 cols */}
          {items[1] && (
            <div className="sm:col-span-5 relative aspect-[16/10] sm:aspect-auto border border-rule overflow-hidden bg-paper-2 group">
              <Image
                src={items[1].imageUrl}
                alt={items[1].title}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
              />
              {items[1].caption && (
                <div className="absolute bottom-0 inset-x-0 bg-paper/95 dark:bg-paper-2/95 border-t border-rule py-2 px-3 text-left">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                    {items[1].caption}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Row 2: 3 items (4 cols each) */}
          {items.slice(2, 5).map((item) => (
            <div key={item.id} className="sm:col-span-4 relative aspect-[4/3] border border-rule overflow-hidden bg-paper-2 group">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
              />
              {item.caption && (
                <div className="absolute bottom-0 inset-x-0 bg-paper/95 dark:bg-paper-2/95 border-t border-rule py-2 px-3 text-left">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                    {item.caption}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
