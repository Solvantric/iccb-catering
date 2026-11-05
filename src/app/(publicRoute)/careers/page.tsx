import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { generatePageMetadata } from "@/lib/seo";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: "Careers & Culinary Opportunities | ICCB Catering Dhaka",
  description:
    "Join the hospitality team at South Asia's largest event venue. Open positions for chefs, banquet captains, food safety officers, and sales consultants.",
  path: "/careers",
});

const jobs = [
  {
    id: "job-1",
    title: "Senior Sous Chef - Mughal Specialties",
    department: "Culinary Operations",
    location: "ICCB Kuril, Dhaka",
    type: "Full-Time",
    experience: "5+ years in large-scale banqueting or 5-star hotel kitchen",
  },
  {
    id: "job-2",
    title: "Food Safety & Quality Assurance Officer",
    department: "Hygiene & Slaughterhouse QA",
    location: "ICCB Modern Slaughterhouse & Lab",
    type: "Full-Time",
    experience: "B.Sc. in Microbiology / Food Science with HACCP certification",
  },
  {
    id: "job-3",
    title: "Banquet Operations Floor Captain",
    department: "Banquet Hospitality",
    location: "ICCB Halls 1 - 4",
    type: "Full-Time",
    experience: "3+ years supervising service staff in high-volume banqueting",
  },
  {
    id: "job-4",
    title: "Corporate Catering Sales Executive",
    department: "Sales & Client Relations",
    location: "ICCB Headquarters",
    type: "Full-Time",
    experience: "2+ years in corporate events, hotel sales, or FMCG hospitality",
  },
];

export default function CareersPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-ink-950 text-white py-20 relative text-center">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ label: "Careers" }]} />
          </div>
          <span className="font-serif italic text-brand-400 text-lg font-semibold block">
            ~ Grow with Bangladesh&apos;s Grandest Hospitality Brand ~
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight">
            CAREERS AT ICCB CATERING
          </h1>
          <p className="text-xs sm:text-sm text-ink-300 max-w-2xl mx-auto leading-relaxed">
            Be part of a world-class team executing banquets for heads of state, international summits, and unforgettable weddings.
          </p>
        </div>
      </section>

      {/* Open Positions List */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-left">
        <div className="border-b border-ink-100 pb-4">
          <h2 className="font-display font-black text-2xl uppercase tracking-wide text-ink-950">
            CURRENT OPENINGS
          </h2>
          <p className="text-xs text-ink-500 mt-1">
            To apply, email your CV and cover note to <strong className="text-ink-900">iccbcatering@bga-bd.com</strong> with the role in the subject line.
          </p>
        </div>

        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-6 rounded-2xl bg-white border border-ink-200 shadow-soft hover:shadow-card hover:border-brand-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full">
                  {job.department}
                </span>
                <h3 className="font-display font-bold text-lg uppercase text-ink-950">
                  {job.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-ink-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-500" />
                    <span>{job.location}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-500" />
                    <span>{job.type}</span>
                  </span>
                </div>
                <p className="text-xs text-ink-600 pt-1">
                  <strong>Requirements:</strong> {job.experience}
                </p>
              </div>

              <div className="shrink-0">
                <a
                  href={`mailto:iccbcatering@bga-bd.com?subject=Application%20for%20${encodeURIComponent(job.title)}`}
                  className="inline-flex items-center justify-center font-semibold text-xs px-4 py-2.5 rounded-lg bg-ink-900 text-white hover:bg-brand-500 transition-colors"
                >
                  Apply Now &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
