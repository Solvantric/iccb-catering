"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";
import { ArrowLeft, MailCheck } from "lucide-react";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Password recovery link sent!");
    }, 400);
  };

  return (
    <div className="space-y-6 text-left">
      <div>
        <Link
          href="/sign-in"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:underline mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Sign In</span>
        </Link>
        <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-ink-950">
          FORGOT PASSWORD?
        </h1>
        <p className="text-xs text-ink-500 mt-1">
          Enter your registered email address and we will send a password reset link.
        </p>
      </div>

      {submitted ? (
        <div className="p-6 bg-brand-50 rounded-2xl border border-brand-200 text-center space-y-3">
          <MailCheck className="w-8 h-8 text-brand-600 mx-auto" />
          <h4 className="font-display font-bold text-base uppercase text-brand-900">
            Check Your Email
          </h4>
          <p className="text-xs text-ink-600">
            We have sent password reset instructions to <strong>{email}</strong>.
          </p>
          <div className="pt-2">
            <Link href="/reset-password">
              <Button size="sm" variant="primary">
                Proceed to Reset Password
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address *"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@iccb.demo"
            required
          />

          <div className="pt-2">
            <Button type="submit" size="lg" isLoading={loading} withArrow className="w-full">
              Send Reset Link
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

