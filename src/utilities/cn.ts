import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * The type scale in tailwind.config.ts is fully custom (`text-caption`,
 * `text-body-sm`, `text-heading-lg`, ...). tailwind-merge cannot know those
 * names, and because they are not t-shirt sizes it files them under
 * text-*color* instead of font-size — so `cn("text-text-primary",
 * "text-caption")` used to drop the colour entirely and leave components
 * inheriting whatever colour the host page happened to set.
 *
 * Declaring the scale here keeps size and colour in separate conflict groups.
 */
const fontSizes = [
  "caption",
  "label",
  "body-sm",
  "body",
  "body-lg",
  "heading-sm",
  "heading-md",
  "heading-lg",
  "display",
];

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: fontSizes }],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
