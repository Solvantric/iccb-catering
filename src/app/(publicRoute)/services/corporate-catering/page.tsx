import React from "react";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import { CorporateCateringClient } from "@/components/services/CorporateCateringClient";

export const metadata: Metadata = generatePageMetadata({
  title: "Corporate Catering in Dhaka | Conferences, AGMs & Executive Galas",
  description:
    "ICCB Catering delivers punctual, hygienic, and scalable corporate banquet hospitality for 50 to 10,000+ delegates across Bangladesh.",
  path: "/services/corporate-catering",
});

export default function CorporateCateringPage() {
  return <CorporateCateringClient />;
}
