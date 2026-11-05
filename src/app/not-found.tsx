import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Utensils, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-white text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-brand-50 text-brand-500 flex items-center justify-center mx-auto shadow-sm">
          <Utensils className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-5xl sm:text-6xl font-display font-black text-brand-600 block">
            404
          </span>
          <h1 className="font-display font-bold text-2xl uppercase tracking-wide text-ink-950">
            DISH OR PAGE NOT FOUND
          </h1>
          <p className="text-xs text-ink-500 max-w-sm mx-auto leading-relaxed">
            The banquet page or culinary item you are searching for might have been moved or is currently off our seasonal menu.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link href="/">
            <Button size="md" variant="primary">
              <Home className="w-4 h-4 mr-2" />
              Return to Homepage
            </Button>
          </Link>
          <Link href="/menu">
            <Button size="md" variant="outline">
              Explore Our Menu
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

