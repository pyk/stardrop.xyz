import "./globals.css";
import type { Metadata } from "next";
import { inter } from "@/lib/font";

export const metadata: Metadata = {
  title: "Stardrop",
  description: `Stardrop is a permissionless protocol to reward onchain activity with NFT. Powered by Zora`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
