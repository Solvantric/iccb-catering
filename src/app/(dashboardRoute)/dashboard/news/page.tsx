"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Badge, SampleBadge } from "@/components/ui/Badge";
import { ConfirmDialog } from "@/components/dashboard/ConfirmDialog";
import { Plus, Newspaper, Calendar, Trash2, Edit2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  summary: string;
  url: string;
  isSample: boolean;
}

const INITIAL_NEWS: NewsItem[] = [
  {
    id: "news-1",
    title: "ICCB Catering Unveils Automated Temperature-Controlled Banquet Transports",
    source: "The Daily Star (Corporate Hospitality)",
    date: "14 Feb 2026",
    summary: "New fleet of heated and refrigerated mobile units guarantees fresh 65°C serving for large-scale external venues across Dhaka.",
    url: "#",
    isSample: true,
  },
  {
    id: "news-2",
    title: "ICCB Hosts 3,500 Guest Diplomatic Banquet with Zero-Waste Culinary Initiative",
    source: "Dhaka Tribune",
    date: "28 Jan 2026",
    summary: "ICCB Catering partnered with local food sustainability networks, repurposing untouched banquet fare under strict safety protocols.",
    url: "#",
    isSample: true,
  },
  {
    id: "news-3",
    title: "Mughal Gastronomy Excellence Award Presented to ICCB Heritage Restaurant",
    source: "Bangladesh Culinary Guild",
    date: "10 Nov 2025",
    summary: "Honoring five years of authentic dum-pukht kacchi and traditional shahi recipes since the restaurant's opening in June 2021.",
    url: "#",
    isSample: true,
  },
];

export default function NewsManagementPage() {
  const [news, setNews] = useState<NewsItem[]>(INITIAL_NEWS);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<NewsItem | null>(null);

  const [form, setForm] = useState({
    title: "",
    source: "ICCB Press Office",
    date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    summary: "",
    url: "",
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.summary) {
      toast.error("Please fill title and summary");
      return;
    }

    const item: NewsItem = {
      id: "news-" + Date.now(),
      title: form.title,
      source: form.source || "ICCB Press Release",
      date: form.date,
      summary: form.summary,
      url: form.url || "#",
      isSample: true,
    };

    setNews([item, ...news]);
    setForm({
      title: "",
      source: "ICCB Press Office",
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      summary: "",
      url: "",
    });
    setIsAdding(false);
    toast.success("News item added");
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setNews((prev) => prev.filter((n) => n.id !== deleteTarget.id));
    toast.success("News item removed");
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold font-display tracking-tight text-ink-950">
              NEWS & PRESS RELEASES
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-600 font-semibold border border-brand-100">
              {news.length} Items
            </span>
          </div>
          <p className="text-sm text-ink-600 mt-1">
            Media coverage, press announcements, and culinary milestones
          </p>
        </div>

        <Button
          onClick={() => setIsAdding(!isAdding)}
          size="sm"
          className="gap-1.5 bg-brand-500 hover:bg-brand-600 text-white"
        >
          <Plus className="w-4 h-4" />
          {isAdding ? "Cancel" : "Add News Item"}
        </Button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl border border-brand-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-ink-950">Publish Press Release / Media Mention</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-ink-700 mb-1">Headline *</label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Headline..."
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Publication / Source</label>
              <Input
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
                placeholder="e.g. Daily Star"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Date</label>
              <Input
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">External Article Link (optional)</label>
              <Input
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1">Summary *</label>
            <Textarea
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              rows={3}
              placeholder="1-2 sentences summarizing the news release..."
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm" className="bg-brand-500 hover:bg-brand-600 text-white">
              Save Press Release
            </Button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="bg-white rounded-xl border border-ink-100 shadow-sm divide-y divide-ink-100">
        {news.map((item) => (
          <div key={item.id} className="p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:bg-ink-50/50 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-ink-100 flex items-center justify-center text-ink-600 shrink-0 mt-0.5">
                <Newspaper className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-ink-950 text-base">{item.title}</h3>
                  {item.isSample && <SampleBadge />}
                </div>
                <div className="flex items-center gap-3 text-xs text-ink-400">
                  <span className="font-medium text-ink-600">{item.source}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </span>
                </div>
                <p className="text-xs text-ink-600 pt-1 leading-relaxed">{item.summary}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              {item.url && item.url !== "#" && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-ink-400 hover:text-ink-700 rounded-lg hover:bg-ink-100 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <button
                onClick={() => setDeleteTarget(item)}
                className="p-2 text-ink-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Press Release"
        message={`Are you sure you want to delete "${deleteTarget?.title}"?`}
        confirmText="Delete"
        confirmVariant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

