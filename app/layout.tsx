import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FICCI Membership Benefits Guide",
  description:
    "A step-by-step member awareness guide for accessing and availing FICCI membership benefits through My Glue.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
