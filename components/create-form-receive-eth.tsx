"use client";

import { z } from "zod";
import { UseFormReturn } from "react-hook-form";

import { CreateFormSchema } from "@/components/create-page";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function CreateFormReceiveETH(props: {
  form: UseFormReturn<z.infer<typeof CreateFormSchema>>;
}) {
  const { form } = props;

  const activityNetwork = form.watch("activityNetwork", "ethereum");
  const activityAddress = form.watch("activityAddress");
  const activityMinMessageValue = form.watch("activityMinMessageValue");

  return (
    <>
      <div>
        <FormField
          control={form.control}
          name="activityAddress"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Sender address</FormLabel>
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
          name="activityMinMessageValue"
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
            Anyone who has received at least{" "}
            <b>{activityMinMessageValue ? activityMinMessageValue : 0} ETH</b>{" "}
            from the <b>{activityNetwork}</b> address{" "}
            <b>{activityAddress ? activityAddress : "(sender address)"}</b> in
            one transaction will be eligible to claim the stardrop
          </p>
        </div>
      </div>
    </>
  );
}
