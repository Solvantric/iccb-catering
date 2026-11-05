import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { PACKAGES } from "@/data/packages";
import { SERVICES } from "@/data/services";
import { IMAGES, PLACEHOLDER_BLUR } from "@/data/images";
import { formatCurrency } from "@/lib/format";
import { generatePageMetadata } from "@/lib/seo";
import { CheckCircle2, ShieldCheck, Clock, Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: "Corporate Catering in Dhaka | Conferences, AGMs & Executive Galas",
  description:
    "ICCB Catering delivers punctual, hygienic, and scalable corporate banquet hospitality for 50 to 10,000+ delegates across Bangladesh.",
  path: "/services/corporate-catering",
});

export default function CorporateCateringPage() {
  const corporateSrv = SERVICES.find((s) => s.slug === "corporate-catering") || SERVICES[0];
  const corporatePackages = PACKAGES.filter((p) => p.cuisineType.toLowerCase().includes("corporate") || p.cuisineType.toLowerCase().includes("continental") || p.slug.includes("corporate"));

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-ink-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src={corporateSrv.image}
            alt="Corporate Banquet Setup"
            fill
            placeholder="blur"
            blurDataURL={PLACEHOLDER_BLUR}
            className="object-cover"
          />
        </div>
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="flex justify-center">
            <Breadcrumbs
              items={[
                { label: "Services", href: "/services" },
                { label: "Corporate Catering" },
              ]}
            />
          </div>
          <span className="font-serif italic text-brand-400 text-lg font-semibold block">
            ~ Corporate Hospitality at Scale ~
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight">
            CORPORATE CATERING
          </h1>
          <p className="text-xs sm:text-sm text-ink-300 max-w-2xl mx-auto leading-relaxed">
            From Fortune 500 board luncheons to international expos hosting 10,000+ attendees: zero-delay buffet service, strict temperature control, and executive taste.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
              Punctual Execution
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-950">
              CRAFTED FOR EXECUTIVE PRODUCTIVITY
            </h2>
            <p className="text-xs sm:text-sm text-ink-700 leading-relaxed">
              In corporate banqueting, timing is everything. Our industrial-grade kitchen operations and double-sided buffet lines allow us to serve 1,000 delegates in under 25 minutes, avoiding the bottlenecks and queues that derail event schedules.
            </p>
            <p className="text-xs sm:text-sm text-ink-700 leading-relaxed">
              We provide complete turn-key solutions including live tea/coffee stations, customized executive lunch boxes, plated VIP dinners, and dedicated on-site logistics captains.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-ink-50 rounded-2xl border border-ink-200 space-y-1">
                <Clock className="w-5 h-5 text-brand-500" />
                <h4 className="font-display font-bold text-sm uppercase text-ink-950">Strict Punctuality</h4>
                <p className="text-[11px] text-ink-600">Syncs directly with conference programs</p>
              </div>
              <div className="p-4 bg-ink-50 rounded-2xl border border-ink-200 space-y-1">
                <ShieldCheck className="w-5 h-5 text-brand-500" />
                <h4 className="font-display font-bold text-sm uppercase text-ink-950">HACCP Certified</h4>
                <p className="text-[11px] text-ink-600">Lab tested hygiene and cold-chain integrity</p>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/quote">
                <Button size="lg" withArrow variant="primary">
                  Request Corporate Quote
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-ink-100">
              <Image
                src={IMAGES.corporateEvent}
                alt="Corporate Summit Buffet"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                placeholder="blur"
                blurDataURL={PLACEHOLDER_BLUR}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Corporate Packages */}
      <section className="py-20 bg-brand-50/50 border-t border-brand-100">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="font-serif italic text-brand-600 text-lg font-semibold block">
              ~ Corporate Packages ~
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-950">
              POPULAR CORPORATE BANQUET MENUS
            </h2>
            <p className="text-xs sm:text-sm text-ink-600">
              Select an established package or customize every dish with our Executive Master Chef.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {corporatePackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl p-6 border border-ink-200 shadow-soft flex flex-col justify-between hover:shadow-card hover:-translate-y-1 transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
                      {pkg.tag || "Corporate"}
                    </span>
                    <span className="text-xs text-ink-400">Min {pkg.minGuests} guests</span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl uppercase text-ink-950">
                      {pkg.name}
                    </h3>
                    <p className="font-display font-black text-2xl text-brand-600 mt-1">
                      {formatCurrency(pkg.pricePerHead)}{" "}
                      <span className="text-xs font-normal text-ink-500 font-sans">/ person</span>
                    </p>
                  </div>
                  <p className="text-xs text-ink-600 leading-relaxed">{pkg.description}</p>
                  <div className="space-y-2 border-t border-ink-100 pt-4">
                    <span className="text-[10px] font-bold uppercase text-ink-400 tracking-wider">
                      Included Highlights
                    </span>
                    {pkg.inclusions.slice(0, 3).map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-ink-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-ink-100">
                  <Link href={`/packages/${pkg.slug}`} className="block">
                    <Button variant="outline" className="w-full text-xs font-bold uppercase" withArrow>
                      View Package Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
