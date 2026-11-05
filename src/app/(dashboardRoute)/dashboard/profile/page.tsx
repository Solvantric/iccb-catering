"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { User, KeyRound, Shield, CheckCircle, Save, Smartphone } from "lucide-react";
import { toast } from "sonner";

export default function UserProfilePage() {
  const { user } = useAuthStore();
  const [saving, setSaving] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const [form, setForm] = useState({
    name: user?.name || "Admin User",
    email: user?.email || "admin@iccb.demo",
    phone: "+88-01991-197719",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Profile updated successfully");
    }, 400);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.newPassword || form.newPassword !== form.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setForm({ ...form, currentPassword: "", newPassword: "", confirmPassword: "" });
      toast.success("Security password changed successfully");
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display tracking-tight text-ink-950">
          ACCOUNT PROFILE & SECURITY
        </h1>
        <p className="text-sm text-ink-600 mt-1">
          Manage your banquet administrative credentials, notification preferences, and 2FA
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white p-6 rounded-xl border border-ink-100 shadow-sm flex flex-col items-center text-center space-y-4">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-brand-500 shadow-sm">
            <Image
              src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"}
              alt="Avatar"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-bold text-base text-ink-950">{user?.name || "Admin User"}</h3>
            <p className="text-xs text-ink-500">{user?.email || "admin@iccb.demo"}</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-bold uppercase tracking-wider border border-brand-100">
            {user?.role || "Admin"}
          </span>

          <div className="w-full pt-4 border-t border-ink-100 text-left text-xs space-y-2 text-ink-600">
            <div className="flex justify-between">
              <span className="text-ink-400">Department:</span>
              <span className="font-semibold text-ink-950">Banquet Operations</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-400">Headquarters:</span>
              <span className="font-semibold text-ink-950">ICCB Kuril, Dhaka</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-400">Status:</span>
              <span className="font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                Active Session
              </span>
            </div>
          </div>
        </div>

        {/* Profile Information Form */}
        <div className="md:col-span-2 space-y-6">
          <form onSubmit={handleUpdateProfile} className="bg-white p-6 rounded-xl border border-ink-100 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-ink-950 uppercase tracking-wider text-ink-400">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1">Full Name</label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1">Email Address</label>
                <Input
                  value={form.email}
                  disabled
                  className="bg-ink-50 text-ink-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Direct Phone</label>
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" size="sm" className="bg-brand-500 hover:bg-brand-600 text-white gap-1.5">
                <Save className="w-4 h-4" />
                Update Profile
              </Button>
            </div>
          </form>

          {/* Password Change Form */}
          <form onSubmit={handleUpdatePassword} className="bg-white p-6 rounded-xl border border-ink-100 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-ink-950 uppercase tracking-wider text-ink-400 flex items-center gap-1.5">
              <KeyRound className="w-4 h-4" />
              Change Password
            </h2>

            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Current Password</label>
              <Input
                type="password"
                value={form.currentPassword}
                onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
                placeholder="••••••••"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1">New Password</label>
                <Input
                  type="password"
                  value={form.newPassword}
                  onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1">Confirm New Password</label>
                <Input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" size="sm" variant="outline" className="gap-1.5">
                Update Password
              </Button>
            </div>
          </form>

          {/* 2FA Toggle */}
          <div className="bg-white p-6 rounded-xl border border-ink-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-ink-950">Two-Factor Authentication (2FA)</h3>
                <p className="text-xs text-ink-500">Require OTP authenticator code for sign-in</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setTwoFactorEnabled(!twoFactorEnabled);
                toast.success(`2FA ${!twoFactorEnabled ? "Enabled" : "Disabled"}`);
              }}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                twoFactorEnabled ? "bg-emerald-500" : "bg-ink-200"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  twoFactorEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
