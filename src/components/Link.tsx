import Link from "next/link";
import { AnchorHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: "default" | "muted" | "underline";
  external?: boolean;
}

const CustomLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, href, variant = "default", external, children, ...props }, ref) => {
    const variants = {
      default: "text-primary hover:text-primary/80 font-medium transition-colors",
      muted: "text-muted-foreground hover:text-foreground transition-colors",
      underline: "text-primary underline underline-offset-2 hover:text-primary/80 transition-colors",
    };

    const isExternal = external || href.startsWith("http");

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(variants[variant], className)}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

CustomLink.displayName = "Link";

export { CustomLink as Link };