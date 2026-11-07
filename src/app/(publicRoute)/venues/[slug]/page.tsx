import React from "react";
import { notFound } from "next/navigation";
import { VENUES } from "@/data/venues";
import { generatePageMetadata } from "@/lib/seo";
import { VenueDetailClient } from "@/components/venues/VenueDetailClient";

export async function generateStaticParams() {
  return VENUES.map((venue) => ({
    slug: venue.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const venue = VENUES.find((v) => v.slug === params.slug);
  if (!venue) return {};
  return generatePageMetadata({
    title: `${venue.name} (${venue.label}) | ICCB Venue`,
    description: venue.intro,
    path: `/venues/${venue.slug}`,
  });
}

export default function VenueDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const venue = VENUES.find((v) => v.slug === params.slug);
  if (!venue) notFound();

  return <VenueDetailClient venue={venue} />;
}

