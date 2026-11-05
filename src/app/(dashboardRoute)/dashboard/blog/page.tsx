"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogService } from "@/services/contentServices";
import { BlogPost } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge, SampleBadge } from "@/components/ui/Badge";
import { ConfirmDialog } from "@/components/dashboard/ConfirmDialog";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  BookOpen,
  Calendar,
  Clock,
  Tag,
  FolderOpen,
} from "lucide-react";
import { toast } from "sonner";

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await blogService.list();
      setPosts(data);
    } catch {
      toast.error("Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await blogService.delete(deleteTarget.id);
      toast.success("Article deleted successfully");
      setPosts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    } catch {
      toast.error("Failed to delete article");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold font-display tracking-tight text-ink-950">
              BLOG & ARTICLES
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-600 font-semibold border border-brand-100">
              {posts.length} Posts
            </span>
          </div>
          <p className="text-sm text-ink-600 mt-1">
            Manage catering guides, culinary event stories, and hospitality news
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/dashboard/blog/categories">
            <Button variant="outline" size="sm" className="gap-1.5">
              <FolderOpen className="w-4 h-4" />
              Categories
            </Button>
          </Link>
          <Link href="/dashboard/blog/tags">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Tag className="w-4 h-4" />
              Tags
            </Button>
          </Link>
          <Link href="/dashboard/blog/new">
            <Button size="sm" className="gap-1.5 bg-brand-500 hover:bg-brand-600 text-white">
              <Plus className="w-4 h-4" />
              New Article
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-ink-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <Input
            placeholder="Search by title or excerpt..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? "bg-brand-500 text-white shadow-sm"
                  : "bg-ink-50 text-ink-600 hover:bg-ink-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid / Table */}
      {loading ? (
        <div className="p-12 text-center text-ink-400">Loading articles...</div>
      ) : filteredPosts.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-ink-200 p-12 text-center">
          <BookOpen className="w-12 h-12 text-ink-300 mx-auto mb-3" />
          <h3 className="font-semibold text-ink-950">No articles found</h3>
          <p className="text-sm text-ink-500 mt-1">Try adjusting your search or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl border border-ink-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow group"
            >
              <div className="relative h-44 w-full bg-ink-100 overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-md bg-ink-950/80 backdrop-blur-sm text-white text-xs font-semibold">
                    {post.category}
                  </span>
                  {post.isSample && <SampleBadge />}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-ink-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.publishedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-bold text-ink-950 text-base line-clamp-2 mb-2 group-hover:text-brand-500 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-xs text-ink-600 line-clamp-2 mb-4">{post.excerpt}</p>
                </div>

                <div className="pt-4 border-t border-ink-100 flex items-center justify-between">
                  <span className="text-xs text-ink-500 font-medium">By {post.author.name}</span>

                  <div className="flex items-center gap-1">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg text-ink-500 hover:text-ink-950 hover:bg-ink-100 transition-colors"
                      title="View Public Page"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/dashboard/blog/${post.id}/edit`}
                      className="p-1.5 rounded-lg text-ink-500 hover:text-brand-600 hover:bg-brand-50 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setDeleteTarget(post)}
                      className="p-1.5 rounded-lg text-ink-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Blog Article"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmVariant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

