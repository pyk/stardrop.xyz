// import { w3mConnectors, w3mProvider } from "@web3modal/ethereum";
// import { configureChains, createConfig } from "wagmi";
// import { goerli, mainnet } from "wagmi/chains";
// import { publicProvider } from "wagmi/chains";

import { createConfig, configureChains, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

export const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

export const config = createConfig({
  autoConnect: true,
  // connectors: w3mConnectors({
  //   chains,
  //   projectId: walletConnectProjectId,
  // }),
  publicClient,
  webSocketPublicClient,
});

export { chains };
