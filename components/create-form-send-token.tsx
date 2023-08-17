"use client";

import { z } from "zod";
import { UseFormReturn } from "react-hook-form";

import { CreateFormSchema } from "@/components/create-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTokenMetadata } from "@/hooks/useTokenMetadata";
import { isAddress } from "viem";
import { useEffect } from "react";

export function CreateFormSendToken(props: {
  form: UseFormReturn<z.infer<typeof CreateFormSchema>>;
}) {
  const { form } = props;

  const activityNetwork = form.watch("activityNetwork", "ethereum");
  const recipient = form.watch("sendTokenRecipient");

  const tokenAddress = form.watch("tokenAddress");
  const tokenMetadata = useTokenMetadata(
    activityNetwork,
    isAddress(tokenAddress!) ? tokenAddress : null
  );
  const tokenSymbol = tokenMetadata.data
    ? tokenMetadata.data.symbol
    : "(token symbol)";
  const tokenMinAmount = form.watch("tokenMinAmount");

  // NOTE: useEffect + dependency to prevent forever loop
  useEffect(() => {
    if (tokenMetadata.isError) {
      form.setError("tokenAddress", {
        type: "custom",
        message: "Token not found",
      });
    }
  }, [form, tokenMetadata.isError]);

  return (
    <>
      <div>
        <FormField
          control={form.control}
          name="tokenAddress"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Token address</FormLabel>
              <FormControl>
                {/* @ts-expect-error */}
                <Input
                  placeholder="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sendTokenRecipient"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Recipient address</FormLabel>
              <FormControl>
                <Input
                  placeholder="0x83B50F33C40795bEDA35FC6AB84CE6F8B013D2e0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tokenMinAmount"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>
                Mininum amount{" "}
                <span className="text-gray-500">(Optional)</span>
              </FormLabel>
              <FormControl>
                <Input type="number" min={0} placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Summary of the submitted form */}
      <div className="mt-8 max-w-xl">
        <p className="font-bold text-base text-gray-900 mb-2">
          Eligibility rule
        </p>

        <div className="bg-gray-100 overflow-x-scroll px-4 py-5 rounded-xl">
          <p>
            Anyone who has sent at least{" "}
            <b>
              {tokenMinAmount ? tokenMinAmount : 0} {tokenSymbol}
            </b>{" "}
            to the <b>{activityNetwork}</b> address{" "}
            <b>{recipient ? recipient : "(recipient address)"}</b> in one
            transaction will be eligible to claim the stardrop
          </p>
        </div>
      </div>
    </>
  );
}
