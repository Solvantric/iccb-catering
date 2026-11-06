import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingContactBlock } from "@/components/sections/BookingContactBlock";
import { SITE_FACTS } from "@/content/content";
import { generatePageMetadata } from "@/lib/seo";
import { MapPin, Navigation } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: "Venue Map & Directions | ICCB",
  description: "Directions and location map for International Convention City Bashundhara, Kuril Bishwa Road, Dhaka 1229.",
  path: "/venue-map",
});

export default function VenueMapPage() {
  return (
    <div className="bg-paper text-ink min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 space-y-12">
        <Breadcrumbs items={[{ label: "Venue Map & Directions" }]} />

        <div className="space-y-4 border-b border-rule pb-8">
          <span className="mono text-ink-soft">§ Location</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ink tracking-tight">
            Venue Map & <span className="italic text-accent">Directions</span>
          </h1>
          <p className="text-base sm:text-lg text-ink-soft max-w-3xl leading-relaxed">
            Situated directly along the 300 ft Purbachal Express Highway in Kuril Bishwa Road, Dhaka, ICCB is easily accessible from all key hubs across the capital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-rule p-8 bg-paper-2 space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              <h2 className="font-serif text-xl text-ink">Physical Address</h2>
            </div>
            <p className="text-sm text-ink leading-relaxed font-mono">
              {SITE_FACTS.address}
            </p>
            <p className="text-xs text-ink-soft leading-relaxed">
              Positioned right at the start of the 300 ft expressway, ICCB features direct vehicular entry ramps, private drop-off loops for VIPs, and perimeter parking.
            </p>
          </div>

          <div className="border border-rule p-8 bg-paper-2 space-y-4">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-accent" />
              <h2 className="font-serif text-xl text-ink">Transit Access</h2>
            </div>
            <ul className="space-y-2 text-xs text-ink-soft">
              <li>• From Hazrat Shahjalal International Airport: Direct access via Kuril Flyover (approx. 15-20 minutes).</li>
              <li>• From Gulshan / Banani: Straight connectivity via Pragati Sarani or Kuril interchange.</li>
              <li>• From Uttara: Direct connection along the Airport Expressway through Kuril.</li>
              <li>• From Purbachal New Town: Unimpeded highway transit on the 300 ft express highway.</li>
            </ul>
          </div>
        </div>
      </div>

      <BookingContactBlock
        title="Visiting the Complex"
        subtitle="Our security desks and administration gates operate 7 days a week for verified event organizers."
      />
    </div>
  );
}

