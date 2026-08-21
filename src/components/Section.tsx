import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: "default" | "muted" | "bordered";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = "default", padding = "lg", children, ...props }, ref) => {
    const variants = {
      default: "bg-background",
      muted: "bg-muted",
      bordered: "bg-background border-y border-border",
    };

    const paddings = {
      none: "",
      sm: "py-8 sm:py-12",
      md: "py-12 sm:py-16 lg:py-20",
      lg: "py-16 sm:py-20 lg:py-24",
      xl: "py-20 sm:py-24 lg:py-32",
    };

    return (
      <section
        ref={ref}
        className={cn(variants[variant], paddings[padding], className)}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";