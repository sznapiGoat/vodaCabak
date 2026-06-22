import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      "flex h-12 w-full rounded-lg border border-edge bg-white/[0.03] px-4 py-2 text-sm text-slate-100 transition-colors",
      "placeholder:text-slate-500",
      "focus-visible:outline-none focus-visible:border-water/60 focus-visible:ring-2 focus-visible:ring-water/25",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };
