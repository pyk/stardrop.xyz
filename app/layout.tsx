import "./globals.css";
import type { Metadata } from "next";
import { inter } from "@/lib/font";

export const metadata: Metadata = {
  title: "Stardrop",
  description: `Stardrop is a permissionless platform that allows you to reward
  others with special NFTs based on their on-chain activity`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
