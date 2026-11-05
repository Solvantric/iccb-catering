import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { SITE_INFO } from "@/data/site";
import { IMAGES, PLACEHOLDER_BLUR } from "@/data/images";
import { generatePageMetadata } from "@/lib/seo";
import { ShieldCheck, CheckCircle2, ThermometerSun, UtensilsCrossed, Building2, Users } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: "About ICCB Catering | Dhaka's Grandest Event Hospitality",
  description:
    "Learn about International Convention City Bashundhara Catering: operating since 2015, in-house modern slaughterhouse, 4 grand halls, and unmatched taste.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Page Hero */}
      <section className="bg-ink-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src={IMAGES.corporateEvent}
            alt="ICCB Grand Hall"
            fill
            placeholder="blur"
            blurDataURL={PLACEHOLDER_BLUR}
            className="object-cover"
          />
        </div>
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ label: "About Us" }]} />
          </div>
          <span className="font-serif italic text-brand-400 text-lg font-semibold block">
            ~ Heritage & Hospitality ~
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight">
            ABOUT ICCB CATERING
          </h1>
          <p className="text-xs sm:text-sm text-ink-300 max-w-2xl mx-auto leading-relaxed">
            Delivering South Asia&apos;s grandest event catering experience with unyielding culinary discipline, hygienic meat processing, and royal Mughal tradition.
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="py-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
              Our Journey & Origin
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-950">
              OPERATING SINCE 1 JANUARY 2015
            </h2>
            <p className="text-xs sm:text-sm text-ink-700 leading-relaxed">
              International Convention City Bashundhara (ICCB) officially began operations on 1 January 2015 next to the 300 ft. Purbachal Express Highway in Kuril, Dhaka. Conceived as the largest premier event destination in South Asia, ICCB spans 4 gigantic convention halls capable of hosting more than 10,000 guests at any single time.
            </p>
            <p className="text-xs sm:text-sm text-ink-700 leading-relaxed">
              To fulfill the dining needs of world leaders, corporate conglomerates, and lavish wedding families, ICCB established its full-scale in-house catering department. In June 2021, we expanded our culinary presence by inaugurating the acclaimed <strong className="text-ink-950">ICCB Heritage Restaurant</strong>, dedicated to preserving 400-year-old authentic Mughal royal dining.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-brand-50/70 border border-brand-100 rounded-2xl">
                <span className="font-display font-black text-2xl text-brand-600">4 Halls</span>
                <p className="text-xs text-ink-600 mt-0.5">Over 100,000 sq ft banquet space</p>
              </div>
              <div className="p-4 bg-brand-50/70 border border-brand-100 rounded-2xl">
                <span className="font-display font-black text-2xl text-brand-600">10,000+</span>
                <p className="text-xs text-ink-600 mt-0.5">Simultaneous guest capacity</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl border-2 border-ink-100">
              <Image
                src={IMAGES.hallRajdarshan}
                alt="ICCB Convention Hall 3 Rajdarshan"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL={PLACEHOLDER_BLUR}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Verified Pillars */}
      <section className="py-20 bg-ink-950 text-white">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="font-serif italic text-brand-400 text-lg font-semibold block">
              ~ The ICCB Standard ~
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
              OUR 4 UNCOMPROMISING SPECIALTIES
            </h2>
            <p className="text-xs sm:text-sm text-ink-300">
              Where other caterers compromise either taste or hygiene, ICCB guarantees both through integrated infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {SITE_INFO.specialties.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-ink-900 border border-ink-800 space-y-3 hover:border-brand-500/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-base uppercase text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-ink-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Master Chefs (Sample items marked clearly in CMS) */}
      <section className="py-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="font-serif italic text-brand-600 text-lg font-semibold block">
            ~ Master Craftsmen ~
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-ink-950">
            MEET OUR CULINARY DIRECTORS
          </h2>
          <p className="text-xs sm:text-sm text-ink-600">
            Led by veteran executive chefs with decades of experience in Mughal royal culinary traditions and global hotel hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white rounded-3xl p-6 border border-ink-100 shadow-soft text-center space-y-4">
            <div className="relative w-36 h-36 rounded-full overflow-hidden mx-auto border-4 border-brand-100">
              <Image src={IMAGES.chefExecutive} alt="Master Chef" fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg uppercase text-ink-950">
                Chef Rafiqul Islam
              </h3>
              <p className="text-xs font-semibold text-brand-600">Executive Master Chef (Mughal Cuisine)</p>
              <p className="text-xs text-ink-500 mt-2 leading-relaxed">
                Over 25 years mastering Old Dhaka Kacchi Biryani, Shahi Rezala, and authentic clay pot dessert reductions.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-ink-100 shadow-soft text-center space-y-4">
            <div className="relative w-36 h-36 rounded-full overflow-hidden mx-auto border-4 border-brand-100">
              <Image src={IMAGES.cateringDirector} alt="Director of Hospitality" fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg uppercase text-ink-950">
                Sabrina Rahman
              </h3>
              <p className="text-xs font-semibold text-brand-600">Director of Banquet Hospitality</p>
              <p className="text-xs text-ink-500 mt-2 leading-relaxed">
                Oversees banquet operations, VIP protocol, and high-stakes corporate logistics across ICCB halls.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-ink-100 shadow-soft text-center space-y-4">
            <div className="relative w-36 h-36 rounded-full overflow-hidden mx-auto border-4 border-brand-100">
              <Image src={IMAGES.qaManager} alt="QA Lead" fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg uppercase text-ink-950">
                Dr. Farhan Masud
              </h3>
              <p className="text-xs font-semibold text-brand-600">Chief Food Safety & QA Inspector</p>
              <p className="text-xs text-ink-500 mt-2 leading-relaxed">
                Manages veterinary screening at the slaughterhouse, raw ingredient testing, and hot-holding temperature audits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="bg-brand-500 text-white py-12 text-center">
        <div className="max-w-xl mx-auto px-4 space-y-4">
          <h3 className="font-display font-black text-3xl uppercase">
            Experience ICCB Catering Firsthand
          </h3>
          <p className="text-xs sm:text-sm text-white/90">
            Book a private food tasting appointment with our master chefs before confirming your event date.
          </p>
          <div className="pt-2">
            <Link href="/tasting">
              <Button variant="dark" size="lg" withArrow>
                Schedule a Tasting Session
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

