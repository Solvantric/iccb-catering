import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MENU_ITEMS } from "@/data/menu";
import { formatCurrency } from "@/lib/format";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { generatePageMetadata } from "@/lib/seo";
import { ShieldCheck, Flame, Clock, Utensils, CheckCircle2 } from "lucide-react";
import { PLACEHOLDER_BLUR } from "@/data/images";

export async function generateStaticParams() {
  return MENU_ITEMS.map((dish) => ({
    slug: dish.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const dish = MENU_ITEMS.find((d) => d.slug === params.slug);
  if (!dish) return {};
  return generatePageMetadata({
    title: `${dish.name} | ICCB Catering Menu`,
    description: dish.description,
    path: `/menu/${dish.slug}`,
    image: dish.image,
  });
}

export default function DishDetailPage({ params }: { params: { slug: string } }) {
  const dish = MENU_ITEMS.find((d) => d.slug === params.slug);
  if (!dish) notFound();

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <section className="bg-ink-950 text-white py-16 relative overflow-hidden">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3">
          <div className="flex justify-center">
            <Breadcrumbs
              items={[
                { label: "Menu", href: "/menu" },
                { label: dish.name },
              ]}
            />
          </div>
          <span className="font-serif italic text-brand-400 text-lg font-semibold block">
            ~ {dish.cuisine} Culinary Special ~
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight">
            {dish.name}
          </h1>
          {dish.nameBn && (
            <p className="text-sm font-semibold text-brand-400">{dish.nameBn}</p>
          )}
        </div>
      </section>

      {/* Main Dish Details */}
      <section className="py-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[380px] sm:h-[460px] rounded-3xl overflow-hidden shadow-2xl border border-ink-100">
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL={PLACEHOLDER_BLUR}
                className="object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="flex items-center justify-between border-b border-ink-100 pb-4">
              <div>
                <span className="text-xs uppercase font-bold text-brand-600 tracking-wider">
                  {dish.category} &bull; {dish.cuisine}
                </span>
                <h2 className="font-display font-black text-3xl uppercase tracking-tight text-ink-950 mt-1">
                  {dish.name}
                </h2>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-ink-400 uppercase font-bold tracking-wider block">Standard Rate</span>
                <span className="font-display font-black text-3xl text-brand-600">
                  {formatCurrency(dish.price)}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-ink-700 leading-relaxed">
              {dish.description}
            </p>

            {/* Diet & Prep Attributes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-ink-50 rounded-xl border border-ink-200">
                <span className="text-[10px] text-ink-400 uppercase font-bold block">Dietary Standard</span>
                <span className="text-xs font-bold text-ink-900">{dish.dietTags.join(", ")}</span>
              </div>
              {dish.preparationTime && (
                <div className="p-3 bg-ink-50 rounded-xl border border-ink-200">
                  <span className="text-[10px] text-ink-400 uppercase font-bold block">Prep Time</span>
                  <span className="text-xs font-bold text-ink-900">{dish.preparationTime}</span>
                </div>
              )}
              {dish.calories && (
                <div className="p-3 bg-ink-50 rounded-xl border border-ink-200">
                  <span className="text-[10px] text-ink-400 uppercase font-bold block">Energy / Portion</span>
                  <span className="text-xs font-bold text-ink-900">{dish.calories}</span>
                </div>
              )}
            </div>

            {/* Allergens & Hygiene Pledge */}
            {dish.allergens && (
              <div className="text-xs text-ink-600 space-y-1">
                <span className="font-bold uppercase text-ink-800 text-[10px] tracking-wider block">
                  Allergen Advisory:
                </span>
                <p>Contains: {dish.allergens.join(", ")}</p>
              </div>
            )}

            <div className="p-4 bg-brand-50 border border-brand-100 rounded-2xl flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-brand-600 shrink-0" />
              <p className="text-xs text-brand-900 font-medium leading-relaxed">
                Meats processed exclusively inside ICCB&apos;s automated slaughterhouse and kept in thermal temperature units.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link href="/quote">
                <Button size="lg" withArrow variant="primary">
                  Request in Custom Quote
                </Button>
              </Link>
              <Link href="/menu">
                <Button size="lg" variant="outline">
                  Back to All Dishes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
