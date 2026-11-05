"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { menuService } from "@/services/menuService";
import { MenuItem } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export default function EditMenuItemPage() {
  const params = useParams();
  const router = useRouter();
  const [dish, setDish] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadItem() {
      try {
        const id = params.id as string;
        const res = await menuService.getBySlug(id);
        setDish(res);
      } catch (err) {
        toast.error("Dish not found");
      } finally {
        setLoading(false);
      }
    }
    loadItem();
  }, [params.id]);

  if (loading) return <div className="p-8 text-center text-xs text-ink-500">Loading dish data...</div>;
  if (!dish) return <div className="p-8 text-center text-ink-600">Dish not found</div>;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await menuService.update(dish.id, {
        name: dish.name,
        nameBn: dish.nameBn,
        description: dish.description,
        category: dish.category,
        cuisine: dish.cuisine,
        price: Number(dish.price),
        image: dish.image,
        isTodaysMenu: dish.isTodaysMenu,
        isFeatured: dish.isFeatured,
        isAvailable: dish.isAvailable,
      });

      toast.success("Dish updated successfully!");
      router.push("/dashboard/menu");
    } catch (e) {
      toast.error("Failed to update dish");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 text-left max-w-3xl">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/menu"
          className="p-2 rounded-xl border border-ink-200 text-ink-600 hover:text-ink-950 hover:bg-ink-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="font-display font-black text-2xl uppercase tracking-tight text-ink-950">
            EDIT DISH: {dish.name}
          </h1>
          <p className="text-xs text-ink-500">
            Update pricing, descriptions, and homepage feature flags.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-8 border border-ink-100 shadow-soft space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Dish Name (English) *"
            value={dish.name}
            onChange={(e) => setDish({ ...dish, name: e.target.value })}
            required
          />
          <Input
            label="Dish Name (Bangla)"
            value={dish.nameBn || ""}
            onChange={(e) => setDish({ ...dish, nameBn: e.target.value })}
          />
        </div>

        <Textarea
          label="Culinary Description *"
          value={dish.description}
          onChange={(e) => setDish({ ...dish, description: e.target.value })}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select
            label="Menu Category"
            value={dish.category}
            onChange={(e) => setDish({ ...dish, category: e.target.value as any })}
            options={[
              { value: "Biryani & Rice", label: "Biryani & Rice" },
              { value: "Curries", label: "Curries & Rezala" },
              { value: "Mains", label: "Mains & Grills" },
              { value: "Appetizers", label: "Appetizers" },
              { value: "Desserts", label: "Desserts & Sweets" },
              { value: "Beverages", label: "Beverages" },
            ]}
          />
          <Select
            label="Cuisine"
            value={dish.cuisine}
            onChange={(e) => setDish({ ...dish, cuisine: e.target.value as any })}
            options={[
              { value: "Mughal", label: "Mughal" },
              { value: "Continental", label: "Continental" },
              { value: "Multi-cuisine", label: "Multi-cuisine" },
              { value: "Traditional Bengali", label: "Traditional Bengali" },
            ]}
          />
          <Input
            label="Price (BDT) *"
            type="number"
            value={dish.price}
            onChange={(e) => setDish({ ...dish, price: Number(e.target.value) })}
            required
          />
        </div>

        <Input
          label="Unsplash Image URL *"
          value={dish.image}
          onChange={(e) => setDish({ ...dish, image: e.target.value })}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <label className="flex items-center gap-2 p-3 rounded-xl border border-ink-200 cursor-pointer text-xs font-semibold text-ink-800">
            <input
              type="checkbox"
              checked={dish.isTodaysMenu}
              onChange={(e) => setDish({ ...dish, isTodaysMenu: e.target.checked })}
              className="rounded accent-brand-500 w-4 h-4"
            />
            <span>Today&apos;s Menu</span>
          </label>
          <label className="flex items-center gap-2 p-3 rounded-xl border border-ink-200 cursor-pointer text-xs font-semibold text-ink-800">
            <input
              type="checkbox"
              checked={dish.isFeatured}
              onChange={(e) => setDish({ ...dish, isFeatured: e.target.checked })}
              className="rounded accent-brand-500 w-4 h-4"
            />
            <span>Featured</span>
          </label>
          <label className="flex items-center gap-2 p-3 rounded-xl border border-ink-200 cursor-pointer text-xs font-semibold text-ink-800">
            <input
              type="checkbox"
              checked={dish.isAvailable}
              onChange={(e) => setDish({ ...dish, isAvailable: e.target.checked })}
              className="rounded accent-brand-500 w-4 h-4"
            />
            <span>Available</span>
          </label>
        </div>

        <div className="pt-4 border-t border-ink-100 flex justify-end gap-3">
          <Link href="/dashboard/menu">
            <Button variant="ghost" type="button">
              Cancel
            </Button>
          </Link>
          <Button type="submit" variant="primary" isLoading={saving} withArrow>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
