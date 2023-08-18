import { Address, parseAbi } from "viem";
import { getClient } from "./viem";
import { selectorsFromBytecode } from "@shazow/whatsabi";
import { Signature, lookup } from "./openchain";

export async function getSignatures(
  network: "ethereum" | "optimism",
  address: Address
): Promise<Signature[]> {
  const client = getClient(network);
  const code = await client.getBytecode({ address: address });
  const selectors = selectorsFromBytecode(code as string);

  // EIP-1967 Selectors
  // "0x5c60da1b" implementation()
  // "0xda525716" childImplementation()
  // "0xa619486e" masterCopy()
  // "0xbb82aa5e" comptrollerImplementation()
  if (selectors.includes("0x5c60da1b")) {
    const implementation = await client.readContract({
      address: address,
      abi: parseAbi(["function implementation() view returns (address)"]),
      functionName: "implementation",
    });
    return getSignatures(network, implementation);
  }
  if (selectors.includes("0xda525716")) {
    const implementation = await client.readContract({
      address: address,
      abi: parseAbi(["function childImplementation() view returns (address)"]),
      functionName: "childImplementation",
    });
    return getSignatures(network, implementation);
  }
  if (selectors.includes("0xa619486e")) {
    const implementation = await client.readContract({
      address: address,
      abi: parseAbi(["function masterCopy() view returns (address)"]),
      functionName: "masterCopy",
    });
    return getSignatures(network, implementation);
  }
  if (selectors.includes("0xbb82aa5e")) {
    const implementation = await client.readContract({
      address: address,
      abi: parseAbi([
        "function comptrollerImplementation() view returns (address)",
      ]),
      functionName: "comptrollerImplementation",
    });
    return getSignatures(network, implementation);
  }

  const signatures = await lookup(selectors);
  return signatures;
}

export function sum(a: number, b: number) {
  return a + b;
}
