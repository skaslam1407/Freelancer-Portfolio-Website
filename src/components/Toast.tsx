"use client";

import { useState, useCallback, createContext, useContext, ReactNode } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";

export type ToastType = "default" | "success" | "error" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => string;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).slice(2, 9);
      const newToast = { ...toast, id };
      setToasts((prev) => [...prev, newToast]);

      if (toast.duration !== 0) {
        setTimeout(() => removeToast(id), toast.duration ?? 5000);
      }

      return id;
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2" aria-live="polite">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const icons = {
    default: Info,
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  };

  const Icon = icons[toast.type];

  const typeStyles = {
    default: "border-border",
    success: "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950",
    error: "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950",
    info: "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950",
  };

  const titleStyles = {
    default: "text-foreground",
    success: "text-green-800 dark:text-green-200",
    error: "text-red-800 dark:text-red-200",
    info: "text-blue-800 dark:text-blue-200",
  };

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg border shadow-lg min-w-[300px] max-w-md animate-in slide-in-from-right duration-300",
        typeStyles[toast.type]
      )}
      role="alert"
    >
      <div className="flex-1">
        <div className="flex items-start gap-2">
          <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", titleStyles[toast.type])} />
          <div className="flex-1">
            <p className={cn("font-medium", titleStyles[toast.type])}>{toast.title}</p>
            {toast.description && (
              <p className="text-sm text-muted-foreground mt-1">{toast.description}</p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 -mr-1 -mt-1"
            onClick={() => onRemove(toast.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}