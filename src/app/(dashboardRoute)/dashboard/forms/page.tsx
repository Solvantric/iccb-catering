"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { FileText, Mail, Eye, Settings, CheckCircle2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface FormSchema {
  id: string;
  name: string;
  endpoint: string;
  publicRoute: string;
  fieldCount: number;
  totalSubmissions: number;
  recipients: string;
  autoResponder: boolean;
}

const INITIAL_FORMS: FormSchema[] = [
  {
    id: "frm-1",
    name: "Interactive Quotation Request (Multi-Step)",
    endpoint: "/api/leads",
    publicRoute: "/quote",
    fieldCount: 14,
    totalSubmissions: 34,
    recipients: "iccbcatering@bga-bd.com, banquet-sales@iccb.demo",
    autoResponder: true,
  },
  {
    id: "frm-2",
    name: "Banquet Booking Request",
    endpoint: "/api/bookings",
    publicRoute: "/booking",
    fieldCount: 12,
    totalSubmissions: 19,
    recipients: "iccb@bga-bd.com, reservations@iccb.demo",
    autoResponder: true,
  },
  {
    id: "frm-3",
    name: "Menu Tasting Session Reservation",
    endpoint: "/api/leads?type=tasting",
    publicRoute: "/tasting",
    fieldCount: 8,
    totalSubmissions: 12,
    recipients: "culinary@iccb.demo, iccbcatering@bga-bd.com",
    autoResponder: true,
  },
  {
    id: "frm-4",
    name: "Catering General Inquiry Form",
    endpoint: "/api/leads?type=inquiry",
    publicRoute: "/inquiry",
    fieldCount: 9,
    totalSubmissions: 28,
    recipients: "iccbcatering@bga-bd.com",
    autoResponder: true,
  },
  {
    id: "frm-5",
    name: "Contact Us Message Form",
    endpoint: "/api/contacts",
    publicRoute: "/contact",
    fieldCount: 5,
    totalSubmissions: 45,
    recipients: "info@bga-bd.com, iccb@bga-bd.com",
    autoResponder: false,
  },
];

export default function FormsBuilderPage() {
  const [forms, setForms] = useState<FormSchema[]>(INITIAL_FORMS);
  const [selectedForm, setSelectedForm] = useState<FormSchema | null>(null);

  const handleSaveRecipients = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedForm) return;

    setForms((prev) =>
      prev.map((f) => (f.id === selectedForm.id ? selectedForm : f))
    );
    setSelectedForm(null);
    toast.success("Form recipient rules updated");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display tracking-tight text-ink-950">
            INTAKE FORMS & ROUTING
          </h1>
          <p className="text-sm text-ink-600 mt-1">
            Configure notification routing, anti-spam honeypots, and submission endpoints
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {forms.map((form) => (
          <div
            key={form.id}
            className="bg-white p-6 rounded-xl border border-ink-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-ink-950 text-base">{form.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-ink-100 text-ink-600 font-mono">
                    {form.publicRoute}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-ink-500 mt-1.5 flex-wrap">
                  <span>{form.fieldCount} fields schema</span>
                  <span>•</span>
                  <span className="font-semibold text-brand-600">{form.totalSubmissions} submissions logged</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-ink-600">
                    <Mail className="w-3.5 h-3.5 text-ink-400" />
                    {form.recipients.split(",")[0]}
                    {form.recipients.includes(",") && " + more"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <Link href={form.publicRoute} target="_blank">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Eye className="w-4 h-4" />
                  View Live Form
                </Button>
              </Link>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelectedForm(form)}
                className="gap-1.5"
              >
                <Settings className="w-4 h-4" />
                Configure Routing
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Routing Modal */}
      {selectedForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-ink-950">
              Configure {selectedForm.name}
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-ink-700 mb-1">
                  Recipient Notification Emails (comma separated)
                </label>
                <Input
                  value={selectedForm.recipients}
                  onChange={(e) =>
                    setSelectedForm({ ...selectedForm, recipients: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block font-semibold text-ink-700 mb-1">
                  Mock API / Backend Endpoint
                </label>
                <Input value={selectedForm.endpoint} disabled className="bg-ink-50 font-mono text-xs" />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="autoResp"
                  checked={selectedForm.autoResponder}
                  onChange={(e) =>
                    setSelectedForm({ ...selectedForm, autoResponder: e.target.checked })
                  }
                  className="rounded text-brand-500 focus:ring-brand-500"
                />
                <label htmlFor="autoResp" className="text-xs text-ink-700 font-medium">
                  Send immediate automatic confirmation email to guest upon submission
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-ink-100">
              <Button variant="outline" size="sm" onClick={() => setSelectedForm(null)}>
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSaveRecipients}
                className="bg-brand-500 hover:bg-brand-600 text-white"
              >
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

