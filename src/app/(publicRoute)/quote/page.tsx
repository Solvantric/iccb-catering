import React from "react";
import { Metadata } from "next";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { generatePageMetadata } from "@/lib/seo";
import { ShieldCheck, CheckCircle2, Clock } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: "Book Catering & Reserve Date | ICCB Catering Dhaka",
  description:
    "Book your customized catering menu and lock your banquet date with ICCB in 4 simple steps. Guaranteed hygiene, master chef preparation, and instant bKash advance booking.",
  path: "/quote",
});

export default function QuotePage() {
  return (
    <div className="bg-white py-12">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-4">
          <Breadcrumbs items={[{ label: "Book Catering" }]} />
        </div>

        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="font-serif italic text-brand-600 text-lg font-semibold block">
            ~ Effortless Banquet Booking ~
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-ink-950">
            BOOK CATERING & RESERVE DATE
          </h1>
          <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
            Select your preferred cuisine, schedule logistics, review your order, and submit advance booking token via bKash to confirm your event date.
          </p>
        </div>

        {/* Multi-step Quote Form */}
        <QuoteForm />

        {/* Trust Points */}
        <div className="max-w-3xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs text-ink-600 border-t border-ink-100 pt-8">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-500" />
            <span>100% Halal Certified Meats</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-500" />
            <span>Complimentary Tasting Available</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-brand-500" />
            <span>4-Hour Fast Response Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
}

