import { MetadataRoute } from "next";
import { MENU_ITEMS } from "@/data/menu";
import { PACKAGES } from "@/data/packages";
import { SERVICES } from "@/data/services";
import { BLOG_POSTS } from "@/data/blog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://iccbcatering.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/services",
    "/services/corporate-catering",
    "/services/wedding-catering",
    "/services/birthday-party-catering",
    "/menu",
    "/packages",
    "/cuisines/mughal",
    "/cuisines/continental",
    "/cuisines/multi-cuisine",
    "/events/wedding",
    "/events/conference",
    "/events/iftar",
    "/quote",
    "/booking",
    "/tasting",
    "/inquiry",
    "/contact",
    "/gallery",
    "/testimonials",
    "/blog",
    "/faq",
    "/our-process",
    "/venues",
    "/lunch-box",
    "/offers",
    "/careers",
    "/privacy-policy",
    "/terms",
    "/cancellation-policy",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const menuRoutes = MENU_ITEMS.map((dish) => ({
    url: `${siteUrl}/menu/${dish.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const packageRoutes = PACKAGES.map((pkg) => ({
    url: `${siteUrl}/packages/${pkg.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const serviceRoutes = SERVICES.map((srv) => ({
    url: `${siteUrl}/services/${srv.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...menuRoutes, ...packageRoutes, ...serviceRoutes, ...blogRoutes];
}

