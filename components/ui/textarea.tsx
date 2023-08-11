import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // Shape
          "flex w-full rounded-xl px-4 py-4 min-h-[114px]",
          // Default styles
          "bg-white ring-2 ring-gray-100 placeholder:text-gray-400 ring-offset-white",
          // Focus styles
          "focus-visible:outline-none focus-visible:ring-gray-900",
          // Error styles
          "aria-[invalid=true]:ring-red-500",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
