import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
  it("keeps solid as the compatible default", () => {
    render(<Card>Default card</Card>);
    expect(screen.getByText("Default card")).toHaveClass("bg-surface");
  });

  it.each([
    ["solid", "bg-surface"],
    ["tonal", "bg-surface-tonal"],
    ["material", "n-material"],
    ["elevated", "bg-surface-elevated"],
  ] as const)("maps the %s surface to its semantic recipe", (surface, className) => {
    render(<Card surface={surface}>{surface}</Card>);
    expect(screen.getByText(surface)).toHaveClass(className);
  });
});
