import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Phone, ArrowRight, Home } from "lucide-react";
import { SITE_INFO } from "@/data/site";

export const metadata: Metadata = {
  title: "Thank You | ICCB Catering Request Received",
  description: "Your catering inquiry has been received by ICCB Catering banquet department.",
};

export default function ThankYouPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-20 px-4 bg-brand-50/40">
      <div className="max-w-lg w-full bg-white rounded-3xl p-8 sm:p-12 border border-ink-100 shadow-soft text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            Inquiry Confirmed
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-950">
            THANK YOU!
          </h1>
          <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
            Your catering request has been routed to our Banquet Consultation team. A representative will review your menu requirements and contact you within 4 hours.
          </p>
        </div>

        {/* Immediate Support Pill */}
        <div className="p-4 bg-ink-50 rounded-2xl border border-ink-200 text-xs text-ink-700 space-y-1">
          <p className="font-bold text-ink-900">Need urgent assistance for an upcoming date?</p>
          <p className="text-ink-500">Call our direct banquet desk anytime:</p>
          <a
            href={`tel:${SITE_INFO.contact.cateringPhone}`}
            className="inline-flex items-center gap-1.5 font-display font-bold text-sm text-brand-600 hover:underline pt-1"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{SITE_INFO.contact.cateringPhone}</span>
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link href="/" className="flex-1">
            <Button variant="outline" className="w-full h-12 text-xs font-bold uppercase">
              <Home className="w-3.5 h-3.5 mr-1.5" />
              Return Home
            </Button>
          </Link>
          <Link href="/menu" className="flex-1">
            <Button variant="primary" className="w-full h-12 text-xs font-bold uppercase" withArrow>
              Explore Dishes
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

