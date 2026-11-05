"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Password reset successfully! Please sign in with your new password.");
      router.push("/sign-in");
    }, 400);
  };

  return (
    <div className="space-y-6 text-left">
      <div>
        <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-ink-950">
          SET NEW PASSWORD
        </h1>
        <p className="text-xs text-ink-500 mt-1">
          Choose a strong password with at least 6 characters.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="New Password *"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          label="Confirm New Password *"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <div className="pt-2">
          <Button type="submit" size="lg" isLoading={loading} withArrow className="w-full">
            Save New Password
          </Button>
        </div>
      </form>
    </div>
  );
}
