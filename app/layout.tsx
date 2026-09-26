import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TradeLine AI — 24/7 Answering Service for HVAC & Home Services",
  description:
    "An AI-powered answering service for HVAC, plumbing, and electrical companies. Never miss a call, book jobs automatically, and keep every customer covered — day or night.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
