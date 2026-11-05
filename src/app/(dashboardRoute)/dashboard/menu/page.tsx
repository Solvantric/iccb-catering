"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { menuService } from "@/services/menuService";
import { MenuItem } from "@/types";
import { SampleBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/format";
import { ConfirmDialog } from "@/components/dashboard/ConfirmDialog";
import { toast } from "sonner";
import { Plus, Search, Edit, Trash2, CheckCircle2, XCircle, Sparkles } from "lucide-react";

export default function DashboardMenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const res = await menuService.list();
      setItems(res);
    } catch (e) {
      toast.error("Failed to load menu items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await menuService.delete(deleteTargetId);
      setItems(items.filter((i) => i.id !== deleteTargetId));
      toast.success("Dish removed from menu.");
      setDeleteTargetId(null);
    } catch (e) {
      toast.error("Failed to delete dish");
    }
  };

  const toggleTodaysMenu = async (item: MenuItem) => {
    try {
      const updated = await menuService.update(item.id, {
        isTodaysMenu: !item.isTodaysMenu,
      });
      setItems(items.map((i) => (i.id === item.id ? updated : i)));
      toast.success(
        updated.isTodaysMenu
          ? `Added "${item.name}" to Today's Special Menu on Home Page`
          : `Removed "${item.name}" from Today's Special Menu`
      );
    } catch (e) {
      toast.error("Failed to toggle Today's Menu");
    }
  };

  const filtered = items.filter((item) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.cuisine.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-black text-2xl uppercase tracking-tight text-ink-950">
              MENU & DISH CATALOG
            </h1>
            <SampleBadge />
          </div>
          <p className="text-xs text-ink-500 mt-1">
            Manage culinary recipes, prices, diet certifications, and toggle &ldquo;Today&apos;s Special Menu&rdquo;.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link href="/dashboard/menu/categories">
            <Button size="sm" variant="outline">
              Manage Categories
            </Button>
          </Link>
          <Link href="/dashboard/menu/new">
            <Button size="sm" variant="primary" withArrow>
              <Plus className="w-4 h-4 mr-1" />
              Add New Dish
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-ink-100 shadow-soft">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search dish by name, cuisine, category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-ink-200 bg-white text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          />
          <Search className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-ink-100 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-ink-50 border-b border-ink-100 text-[10px] font-bold uppercase tracking-wider text-ink-500">
              <tr>
                <th className="py-3.5 px-4">Dish</th>
                <th className="py-3.5 px-4">Category & Cuisine</th>
                <th className="py-3.5 px-4">Price (BDT)</th>
                <th className="py-3.5 px-4">Today&apos;s Menu</th>
                <th className="py-3.5 px-4">Availability</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-brand-50/20 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-ink-200">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="font-bold text-ink-950 block text-sm">{item.name}</span>
                        {item.nameBn && (
                          <span className="text-[11px] text-brand-600 block">{item.nameBn}</span>
                        )}
                        <span className="text-[10px] text-ink-400">
                          {item.dietTags.join(", ")}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-ink-900 block">{item.category}</span>
                    <span className="text-[10px] text-ink-500">{item.cuisine}</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-sm text-ink-950">
                    {formatCurrency(item.price)}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => toggleTodaysMenu(item)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1 ${
                        item.isTodaysMenu
                          ? "bg-brand-500 text-white shadow-sm"
                          : "bg-ink-100 text-ink-500 hover:bg-ink-200"
                      }`}
                      title="Click to toggle display on Home Page Today's Menu"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{item.isTodaysMenu ? "Active" : "Off"}</span>
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    {item.isAvailable ? (
                      <span className="text-emerald-600 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>In Stock</span>
                      </span>
                    ) : (
                      <span className="text-ink-400 flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Unavailable</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/dashboard/menu/${item.id}/edit`}
                        className="p-1.5 text-ink-500 hover:text-brand-600 rounded hover:bg-ink-100"
                        title="Edit dish"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteTargetId(item.id)}
                        className="p-1.5 text-ink-400 hover:text-red-600 rounded hover:bg-red-50"
                        title="Delete dish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleDelete}
        title="Delete Menu Dish?"
        description="Are you sure you want to permanently remove this dish from the catalog?"
      />
    </div>
  );
}

