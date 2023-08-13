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

export function CreateFormSendETH(props: {
  form: UseFormReturn<z.infer<typeof CreateFormSchema>>;
}) {
  const { form } = props;

  const activityNetwork = form.watch("activityNetwork", "ethereum");
  const sendETHRecipient = form.watch("sendETHRecipient");
  const sendETHMinAmount = form.watch("sendETHMinAmount");

  return (
    <>
      <FormField
        control={form.control}
        name="sendETHRecipient"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium text-base">
              Recipient address
            </FormLabel>
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
        name="sendETHMinAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium text-base">
              Mininum amount{" "}
              <span className="font-regular text-white/60">(Optional)</span>
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                min={0}
                placeholder="0"
                step="0.0000001"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Summary of the Send ETH activity */}
      <div className="bg-white/10 ring-2 ring-white/20 text-base font-medium overflow-x-scroll px-4 py-5 rounded-xl">
        <p>
          Anyone who has sent at least{" "}
          <b>{sendETHMinAmount ? sendETHMinAmount : 0} ETH</b> to the{" "}
          <b>{activityNetwork}</b> address{" "}
          <b>{sendETHRecipient ? sendETHRecipient : "(recipient address)"}</b>{" "}
          in one transaction will be eligible to claim the stardrop
        </p>
      </div>
    </>
  );
}
