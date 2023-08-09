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

const CreateFormSchema = z.object({
  chainId: z
    .enum(["1", "2", "3"], {
      required_error: "You need to select a network.",
    })
    .transform((c) => Number(c)),
  name: z.string().min(2).max(50),
  symbol: z.string().toUpperCase().min(3).max(15),
});

export function CreatePage() {
  const siwe = useSIWE();

  // 1. Define your form.
  const form = useForm<z.infer<typeof CreateFormSchema>>({
    resolver: zodResolver(CreateFormSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CreateFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  if (siwe.isSignedIn) {
    return (
      <div className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Form header */}
            <div className="flex flex-col space-y-2">
              <h1 className="font-bold text-3xl text-gray-900">
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
            <div className="mt-8">
              <FormField
                control={form.control}
                name="chainId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-gray-900">
                      Choose network
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={`${field.value}`}
                        className="grid grid-cols-3 gap-2"
                      >
                        {/* Ethereum */}
                        <FormItem className="space-y-0">
                          <FormControl>
                            <RadioGroupChainItem value="1">
                              <div className="flex flex-col space-y-2 items-center">
                                <Icons.ethereum />
                                <div className="flex flex-col space-y-1">
                                  <h3 className="text-sm font-bold text-gray-900 leading-none">
                                    Ethereum
                                  </h3>
                                  <p className="text-sm font-medium text-gray-500 leading-none">
                                    ETH
                                  </p>
                                </div>
                              </div>
                            </RadioGroupChainItem>
                          </FormControl>
                        </FormItem>

                        {/* Optimism */}
                        <FormItem>
                          <FormControl>
                            <RadioGroupChainItem value="op">
                              <div className="flex flex-col space-y-2 items-center">
                                <Icons.optimism />
                                <div className="flex flex-col space-y-1">
                                  <h3 className="text-sm font-bold text-gray-900 leading-none">
                                    Optimism
                                  </h3>
                                  <p className="text-sm font-medium text-gray-500 leading-none">
                                    OP
                                  </p>
                                </div>
                              </div>
                            </RadioGroupChainItem>
                          </FormControl>
                        </FormItem>

                        {/* Base */}
                        <FormItem>
                          <FormControl>
                            <RadioGroupChainItem value="base">
                              <div className="flex flex-col space-y-2 items-center">
                                <Icons.base />
                                <div className="flex flex-col space-y-1">
                                  <h3 className="text-sm font-bold text-gray-900 leading-none">
                                    Base
                                  </h3>
                                  <p className="text-sm font-medium text-gray-500 leading-none">
                                    BASE
                                  </p>
                                </div>
                              </div>
                            </RadioGroupChainItem>
                          </FormControl>
                        </FormItem>

                        {/* Zora */}
                        <FormItem>
                          <FormControl>
                            <RadioGroupChainItem value="zora">
                              <div className="flex flex-col space-y-2 items-center">
                                <Icons.zora />
                                <div className="flex flex-col space-y-1">
                                  <h3 className="text-sm font-bold text-gray-900 leading-none">
                                    ZORA
                                  </h3>
                                  <p className="text-sm font-medium text-gray-500 leading-none">
                                    ZORB
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
