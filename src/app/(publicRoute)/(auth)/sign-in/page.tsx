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
import { Eye, EyeOff, Lock, UserCheck, Shield } from "lucide-react";

const signInSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInValues = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "admin@iccb.demo",
      password: "Admin@123",
    },
  });

  const onSubmit = (data: SignInValues) => {
    setLoading(true);
    setTimeout(() => {
      login(data.email);
      setLoading(false);
      toast.success(`Welcome back! Signed in as ${data.email}`);
      router.push("/dashboard");
    }, 400);
  };

  const fillDemo = (email: string, pass: string) => {
    setValue("email", email);
    setValue("password", pass);
  };

  return (
    <div className="space-y-6 text-left">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
          ICCB Portal Access
        </span>
        <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-ink-950 mt-2">
          SIGN IN TO YOUR ACCOUNT
        </h1>
        <p className="text-xs text-ink-500 mt-1">
          Access the Admin CMS Dashboard, manage leads, or view event itineraries.
        </p>
      </div>

      {/* Demo Credentials Quick-Fill Pill Box (Key Specification Feature) */}
      <div className="p-4 bg-ink-50 border border-ink-200 rounded-2xl space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-ink-700 tracking-wider">
          <Shield className="w-3.5 h-3.5 text-brand-500" />
          <span>Demo Credentials Hint:</span>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={() => fillDemo("admin@iccb.demo", "Admin@123")}
            className="p-2 rounded-lg bg-white border border-ink-200 hover:border-brand-500 hover:bg-brand-50/50 text-left text-xs transition-colors"
          >
            <span className="font-bold text-ink-900 block">Admin</span>
            <span className="text-[10px] text-ink-500 font-mono">admin@iccb.demo</span>
          </button>
          <button
            type="button"
            onClick={() => fillDemo("sales@iccb.demo", "Sales@123")}
            className="p-2 rounded-lg bg-white border border-ink-200 hover:border-brand-500 hover:bg-brand-50/50 text-left text-xs transition-colors"
          >
            <span className="font-bold text-ink-900 block">Sales Officer</span>
            <span className="text-[10px] text-ink-500 font-mono">sales@iccb.demo</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email Address *"
          type="email"
          error={errors.email?.message}
          {...register("email")}
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

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-ink-600">
            <input type="checkbox" defaultChecked className="rounded accent-brand-500" />
            <span>Remember me</span>
          </label>
          <Link
            href="/forgot-password"
            className="font-semibold text-brand-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <div className="pt-2">
          <Button type="submit" size="lg" isLoading={loading} withArrow className="w-full">
            Sign In to Dashboard
          </Button>
        </div>
      </form>

      <div className="text-center text-xs text-ink-500 pt-2">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="font-bold text-brand-600 hover:underline">
          Create Account
        </Link>
      </div>
    </div>
  );
}

