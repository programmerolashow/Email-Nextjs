import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "default" | "ghost" | "outline";
export type ButtonSize = "default" | "icon" | "sm";

const buttonVariants: Record<ButtonVariant, string> = {
  default: "inline-flex items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50",
  ghost: "inline-flex items-center justify-center rounded-full bg-transparent text-slate-900 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800",
  outline: "inline-flex items-center justify-center rounded-full border border-slate-200 bg-transparent text-slate-900 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800",
};

const buttonSizes: Record<ButtonSize, string> = {
  default: "h-10 px-4 py-2 text-sm",
  icon: "h-10 w-10 p-0",
  sm: "h-9 px-3 text-sm",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({ className, variant = "default", size = "default", ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants[variant], buttonSizes[size], className)} {...props} />
  );
}
