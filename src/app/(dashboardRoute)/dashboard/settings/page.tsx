"use client";

import React, { useEffect, useState } from "react";
import { settingsService } from "@/services/contentServices";
import { mockStore } from "@/lib/mock-api/mockStore";
import { SiteSettings } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ConfirmDialog } from "@/components/dashboard/ConfirmDialog";
import {
  Save,
  RotateCcw,
  Download,
  Building,
  Phone,
  Tag,
  ShieldCheck,
  Share2,
} from "lucide-react";
import { toast } from "sonner";

export default function SettingsDashboardPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await settingsService.get();
        setSettings(data);
      } catch {
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    try {
      setSaving(true);
      await settingsService.update(settings);
      toast.success("Settings saved successfully");
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleResetData = () => {
    mockStore.resetAll();
    toast.success("Demo store reset to verified factory defaults. Reloading page...");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleExportJson = () => {
    const backup = {
      timestamp: new Date().toISOString(),
      leads: mockStore.getLeads(),
      quotations: mockStore.getQuotations(),
      bookings: mockStore.getBookings(),
      menu: mockStore.getMenu(),
      settings: mockStore.getSettings(),
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `iccb-catering-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Data backup JSON downloaded");
  };

  if (loading || !settings) {
    return <div className="p-12 text-center text-ink-500">Loading settings...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display tracking-tight text-ink-950">
            SYSTEM & BRAND SETTINGS
          </h1>
          <p className="text-sm text-ink-600 mt-1">
            Global verified contact numbers, address, discount offers, and store backups
          </p>
        </div>

        <Button
          onClick={handleSave}
          disabled={saving}
          className="gap-2 bg-brand-500 hover:bg-brand-600 text-white"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Verified Brand Identity */}
        <div className="bg-white p-6 rounded-xl border border-ink-100 shadow-sm space-y-5">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-brand-500" />
            <h2 className="text-base font-bold text-ink-950">Brand & Venue Positioning</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Company / Brand Name *</label>
              <Input
                value={settings.brandName}
                onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Official Tagline *</label>
              <Input
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1">Verified Street Address</label>
            <Input
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            />
          </div>
        </div>

        {/* Verified Contacts */}
        <div className="bg-white p-6 rounded-xl border border-ink-100 shadow-sm space-y-5">
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-brand-500" />
            <h2 className="text-base font-bold text-ink-950">Verified Inquiries & Hotlines</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Primary Catering Hotline *</label>
              <Input
                value={settings.cateringPhone}
                onChange={(e) => setSettings({ ...settings, cateringPhone: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Catering Email *</label>
              <Input
                value={settings.cateringEmail}
                onChange={(e) => setSettings({ ...settings, cateringEmail: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">General Booking Phone</label>
              <Input
                value={settings.bookingPhones[0] || "+88-02-41091551"}
                onChange={(e) => {
                  const copy = [...settings.bookingPhones];
                  copy[0] = e.target.value;
                  setSettings({ ...settings, bookingPhones: copy });
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">General Booking Email</label>
              <Input
                value={settings.generalEmail}
                onChange={(e) => setSettings({ ...settings, generalEmail: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">WhatsApp Hotline</label>
              <Input
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Operating Hours</label>
              <Input
                value={settings.hours}
                onChange={(e) => setSettings({ ...settings, hours: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Promotional Offers */}
        <div className="bg-white p-6 rounded-xl border border-ink-100 shadow-sm space-y-5">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-brand-500" />
            <h2 className="text-base font-bold text-ink-950">Promotional Offer Banner</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-ink-700 mb-1">Offer Popup Title</label>
              <Input
                value={settings.offerPopup.title}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    offerPopup: { ...settings.offerPopup, title: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Promo Coupon Code</label>
              <Input
                value={settings.offerPopup.code}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    offerPopup: { ...settings.offerPopup, code: e.target.value },
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white p-6 rounded-xl border border-ink-100 shadow-sm space-y-5">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-brand-500" />
            <h2 className="text-base font-bold text-ink-950">Social Media Links</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Facebook</label>
              <Input
                value={settings.socialLinks.facebook}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, facebook: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Instagram</label>
              <Input
                value={settings.socialLinks.instagram}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, instagram: e.target.value },
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Data Maintenance & Backup */}
        <div className="bg-white p-6 rounded-xl border border-ink-100 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-500" />
            <h2 className="text-base font-bold text-ink-950">Data Backup & Demo Maintenance</h2>
          </div>
          <p className="text-xs text-ink-600 leading-relaxed">
            All dashboard mock data is securely stored in your local storage. You can export a JSON
            snapshot or restore the verified baseline anytime.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleExportJson}
              className="gap-1.5"
            >
              <Download className="w-4 h-4" />
              Download JSON Backup
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setResetDialogOpen(true)}
              className="gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Demo Data to Factory Baseline
            </Button>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={saving}
            className="gap-2 bg-brand-500 hover:bg-brand-600 text-white"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </form>

      <ConfirmDialog
        isOpen={resetDialogOpen}
        title="Reset Demo Data?"
        message="This will clear your local alterations and restore the verified ICCB baseline catalog, leads, and quotations. Are you sure?"
        confirmText="Reset Baseline"
        confirmVariant="danger"
        onConfirm={handleResetData}
        onCancel={() => setResetDialogOpen(false)}
      />
    </div>
  );
}
