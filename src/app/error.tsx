"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6 text-center bg-white">
      <div className="max-w-md space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h2 className="font-display font-bold text-2xl uppercase tracking-wide text-ink-950">
            SOMETHING WENT WRONG
          </h2>
          <p className="text-xs text-ink-500 leading-relaxed">
            An unexpected error occurred while rendering this catering page. Please try refreshing.
          </p>
        </div>
        <div>
          <Button onClick={() => reset()} variant="primary" size="md">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reload Page
          </Button>
        </div>
      </div>
    </div>
  );
}

