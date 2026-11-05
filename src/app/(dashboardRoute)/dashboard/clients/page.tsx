"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { SampleBadge } from "@/components/ui/Badge";
import { ConfirmDialog } from "@/components/dashboard/ConfirmDialog";
import { Plus, Building2, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface ClientLogo {
  id: string;
  name: string;
  category: "Telecom & Tech" | "FMCG" | "Banking & Finance" | "Conglomerate" | "NGO & Diplomatic";
  logoText: string;
  eventsCount: number;
  status: "Active" | "Hidden";
  isSample: boolean;
}

const INITIAL_CLIENTS: ClientLogo[] = [
  { id: "cl-1", name: "Bashundhara Group", category: "Conglomerate", logoText: "BASHUNDHARA", eventsCount: 42, status: "Active", isSample: false },
  { id: "cl-2", name: "Grameenphone Ltd", category: "Telecom & Tech", logoText: "grameenphone", eventsCount: 18, status: "Active", isSample: true },
  { id: "cl-3", name: "Beximco Pharmaceuticals", category: "Conglomerate", logoText: "BEXIMCO", eventsCount: 14, status: "Active", isSample: true },
  { id: "cl-4", name: "BRAC Bangladesh", category: "NGO & Diplomatic", logoText: "brac", eventsCount: 22, status: "Active", isSample: true },
  { id: "cl-5", name: "Standard Chartered", category: "Banking & Finance", logoText: "Standard Chartered", eventsCount: 11, status: "Active", isSample: true },
  { id: "cl-6", name: "Unilever Bangladesh", category: "FMCG", logoText: "Unilever", eventsCount: 16, status: "Active", isSample: true },
  { id: "cl-7", name: "Robi Axiata", category: "Telecom & Tech", logoText: "robi", eventsCount: 12, status: "Active", isSample: true },
  { id: "cl-8", name: "Summit Power International", category: "Conglomerate", logoText: "SUMMIT", eventsCount: 9, status: "Active", isSample: true },
];

export default function ClientsManagementPage() {
  const [clients, setClients] = useState<ClientLogo[]>(INITIAL_CLIENTS);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ClientLogo | null>(null);

  const [form, setForm] = useState({
    name: "",
    category: "Conglomerate" as ClientLogo["category"],
    logoText: "",
    eventsCount: 1,
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return;

    const newClient: ClientLogo = {
      id: "cl-" + Date.now(),
      name: form.name,
      category: form.category,
      logoText: form.logoText || form.name.toUpperCase(),
      eventsCount: Number(form.eventsCount) || 1,
      status: "Active",
      isSample: true,
    };

    setClients([...clients, newClient]);
    setForm({ name: "", category: "Conglomerate", logoText: "", eventsCount: 1 });
    setIsAdding(false);
    toast.success(`Client "${newClient.name}" added`);
  };

  const toggleStatus = (id: string) => {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: c.status === "Active" ? "Hidden" : "Active" } : c))
    );
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setClients((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    toast.success("Client removed");
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold font-display tracking-tight text-ink-950">
              CLIENTS & CORPORATE PARTNERS
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-600 font-semibold border border-brand-100">
              {clients.length} Organizations
            </span>
          </div>
          <p className="text-sm text-ink-600 mt-1">
            Corporate logos displayed on home, about, and corporate catering pages
          </p>
        </div>

        <Button
          onClick={() => setIsAdding(!isAdding)}
          size="sm"
          className="gap-1.5 bg-brand-500 hover:bg-brand-600 text-white"
        >
          <Plus className="w-4 h-4" />
          {isAdding ? "Cancel" : "Add Partner"}
        </Button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl border border-brand-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-ink-950">New Corporate Partner</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Company Name *</label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Apex Footwear"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Industry Sector</label>
              <Select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                options={[
                  { value: "Conglomerate", label: "Conglomerate" },
                  { value: "Telecom & Tech", label: "Telecom & Tech" },
                  { value: "Banking & Finance", label: "Banking & Finance" },
                  { value: "FMCG", label: "FMCG" },
                  { value: "NGO & Diplomatic", label: "NGO & Diplomatic" },
                ]}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Catered Events Count</label>
              <Input
                type="number"
                value={form.eventsCount}
                onChange={(e) => setForm({ ...form, eventsCount: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm" className="bg-brand-500 hover:bg-brand-600 text-white">
              Save Partner
            </Button>
          </div>
        </form>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {clients.map((c) => (
          <div
            key={c.id}
            className={`p-5 rounded-xl border transition-all flex flex-col justify-between ${
              c.status === "Active"
                ? "bg-white border-ink-100 shadow-sm hover:border-brand-300"
                : "bg-ink-50/60 border-dashed border-ink-200 opacity-60"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-ink-100 text-ink-600">
                  {c.category}
                </span>
                {c.isSample && <SampleBadge />}
              </div>

              {/* Logo Card Preview */}
              <div className="h-20 rounded-lg bg-ink-50 border border-ink-100 flex items-center justify-center p-3 text-center mb-3">
                <span className="font-display font-extrabold text-base tracking-wider text-ink-700 uppercase">
                  {c.logoText}
                </span>
              </div>

              <h4 className="font-bold text-sm text-ink-950">{c.name}</h4>
              <p className="text-xs text-ink-500 mt-0.5">{c.eventsCount} Events Catered</p>
            </div>

            <div className="pt-3 mt-3 border-t border-ink-100 flex items-center justify-between">
              <button
                onClick={() => toggleStatus(c.id)}
                className="text-xs flex items-center gap-1 text-ink-500 hover:text-ink-950 font-medium"
              >
                {c.status === "Active" ? (
                  <>
                    <Eye className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Active</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5 text-ink-400" />
                    <span>Hidden</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setDeleteTarget(c)}
                className="p-1 text-ink-400 hover:text-red-600 rounded transition-colors"
                title="Remove client"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Remove Corporate Partner"
        message={`Are you sure you want to remove "${deleteTarget?.name}"?`}
        confirmText="Remove"
        confirmVariant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
