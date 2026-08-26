import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { DEFAULT_RENDER_CAP, applyRenderCap, formatRenderCapNotice } from "./render-cap";
import { DataList } from "../components/data-display/DataList";
import { SourceCitationList } from "../components/ai/SourceCitationList";

describe("applyRenderCap", () => {
  const items = Array.from({ length: 1000 }, (_, i) => i);

  it("bounds the painted slice but reports the true total", () => {
    // Only painting is bounded. Counts, sorting, filtering and export must all
    // still see the full set — that is what makes the cap safe.
    const result = applyRenderCap(items, 250);
    expect(result.visible).toHaveLength(250);
    expect(result.total).toBe(1000);
    expect(result.hidden).toBe(750);
    expect(result.truncated).toBe(true);
  });

  it("does not slice when the input is already under the cap", () => {
    const result = applyRenderCap([1, 2, 3], 250);
    expect(result.truncated).toBe(false);
    expect(result.visible).toHaveLength(3);
  });

  it("paints everything when the cap is null", () => {
    expect(applyRenderCap(items, null).visible).toHaveLength(1000);
  });

  it("treats a non-positive cap as no cap rather than as an empty table", () => {
    expect(applyRenderCap(items, 0).visible).toHaveLength(1000);
    expect(applyRenderCap(items, -5).visible).toHaveLength(1000);
  });

  it("never mutates the input", () => {
    const input = [1, 2, 3, 4];
    applyRenderCap(input, 2);
    expect(input).toEqual([1, 2, 3, 4]);
  });

  it("formats the notice with locale-aware numbers", () => {
    expect(formatRenderCapNotice({ shown: 250, total: 18000, locale: "en-US" })).toBe(
      "Showing the first 250 of 18,000. Export for the full set.",
    );
  });
});

describe("node count stays flat as input grows", () => {
  // The defect this exists for: ~18,000 rows across three tables produced
  // 150,415 DOM nodes, and because the markup stays in the document on every
  // route the cost was paid even on pages that never showed them. A CPU
  // profile showed 86% idle — it was never JS, it was DOM size.
  function nodeCount(container: HTMLElement): number {
    return container.querySelectorAll("*").length;
  }

  function makeItems(count: number) {
    return Array.from({ length: count }, (_, i) => ({ label: `Key ${i}`, value: `Value ${i}` }));
  }

  it("DataList paints the same number of nodes for 1k and 20k items", () => {
    const small = render(<DataList items={makeItems(1000)} />);
    const large = render(<DataList items={makeItems(20000)} />);
    expect(nodeCount(large.container)).toBe(nodeCount(small.container));
    // And that number is bounded by the cap, not by the input.
    expect(nodeCount(small.container)).toBeLessThan(DEFAULT_RENDER_CAP * 3);
  });

  it("DataList surfaces a footer naming the full total", () => {
    const { container } = render(<DataList items={makeItems(18000)} />);
    expect(container.textContent).toContain("Showing the first 250 of 18,000");
  });

  it("DataList paints everything when the consumer opts out", () => {
    const { container } = render(<DataList items={makeItems(400)} renderCap={null} />);
    expect(container.querySelectorAll("dt")).toHaveLength(400);
    expect(container.textContent).not.toContain("Showing the first");
  });

  it("SourceCitationList caps too, and keeps the real count in the notice", () => {
    const sources = Array.from({ length: 900 }, (_, i) => ({
      title: `Source ${i}`,
      href: `https://example.com/${i}`,
    }));
    const { container } = render(<SourceCitationList sources={sources} renderCap={10} />);
    expect(container.querySelectorAll("li")).toHaveLength(11); // 10 sources + notice
    expect(container.textContent).toContain("Showing the first 10 of 900");
  });
});
