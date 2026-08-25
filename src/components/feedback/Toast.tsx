import * as React from "react";
import * as RadixToast from "@radix-ui/react-toast";
import { useDirection as useRadixDirection } from "@radix-ui/react-direction";
import { cva } from "class-variance-authority";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";
import { cn } from "../../utilities/cn";
import { Icon } from "../primitives/Icon";
import { IconButton } from "../inputs/IconButton";
import type { OverlaySurfaceVariant } from "../../foundations/types";
import { getOverlaySurfaceClassName } from "../../utilities/surface";

export type ToastVariant = "neutral" | "success" | "warning" | "danger";

interface ToastItem {
  id: string;
  title?: string;
  description?: React.ReactNode;
  variant: ToastVariant;
  duration: number;
}

interface ToastContextValue {
  toast: (item: Partial<Omit<ToastItem, "id">> & { title?: string }) => string;
  dismiss: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

/** Enqueue toasts from anywhere under <ToastProvider>. */
export function useToast(): ToastContextValue {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

const toastVariants = cva(
  "pointer-events-auto flex w-full items-start gap-3 rounded-md border border-border p-4 shadow-lg",
  {
    variants: {
      variant: {
        neutral: "[&_svg]:text-text-secondary",
        success: "[&_svg]:text-success",
        warning: "[&_svg]:text-warning",
        danger: "[&_svg]:text-danger",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

const iconFor: Record<ToastVariant, typeof Info> = {
  neutral: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: AlertCircle,
};

export interface ToastProviderProps {
  children: React.ReactNode;
  surface?: OverlaySurfaceVariant;
}

/**
 * Mount <ToastProvider> once near the app root. Descendants call
 * useToast().toast({...}) to enqueue a notification.
 */
export function ToastProvider({ children, surface = "auto" }: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);
  const dir = useRadixDirection();

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = React.useCallback<ToastContextValue["toast"]>((item) => {
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : String(Date.now() + Math.random());
    setToasts((prev) => [...prev, { id, variant: "neutral", duration: 5000, ...item }]);
    return id;
  }, []);

  const value = React.useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      <RadixToast.Provider swipeDirection={dir === "rtl" ? "left" : "right"} duration={5000}>
        {children}
        {toasts.map(({ id, title, description, variant, duration }) => (
          <RadixToast.Root
            key={id}
            duration={duration}
            onOpenChange={(open) => {
              if (!open) dismiss(id);
            }}
            className={cn(
              toastVariants({ variant }),
              getOverlaySurfaceClassName(surface),
              "data-[state=open]:animate-slide-in-from-bottom data-[state=closed]:animate-fade-out",
              "motion-reduce:data-[state=open]:animate-none motion-reduce:data-[state=closed]:animate-none",
              "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]",
              "data-[swipe=end]:animate-fade-out",
            )}
          >
            <Icon icon={iconFor[variant]} size="sm" className="mt-0.5 shrink-0" />
            <div className="flex-1">
              {title && (
                <RadixToast.Title className="text-label font-medium text-text-primary">
                  {title}
                </RadixToast.Title>
              )}
              {description && (
                <RadixToast.Description className="text-body-sm text-text-secondary">
                  {description}
                </RadixToast.Description>
              )}
            </div>
            <RadixToast.Close asChild>
              <IconButton
                aria-label="Dismiss notification"
                variant="ghost"
                size="sm"
                className="-m-1 shrink-0"
              >
                <Icon icon={X} size="sm" />
              </IconButton>
            </RadixToast.Close>
          </RadixToast.Root>
        ))}
        <RadixToast.Viewport
          className={cn(
            "fixed bottom-0 end-0 z-toast flex w-full flex-col gap-2 p-4 outline-none",
            "sm:max-w-content-sm",
          )}
        />
      </RadixToast.Provider>
    </ToastContext.Provider>
  );
}
