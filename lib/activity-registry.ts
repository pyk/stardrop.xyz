/**
 * Onchain activiy registry
 * */

import { StardropActivityNetwork } from "./types";

export const SendETH = { value: "send-eth", title: "Send ETH" };
export const ReceiveETH = {
  value: "receive-eth",
  title: "Receive ETH",
};

export const SendToken = {
  value: "send-token",
  title: "Send Token",
};
export const ReceiveToken = {
  value: "receive-token",
  title: "Receive Token",
};

export const ContractCall = {
  value: "contract-call",
  title: "Contract Call",
};

export const activities = [
  "send-eth",
  "receive-eth",
  "send-token",
  "receive-token",
  "contract-call",
] as const;

export const networkActivities: Record<
  StardropActivityNetwork,
  { value: string; title: string }[]
> = {
  ethereum: [SendETH, ReceiveETH, SendToken, ReceiveToken, ContractCall],
  optimism: [],
  base: [],
  zora: [],
};
