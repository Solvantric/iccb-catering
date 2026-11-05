import React from "react";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center bg-white space-y-4">
      <div className="relative w-12 h-12">
        <div className="w-12 h-12 rounded-full border-4 border-brand-100 border-t-brand-500 animate-spin" />
      </div>
      <p className="font-display font-bold text-xs uppercase tracking-widest text-ink-500">
        Loading ICCB Catering Experience...
      </p>
    </div>
  );
}
