import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { ImageIcon } from "lucide-react";
import Image from "next/image";

import { CreateFormSchema } from "@/components/create-page";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

export function CreateFormMedia(props: {
  form: UseFormReturn<z.infer<typeof CreateFormSchema>>;
}) {
  const { form } = props;
  const media = form.watch("nftMedia");
  if (media && media.name != "") {
    const sourceMedia = URL.createObjectURL(media);

    return (
      <FormField
        control={form.control}
        name="nftMedia"
        render={({ field }) => (
          <FormItem className="mt-4">
            <FormLabel className="font-bold text-gray-900 text-base">
              Media
            </FormLabel>
            <FormControl>
              <div className="flex flex-col items-center">
                <div className="relative w-full aspect-square ring-2 ring-gray-100 rounded-xl">
                  <Image
                    src={sourceMedia}
                    fill={true}
                    alt="preview"
                    className="rounded-xl object-contain"
                  />
                </div>
                <label
                  htmlFor="replace-media"
                  className="mt-2 cursor-pointer flex flex-col items-center rounded-xl py-4 w-full ring-2 text-gray-500 ring-gray-100 hover:ring-gray-900 hover:text-gray-900"
                >
                  <p className="text-center text-base leading-0">
                    Replace media
                  </p>
                  <Input
                    id="replace-media"
                    accept=".jpg, .jpeg, .png, .svg, .gif, .mp4"
                    type="file"
                    onChange={(e) =>
                      field.onChange(e.target.files ? e.target.files[0] : null)
                    }
                    className="hidden"
                  />
                </label>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  return (
    <FormField
      control={form.control}
      name="nftMedia"
      render={({ field }) => (
        <FormItem className="mt-4">
          <FormLabel className="font-bold text-gray-900 text-base">
            Media
          </FormLabel>
          <FormControl>
            <div className={cn("flex items-center justify-center w-full")}>
              <label
                htmlFor="input-media"
                className={cn(
                  // Shape
                  "flex flex-col items-center justify-center w-full h-64 cursor-pointer",
                  // Style
                  "ring-2 ring-gray-100 rounded-xl"
                )}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 space-y-4">
                  <ImageIcon size={32} className="text-gray-400" />
                  <div className="flex flex-col space-y-2 items-center leading-none">
                    <p className="text-gray-400 dark:text-gray-400">
                      Click to upload media from your device
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-400 leading-none">
                      SVG, PNG, JPG, GIF or MP4
                    </p>
                  </div>
                </div>

                <Input
                  id="input-media"
                  accept=".jpg, .jpeg, .png, .svg, .gif, .mp4"
                  type="file"
                  onChange={(e) =>
                    field.onChange(e.target.files ? e.target.files[0] : null)
                  }
                  className="hidden"
                />
              </label>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  // if (media) {
  //   const sourceMedia = URL.createObjectURL(media);
  //   console.log("DEBUG: sourceMedia", sourceMedia);
  //   return (
  //     <FormField
  //       control={form.control}
  //       name="nftMedia"
  //       render={({ field }) => (
  //         <FormItem className="mt-4">
  //           <FormLabel className="font-bold text-gray-900 text-base">
  //             Media
  //           </FormLabel>
  //           <FormControl>
  //             <div className="flex flex-col items-center">
  //               <div className="relative w-full aspect-square ring-2 ring-gray-100 rounded-xl">
  //                 <Image
  //                   src={sourceMedia}
  //                   fill={true}
  //                   alt="preview"
  //                   className="rounded-xl object-contain"
  //                 />
  //               </div>
  //               <label
  //                 htmlFor="replace-media"
  //                 className="h-4 bg-red-500 cursor-pointer"
  //               >
  //                 <p>update media</p>

  //                 {/* @ts-expect-error */}
  //                 <input
  //                   id="replace-media"
  //                   type="file"
  //                   accept=".jpg, .jpeg, .png, .svg, .gif, .mp4"
  //                   className="hidden"
  //                   {...field}
  //                   onChange={(e) =>
  //                     field.onChange(e.target.files ? e.target.files[0] : "")
  //                   }
  //                 />
  //               </label>
  //             </div>
  //           </FormControl>
  //           <FormMessage />
  //         </FormItem>
  //       )}
  //     />
  //   );
  // }
}
