"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PACKAGES } from "@/data/packages";
import { quotationService } from "@/services/quotationService";
import { formatCurrency } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { DatePicker } from "@/components/ui/DatePicker";
import { toast } from "sonner";
import { ArrowLeft, Plus, Trash2, Calculator } from "lucide-react";

interface CustomItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function NewQuotationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [leadId] = useState(searchParams.get("leadId") || "");
  const [clientName, setClientName] = useState(searchParams.get("name") || "");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [eventType, setEventType] = useState("Wedding Reception");
  const [eventDate, setEventDate] = useState(searchParams.get("date") || "20/12/2026");
  const [venue, setVenue] = useState("ICCB Hall 1 (Gulnaksha)");
  const [guests, setGuests] = useState(Number(searchParams.get("guests")) || 300);
  const [selectedPkgId, setSelectedPkgId] = useState(PACKAGES[0].id);

  const [extras, setExtras] = useState<CustomItem[]>([
    { id: "ext-1", name: "Unlimited Clay Pot Borhani Station", price: 35000, quantity: 1 },
    { id: "ext-2", name: "VIP Bridal Table Butler Service", price: 20000, quantity: 1 },
  ]);

  const [discount, setDiscount] = useState(20000);
  const [notes, setNotes] = useState("Includes standard bone-china crockery, chafing dishes, and uniformed waitstaff.");
  const [submitting, setSubmitting] = useState(false);

  const selectedPkg = PACKAGES.find((p) => p.id === selectedPkgId) || PACKAGES[0];

  const baseCost = guests * selectedPkg.pricePerHead;
  const extrasCost = extras.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const subtotal = baseCost + extrasCost;
  const taxAmount = Math.round(subtotal * 0.05); // 5% VAT
  const total = subtotal + taxAmount - discount;

  const handleAddExtra = () => {
    const newItem: CustomItem = {
      id: "ext-" + Date.now(),
      name: "Custom Live Food Station",
      price: 15000,
      quantity: 1,
    };
    setExtras([...extras, newItem]);
  };

  const handleRemoveExtra = (id: string) => {
    setExtras(extras.filter((e) => e.id !== id));
  };

  const handleExtraChange = (id: string, field: keyof CustomItem, val: any) => {
    setExtras(
      extras.map((e) => (e.id === id ? { ...e, [field]: val } : e))
    );
  };

  const handleSave = async (status: "Draft" | "Sent") => {
    if (!clientName.trim()) {
      toast.error("Client name is required");
      return;
    }
    setSubmitting(true);
    try {
      const created = await quotationService.create({
        leadId: leadId || undefined,
        clientName,
        clientEmail: clientEmail || "client@example.com",
        clientPhone: clientPhone || "+8801700000000",
        eventType,
        eventDate,
        venue,
        guestCount: guests,
        packageName: selectedPkg.name,
        packagePricePerHead: selectedPkg.pricePerHead,
        items: [
          {
            id: "pkg-base",
            name: `${selectedPkg.name} (Base Menu)`,
            price: selectedPkg.pricePerHead,
            quantity: guests,
          },
        ],
        extras,
        subtotal,
        taxRate: 0.05,
        taxAmount,
        discount,
        total,
        status,
        version: 1,
        notes,
      });

      toast.success(`Quotation ${created.quotationNumber} generated successfully!`);
      router.push(`/dashboard/quotations/${created.id}`);
    } catch (err) {
      toast.error("Failed to generate quotation");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/quotations"
          className="p-2 rounded-xl border border-ink-200 text-ink-600 hover:text-ink-950 hover:bg-ink-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="font-display font-black text-2xl uppercase tracking-tight text-ink-950">
            BANQUET QUOTATION BUILDER
          </h1>
          <p className="text-xs text-ink-500">
            Configure courses, guest headcount, optional live counters, and issue formal quotation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Settings */}
        <div className="lg:col-span-8 space-y-6">
          {/* Client & Event Info */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ink-100 shadow-soft space-y-4">
            <h3 className="font-display font-bold text-base uppercase tracking-wider text-ink-950 border-b border-ink-100 pb-3">
              1. Client & Schedule
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Client Full Name *"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Mahmudur Rahman"
              />
              <Input
                label="Client Phone Number"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="+8801711223344"
              />
              <Input
                label="Client Email Address"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="mahmud@example.com"
              />
              <Select
                label="Event Type"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                options={[
                  { value: "Wedding Reception", label: "Wedding Reception" },
                  { value: "Corporate AGM / Conference", label: "Corporate AGM / Conference" },
                  { value: "Holud & Mehendi Night", label: "Holud & Mehendi Night" },
                  { value: "Private Party", label: "Private Party" },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <DatePicker
                  label="Target Event Date"
                  value={eventDate}
                  onChange={setEventDate}
                />
              </div>
              <Input
                label="Guest Count"
                type="number"
                min="30"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
              />
              <Select
                label="Venue / Hall"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                options={[
                  { value: "ICCB Hall 1 (Gulnaksha)", label: "ICCB Hall 1 (Gulnaksha)" },
                  { value: "ICCB Hall 2 (Pushpaguchha)", label: "ICCB Hall 2 (Pushpaguchha)" },
                  { value: "ICCB Hall 3 (Rajdarshan)", label: "ICCB Hall 3 (Rajdarshan)" },
                  { value: "ICCB Hall 4 (Naboratna)", label: "ICCB Hall 4 (Naboratna)" },
                  { value: "Outside ICCB", label: "Outside ICCB (Off-premises)" },
                ]}
              />
            </div>
          </div>

          {/* Package Selection */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ink-100 shadow-soft space-y-4">
            <h3 className="font-display font-bold text-base uppercase tracking-wider text-ink-950 border-b border-ink-100 pb-3">
              2. Select Base Menu Package
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PACKAGES.map((pkg) => {
                const isSelected = pkg.id === selectedPkgId;
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setSelectedPkgId(pkg.id)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? "border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20"
                        : "border-ink-200 hover:border-ink-300 bg-white"
                    }`}
                  >
                    <span className="font-display font-bold text-sm uppercase text-ink-950 block">
                      {pkg.name}
                    </span>
                    <span className="font-bold text-brand-600 text-xs block mt-1">
                      {formatCurrency(pkg.pricePerHead)} / person
                    </span>
                    <span className="text-[10px] text-ink-400 mt-1 block">Min. {pkg.minGuests} guests</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Extras / Custom Add-ons */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ink-100 shadow-soft space-y-4">
            <div className="flex items-center justify-between border-b border-ink-100 pb-3">
              <h3 className="font-display font-bold text-base uppercase tracking-wider text-ink-950">
                3. Additional Live Counters & Services
              </h3>
              <Button size="sm" variant="outline" type="button" onClick={handleAddExtra}>
                <Plus className="w-3.5 h-3.5 mr-1" />
                Add Item
              </Button>
            </div>

            <div className="space-y-3">
              {extras.map((ext) => (
                <div key={ext.id} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={ext.name}
                    onChange={(e) => handleExtraChange(ext.id, "name", e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-lg border border-ink-200 bg-white"
                  />
                  <input
                    type="number"
                    value={ext.price}
                    onChange={(e) => handleExtraChange(ext.id, "price", Number(e.target.value))}
                    className="w-28 px-3 py-2 text-xs rounded-lg border border-ink-200 bg-white font-bold"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveExtra(ext.id)}
                    className="p-2 text-ink-400 hover:text-red-600 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Textarea
                label="Terms & Contract Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Live Calculation Sidebar */}
        <div className="lg:col-span-4 bg-ink-950 text-white rounded-3xl p-8 shadow-xl space-y-6 sticky top-28">
          <div className="border-b border-ink-800 pb-4">
            <span className="text-[10px] uppercase font-bold text-brand-400 tracking-wider">
              Quotation Summary
            </span>
            <h4 className="font-display font-black text-2xl uppercase tracking-wider text-white mt-1">
              {selectedPkg.name}
            </h4>
            <p className="text-xs text-ink-400 mt-1">
              {guests} Guests &bull; {venue}
            </p>
          </div>

          <div className="space-y-3 text-xs text-ink-300 border-b border-ink-800 pb-4">
            <div className="flex justify-between">
              <span>Base ({guests} &times; {formatCurrency(selectedPkg.pricePerHead)})</span>
              <span className="font-semibold text-white">{formatCurrency(baseCost)}</span>
            </div>
            {extrasCost > 0 && (
              <div className="flex justify-between">
                <span>Add-on Stations</span>
                <span className="font-semibold text-white">{formatCurrency(extrasCost)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-white">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Govt VAT (5%)</span>
              <span className="font-semibold text-white">{formatCurrency(taxAmount)}</span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span>Privilege Discount:</span>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-24 px-2 py-1 text-xs rounded bg-ink-900 border border-ink-700 text-white text-right"
              />
            </div>
          </div>

          {/* Grand Total */}
          <div>
            <span className="text-[10px] uppercase font-bold text-ink-400 tracking-wider block">
              Total Payable (BDT):
            </span>
            <span className="font-display font-black text-3xl sm:text-4xl text-brand-400">
              {formatCurrency(total)}
            </span>
            <p className="text-[10px] text-ink-400 mt-1">
              Approx. {formatCurrency(Math.round(total / (guests || 1)))} net per person
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Button
              type="button"
              size="lg"
              variant="primary"
              withArrow
              onClick={() => handleSave("Sent")}
              isLoading={submitting}
              className="w-full"
            >
              Issue & Save Quotation
            </Button>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => handleSave("Draft")}
              disabled={submitting}
              className="w-full"
            >
              Save as Draft
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

