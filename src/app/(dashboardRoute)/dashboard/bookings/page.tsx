"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { bookingService } from "@/services/bookingService";
import { Booking } from "@/types";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { SampleBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/format";
import { ConfirmDialog } from "@/components/dashboard/ConfirmDialog";
import { toast } from "sonner";
import { Calendar as CalendarIcon, List, Search, Trash2, Eye } from "lucide-react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await bookingService.list();
      setBookings(res);
    } catch (e) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await bookingService.delete(deleteId);
      setBookings(bookings.filter((b) => b.id !== deleteId));
      toast.success("Booking record removed.");
      setDeleteId(null);
    } catch (e) {
      toast.error("Failed to delete booking");
    }
  };

  const filtered = bookings.filter((b) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      b.clientName.toLowerCase().includes(q) ||
      b.bookingNumber.toLowerCase().includes(q) ||
      b.hallOrVenue.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-black text-2xl uppercase tracking-tight text-ink-950">
              HALL & CATERING BOOKINGS
            </h1>
            <SampleBadge />
          </div>
          <p className="text-xs text-ink-500 mt-1">
            Confirmed date reservations across ICCB Halls 1-4 and mobile off-premises catering.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              viewMode === "list" ? "bg-brand-500 text-white" : "bg-white border text-ink-600 hover:bg-ink-100"
            }`}
          >
            <List className="w-4 h-4" />
            <span>List</span>
          </button>
          <button
            onClick={() => setViewMode("calendar")}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              viewMode === "calendar" ? "bg-brand-500 text-white" : "bg-white border text-ink-600 hover:bg-ink-100"
            }`}
          >
            <CalendarIcon className="w-4 h-4" />
            <span>Calendar</span>
          </button>
        </div>
      </div>

      {/* Filter / Search */}
      <div className="bg-white p-4 rounded-2xl border border-ink-100 shadow-soft">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by client or hall..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-ink-200 bg-white text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          />
          <Search className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {viewMode === "list" ? (
        /* List View */
        <div className="bg-white rounded-3xl border border-ink-100 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-ink-50 border-b border-ink-100 text-[10px] font-bold uppercase tracking-wider text-ink-500">
                <tr>
                  <th className="py-3.5 px-4">Booking #</th>
                  <th className="py-3.5 px-4">Client / Organization</th>
                  <th className="py-3.5 px-4">Event Date</th>
                  <th className="py-3.5 px-4">Venue / Hall</th>
                  <th className="py-3.5 px-4">Guests</th>
                  <th className="py-3.5 px-4">Payment Status</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-brand-50/20 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-ink-950">
                      {b.bookingNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-ink-950 block">{b.clientName}</span>
                      <span className="text-[10px] text-ink-400">{b.email}</span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-brand-600">
                      {b.eventDate}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-ink-900 block">{b.hallOrVenue}</span>
                      <span className="text-[10px] text-ink-400">{b.eventType}</span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-ink-900">{b.guests}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-ink-900 block">{formatCurrency(b.totalAmount)}</span>
                      <span className="text-[10px] text-emerald-600 font-semibold">
                        Paid: {formatCurrency(b.paidAmount)}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setDeleteId(b.id)}
                        className="p-1.5 text-ink-400 hover:text-red-600 rounded hover:bg-red-50"
                        title="Delete booking"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Calendar Schedule Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-3xl p-6 border border-ink-200 shadow-soft space-y-4"
            >
              <div className="flex items-center justify-between border-b border-ink-100 pb-3">
                <span className="font-mono text-xs font-bold text-brand-600">{b.bookingNumber}</span>
                <StatusBadge status={b.status} />
              </div>

              <div>
                <span className="text-xl font-display font-black text-ink-950 block">
                  {b.eventDate}
                </span>
                <h4 className="font-display font-bold text-sm uppercase text-ink-950 mt-1">
                  {b.clientName}
                </h4>
                <p className="text-xs text-ink-500">{b.eventType}</p>
              </div>

              <div className="p-3 bg-ink-50 rounded-xl space-y-1 text-xs">
                <p className="font-bold text-ink-900">{b.hallOrVenue}</p>
                <p className="text-ink-600">{b.guests} Attendees guaranteed</p>
                <div className="flex justify-between font-bold text-ink-950 pt-1 border-t border-ink-200">
                  <span>Total Fee:</span>
                  <span>{formatCurrency(b.totalAmount)}</span>
                </div>
              </div>

              {b.notes && (
                <p className="text-[11px] text-ink-500 italic">&ldquo;{b.notes}&rdquo;</p>
              )}
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Remove Booking Record?"
        description="Are you sure you want to delete this booking entry?"
      />
    </div>
  );
}

