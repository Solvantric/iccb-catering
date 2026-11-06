"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { CLIENT_VIDEOS, ClientVideo } from "@/data/videos";
import { useUIStore } from "@/store/uiStore";
import { translations } from "@/lib/i18n";

function VideoTile({
  video,
  isPlaying,
  onPlay,
  onStop,
  index,
}: {
  video: ClientVideo;
  isPlaying: boolean;
  onPlay: () => void;
  onStop: () => void;
  index: number;
}) {
  const [posterSrc, setPosterSrc] = useState(
    `https://img.youtube.com/vi/${video.ytId}/maxresdefault.jpg`
  );
  const { locale } = useUIStore();
  const t = translations[locale].clientVideos;
  const isReducedMotion = useReducedMotion();
  const label = locale === "bn" ? video.labelBn : video.label;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group flex flex-col"
    >
      {/* Video Tile (aspect-video, radius 4px, 1px border ink/10 light, white/10 dark) */}
      <div className="relative aspect-video w-full rounded-[4px] overflow-hidden border border-ink-900/10 dark:border-white/10 bg-black">
        {isPlaying ? (
          <>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.ytId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&fs=0`}
              title={`${label} video`}
              allow="autoplay; encrypted-media; picture-in-picture"
              className="w-full h-full border-0"
            />
            {/* 36px Glass Stop Button at top-right */}
            <button
              type="button"
              onClick={onStop}
              aria-label={t.stopAria}
              className="absolute top-2.5 right-2.5 z-20 w-[36px] h-[36px] rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-md transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <X size={16} strokeWidth={2} />
            </button>
          </>
        ) : (
          <>
            {/* Poster with hover scale 1.04 (500ms) */}
            <Image
              src={posterSrc}
              alt={label}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              onError={() => {
                setPosterSrc(
                  `https://img.youtube.com/vi/${video.ytId}/hqdefault.jpg`
                );
              }}
            />

            {/* black/20 overlay that lightens on hover */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />

            {/* Premium Play Button centered */}
            <button
              type="button"
              onClick={onPlay}
              aria-label={`${t.playAria}${label}`}
              className="absolute inset-0 m-auto w-[64px] h-[64px] rounded-full bg-white/15 backdrop-blur-md border border-white/50 flex items-center justify-center transition-transform duration-300 hover:scale-[1.08] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 group/play z-10"
            >
              {/* Ripple Ring */}
              {!isReducedMotion && (
                <motion.div
                  className="absolute inset-0 rounded-full border border-white/60 pointer-events-none"
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

              {/* Inner 40px Brand Circle with White Play Icon */}
              <div className="w-[40px] h-[40px] rounded-full bg-brand-500 text-white flex items-center justify-center shadow-md">
                <Play className="w-4 h-4 fill-white translate-x-[1px]" />
              </div>
            </button>
          </>
        )}
      </div>

      {/* Caption under each tile */}
      <div className="mt-4 flex items-center gap-3">
        <span className="font-display font-bold text-brand-500 tracking-widest text-sm">
          {video.id}
        </span>
        <span className="font-display uppercase tracking-[0.2em] text-sm font-semibold text-ink-800 dark:text-ink-100 group-hover:text-brand-500 transition-colors whitespace-nowrap">
          {label}
        </span>
        <div className="h-[1px] flex-1 bg-ink-900/10 dark:bg-white/10 group-hover:bg-brand-500 transition-colors" />
      </div>
    </motion.div>
  );
}

export function ClientVideosSection() {
  const [activeYtId, setActiveYtId] = useState<string | null>(null);
  const { locale } = useUIStore();
  const t = translations[locale].clientVideos;

  return (
    <section className="py-28 lg:py-36 bg-white dark:bg-ink-950 text-ink-900 dark:text-white transition-colors">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading Block */}
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-24 space-y-4">
          <span className="font-serif italic text-brand-600 dark:text-brand-400 text-base sm:text-lg font-semibold block">
            {t.tag}
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-ink-900 dark:text-white leading-tight">
            {t.heading}
          </h2>
          <p className="text-xs sm:text-sm text-ink-500 dark:text-ink-400 leading-relaxed max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* 3 cols lg, 2 cols md, 1 col mobile; gap-x-8, gap-y-14 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {CLIENT_VIDEOS.map((video, idx) => (
            <VideoTile
              key={video.id}
              video={video}
              index={idx}
              isPlaying={activeYtId === video.ytId}
              onPlay={() => setActiveYtId(video.ytId)}
              onStop={() => setActiveYtId(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

