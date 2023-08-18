import { parseAbiItem } from "viem";
import { z } from "zod";

// Convert "depositTransaction(address,uint256,uint64,bool,bytes)" to "depositTransaction"
function getFunctionName(methodName: string): string {
  const result = parseAbiItem(`function ${methodName} view returns (uint256)`);
  // @ts-expect-error
  return result.name as string;
}

function titleCase(text: string) {
  const str = text.toLowerCase().split(" ");
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(" ");
}

function isNumeric(value: string) {
  return /^\d+$/.test(value);
}

// Convert "depositTransaction" to "Deposit Transaction"
export function nameToMethod(name: string): string {
  // If all is uppercase e.g. GUARDIAN then return as is
  if (name == name.toUpperCase()) return name;

  const len = name.length;
  const method: string[] = [];
  for (let i = 0; i < len; i++) {
    const c = name[i];
    // First character
    if (i == 0) {
      method.push(c.toUpperCase());
      continue;
    }
    // Number
    if (isNumeric(c)) {
      method.push(c);
      continue;
    }

    // Underscore
    if (c == "_") {
      method.push(" ");
      continue;
    }

    // A => A add, space
    if (c == c.toUpperCase()) {
      method.push(" ");
      method.push(c);
      continue;
    }
    method.push(c);
  }

  return titleCase(method.join("")).replace("E T H", "ETH");
}

const LookupResponse = z.object({
  ok: z.boolean(),
  result: z.object({
    function: z.record(
      z.string(),
      z
        .array(
          z.object({
            name: z.string(),
          })
        )
        .nullable()
    ),
  }),
});

export interface Signature {
  sighash: string;
  name: string;
  method: string;
}

export async function lookup(hashes: string[]): Promise<Signature[]> {
  try {
    const res = await fetch(
      `https://api.openchain.xyz/signature-database/v1/lookup?function=${hashes.join(
        "%2C"
      )}&filter=true`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    const data = await res.json();
    const result = LookupResponse.parse(data);
    const outputs: Signature[] = [];
    for (const hash of hashes) {
      const names = result.result.function[hash];
      if (names == null || names.length == 0) {
        outputs.push({
          sighash: hash,
          name: hash,
          method: hash,
        });
        continue;
      }

      const functionName = getFunctionName(names[0].name);
      outputs.push({
        sighash: hash,
        name: functionName,
        method: nameToMethod(functionName),
      });
    }
    return outputs;
  } catch (err) {
    console.error(err);
    throw new Error(`openchain: failed to lookup ${hashes}`);
  }
}
