import React from "react";
import { notFound } from "next/navigation";
import { SERVICES } from "@/data/services";
import { generatePageMetadata } from "@/lib/seo";
import { ServiceDetailClient } from "@/components/services/ServiceDetailClient";

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

  return <ServiceDetailClient service={service} />;
}
