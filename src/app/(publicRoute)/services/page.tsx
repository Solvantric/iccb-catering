import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { SERVICES } from "@/data/services";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { generatePageMetadata } from "@/lib/seo";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PLACEHOLDER_BLUR } from "@/data/images";

export const metadata: Metadata = generatePageMetadata({
  title: "Catering Services | Corporate, Weddings & Social Galas",
  description:
    "Explore ICCB Catering services: Corporate conferences, Royal Mughal weddings, private celebrations, and mobile off-premises banquets.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-ink-950 text-white py-20 relative overflow-hidden text-center">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ label: "Services" }]} />
          </div>
          <span className="font-serif italic text-brand-400 text-lg font-semibold block">
            ~ Full-Spectrum Event Hospitality ~
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight">
            CATERING SERVICES
          </h1>
          <p className="text-xs sm:text-sm text-ink-300 max-w-2xl mx-auto leading-relaxed">
            Tailored catering solutions engineered for scale, punctuality, and remarkable taste across corporate summits, lavish weddings, and milestone occasions.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {SERVICES.map((srv, idx) => {
          const isEven = idx % 2 === 1;
          return (
            <div
              key={srv.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                isEven ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={`lg:col-span-6 space-y-5 text-left ${isEven ? "lg:order-2" : ""}`}>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                  Specialized Service
                </span>
                <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-950">
                  {srv.title}
                </h2>
                <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
                  {srv.fullDesc}
                </p>

                {/* Features */}
                <div className="space-y-2 pt-2">
                  {srv.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-ink-700">
                      <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-wrap gap-4 items-center">
                  <Link href={`/services/${srv.slug}`}>
                    <Button variant="primary" size="md" withArrow>
                      Explore Service Details
                    </Button>
                  </Link>
                  <Link href="/quote">
                    <Button variant="outline" size="md">
                      Get a Quote
                    </Button>
                  </Link>
                </div>
              </div>

              <div className={`lg:col-span-6 relative ${isEven ? "lg:order-1" : ""}`}>
                <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-card border border-ink-100 group">
                  <Image
                    src={srv.image}
                    alt={srv.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL={PLACEHOLDER_BLUR}
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Floating Inquiry Callout */}
      <section className="bg-brand-50 py-16 border-y border-brand-100 text-center">
        <div className="max-w-xl mx-auto px-4 space-y-4">
          <h3 className="font-display font-black text-2xl sm:text-3xl uppercase text-ink-950">
            Need Custom Corporate or Wedding Packages?
          </h3>
          <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
            Our banquet managers are ready to consult with you, design custom courses, and schedule an exclusive food tasting.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link href="/quote">
              <Button size="lg" withArrow>
                Request a Custom Quote
              </Button>
            </Link>
            <Link href="/tasting">
              <Button variant="secondary" size="lg" className="bg-white text-ink-900 border-ink-200 hover:bg-ink-100">
                Book a Tasting
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

