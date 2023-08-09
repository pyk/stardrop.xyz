"use client";

import { ConnectKitProvider } from "connectkit";
import * as React from "react";
import { WagmiConfig } from "wagmi";

import { config } from "@/lib/wagmi";
import { SiweConfig } from "@/lib/siwe";
import { SIWEProvider } from "connectkit";

import { inter } from "@/lib/font";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={config}>
      <SIWEProvider {...SiweConfig}>
        <ConnectKitProvider
          options={{
            initialChainId: 0,
          }}
          customTheme={{
            "--ck-font-family": inter.style.fontFamily,
            "--ck-border-radius": "24px",
            // "--ck-accent-color": "#00D54B",
            // "--ck-accent-text-color": "#ffffff",
          }}
        >
          {mounted && children}
        </ConnectKitProvider>
      </SIWEProvider>
    </WagmiConfig>
  );
}
