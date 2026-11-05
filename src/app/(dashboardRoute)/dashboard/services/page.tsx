"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SERVICES } from "@/data/services";
import { ServiceItem } from "@/types";
import { SampleBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/dashboard/ConfirmDialog";
import { toast } from "sonner";
import { Plus, Trash2, Eye, CheckCircle2 } from "lucide-react";

export default function DashboardServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>(SERVICES);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (!deleteId) return;
    setServices(services.filter((s) => s.id !== deleteId));
    toast.success("Service removed.");
    setDeleteId(null);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-black text-2xl uppercase tracking-tight text-ink-950">
              CATERING SERVICES MANAGEMENT
            </h1>
            <SampleBadge />
          </div>
          <p className="text-xs text-ink-500 mt-1">
            Manage public hospitality offerings, feature bullet points, and dynamic service pages.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="bg-white rounded-3xl p-6 border border-ink-100 shadow-soft flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
                  Service Category
                </span>
                <span className="text-xs text-ink-400">/{srv.slug}</span>
              </div>

              <h3 className="font-display font-bold text-xl uppercase text-ink-950 mt-2">
                {srv.title}
              </h3>
              <p className="text-xs text-ink-600 mt-2 leading-relaxed">
                {srv.shortDesc}
              </p>

              <div className="space-y-1.5 pt-3 border-t border-ink-100 text-xs text-ink-700">
                {srv.features.slice(0, 3).map((f, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-ink-100 flex items-center justify-between">
              <Link href={`/services/${srv.slug}`} target="_blank">
                <Button size="sm" variant="outline">
                  Preview Public Page &rarr;
                </Button>
              </Link>
              <button
                onClick={() => setDeleteId(srv.id)}
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
        title="Delete Catering Service?"
        description="Are you sure you want to delete this service offering?"
      />
    </div>
  );
}

