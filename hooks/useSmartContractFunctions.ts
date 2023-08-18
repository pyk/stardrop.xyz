"use client";

import { z } from "zod";
import useSWR from "swr";
import { isAddress } from "viem";

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

const SmartContractSignaturesSchema = z.object({
  address: z.string(),
  signatures: z.array(
    z.object({ sighash: z.string(), name: z.string(), method: z.string() })
  ),
});

export function useSmartContractFunctions(
  network: string,
  address: `0x${string}` | null
) {
  // TODO: supported networks add one variable
  const swr = useSWR(
    address && isAddress(address) && ["ethereum"].includes(network)
      ? `signatures?network=${network}&address=${address}`
      : null,
    fetcher
  );

  console.log("DEBUG: useSmartContractFunctions swr", swr);

  if (swr.data == null || swr.error) {
    return {
      data: null,
      isLoading: swr.isLoading,
      isError: swr.error,
    };
  }

  try {
    const parsedData = SmartContractSignaturesSchema.parse(swr.data);
    return {
      data: parsedData,
      isLoading: swr.isLoading,
      isError: swr.error,
    };
  } catch (err) {
    return {
      data: null,
      isLoading: swr.isLoading,
      isError: swr.error,
    };
  }
}
