"use client";

import { useSIWE } from "connectkit";
import { SignInButton } from "@/components/sign-in-button";

import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupChainItem,
} from "./ui/radio-group";
import { Icons } from "@/components/icons";
import { Input, InputMedia } from "@/components/ui/input";
import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { CreateFormSendETH } from "./create-form-send-eth";
import { CreateFormReceiveETH } from "./create-form-receive-eth";
import { CreateFormNoActivity } from "./create-form-no-activity";
import { CreateFormSendToken } from "./create-form-send-token";
import { isAddress } from "viem";
import { activityNetworks } from "@/lib/types";
import { activities, networkActivities } from "@/lib/activity-registry";
import { Textarea } from "@/components/ui/textarea";
import { CreateFormMedia } from "./create-form-media";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";
import { Switch } from "@/components/ui/switch";

export const CreateFormSchema = z.object({
  // NFT data
  name: z.string().trim().min(1).max(50),
  symbol: z.string().trim().min(1).max(20).toUpperCase(),
  description: z.string().max(10000),
  media: z.instanceof(File).refine((media) => media && media.name != "", {
    message: "Please provide the media",
  }),

  activityNetwork: z
    .enum(activityNetworks, {
      required_error: "You need to select a network.",
    })
    .nullable(),
  activity: z.enum(activities, {
    required_error: "You need to select onchain activity.",
  }),

  // Send ETH activity
  sendETHRecipient: z
    .string()
    .refine((address) => isAddress(address), {
      message: "Address invalid",
    })
    .optional(),
  sendETHMinAmount: z.coerce.number().min(0).optional(),

  // Publish on
  publishOnOptimism: z.boolean(),
  publishOnBase: z.boolean(),
  publishOnZora: z.boolean(),

  // Activity:
  // Send ETH - Recipient address
  // Receive ETH - Sender address
  // Send Token - Recipient address
  // Receive ETH - Sender address
  activityAddress: z
    .string()
    .refine((address) => isAddress(address), {
      message: "Address invalid",
    })
    .optional(),

  // Activity:
  // Send ETH - min amount sent to the recipient
  // Receive ETH - min amount received from the sender
  activityMinMessageValue: z.coerce.number().min(0).optional(),

  // Send token and receive token
  tokenAddress: z
    .string()
    .refine((address) => isAddress(address), {
      message: "Address invalid",
    })
    .nullable(),

  tokenMinAmount: z.coerce.number().min(0).optional(),
});

export function CreateForm() {
  const account = useAccount();
  const siwe = useSIWE();

  // 1. Define your form.
  const form = useForm<z.infer<typeof CreateFormSchema>>({
    resolver: zodResolver(CreateFormSchema),
    defaultValues: {
      name: "",
      symbol: "",
      description: "",
      media: new File([], ""),

      activityNetwork: null,
      // You should avoid providing undefined as a default value, as it
      // conflicts with the default state of a controlled component.
      tokenAddress: null,
      activityAddress: "",
      tokenMinAmount: 0,
      activityMinMessageValue: 0,
    },
    mode: "onChange",
  });
  const activityNetwork = form.watch("activityNetwork");
  const activity = form.watch("activity");

  const [isCreating, setIsCreating] = useState<boolean>(false);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof CreateFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    setIsCreating(true);

    const formData = new FormData();
    formData.set("media", values["media"]);

    try {
      const res = await fetch("/stardrop", {
        method: "POST",
        body: formData,
      });
      const resJson = await res.json();

      console.log("DEBUG: resJson", resJson);
      setIsCreating(false);
    } catch (err) {
      setIsCreating(false);
      console.error(err);
    }
  }

  if (account.isConnected && siwe.isSignedIn) {
    return (
      <div className="px-4 py-4 sm:px-6 md:px-7 md:py-6 lg:py-9 lg:px-0">
        <Form {...form}>
          <form
            className="flex flex-col space-y-8 lg:max-w-xl lg:mx-auto"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* Start from header */}
            <div className="flex flex-col space-y-2">
              <h1 className="font-medium text-3xl md:text-4xl text-white">
                Create Stardrop
              </h1>
              <p className="font-medium text-white/60 text-lg">
                Reward onchain activity with NFT
              </p>
            </div>
            {/* End from header */}

            {/* Stardrop metadata */}
            <div className="flex flex-col space-y-4">
              {/* Start Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* End Name */}

              {/* Start Symbol */}
              <FormField
                control={form.control}
                name="symbol"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormControl>
                      <Input
                        className="uppercase"
                        placeholder="SYMBOL"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* End Symbol */}

              {/* Start Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormControl>
                      <Textarea
                        placeholder="Description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* End Description */}

              {/* Start Media */}
              <CreateFormMedia form={form} />

              {/* End Media */}
            </div>

            {/* Start onchain activity */}
            <div className="flex flex-col space-y-4">
              {/* Start header */}
              <div className="">
                <h2 className="font-medium text-lg text-white leading-6">
                  Onchain activity
                </h2>
                <p className="font-medium text-base text-white/60">
                  Specify required onchain acitivity to claim the stardrop
                </p>
              </div>
              {/* Start header */}

              {/* Start Select network */}
              <FormField
                control={form.control}
                name="activityNetwork"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select network" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* Show supported networks */}
                        {[
                          { value: "ethereum", name: "Ethereum" },
                          { value: "optimism", name: "Optimism" },
                          { value: "base", name: "Base" },
                          { value: "zora", name: "Zora" },
                        ].map((network) => (
                          <SelectItem
                            key={network.value}
                            value={network.value}
                          >
                            {network.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* end select network*/}

              {/* Start Select activity */}
              <FormField
                control={form.control}
                name="activity"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select activity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* Show supported activity in selected network */}
                        {activityNetwork &&
                          networkActivities[activityNetwork].map(
                            (activity) => (
                              <SelectItem
                                key={activity.value}
                                value={activity.value}
                              >
                                {activity.title}
                              </SelectItem>
                            )
                          )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* end select activity*/}

              {activity == "send-eth" && <CreateFormSendETH form={form} />}
            </div>
            {/* End onchain activity */}

            {/* Start publish on */}
            <div className="flex flex-col space-y-4">
              {/* Start header */}
              <div className="">
                <h2 className="font-medium text-lg text-white leading-6">
                  Publish on
                </h2>
                <p className="font-medium text-base text-white/60">
                  Enable network(s) to publish the stardrop
                </p>
              </div>
              {/* Start header */}

              {/* Start publish on optimism */}
              <FormField
                control={form.control}
                name="publishOnOptimism"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center rounded-xl p-4 space-x-4 bg-white/5">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="w-full">
                      <FormLabel className="text-base font-medium">
                        Optimism
                      </FormLabel>
                      <FormDescription className="text-base font-medium text-white/60">
                        Eligibile users will be able to claim this Stardrop on
                        Optimism
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              {/* end publish on optimism*/}

              {/* Start publish on Base */}
              <FormField
                control={form.control}
                name="publishOnBase"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center rounded-xl p-4 space-x-4 bg-white/5">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="w-full">
                      <FormLabel className="text-base font-medium">
                        Base
                      </FormLabel>
                      <FormDescription className="text-base font-medium text-white/60">
                        Eligibile users will be able to claim this Stardrop on
                        Base
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              {/* end publish on Base */}

              {/* Start publish on Zora */}
              <FormField
                control={form.control}
                name="publishOnZora"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center rounded-xl p-4 space-x-4 bg-white/5">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="w-full">
                      <FormLabel className="text-base font-medium">
                        Zora
                      </FormLabel>
                      <FormDescription className="text-base font-medium text-white/60">
                        Eligibile users will be able to claim this Stardrop on
                        Zora
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              {/* end publish on Base */}
            </div>
            {/* End onchain activity */}

            {/* Start Create Button */}
            <div className="mt-8 max-w-xl">
              {!isCreating && (
                <Button type="submit" className="w-full" size="lg">
                  Create Stardrop
                </Button>
              )}
              {isCreating && (
                <Button
                  type="submit"
                  disabled={true}
                  className="w-full cursor-wait"
                  size="lg"
                >
                  <Icons.spinner className="animate-spin h-5 w-5 mr-2" />
                  <span>Create Stardrop</span>
                </Button>
              )}
            </div>
            {/* End Create Button */}
          </form>
        </Form>
      </div>
    );
  } else {
    // flex-1 with parent flex and flex-col will fill remaining height
    return (
      <div className="flex-1 flex flex-col justify-center items-center space-y-4 md:space-y-8">
        <div className="flex flex-col items-center space-y-2">
          <h1 className="font-medium text-5xl max-w-[320px] sm:max-w-none sm:text-6xl lg:text-7xl text-center text-white">
            Create Stardrop
          </h1>
          <p className="text-xl max-w-[320px] sm:text-2xl sm:max-w-[400px] lg:text-3xl lg:max-w-[600px] text-center text-white/60">
            Start creating a new Stardrop by connecting your wallet first
          </p>
        </div>
      </div>
    );
  }
}
