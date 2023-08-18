import { expect, test } from "vitest";
import { getSignatures } from "./smart-contract";

test("getSignatures: No proxy", async () => {
  const signatures = await getSignatures(
    "ethereum",
    "0x5FB30336A8d0841cf15d452afA297cB6D10877D7"
  );
  expect(signatures).toStrictEqual([
    {
      sighash: "0xe965084c",
      name: "provenWithdrawals",
      method: "Proven Withdrawals",
    },
    {
      sighash: "0xe9e05c42",
      name: "depositTransaction",
      method: "Deposit Transaction",
    },
    {
      sighash: "0xf0498750",
      name: "SYSTEM_CONFIG",
      method: "SYSTEM_CONFIG",
    },
    { sighash: "0xcff0ab96", name: "params", method: "Params" },
    { sighash: "0xd53a822f", name: "initialize", method: "Initialize" },
    {
      sighash: "0x8c3152e9",
      name: "finalizeWithdrawalTransaction",
      method: "Finalize Withdrawal Transaction",
    },
    { sighash: "0x9bf62d82", name: "l2Sender", method: "L2 Sender" },
    {
      sighash: "0xa14238e7",
      name: "finalizedWithdrawals",
      method: "Finalized Withdrawals",
    },
    {
      sighash: "0xa35d99df",
      name: "minimumGasLimit",
      method: "Minimum Gas Limit",
    },
    { sighash: "0x724c184c", name: "GUARDIAN", method: "GUARDIAN" },
    { sighash: "0x8456cb59", name: "pause", method: "Pause" },
    { sighash: "0x8b4c40b0", name: "donateETH", method: "Donate ETH" },
    { sighash: "0x5c975abb", name: "paused", method: "Paused" },
    {
      sighash: "0x6dbffb78",
      name: "isOutputFinalized",
      method: "Is Output Finalized",
    },
    { sighash: "0x001c2ff6", name: "L2_ORACLE", method: "L2_ORACLE" },
    { sighash: "0x3f4ba83a", name: "unpause", method: "Unpause" },
    {
      sighash: "0x4870496f",
      name: "proveWithdrawalTransaction",
      method: "Prove Withdrawal Transaction",
    },
    { sighash: "0x54fd4d50", name: "version", method: "Version" },
  ]);
});

test("getSignatures: EIP-1967 Transparent Proxy", async () => {
  const signatures = await getSignatures(
    "ethereum",
    "0x49048044D57e1C92A77f79988d21Fa8fAF74E97e"
  );
  expect(signatures).toStrictEqual([
    {
      sighash: "0xe965084c",
      name: "provenWithdrawals",
      method: "Proven Withdrawals",
    },
    {
      sighash: "0xe9e05c42",
      name: "depositTransaction",
      method: "Deposit Transaction",
    },
    {
      sighash: "0xf0498750",
      name: "SYSTEM_CONFIG",
      method: "SYSTEM_CONFIG",
    },
    { sighash: "0xcff0ab96", name: "params", method: "Params" },
    { sighash: "0xd53a822f", name: "initialize", method: "Initialize" },
    {
      sighash: "0x8c3152e9",
      name: "finalizeWithdrawalTransaction",
      method: "Finalize Withdrawal Transaction",
    },
    { sighash: "0x9bf62d82", name: "l2Sender", method: "L2 Sender" },
    {
      sighash: "0xa14238e7",
      name: "finalizedWithdrawals",
      method: "Finalized Withdrawals",
    },
    {
      sighash: "0xa35d99df",
      name: "minimumGasLimit",
      method: "Minimum Gas Limit",
    },
    { sighash: "0x724c184c", name: "GUARDIAN", method: "GUARDIAN" },
    { sighash: "0x8456cb59", name: "pause", method: "Pause" },
    { sighash: "0x8b4c40b0", name: "donateETH", method: "Donate ETH" },
    { sighash: "0x5c975abb", name: "paused", method: "Paused" },
    {
      sighash: "0x6dbffb78",
      name: "isOutputFinalized",
      method: "Is Output Finalized",
    },
    { sighash: "0x001c2ff6", name: "L2_ORACLE", method: "L2_ORACLE" },
    { sighash: "0x3f4ba83a", name: "unpause", method: "Unpause" },
    {
      sighash: "0x4870496f",
      name: "proveWithdrawalTransaction",
      method: "Prove Withdrawal Transaction",
    },
    { sighash: "0x54fd4d50", name: "version", method: "Version" },
  ]);
});
