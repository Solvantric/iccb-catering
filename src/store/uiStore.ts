import { create } from "zustand";
import { Locale } from "@/lib/i18n";

interface QuoteDraft {
  eventType?: string;
  guestCount?: number;
  eventDate?: string;
  venue?: string;
  packageId?: string;
  packageName?: string;
  estimatedTotal?: number;
}

interface UIState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  announcementDismissed: boolean;
  setAnnouncementDismissed: (dismissed: boolean) => void;
  offerPopupDismissed: boolean;
  setOfferPopupDismissed: (dismissed: boolean) => void;
  quoteDraft: QuoteDraft;
  setQuoteDraft: (draft: Partial<QuoteDraft>) => void;
  clearQuoteDraft: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  locale: "en",
  setLocale: (locale) => set({ locale }),
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  announcementDismissed: false,
  setAnnouncementDismissed: (announcementDismissed) => set({ announcementDismissed }),
  offerPopupDismissed: false,
  setOfferPopupDismissed: (offerPopupDismissed) => set({ offerPopupDismissed }),
  quoteDraft: {
    guestCount: 200,
  },
  setQuoteDraft: (draft) =>
    set((state) => ({
      quoteDraft: { ...state.quoteDraft, ...draft },
    })),
  clearQuoteDraft: () => set({ quoteDraft: { guestCount: 200 } }),
}));
