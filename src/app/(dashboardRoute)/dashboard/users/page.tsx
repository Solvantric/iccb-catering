"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { userService } from "@/services/contentServices";
import { User, UserRole } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { ConfirmDialog } from "@/components/dashboard/ConfirmDialog";
import { Plus, Trash2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function UsersManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Sales" as UserRole,
  });

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.list();
      setUsers(data);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Please fill in name and email");
      return;
    }

    try {
      const created = await userService.create({
        name: form.name,
        email: form.email,
        role: form.role,
        status: "active",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
        lastLogin: new Date().toISOString(),
      });
      setUsers([...users, created]);
      setForm({ name: "", email: "", role: "Sales" });
      setIsAdding(false);
      toast.success(`User ${created.name} invited successfully`);
    } catch {
      toast.error("Failed to create user");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await userService.delete(deleteTarget.id);
      setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
      toast.success("User deleted");
    } catch {
      toast.error("Failed to delete user");
    } finally {
      setDeleteTarget(null);
    }
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case "Admin":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">Admin</span>;
      case "Sales":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">Sales Manager</span>;
      case "Content Editor":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">Content Editor</span>;
      case "Viewer":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">Viewer</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold font-display tracking-tight text-ink-950">
              USERS & STAFF ACCESS
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-600 font-semibold border border-brand-100">
              {users.length} Accounts
            </span>
          </div>
          <p className="text-sm text-ink-600 mt-1">
            Manage administrative credentials, sales representatives, and editorial roles
          </p>
        </div>

        <Button
          onClick={() => setIsAdding(!isAdding)}
          size="sm"
          className="gap-1.5 bg-brand-500 hover:bg-brand-600 text-white"
        >
          <Plus className="w-4 h-4" />
          {isAdding ? "Cancel" : "Add User"}
        </Button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl border border-brand-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-ink-950">Invite Staff Member</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Full Name *</label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Farhan Ahmed"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Email Address *</label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="name@iccb.demo"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Permission Role</label>
              <Select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value as UserRole })}
                options={[
                  { value: "Admin", label: "Admin (Full Access)" },
                  { value: "Sales", label: "Sales (Leads & Quotes)" },
                  { value: "Content Editor", label: "Content Editor (Menu & Blog)" },
                  { value: "Viewer", label: "Viewer (Read Only)" },
                ]}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm" className="bg-brand-500 hover:bg-brand-600 text-white">
              Create Account
            </Button>
          </div>
        </form>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-ink-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-ink-400">Loading accounts...</div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead className="bg-ink-50/60 border-b border-ink-100 text-ink-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-5">Staff Member</th>
                <th className="py-3 px-5">Email</th>
                <th className="py-3 px-5">Assigned Role</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-ink-50/50 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden bg-ink-100 shrink-0">
                        <Image src={u.avatarUrl} alt={u.name} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="font-bold text-ink-950 block">{u.name}</span>
                        <span className="text-[11px] text-ink-400 font-mono">{u.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-ink-600 font-medium">{u.email}</td>
                  <td className="py-4 px-5">{getRoleBadge(u.role)}</td>
                  <td className="py-4 px-5">
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {u.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => setDeleteTarget(u)}
                      className="p-1.5 text-ink-400 hover:text-red-600 rounded-lg transition-colors"
                      title="Remove User"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Revoke Staff Account"
        message={`Are you sure you want to revoke system access for "${deleteTarget?.name}"?`}
        confirmText="Revoke Access"
        confirmVariant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
