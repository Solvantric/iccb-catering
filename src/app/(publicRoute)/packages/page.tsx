import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { PACKAGES } from "@/data/packages";
import { formatCurrency } from "@/lib/format";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { PackageCalculator } from "@/components/calculator/PackageCalculator";
import { generatePageMetadata } from "@/lib/seo";
import { CheckCircle2, Sparkles, ArrowRight } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: "Catering Packages & Per-Head Pricing | ICCB Banquet Menus",
  description:
    "Transparent catering packages for weddings, corporate galas, and social celebrations. Per-head pricing in BDT, minimum guests, and course breakdowns.",
  path: "/packages",
});

export default function PackagesPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-ink-950 text-white py-20 relative overflow-hidden text-center">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ label: "Packages" }]} />
          </div>
          <span className="font-serif italic text-brand-400 text-lg font-semibold block">
            ~ Complete Event Hospitality Packages ~
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight">
            BANQUET PACKAGES & PRICING
          </h1>
          <p className="text-xs sm:text-sm text-ink-300 max-w-2xl mx-auto leading-relaxed">
            Transparent per-person pricing including chafing dish setup, porcelain dinnerware, uniformed captains, and insulated hot transport.
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl p-8 border border-ink-200 shadow-soft flex flex-col justify-between hover:shadow-card hover:-translate-y-1 transition-all group"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                    {pkg.tag || "Catering Package"}
                  </span>
                  <span className="text-xs text-ink-500 font-semibold">Min. {pkg.minGuests} Guests</span>
                </div>

                <div>
                  <h3 className="font-display font-black text-2xl uppercase tracking-wider text-ink-950">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-brand-600 font-medium mt-1">{pkg.tagline}</p>
                  <p className="font-display font-black text-4xl text-brand-600 mt-3">
                    {formatCurrency(pkg.pricePerHead)}{" "}
                    <span className="text-sm font-normal text-ink-500 font-sans">/ person</span>
                  </p>
                </div>

                <p className="text-xs text-ink-600 leading-relaxed">
                  {pkg.description}
                </p>

                {/* Courses Outline */}
                <div className="space-y-3 pt-4 border-t border-ink-100">
                  <span className="text-[10px] font-bold uppercase text-ink-400 tracking-wider block">
                    Sample Courses:
                  </span>
                  {pkg.courses.map((course, idx) => (
                    <div key={idx} className="text-xs">
                      <span className="font-bold text-ink-900 block mb-1">{course.name}:</span>
                      <p className="text-ink-600 leading-relaxed">{course.items.join(" • ")}</p>
                    </div>
                  ))}
                </div>

                {/* Inclusions */}
                <div className="space-y-2 pt-4 border-t border-ink-100">
                  <span className="text-[10px] font-bold uppercase text-ink-400 tracking-wider block">
                    Included Amenities:
                  </span>
                  {pkg.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-ink-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-ink-100 flex items-center justify-between gap-4">
                <Link href={`/packages/${pkg.slug}`} className="flex-1">
                  <Button variant="outline" className="w-full text-xs font-bold uppercase" withArrow>
                    Full Details
                  </Button>
                </Link>
                <Link href="/quote" className="flex-1">
                  <Button variant="primary" className="w-full text-xs font-bold uppercase">
                    Book Package
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Price Calculator */}
      <section className="py-20 bg-brand-50/50 border-t border-brand-100">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="font-serif italic text-brand-600 text-lg font-semibold block">
              ~ Live Price Simulator ~
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-950">
              ESTIMATE YOUR EVENT BUDGET
            </h2>
            <p className="text-xs sm:text-sm text-ink-600">
              Configure your expected attendance and add live stations to see immediate estimated pricing.
            </p>
          </div>
          <PackageCalculator />
        </div>
      </section>
    </div>
  );
}
