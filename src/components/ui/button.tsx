import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center whitespace-nowrap border font-label text-[10px] tracking-[0.16em] uppercase transition-[transform,opacity,background-color,border-color,color] duration-300 ease-quart-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 motion-safe:hover:-translate-y-0.5",
  {
    variants: {
      variant: {
        default: "border-brutal bg-accent text-accent-foreground hover:opacity-90",
        secondary:
          "border-border-strong/45 bg-background/90 text-foreground motion-safe:hover:border-foreground/65 motion-safe:hover:bg-surface",
        outline:
          "border-border bg-transparent text-foreground motion-safe:hover:border-border-strong/35 motion-safe:hover:bg-surface/35",
        ghost:
          "border-transparent bg-transparent text-foreground-muted motion-safe:hover:border-border-strong/35 motion-safe:hover:bg-surface/30 motion-safe:hover:text-foreground",
        link: "min-h-0 border-0 bg-transparent px-0 py-0 text-foreground underline-offset-4 motion-safe:hover:translate-y-0 motion-safe:hover:underline",
      },
      size: {
        default: "px-6 py-3",
        sm: "min-h-9 px-4 py-2 text-[9px] tracking-[0.14em]",
        lg: "min-h-12 px-8 py-3 text-xs tracking-[0.18em]",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { buttonVariants };
