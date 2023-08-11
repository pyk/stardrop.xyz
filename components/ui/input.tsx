import * as React from "react";
import { Image as ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { ChangeEvent, useState } from "react";
import Image from "next/image";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Shape
          "flex w-full rounded-xl px-4 py-4",
          // Default styles
          "bg-white ring-2 ring-gray-100 placeholder:text-gray-400 ring-offset-white",
          // Focus styles
          "focus-visible:outline-none focus-visible:ring-gray-900",
          // Error styles
          "aria-[invalid=true]:ring-red-500",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

const InputMedia = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [media, setMedia] = useState<string | null>(null);

    const previewImage = async (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        setMedia(URL.createObjectURL(event.target.files[0]));
      }
    };

    if (media) {
      return (
        <div className="flex flex-col items-center">
          <div className="relative w-full aspect-square ring-2 ring-gray-100 rounded-xl">
            <Image
              src={media}
              fill={true}
              alt="preview"
              className="rounded-xl object-contain"
            />
          </div>
          <label
            htmlFor="replace-media"
            className="h-4 bg-red-500 cursor-pointer"
          >
            <p>update media</p>
            <input
              id="replace-media"
              type="file"
              className="hidden"
              accept=".png, .svg, .jpeg, .jpg, .gif, .mp4"
              onChange={previewImage}
              {...props}
            />
          </label>
        </div>
      );
    }

    return (
      <div className={cn("flex items-center justify-center w-full")}>
        <label
          htmlFor="dropzone-file"
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
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={previewImage}
            {...props}
          />
        </label>
      </div>
    );
  }
);
InputMedia.displayName = "InputMedia";

export { Input, InputMedia };
