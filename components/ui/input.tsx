import * as React from "react";

import { cn } from "@/lib/utils";

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

export { Input };
