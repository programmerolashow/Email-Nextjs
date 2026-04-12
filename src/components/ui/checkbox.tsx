import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>>(
  ({ className, ...props }, ref) => (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded border border-slate-200 bg-white text-blue-600 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900",
        className
      )}
      {...props}
    />
  )
);

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export const CheckboxIndicator = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Indicator>, React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Indicator>>(
  ({ className, ...props }, ref) => (
    <CheckboxPrimitive.Indicator ref={ref} className={cn("flex items-center justify-center text-current", className)} {...props}>
      <Check className="h-3.5 w-3.5" />
    </CheckboxPrimitive.Indicator>
  )
);

CheckboxIndicator.displayName = CheckboxPrimitive.Indicator.displayName;
