import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SegmentedControl } from "./SegmentedControl";

const OPTIONS = [
  { value: "a", label: "Alpha" },
  { value: "b", label: "Beta" },
  { value: "c", label: "Gamma" },
];

function renderControl(dir: "ltr" | "rtl", orientation: "horizontal" | "vertical" = "horizontal") {
  return render(
    <div dir={dir}>
      <SegmentedControl
        aria-label="Range"
        options={OPTIONS}
        orientation={orientation}
        defaultValue="b"
      />
    </div>,
  );
}

function checked(): string {
  const active = screen
    .getAllByRole("radio")
    .find((el) => el.getAttribute("aria-checked") === "true");
  return active?.textContent ?? "";
}

describe("SegmentedControl keyboard navigation", () => {
  it("moves forward on ArrowRight in LTR", async () => {
    const user = userEvent.setup();
    renderControl("ltr");
    await user.tab();
    await user.keyboard("{ArrowRight}");
    expect(checked()).toBe("Gamma");
    await user.keyboard("{ArrowLeft}");
    expect(checked()).toBe("Beta");
  });

  it("flips the horizontal arrows under RTL", async () => {
    // Arabic and Sorani readers expect ArrowLeft to advance, because "next" is
    // to the left of "current" for them.
    const user = userEvent.setup();
    renderControl("rtl");
    await user.tab();
    await user.keyboard("{ArrowLeft}");
    expect(checked()).toBe("Gamma");
    await user.keyboard("{ArrowRight}");
    expect(checked()).toBe("Beta");
  });

  it("does NOT flip the vertical arrows under RTL", async () => {
    // Only the horizontal axis mirrors. Up/Down are physical in every writing
    // direction; mirroring them reverses vertical groups for no reason.
    const user = userEvent.setup();
    renderControl("rtl", "vertical");
    await user.tab();
    await user.keyboard("{ArrowDown}");
    expect(checked()).toBe("Gamma");
    await user.keyboard("{ArrowUp}");
    expect(checked()).toBe("Beta");
  });

  it("wraps at both ends and supports Home/End", async () => {
    const user = userEvent.setup();
    renderControl("ltr");
    await user.tab();
    await user.keyboard("{End}");
    expect(checked()).toBe("Gamma");
    await user.keyboard("{ArrowRight}");
    expect(checked()).toBe("Alpha");
    await user.keyboard("{Home}");
    expect(checked()).toBe("Alpha");
    await user.keyboard("{ArrowLeft}");
    expect(checked()).toBe("Gamma");
  });
});

describe("SegmentedControl semantics", () => {
  it("announces its orientation", () => {
    renderControl("ltr", "vertical");
    expect(screen.getByRole("radiogroup")).toHaveAttribute("aria-orientation", "vertical");
    renderControl("ltr");
    expect(screen.getAllByRole("radiogroup")[1]).toHaveAttribute("aria-orientation", "horizontal");
  });

  it("keeps a roving tabindex on the selected segment", () => {
    renderControl("ltr");
    const [alpha, beta] = screen.getAllByRole("radio");
    expect(beta).toHaveAttribute("tabindex", "0");
    expect(alpha).toHaveAttribute("tabindex", "-1");
  });

  it("no longer paints an opaque background on the active segment", () => {
    // The active segment used to carry `bg-surface`, which reads as a solid
    // black block on a translucent canvas. Selection is the marker's job now.
    renderControl("ltr");
    for (const segment of screen.getAllByRole("radio")) {
      expect(segment.className).not.toMatch(/(^|\s)bg-surface(\s|$)/);
    }
    expect(document.querySelector(".n-marker")).not.toBeNull();
  });

  it("hover tints the label rather than the background", () => {
    // A hover fill would put a second slab behind the travelling marker.
    renderControl("ltr");
    for (const segment of screen.getAllByRole("radio")) {
      expect(segment.className).toContain("n-ghost-control");
      expect(segment.className).not.toContain("hover:bg-");
    }
  });

  it("respects controlled values", async () => {
    const user = userEvent.setup();
    render(<SegmentedControl aria-label="Range" options={OPTIONS} value="a" />);
    await user.click(screen.getByRole("radio", { name: "Gamma" }));
    expect(checked()).toBe("Alpha");
  });
});
