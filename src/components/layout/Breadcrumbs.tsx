import React from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// Breadcrumbs hidden globally per design decision – component kept for compatibility
export function Breadcrumbs({ items: _items }: { items: BreadcrumbItem[] }) {
  return null;
}


