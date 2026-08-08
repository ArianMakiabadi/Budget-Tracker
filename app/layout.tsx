import type { Metadata } from "next";
import "./globals.css";
import RootProviders from "@/components/providers/RootProviders";

export const metadata: Metadata = {
  title: "Budget Tracker ",
  description:
    "Take control of your finances with a modern budget tracker. Manage income, expenses, categories, and gain insights into your spending habits.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <RootProviders>
      <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
        <body className="min-h-full flex flex-col">{children}</body>
      </html>
    </RootProviders>
  );
}
