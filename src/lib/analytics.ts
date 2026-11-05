export type AnalyticsEvent =
  | "quote_submitted"
  | "booking_submitted"
  | "tasting_requested"
  | "call_clicked"
  | "whatsapp_clicked"
  | "menu_viewed"
  | "package_calculated"
  | "newsletter_subscribed";

interface AnalyticsRecord {
  event: AnalyticsEvent;
  metadata?: Record<string, any>;
  timestamp: string;
}

const STORAGE_KEY = "iccb_analytics_events";

export function track(event: AnalyticsEvent, metadata?: Record<string, any>) {
  const record: AnalyticsRecord = {
    event,
    metadata,
    timestamp: new Date().toISOString(),
  };

  if (process.env.NODE_ENV !== "production") {
    console.log(`[ICCB Analytics] ${event}`, metadata || {});
  }

  if (typeof window !== "undefined") {
    try {
      const existing: AnalyticsRecord[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      existing.unshift(record);
      // Keep up to 100 recent events
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 100)));
    } catch (e) {
      // Storage error ignored
    }
  }
}

export function getAnalyticsEvents(): AnalyticsRecord[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch (e) {
    return [];
  }
}

