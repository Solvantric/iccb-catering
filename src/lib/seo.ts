import { Metadata } from "next";
import { SITE_FACTS } from "@/content/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.iccbbg.com";

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
  const fullTitle = `${title} | ICCB - International Convention City Bashundhara`;
  const canonicalUrl = `${siteUrl}${path}`;
  const ogImage = image || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80";

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
      siteName: SITE_FACTS.fullName,
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
    "@type": ["EventVenue", "Organization"],
    name: SITE_FACTS.fullName,
    alternateName: SITE_FACTS.name,
    url: siteUrl,
    logo: `${siteUrl}/logo.svg`,
    description: "International Convention City Bashundhara (ICCB) is South Asia's largest integrated convention and exhibition center, located in Kuril, Dhaka.",
    telephone: SITE_FACTS.bookingPhones[1],
    email: SITE_FACTS.bookingEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Next to 300 ft Purbachal Express Highway, Kuril Bishwa Road",
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
  };
}
