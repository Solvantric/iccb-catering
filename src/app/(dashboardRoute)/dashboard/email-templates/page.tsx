"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Mail, Save, Eye, Sparkles, Send } from "lucide-react";
import { toast } from "sonner";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  category: "Quotation" | "Booking" | "Tasting" | "Inquiry" | "Newsletter";
  body: string;
  availableVariables: string[];
}

const TEMPLATES: EmailTemplate[] = [
  {
    id: "tpl-1",
    name: "Banquet Quotation Dispatch",
    category: "Quotation",
    subject: "Your Official ICCB Catering Banquet Quotation #{{quote_number}}",
    availableVariables: ["{{guest_name}}", "{{quote_number}}", "{{event_type}}", "{{guest_count}}", "{{total_amount}}", "{{valid_until}}"],
    body: `Dear {{guest_name}},

Thank you for considering ICCB Catering (International Convention City Bashundhara) for your upcoming {{event_type}}.

We have prepared your customized banquet proposal with detailed per-head breakdown, culinary inclusions, and venue service guarantees.

Quotation Summary:
- Proposal Number: {{quote_number}}
- Event Occasion: {{event_type}}
- Anticipated Attendance: {{guest_count}} Guests
- Total Estimated Investment: {{total_amount}}
- Offer Validity: {{valid_until}}

At ICCB Catering, our state-of-the-art modern slaughterhouse, certified ingredients lab, and strict 65°C+ serving temperatures guarantee an unmatched culinary experience.

To confirm this booking or request a private tasting session with our Executive Chef, please reply directly or call +88-01991-197719.

Warm regards,
Banquet & Culinary Hospitality Team
ICCB Catering (International Convention City Bashundhara)
Next to 300 ft. Purbachal Express Highway, Dhaka 1229`,
  },
  {
    id: "tpl-2",
    name: "Menu Tasting Session Confirmation",
    category: "Tasting",
    subject: "Confirmed: Your Private Menu Tasting Session with ICCB Executive Chef",
    availableVariables: ["{{guest_name}}", "{{tasting_date}}", "{{tasting_time}}", "{{cuisine_selection}}"],
    body: `Dear {{guest_name}},

We are delighted to confirm your private banquet menu tasting appointment.

Appointment Details:
- Date: {{tasting_date}}
- Time: {{tasting_time}}
- Location: ICCB Heritage Restaurant & Banquet Tasting Suite
- Tasting Focus: {{cuisine_selection}}

Our Master Chef will guide you through our signature kacchi dum, shahi rezala, continental mains, and artisanal desserts.

Should you require any dietary accommodations, please inform us in advance.

Warm regards,
ICCB Catering Culinary Team`,
  },
  {
    id: "tpl-3",
    name: "Inquiry Auto-Reply",
    category: "Inquiry",
    subject: "We received your catering inquiry - ICCB Catering",
    availableVariables: ["{{guest_name}}", "{{event_date}}", "{{expected_guests}}"],
    body: `Dear {{guest_name}},

Thank you for reaching out to ICCB Catering regarding your event on {{event_date}}.

Our banquet manager has received your submission and will review hall availability and menu suggestions. You will receive a personalized response or call within 2 business hours.

In the meantime, feel free to explore our full interactive menu and packages online.

Catering Helpline: +88-01991-197719 / +88-02-41091551
Email: iccbcatering@bga-bd.com

Best regards,
ICCB Catering`,
  },
  {
    id: "tpl-4",
    name: "Newsletter Welcome & Offer",
    category: "Newsletter",
    subject: "Welcome to ICCB Catering VIP Hospitality Updates",
    availableVariables: ["{{subscriber_email}}", "{{promo_code}}", "{{discount_rate}}"],
    body: `Hello,

Thank you for subscribing to ICCB Catering's seasonal banquet announcements.

As a welcome gift, use the exclusive promotional code {{promo_code}} when requesting your next event quotation for an instant {{discount_rate}} courtesy discount on beverages or dessert upgrades.

Warm hospitality,
ICCB Catering Dhaka`,
  },
];

export default function EmailTemplatesPage() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(TEMPLATES);
  const [selectedId, setSelectedId] = useState<string>(TEMPLATES[0].id);
  const [testEmail, setTestEmail] = useState("");
  const [isSendingTest, setIsSendingTest] = useState(false);

  const currentTemplate = templates.find((t) => t.id === selectedId) || templates[0];

  const handleUpdate = (field: keyof EmailTemplate, val: any) => {
    setTemplates((prev) =>
      prev.map((t) => (t.id === currentTemplate.id ? { ...t, [field]: val } : t))
    );
  };

  const handleSave = () => {
    toast.success(`Template "${currentTemplate.name}" saved`);
  };

  const handleSendTest = () => {
    if (!testEmail) {
      toast.error("Please enter an email address for test dispatch");
      return;
    }
    setIsSendingTest(true);
    setTimeout(() => {
      setIsSendingTest(false);
      toast.success(`Test email dispatched to ${testEmail}`);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display tracking-tight text-ink-950">
            AUTOMATED EMAIL TEMPLATES
          </h1>
          <p className="text-sm text-ink-600 mt-1">
            Customize branded transactional emails, notifications, and client confirmations
          </p>
        </div>

        <Button
          onClick={handleSave}
          size="sm"
          className="gap-1.5 bg-brand-500 hover:bg-brand-600 text-white"
        >
          <Save className="w-4 h-4" />
          Save Template
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Templates Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {templates.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => setSelectedId(tpl.id)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col gap-1 ${
                selectedId === tpl.id
                  ? "bg-white border-brand-500 shadow-sm ring-1 ring-brand-500"
                  : "bg-white/60 border-ink-100 hover:bg-white text-ink-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-ink-100 text-ink-600">
                  {tpl.category}
                </span>
                <Mail className="w-3.5 h-3.5 text-ink-400" />
              </div>
              <span className="font-bold text-sm text-ink-950 line-clamp-1">{tpl.name}</span>
            </button>
          ))}
        </div>

        {/* Editor & Preview */}
        <div className="lg:col-span-3 space-y-5">
          <div className="bg-white p-6 rounded-xl border border-ink-100 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Email Subject Line *</label>
              <Input
                value={currentTemplate.subject}
                onChange={(e) => handleUpdate("subject", e.target.value)}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-ink-700">Message Body (Plain Text & HTML)</label>
                <div className="flex items-center gap-1 text-[11px] text-ink-400">
                  <span>Merge Variables:</span>
                  {currentTemplate.availableVariables.map((v) => (
                    <span key={v} className="bg-ink-100 text-ink-700 px-1.5 py-0.5 rounded font-mono text-[10px]">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
              <Textarea
                value={currentTemplate.body}
                onChange={(e) => handleUpdate("body", e.target.value)}
                rows={14}
                className="font-mono text-xs leading-relaxed"
              />
            </div>
          </div>

          {/* Test Dispatch Panel */}
          <div className="bg-white p-4 rounded-xl border border-ink-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Sparkles className="w-4 h-4 text-brand-500" />
              <span className="text-xs font-semibold text-ink-950">Send Test Email:</span>
              <Input
                placeholder="sales@iccb.demo"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="h-9 w-60 text-xs"
              />
            </div>
            <Button
              size="sm"
              variant="outline"
              disabled={isSendingTest}
              onClick={handleSendTest}
              className="gap-1.5 text-xs w-full sm:w-auto"
            >
              <Send className="w-3.5 h-3.5" />
              {isSendingTest ? "Dispatching..." : "Send Test Now"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

