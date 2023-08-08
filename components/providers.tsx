"use client";

import { ConnectKitProvider } from "connectkit";
import * as React from "react";
import { WagmiConfig } from "wagmi";

import { config } from "@/lib/wagmi";
import { SiweConfig } from "@/lib/siwe";
import { SIWEProvider } from "connectkit";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={config}>
      <SIWEProvider {...SiweConfig}>
        <ConnectKitProvider>{mounted && children}</ConnectKitProvider>
      </SIWEProvider>
    </WagmiConfig>
  );
}
