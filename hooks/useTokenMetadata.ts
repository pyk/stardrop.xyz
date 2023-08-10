"use client";

import { z } from "zod";
import useSWR from "swr";

type Network = "ethereum" | "optimism" | "base" | "zora";

class FetcherError extends Error {
  status: number;
  info: any;

  constructor(message: string, status: number, info: any) {
    super(message);
    Object.setPrototypeOf(this, FetcherError.prototype);
    this.status = status;
    this.info = info;
  }
}

async function fetcher(url: string) {
  const res = await fetch(url);
  if (res.status != 200) {
    // Attach extra info to the error object.
    const status = res.status;
    const info = await res.json();
    const error = new FetcherError(
      "An error occurred while fetching the data.",
      status,
      info
    );
    throw error;
  }
  return res.json();
}

const TokenMetadataSchema = z.object({
  address: z.string(),
  name: z.string(),
  symbol: z.string(),
  decimals: z.coerce.number(),
});

function getEndpoint(network: Network): string {
  if (network == "ethereum") return "https://eth.blockscout.com/api/v2/tokens";
  return "";
}

export function useTokenMetadata(
  network: Network,
  tokenAddress: `0x${string}` | null
) {
  const endpoint = getEndpoint(network);
  const swr = useSWR(
    tokenAddress ? `${endpoint}/${tokenAddress}` : null,
    fetcher
  );

  console.log("DEBUG: useTokenMetadata swr", swr);

  if (swr.data == null || swr.error) {
    return {
      data: null,
      isLoading: swr.isLoading,
      isError: swr.error,
    };
  }

  try {
    const parsedData = TokenMetadataSchema.parse(swr.data);
    return {
      data: parsedData,
      isLoading: swr.isLoading,
      isError: swr.error,
    };
  } catch (err) {
    console.error(err);

    return {
      data: null,
      isLoading: swr.isLoading,
      isError: swr.error,
    };
  }
}
