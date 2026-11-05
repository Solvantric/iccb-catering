import React from "react";
import { Badge } from "@/components/ui/Badge";

export function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase();

  if (normalized === "won" || normalized === "confirmed" || normalized === "published" || normalized === "active") {
    return <Badge variant="success">{status}</Badge>;
  }

  if (normalized === "quoted" || normalized === "sent" || normalized === "tasting" || normalized === "scheduled") {
    return <Badge variant="brand">{status}</Badge>;
  }

  if (normalized === "contacted" || normalized === "pending" || normalized === "draft") {
    return <Badge variant="warning">{status}</Badge>;
  }

  if (normalized === "lost" || normalized === "cancelled" || normalized === "rejected" || normalized === "inactive") {
    return <Badge variant="danger">{status}</Badge>;
  }

  return <Badge variant="neutral">{status}</Badge>;
}
