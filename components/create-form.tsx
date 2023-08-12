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
import { Button } from "./ui/button";

export const CreateFormSchema = z.object({
  // NFT data
  nftName: z.string().trim().min(1).max(50),
  nftSymbol: z.string().trim().min(1).max(20).toUpperCase(),
  nftDescription: z.string().max(10000),
  nftMedia: z.instanceof(File).refine((media) => media && media.name != "", {
    message: "Please provide the media",
  }),

  activityNetwork: z.enum(activityNetworks, {
    required_error: "You need to select a network.",
  }),
  activity: z.enum(activities, {
    required_error: "You need to select onchain activity.",
  }),

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

  // actionTargetAddress: z.string(),
  // actionSelector: z.string(),
  // actionMinValue: z.number().min(0),
  // name: z.string().min(2).max(50),
  // symbol: z.string().toUpperCase().min(3).max(15),

  // transactionHash: z.string(),
});

export function CreateForm() {
  const siwe = useSIWE();

  // 1. Define your form.
  const form = useForm<z.infer<typeof CreateFormSchema>>({
    resolver: zodResolver(CreateFormSchema),
    defaultValues: {
      nftName: "",
      nftSymbol: "",
      nftDescription: "",
      nftMedia: new File([], ""),

      activityNetwork: "ethereum",
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
    formData.set("nftMedia", values["nftMedia"]);

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

  if (siwe.isSignedIn) {
    return (
      <div className="px-4 py-4 sm:px-6 md:px-7 md:py-6 lg:py-9 lg:px-0">
        <Form {...form}>
          <form
            className="lg:max-w-3xl mx-auto"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* Start from header */}
            <div className="flex flex-col space-y-2">
              <h1 className="font-bold text-3xl md:text-4xl text-gray-900">
                Create Stardrop
              </h1>
              <p className="font-medium text-gray-500 text-lg">
                Reward onchain activity with NFT
              </p>
            </div>
            {/* End from header */}

            {/* Start Name */}
            <div className="mt-8 max-w-xl">
              <FormField
                control={form.control}
                name="nftName"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel className="font-bold text-gray-900 text-base">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Welcome to Base" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* End Name */}

            {/* Start Symbol */}
            <div className="mt-8 max-w-xl">
              <FormField
                control={form.control}
                name="nftSymbol"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel className="font-bold text-gray-900 text-base">
                      Symbol
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="uppercase"
                        placeholder="STARDROP"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* End Symbol */}

            {/* Start Description */}
            <div className="mt-8 max-w-xl">
              <FormField
                control={form.control}
                name="nftDescription"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel className="font-bold text-gray-900 text-base">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Onchain Summer is started. Bridge to Base mainnet in order to claim this special NFT."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* End Description */}

            {/* Start Media */}
            <div className="mt-8 max-w-xl">
              <CreateFormMedia form={form} />
            </div>
            {/* End Media */}

            {/* Start onchain activity */}
            <div className="mt-8">
              <h2 className="font-bold text-lg text-gray-900">
                Onchain activity
              </h2>
              <p className="text-gray-500">
                Specify required onchain acitivity to claim the stardrop
              </p>
            </div>
            {/* End onchain activity */}

            {/* Select source chain */}
            <div className="mt-8 max-w-xl">
              <FormField
                name="activityNetwork"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-gray-900 text-base">
                      Choose network
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={"ethereum"}
                        className="grid grid-cols-3 sm:grid-cols-4 gap-2"
                      >
                        {/* Start Ethereum */}
                        <FormItem className="space-y-0">
                          <FormControl>
                            <RadioGroupChainItem
                              value="ethereum"
                              className="bg-gray-100 hover:bg-black hover:bg-[url('/chain-selected-bg.svg')] hover:bg-cover hover:bg-center rounded-2xl px-4 py-6  data-[state=checked]:bg-black data-[state=checked]:bg-[url('/chain-selected-bg.svg')] data-[state=checked]:bg-cover data-[state=checked]:bg-center min-w-[100px] w-full group/ethereum overflow-hidden"
                            >
                              <div className="z-10 flex flex-col space-y-2 items-center">
                                <Icons.ethereum className="fill-gray-900 group-hover/ethereum:fill-white group-data-[state=checked]/ethereum:fill-white h-16 w-16" />
                                <div className="flex flex-col space-y-1">
                                  <h3 className="text-sm font-bold text-gray-900 group-hover/ethereum:text-white group-data-[state=checked]/ethereum:text-white leading-none">
                                    Ethereum
                                  </h3>
                                  <p className="text-sm font-medium text-gray-400 group-hover/ethereum:text-white/80 group-data-[state=checked]/ethereum:text-white/80 leading-none">
                                    ETH
                                  </p>
                                </div>
                              </div>
                            </RadioGroupChainItem>
                          </FormControl>
                        </FormItem>
                        {/* End Ethereum */}

                        {/* Start Optimism */}
                        <FormItem className="space-y-0">
                          <FormControl>
                            <RadioGroupChainItem
                              value="optimism"
                              className="bg-gray-100 hover:bg-black hover:bg-[url('/chain-selected-bg.svg')] hover:bg-cover hover:bg-center rounded-2xl px-4 py-6  data-[state=checked]:bg-black data-[state=checked]:bg-[url('/chain-selected-bg.svg')] data-[state=checked]:bg-cover data-[state=checked]:bg-center min-w-[100px] w-full group/optimism overflow-hidden"
                            >
                              <div className="z-10 flex flex-col space-y-2 items-center">
                                <Icons.optimism className="fill-gray-900 group-hover/optimism:fill-white group-data-[state=checked]/optimism:fill-white h-16 w-16" />
                                <div className="flex flex-col space-y-1">
                                  <h3 className="text-sm font-bold text-gray-900 group-hover/optimism:text-white group-data-[state=checked]/optimism:text-white leading-none">
                                    Optimism
                                  </h3>
                                  <p className="text-sm font-medium text-gray-400 group-hover/optimism:text-white/80 group-data-[state=checked]/optimism:text-white/80 leading-none">
                                    OP
                                  </p>
                                </div>
                              </div>
                            </RadioGroupChainItem>
                          </FormControl>
                        </FormItem>
                        {/* End Optimism */}

                        {/* Start Base */}
                        <FormItem className="space-y-0">
                          <FormControl>
                            <RadioGroupChainItem
                              value="base"
                              className="bg-gray-100 hover:bg-black hover:bg-[url('/chain-selected-bg.svg')] hover:bg-cover hover:bg-center rounded-2xl px-4 py-6  data-[state=checked]:bg-black data-[state=checked]:bg-[url('/chain-selected-bg.svg')] data-[state=checked]:bg-cover data-[state=checked]:bg-center min-w-[100px] w-full group/base overflow-hidden"
                            >
                              <div className="z-10 flex flex-col space-y-2 items-center">
                                <Icons.base className="fill-gray-900 group-hover/base:fill-white group-data-[state=checked]/base:fill-white h-16 w-16" />
                                <div className="flex flex-col space-y-1">
                                  <h3 className="text-sm font-bold text-gray-900 group-hover/base:text-white group-data-[state=checked]/base:text-white leading-none">
                                    Base
                                  </h3>
                                  <p className="text-sm font-medium text-gray-400 group-hover/base:text-white/80 group-data-[state=checked]/base:text-white/80 leading-none">
                                    BASE
                                  </p>
                                </div>
                              </div>
                            </RadioGroupChainItem>
                          </FormControl>
                        </FormItem>
                        {/* End Base */}

                        {/* Start Zora */}
                        <FormItem className="space-y-0">
                          <FormControl>
                            <RadioGroupChainItem
                              value="zora"
                              className="bg-gray-100 hover:bg-black hover:bg-[url('/chain-selected-bg.svg')] hover:bg-cover hover:bg-center rounded-2xl px-4 py-6  data-[state=checked]:bg-black data-[state=checked]:bg-[url('/chain-selected-bg.svg')] data-[state=checked]:bg-cover data-[state=checked]:bg-center min-w-[100px] w-full group/zora overflow-hidden"
                            >
                              <div className="z-10 flex flex-col space-y-2 items-center">
                                <Icons.zora className="fill-gray-900 group-hover/zora:fill-white group-data-[state=checked]/zora:fill-white h-16 w-16" />
                                <div className="flex flex-col space-y-1">
                                  <h3 className="text-sm font-bold text-gray-900 group-hover/zora:text-white group-data-[state=checked]/zora:text-white leading-none">
                                    Zora
                                  </h3>
                                  <p className="text-sm font-medium text-gray-400 group-hover/zora:text-white/80 group-data-[state=checked]/zora:text-white/80 leading-none">
                                    ZORA
                                  </p>
                                </div>
                              </div>
                            </RadioGroupChainItem>
                          </FormControl>
                        </FormItem>
                        {/* End Base */}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Select onchain activity */}
            <div className="mt-8 max-w-xl">
              <FormField
                control={form.control}
                name="activity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-gray-900 text-base">
                      Choose activity
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select activity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* Show supported activity in selected network */}
                        {networkActivities[activityNetwork].map((activity) => (
                          <SelectItem
                            key={activity.value}
                            value={activity.value}
                          >
                            {activity.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {activity == null && <CreateFormNoActivity />}
              {activity == "send-eth" && <CreateFormSendETH form={form} />}
              {activity == "receive-eth" && (
                <CreateFormReceiveETH form={form} />
              )}
              {activity == "send-token" && <CreateFormSendToken form={form} />}
            </div>
            {/* end onchain activity */}

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

            {/* Start submission status */}
            {/* End submission status */}
          </form>
        </Form>
      </div>
    );
  } else {
    // flex-1 with parent flex and flex-col will fill remaining height
    return (
      <div className="flex-1 flex flex-col justify-center items-center space-y-4 md:space-y-8">
        <div className="flex flex-col items-center space-y-2">
          <h1 className="font-bold text-5xl max-w-[320px] sm:max-w-none sm:text-6xl lg:text-7xl text-center text-gray-900">
            Create Stardrop
          </h1>
          <p className="text-xl max-w-[320px] sm:text-2xl sm:max-w-[400px] lg:text-3xl lg:max-w-[600px] text-center text-gray-500">
            Start creating a new Stardrop by connecting your wallet first
          </p>
        </div>
      </div>
    );
  }
}
