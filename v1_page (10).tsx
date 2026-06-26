import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ledger AI",
  description: "AI-assisted invoicing, product pricing, online payments, and recurring billing."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
