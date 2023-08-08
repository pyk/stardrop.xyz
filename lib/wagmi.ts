"use client";

import { createConfig } from "wagmi";
import { getDefaultConfig } from "connectkit";

export const config = createConfig(
  getDefaultConfig({
    // autoConnect: true,
    appName: "Stardrop",
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  })
);
