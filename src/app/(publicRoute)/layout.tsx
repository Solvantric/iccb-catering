import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { OfferPopup } from "@/components/layout/OfferPopup";
import { CookieConsent } from "@/components/layout/CookieConsent";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-brand-500 selection:text-white">
      <Header />
      <MobileMenu />
      <main className="flex-grow">{children}</main>
      <Footer />
      <FloatingActions />
      <OfferPopup />
      <CookieConsent />
    </div>
  );
}

