import { Metadata } from "next";
import { SITE_INFO } from "@/data/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://iccbcatering.com";

export function generatePageMetadata({
  title,
  description,
  path = "",
  image,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const fullTitle = `${title} | ${SITE_INFO.name} - Taste of Happiness`;
  const canonicalUrl = `${siteUrl}${path}`;
  const ogImage = image || "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80";

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_INFO.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_BD",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "CateringBusiness"],
    name: SITE_INFO.name,
    legalName: SITE_INFO.fullName,
    url: siteUrl,
    logo: `${siteUrl}/logo.svg`,
    description: SITE_INFO.positioning,
    slogan: SITE_INFO.tagline,
    telephone: SITE_INFO.contact.cateringPhone,
    email: SITE_INFO.contact.cateringEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Next to 300 ft. Purbachal Express Highway, Kuril Bishwa Road",
      addressLocality: "Dhaka",
      postalCode: "1229",
      addressCountry: "BD",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "23.8223",
      longitude: "90.4287",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "22:00",
      },
    ],
    priceRange: "৳৳৳",
    servesCuisine: ["Mughal", "Continental", "Traditional Bengali", "Multi-cuisine"],
  };
}

export function getFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}
