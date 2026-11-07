"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, Mail, RotateCcw } from "lucide-react";
import { useUIStore } from "@/store/uiStore";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(8, "Valid phone required"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().max(0).optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const { locale } = useUIStore();
  const [openedMailto, setOpenedMailto] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormValues) => {
    if (data.honeypot) return;

    const emailTo = "iccb@bga-bd.com";
    const mailSubject = encodeURIComponent(`[ICCB Inquiry] ${data.subject} - ${data.name}`);
    const mailBody = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nSubject: ${data.subject}\n\nMessage:\n${data.message}`
    );

    const mailtoUrl = `mailto:${emailTo}?subject=${mailSubject}&body=${mailBody}`;
    window.location.href = mailtoUrl;
    setOpenedMailto(true);
  };

  if (openedMailto) {
    return (
      <div className="py-8 px-6 rounded-xl bg-brand-50/70 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-900/40 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-brand-500 text-white mx-auto flex items-center justify-center shadow-md">
          <Mail className="w-5 h-5" />
        </div>
        <div className="space-y-1.5">
          <h4 className="font-display font-bold text-lg uppercase tracking-wider text-ink-950 dark:text-white">
            {locale === "bn" ? "ইমেইল অ্যাপ চালু হয়েছে" : "Email App Triggered"}
          </h4>
          <p className="text-xs sm:text-sm text-ink-700 dark:text-ink-200 font-medium max-w-sm mx-auto leading-relaxed">
            {locale === "bn"
              ? "আপনার ইমেইল অ্যাপ চালু হয়েছে। অনুগ্রহ করে সেন্ড (Send) বাটনে চাপুন।"
              : "Your email app has opened. Please press send."}
          </p>
        </div>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              setOpenedMailto(false);
              reset();
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 hover:underline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{locale === "bn" ? "আরেকটি বার্তা পাঠান" : "Send another message"}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">
      <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-600 dark:text-ink-400 mb-1.5">
            {locale === "bn" ? "আপনার পূর্ণ নাম *" : "Your Full Name *"}
          </label>
          <input
            type="text"
            placeholder={locale === "bn" ? "যেমন: তানভীর আহমেদ" : "e.g. Tanvir Ahmed"}
            {...register("name")}
            className="w-full bg-white dark:bg-ink-950 border border-brand-100 dark:border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-ink-950 dark:text-white placeholder:text-ink-400 dark:placeholder:text-ink-600 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20 outline-none transition-all"
          />
          {errors.name && (
            <p className="text-[11px] text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-600 dark:text-ink-400 mb-1.5">
            {locale === "bn" ? "ইমেইল ঠিকানা *" : "Email Address *"}
          </label>
          <input
            type="email"
            placeholder={locale === "bn" ? "যেমন: tanvir@example.com" : "e.g. tanvir@example.com"}
            {...register("email")}
            className="w-full bg-white dark:bg-ink-950 border border-brand-100 dark:border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-ink-950 dark:text-white placeholder:text-ink-400 dark:placeholder:text-ink-600 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20 outline-none transition-all"
          />
          {errors.email && (
            <p className="text-[11px] text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Phone */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-600 dark:text-ink-400 mb-1.5">
            {locale === "bn" ? "ফোন নম্বর *" : "Phone Number *"}
          </label>
          <input
            type="tel"
            placeholder={locale === "bn" ? "যেমন: +৮৮০১৭১১২২৩৩৪৪" : "e.g. +8801711223344"}
            {...register("phone")}
            className="w-full bg-white dark:bg-ink-950 border border-brand-100 dark:border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-ink-950 dark:text-white placeholder:text-ink-400 dark:placeholder:text-ink-600 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20 outline-none transition-all"
          />
          {errors.phone && (
            <p className="text-[11px] text-red-500 mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-600 dark:text-ink-400 mb-1.5">
            {locale === "bn" ? "বিষয় *" : "Subject *"}
          </label>
          <input
            type="text"
            placeholder={
              locale === "bn" ? "যেমন: ওয়েডিং রিসেপশন ক্যাটারিং" : "e.g. Wedding Reception Inquiry"
            }
            {...register("subject")}
            className="w-full bg-white dark:bg-ink-950 border border-brand-100 dark:border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-ink-950 dark:text-white placeholder:text-ink-400 dark:placeholder:text-ink-600 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20 outline-none transition-all"
          />
          {errors.subject && (
            <p className="text-[11px] text-red-500 mt-1">{errors.subject.message}</p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-600 dark:text-ink-400 mb-1.5">
          {locale === "bn" ? "আপনার বার্তা *" : "Your Message *"}
        </label>
        <textarea
          rows={4}
          placeholder={
            locale === "bn"
              ? "অনুষ্ঠানের তারিখ, অতিথি সংখ্যা বা প্রয়োজনীয় তথ্য লিখুন..."
              : "Share your event date, estimated guest count, or specific requirements..."
          }
          {...register("message")}
          className="w-full bg-white dark:bg-ink-950 border border-brand-100 dark:border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-ink-950 dark:text-white placeholder:text-ink-400 dark:placeholder:text-ink-600 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20 outline-none transition-all resize-none"
        />
        {errors.message && (
          <p className="text-[11px] text-red-500 mt-1">{errors.message.message}</p>
        )}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        >
          <span>{locale === "bn" ? "বার্তা পাঠান" : "Send Message"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
