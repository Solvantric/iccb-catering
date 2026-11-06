"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { CLIENT_VIDEOS, ClientVideo } from "@/data/videos";
import { useUIStore } from "@/store/uiStore";
import { translations } from "@/lib/i18n";
import { cn } from "@/lib/utils";

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
  const isFeature = index === 0;
  const isLast = index === 5;
  const zoom = video.posterZoom || 1;

  // Layout configuration:
  // lg (3 cols): tile 01 is col-span-2 row-span-2 h-full; others single cells; tile 04-06 3rd row.
  // md (2 cols): tile 01 and tile 06 are col-span-2; others single cells.
  // mobile: 1 col, aspect-video.
  const cellClasses = cn(
    "relative rounded-[6px] overflow-hidden border border-ink-900/10 dark:border-white/10 hover:border-brand-500/60 transition-colors bg-black group",
    isFeature
      ? "col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2 aspect-video lg:aspect-auto lg:h-full min-h-[220px]"
      : isLast
      ? "col-span-1 md:col-span-2 lg:col-span-1 aspect-video"
      : "col-span-1 md:col-span-1 lg:col-span-1 aspect-video"
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className={cellClasses}
    >
      {isPlaying ? (
        <>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.ytId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&fs=0`}
            title={`${label} video`}
            allow="autoplay; encrypted-media; picture-in-picture"
            className="w-full h-full border-0 absolute inset-0"
          />
          {/* Top-right Stop Button (36px, glass, white icon) */}
          <button
            type="button"
            onClick={onStop}
            aria-label={t.stopAria}
            className="absolute top-3 right-3 z-20 w-[36px] h-[36px] rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-md transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <X size={16} strokeWidth={2} />
          </button>
        </>
      ) : (
        <>
          {/* Poster with baked-in bar zoom and 600ms hover scale 1.05 */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ transform: `scale(${zoom})` }}
          >
            <Image
              src={posterSrc}
              alt={label}
              fill
              sizes={
                isFeature
                  ? "(max-width: 1024px) 100vw, 66vw"
                  : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              }
              className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.05]"
              onError={() => {
                setPosterSrc(
                  `https://img.youtube.com/vi/${video.ytId}/hqdefault.jpg`
                );
              }}
            />
          </div>

          {/* Bottom gradient overlay from black/75 to transparent, ~45% height */}
          <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/75 to-transparent pointer-events-none" />

          {/* Play Button centered: 80px on feature tile on lg (64px mobile), 56px on small tiles */}
          <button
            type="button"
            onClick={onPlay}
            aria-label={`${t.playAria}${label}`}
            className={cn(
              "absolute inset-0 m-auto rounded-full bg-white/15 backdrop-blur-md border border-white/50 flex items-center justify-center transition-transform duration-300 hover:scale-[1.08] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 group/play z-10",
              isFeature
                ? "w-[64px] h-[64px] lg:w-[80px] lg:h-[80px]"
                : "w-[56px] h-[56px]"
            )}
          >
            {/* Slow Ripple Ring */}
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

            {/* Inner Brand Circle with White Play Icon */}
            <div
              className={cn(
                "rounded-full bg-brand-500 text-white flex items-center justify-center shadow-md",
                isFeature
                  ? "w-[42px] h-[42px] lg:w-[50px] lg:h-[50px]"
                  : "w-[36px] h-[36px]"
              )}
            >
              <Play
                className={cn(
                  "fill-white translate-x-[1px]",
                  isFeature ? "w-4 h-4 lg:w-5 lg:h-5" : "w-3.5 h-3.5"
                )}
              />
            </div>
          </button>

          {/* Caption inside tile at bottom-left */}
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 z-10 flex items-center gap-3 pointer-events-none",
              isFeature ? "p-4 lg:p-6" : "p-4"
            )}
          >
            <span className="font-display font-bold text-brand-300 tracking-widest text-sm">
              {video.id}
            </span>
            <span className="w-5 h-[1px] bg-white/40 inline-block" />
            <span
              className={cn(
                "font-display uppercase tracking-[0.2em] font-semibold text-white truncate",
                isFeature ? "text-xs sm:text-sm" : "text-xs"
              )}
            >
              {label}
            </span>
          </div>
        </>
      )}
    </motion.div>
  );
}

export function ClientVideosSection() {
  const [activeYtId, setActiveYtId] = useState<string | null>(null);
  const { locale } = useUIStore();
  const t = translations[locale].clientVideos;

  return (
    <section className="py-16 lg:py-20 bg-white dark:bg-ink-950 text-ink-900 dark:text-white transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading Block */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12 space-y-3">
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

        {/* Editorial Grid: gap-3 md:gap-4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
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
