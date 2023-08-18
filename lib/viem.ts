import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

if (!process.env.ETHEREUM_RPC_URL) {
  throw new Error(`ETHEREUM_RPC_URL undefined`);
}

export const mainnetClient = createPublicClient({
  chain: mainnet,
  transport: http(process.env.ETHEREUM_RPC_URL),
});

export function getClient(networkName: "ethereum" | "optimism") {
  if (networkName == "ethereum") return mainnetClient;
  throw new Error(`viem: unsupported network: ${networkName}`);
}
