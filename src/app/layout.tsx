import type { Metadata } from "next";
import { Oswald, Inter, Playfair_Display, Noto_Sans_Bengali, Noto_Serif_Bengali } from "next/font/google";
import { Toaster } from "sonner";
import { SITE_INFO } from "@/data/site";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
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

const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-noto-bengali",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  variable: "--font-noto-serif-bengali",
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${SITE_INFO.name} - Taste of Happiness | Premium Catering & Events Dhaka`,
  description: SITE_INFO.positioning,
  metadataBase: new URL("https://iccbcatering.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${oswald.variable} ${inter.variable} ${playfair.variable} ${notoBengali.variable} ${notoSerifBengali.variable}`}
    >
      <body className="antialiased min-h-screen bg-white dark:bg-ink-950 text-ink-950 dark:text-ink-50 font-sans selection:bg-brand-500 selection:text-white transition-colors duration-200">
        <ThemeProvider>
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
