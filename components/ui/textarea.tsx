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
          "bg-white/5 ring-2 ring-white/10 placeholder:text-white/60 ring-offset-white text-base font-medium",
          // Focus styles
          "focus-visible:outline-none focus-visible:bg-white/10 focus-visible:ring-white/20",
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
