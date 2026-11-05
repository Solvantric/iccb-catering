"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Bell, CheckCheck, Trash2, Calendar, FileText, UserPlus, Utensils } from "lucide-react";
import { toast } from "sonner";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "lead" | "quote" | "booking" | "tasting";
  time: string;
  read: boolean;
  link: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "New Quotation Request",
    message: "Beximco Group submitted a multi-step banquet request for 800 guests at Pushpaguchha Hall.",
    type: "quote",
    time: "10 mins ago",
    read: false,
    link: "/dashboard/leads",
  },
  {
    id: "notif-2",
    title: "Menu Tasting Session Requested",
    message: "Mrs. Nabila Ahmed requested a private tasting of the Shahi Mughal package.",
    type: "tasting",
    time: "1 hour ago",
    read: false,
    link: "/dashboard/leads",
  },
  {
    id: "notif-3",
    title: "Booking Confirmed",
    message: "Booking BKG-2026-104 (Grameenphone Summit Gala) marked Confirmed with ৳ 250,000 advance.",
    type: "booking",
    time: "4 hours ago",
    read: true,
    link: "/dashboard/bookings",
  },
  {
    id: "notif-4",
    title: "New Newsletter Subscriber",
    message: "eventplanner@dhakahospitality.com subscribed to seasonal menu updates.",
    type: "lead",
    time: "1 day ago",
    read: true,
    link: "/dashboard/subscribers",
  },
];

export default function NotificationsCenterPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const clearAll = () => {
    setNotifications([]);
    toast.success("Notifications cleared");
  };

  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "quote":
        return <FileText className="w-5 h-5 text-brand-600" />;
      case "booking":
        return <Calendar className="w-5 h-5 text-blue-600" />;
      case "tasting":
        return <Utensils className="w-5 h-5 text-amber-600" />;
      default:
        return <UserPlus className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold font-display tracking-tight text-ink-950">
              NOTIFICATIONS CENTER
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-600 font-semibold border border-brand-100">
              {notifications.filter((n) => !n.read).length} Unread
            </span>
          </div>
          <p className="text-sm text-ink-600 mt-1">
            Real-time banquet inquiry alerts, tasting appointments, and staff actions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={markAllRead} className="gap-1.5">
            <CheckCheck className="w-4 h-4" />
            Mark all read
          </Button>
          <Button variant="outline" size="sm" onClick={clearAll} className="gap-1.5 text-red-600 hover:text-red-700">
            <Trash2 className="w-4 h-4" />
            Clear all
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-ink-100 shadow-sm divide-y divide-ink-100 overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-12 text-center text-ink-400">
            <Bell className="w-12 h-12 text-ink-300 mx-auto mb-3" />
            <h3 className="font-semibold text-ink-950">No notifications</h3>
            <p className="text-xs text-ink-500 mt-1">You are all caught up!</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`p-5 flex items-start justify-between gap-4 transition-colors ${
                n.read ? "bg-white opacity-80" : "bg-brand-50/20"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-ink-50 border border-ink-100 flex items-center justify-center shrink-0 mt-0.5">
                  {getIcon(n.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-ink-950">{n.title}</h4>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-ink-600 mt-1 leading-relaxed">{n.message}</p>
                  <span className="text-[11px] text-ink-400 mt-2 block">{n.time}</span>
                </div>
              </div>

              <Link href={n.link}>
                <Button size="sm" variant="outline" className="text-xs shrink-0">
                  View
                </Button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
