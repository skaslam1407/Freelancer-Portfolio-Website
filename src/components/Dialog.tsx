"use client";

import { Fragment, ReactNode, forwardRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  className?: string;
}

export function Dialog({ open, onOpenChange, children, className }: DialogProps) {
  if (!open) return null;

  return (
    <Fragment>
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in-0"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />
      <div
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-card p-6 shadow-lg animate-in fade-in-0 zoom-in-95 sm:max-w-xl",
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        {children}
      </div>
    </Fragment>
  );
}

interface DialogTriggerProps {
  children: ReactNode;
}

export function DialogTrigger({ children }: DialogTriggerProps) {
  return <>{children}</>;
}

interface DialogContentProps {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

export function DialogContent({ children, className, title, description }: DialogContentProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {(title || description) && (
        <div className="flex items-start justify-between space-x-4">
          <div className="space-y-1.5">
            {title && (
              <h2 id="dialog-title" className="text-lg font-semibold">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {}}
            className="absolute right-4 top-4"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {children}
    </div>
  );
}

interface DialogHeaderProps {
  children: ReactNode;
  className?: string;
}

export function DialogHeader({ children, className }: DialogHeaderProps) {
  return <div className={cn("space-y-1.5", className)}>{children}</div>;
}

interface DialogTitleProps {
  children: ReactNode;
  className?: string;
}

export function DialogTitle({ children, className }: DialogTitleProps) {
  return <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>;
}

interface DialogDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function DialogDescription({ children, className }: DialogDescriptionProps) {
  return <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>;
}

interface DialogFooterProps {
  children: ReactNode;
  className?: string;
}

export function DialogFooter({ children, className }: DialogFooterProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-end space-x-2 mt-4",
        className
      )}
    >
      {children}
    </div>
  );
}

interface DialogCloseProps {
  children: ReactNode;
  className?: string;
}

export function DialogClose({ children, className }: DialogCloseProps) {
  return <Button variant="ghost" className={className}>{children}</Button>;
}