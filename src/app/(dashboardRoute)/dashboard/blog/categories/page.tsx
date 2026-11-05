"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ArrowLeft, Plus, Folder, Trash2, Edit2 } from "lucide-react";
import { toast } from "sonner";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  articleCount: number;
  description: string;
}

const INITIAL_CATEGORIES: CategoryItem[] = [
  { id: "cat-1", name: "Catering Tips", slug: "catering-tips", articleCount: 4, description: "Professional advice for hosting seamless large-scale events" },
  { id: "cat-2", name: "Menu Guides", slug: "menu-guides", articleCount: 3, description: "Deep-dives into Mughal culinary traditions and banquet tasting" },
  { id: "cat-3", name: "Wedding Planning", slug: "wedding-planning", articleCount: 5, description: "Comprehensive wedding hospitality, decor, and timeline planning" },
  { id: "cat-4", name: "Corporate Hospitality", slug: "corporate-hospitality", articleCount: 2, description: "AGMs, diplomatic summits, conferences, and gala dinners" },
  { id: "cat-5", name: "Behind the Scenes", slug: "behind-the-scenes", articleCount: 2, description: "Inside ICCB's modern slaughterhouse and hygiene labs" },
];

export default function BlogCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>(INITIAL_CATEGORIES);
  const [newCat, setNewCat] = useState({ name: "", description: "" });
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCat.name.trim()) return;

    const slug = newCat.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const item: CategoryItem = {
      id: "cat-" + Date.now(),
      name: newCat.name,
      slug,
      articleCount: 0,
      description: newCat.description || "General category articles",
    };

    setCategories((prev) => [...prev, item]);
    setNewCat({ name: "", description: "" });
    setIsAdding(false);
    toast.success(`Category "${item.name}" created`);
  };

  const handleDelete = (id: string, name: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    toast.success(`Category "${name}" deleted`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/blog">
            <Button variant="ghost" size="sm" className="gap-1 text-ink-600">
              <ArrowLeft className="w-4 h-4" />
              Back to Articles
            </Button>
          </Link>
          <h1 className="text-2xl font-bold font-display tracking-tight text-ink-950">
            BLOG CATEGORIES
          </h1>
        </div>

        <Button
          onClick={() => setIsAdding(!isAdding)}
          size="sm"
          className="gap-1.5 bg-brand-500 hover:bg-brand-600 text-white"
        >
          <Plus className="w-4 h-4" />
          {isAdding ? "Cancel" : "Add Category"}
        </Button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl border border-brand-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-ink-950">New Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Category Name *</label>
              <Input
                value={newCat.name}
                onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                placeholder="e.g. Dessert Showcases"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Description</label>
              <Input
                value={newCat.description}
                onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
                placeholder="Brief category summary"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm" className="bg-brand-500 hover:bg-brand-600 text-white">
              Save Category
            </Button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl border border-ink-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-ink-100">
          {categories.map((cat) => (
            <div key={cat.id} className="p-4 sm:p-5 flex items-center justify-between hover:bg-ink-50/50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600 mt-0.5">
                  <Folder className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-ink-950">{cat.name}</h3>
                    <span className="text-xs text-ink-400 font-mono">/{cat.slug}</span>
                  </div>
                  <p className="text-xs text-ink-500 mt-0.5">{cat.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs px-2.5 py-1 rounded-full bg-ink-100 text-ink-600 font-semibold">
                  {cat.articleCount} Articles
                </span>
                <button
                  onClick={() => handleDelete(cat.id, cat.name)}
                  className="p-1.5 text-ink-400 hover:text-red-600 rounded-lg transition-colors"
                  title="Delete category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
