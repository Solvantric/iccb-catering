"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IMAGES } from "@/data/images";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";
import { Copy, Plus, Check, FolderArchive } from "lucide-react";

export default function MediaLibraryPage() {
  const [mediaList, setMediaList] = useState(
    Object.entries(IMAGES).map(([key, url]) => ({
      id: key,
      name: key.replace(/([A-Z])/g, " $1").toLowerCase(),
      url,
      alt: `ICCB ${key}`,
    }))
  );

  const [newUrl, setNewUrl] = useState("");
  const [newName, setNewName] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success("Image URL copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;

    const newMedia = {
      id: "media-" + Date.now(),
      name: newName || "Custom Upload",
      url: newUrl,
      alt: newName || "Uploaded Image",
    };

    setMediaList([newMedia, ...mediaList]);
    setNewUrl("");
    setNewName("");
    toast.success("Media added to library.");
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-2xl uppercase tracking-tight text-ink-950">
            MEDIA ASSET LIBRARY
          </h1>
          <p className="text-xs text-ink-500 mt-1">
            Central repository of verified Unsplash photography and assets with instant URL copying.
          </p>
        </div>
      </div>

      {/* Add Media Bar */}
      <form onSubmit={handleAddMedia} className="bg-white p-4 rounded-2xl border border-ink-100 shadow-soft flex flex-col sm:flex-row gap-3 items-center">
        <Input
          placeholder="Image Title / Label..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="sm:w-64"
        />
        <Input
          placeholder="https://images.unsplash.com/photo-..."
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          className="flex-1"
          required
        />
        <Button size="sm" type="submit" variant="primary" className="shrink-0">
          <Plus className="w-4 h-4 mr-1" />
          Add to Library
        </Button>
      </form>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {mediaList.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-2xl overflow-hidden border border-ink-100 shadow-soft p-2 space-y-2 group"
          >
            <div className="relative h-28 w-full rounded-xl overflow-hidden bg-ink-100">
              <Image src={m.url} alt={m.alt} fill sizes="150px" className="object-cover" />
            </div>
            <div className="space-y-1">
              <p className="font-bold text-[11px] text-ink-900 truncate capitalize">{m.name}</p>
              <button
                type="button"
                onClick={() => copyUrl(m.id, m.url)}
                className="w-full py-1 text-[10px] font-bold uppercase rounded-lg border border-ink-200 hover:border-brand-500 hover:bg-brand-50 text-ink-700 flex items-center justify-center gap-1 transition-colors"
              >
                {copiedId === m.id ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-ink-400" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
