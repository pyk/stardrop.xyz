"use client";

import { redirect, useRouter } from "next/navigation";

import { useSIWE } from "connectkit";
import { SignInButton } from "@/components/sign-in-button";

import { z } from "zod";
import { FieldErrors, useForm, useFormState, useWatch } from "react-hook-form";
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
import {
  AlertTriangle,
  ArrowRightLeft,
  MoreHorizontal,
  Rainbow,
  RefreshCcw,
  Vote,
} from "lucide-react";
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
import { cn } from "@/lib/utils";

export const CreateFormSchema = z.object({
  // NFT data
  name: z.string().trim().min(1).max(50),
  symbol: z.string().trim().min(1).max(20).toUpperCase(),
  description: z.string().max(10000),
  media: z.instanceof(File).refine((media) => media && media.name != "", {
    message: "Please provide the media",
  }),

  activityNetwork: z.enum(activityNetworks, {
    required_error: "You need to select a network.",
  }),
  activityType: z.enum(activities, {
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

  // Receive ETH activity
  receiveETHSender: z
    .string()
    .refine((address) => isAddress(address), {
      message: "Address invalid",
    })
    .optional(),
  receiveETHMinAmount: z.coerce.number().min(0).optional(),

  // Send token activity
  sendTokenRecipient: z
    .string()
    .refine((address) => isAddress(address), {
      message: "Address invalid",
    })
    .optional(),
  sendTokenMinAmount: z.coerce.number().min(0).optional(),

  // Publish on
  publishOnOptimism: z.boolean(),
  publishOnBase: z.boolean(),
  publishOnZora: z.boolean(),

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

const CreateStardropResponseSchema = z.object({
  id: z.number(),
});

export function CreateForm() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { isSignedIn } = useSIWE();

  // 1. Define your form.
  const form = useForm<z.infer<typeof CreateFormSchema>>({
    resolver: zodResolver(CreateFormSchema),
    defaultValues: {
      // NFT metadata
      name: "",
      symbol: "",
      description: "",
      media: new File([], ""),

      // You should avoid providing undefined as a default value, as it
      // conflicts with the default state of a controlled component.
      tokenAddress: null,
      tokenMinAmount: 0,
      activityMinMessageValue: 0,

      // Send ETH
      sendETHMinAmount: 0,
      sendETHRecipient: "",

      // Publish
      publishOnOptimism: false,
      publishOnBase: false,
      publishOnZora: false,
    },
    mode: "onChange",
  });
  const activityNetwork = form.watch("activityNetwork");
  const activity = form.watch("activityType");

  const [isCreating, setIsCreating] = useState<boolean>(false);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof CreateFormSchema>) {
    setIsCreating(true);

    const formData = new FormData();

    // NFT Metadata
    formData.set("name", values["name"]);
    formData.set("symbol", values["symbol"]);
    formData.set("description", values["description"]);
    formData.set("media", values["media"]);

    // Activity
    formData.set("activityNetwork", values["activityNetwork"]);
    formData.set("activityType", values["activityType"]);

    let activityData = "{}";

    // Send eth data
    if (values["activityType"] == "send-eth") {
      const recipient = values["sendETHRecipient"];
      if (recipient == null) {
        throw new Error(`Stardrop: send-eth recipient cannot be null`);
      }
      const minAmount = values["sendETHMinAmount"];
      const data = {
        recipient,
        minAmount,
      };
      activityData = JSON.stringify(data);
    }
    formData.set("activityData", activityData);

    try {
      const createRes = await fetch("/stardrop", {
        method: "POST",
        body: formData,
      });
      const createResJson = await createRes.json();
      const data = CreateStardropResponseSchema.parse(createResJson);
      console.log("DEBUG: Create Stardrop: data", data);
      // redirect to https://stardrop.xyz/${id}/publish
      router.push(`/${data.id}/publish`);
      // setIsCreating(false);
    } catch (err) {
      setIsCreating(false);
      console.error(err);
    }
  }

  function onFormInvalid(
    errors: FieldErrors<z.infer<typeof CreateFormSchema>>
  ) {
    console.log("== START CREATE FORM ERROR ===");
    console.error(errors);
    console.log("== END CREATE FORM ERROR ===");
  }

  if (isConnected && isSignedIn) {
    return (
      <div className="px-4 py-4 sm:px-6 md:px-7 md:py-6 lg:py-9 lg:px-0">
        <Form {...form}>
          <form
            className="flex flex-col space-y-8 lg:max-w-xl lg:mx-auto"
            onSubmit={form.handleSubmit(onSubmit, onFormInvalid)}
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
                name="activityType"
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
                        If enabled, eligibile users will be able to claim this
                        Stardrop on Optimism
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
                        If enabled, eligibile users will be able to claim this
                        Stardrop on Base
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
                        If enabled, eligibile users will be able to claim this
                        Stardrop on Zora
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              {/* end publish on Base */}
            </div>
            {/* End onchain activity */}

            {/* Start Create Button */}
            <div>
              {!isCreating && (
                <Button type="submit" className="w-full" size="lg">
                  Create Stardrop
                </Button>
              )}
              {isCreating && (
                <Button type="submit" className="w-full" size="lg">
                  <Icons.spinner className="w-6 h-6 mr-2 animate-spin" />{" "}
                  Create Stardrop
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
      <div
        className={cn(
          // Shape
          "flex flex-col w-100 mx-6 my-6 md:mx-7 md:my-7 lg:mx-8 lg:my-8 px-6 py-16 sm:py-20 md:py-28 lg:py-44 space-y-4 sm:space-y-6 md:space-y-8",
          // Styles
          "ring-1 ring-white/10 rounded-2xl bg-[url('/hero-bg-way.svg')] bg-cover bg-bottom"
        )}
      >
        <div className="text-center">
          <span className="text-sm md:text-base font-medium py-2 px-4 rounded-full bg-white/5 ring-2 ring-white/10 text-center">
            Boost Onchain Participation
          </span>
        </div>
        <div>
          <h1 className="text-3xl font-medium sm:text-5xl md:text-6xl text-center max-w-2xl mx-auto">
            Create Stardrop
          </h1>
          <p className="text-xl sm:text-2xl sm:mt-2 md:text-3xl max-w-xl font-medium text-slate-400 mx-auto text-center">
            Start creating a new Stardrop by connecting your wallet first
          </p>
        </div>

        <div className="flex flex-row space-x-2 flex-wrap justify-center md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="ring-1 ring-white/10 cursor-default"
          >
            <ArrowRightLeft size={24} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="ring-1 ring-white/10 cursor-default"
          >
            <Rainbow size={24} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="ring-1 ring-white/10 cursor-default"
          >
            <Vote size={24} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="ring-1 ring-white/10 cursor-default"
          >
            <RefreshCcw size={24} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="ring-1 ring-white/10 cursor-default"
          >
            <MoreHorizontal size={24} />
          </Button>
        </div>

        <div className="hidden md:flex flex-row space-x-2 flex-wrap justify-center">
          <Button
            variant={"ghost"}
            className="ring-1 ring-white/10 cursor-default"
          >
            <ArrowRightLeft size={24} className="mr-2" />
            Transfer
          </Button>
          <Button
            variant={"ghost"}
            className="ring-1 ring-white/10 cursor-default"
          >
            <Rainbow size={24} className="mr-2" />
            Bridge
          </Button>
          <Button
            variant={"ghost"}
            className="ring-1 ring-white/10 cursor-default"
          >
            <Vote size={24} className="mr-2" />
            Vote
          </Button>
          <Button
            variant={"ghost"}
            className="ring-1 ring-white/10 cursor-default"
          >
            <RefreshCcw size={24} className="mr-2" />
            Swap
          </Button>
          <Button
            variant={"ghost"}
            className="ring-1 ring-white/10 cursor-default"
          >
            <MoreHorizontal size={24} className="mr-2" />
            More
          </Button>
        </div>
      </div>
    );
  }
}
