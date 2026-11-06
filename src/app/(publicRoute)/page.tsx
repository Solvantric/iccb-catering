import React from "react";
import { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeatureStrip } from "@/components/sections/FeatureStrip";
import { ChooseMenuSection } from "@/components/sections/ChooseMenuSection";
import { VideoStorySection } from "@/components/sections/VideoStorySection";
import { OccasionGridSection } from "@/components/sections/OccasionGridSection";
import { TodaysMenuSection } from "@/components/sections/TodaysMenuSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { GalleryPreviewSection } from "@/components/sections/GalleryPreviewSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { TastingBanner } from "@/components/sections/TastingBanner";
import { CTABand } from "@/components/sections/CTABand";
import { generatePageMetadata, getOrganizationJsonLd } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Premium Wedding & Corporate Catering in Dhaka",
  description:
    "ICCB Catering delivers uncompromising taste and certified hygiene with our modern slaughterhouse, culinary masters, and 10,000+ guest capacity.",
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
      {/* 15 Reference-matched sections */}
      <HeroSection />
      <FeatureStrip />
      <ChooseMenuSection />
      <VideoStorySection />
      <OccasionGridSection />
      <TodaysMenuSection />
      <ProcessSection />
      <StatsSection />
      <GalleryPreviewSection />
      <TestimonialsSection />
      <FAQSection />
      <TastingBanner />
      <CTABand />
    </>
  );
}

