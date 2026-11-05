"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { SampleBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { leadService } from "@/services/leadService";
import { quotationService } from "@/services/quotationService";
import { bookingService } from "@/services/bookingService";
import { Lead, Quotation, Booking } from "@/types";
import { formatCurrency, formatLongDate } from "@/lib/format";
import {
  Users,
  FileText,
  CalendarCheck,
  TrendingUp,
  Plus,
  ArrowRight,
  Utensils,
  Clock,
  Sparkles,
} from "lucide-react";

export default function DashboardOverviewPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [l, q, b] = await Promise.all([
          leadService.list(),
          quotationService.list(),
          bookingService.list(),
        ]);
        setLeads(l);
        setQuotations(q);
        setBookings(b);
      } catch (e) {
        // Handled
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalRevenue = bookings.reduce((acc, b) => acc + (b.totalAmount || 0), 0);
  const conversionRate = leads.length > 0 ? Math.round((bookings.length / leads.length) * 100) : 0;

  return (
    <div className="space-y-8 text-left">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-ink-950">
              BANQUET OPERATIONS DASHBOARD
            </h1>
            <SampleBadge />
          </div>
          <p className="text-xs text-ink-500 mt-1">
            Real-time pipeline overview for ICCB Catering & 4 convention halls.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link href="/dashboard/leads">
            <Button size="sm" variant="outline">
              View Leads Pipeline
            </Button>
          </Link>
          <Link href="/dashboard/quotations/new">
            <Button size="sm" variant="primary" withArrow>
              <Plus className="w-4 h-4 mr-1" />
              Build Quotation
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Client Leads"
          value={leads.length}
          change="+18% vs last month"
          isPositive={true}
          icon={<Users className="w-5 h-5" />}
          subtitle="Wedding & Corporate"
        />
        <StatCard
          title="Issued Quotations"
          value={quotations.length}
          change="+12% this week"
          isPositive={true}
          icon={<FileText className="w-5 h-5" />}
          subtitle="Avg value ৳1.2M"
        />
        <StatCard
          title="Confirmed Bookings"
          value={bookings.length}
          change="+24% peak season"
          isPositive={true}
          icon={<CalendarCheck className="w-5 h-5" />}
          subtitle="Total ৳3.2M book value"
        />
        <StatCard
          title="Inquiry Conversion Rate"
          value={`${conversionRate}%`}
          change="+4.2% efficiency"
          isPositive={true}
          icon={<TrendingUp className="w-5 h-5" />}
          subtitle="Tasting to Contract"
        />
      </div>

      {/* Main Grid: Pipeline Breakdown & Recent Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recent Leads Table */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-ink-100 shadow-soft space-y-6">
          <div className="flex items-center justify-between border-b border-ink-100 pb-4">
            <div>
              <h3 className="font-display font-bold text-lg uppercase tracking-wider text-ink-950">
                Recent Leads & Tasting Inquiries
              </h3>
              <p className="text-xs text-ink-500">Live incoming submissions from online quote builders</p>
            </div>
            <Link
              href="/dashboard/leads"
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
            >
              <span>View All Leads</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-ink-100 text-[10px] font-bold uppercase tracking-wider text-ink-400">
                  <th className="py-3 px-2">Client</th>
                  <th className="py-3 px-2">Event & Hall</th>
                  <th className="py-3 px-2">Date & Guests</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {leads.slice(0, 5).map((lead) => (
                  <tr key={lead.id} className="hover:bg-brand-50/30 transition-colors">
                    <td className="py-3.5 px-2">
                      <div className="font-bold text-ink-950">{lead.name}</div>
                      <div className="text-[10px] text-ink-400">{lead.phone}</div>
                    </td>
                    <td className="py-3.5 px-2">
                      <div className="font-medium text-ink-800">{lead.eventType}</div>
                      <div className="text-[10px] text-ink-400 truncate max-w-[140px]">{lead.venue}</div>
                    </td>
                    <td className="py-3.5 px-2">
                      <div className="font-semibold text-brand-600">{lead.eventDate}</div>
                      <div className="text-[10px] text-ink-500">{lead.guestCount} Guests</div>
                    </td>
                    <td className="py-3.5 px-2">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="py-3.5 px-2 text-right">
                      <Link
                        href={`/dashboard/leads/${lead.id}`}
                        className="text-brand-600 hover:text-brand-700 font-bold hover:underline"
                      >
                        Details &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Upcoming Events & Quick System Status */}
        <div className="lg:col-span-4 space-y-6">
          {/* Upcoming Event Banquets */}
          <div className="bg-white rounded-3xl p-6 border border-ink-100 shadow-soft space-y-4">
            <div className="flex items-center justify-between border-b border-ink-100 pb-3">
              <h3 className="font-display font-bold text-base uppercase tracking-wider text-ink-950">
                Upcoming Hall Events
              </h3>
              <Link href="/dashboard/bookings" className="text-[10px] font-bold text-brand-600 hover:underline">
                Calendar &rarr;
              </Link>
            </div>

            <div className="space-y-3">
              {bookings.slice(0, 3).map((bkg) => (
                <div
                  key={bkg.id}
                  className="p-3.5 rounded-2xl bg-ink-50/70 border border-ink-200/80 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-ink-950">{bkg.clientName}</span>
                    <span className="text-[10px] font-bold text-brand-600">{bkg.eventDate}</span>
                  </div>
                  <p className="text-[11px] text-ink-500">{bkg.eventType} &bull; {bkg.hallOrVenue}</p>
                  <div className="flex items-center justify-between text-[10px] pt-1 border-t border-ink-200/50">
                    <span className="text-ink-500">{bkg.guests} Guests</span>
                    <span className="font-bold text-emerald-600">{formatCurrency(bkg.totalAmount)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action Shortcuts */}
          <div className="bg-ink-950 text-white rounded-3xl p-6 border border-ink-900 shadow-dark space-y-4">
            <h3 className="font-display font-bold text-base uppercase tracking-wider text-white">
              Catering Operations Hub
            </h3>
            <p className="text-xs text-ink-300 leading-relaxed">
              Manage menu dishes, update prices, and export audit compliance logs.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                href="/dashboard/menu/new"
                className="p-3 rounded-xl bg-ink-900 border border-ink-800 hover:bg-brand-500 text-center transition-colors"
              >
                <Utensils className="w-4 h-4 mx-auto mb-1 text-brand-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider block">Add Dish</span>
              </Link>
              <Link
                href="/dashboard/leads/pipeline"
                className="p-3 rounded-xl bg-ink-900 border border-ink-800 hover:bg-brand-500 text-center transition-colors"
              >
                <TrendingUp className="w-4 h-4 mx-auto mb-1 text-brand-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider block">Kanban</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
