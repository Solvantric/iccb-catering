import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PACKAGES } from "@/data/packages";
import { formatCurrency } from "@/lib/format";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { generatePageMetadata } from "@/lib/seo";
import { PLACEHOLDER_BLUR } from "@/data/images";
import { CheckCircle2, ShieldCheck, Users, Sparkles, Utensils } from "lucide-react";

export async function generateStaticParams() {
  return PACKAGES.map((pkg) => ({
    slug: pkg.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const pkg = PACKAGES.find((p) => p.slug === params.slug);
  if (!pkg) return {};
  return generatePageMetadata({
    title: `${pkg.name} | ICCB Catering Package`,
    description: pkg.description,
    path: `/packages/${pkg.slug}`,
  });
}

export default function PackageDetailPage({ params }: { params: { slug: string } }) {
  const pkg = PACKAGES.find((p) => p.slug === params.slug);
  if (!pkg) notFound();

  return (
    <div className="bg-ink-50/40 text-ink-950 min-h-screen">
      {/* Hero Header */}
      <section className="bg-white dark:bg-ink-950 text-ink-950 dark:text-white py-16 sm:py-20 relative overflow-hidden text-center border-b border-ink-100 dark:border-white/10 transition-colors">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="flex justify-center">
            <Breadcrumbs
              items={[
                { label: "Packages", href: "/packages" },
                { label: pkg.name },
              ]}
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-50 dark:bg-white/10 border border-brand-100 dark:border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span className="font-serif italic text-brand-600 dark:text-brand-300 text-xs font-semibold tracking-wide">
              {pkg.tag || "Catering Tier"}
            </span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-ink-950 dark:text-white max-w-3xl mx-auto leading-tight">
            {pkg.name}
          </h1>

          <p className="font-serif italic text-sm text-brand-600 dark:text-brand-400">
            {pkg.tagline}
          </p>

          <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 max-w-xl mx-auto leading-relaxed">
            {pkg.description}
          </p>
        </div>
      </section>

      {/* Course Breakdown & Sticky Booking */}
      <section className="py-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Courses */}
          <div className="lg:col-span-8 space-y-10 text-left">
            {/* Visual Header Image Banner */}
            {pkg.image && (
              <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden border border-ink-200 shadow-xl group">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  placeholder="blur"
                  blurDataURL={PLACEHOLDER_BLUR}
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-400 block">
                      {pkg.cuisineType}
                    </span>
                    <span className="font-display font-bold text-xl uppercase">
                      Executive Banquet Presentation
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-xs font-semibold">
                    Min. {pkg.minGuests} Guests
                  </span>
                </div>
              </div>
            )}

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-3.5 py-1 rounded-full border border-brand-200">
                Full Course Inclusions
              </span>
              <h2 className="font-display font-black text-3xl uppercase tracking-tight text-ink-950 mt-3">
                DETAILED BANQUET MENU BREAKDOWN
              </h2>
              <p className="text-xs sm:text-sm text-ink-600 mt-2 leading-relaxed">
                {pkg.description}
              </p>
            </div>

            <div className="space-y-6">
              {pkg.courses.map((course, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-2xl bg-white border border-ink-200/80 shadow-soft space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center font-display font-bold text-xs shadow-md">
                      {idx + 1}
                    </span>
                    <h3 className="font-display font-bold text-lg sm:text-xl uppercase text-ink-950 tracking-wider">
                      {course.name}
                    </h3>
                  </div>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-11 text-xs text-ink-800">
                    {course.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                        <span className="font-medium text-ink-900">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Inclusions */}
            <div className="p-7 rounded-3xl bg-brand-50 border border-brand-200/80 space-y-4 shadow-soft">
              <div className="flex items-center gap-2 text-brand-900">
                <Utensils className="w-5 h-5 text-brand-600" />
                <h4 className="font-display font-bold text-lg uppercase tracking-wider">
                  Included Hospitality Amenities & Setup:
                </h4>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-brand-950 font-medium">
                {pkg.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-600 shrink-0" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sticky Booking Summary Card */}
          <div className="lg:col-span-4 bg-white dark:bg-ink-950 text-ink-950 dark:text-white p-7 sm:p-8 rounded-3xl shadow-soft border border-ink-100 dark:border-white/10 space-y-6 text-left sticky top-28">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 block">
              Direct Package Reservation
            </span>
            <h3 className="font-display font-black text-2xl uppercase text-ink-950 dark:text-white">
              {pkg.name}
            </h3>

            <div className="border-y border-ink-100 dark:border-white/10 py-5 space-y-3">
              <div className="flex justify-between text-xs text-ink-600 dark:text-ink-300">
                <span>Per Person Rate:</span>
                <span className="font-bold text-ink-950 dark:text-white font-display text-base">
                  {formatCurrency(pkg.pricePerHead)}
                </span>
              </div>
              <div className="flex justify-between text-xs text-ink-600 dark:text-ink-300">
                <span>Minimum Attendance:</span>
                <span className="font-bold text-ink-950 dark:text-white">{pkg.minGuests} Guests</span>
              </div>
              <div className="flex justify-between text-xs text-ink-600 dark:text-ink-300 pt-2 border-t border-ink-100 dark:border-white/5">
                <span>Minimum Estimated Investment:</span>
                <span className="font-bold text-brand-600 dark:text-brand-400 font-display text-lg">
                  {formatCurrency(pkg.pricePerHead * pkg.minGuests)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/quote" className="block">
                <Button size="lg" variant="primary" withArrow className="w-full font-bold uppercase tracking-wider shadow-lg">
                  Request This Package
                </Button>
              </Link>
              <Link href="/tasting" className="block">
                <Button size="md" variant="secondary" className="w-full font-semibold">
                  Schedule Chef Tasting Session
                </Button>
              </Link>
            </div>

            <div className="pt-2 text-[11px] text-ink-400 leading-relaxed text-center space-y-1">
              <p>*Courses can be customized during your tasting session.</p>
              <p>*Guaranteed served at 65°C+ with modern thermal transports.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
