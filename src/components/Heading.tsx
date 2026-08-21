import { HTMLAttributes, forwardRef, ElementType } from "react";
import { cn } from "@/lib/utils";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: "default" | "display" | "section" | "subsection";
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 2, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "",
      display: "font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight",
      section: "text-3xl sm:text-4xl font-semibold tracking-tight",
      subsection: "text-xl sm:text-2xl font-medium",
    };

    const levels = {
      1: "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight",
      2: "text-3xl sm:text-4xl font-semibold tracking-tight",
      3: "text-2xl sm:text-3xl font-semibold",
      4: "text-xl sm:text-2xl font-medium",
      5: "text-lg sm:text-xl font-medium",
      6: "text-base sm:text-lg font-medium",
    };

    const Tag: ElementType = `h${level}`;

    return (
      <Tag
        ref={ref}
        className={cn(levels[level], variants[variant], className)}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

Heading.displayName = "Heading";

export { Heading };