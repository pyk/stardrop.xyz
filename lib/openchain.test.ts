import { test, expect } from "vitest";

import { lookup, nameToMethod } from "./openchain";

test("lookup", async () => {
  const methodIds = ["0x02175fa4", "0x0216f544", "0x00000000", "0x"];
  const result = await lookup(methodIds);
  expect(result).toStrictEqual([
    {
      sighash: "0x02175fa4",
      name: "setBondingDelay",
      method: "Set Bonding Delay",
    },
    {
      sighash: "0x0216f544",
      name: "transferExecutor",
      method: "Transfer Executor",
    },
    { sighash: "0x00000000", name: "0x00000000", method: "0x00000000" },
    { sighash: "0x", name: "0x", method: "0x" },
  ]);
});

test("nameToMethod", () => {
  expect(nameToMethod("initialize")).toBe("Initialize");
  expect(nameToMethod("depositTransaction")).toBe("Deposit Transaction");
  expect(nameToMethod("finalizedWithdrawals")).toBe("Finalized Withdrawals");
  expect(nameToMethod("finalizeWithdrawalTransaction")).toBe(
    "Finalize Withdrawal Transaction"
  );
  expect(nameToMethod("minimumGasLimit")).toBe("Minimum Gas Limit");
  expect(nameToMethod("GUARDIAN")).toBe("GUARDIAN");
  expect(nameToMethod("L2_ORACLE")).toBe("L2_ORACLE");
  expect(nameToMethod("set_value")).toBe("Set Value");
  expect(nameToMethod("set_value_ok")).toBe("Set Value Ok");
  expect(nameToMethod("l2Sender")).toBe("L2 Sender");
  expect(nameToMethod("l2333Sender")).toBe("L2333 Sender");
  expect(nameToMethod("donateETH")).toBe("Donate ETH");
});
