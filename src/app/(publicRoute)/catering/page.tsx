import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingContactBlock } from "@/components/sections/BookingContactBlock";
import { SITE_FACTS } from "@/content/content";
import { generatePageMetadata } from "@/lib/seo";
import { Utensils, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: "Catering Division | International Convention City Bashundhara",
  description: "ICCB's dedicated full-service banqueting and event catering division in Dhaka.",
  path: "/catering",
});

export default function CateringPage() {
  return (
    <div className="bg-paper text-ink min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 space-y-12">
        <Breadcrumbs items={[{ label: "Dining", href: "/catering" }, { label: "Catering" }]} />

        <div className="space-y-4 border-b border-rule pb-8">
          <span className="mono text-ink-soft">§ Dining / Division</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ink tracking-tight">
            ICCB <span className="italic text-accent">Catering</span>
          </h1>
          <p className="text-base sm:text-lg text-ink-soft max-w-3xl leading-relaxed">
            Delivering authentic royal banqueting and high-volume event catering with uncompromising discipline, precision culinary execution, and exceptional taste.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-rule p-8 bg-paper-2 space-y-4">
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-accent" />
              <h2 className="font-serif text-2xl text-ink">Banqueting Hospitality</h2>
            </div>
            <p className="text-xs text-ink-soft leading-relaxed">
              Operating its own dedicated central kitchens on the ICCB grounds, our catering division serves premier royal weddings, diplomatic receptions, corporate dinners, and large congress banquets.
            </p>
            <ul className="space-y-2 text-xs text-ink-soft pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                <span>Traditional Mughal & Bengali wedding feasts</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                <span>Multi-cuisine corporate lunch and dinner buffets</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                <span>Dedicated on-site live stations and dessert spreads</span>
              </li>
            </ul>
          </div>

          <div className="border border-rule p-8 bg-paper-2 space-y-4">
            <h2 className="font-serif text-2xl text-ink">Catering Hotline</h2>
            <p className="text-xs text-ink-soft leading-relaxed">
              Connect directly with our catering department to discuss menu selections, guest headcount requirements, and tasting schedules.
            </p>
            <div className="pt-2 space-y-2 text-xs font-mono">
              <div>
                <span className="text-ink-soft block">Direct Line:</span>
                <a href={`tel:${SITE_FACTS.cateringPhone.replace(/[^0-9+]/g, "")}`} className="text-ink text-sm font-semibold hover:text-accent">
                  {SITE_FACTS.cateringPhone}
                </a>
              </div>
              <div>
                <span className="text-ink-soft block">Email:</span>
                <a href={`mailto:${SITE_FACTS.cateringEmail}`} className="text-ink hover:text-accent">
                  {SITE_FACTS.cateringEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingContactBlock
        title="Plan Your Catering Menu"
        subtitle="Speak with our chefs and banquet planners to tailor dishes for your celebration."
      />
    </div>
  );
}

