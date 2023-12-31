import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "antialiased inline-flex items-center justify-center ring-offset-white transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-80 button-focus-visible",
  {
    variants: {
      variant: {
        default: cn(
          // Default state
          "text-base leading-6 font-medium bg-white text-black",
          // Hover state
          "hover:bg-white/80"
        ),
        destructive:
          "bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-red-50 dark:hover:bg-red-900/90",
        outline:
          "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        secondary: "bg-gray-100 font-medium text-gray-900 hover:bg-gray-200",
        ghost: "text-base leading-6 font-medium hover:bg-white/10 text-white",
        link: "text-white underline-offset-4 hover:underline dark:text-slate-50",
      },
      size: {
        default: "py-2 px-4 rounded-full",
        sm: "h-9 rounded-2xl px-4",
        lg: "h-14 rounded-2xl px-8",
        icon: "h-10 w-10 rounded-xl",
        jumbo: "h-16 px-7 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
