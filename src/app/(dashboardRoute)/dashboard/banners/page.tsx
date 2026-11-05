"use client";

import React, { useState } from "react";
import { INITIAL_SETTINGS } from "@/data/settings";
import { SampleBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { toast } from "sonner";
import { Megaphone, Gift, Save } from "lucide-react";

export default function BannersPage() {
  const [announcementEnabled, setAnnouncementEnabled] = useState(INITIAL_SETTINGS.announcementBar.enabled);
  const [announcementText, setAnnouncementText] = useState(INITIAL_SETTINGS.announcementBar.text);
  const [announcementLinkText, setAnnouncementLinkText] = useState(INITIAL_SETTINGS.announcementBar.linkText);

  const [popupEnabled, setPopupEnabled] = useState(INITIAL_SETTINGS.offerPopup.enabled);
  const [popupDiscount, setPopupDiscount] = useState(INITIAL_SETTINGS.offerPopup.discountText);
  const [popupCode, setPopupCode] = useState(INITIAL_SETTINGS.offerPopup.code);
  const [popupDesc, setPopupDesc] = useState(INITIAL_SETTINGS.offerPopup.description);

  const [saving, setSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Banners & offer popups updated successfully!");
    }, 400);
  };

  return (
    <div className="space-y-6 text-left max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-black text-2xl uppercase tracking-tight text-ink-950">
              BANNERS & PROMOTIONAL POPUPS
            </h1>
            <SampleBadge />
          </div>
          <p className="text-xs text-ink-500 mt-1">
            Configure site-wide top announcement banners, promotional modal popups, and seasonal codes.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Top Announcement Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ink-100 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-ink-100 pb-3">
            <div className="flex items-center gap-2.5">
              <Megaphone className="w-5 h-5 text-brand-500" />
              <h3 className="font-display font-bold text-base uppercase tracking-wider text-ink-950">
                Top Announcement Bar
              </h3>
            </div>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-ink-700">
              <input
                type="checkbox"
                checked={announcementEnabled}
                onChange={(e) => setAnnouncementEnabled(e.target.checked)}
                className="rounded accent-brand-500 w-4 h-4"
              />
              <span>Enabled</span>
            </label>
          </div>

          <div className="space-y-3">
            <Input
              label="Banner Announcement Message"
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
            />
            <Input
              label="Action CTA Link Label"
              value={announcementLinkText}
              onChange={(e) => setAnnouncementLinkText(e.target.value)}
            />
          </div>
        </div>

        {/* Modal Offer Popup */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ink-100 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-ink-100 pb-3">
            <div className="flex items-center gap-2.5">
              <Gift className="w-5 h-5 text-brand-500" />
              <h3 className="font-display font-bold text-base uppercase tracking-wider text-ink-950">
                Seasonal Discount / Privilege Popup (Once per session)
              </h3>
            </div>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-ink-700">
              <input
                type="checkbox"
                checked={popupEnabled}
                onChange={(e) => setPopupEnabled(e.target.checked)}
                className="rounded accent-brand-500 w-4 h-4"
              />
              <span>Enabled</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Offer Headline"
              value={popupDiscount}
              onChange={(e) => setPopupDiscount(e.target.value)}
            />
            <Input
              label="Promotional Coupon Code"
              value={popupCode}
              onChange={(e) => setPopupCode(e.target.value)}
            />
          </div>

          <Textarea
            label="Offer Terms Description"
            value={popupDesc}
            onChange={(e) => setPopupDesc(e.target.value)}
            rows={2}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" isLoading={saving} withArrow>
            Save Banner Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
