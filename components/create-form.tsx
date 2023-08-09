"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateFormSchema = z.object({
  chainId: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .nonempty({ message: "Teams is required" }),
  name: z.string().min(2).max(50),
  symbol: z.string().toUpperCase().min(3).max(15),
});

export function CreateForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof CreateFormSchema>>({
    resolver: zodResolver(CreateFormSchema),
    defaultValues: {
      name: "",
      symbol: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CreateFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="flex flex-col">
      <div className="hidden">preview</div>
      <div className="flex flex-col">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <h2>Onchain action</h2>
              <div>
                {/* source chain selector */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="m@example.com">
                            m@example.com
                          </SelectItem>
                          <SelectItem value="m@google.com">
                            m@google.com
                          </SelectItem>
                          <SelectItem value="m@support.com">
                            m@support.com
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        You can manage email addresses in your
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="name"
                  control={form.control}
                  render={(field) => (
                    <FormItem>
                      <FormLabel>Target address</FormLabel>
                      <FormControl>
                        <Input placeholder="Stardrop" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="name"
                  control={form.control}
                  render={(field) => (
                    <FormItem>
                      <FormLabel>Select action</FormLabel>
                      <FormControl>
                        <Input placeholder="Stardrop" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div>
              <h2>Claimable reward</h2>
              <div>
                <FormField
                  name="name"
                  control={form.control}
                  render={(field) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Stardrop" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="symbol"
                  control={form.control}
                  render={(field) => (
                    <FormItem>
                      <FormLabel>Symbol</FormLabel>
                      <FormControl>
                        <Input placeholder="$STARDROP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="symbol"
                  control={form.control}
                  render={(field) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="$STARDROP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="symbol"
                  control={form.control}
                  render={(field) => (
                    <FormItem>
                      <FormLabel>Upload media</FormLabel>
                      <FormControl>
                        <Input placeholder="$STARDROP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit">Create Stardrop</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
