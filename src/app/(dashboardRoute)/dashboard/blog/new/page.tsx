"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { blogService } from "@/services/contentServices";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { ArrowLeft, Save, Sparkles, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

const PRESET_IMAGES = [
  { label: "Grand Buffet", url: "https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=80" },
  { label: "Biryani Feast", url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1200&q=80" },
  { label: "Wedding Banquet", url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80" },
  { label: "Corporate Dining", url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80" },
];

export default function NewBlogPostPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "Catering Tips",
    readTime: "5 min read",
    authorName: "ICCB Culinary Team",
    authorRole: "Executive Chef & Banquet Specialists",
    coverImage: PRESET_IMAGES[0].url,
    excerpt: "",
    content: "",
    tags: "Catering, Weddings, ICCB, Dhaka",
  });

  const handleTitleChange = (val: string) => {
    const slug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setForm((prev) => ({ ...prev, title: val, slug }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.excerpt || !form.content) {
      toast.error("Please fill in title, excerpt, and content");
      return;
    }

    try {
      setSubmitting(true);
      await blogService.create({
        title: form.title,
        slug: form.slug,
        category: form.category,
        readTime: form.readTime,
        coverImage: form.coverImage,
        excerpt: form.excerpt,
        content: form.content,
        author: {
          name: form.authorName,
          role: form.authorRole,
          avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=200&q=80",
        },
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      });

      toast.success("Blog article published successfully!");
      router.push("/dashboard/blog");
    } catch {
      toast.error("Failed to create blog post");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/blog">
            <Button variant="ghost" size="sm" className="gap-1 text-ink-600">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold font-display tracking-tight text-ink-950">
            CREATE NEW ARTICLE
          </h1>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={submitting}
          className="gap-2 bg-brand-500 hover:bg-brand-600 text-white"
        >
          <Save className="w-4 h-4" />
          {submitting ? "Publishing..." : "Publish Article"}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Details */}
        <div className="bg-white p-6 rounded-xl border border-ink-100 shadow-sm space-y-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-ink-400">Article Details</h2>

          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1">Article Title *</label>
            <Input
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. 7 Secrets to Seamless 1,000+ Guest Banquets"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">URL Slug</label>
              <Input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="7-secrets-to-seamless-banquets"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Category</label>
              <Select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                options={[
                  { value: "Catering Tips", label: "Catering Tips" },
                  { value: "Menu Guides", label: "Menu Guides" },
                  { value: "Wedding Planning", label: "Wedding Planning" },
                  { value: "Corporate Hospitality", label: "Corporate Hospitality" },
                  { value: "Behind the Scenes", label: "Behind the Scenes" },
                ]}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Read Time</label>
              <Input
                value={form.readTime}
                onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                placeholder="e.g. 5 min read"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Author Name</label>
              <Input
                value={form.authorName}
                onChange={(e) => setForm({ ...form, authorName: e.target.value })}
                placeholder="e.g. ICCB Culinary Team"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Author Role</label>
              <Input
                value={form.authorRole}
                onChange={(e) => setForm({ ...form, authorRole: e.target.value })}
                placeholder="e.g. Executive Banquet Chef"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1">Tags (comma separated)</label>
            <Input
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="Catering, Weddings, Dhaka, Mughal"
            />
          </div>
        </div>

        {/* Cover Image */}
        <div className="bg-white p-6 rounded-xl border border-ink-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-ink-400">Cover Image</h2>
            <span className="text-xs text-ink-400">Unsplash or CDN URL</span>
          </div>

          <Input
            value={form.coverImage}
            onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
            placeholder="https://images.unsplash.com/..."
          />

          <div className="space-y-2">
            <span className="text-xs text-ink-500 font-medium">Quick Presets:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PRESET_IMAGES.map((img) => (
                <button
                  type="button"
                  key={img.label}
                  onClick={() => setForm({ ...form, coverImage: img.url })}
                  className={`p-2 rounded-lg border text-left text-xs transition-all flex flex-col items-center gap-2 ${
                    form.coverImage === img.url
                      ? "border-brand-500 bg-brand-50/50 text-brand-600 font-semibold"
                      : "border-ink-200 hover:border-ink-300 text-ink-600"
                  }`}
                >
                  <div className="relative w-full h-16 rounded overflow-hidden bg-ink-100">
                    <Image src={img.url} alt={img.label} fill className="object-cover" />
                  </div>
                  <span>{img.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Excerpt & Content */}
        <div className="bg-white p-6 rounded-xl border border-ink-100 shadow-sm space-y-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-ink-400">Content</h2>

          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1">
              Short Excerpt (Summary for Cards & SEO) *
            </label>
            <Textarea
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              rows={2}
              placeholder="Provide a compelling 1-2 sentence overview of this article..."
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-ink-700">Full Article Content (Markdown or HTML) *</label>
              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    content: `### Introduction\nHosting a premier banquet requires precision, hygienic preparation, and seasoned hospitality staff.\n\n### 1. Temperature Control\nAt ICCB Catering, food is maintained at proper 65°C+ serving temperatures.\n\n### 2. Quality Assurance\nEvery batch of meat and poultry passes strict vet and culinary quality inspections.\n\n### Conclusion\nContact our team to plan your next remarkable banquet.`,
                  })
                }
                className="text-xs text-brand-500 hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Fill Sample Body
              </button>
            </div>
            <Textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={12}
              className="font-mono text-sm"
              placeholder="Write or paste your article content here..."
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link href="/dashboard/blog">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button
            type="submit"
            disabled={submitting}
            className="gap-2 bg-brand-500 hover:bg-brand-600 text-white"
          >
            <Save className="w-4 h-4" />
            {submitting ? "Publishing..." : "Publish Article"}
          </Button>
        </div>
      </form>
    </div>
  );
}
