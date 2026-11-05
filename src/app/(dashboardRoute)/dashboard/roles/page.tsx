"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Shield, Check, X, Save } from "lucide-react";
import { toast } from "sonner";

interface RolePermission {
  module: string;
  admin: { read: boolean; write: boolean; delete: boolean };
  sales: { read: boolean; write: boolean; delete: boolean };
  editor: { read: boolean; write: boolean; delete: boolean };
  viewer: { read: boolean; write: boolean; delete: boolean };
}

const INITIAL_MATRIX: RolePermission[] = [
  {
    module: "Catering Leads & Pipeline",
    admin: { read: true, write: true, delete: true },
    sales: { read: true, write: true, delete: true },
    editor: { read: false, write: false, delete: false },
    viewer: { read: true, write: false, delete: false },
  },
  {
    module: "Banquet Quotations & Invoices",
    admin: { read: true, write: true, delete: true },
    sales: { read: true, write: true, delete: true },
    editor: { read: false, write: false, delete: false },
    viewer: { read: true, write: false, delete: false },
  },
  {
    module: "Hall Bookings & Calendar",
    admin: { read: true, write: true, delete: true },
    sales: { read: true, write: true, delete: false },
    editor: { read: true, write: false, delete: false },
    viewer: { read: true, write: false, delete: false },
  },
  {
    module: "Dish Catalog & Today's Menu",
    admin: { read: true, write: true, delete: true },
    sales: { read: true, write: false, delete: false },
    editor: { read: true, write: true, delete: true },
    viewer: { read: true, write: false, delete: false },
  },
  {
    module: "Blog Articles & Guides",
    admin: { read: true, write: true, delete: true },
    sales: { read: true, write: false, delete: false },
    editor: { read: true, write: true, delete: true },
    viewer: { read: true, write: false, delete: false },
  },
  {
    module: "Testimonials & FAQs",
    admin: { read: true, write: true, delete: true },
    sales: { read: true, write: false, delete: false },
    editor: { read: true, write: true, delete: true },
    viewer: { read: true, write: false, delete: false },
  },
  {
    module: "System Settings & Users",
    admin: { read: true, write: true, delete: true },
    sales: { read: false, write: false, delete: false },
    editor: { read: false, write: false, delete: false },
    viewer: { read: false, write: false, delete: false },
  },
];

export default function RolesMatrixPage() {
  const [matrix, setMatrix] = useState<RolePermission[]>(INITIAL_MATRIX);
  const [saving, setSaving] = useState(false);

  const togglePerm = (modIdx: number, roleKey: "admin" | "sales" | "editor" | "viewer", permKey: "read" | "write" | "delete") => {
    setMatrix((prev) => {
      const copy = [...prev];
      copy[modIdx] = {
        ...copy[modIdx],
        [roleKey]: {
          ...copy[modIdx][roleKey],
          [permKey]: !copy[modIdx][roleKey][permKey],
        },
      };
      return copy;
    });
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Role permissions updated successfully");
    }, 400);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display tracking-tight text-ink-950">
            ROLES & PERMISSIONS MATRIX
          </h1>
          <p className="text-sm text-ink-600 mt-1">
            Fine-grained role-based access control (RBAC) across dashboard modules
          </p>
        </div>

        <Button
          onClick={handleSave}
          disabled={saving}
          className="gap-2 bg-brand-500 hover:bg-brand-600 text-white"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save Matrix"}
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-ink-100 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs min-w-[700px]">
          <thead className="bg-ink-50/60 border-b border-ink-100 text-ink-500 uppercase tracking-wider">
            <tr>
              <th className="py-3 px-5 font-semibold">Module</th>
              <th className="py-3 px-4 text-center font-semibold text-red-600">Admin</th>
              <th className="py-3 px-4 text-center font-semibold text-blue-600">Sales Manager</th>
              <th className="py-3 px-4 text-center font-semibold text-emerald-600">Content Editor</th>
              <th className="py-3 px-4 text-center font-semibold text-ink-600">Viewer</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {matrix.map((row, idx) => (
              <tr key={row.module} className="hover:bg-ink-50/40 transition-colors">
                <td className="py-4 px-5 font-bold text-ink-950">{row.module}</td>

                {/* Admin */}
                <td className="py-4 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                      Full Access
                    </span>
                  </div>
                </td>

                {/* Sales */}
                <td className="py-4 px-4">
                  <div className="flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => togglePerm(idx, "sales", "read")}
                      className={`p-1 rounded text-[10px] font-semibold ${
                        row.sales.read ? "bg-emerald-100 text-emerald-700" : "bg-ink-100 text-ink-400"
                      }`}
                    >
                      R
                    </button>
                    <button
                      onClick={() => togglePerm(idx, "sales", "write")}
                      className={`p-1 rounded text-[10px] font-semibold ${
                        row.sales.write ? "bg-blue-100 text-blue-700" : "bg-ink-100 text-ink-400"
                      }`}
                    >
                      W
                    </button>
                    <button
                      onClick={() => togglePerm(idx, "sales", "delete")}
                      className={`p-1 rounded text-[10px] font-semibold ${
                        row.sales.delete ? "bg-red-100 text-red-700" : "bg-ink-100 text-ink-400"
                      }`}
                    >
                      D
                    </button>
                  </div>
                </td>

                {/* Editor */}
                <td className="py-4 px-4">
                  <div className="flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => togglePerm(idx, "editor", "read")}
                      className={`p-1 rounded text-[10px] font-semibold ${
                        row.editor.read ? "bg-emerald-100 text-emerald-700" : "bg-ink-100 text-ink-400"
                      }`}
                    >
                      R
                    </button>
                    <button
                      onClick={() => togglePerm(idx, "editor", "write")}
                      className={`p-1 rounded text-[10px] font-semibold ${
                        row.editor.write ? "bg-blue-100 text-blue-700" : "bg-ink-100 text-ink-400"
                      }`}
                    >
                      W
                    </button>
                    <button
                      onClick={() => togglePerm(idx, "editor", "delete")}
                      className={`p-1 rounded text-[10px] font-semibold ${
                        row.editor.delete ? "bg-red-100 text-red-700" : "bg-ink-100 text-ink-400"
                      }`}
                    >
                      D
                    </button>
                  </div>
                </td>

                {/* Viewer */}
                <td className="py-4 px-4 text-center">
                  <button
                    onClick={() => togglePerm(idx, "viewer", "read")}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      row.viewer.read ? "bg-ink-200 text-ink-800" : "bg-ink-100 text-ink-400"
                    }`}
                  >
                    {row.viewer.read ? "Read Only" : "No Access"}
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
