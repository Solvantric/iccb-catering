"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const signUpSchema = z.object({
  name: z.string().min(2, "Full Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Phone number required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpValues = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpValues) => {
    setLoading(true);
    setTimeout(() => {
      login(data.email, "Admin");
      setLoading(false);
      toast.success("Account created successfully! Redirecting to CMS Dashboard.");
      router.push("/dashboard");
    }, 400);
  };

  return (
    <div className="space-y-6 text-left">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
          New Host Registration
        </span>
        <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-ink-950 mt-2">
          CREATE YOUR ACCOUNT
        </h1>
        <p className="text-xs text-ink-500 mt-1">
          Register to view your custom quotations, tasting schedules, and hall reservations.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full Name *"
          placeholder="e.g. Farhana Chowdhury"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Email Address *"
          type="email"
          placeholder="e.g. farhana@example.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Phone Number *"
          placeholder="e.g. +8801711223344"
          error={errors.phone?.message}
          {...register("phone")}
        />

        <div className="space-y-1.5 text-left relative">
          <label className="block text-xs font-semibold uppercase tracking-wider text-ink-700">
            Password *
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-ink-200 bg-white text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 pr-10"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700 p-1"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password?.message && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="pt-2">
          <Button type="submit" size="lg" isLoading={loading} withArrow className="w-full">
            Create Account
          </Button>
        </div>
      </form>

      <div className="text-center text-xs text-ink-500 pt-2">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-bold text-brand-600 hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
}
