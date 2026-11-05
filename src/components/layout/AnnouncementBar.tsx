"use client";

import React from "react";
import Link from "next/link";
import { X, Sparkles } from "lucide-react";
import { useUIStore } from "@/store/uiStore";
import { INITIAL_SETTINGS } from "@/data/settings";

export function AnnouncementBar() {
  const { announcementDismissed, setAnnouncementDismissed } = useUIStore();
  const settings = INITIAL_SETTINGS.announcementBar;

  if (!settings.enabled || announcementDismissed) return null;

  return (
    <div className="bg-brand-600 text-white text-xs py-2 px-4 relative z-40">
      <div className="max-w-container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 mx-auto text-center font-medium">
          <Sparkles className="w-3.5 h-3.5 text-brand-200 hidden sm:inline" />
          <span>{settings.text}</span>
          <Link
            href={settings.linkUrl}
            className="font-bold underline underline-offset-4 hover:text-brand-100 ml-1 transition-colors"
          >
            {settings.linkText} &rarr;
          </Link>
        </div>
        <button
          onClick={() => setAnnouncementDismissed(true)}
          className="text-white/80 hover:text-white p-1 rounded transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
