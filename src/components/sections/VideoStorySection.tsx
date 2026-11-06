"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { IMAGES, PLACEHOLDER_BLUR } from "@/data/images";
import { Play, ShieldCheck, Flame, Utensils } from "lucide-react";
import { motion } from "framer-motion";
import { useUIStore } from "@/store/uiStore";
import { translations } from "@/lib/i18n";

export function VideoStorySection() {
  const [videoOpen, setVideoOpen] = useState(false);
  const { locale } = useUIStore();
  const t = translations[locale].videoStory;

  return (
    <section className="py-24 bg-ink-950 text-white relative overflow-hidden">
      {/* Decorative background aura */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Chef Image with Animated Play Button (Reference Style) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative h-[380px] sm:h-[480px] rounded-3xl overflow-hidden border-2 border-ink-800 shadow-2xl group">
              <Image
                src={IMAGES.chefCooking}
                alt="ICCB Master Chef Preparing Food"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL={PLACEHOLDER_BLUR}
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent" />

              {/* Animated Play Button */}
              <button
                onClick={() => setVideoOpen(true)}
                className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-brand-500/90 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 shadow-floating group/btn"
                aria-label={t.playAria}
              >
                <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping pointer-events-none" />
                <Play className="w-8 h-8 fill-white translate-x-0.5" />
              </button>

              {/* Bottom Label Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-ink-900/80 backdrop-blur-md p-4 rounded-2xl border border-ink-700 flex items-center justify-between text-left">
                <div>
                  <p className="text-[10px] uppercase font-bold text-brand-400 tracking-wider">
                    {t.badgeTitle}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-white">
                    {t.badgeSubtitle}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
                  <Flame className="w-5 h-5" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Story Copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <span className="font-serif italic text-brand-400 text-lg font-semibold block">
              {t.tag}
            </span>

            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
              {t.heading}
            </h2>

            <p className="text-xs sm:text-sm text-ink-300 leading-relaxed">
              {t.subtitle}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-ink-900 border border-ink-800 space-y-1">
                <ShieldCheck className="w-5 h-5 text-brand-500" />
                <h4 className="font-display font-bold text-sm uppercase text-white">
                  {t.point1Title}
                </h4>
                <p className="text-[11px] text-ink-400">{t.point1Desc}</p>
              </div>

              <div className="p-4 rounded-2xl bg-ink-900 border border-ink-800 space-y-1">
                <Utensils className="w-5 h-5 text-brand-500" />
                <h4 className="font-display font-bold text-sm uppercase text-white">
                  {t.point2Title}
                </h4>
                <p className="text-[11px] text-ink-400">{t.point2Desc}</p>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/about">
                <Button size="md" withArrow variant="primary">
                  {t.ctaAbout}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      <Modal isOpen={videoOpen} onClose={() => setVideoOpen(false)} maxWidth="4xl">
        <div className="space-y-4">
          <h3 className="font-display font-bold text-xl uppercase tracking-wider text-ink-900 dark:text-ink-50">
            Behind the Scenes at ICCB Catering
          </h3>
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black flex items-center justify-center">
            <iframe
              className="w-full h-full"
              src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="ICCB Catering Documentary Preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="text-xs text-ink-500 dark:text-ink-400 leading-relaxed">
            {locale === "bn"
              ? "আইসিসিবির স্বাস্থ্যকর মাংস প্রক্রিয়াকরণ ইউনিট, আধুনিক কেন্দ্রীয় রান্নাঘর এবং তাপমাত্রা নিয়ন্ত্রিত ব্যাঙ্কোয়েট ক্যাটারিং পরিবহন ব্যবস্থার ৩ মিনিটের একটি বিশেষ ঝলক।"
              : "Take a 3-minute virtual tour through ICCB's hygienic meat processing rooms, central industrial kitchen, and banquet temperature-controlled logistics fleet."}
          </p>
        </div>
      </Modal>
    </section>
  );
}

