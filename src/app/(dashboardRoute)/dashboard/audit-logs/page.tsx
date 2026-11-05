"use client";

import React, { useEffect, useState } from "react";
import { auditService } from "@/services/contentServices";
import { AuditLog } from "@/types";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { ShieldCheck, Search, Calendar, User, Activity } from "lucide-react";
import { toast } from "sonner";

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedModule, setSelectedModule] = useState("All");

  const loadLogs = async () => {
    try {
      setLoading(true);
      const data = await auditService.list();
      setLogs(data);
    } catch {
      toast.error("Failed to load audit logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const filteredLogs = logs.filter((l) => {
    const matchesSearch =
      l.details.toLowerCase().includes(search.toLowerCase()) ||
      l.userName.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase());
    const matchesMod = selectedModule === "All" || l.module.toLowerCase() === selectedModule.toLowerCase();
    return matchesSearch && matchesMod;
  });

  const getActionBadge = (action: string) => {
    switch (action.toUpperCase()) {
      case "CREATE":
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">CREATE</span>;
      case "UPDATE":
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">UPDATE</span>;
      case "DELETE":
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800">DELETE</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-ink-100 text-ink-800">{action}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold font-display tracking-tight text-ink-950">
            SYSTEM AUDIT LOGS
          </h1>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-600 font-semibold border border-brand-100">
            {logs.length} Recorded Events
          </span>
        </div>
        <p className="text-sm text-ink-600 mt-1">
          Immutable chronological record of administrative actions, quote dispatches, and updates
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-ink-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <Input
            placeholder="Search by action, user or details..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10"
          />
        </div>

        <div className="w-full md:w-60">
          <Select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            options={[
              { value: "All", label: "All Modules" },
              { value: "Leads", label: "Leads" },
              { value: "Quotations", label: "Quotations" },
              { value: "Bookings", label: "Bookings" },
              { value: "Menu", label: "Menu" },
              { value: "Blog", label: "Blog" },
              { value: "Settings", label: "Settings" },
            ]}
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-xl border border-ink-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-ink-400">Loading audit records...</div>
        ) : filteredLogs.length === 0 ? (
          <div className="p-12 text-center text-ink-400">No logs found matching your criteria.</div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead className="bg-ink-50/60 border-b border-ink-100 text-ink-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-5">Timestamp</th>
                <th className="py-3 px-5">Staff Member</th>
                <th className="py-3 px-5">Action</th>
                <th className="py-3 px-5">Module</th>
                <th className="py-3 px-5">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-ink-50/50 transition-colors">
                  <td className="py-3.5 px-5 text-ink-500 whitespace-nowrap font-mono text-[11px]">
                    {new Date(log.timestamp).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-3.5 px-5 font-bold text-ink-950 whitespace-nowrap flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-ink-400" />
                    {log.userName}
                  </td>
                  <td className="py-3.5 px-5 whitespace-nowrap">{getActionBadge(log.action)}</td>
                  <td className="py-3.5 px-5 font-semibold text-ink-700 whitespace-nowrap">
                    {log.module}
                  </td>
                  <td className="py-3.5 px-5 text-ink-600 max-w-md truncate">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

