"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { blogService } from "@/services/contentServices";
import { BlogPost } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const idOrSlug = params.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<BlogPost | null>(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "Catering Tips",
    readTime: "5 min read",
    authorName: "",
    authorRole: "",
    coverImage: "",
    excerpt: "",
    content: "",
    tags: "",
  });

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true);
        const all = await blogService.list();
        const found = all.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
        if (!found) {
          toast.error("Article not found");
          router.push("/dashboard/blog");
          return;
        }
        setPost(found);
        setForm({
          title: found.title,
          slug: found.slug,
          category: found.category,
          readTime: found.readTime,
          authorName: found.author.name,
          authorRole: found.author.role,
          coverImage: found.coverImage,
          excerpt: found.excerpt,
          content: found.content,
          tags: found.tags.join(", "),
        });
      } catch {
        toast.error("Failed to load article");
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [idOrSlug, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;

    try {
      setSubmitting(true);
      await blogService.update(post.id, {
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
          avatar: post.author.avatar,
        },
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      });

      toast.success("Article updated successfully!");
      router.push("/dashboard/blog");
    } catch {
      toast.error("Failed to update article");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-ink-500">Loading article details...</div>;
  }

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
            EDIT ARTICLE
          </h1>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={submitting}
          className="gap-2 bg-brand-500 hover:bg-brand-600 text-white"
        >
          <Save className="w-4 h-4" />
          {submitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-xl border border-ink-100 shadow-sm space-y-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-ink-400">Article Details</h2>

          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1">Article Title *</label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">URL Slug</label>
              <Input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
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
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Author Name</label>
              <Input
                value={form.authorName}
                onChange={(e) => setForm({ ...form, authorName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Author Role</label>
              <Input
                value={form.authorRole}
                onChange={(e) => setForm({ ...form, authorRole: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1">Tags (comma separated)</label>
            <Input
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-ink-100 shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-ink-400">Cover Image</h2>
          <Input
            value={form.coverImage}
            onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
          />
          {form.coverImage && (
            <div className="relative h-48 w-full max-w-md rounded-lg overflow-hidden bg-ink-100 border border-ink-200">
              <Image src={form.coverImage} alt="Cover Preview" fill className="object-cover" />
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl border border-ink-100 shadow-sm space-y-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-ink-400">Content</h2>

          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1">Excerpt *</label>
            <Textarea
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              rows={2}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1">Full Content (Markdown or HTML) *</label>
            <Textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={14}
              className="font-mono text-sm"
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
            {submitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
