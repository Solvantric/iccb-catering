import type { Metadata } from "next";
import { Oswald, Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import { SITE_INFO } from "@/data/site";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.iccbbg.com";

export const metadata: Metadata = {
  title: `${SITE_INFO.name} - Premier Event & Convention Destination | Dhaka`,
  description: SITE_INFO.positioning,
  metadataBase: new URL(siteUrl),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable} ${playfair.variable}`}>
      <body className="antialiased min-h-screen bg-white text-ink-950 font-sans selection:bg-brand-500 selection:text-white">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
