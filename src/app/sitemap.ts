import { MetadataRoute } from "next";
import { REAL_VENUES, REAL_EVENT_TYPES } from "@/content/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.iccbbg.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about/overview",
    "/about/mission-values",
    "/about/management",
    "/about/our-team",
    "/about/join-us",
    "/venues",
    "/gallery",
    "/events",
    "/news",
    "/venue-map",
    "/plan/offers",
    "/plan/rates",
    "/catering",
    "/restaurant",
    "/contact",
    "/contact/enquiry",
    "/faq",
    "/privacy",
    "/thank-you",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const venueRoutes = REAL_VENUES.map((venue) => ({
    url: `${siteUrl}/venues/${venue.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const planRoutes = REAL_EVENT_TYPES.map((ev) => ({
    url: `${siteUrl}/plan/${ev.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...venueRoutes, ...planRoutes];
}
