import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, Phone, Home, ArrowRight } from "lucide-react";
import { SITE_FACTS } from "@/content/content";

export const metadata: Metadata = {
  title: "Thank You | Requisition Received",
  description: "Your inquiry has been received by International Convention City Bashundhara.",
};

export default function ThankYouPage() {
  return (
    <div className="bg-paper text-ink min-h-[75vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full border border-rule bg-paper-2 p-8 sm:p-10 text-center space-y-6">
        <div className="w-12 h-12 border border-rule flex items-center justify-center mx-auto text-accent">
          <CheckCircle2 className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <span className="mono text-ink-soft">§ Requisition Received</span>
          <h1 className="font-serif text-3xl sm:text-4xl text-ink tracking-tight">
            Thank <span className="italic text-accent">You</span>
          </h1>
          <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
            Your event details have been delivered to our banquet and venue reservation desk. Our team will review hall scheduling and connect with you directly.
          </p>
        </div>

        <div className="border border-rule p-4 bg-paper text-xs text-ink-soft space-y-2 text-left">
          <div className="flex items-center gap-2 mono text-[11px] text-ink uppercase">
            <Phone className="w-3.5 h-3.5 text-accent" />
            <span>Direct Reservations Desk</span>
          </div>
          <p>
            For urgent date queries or ongoing coordination, call our central hotline:
          </p>
          <a
            href={`tel:${SITE_FACTS.bookingPhones[0].replace(/[^0-9+]/g, "")}`}
            className="block font-mono text-sm font-semibold text-accent hover:underline"
          >
            {SITE_FACTS.bookingPhones[0]}
          </a>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-rule text-xs font-mono uppercase tracking-wider text-ink hover:border-accent transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <Link
            href="/venues"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-ink text-paper text-xs font-mono uppercase tracking-wider hover:bg-accent hover:text-white transition-colors"
          >
            <span>Venues</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
