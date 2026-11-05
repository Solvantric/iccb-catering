"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GALLERY_ITEMS } from "@/data/gallery";
import { GalleryItem } from "@/types";
import { SampleBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { ConfirmDialog } from "@/components/dashboard/ConfirmDialog";
import { toast } from "sonner";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { PLACEHOLDER_BLUR } from "@/data/images";

export default function DashboardGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(GALLERY_ITEMS);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<any>("Weddings");
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) return;

    const newItem: GalleryItem = {
      id: "gal-" + Date.now(),
      title,
      category,
      imageUrl,
      caption,
      isSample: true,
    };

    setItems([newItem, ...items]);
    setTitle("");
    setImageUrl("");
    setCaption("");
    toast.success("Photo added to gallery.");
  };

  const handleDelete = () => {
    if (!deleteId) return;
    setItems(items.filter((i) => i.id !== deleteId));
    toast.success("Photo removed from gallery.");
    setDeleteId(null);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-black text-2xl uppercase tracking-tight text-ink-950">
              GALLERY MANAGEMENT
            </h1>
            <SampleBadge />
          </div>
          <p className="text-xs text-ink-500 mt-1">
            Manage public photo gallery categories, captions, and lightbox displays.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Gallery Grid */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-ink-100 shadow-soft space-y-4">
          <h3 className="font-display font-bold text-sm uppercase text-ink-950 border-b border-ink-100 pb-3">
            Active Photos ({items.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((item) => (
              <div key={item.id} className="relative rounded-2xl overflow-hidden border border-ink-100 group">
                <div className="relative h-44 w-full">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    placeholder="blur"
                    blurDataURL={PLACEHOLDER_BLUR}
                    className="object-cover"
                  />
                </div>
                <div className="p-3 bg-white space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold uppercase text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    <button
                      onClick={() => setDeleteId(item.id)}
                      className="text-ink-400 hover:text-red-600 p-1 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h4 className="font-bold text-xs text-ink-950 truncate">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upload / Add Form */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-ink-100 shadow-soft space-y-4">
          <h3 className="font-display font-bold text-sm uppercase text-ink-950 border-b border-ink-100 pb-3">
            Add New Gallery Photo
          </h3>

          <form onSubmit={handleAdd} className="space-y-3">
            <Input
              label="Photo Title *"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Hall 3 Gala Setup"
              required
            />
            <Select
              label="Category *"
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              options={[
                { value: "Weddings", label: "Weddings" },
                { value: "Corporate", label: "Corporate" },
                { value: "Plating", label: "Plating" },
                { value: "Venues", label: "Venues" },
                { value: "Social", label: "Social" },
              ]}
            />
            <Input
              label="Image URL *"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              required
            />
            <Input
              label="Caption / Subtitle"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="e.g. Seating for 2,500 guests"
            />

            <div className="pt-2">
              <Button type="submit" size="sm" variant="primary" withArrow className="w-full">
                Add to Gallery
              </Button>
            </div>
          </form>
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Remove Photo?"
        description="Are you sure you want to delete this photo from the gallery?"
      />
    </div>
  );
}
