"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { CheckCircle2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  subject: z.string().min(3, "Please enter a subject"),
  message: z.string().min(5, "Please enter your message"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormValues) => {
    const subject = encodeURIComponent(`General Contact: ${data.subject} - ${data.name}`);
    const bodyText = `Dear ICCB Team,

Message from Website Contact Form:

- Name: ${data.name}
- Email: ${data.email}
- Phone: ${data.phone}
- Subject: ${data.subject}

Message:
${data.message}

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
          <h4 className="font-serif italic text-2xl">Message Ready</h4>
        </div>
        <p className="text-sm text-ink-soft leading-relaxed">
          Your email application has opened addressed to <strong>iccb@bga-bd.com</strong>.
          Please press <strong>Send</strong> in your mail client to deliver your message.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="text-xs font-mono tracking-wider uppercase underline underline-offset-4 hover:text-accent"
          >
            Send Another Message &rarr;
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Your Name *"
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
          placeholder="e.g. Venue Booking Question"
          error={errors.subject?.message}
          {...register("subject")}
        />
      </div>

      <div>
        <Textarea
          label="Your Message *"
          rows={5}
          placeholder="How can our management team assist you?"
          error={errors.message?.message}
          {...register("message")}
        />
      </div>

      <div className="pt-2">
        <Button type="submit" size="md">
          Send Message &rarr;
        </Button>
      </div>
    </form>
  );
}
