"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { X, Gift } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { INITIAL_SETTINGS } from "@/data/settings";
import { useUIStore } from "@/store/uiStore";

export function OfferPopup() {
  const [mounted, setMounted] = useState(false);
  const { offerPopupDismissed, setOfferPopupDismissed } = useUIStore();
  const offer = INITIAL_SETTINGS.offerPopup;

  useEffect(() => {
    // Show after 4 seconds if not dismissed previously
    const timer = setTimeout(() => {
      setMounted(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !offer.enabled || offerPopupDismissed) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setOfferPopupDismissed(true)}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-brand-100 text-center animate-in fade-in zoom-in-95">
        <button
          onClick={() => setOfferPopupDismissed(true)}
          className="absolute top-4 right-4 text-ink-400 hover:text-ink-700 p-1.5 rounded-full hover:bg-ink-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 bg-brand-50 text-brand-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <Gift className="w-7 h-7" />
        </div>

        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
          {offer.title}
        </span>

        <h3 className="text-xl font-bold font-display uppercase tracking-wide text-ink-950 mt-3 mb-2">
          {offer.discountText}
        </h3>

        <p className="text-xs text-ink-600 mb-6 leading-relaxed">
          {offer.description}
        </p>

        <div className="bg-ink-50 border border-dashed border-brand-300 p-3 rounded-xl mb-6">
          <span className="text-[10px] text-ink-500 uppercase tracking-wider block">Use Promo Code</span>
          <span className="text-lg font-mono font-bold text-brand-600 tracking-wider">
            {offer.code}
          </span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setOfferPopupDismissed(true)}
            className="flex-1 py-2.5 text-xs font-semibold text-ink-600 hover:text-ink-900 border border-ink-200 rounded-xl transition-colors"
          >
            Maybe Later
          </button>
          <Link
            href="/quote"
            onClick={() => setOfferPopupDismissed(true)}
            className="flex-1 block"
          >
            <Button size="sm" className="w-full">
              Claim Offer
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
