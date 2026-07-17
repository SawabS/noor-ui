import * as React from "react";
import * as RadixAvatar from "@radix-ui/react-avatar";
import { User } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utilities/cn";

const avatarVariants = cva(
  "inline-flex items-center justify-center overflow-hidden rounded-pill bg-surface-raised shrink-0",
  {
    variants: {
      size: {
        sm: "size-6 text-caption",
        md: "size-8 text-caption",
        lg: "size-10 text-body-sm",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export interface AvatarProps
  extends
    React.ComponentPropsWithoutRef<typeof RadixAvatar.Root>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  name?: string;
}

function initialsFrom(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}

export const Avatar = React.forwardRef<React.ElementRef<typeof RadixAvatar.Root>, AvatarProps>(
  ({ className, size, src, name, ...props }, ref) => (
    <RadixAvatar.Root ref={ref} className={cn(avatarVariants({ size }), className)} {...props}>
      {src ? (
        <RadixAvatar.Image src={src} alt={name ?? ""} className="size-full object-cover" />
      ) : null}
      <RadixAvatar.Fallback
        className="flex size-full items-center justify-center font-medium text-text-secondary"
        delayMs={src ? 400 : 0}
      >
        {name ? initialsFrom(name) : <User className="size-1/2" aria-hidden="true" />}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  ),
);
Avatar.displayName = "Avatar";
