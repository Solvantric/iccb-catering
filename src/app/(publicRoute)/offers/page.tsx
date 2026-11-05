import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { generatePageMetadata } from "@/lib/seo";
import { Sparkles, Gift, Tag, Clock, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: "Seasonal Offers & Catering Specials | ICCB Catering",
  description:
    "Current seasonal promotions, wedding privileges, corporate lunch discounts, and complimentary food stations at ICCB Catering.",
  path: "/offers",
});

const seasonalOffers = [
  {
    id: "off-1",
    title: "Winter Wedding Privilege 2026-2027",
    tag: "Wedding Special",
    code: "ICCBWINTER26",
    desc: "Confirm your wedding reception banquet for 500+ guests and receive a complimentary Clay Pot Borhani Station and Traditional Paan setup at zero extra charge.",
    validity: "Valid until 31 January 2027",
    inclusions: [
      "Complimentary unlimited clay-pot Borhani setup",
      "Traditional sweet paan counter for all guests",
      "VIP bridal family private butler service upgrade",
    ],
  },
  {
    id: "off-2",
    title: "Corporate AGM & Summit Package Perk",
    tag: "Corporate Special",
    code: "CORP2026AGM",
    desc: "Book a full-day corporate conference banquet for 300+ delegates and enjoy an upgraded continuous Hot Espresso & Filtered Coffee Station throughout your event.",
    validity: "Valid for bookings made 30 days in advance",
    inclusions: [
      "All-day continuous espresso & artisanal tea station",
      "Executive butter cookies & tea confectionery tray",
      "Complimentary podium mineral water setup",
    ],
  },
  {
    id: "off-3",
    title: "Ramadan Corporate Iftar Early Bird",
    tag: "Ramadan Special",
    code: "RAMADAN2027",
    desc: "Early booking privilege for corporate Iftar-dinner banquets. Lock in your Ramadan dates with a 10% privilege on dessert course upgrades.",
    validity: "Early reservation period open",
    inclusions: [
      "Free Clay Pot Zafrani Firni upgrade for all attendees",
      "Individual premium Iftar box packaging included",
    ],
  },
];

export default function OffersPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-ink-950 text-white py-20 relative text-center">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ label: "Seasonal Offers" }]} />
          </div>
          <span className="font-serif italic text-brand-400 text-lg font-semibold block">
            ~ Curated Privileges ~
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight">
            OFFERS & SEASONAL SPECIALS
          </h1>
          <p className="text-xs sm:text-sm text-ink-300 max-w-2xl mx-auto leading-relaxed">
            Exclusive value additions, seasonal culinary privileges, and promotional packages for upcoming weddings and corporate summits.
          </p>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="py-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {seasonalOffers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-3xl p-8 border border-brand-100 shadow-soft flex flex-col justify-between hover:shadow-card hover:-translate-y-1 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
                    {offer.tag}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-ink-400">
                    <Clock className="w-3.5 h-3.5 text-brand-500" />
                    <span>{offer.validity}</span>
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl uppercase text-ink-950">
                  {offer.title}
                </h3>

                <p className="text-xs text-ink-600 leading-relaxed">
                  {offer.desc}
                </p>

                {/* Promo Code Box */}
                <div className="p-3 bg-brand-50/60 border border-dashed border-brand-300 rounded-xl text-center">
                  <span className="text-[9px] uppercase font-bold text-ink-500 block">Promo Code</span>
                  <span className="font-mono font-bold text-sm text-brand-600 tracking-wider">
                    {offer.code}
                  </span>
                </div>

                <div className="space-y-2 pt-2 border-t border-ink-100">
                  <span className="text-[10px] font-bold uppercase text-ink-400 tracking-wider block">
                    What&apos;s Included:
                  </span>
                  {offer.inclusions.map((inc, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-ink-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-ink-100">
                <Link href="/quote" className="block">
                  <Button variant="primary" className="w-full text-xs font-bold uppercase" withArrow>
                    Claim This Privilege
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
