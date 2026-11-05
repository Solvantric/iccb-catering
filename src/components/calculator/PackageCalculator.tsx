"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PACKAGES } from "@/data/packages";
import { formatCurrency } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { useUIStore } from "@/store/uiStore";
import { track } from "@/lib/analytics";
import { Calculator, Users, Plus, Check } from "lucide-react";

interface ExtraOption {
  id: string;
  name: string;
  pricePerHead?: number;
  fixedPrice?: number;
}

const EXTRAS: ExtraOption[] = [
  { id: "borhani-station", name: "Unlimited Traditional Clay Pot Borhani Station", pricePerHead: 60 },
  { id: "tea-coffee", name: "Continuous Hot Tea & Filtered Coffee Station", pricePerHead: 40 },
  { id: "vip-table", name: "VIP Head Table Butler Service & Silverware Upgrade", fixedPrice: 20000 },
  { id: "live-jalebi", name: "Live Sweet Jalebi & Shahi Tukra Station", fixedPrice: 35000 },
];

export function PackageCalculator() {
  const router = useRouter();
  const { setQuoteDraft } = useUIStore();

  const [selectedPkgId, setSelectedPkgId] = useState(PACKAGES[0].id);
  const [guests, setGuests] = useState(250);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const selectedPkg = PACKAGES.find((p) => p.id === selectedPkgId) || PACKAGES[0];

  const toggleExtra = (id: string) => {
    if (selectedExtras.includes(id)) {
      setSelectedExtras(selectedExtras.filter((e) => e !== id));
    } else {
      setSelectedExtras([...selectedExtras, id]);
    }
  };

  // Calculations
  const baseCost = guests * selectedPkg.pricePerHead;
  const extrasCost = selectedExtras.reduce((acc, currId) => {
    const extra = EXTRAS.find((e) => e.id === currId);
    if (!extra) return acc;
    if (extra.pricePerHead) return acc + extra.pricePerHead * guests;
    if (extra.fixedPrice) return acc + extra.fixedPrice;
    return acc;
  }, 0);

  const subtotal = baseCost + extrasCost;
  const vat = subtotal * 0.05; // 5% VAT
  const total = subtotal + vat;

  const handleRequestQuote = () => {
    track("package_calculated", {
      packageName: selectedPkg.name,
      guests,
      estimatedTotal: total,
    });

    setQuoteDraft({
      guestCount: guests,
      packageId: selectedPkg.id,
      packageName: selectedPkg.name,
      estimatedTotal: Math.round(total),
    });

    router.push("/quote");
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-ink-100 shadow-soft text-left">
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-ink-100">
        <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-display font-black text-xl uppercase tracking-wider text-ink-950">
            Interactive Catering Price Estimator
          </h3>
          <p className="text-xs text-ink-500">
            Select your desired package and guest count to calculate an estimated BDT total.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Select Package */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink-700 mb-2">
              1. Choose Base Menu Package
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PACKAGES.map((pkg) => {
                const isSelected = pkg.id === selectedPkgId;
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setSelectedPkgId(pkg.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20"
                        : "border-ink-200 hover:border-ink-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-xs uppercase text-ink-950">
                        {pkg.name}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-brand-500" />}
                    </div>
                    <p className="text-xs font-bold text-brand-600 mt-1">
                      {formatCurrency(pkg.pricePerHead)} / person
                    </p>
                    <p className="text-[10px] text-ink-400 mt-1">Min. {pkg.minGuests} guests</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Guest Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-ink-700">
                2. Expected Guest Attendance
              </label>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-ink-100 rounded-lg text-xs font-bold text-ink-900">
                <Users className="w-3.5 h-3.5 text-brand-500" />
                <span>{guests} Guests</span>
              </div>
            </div>
            <input
              type="range"
              min="50"
              max="5000"
              step="25"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full accent-brand-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-ink-400 mt-1">
              <span>50 Guests</span>
              <span>1,000</span>
              <span>2,500</span>
              <span>5,000+ Guests</span>
            </div>
          </div>

          {/* 3. Optional Extras */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink-700 mb-2">
              3. Select Optional Add-ons & Live Stations
            </label>
            <div className="space-y-2">
              {EXTRAS.map((extra) => {
                const isChecked = selectedExtras.includes(extra.id);
                return (
                  <label
                    key={extra.id}
                    onClick={() => toggleExtra(extra.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer text-xs transition-colors ${
                      isChecked
                        ? "border-brand-500 bg-brand-50/40 text-ink-950"
                        : "border-ink-200 text-ink-700 hover:bg-ink-50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                          isChecked ? "bg-brand-500 border-brand-500 text-white" : "border-ink-300"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                      <span className="font-medium">{extra.name}</span>
                    </div>
                    <span className="font-semibold text-brand-600 shrink-0 ml-2">
                      {extra.pricePerHead
                        ? `+${formatCurrency(extra.pricePerHead)}/head`
                        : `+${formatCurrency(extra.fixedPrice || 0)}`}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="lg:col-span-5 bg-ink-950 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
          <div className="border-b border-ink-800 pb-4">
            <span className="text-[10px] uppercase font-bold text-brand-400 tracking-wider">
              Estimate Summary
            </span>
            <h4 className="font-display font-black text-xl uppercase tracking-wider text-white mt-1">
              {selectedPkg.name}
            </h4>
            <p className="text-xs text-ink-400 mt-1">
              For {guests} guests ({formatCurrency(selectedPkg.pricePerHead)} / head base)
            </p>
          </div>

          {/* Itemized list */}
          <div className="space-y-3 text-xs text-ink-300 border-b border-ink-800 pb-4">
            <div className="flex justify-between">
              <span>Base Menu Package ({guests} &times; {formatCurrency(selectedPkg.pricePerHead)})</span>
              <span className="font-semibold text-white">{formatCurrency(baseCost)}</span>
            </div>
            {extrasCost > 0 && (
              <div className="flex justify-between">
                <span>Selected Extras & Stations</span>
                <span className="font-semibold text-white">{formatCurrency(extrasCost)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Estimated Govt. VAT (5%)</span>
              <span className="font-semibold text-white">{formatCurrency(Math.round(vat))}</span>
            </div>
          </div>

          {/* Grand Total */}
          <div className="pt-1">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-400">
                Estimated Total:
              </span>
              <div className="text-right">
                <span className="font-display font-black text-3xl sm:text-4xl text-brand-400">
                  {formatCurrency(Math.round(total))}
                </span>
                <p className="text-[10px] text-ink-400 mt-0.5">Approx. {formatCurrency(Math.round(total / guests))} per person net</p>
              </div>
            </div>
          </div>

          <Button
            size="lg"
            variant="primary"
            withArrow
            onClick={handleRequestQuote}
            className="w-full"
          >
            Request This Quote &rarr;
          </Button>

          <p className="text-[10px] text-ink-500 text-center leading-relaxed">
            *Final quote will be finalized after menu customization, date reservation, and venue confirmation.
          </p>
        </div>
      </div>
    </div>
  );
}

