import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES } from "@/data/services";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { generatePageMetadata } from "@/lib/seo";
import { CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { PLACEHOLDER_BLUR } from "@/data/images";

export async function generateStaticParams() {
  return SERVICES.map((srv) => ({
    slug: srv.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) return {};
  return generatePageMetadata({
    title: `${service.title} | ICCB Catering`,
    description: service.shortDesc,
    path: `/services/${service.slug}`,
    image: service.image,
  });
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) notFound();

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-ink-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src={service.image}
            alt={service.title}
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
                { label: service.title },
              ]}
            />
          </div>
          <span className="font-serif italic text-brand-400 text-lg font-semibold block">
            ~ Dedicated Hospitality Service ~
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight">
            {service.title}
          </h1>
          <p className="text-xs sm:text-sm text-ink-300 max-w-2xl mx-auto leading-relaxed">
            {service.shortDesc}
          </p>
        </div>
      </section>

      {/* Main Details */}
      <section className="py-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
              Full Overview
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-950">
              CRAFTED FOR YOUR EVENT EXCELLENCE
            </h2>
            <p className="text-xs sm:text-sm text-ink-700 leading-relaxed">
              {service.fullDesc}
            </p>

            <div className="space-y-3 pt-2">
              <h4 className="font-display font-bold text-sm uppercase text-ink-950 tracking-wider">
                Service Key Features:
              </h4>
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-ink-700">
                  <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {service.idealFor && (
              <div className="pt-2">
                <h4 className="font-display font-bold text-sm uppercase text-ink-950 tracking-wider mb-2">
                  Ideal For:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {service.idealFor.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-ink-100 text-ink-800 px-3 py-1 rounded-full font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-6 flex flex-wrap gap-4">
              <Link href="/quote">
                <Button size="lg" withArrow variant="primary">
                  Book Catering for {service.title}
                </Button>
              </Link>
              <Link href="/tasting">
                <Button size="lg" variant="outline">
                  Schedule a Tasting Session
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-ink-100">
              <Image
                src={service.image}
                alt={service.title}
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
    </div>
  );
}

