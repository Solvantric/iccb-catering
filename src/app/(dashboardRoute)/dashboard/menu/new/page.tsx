"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { menuService } from "@/services/menuService";
import { IMAGES } from "@/data/images";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export default function NewMenuItemPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [nameBn, setNameBn] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Biryani & Rice");
  const [cuisine, setCuisine] = useState("Mughal");
  const [price, setPrice] = useState(650);
  const [image, setImage] = useState(IMAGES.kacchiBiryani);
  const [dietTags, setDietTags] = useState<string[]>(["Halal", "Non-Veg"]);
  const [isTodaysMenu, setIsTodaysMenu] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleTag = (t: string) => {
    if (dietTags.includes(t)) {
      setDietTags(dietTags.filter((x) => x !== t));
    } else {
      setDietTags([...dietTags, t]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Dish name is required");
      return;
    }
    setLoading(true);
    try {
      await menuService.create({
        name,
        nameBn,
        description,
        category: category as any,
        cuisine: cuisine as any,
        price: Number(price),
        image: image || IMAGES.heroFood,
        dietTags: dietTags as any,
        isAvailable: true,
        isFeatured,
        isTodaysMenu,
      });

      toast.success(`Dish "${name}" added to menu catalog!`);
      router.push("/dashboard/menu");
    } catch (err) {
      toast.error("Failed to create dish");
    } finally {
      setLoading(false);
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
            ADD NEW CATERING DISH
          </h1>
          <p className="text-xs text-ink-500">
            Add a new culinary item with price, diet certifications, and photography.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-8 border border-ink-100 shadow-soft space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Dish Name (English) *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Shahi Mutton Kacchi Biryani"
            required
          />
          <Input
            label="Dish Name (Bangla)"
            value={nameBn}
            onChange={(e) => setNameBn(e.target.value)}
            placeholder="e.g. শাহী মাটন কাচ্চি বিরিয়ানি"
          />
        </div>

        <Textarea
          label="Detailed Culinary Description *"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe ingredients, cooking technique, spices, and garnish..."
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select
            label="Menu Category *"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            label="Cuisine *"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            options={[
              { value: "Mughal", label: "Mughal" },
              { value: "Continental", label: "Continental" },
              { value: "Multi-cuisine", label: "Multi-cuisine" },
              { value: "Traditional Bengali", label: "Traditional Bengali" },
            ]}
          />
          <Input
            label="Standard Price (BDT) *"
            type="number"
            min="10"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>

        <Input
          label="Unsplash Image URL *"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://images.unsplash.com/photo-..."
          helperText="Direct verified Unsplash image URL"
        />

        {/* Diet Certifications */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-ink-700">
            Dietary Attributes:
          </label>
          <div className="flex flex-wrap gap-2">
            {["Halal", "Veg", "Non-Veg", "Spicy", "Chef Special"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => toggleTag(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                  dietTags.includes(t)
                    ? "bg-brand-500 text-white shadow-sm"
                    : "bg-ink-100 text-ink-600 hover:bg-ink-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <label className="flex items-center gap-2.5 p-3 rounded-xl border border-ink-200 cursor-pointer text-xs font-semibold text-ink-800">
            <input
              type="checkbox"
              checked={isTodaysMenu}
              onChange={(e) => setIsTodaysMenu(e.target.checked)}
              className="rounded accent-brand-500 w-4 h-4"
            />
            <span>Feature in &ldquo;Today&apos;s Special Menu&rdquo; on Homepage</span>
          </label>

          <label className="flex items-center gap-2.5 p-3 rounded-xl border border-ink-200 cursor-pointer text-xs font-semibold text-ink-800">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="rounded accent-brand-500 w-4 h-4"
            />
            <span>Highlight as Featured Dish</span>
          </label>
        </div>

        <div className="pt-4 border-t border-ink-100 flex justify-end gap-3">
          <Link href="/dashboard/menu">
            <Button variant="ghost" type="button">
              Cancel
            </Button>
          </Link>
          <Button type="submit" variant="primary" isLoading={loading} withArrow>
            Save Dish to Menu
          </Button>
        </div>
      </form>
    </div>
  );
}

