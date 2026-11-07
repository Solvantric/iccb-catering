"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("iccb_cookie_consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("iccb_cookie_consent", "accepted");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 bg-white/95 dark:bg-ink-950/95 text-ink-900 dark:text-white border border-ink-200 dark:border-ink-800 p-4 rounded-2xl shadow-xl backdrop-blur-md animate-in slide-in-from-bottom-5 transition-colors">
      <div className="flex flex-col gap-3">
        <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
          We use cookies to improve your catering browsing experience and analyze banquet inquiries in accordance with our Privacy Policy.
        </p>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={accept} className="text-xs py-1.5 px-4">
            Accept & Continue
          </Button>
          <button
            onClick={() => setShow(false)}
            className="text-xs text-ink-500 hover:text-ink-950 dark:text-ink-400 dark:hover:text-white px-3 py-1.5"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

