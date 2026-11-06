import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingContactBlock } from "@/components/sections/BookingContactBlock";
import { GALLERY_ITEMS } from "@/data/gallery";
import { IMAGES } from "@/content/images";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Photo Gallery | International Convention City Bashundhara",
  description: "Visual tour of ICCB's convention halls, exhibition setups, and banquet facilities in Kuril Bishwa Road, Dhaka.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <div className="bg-paper text-ink min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 space-y-12">
        <Breadcrumbs items={[{ label: "Photo Gallery" }]} />

        <div className="space-y-4 border-b border-rule pb-8">
          <span className="mono text-ink-soft">§ 01 / Archive</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ink tracking-tight">
            Photo <span className="italic text-accent">Gallery</span>
          </h1>
          <p className="text-base sm:text-lg text-ink-soft max-w-3xl leading-relaxed">
            A visual overview of event architecture, convention halls, and banquet spaces across our 17-acre facility.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, index) => (
            <figure key={item.id} className="border border-rule bg-paper-2 overflow-hidden flex flex-col justify-between">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  placeholder="blur"
                  blurDataURL={IMAGES.placeholderBlur}
                />
              </div>
              <figcaption className="p-4 space-y-1 border-t border-rule">
                <div className="flex items-center justify-between text-[11px] font-mono text-ink-soft">
                  <span>0{index + 1}</span>
                  <span>{item.category}</span>
                </div>
                <h3 className="font-serif text-base text-ink">{item.title}</h3>
                {item.caption && (
                  <p className="text-[11px] text-ink-soft leading-relaxed">{item.caption}</p>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <BookingContactBlock
        title="Experience the Venues in Person"
        subtitle="Contact our booking desk to schedule a private walkthrough of our halls."
      />
    </div>
  );
}
