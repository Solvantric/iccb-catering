"use client";

import React, { useState, useEffect } from "react";
import { ContactMessage } from "@/types";
import { SampleBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { Mail, Phone, Trash2, CheckCircle2 } from "lucide-react";

export default function ContactsPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([
    {
      id: "msg-1",
      name: "Tanvir Ahmed",
      email: "tanvir.ahmed@sc.com",
      phone: "+8801711223344",
      subject: "Annual Gala Dinner Buffet Consultation",
      message: "We would like to book a tasting for 4 corporate committee members for our upcoming annual dinner in Hall 1.",
      createdAt: "2026-11-04T10:00:00Z",
      status: "unread",
      isSample: true,
    },
    {
      id: "msg-2",
      name: "Sadia Islam",
      email: "sadia.islam@gmail.com",
      phone: "+8801911998877",
      subject: "Wedding Tasting Appointment Request",
      message: "Please let us know if we can visit this Friday at 3:00 PM for the Shahi Kacchi Biryani tasting.",
      createdAt: "2026-11-03T15:20:00Z",
      status: "read",
      isSample: true,
    },
  ]);

  const markRead = (id: string) => {
    setMessages(
      messages.map((m) => (m.id === id ? { ...m, status: "read" as const } : m))
    );
    toast.success("Message marked as read.");
  };

  const deleteMsg = (id: string) => {
    setMessages(messages.filter((m) => m.id !== id));
    toast.success("Message deleted.");
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-black text-2xl uppercase tracking-tight text-ink-950">
              CONTACT MESSAGES & INBOX
            </h1>
            <SampleBadge />
          </div>
          <p className="text-xs text-ink-500 mt-1">
            Incoming inquiries submitted through the public Contact Us page.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-6 rounded-3xl border transition-all text-left space-y-3 ${
              msg.status === "unread"
                ? "bg-brand-50/40 border-brand-200 shadow-soft"
                : "bg-white border-ink-100 shadow-xs"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-ink-100 pb-3">
              <div>
                <span className="font-bold text-ink-950 text-sm">{msg.name}</span>
                <div className="flex items-center gap-4 text-xs text-ink-500 mt-0.5">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-brand-500" />
                    <a href={`mailto:${msg.email}`} className="hover:underline">{msg.email}</a>
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-brand-500" />
                    <a href={`tel:${msg.phone}`} className="hover:underline">{msg.phone}</a>
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-ink-400">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
                {msg.status === "unread" ? (
                  <button
                    onClick={() => markRead(msg.id)}
                    className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-full bg-brand-500 text-white"
                  >
                    Mark Read
                  </button>
                ) : (
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-full bg-ink-100 text-ink-600">
                    Read
                  </span>
                )}
                <button
                  onClick={() => deleteMsg(msg.id)}
                  className="p-1.5 text-ink-400 hover:text-red-600 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-display font-bold text-sm uppercase text-ink-900 mb-1">
                {msg.subject}
              </h4>
              <p className="text-xs text-ink-700 leading-relaxed bg-white/80 p-4 rounded-2xl border border-ink-100">
                {msg.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
