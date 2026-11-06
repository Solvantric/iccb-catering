"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { GALLERY_ITEMS } from "@/data/gallery";
import { PLACEHOLDER_BLUR } from "@/data/images";
import { Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useUIStore } from "@/store/uiStore";
import { translations } from "@/lib/i18n";

export function GalleryPreviewSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { locale } = useUIStore();
  const t = translations[locale].galleryPreview;
  const previewItems = GALLERY_ITEMS.slice(0, 6);

  return (
    <section className="py-24 bg-white dark:bg-ink-950 relative transition-colors">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto space-y-3 mb-16">
          <span className="font-serif italic text-brand-600 dark:text-brand-400 text-lg font-semibold block">
            {t.tag}
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-ink-950 dark:text-ink-50">
            {t.heading}
          </h2>
          <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewItems.map((item, idx) => {
            const title = locale === "bn" && (item as any).titleBn ? (item as any).titleBn : item.title;
            const category = locale === "bn" && (item as any).categoryBn ? (item as any).categoryBn : item.category;
            const caption = locale === "bn" && (item as any).captionBn ? (item as any).captionBn : item.caption;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setSelectedImage(item.imageUrl)}
                className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-soft group cursor-pointer border border-ink-100 dark:border-white/10"
              >
                <Image
                  src={item.imageUrl}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  placeholder="blur"
                  blurDataURL={PLACEHOLDER_BLUR}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                  <span className="text-[10px] uppercase font-bold text-brand-400 tracking-wider">
                    {category}
                  </span>
                  <h3 className="font-display font-bold text-base uppercase text-white mt-1">
                    {title}
                  </h3>
                  {caption && (
                    <p className="text-xs text-ink-300 line-clamp-1 mt-1">{caption}</p>
                  )}
                  <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-brand-400 font-semibold">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{locale === "bn" ? "বড় করে দেখতে ক্লিক করুন" : "Click to expand"}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="pt-12">
          <Link href="/gallery">
            <Button size="md" withArrow variant="primary">
              {t.viewAll}
            </Button>
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Modal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)} maxWidth="4xl">
        {selectedImage && (
          <div className="relative aspect-video w-full rounded-xl overflow-hidden">
            <Image
              src={selectedImage}
              alt="Gallery Preview"
              fill
              className="object-contain bg-black"
            />
          </div>
        )}
      </Modal>
    </section>
  );
}

