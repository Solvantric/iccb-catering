import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PACKAGES } from "@/data/packages";
import { formatCurrency } from "@/lib/format";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { generatePageMetadata } from "@/lib/seo";
import { getDishImage } from "@/lib/dishImages";
import { Check, UtensilsCrossed } from "lucide-react";

export async function generateStaticParams() {
  return PACKAGES.map((pkg) => ({
    slug: pkg.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const pkg = PACKAGES.find((p) => p.slug === params.slug);
  if (!pkg) return {};
  return generatePageMetadata({
    title: `${pkg.name} | ICCB Catering Package`,
    description: pkg.description,
    path: `/packages/${pkg.slug}`,
  });
}

export default function PackageDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const pkg = PACKAGES.find((p) => p.slug === params.slug);
  if (!pkg) notFound();

  // Filter out forbidden words: halal, 65, hot, temperature, lab, slaughter
  const forbidden = ["halal", "65", "hot", "temperature", "lab", "slaughter"];
  const cleanServices = pkg.inclusions.filter((inc) => {
    const lower = inc.toLowerCase();
    return !forbidden.some((term) => lower.includes(term));
  });

  const relatedPackages = PACKAGES.filter((p) => p.slug !== pkg.slug).slice(
    0,
    2
  );

  return (
    <div className="bg-white dark:bg-ink-950 text-ink-950 dark:text-white min-h-screen transition-colors text-[16px]">
      {/* Top Full-width Cover Image: h-[380px] lg:h-[440px] */}
      <section className="relative w-full h-[380px] lg:h-[440px] overflow-hidden bg-ink-950">
        <Image
          src={pkg.image}
          alt={pkg.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Dark bottom & top gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30 pointer-events-none" />

        {/* Centered package name: Playfair, uppercase, tracking-[0.12em], clamp(2rem,4.5vw,3.5rem), white */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 space-y-3">
          <div className="flex justify-center text-white/80 mb-2">
            <Breadcrumbs
              items={[
                { label: "Packages", href: "/packages" },
                { label: pkg.name },
              ]}
            />
          </div>
          <h1 className="font-display font-black uppercase tracking-tight text-[clamp(2rem,4.5vw,3.5rem)] text-white leading-tight max-w-4xl drop-shadow-md">
            {pkg.name}
          </h1>
          <div className="w-12 h-[2px] bg-brand-500 mx-auto" />
        </div>
      </section>

      {/* Main Content Layout: 12 Columns */}
      <section className="py-16 lg:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left 8 columns: Menu sections */}
          <div className="lg:col-span-8 space-y-12 text-left">
            {pkg.courses.map((course, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className="font-display font-black uppercase tracking-tight text-xl sm:text-2xl text-ink-950 dark:text-white">
                  {course.name}
                </h2>
                <div className="w-10 h-[1.5px] bg-brand-500" />

                {/* Dishes 2-column grid: 72px square thumbnail on left + dish name (Playfair 17px) on right */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                  {course.items.map((dish, i) => {
                    const dishImg = getDishImage(dish);
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-3.5 p-2 rounded-[2px] bg-white/70 dark:bg-white/[0.03] border border-ink-200/50 dark:border-white/10"
                      >
                        {/* 72px Square Thumbnail */}
                        <div className="relative w-[72px] h-[72px] shrink-0 rounded-[2px] overflow-hidden bg-ink-100 dark:bg-white/5 border border-ink-200/60 dark:border-white/10 flex items-center justify-center">
                          {dishImg ? (
                            <Image
                              src={dishImg}
                              alt={dish}
                              fill
                              sizes="72px"
                              className="object-cover"
                            />
                          ) : (
                            <UtensilsCrossed
                              className="w-6 h-6 text-ink-400 dark:text-white/40"
                              strokeWidth={1.25}
                            />
                          )}
                        </div>

                        {/* Dish Name: Playfair 17px */}
                        <p className="font-sans text-[16px] text-ink-900 dark:text-ink-100 leading-snug">
                          {dish}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Right 4 columns: Sticky Booking Panel */}
          <div className="lg:col-span-4 sticky top-[calc(var(--header-h)+24px)]">
            <div className="border border-ink-200/80 dark:border-white/10 rounded-2xl bg-white dark:bg-white/[0.03] p-8 space-y-6 text-left shadow-sm">
              {/* Small caps "Package price" */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-ink-500 dark:text-ink-400 block">
                  PACKAGE PRICE
                </span>
                {/* Large price: Playfair 36px with per guest */}
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-bold text-[36px] text-ink-950 dark:text-white leading-none">
                    {formatCurrency(pkg.pricePerHead)}
                  </span>
                  <span className="text-sm text-ink-500 dark:text-ink-400">
                    per guest
                  </span>
                </div>
              </div>

              {/* Rows: Minimum guests & Minimum total */}
              <div className="space-y-2.5 py-4 border-y border-ink-200/70 dark:border-white/10 text-sm">
                <div className="flex justify-between text-ink-600 dark:text-ink-300">
                  <span>Minimum guests:</span>
                  <span className="font-semibold text-ink-900 dark:text-white">
                    {pkg.minGuests} guests
                  </span>
                </div>
                <div className="flex justify-between text-ink-600 dark:text-ink-300">
                  <span>Minimum total:</span>
                  <span className="font-display font-bold text-[17px] text-brand-600 dark:text-brand-400">
                    {formatCurrency(pkg.minGuests * pkg.pricePerHead)}
                  </span>
                </div>
              </div>

              {/* Filled Brand Button full width */}
              <Link href={`/quote?package=${pkg.id}`} className="block">
                <button
                  type="button"
                  className="w-full bg-brand-500 hover:bg-brand-600 text-white font-medium uppercase tracking-[0.2em] text-[12px] py-3.5 rounded-none transition-colors"
                >
                  Request this package
                </button>
              </Link>

              {/* Included with this package */}
              <div className="space-y-3 pt-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-ink-500 dark:text-ink-400 block">
                  INCLUDED WITH THIS PACKAGE
                </span>
                <ul className="space-y-2 text-sm text-ink-700 dark:text-ink-300">
                  {cleanServices.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-ink-400 dark:text-ink-500 italic pt-2">
                  Menu items can be changed on request.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Packages */}
        <div className="mt-20 pt-12 border-t border-ink-200/60 dark:border-white/10 text-left">
          <div className="space-y-2 mb-8">
            <h3 className="font-display font-black uppercase tracking-tight text-2xl text-ink-950 dark:text-white">
              Other Packages
            </h3>
            <div className="w-10 h-[1.5px] bg-brand-500" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {relatedPackages.map((rp) => (
              <div key={rp.id} className="group flex flex-col space-y-3">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-900 rounded-[2px]">
                  <Image
                    src={rp.image}
                    alt={rp.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-baseline justify-between pt-1">
                  <h4 className="font-display font-bold text-lg text-ink-950 dark:text-white">
                    {rp.name}
                  </h4>
                  <span className="font-display font-bold text-base text-ink-900 dark:text-ink-200">
                    {formatCurrency(rp.pricePerHead)}
                  </span>
                </div>
                <Link
                  href={`/packages/${rp.slug}`}
                  className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-600 dark:text-brand-400 hover:underline inline-block"
                >
                  View details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
