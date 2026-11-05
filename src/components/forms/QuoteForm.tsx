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
import { CheckCircle2, User, Calendar, Utensils, ClipboardCheck } from "lucide-react";

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
  message: z.string().optional(),

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

export function QuoteForm() {
  const router = useRouter();
  const { quoteDraft, clearQuoteDraft } = useUIStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      message: "",
      honeypot: "",
    },
  });

  const formValues = watch();

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
    if (data.honeypot) return; // Silent discard for bot

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
        message: data.message,
        type: "quote",
        status: "New",
        isSample: false,
      });

      track("quote_submitted", {
        eventType: data.eventType,
        guestCount: data.guestCount,
        venue: data.venue,
      });

      clearQuoteDraft();
      toast.success("Quote request submitted successfully!");
      router.push("/thank-you");
    } catch (err) {
      toast.error("Failed to submit quote request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { num: 1, label: "Contact Details", icon: <User className="w-4 h-4" /> },
    { num: 2, label: "Event Logistics", icon: <Calendar className="w-4 h-4" /> },
    { num: 3, label: "Menu & Cuisine", icon: <Utensils className="w-4 h-4" /> },
    { num: 4, label: "Review & Submit", icon: <ClipboardCheck className="w-4 h-4" /> },
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
              <span className="hidden sm:inline text-xs uppercase tracking-wider">
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

      {/* Form Body */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Hidden Honeypot */}
        <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />

        {/* STEP 1: Contact Details */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in">
            <h4 className="font-display font-black text-lg uppercase tracking-wider text-ink-950 mb-3">
              Step 1: Your Contact Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name *"
                placeholder="e.g. Mahmudur Rahman"
                error={errors.name?.message}
                {...register("name")}
              />
              <Input
                label="Email Address *"
                type="email"
                placeholder="e.g. mahmud@example.com"
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                label="Phone Number *"
                placeholder="e.g. +8801711223344"
                error={errors.phone?.message}
                {...register("phone")}
              />
              <Input
                label="Company / Organization Name"
                placeholder="e.g. Grameenphone or Family"
                {...register("companyName")}
              />
              <div className="sm:col-span-2">
                <Input
                  label="City *"
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
              Step 2: Event Logistics & Schedule
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Event Type *"
                options={eventTypes}
                error={errors.eventType?.message}
                {...register("eventType")}
              />
              <div>
                <DatePicker
                  label="Preferred Event Date (DD/MM/YYYY) *"
                  value={formValues.eventDate}
                  onChange={(date) => setValue("eventDate", date)}
                  error={errors.eventDate?.message}
                />
              </div>
              <Input
                label="Expected Guest Attendance *"
                type="number"
                min="30"
                placeholder="e.g. 500"
                error={errors.guestCount?.message}
                {...register("guestCount")}
              />
              <Select
                label="Proposed Venue / Hall *"
                options={venueOptions}
                error={errors.venue?.message}
                {...register("venue")}
              />
            </div>
          </div>
        )}

        {/* STEP 3: Menu & Budget */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-in fade-in">
            <h4 className="font-display font-black text-lg uppercase tracking-wider text-ink-950 mb-3">
              Step 3: Cuisine Preference & Budget
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Cuisine Preference *"
                options={cuisineOptions}
                error={errors.cuisinePreference?.message}
                {...register("cuisinePreference")}
              />
              <Select
                label="Estimated Catering Budget"
                options={budgetOptions}
                {...register("budgetRange")}
              />
              <div className="sm:col-span-2">
                <Input
                  label="Selected Menu Package"
                  placeholder="e.g. Royal Mughal Wedding Feast"
                  {...register("packagePreference")}
                />
              </div>
              <div className="sm:col-span-2">
                <Textarea
                  label="Special Requirements / Live Stations / Dietary Needs"
                  placeholder="Tell us if you need live jalebi counters, tea bar, VIP table service, kids menu, etc."
                  {...register("message")}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Review & Submit */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in">
            <h4 className="font-display font-black text-lg uppercase tracking-wider text-ink-950 mb-2">
              Step 4: Review Your Quotation Request
            </h4>
            <div className="bg-ink-50 p-6 rounded-2xl border border-ink-200 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-ink-200">
                <div>
                  <span className="text-ink-400 font-semibold uppercase block">Client Name</span>
                  <span className="font-bold text-ink-950 text-sm">{formValues.name}</span>
                </div>
                <div>
                  <span className="text-ink-400 font-semibold uppercase block">Contact</span>
                  <span className="font-bold text-ink-950 text-sm">{formValues.phone} | {formValues.email}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-ink-200">
                <div>
                  <span className="text-ink-400 font-semibold uppercase block">Event Type</span>
                  <span className="font-bold text-ink-900">{formValues.eventType}</span>
                </div>
                <div>
                  <span className="text-ink-400 font-semibold uppercase block">Event Date</span>
                  <span className="font-bold text-brand-600">{formValues.eventDate}</span>
                </div>
                <div>
                  <span className="text-ink-400 font-semibold uppercase block">Guest Count</span>
                  <span className="font-bold text-ink-900">{formValues.guestCount} Guests</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-ink-400 font-semibold uppercase block">Venue</span>
                  <span className="font-bold text-ink-900">{formValues.venue}</span>
                </div>
                <div>
                  <span className="text-ink-400 font-semibold uppercase block">Cuisine & Package</span>
                  <span className="font-bold text-ink-900">
                    {formValues.cuisinePreference} ({formValues.packagePreference})
                  </span>
                </div>
              </div>

              {formValues.message && (
                <div className="pt-2">
                  <span className="text-ink-400 font-semibold uppercase block">Notes</span>
                  <p className="text-ink-700 italic">{formValues.message}</p>
                </div>
              )}
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
              &larr; Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <Button type="button" onClick={handleNext} variant="primary" withArrow>
              Continue to Step {currentStep + 1}
            </Button>
          ) : (
            <Button type="submit" variant="primary" isLoading={isSubmitting} withArrow size="lg">
              Submit Quotation Request
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
