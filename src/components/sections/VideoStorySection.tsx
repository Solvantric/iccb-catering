"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Modal } from "@/components/ui/Modal";
import { Play, LayoutGrid, ShieldCheck, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useUIStore } from "@/store/uiStore";
import { translations } from "@/lib/i18n";

export function VideoStorySection() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [posterSrc, setPosterSrc] = useState(
    "https://img.youtube.com/vi/5xrEvhLymd8/maxresdefault.jpg"
  );
  const { locale } = useUIStore();
  const t = translations[locale].videoStory;
  const isReducedMotion = useReducedMotion();

  return (
    <section className="py-24 bg-ink-950 text-white relative overflow-hidden">
      {/* Decorative background aura */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Video Poster Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative h-[380px] sm:h-[460px] rounded-[20px] overflow-hidden border border-white/10 group">
              {/* Poster Image */}
              <Image
                src={posterSrc}
                alt="ICCB Expo Village"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                onError={() => {
                  setPosterSrc("https://img.youtube.com/vi/5xrEvhLymd8/hqdefault.jpg");
                }}
              />

              {/* Black/25 overlay */}
              <div className="absolute inset-0 bg-black/25 pointer-events-none" />

              {/* Play Button */}
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="absolute inset-0 m-auto w-[84px] h-[84px] rounded-full bg-white/15 backdrop-blur-md border border-white/40 flex items-center justify-center transition-transform duration-300 hover:scale-[1.06] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 group/play z-10"
                aria-label={t.playAria}
              >
                {/* Slow Ripple Ring (scale 1 to 1.6, fade, 2.4s loop; off for reduced motion) */}
                {!isReducedMotion && (
                  <motion.div
                    className="absolute inset-0 rounded-full border border-white/50 pointer-events-none"
                    animate={{
                      scale: [1, 1.6],
                      opacity: [0.8, 0],
                    }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}

                {/* Inner 52px Brand Circle with White Play Icon */}
                <div className="w-[52px] h-[52px] rounded-full bg-brand-500 text-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover/play:scale-105">
                  <Play className="w-5 h-5 fill-white translate-x-0.5" />
                </div>
              </button>

              {/* Bottom Caption Bar */}
              <div className="absolute bottom-5 left-5 right-5 bg-ink-950/80 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 flex items-center justify-between text-left">
                <div>
                  <p className="text-[10px] uppercase font-bold text-brand-400 tracking-wider">
                    {t.posterLabel}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    {t.posterLine}
                  </p>
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
            {/* Tagline */}
            <span className="font-serif italic text-brand-400 text-lg font-semibold block">
              {t.tag}
            </span>

            {/* Headline */}
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
              {t.heading}
            </h2>

            {/* Paragraph */}
            <p className="text-xs sm:text-sm text-ink-300 leading-relaxed">
              {t.subtitle}
            </p>

            {/* Two Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Card 1: Four Events at Once */}
              <div className="p-6 rounded-[16px] bg-white/[0.03] border border-white/10 space-y-3 hover:border-brand-500/40 transition-colors">
                <div className="w-[44px] h-[44px] rounded-full bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-300">
                  <LayoutGrid size={22} strokeWidth={1.5} />
                </div>
                <h4 className="font-display font-bold text-sm uppercase text-white tracking-wider">
                  {t.card1Title}
                </h4>
                <p className="text-xs text-ink-400 leading-relaxed">
                  {t.card1Desc}
                </p>
              </div>

              {/* Card 2: Fully Equipped */}
              <div className="p-6 rounded-[16px] bg-white/[0.03] border border-white/10 space-y-3 hover:border-brand-500/40 transition-colors">
                <div className="w-[44px] h-[44px] rounded-full bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-300">
                  <ShieldCheck size={22} strokeWidth={1.5} />
                </div>
                <h4 className="font-display font-bold text-sm uppercase text-white tracking-wider">
                  {t.card2Title}
                </h4>
                <p className="text-xs text-ink-400 leading-relaxed">
                  {t.card2Desc}
                </p>
              </div>
            </div>

            {/* Action Button: brand-500, white text, radius 10, h-48, arrow nudges 4px on hover */}
            <div className="pt-2">
              <Link href="/venues" className="inline-block">
                <button
                  type="button"
                  className="h-[48px] px-6 rounded-[10px] bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm tracking-wide inline-flex items-center gap-2 shadow-md transition-all active:scale-[0.98] group"
                >
                  <span>{t.exploreBtn}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal with 16:9 iframe only while open */}
      <Modal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        maxWidth="5xl"
        className="!bg-ink-950 !border-white/10 overflow-hidden"
      >
        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black flex items-center justify-center">
          {videoOpen && (
            <iframe
              className="w-full h-full"
              src="https://www.youtube-nocookie.com/embed/5xrEvhLymd8?autoplay=1&rel=0&modestbranding=1&playsinline=1"
              title="ICCB Expo Village"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          )}
        </div>
      </Modal>
    </section>
  );
}
