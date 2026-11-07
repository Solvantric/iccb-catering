import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/format";
import { generatePageMetadata } from "@/lib/seo";
import { IMAGES, PLACEHOLDER_BLUR } from "@/data/images";
import { CheckCircle2, PackageCheck, Clock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: "Corporate Lunch Box Catering | Executive Bulk Orders Dhaka",
  description:
    "Hygienic multi-compartment corporate lunch boxes for board meetings, factory milestones, seminars, and training sessions in Dhaka.",
  path: "/lunch-box",
});

const lunchBoxes = [
  {
    id: "lb-1",
    name: "Executive Mughal Lunch Box",
    tag: "Most Popular",
    price: 550,
    items: [
      "Fragrant Basmati Kacchi Biryani with Young Mutton & Aloo",
      "Traditional Dhakai Chicken Roast Quarter",
      "Chilled Mint Borhani (250ml Sealed Bottle)",
      "Clay Pot Zafrani Shahi Firni",
      "Mint Onion Salad & Lime Wedge",
      "Premium Cutlery, Wet Wipe, Toothpick & Napkin",
    ],
  },
  {
    id: "lb-2",
    name: "Continental Executive Box",
    tag: "Continental Choice",
    price: 650,
    items: [
      "Grilled Herb Chicken Breast with Mushroom Glaze",
      "Penne All'Arrabbiata / Alfredo",
      "Garlic Buttered Seasonal Veggies",
      "Fresh Dinner Roll with French Butter",
      "Chocolate Walnut Brownie",
      "Fresh Juice Bottle (250ml)",
    ],
  },
  {
    id: "lb-3",
    name: "Classic Bengali Polao Box",
    tag: "Traditional",
    price: 480,
    items: [
      "Kalijira Saffron Ghee Polao",
      "Spicy Slow-Simmered Beef Bhuna",
      "Special Egg Korma",
      "Sweet Semai / Caramel Custard",
      "Cucumber Salad & Shahi Chutney",
      "Mineral Water (500ml) & Sanitary Kit",
    ],
  },
];

export default function LunchBoxPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-white dark:bg-ink-950 text-ink-950 dark:text-white py-16 sm:py-20 relative text-center border-b border-ink-100 dark:border-white/10 transition-colors">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ label: "Corporate Lunch Boxes" }]} />
          </div>
          <span className="font-serif italic text-brand-600 dark:text-brand-400 text-lg font-semibold block">
            ~ Individual Executive Dining ~
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-ink-950 dark:text-white">
            CORPORATE LUNCH BOXES
          </h1>
          <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 max-w-2xl mx-auto leading-relaxed">
            Hygienic, sealed multi-compartment meal boxes designed for board meetings, training workshops, and large factory events from 30 to 5,000+ units.
          </p>
        </div>
      </section>

      {/* Boxes Grid */}
      <section className="py-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {lunchBoxes.map((box) => (
            <div
              key={box.id}
              className="bg-white rounded-3xl p-8 border border-ink-200 shadow-soft flex flex-col justify-between hover:shadow-card hover:-translate-y-1 transition-all"
            >
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
                  {box.tag}
                </span>
                <div>
                  <h3 className="font-display font-bold text-xl uppercase text-ink-950">
                    {box.name}
                  </h3>
                  <p className="font-display font-black text-3xl text-brand-600 mt-2">
                    {formatCurrency(box.price)}{" "}
                    <span className="text-xs font-normal text-ink-500 font-sans">/ box net</span>
                  </p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-ink-100">
                  <span className="text-[10px] font-bold uppercase text-ink-400 tracking-wider block">
                    Box Contents:
                  </span>
                  {box.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-ink-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-ink-100">
                <Link href="/quote" className="block">
                  <Button variant="primary" className="w-full text-xs font-bold uppercase" withArrow>
                    Order Bulk Lunch Boxes
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Trust Banner */}
        <div className="mt-16 bg-brand-50 rounded-3xl p-8 border border-brand-100 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs text-ink-700">
          <div className="space-y-1">
            <Clock className="w-6 h-6 text-brand-500 mx-auto mb-2" />
            <p className="font-bold text-ink-900 text-sm">Punctual Office Delivery</p>
            <p className="text-ink-500">Delivered hot 30 minutes before your lunch break</p>
          </div>
          <div className="space-y-1">
            <PackageCheck className="w-6 h-6 text-brand-500 mx-auto mb-2" />
            <p className="font-bold text-ink-900 text-sm">Sealed Multi-Compartments</p>
            <p className="text-ink-500">Tamper-evident, microwave-safe premium containers</p>
          </div>
          <div className="space-y-1">
            <ShieldCheck className="w-6 h-6 text-brand-500 mx-auto mb-2" />
            <p className="font-bold text-ink-900 text-sm">HACCP Hygiene Guaranteed</p>
            <p className="text-ink-500">Prepared in sterile industrial catering galleys</p>
          </div>
        </div>
      </section>
    </div>
  );
}

