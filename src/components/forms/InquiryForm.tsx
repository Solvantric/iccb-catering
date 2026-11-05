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
import { toast } from "sonner";

const inquirySchema = z.object({
  name: z.string().min(2, "Full Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Phone number required"),
  companyName: z.string().optional(),
  city: z.string().min(2, "City is required"),
  guestCount: z.coerce.number().min(20, "Expected attendance required"),
  eventDate: z.string().min(5, "Preferred date required (DD/MM/YYYY)"),
  eventType: z.string().min(1, "Event type is required"),
  venue: z.string().optional(),
  budgetRange: z.string().optional(),
  cuisinePreference: z.string().optional(),
  message: z.string().optional(),
  honeypot: z.string().max(0).optional(),
});

type InquiryFormValues = z.infer<typeof inquirySchema>;

export function InquiryForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema) as any,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      companyName: "",
      city: "Dhaka",
      guestCount: 200,
      eventDate: "15/12/2026",
      eventType: "Wedding Reception",
      venue: "ICCB Hall 1",
      budgetRange: "৳5,00,000 - ৳10,00,000",
      cuisinePreference: "Traditional Mughal",
      message: "",
    },
  });

  const eventDate = watch("eventDate");

  const onSubmit = async (data: InquiryFormValues) => {
    if (data.honeypot) return;
    setLoading(true);
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
        budgetRange: data.budgetRange,
        cuisinePreference: data.cuisinePreference,
        message: data.message,
        type: "inquiry",
        status: "New",
        isSample: false,
      });

      toast.success("Inquiry received! We will be in touch shortly.");
      router.push("/thank-you");
    } catch (err) {
      toast.error("Failed to submit inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
      <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name *"
          placeholder="e.g. Kazi Farhan"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Email Address *"
          type="email"
          placeholder="e.g. kfarhan@example.com"
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
          label="Company Name"
          placeholder="e.g. Apex Footwear Ltd."
          {...register("companyName")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          label="City *"
          placeholder="e.g. Dhaka"
          error={errors.city?.message}
          {...register("city")}
        />
        <div>
          <DatePicker
            label="Preferred Date (DD/MM/YYYY) *"
            value={eventDate}
            onChange={(d) => setValue("eventDate", d)}
            error={errors.eventDate?.message}
          />
        </div>
        <Input
          label="Expected Attendance *"
          type="number"
          min="20"
          placeholder="e.g. 350"
          error={errors.guestCount?.message}
          {...register("guestCount")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Select
          label="Event Type *"
          options={[
            { value: "Wedding Reception", label: "Wedding Reception" },
            { value: "Corporate Event", label: "Corporate Event" },
            { value: "Conference / AGM", label: "Conference / AGM" },
            { value: "Private Party", label: "Private Party" },
            { value: "Lunch Box Order", label: "Lunch Box Order" },
          ]}
          {...register("eventType")}
        />
        <Select
          label="Proposed Venue"
          options={[
            { value: "ICCB Hall 1 (Gulnaksha)", label: "ICCB Hall 1" },
            { value: "ICCB Hall 2 (Pushpaguchha)", label: "ICCB Hall 2" },
            { value: "ICCB Hall 3 (Rajdarshan)", label: "ICCB Hall 3" },
            { value: "ICCB Hall 4 (Naboratna)", label: "ICCB Hall 4" },
            { value: "External Venue / Private Premises", label: "External Venue" },
          ]}
          {...register("venue")}
        />
        <Select
          label="Cuisine Preference"
          options={[
            { value: "Traditional Mughal", label: "Traditional Mughal" },
            { value: "Continental", label: "Continental" },
            { value: "Multi-Cuisine", label: "Multi-Cuisine" },
            { value: "Bengali Traditional", label: "Bengali Traditional" },
          ]}
          {...register("cuisinePreference")}
        />
      </div>

      <Textarea
        label="Message or Inquiries"
        placeholder="Tell us what you are looking for..."
        {...register("message")}
      />

      <div className="pt-2">
        <Button type="submit" size="lg" isLoading={loading} withArrow className="w-full">
          Submit General Inquiry
        </Button>
      </div>
    </form>
  );
}
