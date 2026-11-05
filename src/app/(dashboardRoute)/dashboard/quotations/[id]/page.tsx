"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { quotationService } from "@/services/quotationService";
import { Quotation } from "@/types";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { SampleBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { SITE_INFO } from "@/data/site";
import { formatCurrency, formatLongDate } from "@/lib/format";
import { ArrowLeft, Printer, Send, CheckCircle2, Download } from "lucide-react";
import { toast } from "sonner";

export default function QuotationDetailPage() {
  const params = useParams();
  const [quotation, setQuotation] = useState<Quotation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuote() {
      try {
        const id = params.id as string;
        const res = await quotationService.getById(id);
        setQuotation(res);
      } catch (err) {
        toast.error("Quotation not found");
      } finally {
        setLoading(false);
      }
    }
    fetchQuote();
  }, [params.id]);

  if (loading) {
    return <div className="p-8 text-center text-xs text-ink-500">Loading quotation document...</div>;
  }

  if (!quotation) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-ink-600">Quotation document not found.</p>
        <Link href="/dashboard/quotations">
          <Button size="sm">Back to Quotations</Button>
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleStatusChange = async (newStatus: "Draft" | "Sent" | "Accepted" | "Rejected") => {
    try {
      const updated = await quotationService.update(quotation.id, { status: newStatus });
      setQuotation(updated);
      toast.success(`Quotation marked as ${newStatus}`);
    } catch (e) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Action Bar (hidden when printing) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/quotations"
            className="p-2 rounded-xl border border-ink-200 text-ink-600 hover:text-ink-950 hover:bg-ink-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-black text-2xl uppercase tracking-tight text-ink-950">
                QUOTATION {quotation.quotationNumber}
              </h1>
              <StatusBadge status={quotation.status} />
              {quotation.isSample && <SampleBadge />}
            </div>
            <p className="text-xs text-ink-400 mt-0.5">
              Issued on {new Date(quotation.createdAt).toLocaleDateString()} &bull; Version {quotation.version}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={quotation.status}
            onChange={(e) => handleStatusChange(e.target.value as any)}
            className="px-3 py-2 text-xs font-bold rounded-xl border border-ink-200 bg-white text-ink-900 focus:outline-none focus:border-brand-500"
          >
            <option value="Draft">Status: Draft</option>
            <option value="Sent">Status: Sent</option>
            <option value="Accepted">Status: Accepted</option>
            <option value="Rejected">Status: Rejected</option>
          </select>

          <Button size="sm" variant="primary" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-1.5" />
            Print / Save as PDF
          </Button>
        </div>
      </div>

      {/* Printable Formal Banquet Invoice Sheet (Exact corporate invoice look) */}
      <div className="bg-white rounded-3xl p-8 sm:p-14 border border-ink-200 shadow-soft max-w-4xl mx-auto space-y-8 text-ink-900 print:border-none print:shadow-none print:p-0">
        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6 border-b border-ink-200 pb-8">
          <div>
            <Logo />
            <p className="text-xs text-ink-500 mt-2 max-w-xs leading-relaxed">
              {SITE_INFO.contact.address}
            </p>
            <p className="text-xs text-ink-500 mt-1">
              Hotline: {SITE_INFO.contact.cateringPhone} | {SITE_INFO.contact.cateringEmail}
            </p>
          </div>

          <div className="sm:text-right space-y-1">
            <span className="font-display font-black text-2xl uppercase tracking-wider text-brand-600 block">
              OFFICIAL BANQUET QUOTATION
            </span>
            <p className="font-mono font-bold text-sm text-ink-950">
              #{quotation.quotationNumber}
            </p>
            <p className="text-xs text-ink-500">
              Date: {formatLongDate(quotation.createdAt)}
            </p>
            <p className="text-xs text-ink-500">
              Status: <strong className="text-ink-900 uppercase">{quotation.status}</strong> (v{quotation.version})
            </p>
          </div>
        </div>

        {/* Bill To & Event Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs border-b border-ink-200 pb-8">
          <div className="space-y-1.5">
            <span className="font-bold uppercase tracking-wider text-ink-400 block text-[10px]">
              QUOTATION ISSUED TO:
            </span>
            <h3 className="font-display font-bold text-base uppercase text-ink-950">
              {quotation.clientName}
            </h3>
            <p className="text-ink-600">Phone: {quotation.clientPhone}</p>
            <p className="text-ink-600">Email: {quotation.clientEmail}</p>
          </div>

          <div className="space-y-1.5 sm:text-right">
            <span className="font-bold uppercase tracking-wider text-ink-400 block text-[10px]">
              EVENT & VENUE DETAILS:
            </span>
            <p className="font-bold text-sm text-ink-950">{quotation.eventType}</p>
            <p className="text-ink-600">Target Event Date: <strong className="text-brand-600">{quotation.eventDate}</strong></p>
            <p className="text-ink-600">Venue: <strong>{quotation.venue}</strong></p>
            <p className="text-ink-600">Guaranteed Attendance: <strong>{quotation.guestCount} Guests</strong></p>
          </div>
        </div>

        {/* Items Table */}
        <div className="space-y-4">
          <h4 className="font-display font-bold text-sm uppercase tracking-wider text-ink-950">
            ITEMIZED BANQUET CHARGES
          </h4>
          <table className="w-full text-left text-xs">
            <thead className="bg-ink-50 border-b border-ink-200 text-[10px] font-bold uppercase tracking-wider text-ink-500">
              <tr>
                <th className="py-3 px-4">Item & Description</th>
                <th className="py-3 px-4 text-center">Qty / Guests</th>
                <th className="py-3 px-4 text-right">Unit Rate (BDT)</th>
                <th className="py-3 px-4 text-right">Total (BDT)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {/* Base Menu */}
              <tr>
                <td className="py-3.5 px-4">
                  <span className="font-bold text-ink-950 block">{quotation.packageName} (Base Menu)</span>
                  <span className="text-[11px] text-ink-500">
                    Includes full buffet counter, chafing units, bone-china dinnerware & floor captains
                  </span>
                </td>
                <td className="py-3.5 px-4 text-center font-bold text-ink-900">{quotation.guestCount}</td>
                <td className="py-3.5 px-4 text-right">{formatCurrency(quotation.packagePricePerHead)}</td>
                <td className="py-3.5 px-4 text-right font-bold text-ink-950">
                  {formatCurrency(quotation.guestCount * quotation.packagePricePerHead)}
                </td>
              </tr>

              {/* Extras */}
              {quotation.extras && quotation.extras.map((ext, idx) => (
                <tr key={idx}>
                  <td className="py-3 px-4">
                    <span className="font-medium text-ink-900 block">{ext.name}</span>
                    <span className="text-[10px] text-ink-400">Special Add-on Station</span>
                  </td>
                  <td className="py-3 px-4 text-center font-medium">1 Lot</td>
                  <td className="py-3 px-4 text-right">{formatCurrency(ext.price)}</td>
                  <td className="py-3 px-4 text-right font-bold text-ink-950">
                    {formatCurrency(ext.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Financial Totals */}
        <div className="flex justify-end pt-4 border-t border-ink-200">
          <div className="w-72 space-y-2 text-xs">
            <div className="flex justify-between text-ink-600">
              <span>Subtotal:</span>
              <span className="font-semibold text-ink-900">{formatCurrency(quotation.subtotal)}</span>
            </div>
            {quotation.discount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Special Privilege Discount:</span>
                <span className="font-semibold">-{formatCurrency(quotation.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-ink-600">
              <span>Govt. VAT (5%):</span>
              <span className="font-semibold text-ink-900">{formatCurrency(quotation.taxAmount)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-ink-200 text-sm font-bold text-ink-950">
              <span>Grand Total Payable:</span>
              <span className="font-display font-black text-xl text-brand-600">
                {formatCurrency(quotation.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Contract & Notes */}
        <div className="pt-6 border-t border-ink-100 text-xs text-ink-600 space-y-2">
          <span className="font-bold uppercase tracking-wider text-ink-900 text-[10px] block">
            Terms & Banquet Guidelines:
          </span>
          <p className="leading-relaxed">
            {quotation.notes || "Quotation valid for 14 days from issue date. Date confirmation requires 25% deposit."}
          </p>
          <p className="text-[11px] text-ink-400">
            Meats processed exclusively in ICCB&apos;s automated modern slaughterhouse. Dishes delivered hot at 65°C+.
          </p>
        </div>

        {/* Signatures */}
        <div className="pt-12 grid grid-cols-2 gap-12 text-xs text-center border-t border-ink-200">
          <div>
            <div className="h-12 border-b border-ink-300 w-48 mx-auto" />
            <p className="font-bold text-ink-900 mt-2 uppercase">Client Signature</p>
            <p className="text-[10px] text-ink-400">{quotation.clientName}</p>
          </div>
          <div>
            <div className="h-12 border-b border-ink-300 w-48 mx-auto" />
            <p className="font-bold text-ink-900 mt-2 uppercase">Authorized Banquet Director</p>
            <p className="text-[10px] text-ink-400">ICCB Catering Department</p>
          </div>
        </div>
      </div>
    </div>
  );
}

