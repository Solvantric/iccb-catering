import React from "react";
import { notFound } from "next/navigation";
import { MENU_ITEMS } from "@/data/menu";
import { generatePageMetadata } from "@/lib/seo";
import { DishDetailView } from "@/components/menu/DishDetailView";

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

  return <DishDetailView dish={dish} />;
}
