import React from "react";
import { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { VenuesSection } from "@/components/sections/VenuesSection";
import { PlanEventSection } from "@/components/sections/PlanEventSection";
import { GalleryPreviewSection } from "@/components/sections/GalleryPreviewSection";
import { GroundsSection } from "@/components/sections/GroundsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { EnquireSection } from "@/components/sections/EnquireSection";
import { generatePageMetadata, getOrganizationJsonLd } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "International Convention City Bashundhara (ICCB) | Dhaka",
  description:
    "South Asia's largest integrated event and convention facility. 6 world-class halls and open grounds next to 300 ft Purbachal Express Highway, Kuril, Dhaka.",
  path: "/",
});

export default function HomePage() {
  const jsonLd = getOrganizationJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Editorial Sections § 01 to § 09 */}
      <HeroSection />
      <AboutSection />
      <VenuesSection />
      <PlanEventSection />
      <GalleryPreviewSection />
      <GroundsSection />
      <FAQSection />
      <EnquireSection />
    </>
  );
}
