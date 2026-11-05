import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center space-x-2 text-xs text-ink-500 py-3" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-brand-500 flex items-center transition-colors">
        <Home className="w-3.5 h-3.5 mr-1" />
        <span>Home</span>
      </Link>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3.5 h-3.5 text-ink-300" />
          {item.href ? (
            <Link href={item.href} className="hover:text-brand-500 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-ink-800 font-semibold">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
