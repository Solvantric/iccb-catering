"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { leadService } from "@/services/leadService";
import { Lead, LeadStatus } from "@/types";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { SampleBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ConfirmDialog } from "@/components/dashboard/ConfirmDialog";
import { toast } from "sonner";
import { Search, Filter, Download, Plus, Trash2, ArrowUpDown, Eye } from "lucide-react";

const statuses: (LeadStatus | "All")[] = [
  "All",
  "New",
  "Contacted",
  "Tasting",
  "Quoted",
  "Won",
  "Lost",
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "All">("All");
  const [search, setSearch] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await leadService.list();
      setLeads(res);
    } catch (e) {
      toast.error("Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await leadService.delete(deleteTargetId);
      setLeads(leads.filter((l) => l.id !== deleteTargetId));
      toast.success("Lead record deleted successfully.");
      setDeleteTargetId(null);
    } catch (e) {
      toast.error("Failed to delete lead");
    }
  };

  const filteredLeads = leads.filter((l) => {
    if (statusFilter !== "All" && l.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.phone.includes(q) ||
        (l.venue && l.venue.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const exportCSV = () => {
    const headers = "ID,Name,Email,Phone,Event,Guests,Date,Status\n";
    const rows = filteredLeads
      .map(
        (l) =>
          `"${l.id}","${l.name}","${l.email}","${l.phone}","${l.eventType}","${l.guestCount}","${l.eventDate}","${l.status}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `iccb_leads_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Exported leads to CSV");
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-black text-2xl uppercase tracking-tight text-ink-950">
              LEAD & INQUIRY PIPELINE
            </h1>
            <SampleBadge />
          </div>
          <p className="text-xs text-ink-500 mt-1">
            Track inquiries from initial contact to food tasting, quotation, and contract signing.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link href="/dashboard/leads/pipeline">
            <Button size="sm" variant="outline">
              Kanban View
            </Button>
          </Link>
          <Button size="sm" variant="outline" onClick={exportCSV}>
            <Download className="w-3.5 h-3.5 mr-1" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-ink-100 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search leads by name, email, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-ink-200 bg-white text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          />
          <Search className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                statusFilter === st
                  ? "bg-brand-500 text-white shadow-sm"
                  : "bg-ink-100 text-ink-600 hover:bg-ink-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-ink-100 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-ink-50 border-b border-ink-100 text-[10px] font-bold uppercase tracking-wider text-ink-500">
              <tr>
                <th className="py-3.5 px-4">Lead / Client</th>
                <th className="py-3.5 px-4">Event & Proposed Venue</th>
                <th className="py-3.5 px-4">Guests</th>
                <th className="py-3.5 px-4">Target Date</th>
                <th className="py-3.5 px-4">Assignee</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-brand-50/20 transition-colors">
                  <td className="py-3.5 px-4">
                    <Link
                      href={`/dashboard/leads/${lead.id}`}
                      className="font-bold text-ink-950 hover:text-brand-600 transition-colors block text-sm"
                    >
                      {lead.name}
                    </Link>
                    <span className="text-[11px] text-ink-400 block">{lead.email}</span>
                    <span className="text-[11px] text-ink-400">{lead.phone}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-ink-900 block">{lead.eventType}</span>
                    <span className="text-[11px] text-ink-500 truncate block max-w-xs">{lead.venue}</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-ink-900">{lead.guestCount}</td>
                  <td className="py-3.5 px-4 font-bold text-brand-600">{lead.eventDate}</td>
                  <td className="py-3.5 px-4 text-ink-600">{lead.assignee || "Unassigned"}</td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/dashboard/leads/${lead.id}`}
                        className="p-1.5 text-ink-500 hover:text-brand-600 rounded hover:bg-ink-100"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteTargetId(lead.id)}
                        className="p-1.5 text-ink-400 hover:text-red-600 rounded hover:bg-red-50"
                        title="Delete lead"
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

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleDelete}
        title="Delete Lead Record?"
        description="Are you sure you want to permanently delete this lead? This action cannot be undone."
      />
    </div>
  );
}
