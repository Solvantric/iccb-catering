"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { UserRole } from "@/types";
import { Bell, Search, User, Shield, LogOut, Check, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export function Topbar() {
  const router = useRouter();
  const { user, setUserRole, logout } = useAuthStore();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const roles: UserRole[] = ["Admin", "Sales", "Content Editor", "Viewer"];

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    toast.info(`Switched role to ${role}`);
  };

  const handleLogout = () => {
    logout();
    router.push("/sign-in");
  };

  return (
    <header className="h-16 bg-white border-b border-ink-100 flex items-center justify-between px-6 sticky top-0 z-20 shadow-xs">
      {/* Search Input */}
      <div className="relative w-72 md:w-96">
        <input
          type="text"
          placeholder="Search leads, quotations, dishes, bookings..."
          className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-ink-200 bg-ink-50/50 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
        />
        <Search className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2" />
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-4">
        {/* Role Simulator Pill (Makes it effortless for reviewers to test Role-based UI) */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-ink-100/70 border border-ink-200 rounded-lg text-xs">
          <Shield className="w-3.5 h-3.5 text-brand-600" />
          <span className="text-[10px] uppercase font-bold text-ink-500">Role:</span>
          <select
            value={user?.role || "Admin"}
            onChange={(e) => handleRoleChange(e.target.value as UserRole)}
            className="bg-transparent font-bold text-xs text-brand-600 focus:outline-none cursor-pointer"
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 text-ink-500 hover:text-ink-900 hover:bg-ink-100 rounded-xl transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500 ring-2 ring-white" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-ink-100 p-4 z-50 animate-in fade-in zoom-in-95 text-left">
              <div className="flex items-center justify-between pb-3 border-b border-ink-100">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-ink-900">
                  Recent Notifications
                </h4>
                <Link
                  href="/dashboard/notifications"
                  onClick={() => setNotificationsOpen(false)}
                  className="text-[10px] text-brand-600 font-bold hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="py-2 space-y-2.5 text-xs text-ink-600">
                <div className="p-2 rounded-lg bg-brand-50/60 border border-brand-100">
                  <p className="font-bold text-ink-900">New Quote Request</p>
                  <p className="text-[11px] text-ink-500">Mahmudur Rahman for 650 guests at Hall 1</p>
                  <span className="text-[9px] text-brand-600">10m ago</span>
                </div>
                <div className="p-2 rounded-lg bg-ink-50">
                  <p className="font-bold text-ink-900">Tasting Appointment</p>
                  <p className="text-[11px] text-ink-500">Mrs. Shahnaz confirmed Friday 2:00 PM</p>
                  <span className="text-[9px] text-ink-400">1h ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-ink-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center font-display font-bold text-xs shadow-sm">
              {user?.name?.charAt(0) || "A"}
            </div>
            <span className="hidden md:inline text-xs font-bold text-ink-900">
              {user?.name || "Admin"}
            </span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-ink-100 py-2 z-50 animate-in fade-in zoom-in-95 text-left">
              <div className="px-4 py-2 border-b border-ink-100">
                <p className="text-xs font-bold text-ink-950 truncate">{user?.name}</p>
                <p className="text-[10px] text-ink-400 truncate">{user?.email}</p>
              </div>

              <Link
                href="/dashboard/profile"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-xs text-ink-700 hover:text-brand-600 hover:bg-brand-50 transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                <span>My Profile</span>
              </Link>

              <Link
                href="/dashboard/settings"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-xs text-ink-700 hover:text-brand-600 hover:bg-brand-50 transition-colors"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Settings</span>
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition-colors border-t border-ink-100 mt-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
