import { describe, expect, it, beforeAll, afterEach, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { SegmentedControl } from "../inputs/SegmentedControl";

/**
 * jsdom reports every offset as 0, so the marker's measurement is stubbed from
 * a registry keyed on each button's label. The registry has to be populated
 * *before* render, because measurement happens in a layout effect during the
 * initial commit — which is itself one of the things under test.
 */
const boxes = new Map<string, { left: number; top: number; width: number; height: number }>();

beforeAll(() => {
  const props = [
    ["offsetLeft", "left"],
    ["offsetTop", "top"],
    ["offsetWidth", "width"],
    ["offsetHeight", "height"],
  ] as const;
  for (const [prop, key] of props) {
    Object.defineProperty(HTMLElement.prototype, prop, {
      configurable: true,
      get(this: HTMLElement) {
        return boxes.get(this.textContent ?? "")?.[key] ?? 0;
      },
    });
  }
});

afterEach(() => boxes.clear());

const OPTIONS = [
  { value: "a", label: "Alpha" },
  { value: "b", label: "Beta" },
  { value: "c", label: "Gamma" },
];

function marker(): HTMLElement {
  const el = document.querySelector<HTMLElement>(".n-marker");
  if (!el) throw new Error("marker not rendered");
  return el;
}

describe("travelling marker measurement", () => {
  it("is already at the active item on the first painted frame", () => {
    // useLayoutEffect, not useEffect: if this were measured after paint the
    // marker would flash at the origin and then animate in from it.
    boxes.set("Alpha", { left: 4, top: 4, width: 60, height: 30 });
    boxes.set("Beta", { left: 68, top: 4, width: 52, height: 30 });
    boxes.set("Gamma", { left: 124, top: 4, width: 66, height: 30 });

    render(<SegmentedControl aria-label="Range" options={OPTIONS} defaultValue="b" />);

    // No act(), no waitFor(): the very first assertion after render already
    // sees the final transform.
    expect(marker()).toHaveStyle({ transform: "translate(68px, 4px)" });
    expect(marker()).toHaveStyle({ width: "52px", height: "30px" });
    expect(marker()).toHaveAttribute("data-ready", "true");
  });

  it("tracks both axes, so a wrapped row moves the marker down as well as across", () => {
    // Measuring only offsetLeft/offsetWidth was the original bug: a group that
    // wrapped onto a second row left the marker stranded on the first.
    boxes.set("Alpha", { left: 4, top: 4, width: 60, height: 30 });
    boxes.set("Beta", { left: 68, top: 4, width: 52, height: 30 });
    boxes.set("Gamma", { left: 4, top: 38, width: 66, height: 30 });

    const { rerender } = render(
      <SegmentedControl aria-label="Range" options={OPTIONS} value="a" />,
    );
    expect(marker()).toHaveStyle({ transform: "translate(4px, 4px)" });

    rerender(<SegmentedControl aria-label="Range" options={OPTIONS} value="c" />);
    expect(marker()).toHaveStyle({ transform: "translate(4px, 38px)" });
    expect(marker()).toHaveStyle({ width: "66px", height: "30px" });
  });

  it("supports a vertical group through the same code path", () => {
    boxes.set("Alpha", { left: 4, top: 4, width: 120, height: 30 });
    boxes.set("Beta", { left: 4, top: 38, width: 120, height: 30 });
    boxes.set("Gamma", { left: 4, top: 72, width: 120, height: 30 });

    render(
      <SegmentedControl
        aria-label="Range"
        options={OPTIONS}
        orientation="vertical"
        defaultValue="c"
      />,
    );
    expect(marker()).toHaveStyle({ transform: "translate(4px, 72px)" });
  });

  it("stays disarmed when the active item has a zero box", () => {
    // A zero box means the group is inside something hidden. Arming here would
    // animate the marker in from the origin when the container is revealed.
    render(<SegmentedControl aria-label="Range" options={OPTIONS} defaultValue="a" />);
    expect(marker()).toHaveAttribute("data-ready", "false");
  });

  it("re-measures once the webfont lands", async () => {
    // Label widths only settle after document.fonts.ready resolves; without
    // this the marker keeps the width it had in the fallback font.
    let resolveFonts: () => void = () => {};
    const ready = new Promise<void>((resolve) => {
      resolveFonts = resolve;
    });
    const original = Object.getOwnPropertyDescriptor(document, "fonts");
    Object.defineProperty(document, "fonts", { configurable: true, value: { ready } });

    boxes.set("Alpha", { left: 4, top: 4, width: 40, height: 30 });
    render(<SegmentedControl aria-label="Range" options={OPTIONS} defaultValue="a" />);
    expect(marker()).toHaveStyle({ width: "40px" });

    boxes.set("Alpha", { left: 4, top: 4, width: 61, height: 30 });
    await act(async () => {
      resolveFonts();
      await ready;
    });
    expect(marker()).toHaveStyle({ width: "61px" });

    if (original) Object.defineProperty(document, "fonts", original);
    else Reflect.deleteProperty(document, "fonts");
  });

  it("re-measures when the track resizes", async () => {
    const callbacks: Array<() => void> = [];
    const original = window.ResizeObserver;
    window.ResizeObserver = class {
      constructor(cb: () => void) {
        callbacks.push(cb);
      }
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof ResizeObserver;

    boxes.set("Alpha", { left: 4, top: 4, width: 40, height: 30 });
    render(<SegmentedControl aria-label="Range" options={OPTIONS} defaultValue="a" />);
    expect(marker()).toHaveStyle({ width: "40px" });

    boxes.set("Alpha", { left: 4, top: 4, width: 90, height: 30 });
    await act(async () => {
      for (const cb of callbacks) cb();
    });
    expect(marker()).toHaveStyle({ width: "90px" });

    window.ResizeObserver = original;
  });

  it("does not survive as a duplicate announcement of the selection", () => {
    boxes.set("Alpha", { left: 4, top: 4, width: 60, height: 30 });
    render(<SegmentedControl aria-label="Range" options={OPTIONS} defaultValue="a" />);
    // The marker is decorative; aria-checked is what announces state.
    expect(marker()).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByRole("radio", { name: "Alpha" })).toHaveAttribute("aria-checked", "true");
  });

  it("survives an option being removed without leaking its node", () => {
    boxes.set("Alpha", { left: 4, top: 4, width: 60, height: 30 });
    boxes.set("Beta", { left: 68, top: 4, width: 52, height: 30 });
    const { rerender } = render(
      <SegmentedControl aria-label="Range" options={OPTIONS} value="a" />,
    );
    expect(() =>
      rerender(<SegmentedControl aria-label="Range" options={OPTIONS.slice(0, 2)} value="a" />),
    ).not.toThrow();
    expect(marker()).toHaveStyle({ transform: "translate(4px, 4px)" });
  });

  it("does not blow up where ResizeObserver is unavailable", () => {
    const original = window.ResizeObserver;
    // @ts-expect-error deliberately removing the global for this case
    delete window.ResizeObserver;
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() =>
      render(<SegmentedControl aria-label="Range" options={OPTIONS} defaultValue="a" />),
    ).not.toThrow();
    spy.mockRestore();
    window.ResizeObserver = original;
  });
});
