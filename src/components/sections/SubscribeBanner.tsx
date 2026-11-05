"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { IMAGES, PLACEHOLDER_BLUR } from "@/data/images";
import { track } from "@/lib/analytics";
import { toast } from "sonner";
import { MailCheck } from "lucide-react";

export function SubscribeBanner() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please provide a valid email address.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      track("newsletter_subscribed", { email });
      // Save to localStorage subscribers
      try {
        const existing = JSON.parse(localStorage.getItem("iccb_mock_subscribers") || "[]");
        existing.unshift({
          id: "sub-" + Date.now(),
          email,
          source: "Home Newsletter Banner",
          subscribedAt: new Date().toISOString(),
          status: "active",
          isSample: true,
        });
        localStorage.setItem("iccb_mock_subscribers", JSON.stringify(existing));
      } catch (err) {
        // ignore
      }
      toast.success("Thank you! You have subscribed to ICCB Catering seasonal offers.");
    }, 400);
  };

  return (
    <section className="relative py-20 overflow-hidden bg-ink-950 text-white">
      {/* Background Image with Dark Tint */}
      <div className="absolute inset-0 z-0">
        <Image
          src={IMAGES.weddingReception}
          alt="ICCB Catering Ambience"
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL={PLACEHOLDER_BLUR}
          className="object-cover opacity-25 filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-xs" />
      </div>

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="font-serif italic text-brand-400 text-lg font-semibold block">
            ~ Stay Inspired ~
          </span>

          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
            SUBSCRIBE FOR SEASONAL MENUS & EXCLUSIVE OFFERS
          </h2>

          <p className="text-xs sm:text-sm text-ink-300 leading-relaxed max-w-xl mx-auto">
            Receive early access to winter wedding dates, corporate conference package specials, and newly curated dishes from Executive Chef Rafiqul.
          </p>

          {submitted ? (
            <div className="p-6 bg-brand-950/80 border border-brand-500/50 rounded-2xl flex items-center justify-center gap-3 text-brand-300 animate-in fade-in">
              <MailCheck className="w-6 h-6 text-brand-400" />
              <span className="text-sm font-semibold">
                You&apos;re subscribed! Look out for our upcoming seasonal showcase.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="pt-4 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                required
                className="flex-1 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-ink-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white/15 backdrop-blur-md transition-all"
              />
              <Button type="submit" size="md" isLoading={loading} variant="primary" withArrow>
                Subscribe
              </Button>
            </form>
          )}

          <p className="text-[11px] text-ink-400 pt-2">
            We respect your privacy. No spam, ever. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}

