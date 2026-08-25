import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("keeps a text colour alongside a custom font-size utility", () => {
    // Regression: tailwind-merge classified `text-caption` as a colour and
    // dropped `text-text-primary`, leaving buttons with no colour of their own.
    const result = cn("text-text-primary", "text-caption");
    expect(result).toContain("text-text-primary");
    expect(result).toContain("text-caption");
  });

  it("still lets a later font-size win over an earlier one", () => {
    const result = cn("text-body-sm", "text-caption");
    expect(result).toBe("text-caption");
  });

  it("still lets a later text colour win over an earlier one", () => {
    const result = cn("text-text-primary", "text-text-muted");
    expect(result).toBe("text-text-muted");
  });

  it("merges ordinary conflicting utilities", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});
