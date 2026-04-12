import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "secondary" | "outline";

const badgeVariants: Record<BadgeVariant, string> = {
  default: "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100",
  secondary: "bg-blue-50 text-blue-600 border border-blue-100 dark:bg-blue-900/40 dark:text-blue-200 dark:border-blue-800",
  outline: "border border-slate-300 bg-transparent text-slate-900 dark:border-slate-700 dark:text-slate-100",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", badgeVariants[variant], className)} {...props} />
  );
}
