"use client";

import React, { useState, useEffect } from "react";
import { Subscriber } from "@/types";
import { SampleBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { Download, Trash2, Mail } from "lucide-react";

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([
    {
      id: "sub-1",
      email: "corporate.events@grameenphone.com",
      source: "Home Newsletter Banner",
      subscribedAt: "2026-11-04T09:12:00Z",
      status: "active",
      isSample: true,
    },
    {
      id: "sub-2",
      email: "weddingplanner.dhaka@gmail.com",
      source: "Menu PDF Download Gate",
      subscribedAt: "2026-11-02T14:30:00Z",
      status: "active",
      isSample: true,
    },
    {
      id: "sub-3",
      email: "hr.hospitality@beximco.net",
      source: "Home Newsletter Banner",
      subscribedAt: "2026-10-28T11:00:00Z",
      status: "active",
      isSample: true,
    },
  ]);

  useEffect(() => {
    try {
      const local = localStorage.getItem("iccb_mock_subscribers");
      if (local) {
        const parsed = JSON.parse(local);
        if (parsed.length > 0) setSubscribers(parsed);
      }
    } catch (e) {
      // Ignore
    }
  }, []);

  const exportCSV = () => {
    const headers = "ID,Email,Source,SubscribedAt,Status\n";
    const rows = subscribers
      .map((s) => `"${s.id}","${s.email}","${s.source}","${s.subscribedAt}","${s.status}"`)
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `iccb_newsletter_subscribers.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Subscribers list exported.");
  };

  const handleDelete = (id: string) => {
    setSubscribers(subscribers.filter((s) => s.id !== id));
    toast.success("Subscriber removed.");
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-black text-2xl uppercase tracking-tight text-ink-950">
              NEWSLETTER SUBSCRIBERS
            </h1>
            <SampleBadge />
          </div>
          <p className="text-xs text-ink-500 mt-1">
            Subscribers captured from public newsletter forms and PDF sample menu downloads.
          </p>
        </div>

        <Button size="sm" variant="outline" onClick={exportCSV}>
          <Download className="w-3.5 h-3.5 mr-1.5" />
          Export Subscribers CSV
        </Button>
      </div>

      <div className="bg-white rounded-3xl border border-ink-100 shadow-soft overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-ink-50 border-b border-ink-100 text-[10px] font-bold uppercase tracking-wider text-ink-500">
            <tr>
              <th className="py-3.5 px-4">Subscriber Email</th>
              <th className="py-3.5 px-4">Acquisition Source</th>
              <th className="py-3.5 px-4">Subscribed Date</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {subscribers.map((sub) => (
              <tr key={sub.id} className="hover:bg-brand-50/20 transition-colors">
                <td className="py-3.5 px-4 font-bold text-ink-950">{sub.email}</td>
                <td className="py-3.5 px-4 text-ink-600">{sub.source}</td>
                <td className="py-3.5 px-4 text-ink-500">
                  {new Date(sub.subscribedAt).toLocaleDateString()}
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {sub.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => handleDelete(sub.id)}
                    className="p-1.5 text-ink-400 hover:text-red-600 rounded"
                    title="Remove subscriber"
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
  );
}
