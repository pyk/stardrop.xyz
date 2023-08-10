"use client";

import { useSIWE } from "connectkit";
import { SignInButton } from "@/components/sign-in-button";

import { z } from "zod";
import { useForm } from "react-hook-form";
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
import { Input } from "./ui/input";

const CreateFormSchema = z.object({
  actionNetwork: z.enum(["ethereum", "optimism", "zora", "base"], {
    required_error: "You need to select a network.",
  }),
  actionType: z.enum(["eth-transfer", "raw-contract-call"]),
  actionTargetAddress: z.string(),
  actionSelector: z.string(),
  actionMinValue: z.number().min(0),
  name: z.string().min(2).max(50),
  symbol: z.string().toUpperCase().min(3).max(15),
});

export function CreatePage() {
  const siwe = useSIWE();

  // 1. Define your form.
  const form = useForm<z.infer<typeof CreateFormSchema>>({
    resolver: zodResolver(CreateFormSchema),
  });

  console.log("DEBUG: form", form);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CreateFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  if (siwe.isSignedIn) {
    return (
      <div className="px-4 py-4 sm:px-6 md:px-7 md:py-6 lg:py-9 lg:px-0">
        <Form {...form}>
          <form
            className="lg:max-w-3xl mx-auto"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* Form header */}
            <div className="flex flex-col space-y-2">
              <h1 className="font-bold text-3xl md:text-4xl text-gray-900">
                Create Stardrop
              </h1>
              <p className="font-medium text-gray-500 text-lg">
                Reward onchain activity with special NFT
              </p>
            </div>
            {/* Onchain action group */}
            <div className="mt-8">
              <h2 className="font-bold text-lg text-gray-900">
                Onchain action
              </h2>
              <p className="text-gray-500">
                Specify required onchain action to claim the NFT
              </p>
            </div>
            {/* Select source chain */}
            <div className="mt-8 max-w-xl">
              <FormField
                name="actionNetwork"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-gray-900 text-base">
                      Choose network
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-3 sm:grid-cols-4 gap-2"
                      >
                        {/* Ethereum */}
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

                        {/* Optimism */}
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
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Select onchain action */}
            <div className="mt-8 max-w-xl">
              <FormField
                control={form.control}
                name="actionType"
                render={({ field }) => {
                  console.log("DEBUG: choose action field", field);
                  return (
                    <>
                      <FormItem>
                        <FormLabel className="font-bold text-gray-900 text-base">
                          Choose action
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select onchain action" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="eth-transfer">
                              ETH Transfer
                            </SelectItem>
                            <SelectItem value="raw-contract-call">
                              Raw Contract Call
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                      {/* show additional options for eth-transfer */}
                      {field.value == "eth-transfer" && (
                        <>
                          <FormField
                            control={form.control}
                            name="actionTargetAddress"
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
                            name="actionMinValue"
                            render={({ field }) => (
                              <FormItem className="mt-4">
                                <FormLabel>
                                  Min amount{" "}
                                  <span className="text-gray-500">
                                    (Optional)
                                  </span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    min={0}
                                    placeholder="0"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}
                      {/* show additional options for raw-contract-call */}
                      {field.value == "raw-contract-call" && (
                        <>
                          <FormField
                            control={form.control}
                            name="actionTargetAddress"
                            render={({ field }) => (
                              <FormItem className="mt-4">
                                <FormLabel>Contract address</FormLabel>
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
                            name="actionSelector"
                            render={({ field }) => (
                              <FormItem className="mt-4">
                                <FormLabel>Function signature</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="transfer(address, uint)"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}
                    </>
                  );
                }}
              />
            </div>

            {/* Onchain action group */}
            <div className="mt-8">
              <h2 className="font-bold text-lg text-gray-900">Reward</h2>
              <p className="text-gray-500">NFT for the eligible users</p>
            </div>
          </form>
        </Form>
      </div>
    );
  } else {
    // flex-1 with parent flex and flex-col will fill remaining height
    return (
      <div className="flex-1 flex flex-col justify-center items-center space-y-4 md:space-y-8">
        <div className="flex flex-col items-center space-y-2">
          <h1 className="font-bold text-5xl max-w-[320px] sm:max-w-none text-center text-gray-900">
            Create on Stardrop
          </h1>
          <p className=" text-xl max-w-[320px] sm:max-w-none text-center text-gray-500">
            Start creating on Stardrop by connecting your wallet first
          </p>
        </div>
        <div>
          <SignInButton size="lg" />
        </div>
      </div>
    );
  }
}
