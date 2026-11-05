"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { leadService } from "@/services/leadService";
import { Lead, LeadStatus } from "@/types";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { SampleBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { toast } from "sonner";
import { ArrowLeft, Plus, CheckCircle2, Phone, Mail, MapPin, Calendar, Clock, FileText } from "lucide-react";

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [noteText, setNoteText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLead() {
      try {
        const id = params.id as string;
        const res = await leadService.getById(id);
        setLead(res);
      } catch (err) {
        toast.error("Lead not found");
      } finally {
        setLoading(false);
      }
    }
    fetchLead();
  }, [params.id]);

  if (loading) {
    return <div className="p-8 text-center text-xs text-ink-500">Loading lead details...</div>;
  }

  if (!lead) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-ink-600">Lead not found</p>
        <Link href="/dashboard/leads">
          <Button size="sm">Back to Leads</Button>
        </Link>
      </div>
    );
  }

  const handleStatusChange = async (newStatus: LeadStatus) => {
    try {
      const updated = await leadService.update(lead.id, {
        status: newStatus,
        activities: [
          ...(lead.activities || []),
          {
            id: "act-" + Date.now(),
            type: "status_change",
            description: `Status changed to ${newStatus}`,
            timestamp: new Date().toISOString(),
            user: "Admin",
          },
        ],
      });
      setLead(updated);
      toast.success(`Lead status updated to ${newStatus}`);
    } catch (e) {
      toast.error("Failed to update status");
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    try {
      const newNote = {
        id: "note-" + Date.now(),
        author: "Admin / Current User",
        text: noteText,
        createdAt: new Date().toISOString(),
      };
      const updated = await leadService.update(lead.id, {
        notes: [newNote, ...(lead.notes || [])],
      });
      setLead(updated);
      setNoteText("");
      toast.success("Note added to lead file.");
    } catch (e) {
      toast.error("Failed to add note");
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/leads"
            className="p-2 rounded-xl border border-ink-200 text-ink-600 hover:text-ink-950 hover:bg-ink-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-black text-2xl uppercase tracking-tight text-ink-950">
                {lead.name}
              </h1>
              <StatusBadge status={lead.status} />
              {lead.isSample && <SampleBadge />}
            </div>
            <p className="text-xs text-ink-400 mt-0.5">
              Lead ID: {lead.id} &bull; Created: {new Date(lead.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Status Changer */}
          <select
            value={lead.status}
            onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
            className="px-3 py-2 text-xs font-bold rounded-xl border border-ink-200 bg-white text-ink-900 focus:outline-none focus:border-brand-500"
          >
            <option value="New">Status: New</option>
            <option value="Contacted">Status: Contacted</option>
            <option value="Tasting">Status: Tasting</option>
            <option value="Quoted">Status: Quoted</option>
            <option value="Won">Status: Won</option>
            <option value="Lost">Status: Lost</option>
          </select>

          <Link href={`/dashboard/quotations/new?leadId=${lead.id}&name=${encodeURIComponent(lead.name)}&guests=${lead.guestCount}&date=${encodeURIComponent(lead.eventDate)}`}>
            <Button size="sm" variant="primary" withArrow>
              Convert to Quotation
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Grid: Details + Timeline/Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Details */}
        <div className="lg:col-span-7 space-y-6">
          {/* Info Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ink-100 shadow-soft space-y-6">
            <h3 className="font-display font-bold text-base uppercase tracking-wider text-ink-950 border-b border-ink-100 pb-3">
              Event & Client Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-ink-400 block">Phone</span>
                <a href={`tel:${lead.phone}`} className="font-bold text-ink-950 text-sm hover:underline">
                  {lead.phone}
                </a>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-ink-400 block">Email</span>
                <a href={`mailto:${lead.email}`} className="font-bold text-ink-950 text-sm hover:underline">
                  {lead.email}
                </a>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-ink-400 block">Event Type</span>
                <p className="font-bold text-ink-950 text-sm">{lead.eventType}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-ink-400 block">Target Date</span>
                <p className="font-bold text-brand-600 text-sm">{lead.eventDate}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-ink-400 block">Guest Count</span>
                <p className="font-bold text-ink-950 text-sm">{lead.guestCount} Attendees</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-ink-400 block">Proposed Venue</span>
                <p className="font-bold text-ink-950 text-sm">{lead.venue || "ICCB Premises"}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-ink-400 block">Cuisine Preference</span>
                <p className="font-semibold text-ink-800">{lead.cuisinePreference || "Mughal & Bengali"}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-ink-400 block">Budget Range</span>
                <p className="font-semibold text-ink-800">{lead.budgetRange || "Standard Package"}</p>
              </div>
            </div>

            {lead.message && (
              <div className="pt-4 border-t border-ink-100">
                <span className="text-[10px] uppercase font-bold text-ink-400 block mb-1">
                  Client Message / Special Dietary Notes:
                </span>
                <p className="p-4 bg-ink-50 rounded-2xl text-xs text-ink-700 italic leading-relaxed">
                  &ldquo;{lead.message}&rdquo;
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Internal Notes & Timeline */}
        <div className="lg:col-span-5 space-y-6">
          {/* Notes Box */}
          <div className="bg-white rounded-3xl p-6 border border-ink-100 shadow-soft space-y-4">
            <h3 className="font-display font-bold text-base uppercase tracking-wider text-ink-950 border-b border-ink-100 pb-3">
              Internal Banquet Notes
            </h3>

            <form onSubmit={handleAddNote} className="space-y-2">
              <Textarea
                placeholder="Log call summary, tasting feedback, or follow-up tasks..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={3}
              />
              <div className="flex justify-end">
                <Button size="sm" type="submit" variant="primary">
                  Add Note
                </Button>
              </div>
            </form>

            <div className="space-y-3 pt-2">
              {lead.notes && lead.notes.length > 0 ? (
                lead.notes.map((note) => (
                  <div key={note.id} className="p-3 rounded-xl bg-ink-50 border border-ink-100 text-xs text-ink-700 space-y-1">
                    <div className="flex justify-between text-[10px] text-ink-400">
                      <span className="font-bold text-ink-800">{note.author}</span>
                      <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="leading-relaxed">{note.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-ink-400 text-center py-2">No notes logged yet.</p>
              )}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-white rounded-3xl p-6 border border-ink-100 shadow-soft space-y-4">
            <h3 className="font-display font-bold text-base uppercase tracking-wider text-ink-950 border-b border-ink-100 pb-3">
              Activity History
            </h3>

            <div className="space-y-3 text-xs">
              {lead.activities && lead.activities.map((act) => (
                <div key={act.id} className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0 mt-1.5" />
                  <div>
                    <p className="font-semibold text-ink-900">{act.description}</p>
                    <span className="text-[10px] text-ink-400">
                      {new Date(act.timestamp).toLocaleString()} by {act.user}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

