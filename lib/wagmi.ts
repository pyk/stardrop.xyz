"use client";

import { createConfig } from "wagmi";
import { getDefaultConfig } from "connectkit";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";

const chains = [mainnet, polygon, optimism, arbitrum, base];

export const config = createConfig(
  getDefaultConfig({
    autoConnect: true,
    appName: "Stardrop",
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    chains,
  })
);
