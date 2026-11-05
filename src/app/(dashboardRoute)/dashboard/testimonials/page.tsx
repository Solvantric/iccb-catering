"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { testimonialService } from "@/services/contentServices";
import { Testimonial } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { SampleBadge } from "@/components/ui/Badge";
import { ConfirmDialog } from "@/components/dashboard/ConfirmDialog";
import { Plus, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function TestimonialsManagementPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);

  const [form, setForm] = useState({
    author: "",
    role: "",
    company: "",
    rating: 5,
    content: "",
    eventType: "Wedding Banquet",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await testimonialService.list();
      setTestimonials(data);
    } catch {
      toast.error("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.author || !form.content) {
      toast.error("Please fill author name and review content");
      return;
    }

    try {
      const created = await testimonialService.create({
        ...form,
        date: new Date().toISOString().split("T")[0],
        approved: true,
      });
      setTestimonials([created, ...testimonials]);
      setForm({
        author: "",
        role: "",
        company: "",
        rating: 5,
        content: "",
        eventType: "Wedding Banquet",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
      });
      setIsAdding(false);
      toast.success("Testimonial added");
    } catch {
      toast.error("Failed to save testimonial");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await testimonialService.delete(deleteTarget.id);
      setTestimonials((prev) => prev.filter((t) => t.id !== deleteTarget.id));
      toast.success("Testimonial deleted");
    } catch {
      toast.error("Failed to delete testimonial");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold font-display tracking-tight text-ink-950">
              CLIENT TESTIMONIALS
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-600 font-semibold border border-brand-100">
              {testimonials.length} Reviews
            </span>
          </div>
          <p className="text-sm text-ink-600 mt-1">
            Manage feedback displayed in the &ldquo;Clients Thought&rdquo; carousel on the homepage
          </p>
        </div>

        <Button
          onClick={() => setIsAdding(!isAdding)}
          size="sm"
          className="gap-1.5 bg-brand-500 hover:bg-brand-600 text-white"
        >
          <Plus className="w-4 h-4" />
          {isAdding ? "Cancel" : "Add Testimonial"}
        </Button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl border border-brand-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-ink-950">New Client Review</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Client Name *</label>
              <Input
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                placeholder="e.g. Tanvir Chowdhury"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Designation / Role</label>
              <Input
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="e.g. Managing Director"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Company / Family</label>
              <Input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="e.g. Beximco Group / Wedding Host"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Event Occasion</label>
              <Input
                value={form.eventType}
                onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                placeholder="e.g. Corporate Gala 2026"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Star Rating (1-5)</label>
              <Input
                type="number"
                min={1}
                max={5}
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Avatar Image URL</label>
              <Input
                value={form.avatarUrl}
                onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1">Client Review *</label>
            <Textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={3}
              placeholder="What did the client say about ICCB Catering's food and hospitality?..."
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm" className="bg-brand-500 hover:bg-brand-600 text-white">
              Save Review
            </Button>
          </div>
        </form>
      )}

      {/* Grid */}
      {loading ? (
        <div className="p-12 text-center text-ink-400">Loading reviews...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-xl border border-ink-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: t.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  {t.isSample && <SampleBadge />}
                </div>

                <p className="text-xs text-ink-700 italic leading-relaxed mb-6">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-ink-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-ink-100 shrink-0">
                    <Image src={t.avatarUrl} alt={t.author} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-ink-950">{t.author}</h4>
                    <p className="text-[11px] text-ink-500">
                      {t.role ? `${t.role}, ` : ""}
                      {t.company || t.eventType}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setDeleteTarget(t)}
                  className="p-1.5 text-ink-400 hover:text-red-600 rounded-lg transition-colors"
                  title="Delete review"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Testimonial"
        message={`Are you sure you want to delete testimonial from "${deleteTarget?.author}"?`}
        confirmText="Delete"
        confirmVariant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
