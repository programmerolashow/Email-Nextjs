import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";

export const ScrollArea = React.forwardRef<React.ElementRef<typeof ScrollAreaPrimitive.Root>, React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>>(
  ({ className, children, ...props }, ref) => (
    <ScrollAreaPrimitive.Root ref={ref} className={cn("relative overflow-hidden rounded-md", className)} {...props}>
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">{children}</ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar orientation="vertical" className="flex touch-none select-none p-1 transition-colors duration-150 ease-out hover:bg-slate-100 dark:hover:bg-slate-900">
        <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-slate-300 dark:bg-slate-700" />
      </ScrollAreaPrimitive.Scrollbar>
      <ScrollAreaPrimitive.Scrollbar orientation="horizontal" className="flex touch-none select-none p-1 transition-colors duration-150 ease-out hover:bg-slate-100 dark:hover:bg-slate-900">
        <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-slate-300 dark:bg-slate-700" />
      </ScrollAreaPrimitive.Scrollbar>
      <ScrollAreaPrimitive.Corner className="bg-slate-200 dark:bg-slate-800" />
    </ScrollAreaPrimitive.Root>
  )
);

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
