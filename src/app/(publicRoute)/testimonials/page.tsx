import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { TESTIMONIALS } from "@/data/testimonials";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { generatePageMetadata } from "@/lib/seo";
import { Quote, Star } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: "Client Testimonials & Reviews | ICCB Catering",
  description:
    "Read genuine reviews from wedding couples, corporate organizers, and event hosts who chose ICCB Catering.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-ink-950 text-white py-20 relative text-center">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ label: "Testimonials" }]} />
          </div>
          <span className="font-serif italic text-brand-400 text-lg font-semibold block">
            ~ What Our Clients Say ~
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight">
            CLIENT TESTIMONIALS
          </h1>
          <p className="text-xs sm:text-sm text-ink-300 max-w-2xl mx-auto leading-relaxed">
            Real feedback from hosts who entrusted their most important celebrations and business summits to ICCB Catering.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-8 border border-ink-100 shadow-soft flex flex-col justify-between text-left group hover:shadow-card hover:-translate-y-1 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center">
                    <Quote className="w-5 h-5" />
                  </div>
                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full inline-block mb-3">
                  {item.eventType}
                </span>

                <p className="text-xs sm:text-sm text-ink-700 leading-relaxed italic mb-6">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-ink-100">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-brand-200">
                  <Image
                    src={item.avatarUrl}
                    alt={item.author}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm uppercase text-ink-950">
                    {item.author}
                  </h4>
                  <p className="text-[11px] text-ink-500">{item.role}</p>
                  {item.company && (
                    <p className="text-[10px] text-brand-600 font-semibold">{item.company}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-16 text-center">
          <Link href="/quote">
            <Button size="lg" withArrow variant="primary">
              Book Your Event With Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

