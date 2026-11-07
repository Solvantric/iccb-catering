import React from "react";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import { ContactPageClient } from "@/components/contact/ContactPageClient";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact ICCB Catering | Location, Phones & Inquiry Desk",
  description:
    "Official contact details for ICCB Catering, Kuril Bishwa Road, Dhaka. Direct hall booking and catering hotline. Plan your event with us.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageClient />;
}
