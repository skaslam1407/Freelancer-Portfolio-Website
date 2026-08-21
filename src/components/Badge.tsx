import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "destructive" | "success";
  size?: "default" | "sm" | "lg";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "default", children, ...props }, ref) => {
    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/80",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline: "text-foreground border border-border hover:bg-accent",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
      success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    };

    const sizes = {
      default: "px-2.5 py-0.5 text-xs",
      sm: "px-2 py-0.5 text-[10px]",
      lg: "px-3 py-1 text-sm",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center font-medium rounded-full transition-colors",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };