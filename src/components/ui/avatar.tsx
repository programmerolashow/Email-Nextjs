import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Avatar({ className, children, ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        "inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function AvatarFallback({ className, children, ...props }: AvatarProps) {
  return (
    <span className={cn("text-sm font-medium", className)} {...props}>
      {children}
    </span>
  );
}
