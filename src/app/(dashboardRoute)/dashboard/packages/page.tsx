"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PACKAGES } from "@/data/packages";
import { Package } from "@/types";
import { SampleBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/format";
import { ConfirmDialog } from "@/components/dashboard/ConfirmDialog";
import { toast } from "sonner";
import { Plus, Trash2, Edit, CheckCircle2 } from "lucide-react";

export default function DashboardPackagesPage() {
  const [packages, setPackages] = useState<Package[]>(PACKAGES);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (!deleteId) return;
    setPackages(packages.filter((p) => p.id !== deleteId));
    toast.success("Package deleted.");
    setDeleteId(null);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-black text-2xl uppercase tracking-tight text-ink-950">
              BANQUET PACKAGES & PRICING
            </h1>
            <SampleBadge />
          </div>
          <p className="text-xs text-ink-500 mt-1">
            Configure preset per-person banquet menus, minimum guest thresholds, and included courses.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-3xl p-6 border border-ink-100 shadow-soft flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
                  {pkg.tag || "Banquet Package"}
                </span>
                <span className="text-xs text-ink-400">Min. {pkg.minGuests} guests</span>
              </div>
              <h3 className="font-display font-bold text-xl uppercase text-ink-950 mt-2">
                {pkg.name}
              </h3>
              <p className="font-display font-black text-2xl text-brand-600 mt-1">
                {formatCurrency(pkg.pricePerHead)}{" "}
                <span className="text-xs font-normal text-ink-500 font-sans">/ head</span>
              </p>
              <p className="text-xs text-ink-600 mt-2 leading-relaxed">{pkg.description}</p>
            </div>

            <div className="space-y-1.5 pt-3 border-t border-ink-100 text-xs text-ink-700">
              <span className="text-[10px] font-bold uppercase text-ink-400 block mb-1">
                Courses Included:
              </span>
              {pkg.courses.map((c, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 mt-1.5" />
                  <span><strong>{c.name}:</strong> {c.items.slice(0, 2).join(", ")}...</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-ink-100 flex items-center justify-between">
              <Link href={`/packages/${pkg.slug}`} target="_blank">
                <Button size="sm" variant="outline">
                  Preview Public View &rarr;
                </Button>
              </Link>
              <button
                onClick={() => setDeleteId(pkg.id)}
                className="p-1.5 text-ink-400 hover:text-red-600 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Banquet Package?"
        description="Are you sure you want to delete this menu package?"
      />
    </div>
  );
}

