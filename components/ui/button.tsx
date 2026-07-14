import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-water/60 disabled:pointer-events-none disabled:opacity-50 active:translate-y-[1px]",
  {
    variants: {
      variant: {
        water:
          "bg-water text-zinc-950 font-semibold hover:bg-water-soft shadow-glow-water hover:shadow-[0_0_50px_-6px_rgba(6,182,212,.75)]",
        heat:
          "bg-heat text-zinc-950 font-semibold hover:bg-heat-soft shadow-glow-heat hover:shadow-[0_0_50px_-6px_rgba(249,115,22,.75)]",
        outline:
          "border border-edge bg-white/[0.02] text-slate-100 hover:border-water/50 hover:bg-white/[0.04]",
        ghost: "text-slate-300 hover:text-white hover:bg-white/5",
      },
      size: {
        default: "h-11 px-6",
        lg: "h-[52px] px-8 text-base",
        sm: "h-9 px-4",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "water", size: "default" },
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
