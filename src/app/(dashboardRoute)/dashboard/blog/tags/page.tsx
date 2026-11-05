"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ArrowLeft, Plus, Tag as TagIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface TagItem {
  id: string;
  name: string;
  count: number;
}

const INITIAL_TAGS: TagItem[] = [
  { id: "tag-1", name: "Catering", count: 8 },
  { id: "tag-2", name: "Weddings", count: 6 },
  { id: "tag-3", name: "Dhaka", count: 7 },
  { id: "tag-4", name: "Kacchi", count: 4 },
  { id: "tag-5", name: "Mughal", count: 5 },
  { id: "tag-6", name: "Corporate", count: 4 },
  { id: "tag-7", name: "Halal", count: 6 },
  { id: "tag-8", name: "Hygiene", count: 5 },
  { id: "tag-9", name: "Temperature Control", count: 3 },
  { id: "tag-10", name: "Buffet", count: 4 },
];

export default function BlogTagsPage() {
  const [tags, setTags] = useState<TagItem[]>(INITIAL_TAGS);
  const [newTag, setNewTag] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTag.trim()) return;

    if (tags.some((t) => t.name.toLowerCase() === newTag.trim().toLowerCase())) {
      toast.error("Tag already exists");
      return;
    }

    const item: TagItem = {
      id: "tag-" + Date.now(),
      name: newTag.trim(),
      count: 0,
    };
    setTags((prev) => [...prev, item]);
    setNewTag("");
    toast.success(`Tag #${item.name} added`);
  };

  const handleDelete = (id: string, name: string) => {
    setTags((prev) => prev.filter((t) => t.id !== id));
    toast.success(`Tag #${name} deleted`);
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
            BLOG TAGS
          </h1>
        </div>
      </div>

      {/* Add Tag Bar */}
      <form onSubmit={handleAdd} className="bg-white p-4 rounded-xl border border-ink-100 shadow-sm flex gap-3">
        <div className="relative flex-1">
          <TagIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add new tag name (e.g. Banquet, Continental, VVIP)..."
            className="pl-9 h-10"
          />
        </div>
        <Button type="submit" size="sm" className="bg-brand-500 hover:bg-brand-600 text-white gap-1.5">
          <Plus className="w-4 h-4" />
          Add Tag
        </Button>
      </form>

      {/* Tag Cloud / Badges List */}
      <div className="bg-white p-6 rounded-xl border border-ink-100 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wider text-ink-400 mb-4">
          All Active Tags ({tags.length})
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-ink-200 bg-ink-50/50 hover:bg-ink-100 transition-colors text-xs font-semibold text-ink-800"
            >
              <span>#{tag.name}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-ink-200 text-ink-700">
                {tag.count}
              </span>
              <button
                onClick={() => handleDelete(tag.id, tag.name)}
                className="text-ink-400 hover:text-red-600 transition-colors ml-1"
                title="Delete tag"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
