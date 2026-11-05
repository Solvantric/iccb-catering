"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { leadService } from "@/services/leadService";
import { Lead, LeadStatus } from "@/types";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { SampleBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { ArrowLeft, Users, ChevronRight, ChevronLeft, Plus } from "lucide-react";

const PIPELINE_COLUMNS: LeadStatus[] = [
  "New",
  "Contacted",
  "Tasting",
  "Quoted",
  "Won",
  "Lost",
];

export default function LeadsPipelinePage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
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

  const moveStatus = async (leadId: string, targetStatus: LeadStatus) => {
    try {
      const updated = await leadService.update(leadId, { status: targetStatus });
      setLeads((prev) => prev.map((l) => (l.id === leadId ? updated : l)));
      toast.success(`Moved lead to ${targetStatus}`);
    } catch (e) {
      toast.error("Failed to move status");
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Header */}
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
                KANBAN STATUS PIPELINE
              </h1>
              <SampleBadge />
            </div>
            <p className="text-xs text-ink-500 mt-0.5">
              Visual pipeline management from incoming lead to final contract.
            </p>
          </div>
        </div>

        <Link href="/dashboard/leads">
          <Button size="sm" variant="outline">
            Table View
          </Button>
        </Link>
      </div>

      {/* Kanban Board Container */}
      <div className="flex gap-4 overflow-x-auto pb-6 pt-2 custom-scrollbar">
        {PIPELINE_COLUMNS.map((colStatus) => {
          const colLeads = leads.filter((l) => l.status === colStatus);

          return (
            <div
              key={colStatus}
              className="w-80 shrink-0 bg-ink-100/60 rounded-3xl p-4 flex flex-col max-h-[75vh]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-ink-200">
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-xs uppercase tracking-wider text-ink-900">
                    {colStatus}
                  </span>
                  <span className="w-5 h-5 rounded-full bg-white text-ink-700 font-bold text-[10px] flex items-center justify-center shadow-xs">
                    {colLeads.length}
                  </span>
                </div>
              </div>

              {/* Cards Column */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {colLeads.map((lead) => {
                  const currentIndex = PIPELINE_COLUMNS.indexOf(lead.status);
                  const canMoveLeft = currentIndex > 0;
                  const canMoveRight = currentIndex < PIPELINE_COLUMNS.length - 1;

                  return (
                    <div
                      key={lead.id}
                      className="bg-white rounded-2xl p-4 border border-ink-200 shadow-soft hover:shadow-card transition-all space-y-2.5 text-left"
                    >
                      <div className="flex items-start justify-between">
                        <Link
                          href={`/dashboard/leads/${lead.id}`}
                          className="font-display font-bold text-sm uppercase text-ink-950 hover:text-brand-600 transition-colors"
                        >
                          {lead.name}
                        </Link>
                        {lead.isSample && <SampleBadge />}
                      </div>

                      <div className="space-y-1 text-xs text-ink-600">
                        <p className="font-medium text-ink-900">{lead.eventType}</p>
                        <p className="text-[11px] text-ink-500">{lead.venue || "ICCB Premises"}</p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] pt-2 border-t border-ink-100">
                        <span className="font-bold text-brand-600">{lead.eventDate}</span>
                        <span className="text-ink-500">{lead.guestCount} Guests</span>
                      </div>

                      {/* Quick Move Shift Arrows */}
                      <div className="flex items-center justify-between pt-2 border-t border-ink-100 text-[10px]">
                        <button
                          disabled={!canMoveLeft}
                          onClick={() => moveStatus(lead.id, PIPELINE_COLUMNS[currentIndex - 1])}
                          className="p-1 rounded hover:bg-ink-100 text-ink-500 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-0.5"
                          title="Move to previous status"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          <span>Prev</span>
                        </button>

                        <button
                          disabled={!canMoveRight}
                          onClick={() => moveStatus(lead.id, PIPELINE_COLUMNS[currentIndex + 1])}
                          className="p-1 rounded hover:bg-ink-100 text-brand-600 font-bold disabled:opacity-30 disabled:pointer-events-none flex items-center gap-0.5"
                          title="Move to next status"
                        >
                          <span>Next</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {colLeads.length === 0 && (
                  <div className="py-8 text-center text-[11px] text-ink-400 border border-dashed border-ink-200 rounded-2xl">
                    No leads in {colStatus}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

