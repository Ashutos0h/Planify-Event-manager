import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Planify - Premium Event Management",
  description: "Plan weddings, festivals, and corporate events with India's best agencies. Verified partners, secure bookings, and seamless planning.",
  keywords: ["wedding planner", "event management", "corporate events", "festival bookings", "india events"],
  authors: [{ name: "Planify Team" }],
  openGraph: {
    title: "Planify - Celebrate Tradition, Embrace Modernity",
    description: "The premier platform for booking verificed event agencies in India.",
    url: "https://planify-events.vercel.app",
    siteName: "Planify",
    images: [
      {
        url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Planify Hero Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Planify - Premium Event Management",
    description: "Plan weddings, festivals, and corporate events with India's best agencies.",
    images: ["https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=630&fit=crop"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <div className="flex-1">
            {children}
          </div>
          <Toaster />
          <Footer />
        </Providers>
      </body>
    </html >
  );
}
