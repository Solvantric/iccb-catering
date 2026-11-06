"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { DatePicker } from "@/components/ui/DatePicker";
import { CheckCircle2, Mail } from "lucide-react";

const enquirySchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  eventType: z.string().min(1, "Please select an event type"),
  approxGuests: z.coerce.number().min(1, "Please enter approximate guest count"),
  preferredDate: z.string().min(5, "Please select a preferred date"),
  venue: z.string().min(1, "Please select a venue / hall"),
  message: z.string().optional(),
});

export type EnquiryFormValues = z.infer<typeof enquirySchema>;

const eventTypeOptions = [
  { value: "Wedding", label: "Wedding" },
  { value: "Fair & Exhibitions", label: "Fair & Exhibitions" },
  { value: "Corporate Events", label: "Corporate Events" },
  { value: "Cultural Events", label: "Cultural Events" },
  { value: "Exams", label: "Exams" },
  { value: "Trainings & Seminars", label: "Trainings & Seminars" },
  { value: "Convocations", label: "Convocations" },
  { value: "Fashion Shows", label: "Fashion Shows" },
];

const venueOptions = [
  { value: "Gulnaksha (Hall-1)", label: "Gulnaksha (Hall-1)" },
  { value: "Pushpoguchcho (Hall-2)", label: "Pushpoguchcho (Hall-2)" },
  { value: "Rajdarshan (Hall-3)", label: "Rajdarshan (Hall-3)" },
  { value: "Noboratri (Hall-4)", label: "Noboratri (Hall-4)" },
  { value: "Pushpanjali (Hall-5)", label: "Pushpanjali (Hall-5)" },
  { value: "Seminar Hall (Hall-6)", label: "Seminar Hall (Hall-6)" },
  { value: "Expo Village", label: "Expo Village" },
  { value: "Heritage Restaurant Venues", label: "ICCB Heritage Restaurant Venues" },
];

export function EnquiryForm({
  defaultVenue = "",
  defaultEventType = "",
}: {
  defaultVenue?: string;
  defaultEventType?: string;
}) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema) as any,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      eventType: defaultEventType || "Wedding",
      approxGuests: 200,
      preferredDate: "",
      venue: defaultVenue || "Gulnaksha (Hall-1)",
      message: "",
    },
  });

  const preferredDate = watch("preferredDate");

  const onSubmit = (data: EnquiryFormValues) => {
    const subject = encodeURIComponent(`Event Booking Enquiry: ${data.eventType} - ${data.name}`);
    const bodyText = `Dear ICCB Booking Team,

I would like to inquire about booking an event at ICCB:

- Full Name: ${data.name}
- Email: ${data.email}
- Phone: ${data.phone}
- Event Type: ${data.eventType}
- Venue Preference: ${data.venue}
- Estimated Guests: ${data.approxGuests}
- Preferred Date: ${data.preferredDate}

Additional Notes:
${data.message || "N/A"}

Thank you.`;

    const mailtoUrl = `mailto:iccb@bga-bd.com?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-8 border border-rule bg-paper-2 text-ink text-left space-y-4">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-accent" />
          <h4 className="font-serif italic text-2xl">Enquiry Drafted</h4>
        </div>
        <p className="text-sm text-ink-soft leading-relaxed">
          Your email application has opened with your booking details addressed to <strong>iccb@bga-bd.com</strong>.
          Please press <strong>Send</strong> in your mail client to dispatch your request directly to our booking desk.
        </p>
        <p className="text-xs text-ink-soft">
          Need immediate assistance? You may also call our hotline directly at <strong>+88-01991-197719</strong>.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="text-xs font-mono tracking-wider uppercase underline underline-offset-4 hover:text-accent"
          >
            Submit Another Enquiry &rarr;
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Your Name *"
          placeholder="e.g. Dr. Sadman Chowdhury"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Email Address *"
          type="email"
          placeholder="e.g. sadman@example.com"
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Contact Phone *"
          placeholder="e.g. +8801711223344"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <Input
          label="Approximate Guests *"
          type="number"
          placeholder="e.g. 500"
          error={errors.approxGuests?.message}
          {...register("approxGuests")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Event Type *"
          options={eventTypeOptions}
          error={errors.eventType?.message}
          {...register("eventType")}
        />
        <Select
          label="Venue Preference *"
          options={venueOptions}
          error={errors.venue?.message}
          {...register("venue")}
        />
      </div>

      <div>
        <DatePicker
          label="Preferred Event Date *"
          value={preferredDate}
          onChange={(val) => setValue("preferredDate", val, { shouldValidate: true })}
          error={errors.preferredDate?.message}
        />
      </div>

      <div>
        <Textarea
          label="Additional Details & Requirements"
          rows={4}
          placeholder="Specify stage setup, dining arrangements, or scheduling constraints..."
          error={errors.message?.message}
          {...register("message")}
        />
      </div>

      <div className="pt-2">
        <Button type="submit" size="lg" className="w-full sm:w-auto">
          Send Enquiry &rarr;
        </Button>
      </div>
    </form>
  );
}

