"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Save, Globe, Search, Share2, ExternalLink, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function SeoSettingsPage() {
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    siteTitle: "ICCB Catering | Premier Banquets & Hospitality Dhaka",
    titleTemplate: "%s | ICCB Catering - Taste of Happiness",
    metaDescription: "Hassle-free, one-stop catering experience in Dhaka with verified modern slaughterhouse, 65°C+ serving temperatures, and quality assurance for weddings, corporate, and social banquets.",
    keywords: "ICCB Catering, Bashundhara convention catering, Dhaka wedding catering, Mughal kacchi biryani catering, corporate banquet Dhaka",
    ogImage: "https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=80",
    canonicalUrl: "https://iccb-catering.com",
    googleSiteVerification: "google-site-verification=iccb-demo-2026-verify",
    analyticsId: "G-ICCB2026DHAKA",
    facebookPixel: "FB-PIXEL-987654321",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("SEO settings saved successfully");
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display tracking-tight text-ink-950">
            SEO & SOCIAL META SETTINGS
          </h1>
          <p className="text-sm text-ink-600 mt-1">
            Configure search engine indexing, Open Graph tags, and analytics tracking
          </p>
        </div>

        <Button
          onClick={handleSave}
          disabled={saving}
          className="gap-2 bg-brand-500 hover:bg-brand-600 text-white"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save SEO Settings"}
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Google SERP Preview Card */}
        <div className="bg-white p-6 rounded-xl border border-ink-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-ink-400 flex items-center gap-1.5">
              <Search className="w-4 h-4" />
              Google Search Snippet Preview
            </h2>
            <span className="text-xs text-ink-400">Desktop Preview</span>
          </div>

          <div className="p-4 rounded-lg bg-ink-50/50 border border-ink-200/60 max-w-2xl font-sans space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-ink-600">
              <Globe className="w-3.5 h-3.5 text-ink-400" />
              <span>https://iccb-catering.com</span>
              <span className="text-ink-400">› banquet-catering</span>
            </div>
            <h3 className="text-lg text-[#1a0dab] font-normal hover:underline cursor-pointer leading-snug">
              {form.siteTitle}
            </h3>
            <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-2">
              {form.metaDescription}
            </p>
          </div>
        </div>

        {/* Global Metadata */}
        <div className="bg-white p-6 rounded-xl border border-ink-100 shadow-sm space-y-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-ink-400">Default Meta Tags</h2>

          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1">
              Global Site Title (Homepage Title) *
            </label>
            <Input
              value={form.siteTitle}
              onChange={(e) => setForm({ ...form, siteTitle: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1">
              Title Template (Child pages replace %s)
            </label>
            <Input
              value={form.titleTemplate}
              onChange={(e) => setForm({ ...form, titleTemplate: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1">
              Global Meta Description (150-160 chars recommended) *
            </label>
            <Textarea
              value={form.metaDescription}
              onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
              rows={3}
              required
            />
            <span className="text-[11px] text-ink-400 mt-1 block">
              Length: {form.metaDescription.length} characters
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1">Meta Keywords</label>
            <Input
              value={form.keywords}
              onChange={(e) => setForm({ ...form, keywords: e.target.value })}
            />
          </div>
        </div>

        {/* OpenGraph & Social Sharing */}
        <div className="bg-white p-6 rounded-xl border border-ink-100 shadow-sm space-y-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-ink-400 flex items-center gap-1.5">
            <Share2 className="w-4 h-4" />
            Social Media (Open Graph & Twitter Cards)
          </h2>

          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1">
              Default Social Share Image (og:image)
            </label>
            <Input
              value={form.ogImage}
              onChange={(e) => setForm({ ...form, ogImage: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1">Canonical Base URL</label>
            <Input
              value={form.canonicalUrl}
              onChange={(e) => setForm({ ...form, canonicalUrl: e.target.value })}
            />
          </div>
        </div>

        {/* Tracking Scripts & Verification */}
        <div className="bg-white p-6 rounded-xl border border-ink-100 shadow-sm space-y-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-ink-400">
            Analytics & Verification Codes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">
                Google Analytics 4 Measurement ID
              </label>
              <Input
                value={form.analyticsId}
                onChange={(e) => setForm({ ...form, analyticsId: e.target.value })}
                placeholder="G-XXXXXXXXXX"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">
                Google Search Console Token
              </label>
              <Input
                value={form.googleSiteVerification}
                onChange={(e) => setForm({ ...form, googleSiteVerification: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Sitemap & Robots shortcuts */}
        <div className="bg-white p-6 rounded-xl border border-ink-100 shadow-sm flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-ink-950">Dynamic XML Sitemap</h3>
            <p className="text-xs text-ink-500 mt-0.5">
              Generated dynamically with priority and change frequencies
            </p>
          </div>
          <Link
            href="/sitemap.xml"
            target="_blank"
            className="flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
          >
            <span>View sitemap.xml</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={saving}
            className="gap-2 bg-brand-500 hover:bg-brand-600 text-white"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save SEO Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
}

