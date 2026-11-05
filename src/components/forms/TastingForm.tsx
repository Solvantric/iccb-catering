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

const tastingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone required"),
  tastingDate: z.string().min(5, "Preferred tasting date required"),
  tastingAttendees: z.coerce.number().min(1).max(8, "Tasting limit is 8 family members"),
  tentativeEventDate: z.string().optional(),
  dishesToTaste: z.string().min(3, "Please specify 2-4 dishes you wish to taste"),
  notes: z.string().optional(),
  honeypot: z.string().max(0).optional(),
});

type TastingFormValues = z.infer<typeof tastingSchema>;

export function TastingForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TastingFormValues>({
    resolver: zodResolver(tastingSchema) as any,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      tastingDate: "14/11/2026",
      tastingAttendees: 4,
      dishesToTaste: "Shahi Kacchi Biryani, Mutton Rezala, Chicken Roast, Borhani, Firni",
      notes: "Held at ICCB Heritage Restaurant VIP Tasting Room",
    },
  });

  const tastingDate = watch("tastingDate");

  const onSubmit = async (data: TastingFormValues) => {
    if (data.honeypot) return;
    setLoading(true);
    try {
      await leadService.create({
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: "Dhaka",
        eventType: "Tasting Session Request",
        eventDate: data.tastingDate,
        guestCount: Number(data.tastingAttendees),
        message: `Dishes to taste: ${data.dishesToTaste}. Notes: ${data.notes || ""}`,
        type: "tasting",
        status: "Tasting",
        isSample: false,
      });

      track("tasting_requested", {
        attendees: data.tastingAttendees,
        tastingDate: data.tastingDate,
      });

      toast.success("Food tasting appointment received! Our chef will prepare your session.");
      router.push("/thank-you");
    } catch (err) {
      toast.error("Failed to request tasting. Please try again.");
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
          placeholder="e.g. Tanvir Ahmed"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Email Address *"
          type="email"
          placeholder="e.g. tanvir@gmail.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Mobile Phone *"
          placeholder="e.g. +8801711223344"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <Input
          label="Number of Tasting Attendees (Max 8) *"
          type="number"
          min="1"
          max="8"
          error={errors.tastingAttendees?.message}
          {...register("tastingAttendees")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <DatePicker
            label="Preferred Tasting Date *"
            value={tastingDate}
            onChange={(d) => setValue("tastingDate", d)}
            error={errors.tastingDate?.message}
          />
        </div>
        <Input
          label="Tentative Event Date (if known)"
          placeholder="e.g. 24/12/2026"
          {...register("tentativeEventDate")}
        />
      </div>

      <Input
        label="Dishes You Wish to Sample *"
        placeholder="e.g. Shahi Kacchi Biryani, Mutton Rezala, Grilled Salmon..."
        error={errors.dishesToTaste?.message}
        {...register("dishesToTaste")}
      />

      <Textarea
        label="Dietary Restrictions or Special Instructions"
        placeholder="Mention any nut allergies, spice preferences, or timing details..."
        {...register("notes")}
      />

      <div className="pt-2">
        <Button type="submit" size="lg" isLoading={loading} withArrow className="w-full">
          Schedule Tasting Appointment
        </Button>
      </div>
    </form>
  );
}
