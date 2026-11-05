"use client";

import React, { useState } from "react";
import { SITE_INFO } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { SampleBadge } from "@/components/ui/Badge";
import { toast } from "sonner";
import { Save, Check } from "lucide-react";

export default function PageContentEditor() {
  const [tagline, setTagline] = useState(SITE_INFO.tagline);
  const [heroHeading, setHeroHeading] = useState("DELICIOUS FOOD FOR ANY EVENT");
  const [positioning, setPositioning] = useState(SITE_INFO.positioning);
  const [saving, setSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Page copy updated! Changes applied across public site.");
    }, 400);
  };

  return (
    <div className="space-y-6 text-left max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-black text-2xl uppercase tracking-tight text-ink-950">
              PAGE & SECTION CONTENT EDITOR
            </h1>
            <SampleBadge />
          </div>
          <p className="text-xs text-ink-500 mt-1">
            Edit live hero headlines, positioning text, and verified brand specialties.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-8 border border-ink-100 shadow-soft space-y-6">
        <div className="border-b border-ink-100 pb-4">
          <h3 className="font-display font-bold text-sm uppercase text-brand-600 tracking-wider">
            Homepage Hero Section Copy
          </h3>
        </div>

        <div className="space-y-4">
          <Input
            label="Brand Tagline (Script Font Accent)"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
          />
          <Input
            label="Giant Hero Display H1"
            value={heroHeading}
            onChange={(e) => setHeroHeading(e.target.value)}
          />
          <Textarea
            label="Brand Positioning & Hygiene Pledge"
            value={positioning}
            onChange={(e) => setPositioning(e.target.value)}
            rows={4}
          />
        </div>

        {/* Verified 4 Specialties */}
        <div className="pt-4 border-t border-ink-100 space-y-4">
          <h3 className="font-display font-bold text-sm uppercase text-brand-600 tracking-wider">
            Verified 4 Brand Specialties (Trust Strip)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SITE_INFO.specialties.map((item, idx) => (
              <div key={item.id} className="p-4 bg-ink-50 rounded-2xl border border-ink-200 space-y-1">
                <span className="text-[10px] uppercase font-bold text-ink-400">Pillar 0{idx + 1}</span>
                <p className="font-bold text-xs text-ink-950">{item.title}</p>
                <p className="text-[11px] text-ink-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-ink-100 flex justify-end">
          <Button type="submit" variant="primary" isLoading={saving} withArrow>
            Save Page Content
          </Button>
        </div>
      </form>
    </div>
  );
}

