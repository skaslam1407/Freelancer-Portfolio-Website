import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "destructive" | "success" | "muted" | "primary";
  size?: "default" | "sm" | "lg";
  dot?: boolean;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "default", children, dot, ...props }, ref) => {
    const variants = {
      default: "bg-primary text-primary-foreground",
      primary: "bg-primary/10 text-primary border border-primary/20",
      secondary: "bg-secondary text-secondary-foreground",
      outline: "text-foreground border border-border hover:bg-accent",
      destructive: "bg-destructive/10 text-destructive border border-destructive/20",
      success: "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20",
      muted: "bg-muted text-muted-foreground",
    };

    const sizes = {
      default: "px-2.5 py-0.5 text-xs gap-1.5",
      sm: "px-2 py-0.5 text-[10px] gap-1",
      lg: "px-3 py-1 text-sm gap-2",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center font-medium rounded-full transition-all duration-200",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              variant === "success" && "bg-green-500",
              variant === "destructive" && "bg-destructive",
              variant === "default" && "bg-primary",
              variant === "primary" && "bg-primary",
              variant === "secondary" && "bg-secondary-foreground",
              variant === "muted" && "bg-muted-foreground",
              variant === "outline" && "bg-foreground"
            )}
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };