"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { MENU_ITEMS, MENU_CATEGORIES } from "@/data/menu";
import { formatCurrency } from "@/lib/format";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Tabs } from "@/components/ui/Tabs";
import { PLACEHOLDER_BLUR } from "@/data/images";
import { Search, Filter, ShieldCheck, Flame, ArrowRight } from "lucide-react";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [selectedDiet, setSelectedDiet] = useState("All");

  const cuisines = ["All", "Mughal", "Continental", "Multi-cuisine", "Traditional Bengali"];
  const dietOptions = ["All", "Halal", "Veg", "Spicy", "Chef Special"];

  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((dish) => {
      // Category check
      if (activeCategory !== "all") {
        const cat = MENU_CATEGORIES.find((c) => c.id === activeCategory);
        if (cat && dish.category !== cat.name) {
          return false;
        }
      }

      // Cuisine check
      if (selectedCuisine !== "All" && dish.cuisine !== selectedCuisine) {
        return false;
      }

      // Diet check
      if (selectedDiet !== "All" && !dish.dietTags.includes(selectedDiet as any)) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = dish.name.toLowerCase().includes(q);
        const matchDesc = dish.description.toLowerCase().includes(q);
        const matchBn = dish.nameBn?.includes(q);
        if (!matchName && !matchDesc && !matchBn) return false;
      }

      return true;
    });
  }, [activeCategory, selectedCuisine, selectedDiet, searchQuery]);

  const tabsData = MENU_CATEGORIES.map((cat) => ({
    id: cat.id,
    label: cat.name,
  }));

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <section className="bg-white dark:bg-ink-950 text-ink-950 dark:text-white py-16 sm:py-20 relative overflow-hidden text-center border-b border-ink-100 dark:border-white/10 transition-colors">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ label: "Culinary Menu" }]} />
          </div>
          <span className="font-serif italic text-brand-600 dark:text-brand-400 text-lg font-semibold block">
            ~ Curated by Master Chefs ~
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-ink-950 dark:text-white">
            THE ICCB CULINARY CATALOG
          </h1>
          <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 max-w-2xl mx-auto leading-relaxed">
            Every dish is prepared using fresh ingredients from our dedicated modern slaughterhouse and tested by our on-site quality assurance lab.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-8 bg-brand-50/40 border-b border-brand-100">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Top row: search + cuisine/diet pills */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search by dish name or ingredient..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-ink-200 bg-white text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
              <Search className="w-4 h-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Cuisine */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-ink-500 font-bold uppercase tracking-wider text-[10px]">Cuisine:</span>
                <select
                  value={selectedCuisine}
                  onChange={(e) => setSelectedCuisine(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-ink-200 bg-white text-ink-800 text-xs focus:outline-none focus:border-brand-500"
                >
                  {cuisines.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Diet */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-ink-500 font-bold uppercase tracking-wider text-[10px]">Diet:</span>
                <select
                  value={selectedDiet}
                  onChange={(e) => setSelectedDiet(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-ink-200 bg-white text-ink-800 text-xs focus:outline-none focus:border-brand-500"
                >
                  {dietOptions.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs
            tabs={tabsData}
            activeTab={activeCategory}
            onChange={setActiveCategory}
          />
        </div>
      </section>

      {/* Menu Cards Grid */}
      <section className="py-16 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {filteredDishes.length === 0 ? (
          <div className="p-16 text-center border-2 border-dashed border-ink-200 rounded-3xl max-w-md mx-auto space-y-4">
            <p className="text-ink-500 text-sm">No dishes matched your current search filters.</p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCuisine("All");
                setSelectedDiet("All");
                setActiveCategory("all");
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-3xl p-6 border border-ink-100 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Dish Image */}
                  <div className="relative h-52 rounded-2xl overflow-hidden mb-5 border border-ink-100">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      placeholder="blur"
                      blurDataURL={PLACEHOLDER_BLUR}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                      {dish.dietTags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-ink-950/80 text-white backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Category & Cuisine */}
                  <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-brand-600 mb-1">
                    <span>{dish.category}</span>
                    <span className="text-ink-400">{dish.cuisine}</span>
                  </div>

                  {/* Title & Bangla Subtitle */}
                  <Link href={`/menu/${dish.slug}`}>
                    <h3 className="font-display font-bold text-lg uppercase text-ink-950 group-hover:text-brand-600 transition-colors">
                      {dish.name}
                    </h3>
                  </Link>
                  {dish.nameBn && (
                    <p className="text-xs text-brand-600 font-medium mb-2">{dish.nameBn}</p>
                  )}

                  {/* Description */}
                  <p className="text-xs text-ink-600 leading-relaxed line-clamp-3 mb-4">
                    {dish.description}
                  </p>
                </div>

                {/* Footer / Price & Details Link */}
                <div className="pt-4 border-t border-ink-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-ink-400 uppercase tracking-wider block">Price</span>
                    <span className="font-display font-black text-xl text-ink-950">
                      {formatCurrency(dish.price)}
                    </span>
                  </div>
                  <Link href={`/menu/${dish.slug}`}>
                    <Button size="sm" variant="outline" withArrow>
                      Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="bg-white dark:bg-ink-950 text-ink-950 dark:text-white py-14 border-t border-ink-100 dark:border-ink-900 text-center transition-colors">
        <div className="max-w-xl mx-auto px-4 space-y-4">
          <h3 className="font-display font-black text-3xl uppercase text-ink-950 dark:text-white">
            Planning a Wedding or Banquet?
          </h3>
          <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300">
            Combine your favorite dishes into a comprehensive package with special per-head rates and dedicated table service.
          </p>
          <div className="pt-2">
            <Link href="/packages">
              <Button size="lg" withArrow variant="primary">
                Explore Banquet Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

