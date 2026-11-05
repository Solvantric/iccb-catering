"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone required"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().max(0).optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    if (data.honeypot) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      reset();
      toast.success("Thank you! Your message has been sent to our banquet department.");
    }, 400);
  };

  if (sent) {
    return (
      <div className="p-8 bg-brand-50 rounded-2xl border border-brand-200 text-center space-y-3">
        <h4 className="font-display font-bold text-xl uppercase tracking-wider text-brand-700">
          Message Received!
        </h4>
        <p className="text-xs text-ink-600">
          Our banquet desk will review your inquiry and contact you shortly.
        </p>
        <button
          onClick={() => setSent(false)}
          className="text-xs font-bold text-brand-600 underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
      <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Your Full Name *"
          placeholder="e.g. Tanvir Ahmed"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Email Address *"
          type="email"
          placeholder="e.g. tanvir@example.com"
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Phone Number *"
          placeholder="e.g. +8801711223344"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <Input
          label="Subject *"
          placeholder="e.g. Corporate Lunch inquiry"
          error={errors.subject?.message}
          {...register("subject")}
        />
      </div>

      <Textarea
        label="Your Message *"
        rows={5}
        placeholder="Type your message here..."
        error={errors.message?.message}
        {...register("message")}
      />

      <div className="pt-2">
        <Button type="submit" size="lg" isLoading={loading} withArrow className="w-full">
          Send Message
        </Button>
      </div>
    </form>
  );
}
