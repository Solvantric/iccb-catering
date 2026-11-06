"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useUIStore } from "@/store/uiStore";
import { translations } from "@/lib/i18n";

export function TastingBanner() {
  const { locale } = useUIStore();
  const t = translations[locale].tastingBanner;

  return (
    <section className="bg-brand-500 text-white py-12 text-center transition-colors">
      <div className="max-w-xl mx-auto px-4 space-y-4">
        <h3 className="font-display font-black text-3xl uppercase">
          {t.title}
        </h3>
        <p className="text-xs sm:text-sm text-white/90">
          {t.subtitle}
        </p>
        <div className="pt-2">
          <Link href="/tasting">
            <Button variant="dark" size="lg" withArrow>
              {t.button}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

