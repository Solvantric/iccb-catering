import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IMAGES, PLACEHOLDER_BLUR } from "@/data/images";
import { Logo } from "@/components/ui/Logo";
import { ShieldCheck, Utensils, Award } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[85vh] flex">
      {/* Left split: Form container */}
      <div className="flex-1 flex flex-col justify-center py-12 px-6 sm:px-12 lg:px-16 xl:px-24 bg-white">
        <div className="mx-auto w-full max-w-sm lg:max-w-md">
          {children}
        </div>
      </div>

      {/* Right split: Premium Food & Hall Imagery (Hidden on mobile) */}
      <div className="hidden lg:block relative flex-1 bg-ink-950 text-white overflow-hidden">
        <Image
          src={IMAGES.heroFood}
          alt="ICCB Catering Banquet"
          fill
          priority
          placeholder="blur"
          blurDataURL={PLACEHOLDER_BLUR}
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />

        <div className="absolute bottom-16 left-12 right-12 space-y-4 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-white">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>South Asia&apos;s Largest Venue</span>
          </div>

          <h2 className="font-display font-black text-3xl xl:text-4xl uppercase tracking-tight text-white leading-tight">
            THE TASTE OF HAPPINESS FOR 10,000+ GUESTS
          </h2>

          <p className="text-xs text-ink-300 leading-relaxed max-w-md">
            Manage your banquet bookings, explore authentic Mughal recipes, and access our administrative CMS portal.
          </p>

          <div className="pt-2 flex items-center gap-6 text-xs text-brand-300 font-semibold">
            <span>&bull; Modern Slaughterhouse</span>
            <span>&bull; Lab Tested Hygiene</span>
            <span>&bull; Operating Since 2015</span>
          </div>
        </div>
      </div>
    </div>
  );
}
