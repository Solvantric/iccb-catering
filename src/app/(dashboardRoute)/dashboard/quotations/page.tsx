"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { quotationService } from "@/services/quotationService";
import { Quotation } from "@/types";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { SampleBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency, formatLongDate } from "@/lib/format";
import { ConfirmDialog } from "@/components/dashboard/ConfirmDialog";
import { toast } from "sonner";
import { Plus, Search, Eye, Trash2, Printer, FileText } from "lucide-react";

export default function QuotationsPage() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const fetchQuotations = async () => {
    try {
      setLoading(true);
      const res = await quotationService.list();
      setQuotations(res);
    } catch (e) {
      toast.error("Failed to load quotations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await quotationService.delete(deleteTargetId);
      setQuotations(quotations.filter((q) => q.id !== deleteTargetId));
      toast.success("Quotation deleted successfully.");
      setDeleteTargetId(null);
    } catch (e) {
      toast.error("Failed to delete quotation");
    }
  };

  const filtered = quotations.filter((q) => {
    if (search.trim()) {
      const s = search.toLowerCase();
      return (
        q.clientName.toLowerCase().includes(s) ||
        q.quotationNumber.toLowerCase().includes(s) ||
        q.eventType.toLowerCase().includes(s)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-black text-2xl uppercase tracking-tight text-ink-950">
              BANQUET QUOTATIONS
            </h1>
            <SampleBadge />
          </div>
          <p className="text-xs text-ink-500 mt-1">
            Build and issue itemized quotations for weddings, corporate summits, and social banquets.
          </p>
        </div>

        <Link href="/dashboard/quotations/new">
          <Button size="sm" variant="primary" withArrow>
            <Plus className="w-4 h-4 mr-1" />
            Create New Quotation
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl border border-ink-100 shadow-soft">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by client name, quote number..."
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
                <th className="py-3.5 px-4">Quote #</th>
                <th className="py-3.5 px-4">Client</th>
                <th className="py-3.5 px-4">Event & Date</th>
                <th className="py-3.5 px-4">Package & Guests</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {filtered.map((quot) => (
                <tr key={quot.id} className="hover:bg-brand-50/20 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-ink-950 block">{quot.quotationNumber}</span>
                    <span className="text-[10px] text-ink-400">v{quot.version}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-ink-950 block">{quot.clientName}</span>
                    <span className="text-[10px] text-ink-400">{quot.clientPhone}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-ink-900 block">{quot.eventType}</span>
                    <span className="text-[10px] text-brand-600 font-bold">{quot.eventDate}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-ink-900 block">{quot.packageName}</span>
                    <span className="text-[10px] text-ink-500">{quot.guestCount} Guests</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-sm text-ink-950">
                    {formatCurrency(quot.total)}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={quot.status} />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/dashboard/quotations/${quot.id}`}
                        className="p-1.5 text-ink-500 hover:text-brand-600 rounded hover:bg-ink-100"
                        title="Print / View Quotation"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteTargetId(quot.id)}
                        className="p-1.5 text-ink-400 hover:text-red-600 rounded hover:bg-red-50"
                        title="Delete quotation"
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
        title="Delete Quotation?"
        description="Are you sure you want to delete this quotation record?"
      />
    </div>
  );
}

