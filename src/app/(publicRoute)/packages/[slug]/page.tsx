import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PACKAGES } from "@/data/packages";
import { formatCurrency } from "@/lib/format";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { generatePageMetadata } from "@/lib/seo";
import { CheckCircle2, ShieldCheck, Users, ArrowRight } from "lucide-react";

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
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-ink-950 text-white py-20 relative overflow-hidden text-center">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="flex justify-center">
            <Breadcrumbs
              items={[
                { label: "Packages", href: "/packages" },
                { label: pkg.name },
              ]}
            />
          </div>
          <span className="font-serif italic text-brand-400 text-lg font-semibold block">
            ~ Complete Banquet Course ~
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight">
            {pkg.name}
          </h1>
          <p className="text-xs sm:text-sm text-ink-300 max-w-2xl mx-auto leading-relaxed">
            {pkg.tagline}
          </p>
          <div className="pt-2">
            <span className="font-display font-black text-4xl text-brand-400">
              {formatCurrency(pkg.pricePerHead)}{" "}
              <span className="text-sm font-normal text-ink-400 font-sans">/ person</span>
            </span>
          </div>
        </div>
      </section>

      {/* Course Breakdown */}
      <section className="py-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Courses */}
          <div className="lg:col-span-8 space-y-10 text-left">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                Course Breakdown
              </span>
              <h2 className="font-display font-black text-3xl uppercase tracking-tight text-ink-950 mt-3">
                DETAILED BANQUET MENU
              </h2>
              <p className="text-xs sm:text-sm text-ink-600 mt-2 leading-relaxed">
                {pkg.description}
              </p>
            </div>

            <div className="space-y-8">
              {pkg.courses.map((course, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-ink-50/50 border border-ink-200 space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-brand-500 text-white flex items-center justify-center font-display font-bold text-xs">
                      {idx + 1}
                    </span>
                    <h3 className="font-display font-bold text-lg uppercase text-ink-950 tracking-wider">
                      {course.name}
                    </h3>
                  </div>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-10 text-xs text-ink-800">
                    {course.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Inclusions */}
            <div className="p-6 rounded-2xl bg-brand-50 border border-brand-100 space-y-3">
              <h4 className="font-display font-bold text-base uppercase text-brand-900 tracking-wider">
                Included Hospitality Amenities:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-brand-950">
                {pkg.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-600" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sticky Booking Summary Card */}
          <div className="lg:col-span-4 bg-ink-950 text-white p-8 rounded-3xl shadow-xl space-y-6 text-left sticky top-28">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">
              Package Reservation
            </span>
            <h3 className="font-display font-bold text-2xl uppercase text-white">
              {pkg.name}
            </h3>

            <div className="border-y border-ink-800 py-4 space-y-2">
              <div className="flex justify-between text-xs text-ink-300">
                <span>Per Person Rate:</span>
                <span className="font-bold text-white">{formatCurrency(pkg.pricePerHead)}</span>
              </div>
              <div className="flex justify-between text-xs text-ink-300">
                <span>Minimum Attendance:</span>
                <span className="font-bold text-white">{pkg.minGuests} Guests</span>
              </div>
              <div className="flex justify-between text-xs text-ink-300">
                <span>Minimum Est. Total:</span>
                <span className="font-bold text-brand-400">
                  {formatCurrency(pkg.pricePerHead * pkg.minGuests)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/quote" className="block">
                <Button size="lg" variant="primary" withArrow className="w-full">
                  Request This Package
                </Button>
              </Link>
              <Link href="/tasting" className="block">
                <Button size="md" variant="secondary" className="w-full">
                  Schedule Tasting Session
                </Button>
              </Link>
            </div>

            <p className="text-[10px] text-ink-400 leading-relaxed text-center">
              *Courses can be modified during your tasting session. All meats from our modern slaughterhouse.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
