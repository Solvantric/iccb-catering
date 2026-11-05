import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MENU_ITEMS } from "@/data/menu";
import { formatCurrency } from "@/lib/format";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { generatePageMetadata } from "@/lib/seo";
import { IMAGES, PLACEHOLDER_BLUR } from "@/data/images";

const cuisineData: Record<string, { title: string; headline: string; desc: string; image: string }> = {
  mughal: {
    title: "Mughal Cuisine",
    headline: "ROYAL MUGHAL CATERING IN DHAKA",
    desc: "400-year-old culinary traditions from Old Dhaka. Authentic slow-dum Kacchi Biryani, yogurt-rich Shahi Mutton Rezala, golden chicken roast, and clay pot Borhani.",
    image: IMAGES.kacchiBiryani,
  },
  continental: {
    title: "Continental Cuisine",
    headline: "PREMIUM CONTINENTAL & EXECUTIVE PLATING",
    desc: "Refined global dining tailored for international delegates and diplomatic banquets. Featuring Norwegian salmon, prime steaks, Italian pasta, and artisanal salads.",
    image: IMAGES.salmonPlatter,
  },
  "multi-cuisine": {
    title: "Multi-Cuisine Fusion",
    headline: "VERSATILE MULTI-CUISINE SPREADS",
    desc: "Dynamic live stations offering Asian dim sum steamers, Szechuan noodles, tandoori grills, and contemporary dessert confections.",
    image: IMAGES.grilledKebab,
  },
};

export async function generateStaticParams() {
  return [
    { slug: "mughal" },
    { slug: "continental" },
    { slug: "multi-cuisine" },
  ];
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const c = cuisineData[params.slug];
  if (!c) return {};
  return generatePageMetadata({
    title: `${c.title} Catering in Dhaka | ICCB Catering`,
    description: c.desc,
    path: `/cuisines/${params.slug}`,
    image: c.image,
  });
}

export default function CuisineLandingPage({ params }: { params: { slug: string } }) {
  const data = cuisineData[params.slug];
  if (!data) notFound();

  // Dishes matching this cuisine
  const dishes = MENU_ITEMS.filter(
    (d) =>
      d.cuisine.toLowerCase().includes(params.slug.replace("-", " ")) ||
      (params.slug === "mughal" && d.cuisine === "Mughal")
  );

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-ink-950 text-white py-20 relative overflow-hidden text-center">
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src={data.image}
            alt={data.title}
            fill
            placeholder="blur"
            blurDataURL={PLACEHOLDER_BLUR}
            className="object-cover"
          />
        </div>
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="flex justify-center">
            <Breadcrumbs
              items={[
                { label: "Cuisines" },
                { label: data.title },
              ]}
            />
          </div>
          <span className="font-serif italic text-brand-400 text-lg font-semibold block">
            ~ Dedicated Cuisine Showcase ~
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight">
            {data.headline}
          </h1>
          <p className="text-xs sm:text-sm text-ink-300 max-w-2xl mx-auto leading-relaxed">
            {data.desc}
          </p>
        </div>
      </section>

      {/* Dishes in this cuisine */}
      <section className="py-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <h2 className="font-display font-black text-3xl uppercase tracking-tight text-ink-950">
            SIGNATURE {data.title.toUpperCase()} DISHES
          </h2>
          <p className="text-xs sm:text-sm text-ink-600">
            Handcrafted with meats processed in our modern slaughterhouse and cooked under precise temperature control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-white rounded-3xl p-6 border border-ink-100 shadow-soft flex flex-col justify-between hover:shadow-card hover:-translate-y-1 transition-all"
            >
              <div>
                <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    placeholder="blur"
                    blurDataURL={PLACEHOLDER_BLUR}
                    className="object-cover"
                  />
                </div>
                <h3 className="font-display font-bold text-lg uppercase text-ink-950">
                  {dish.name}
                </h3>
                {dish.nameBn && <p className="text-xs text-brand-600 font-medium mb-1">{dish.nameBn}</p>}
                <p className="text-xs text-ink-600 line-clamp-2 mt-1">{dish.description}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-ink-100 flex items-center justify-between">
                <span className="font-display font-black text-xl text-ink-950">
                  {formatCurrency(dish.price)}
                </span>
                <Link href={`/menu/${dish.slug}`}>
                  <Button size="sm" variant="outline">
                    View Dish
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-16 text-center">
          <Link href="/quote">
            <Button size="lg" withArrow variant="primary">
              Build a Custom {data.title} Banquet
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

