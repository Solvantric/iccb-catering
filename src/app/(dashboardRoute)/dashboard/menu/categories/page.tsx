"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MENU_CATEGORIES } from "@/data/menu";
import { MenuCategory } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";
import { ArrowLeft, Plus, Trash2, Edit2 } from "lucide-react";

export default function MenuCategoriesPage() {
  const [categories, setCategories] = useState<MenuCategory[]>(MENU_CATEGORIES);
  const [newCatName, setNewCatName] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const newCat: MenuCategory = {
      id: "cat-" + Date.now(),
      name: newCatName,
      slug: newCatName.toLowerCase().replace(/\s+/g, "-"),
      description: newCatDesc || "Curated menu selections",
      displayOrder: categories.length + 1,
    };

    setCategories([...categories, newCat]);
    setNewCatName("");
    setNewCatDesc("");
    toast.success(`Category "${newCat.name}" added.`);
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
    toast.success("Category removed.");
  };

  return (
    <div className="space-y-6 text-left max-w-4xl">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/menu"
          className="p-2 rounded-xl border border-ink-200 text-ink-600 hover:text-ink-950 hover:bg-ink-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="font-display font-black text-2xl uppercase tracking-tight text-ink-950">
            MENU CATEGORIES
          </h1>
          <p className="text-xs text-ink-500">
            Manage culinary category groupings displayed across public menu tabs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Category List */}
        <div className="md:col-span-7 bg-white rounded-3xl p-6 border border-ink-100 shadow-soft space-y-4">
          <h3 className="font-display font-bold text-sm uppercase text-ink-950 border-b border-ink-100 pb-3">
            Active Categories
          </h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="p-3.5 rounded-xl bg-ink-50 border border-ink-100 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-ink-900 block">{cat.name}</span>
                  <span className="text-[10px] text-ink-400">{cat.description}</span>
                </div>
                {cat.id !== "all" && (
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="p-1.5 text-ink-400 hover:text-red-600 rounded"
                    title="Remove category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Add New Category */}
        <div className="md:col-span-5 bg-white rounded-3xl p-6 border border-ink-100 shadow-soft space-y-4">
          <h3 className="font-display font-bold text-sm uppercase text-ink-950 border-b border-ink-100 pb-3">
            Add New Category
          </h3>
          <form onSubmit={handleAdd} className="space-y-3">
            <Input
              label="Category Name *"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              placeholder="e.g. Seafood & Grills"
              required
            />
            <Input
              label="Short Description"
              value={newCatDesc}
              onChange={(e) => setNewCatDesc(e.target.value)}
              placeholder="e.g. Fresh ocean catches and tandoori prawns"
            />
            <div className="pt-2">
              <Button type="submit" size="sm" variant="primary" withArrow className="w-full">
                Add Category
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

