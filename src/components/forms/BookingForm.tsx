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
import { track } from "@/lib/analytics";

const bookingSchema = z.object({
  clientName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone number required"),
  city: z.string().min(2, "City is required"),
  eventType: z.string().min(1, "Event type is required"),
  hallOrVenue: z.string().min(1, "Hall / Venue is required"),
  eventDate: z.string().min(5, "Event date required (DD/MM/YYYY)"),
  guests: z.coerce.number().min(30, "Minimum 30 guests"),
  notes: z.string().optional(),
  honeypot: z.string().max(0).optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export function BookingForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema) as any,
    defaultValues: {
      clientName: "",
      email: "",
      phone: "",
      city: "Dhaka",
      eventType: "Wedding Reception",
      hallOrVenue: "ICCB Hall 3 (Rajdarshan)",
      eventDate: "20/12/2026",
      guests: 500,
      notes: "",
    },
  });

  const eventDate = watch("eventDate");

  const onSubmit = async (data: BookingFormValues) => {
    if (data.honeypot) return;
    setLoading(true);
    try {
      await leadService.create({
        name: data.clientName,
        email: data.email,
        phone: data.phone,
        city: data.city,
        eventType: data.eventType,
        venue: data.hallOrVenue,
        eventDate: data.eventDate,
        guestCount: Number(data.guests),
        message: data.notes,
        type: "booking",
        status: "New",
        isSample: false,
      });

      track("booking_submitted", {
        hall: data.hallOrVenue,
        guests: data.guests,
      });

      toast.success("Event booking reservation received! Our banquet team will call you within 2 hours.");
      router.push("/thank-you");
    } catch (err) {
      toast.error("Booking submission error. Please try again.");
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
          placeholder="e.g. Dr. Sadman Chowdhury"
          error={errors.clientName?.message}
          {...register("clientName")}
        />
        <Input
          label="Email Address *"
          type="email"
          placeholder="e.g. sadman@gmail.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Mobile Phone Number *"
          placeholder="e.g. +8801711223344"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <Input
          label="City *"
          placeholder="e.g. Dhaka"
          error={errors.city?.message}
          {...register("city")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Event Type *"
          options={[
            { value: "Wedding Reception", label: "Wedding Reception" },
            { value: "Corporate Gala / AGM", label: "Corporate Gala / AGM" },
            { value: "Holud & Mehendi Night", label: "Holud & Mehendi Night" },
            { value: "Birthday Celebration", label: "Birthday Celebration" },
            { value: "Exhibition / Expo Banquet", label: "Exhibition / Expo Banquet" },
          ]}
          error={errors.eventType?.message}
          {...register("eventType")}
        />
        <Select
          label="Preferred ICCB Hall / Venue *"
          options={[
            { value: "ICCB Hall 1 (Gulnaksha)", label: "ICCB Hall 1 (Gulnaksha - Up to 2,500)" },
            { value: "ICCB Hall 2 (Pushpaguchha)", label: "ICCB Hall 2 (Pushpaguchha - Up to 2,000)" },
            { value: "ICCB Hall 3 (Rajdarshan)", label: "ICCB Hall 3 (Rajdarshan - Up to 3,000)" },
            { value: "ICCB Hall 4 (Naboratna)", label: "ICCB Hall 4 (Naboratna - Up to 2,500)" },
            { value: "Off-Premises / Outside ICCB", label: "Off-Premises / Outside ICCB" },
          ]}
          error={errors.hallOrVenue?.message}
          {...register("hallOrVenue")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <DatePicker
            label="Target Event Date (DD/MM/YYYY) *"
            value={eventDate}
            onChange={(d) => setValue("eventDate", d)}
            error={errors.eventDate?.message}
          />
        </div>
        <Input
          label="Guest Count *"
          type="number"
          min="30"
          placeholder="e.g. 800"
          error={errors.guests?.message}
          {...register("guests")}
        />
      </div>

      <Textarea
        label="Additional Requirements or Notes"
        placeholder="Provide special timings, decoration preferences, or bridal room needs..."
        {...register("notes")}
      />

      <div className="pt-2">
        <Button type="submit" size="lg" isLoading={loading} withArrow className="w-full">
          Confirm Booking Request
        </Button>
      </div>
    </form>
  );
}
