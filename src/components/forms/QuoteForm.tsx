"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { DatePicker } from "@/components/ui/DatePicker";
import { leadService } from "@/services/leadService";
import { useUIStore } from "@/store/uiStore";
import { track } from "@/lib/analytics";
import { toast } from "sonner";
import {
  CheckCircle2,
  User,
  Calendar,
  Utensils,
  CreditCard,
  Copy,
  Check,
  ShieldCheck,
  Smartphone,
  BadgeAlert,
} from "lucide-react";

const quoteSchema = z.object({
  // Step 1: Contact
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Valid email address required"),
  phone: z.string().min(10, "Valid phone number required"),
  companyName: z.string().optional(),
  city: z.string().min(2, "City is required"),

  // Step 2: Event Details
  eventType: z.string().min(1, "Please choose an event type"),
  eventDate: z.string().min(5, "Preferred event date required (DD/MM/YYYY)"),
  guestCount: z.coerce.number().min(30, "Minimum 30 guests required"),
  venue: z.string().min(1, "Please specify venue or hall"),

  // Step 3: Menu & Budget
  cuisinePreference: z.string().min(1, "Please select preferred cuisine"),
  packagePreference: z.string().optional(),
  budgetRange: z.string().optional(),
  customDishes: z.string().optional(),
  specialNotes: z.string().optional(),
  message: z.string().optional(),

  // Step 4: Review & Payment (bKash)
  bkashNumber: z.string().min(11, "Valid 11-digit bKash sender number required (e.g. 01712345678)"),
  trxId: z.string().min(6, "Valid bKash Transaction ID required (e.g. BKG89123XZ)"),
  advanceAmount: z.coerce.number().min(5000, "Minimum advance booking amount is ৳5,000"),

  // Honeypot field for spam prevention
  honeypot: z.string().max(0, "Spam detected").optional(),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

const eventTypes = [
  { value: "Wedding Reception", label: "Wedding Reception" },
  { value: "Holud & Mehendi", label: "Holud & Mehendi Night" },
  { value: "Corporate AGM & Dinner", label: "Corporate AGM & Dinner" },
  { value: "Conference & Summit", label: "Conference & Summit" },
  { value: "Birthday / Private Party", label: "Birthday / Private Party" },
  { value: "Executive Lunch Box", label: "Executive Lunch Box (Bulk)" },
  { value: "Other Function", label: "Other Function" },
];

const venueOptions = [
  { value: "ICCB Hall 1 (Gulnaksha)", label: "ICCB Hall 1 (Gulnaksha)" },
  { value: "ICCB Hall 2 (Pushpaguchha)", label: "ICCB Hall 2 (Pushpaguchha)" },
  { value: "ICCB Hall 3 (Rajdarshan)", label: "ICCB Hall 3 (Rajdarshan)" },
  { value: "ICCB Hall 4 (Naboratna)", label: "ICCB Hall 4 (Naboratna)" },
  { value: "Outside ICCB (Private Residence/Office)", label: "Outside ICCB (Private Residence / Office / Lawn)" },
  { value: "Other External Convention Hall", label: "Other External Convention Hall" },
];

const cuisineOptions = [
  { value: "Traditional Mughal", label: "Traditional Mughal (Kacchi, Rezala, Roast)" },
  { value: "Continental", label: "Continental (Salmon, Steaks, Pastas)" },
  { value: "Multi-Cuisine Fusion", label: "Multi-Cuisine Fusion (Chinese, Grills & Bengali)" },
  { value: "Traditional Bengali", label: "Traditional Bengali (Polao, Bhuna, Fish)" },
  { value: "Custom Bespoke Menu", label: "Custom Bespoke Menu" },
];

const budgetOptions = [
  { value: "৳2,00,000 - ৳5,00,000", label: "৳2,00,000 - ৳5,00,000" },
  { value: "৳5,00,000 - ৳10,00,000", label: "৳5,00,000 - ৳10,00,000" },
  { value: "৳10,00,000 - ৳20,00,000", label: "৳10,00,000 - ৳20,00,000" },
  { value: "৳20,00,000+", label: "৳20,00,000+" },
];

const ICCB_BKASH_NUMBER = "01991-197719";

export function QuoteForm() {
  const router = useRouter();
  const { quoteDraft, clearQuoteDraft, locale } = useUIStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedBkash, setCopiedBkash] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema) as any,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      companyName: "",
      city: "Dhaka",
      eventType: quoteDraft.eventType || "Wedding Reception",
      eventDate: quoteDraft.eventDate || "15/12/2026",
      guestCount: quoteDraft.guestCount || 250,
      venue: quoteDraft.venue || "ICCB Hall 1 (Gulnaksha)",
      cuisinePreference: "Traditional Mughal",
      packagePreference: quoteDraft.packageName || "Royal Mughal Wedding Feast",
      budgetRange: "৳5,00,000 - ৳10,00,000",
      customDishes: "",
      specialNotes: "",
      message: "",
      bkashNumber: "",
      trxId: "",
      advanceAmount: 20000,
      honeypot: "",
    },
  });

  const formValues = watch();

  const copyBkash = () => {
    navigator.clipboard.writeText("01991197719");
    setCopiedBkash(true);
    toast.success("ICCB Official bKash Number (01991197719) copied to clipboard!");
    setTimeout(() => setCopiedBkash(false), 2500);
  };

  const handleNext = async () => {
    let isValid = false;
    if (currentStep === 1) {
      isValid = await trigger(["name", "email", "phone", "city"]);
    } else if (currentStep === 2) {
      isValid = await trigger(["eventType", "eventDate", "guestCount", "venue"]);
    } else if (currentStep === 3) {
      isValid = await trigger(["cuisinePreference"]);
    }

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: QuoteFormValues) => {
    // If not on step 4 yet, do NOT submit; advance to next step
    if (currentStep < 4) {
      await handleNext();
      return;
    }

    if (data.honeypot) return; // Silent discard for bot

    // Validate step 4 bKash fields explicitly
    const isStep4Valid = await trigger(["bkashNumber", "trxId", "advanceAmount"]);
    if (!isStep4Valid) {
      toast.error("Please enter valid bKash number, Transaction ID, and advance amount.");
      return;
    }

    setIsSubmitting(true);
    try {
      await leadService.create({
        name: data.name,
        email: data.email,
        phone: data.phone,
        companyName: data.companyName,
        city: data.city,
        eventType: data.eventType,
        venue: data.venue,
        guestCount: Number(data.guestCount),
        eventDate: data.eventDate,
        cuisinePreference: data.cuisinePreference,
        packagePreference: data.packagePreference,
        budgetRange: data.budgetRange,
        message: [
          data.customDishes ? `[Custom Dish Items: ${data.customDishes}]` : "",
          data.specialNotes ? `[Inquiry / Chef Notes: ${data.specialNotes}]` : "",
          data.message,
        ]
          .filter(Boolean)
          .join("\n\n"),
        bkashNumber: data.bkashNumber,
        trxId: data.trxId,
        advanceAmount: Number(data.advanceAmount),
        type: "booking",
        status: "New",
        isSample: false,
      });

      track("booking_submitted", {
        eventType: data.eventType,
        guestCount: data.guestCount,
        venue: data.venue,
        advanceAmount: data.advanceAmount,
      });

      clearQuoteDraft();
      toast.success(
        locale === "bn"
          ? "আপনার ক্যাটারিং বুকিং ও বিকাশ পেমেন্ট তথ্য সফলভাবে গ্রহণ করা হয়েছে!"
          : "Catering booking and bKash payment submitted! Our banquet manager will verify your TrxID and contact you immediately."
      );
      router.push("/thank-you");
    } catch (err) {
      toast.error("Failed to submit booking request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { num: 1, label: locale === "bn" ? "যোগাযোগের বিবরণ" : "Contact Details", icon: <User className="w-4 h-4" /> },
    { num: 2, label: locale === "bn" ? "ইভেন্ট তথ্য" : "Event Logistics", icon: <Calendar className="w-4 h-4" /> },
    { num: 3, label: locale === "bn" ? "মেনু ও পছন্দ" : "Menu & Cuisine", icon: <Utensils className="w-4 h-4" /> },
    { num: 4, label: locale === "bn" ? "রিভিউ ও পেমেন্ট" : "Review & Payment", icon: <CreditCard className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-ink-100 shadow-soft max-w-3xl mx-auto text-left">
      {/* Progress Bar Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((s) => (
            <div
              key={s.num}
              className={`flex items-center gap-2 ${
                s.num === currentStep
                  ? "text-brand-500 font-bold"
                  : s.num < currentStep
                  ? "text-emerald-600 font-medium"
                  : "text-ink-400 font-medium"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-display font-bold transition-colors ${
                  s.num === currentStep
                    ? "bg-brand-500 text-white shadow-floating"
                    : s.num < currentStep
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-ink-100 text-ink-500"
                }`}
              >
                {s.num < currentStep ? "✓" : s.num}
              </div>
              <span className="hidden sm:inline text-xs uppercase tracking-wider font-semibold">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Linear Progress Fill */}
        <div className="w-full bg-ink-100 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-brand-500 h-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Body - with Enter key interception to prevent premature submission */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && currentStep < 4) {
            e.preventDefault();
            handleNext();
          }
        }}
        className="space-y-6"
      >
        {/* Hidden Honeypot */}
        <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />

        {/* STEP 1: Contact Details */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in">
            <h4 className="font-display font-black text-lg uppercase tracking-wider text-ink-950 mb-3">
              {locale === "bn" ? "ধাপ ১: আপনার যোগাযোগের তথ্য" : "Step 1: Your Contact Information"}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label={locale === "bn" ? "পূর্ণ নাম *" : "Full Name *"}
                placeholder="e.g. Mahmudur Rahman"
                error={errors.name?.message}
                {...register("name")}
              />
              <Input
                label={locale === "bn" ? "ইমেইল ঠিকানা *" : "Email Address *"}
                type="email"
                placeholder="e.g. mahmud@example.com"
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                label={locale === "bn" ? "মোবাইল নম্বর *" : "Phone / Mobile Number *"}
                placeholder="e.g. 01711223344"
                error={errors.phone?.message}
                {...register("phone")}
              />
              <Input
                label={locale === "bn" ? "প্রতিষ্ঠান / পরিবারের নাম" : "Company / Organization Name"}
                placeholder="e.g. Grameenphone or Family"
                {...register("companyName")}
              />
              <div className="sm:col-span-2">
                <Input
                  label={locale === "bn" ? "শহর *" : "City *"}
                  placeholder="e.g. Dhaka"
                  error={errors.city?.message}
                  {...register("city")}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Event Details */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in">
            <h4 className="font-display font-black text-lg uppercase tracking-wider text-ink-950 mb-3">
              {locale === "bn" ? "ধাপ ২: ইভেন্ট ও ভেন্যু বিবরণ" : "Step 2: Event Logistics & Schedule"}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label={locale === "bn" ? "অনুষ্ঠানের ধরন *" : "Event Type *"}
                options={eventTypes}
                error={errors.eventType?.message}
                {...register("eventType")}
              />
              <div>
                <DatePicker
                  label={locale === "bn" ? "অনুষ্ঠানের সম্ভাব্য তারিখ (DD/MM/YYYY) *" : "Preferred Event Date (DD/MM/YYYY) *"}
                  value={formValues.eventDate}
                  onChange={(date) => setValue("eventDate", date)}
                  error={errors.eventDate?.message}
                />
              </div>
              <Input
                label={locale === "bn" ? "অতিথির সংখ্যা *" : "Expected Guest Attendance *"}
                type="number"
                min="30"
                placeholder="e.g. 500"
                error={errors.guestCount?.message}
                {...register("guestCount")}
              />
              <Select
                label={locale === "bn" ? "পছন্দের কনভেনশন হল / ভেন্যু *" : "Proposed Venue / Hall *"}
                options={venueOptions}
                error={errors.venue?.message}
                {...register("venue")}
              />
            </div>
          </div>
        )}

        {/* STEP 3: Menu & Cuisine */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-in fade-in">
            <div>
              <h4 className="font-display font-black text-lg uppercase tracking-wider text-ink-950">
                {locale === "bn" ? "ধাপ ৩: খাবারের মেনু ও কাস্টমাইজেশন" : "Step 3: Menu & Cuisine Selection"}
              </h4>
              <p className="text-xs text-ink-500 mt-0.5">
                {locale === "bn"
                  ? "পছন্দের কুইজিন নির্বাচন করুন এবং আপনার পছন্দমতো যেকোনো কাস্টম আইটেম যোগ করুন।"
                  : "Choose your preferred banquet cuisine and personalize with any custom dishes or inquiries."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label={locale === "bn" ? "পছন্দের খাবার ধরন *" : "Cuisine Preference *"}
                options={cuisineOptions}
                error={errors.cuisinePreference?.message}
                {...register("cuisinePreference")}
              />
              <Select
                label={locale === "bn" ? "আনুমানিক বাজেট পরিসর" : "Estimated Catering Budget"}
                options={budgetOptions}
                {...register("budgetRange")}
              />
              <div className="sm:col-span-2">
                <Input
                  label={locale === "bn" ? "বাছাইকৃত প্যাকেজের নাম" : "Selected Banquet Package"}
                  placeholder="e.g. Royal Mughal Wedding Feast"
                  {...register("packagePreference")}
                />
              </div>

              {/* Dedicated Customization Section */}
              <div className="sm:col-span-2 p-4 rounded-2xl bg-brand-50/60 border border-brand-100 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                    {locale === "bn" ? "কাস্টম খাবারের আইটেম যোগ করুন" : "Custom Dish Customization"}
                  </span>
                </div>
                <p className="text-[11px] text-ink-500">
                  {locale === "bn"
                    ? "মেন্যুর বাইরে কোনো নির্দিষ্ট খাবার বা বিশেষ পদ যোগ করতে চাইলে এখানে উল্লেখ করুন।"
                    : "Add any specific food items, live counters, or signature dishes you wish to include in your menu."}
                </p>
                <Textarea
                  placeholder={
                    locale === "bn"
                      ? "যেমন: অতিরিক্ত জাফরানি কাচ্চি, স্পেশাল খাসির রেজালা, লাইভ জিলাপি কাউন্টার, বোরহানি..."
                      : "e.g. Extra saffron Shahi Kacchi, Live Jalebi counter, Special Borhani, Fish Tikka, kids meal..."
                  }
                  rows={3}
                  {...register("customDishes")}
                />
              </div>

              {/* Dedicated Inquiries & Notes Section */}
              <div className="sm:col-span-2 p-4 rounded-2xl bg-ink-50/80 border border-ink-200/80 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-ink-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-ink-800">
                    {locale === "bn" ? "বিশেষ জিজ্ঞাসা ও নির্দেশনা (Inquiry & Notes)" : "Special Inquiry & Chef Notes"}
                  </span>
                </div>
                <p className="text-[11px] text-ink-500">
                  {locale === "bn"
                    ? "অনুষ্ঠানের সময়সূচি, স্পাইস লেভেল, অ্যালার্জি বা শেফের সাথে পরামর্শের কোনো প্রশ্ন থাকলে লিখুন।"
                    : "Any questions about spice levels, slaughterhouse hygiene, dining setup, or dietary restrictions."}
                </p>
                <Textarea
                  placeholder={
                    locale === "bn"
                      ? "আপনার কোনো প্রশ্ন বা বিশেষ নির্দেশনা থাকলে এখানে বিস্তারিত জানান..."
                      : "e.g. We require mild spice for children, VIP stage dining table service, inquiries about guest entry timing..."
                  }
                  rows={3}
                  {...register("specialNotes")}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Review and Payment */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="border-b border-ink-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
                {locale === "bn" ? "চূড়ান্ত পর্যালোচনা ও অগ্রিম বুকিং" : "Final Step: Review & Confirmation"}
              </span>
              <h4 className="font-display font-black text-2xl uppercase tracking-tight text-ink-950 mt-1">
                {locale === "bn" ? "রিভিউ ও পেমেন্ট (Review & Payment)" : "Review & Payment"}
              </h4>
              <p className="text-xs text-ink-500 mt-1">
                {locale === "bn"
                  ? "আপনার ইভেন্টের বিবরণ পর্যালোচনা করুন এবং তারিখ লক করতে বিকাশ অ্যাকাউন্টে অগ্রিম টোকেন পেমেন্ট জমা দিন।"
                  : "Please review your banquet reservation summary and submit your bKash advance token deposit to lock the event date."}
              </p>
            </div>

            {/* Order Review Card */}
            <div className="bg-ink-50/70 p-5 sm:p-6 rounded-2xl border border-ink-200/80 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-ink-200">
                <div>
                  <span className="text-ink-400 font-semibold uppercase text-[10px] tracking-wider block">
                    {locale === "bn" ? "গ্রাহকের নাম" : "Client Name"}
                  </span>
                  <span className="font-bold text-ink-950 text-sm">{formValues.name || "N/A"}</span>
                  {formValues.companyName && (
                    <span className="text-ink-500 block text-xs">{formValues.companyName}</span>
                  )}
                </div>
                <div>
                  <span className="text-ink-400 font-semibold uppercase text-[10px] tracking-wider block">
                    {locale === "bn" ? "মোবাইল ও ইমেইল" : "Contact Information"}
                  </span>
                  <span className="font-bold text-ink-950 text-sm">{formValues.phone}</span>
                  <span className="text-ink-500 block text-xs">{formValues.email} • {formValues.city}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-ink-200">
                <div>
                  <span className="text-ink-400 font-semibold uppercase text-[10px] tracking-wider block">
                    {locale === "bn" ? "অনুষ্ঠানের ধরন" : "Event Type"}
                  </span>
                  <span className="font-bold text-ink-900">{formValues.eventType}</span>
                </div>
                <div>
                  <span className="text-ink-400 font-semibold uppercase text-[10px] tracking-wider block">
                    {locale === "bn" ? "অনুষ্ঠানের তারিখ" : "Event Date"}
                  </span>
                  <span className="font-bold text-brand-600">{formValues.eventDate}</span>
                </div>
                <div>
                  <span className="text-ink-400 font-semibold uppercase text-[10px] tracking-wider block">
                    {locale === "bn" ? "অতিথির সংখ্যা" : "Guest Attendance"}
                  </span>
                  <span className="font-bold text-ink-900">{formValues.guestCount} Persons</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-ink-400 font-semibold uppercase text-[10px] tracking-wider block">
                    {locale === "bn" ? "ভেন্যু / কনভেনশন হল" : "Venue / Hall"}
                  </span>
                  <span className="font-bold text-ink-900">{formValues.venue}</span>
                </div>
                <div>
                  <span className="text-ink-400 font-semibold uppercase text-[10px] tracking-wider block">
                    {locale === "bn" ? "খাবারের মেনু ও প্যাকেজ" : "Selected Menu"}
                  </span>
                  <span className="font-bold text-ink-900">
                    {formValues.cuisinePreference}
                    {formValues.packagePreference ? ` • ${formValues.packagePreference}` : ""}
                  </span>
                </div>
              </div>

              {formValues.customDishes && (
                <div className="pt-2 border-t border-ink-200">
                  <span className="text-brand-600 font-semibold uppercase text-[10px] tracking-wider block">
                    {locale === "bn" ? "কাস্টম খাবারের আইটেম" : "Custom Dish Additions"}
                  </span>
                  <p className="text-ink-900 font-medium">{formValues.customDishes}</p>
                </div>
              )}

              {formValues.specialNotes && (
                <div className="pt-2 border-t border-ink-200">
                  <span className="text-ink-500 font-semibold uppercase text-[10px] tracking-wider block">
                    {locale === "bn" ? "বিশেষ জিজ্ঞাসা ও শেফের নোট" : "Special Inquiry & Chef Notes"}
                  </span>
                  <p className="text-ink-700 italic">{formValues.specialNotes}</p>
                </div>
              )}

              {formValues.message && (
                <div className="pt-2 border-t border-ink-200">
                  <span className="text-ink-400 font-semibold uppercase text-[10px] tracking-wider block">
                    {locale === "bn" ? "অন্যান্য নির্দেশনা" : "Additional Notes"}
                  </span>
                  <p className="text-ink-700 italic">{formValues.message}</p>
                </div>
              )}
            </div>

            {/* bKash Payment Module */}
            <div className="rounded-2xl p-6 border-2 border-[#E2136E]/30 bg-gradient-to-br from-[#FFF0F5] to-white space-y-5 shadow-sm">
              {/* bKash Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E2136E]/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E2136E] text-white flex items-center justify-center font-black text-xs shadow-md">
                    bKash
                  </div>
                  <div>
                    <h5 className="font-display font-black text-base uppercase text-ink-950 tracking-wide">
                      {locale === "bn" ? "বিকাশ অগ্রিম বুকিং পেমেন্ট" : "bKash Advance Token Deposit"}
                    </h5>
                    <p className="text-[11px] text-ink-600">
                      {locale === "bn"
                        ? "তারিখ নিশ্চিত করতে অফিশিয়াল মার্চেন্ট নম্বরে পেমেন্ট করুন"
                        : "Official ICCB Convention City Bashundhara Merchant Account"}
                    </p>
                  </div>
                </div>

                {/* ICCB Merchant Number Badge with Copy */}
                <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-[#E2136E]/30 shadow-sm">
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-bold text-ink-400 block leading-tight">
                      Merchant bKash
                    </span>
                    <span className="font-mono font-bold text-sm text-[#E2136E]">
                      {ICCB_BKASH_NUMBER}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={copyBkash}
                    className="p-1.5 rounded-lg bg-pink-50 hover:bg-pink-100 text-[#E2136E] transition-colors ml-1"
                    title="Copy bKash Number"
                  >
                    {copiedBkash ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Instructions Guide */}
              <div className="bg-white/80 p-3.5 rounded-xl border border-pink-100 text-xs text-ink-700 space-y-1.5">
                <span className="font-bold uppercase tracking-wider text-[10px] text-[#E2136E] block">
                  {locale === "bn" ? "পেমেন্ট নির্দেশনাবলী:" : "Quick 3-Step Payment Guide:"}
                </span>
                <ol className="list-decimal list-inside space-y-1 text-[11px] leading-relaxed text-ink-600">
                  <li>
                    {locale === "bn"
                      ? "আপনার বিকাশ অ্যাপে যান অথবা *২৪৭# ডায়াল করে Make Payment সিলেক্ট করুন।"
                      : "Open your bKash App & tap Make Payment (or Send Money to 01991-197719)."}
                  </li>
                  <li>
                    {locale === "bn"
                      ? "মার্চেন্ট নম্বর 01991-197719 দিন এবং অগ্রিম টোকেন (৳২০,০০০) প্রদান করুন।"
                      : "Enter Merchant Number 01991-197719 and your advance token deposit."}
                  </li>
                  <li>
                    {locale === "bn"
                      ? "পেমেন্ট সফল হলে প্রাপ্ত Transaction ID (TrxID) নিচে লিখে নিশ্চিত করুন।"
                      : "Copy the Transaction ID (TrxID) from your bKash SMS and fill below."}
                  </li>
                </ol>
              </div>

              {/* bKash Payment Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div>
                  <Input
                    label={locale === "bn" ? "আপনার বিকাশ নম্বর *" : "Your bKash Number *"}
                    placeholder="e.g. 01712345678"
                    error={errors.bkashNumber?.message}
                    {...register("bkashNumber")}
                  />
                </div>
                <div>
                  <Input
                    label={locale === "bn" ? "ট্রানজেকশন আইডি *" : "Transaction ID *"}
                    placeholder="e.g. BKG89123XZ"
                    error={errors.trxId?.message}
                    {...register("trxId")}
                  />
                </div>
                <div>
                  <Input
                    label={locale === "bn" ? "অগ্রিম টাকার পরিমাণ (৳) *" : "Advance Amount (BDT ৳) *"}
                    type="number"
                    min="5000"
                    placeholder="e.g. 20000"
                    error={errors.advanceAmount?.message}
                    {...register("advanceAmount")}
                  />
                </div>
              </div>

              {/* Security badge */}
              <div className="flex items-center gap-2 text-[11px] text-ink-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {locale === "bn"
                    ? "১০০% নিরাপদ। পেমেন্ট যাচাইকরণের সাথে সাথে আনুষ্ঠানিক মানি রিসিট ইস্যু করা হবে।"
                    : "100% verified. Official ICCB money receipt with booking voucher will be issued immediately upon verification."}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-ink-100">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="px-5 py-2.5 text-xs font-semibold text-ink-600 hover:text-ink-900 border border-ink-200 rounded-lg hover:bg-ink-50 transition-colors"
            >
              &larr; {locale === "bn" ? "পূর্ববর্তী ধাপ" : "Back"}
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <Button type="button" onClick={handleNext} variant="primary" withArrow>
              {locale === "bn" ? `ধাপ ${currentStep + 1}-এ যান` : `Continue to Step ${currentStep + 1}`}
            </Button>
          ) : (
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              withArrow
              size="lg"
              className="bg-brand-500 hover:bg-brand-600 shadow-lg text-sm uppercase tracking-wider font-bold py-3.5 px-6"
            >
              {locale === "bn" ? "ক্যাটারিং বুকিং ও বিকাশ পেমেন্ট নিশ্চিত করুন" : "Confirm Catering Booking & bKash Advance"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
