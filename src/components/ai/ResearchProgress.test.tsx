import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ResearchProgress } from "./ResearchProgress";

describe("ResearchProgress", () => {
  it("announces only the active step and concise completion count", () => {
    const { container } = render(
      <ResearchProgress
        steps={[
          { id: "1", label: "Plan research", status: "done" },
          { id: "2", label: "Review sources", status: "active" },
          { id: "3", label: "Write report", status: "pending" },
        ]}
      />,
    );

    const announcement = screen.getByText("Review sources. 1 of 3 steps complete.");
    expect(announcement).toHaveAttribute("aria-live", "polite");
    expect(announcement).toHaveAttribute("aria-atomic", "true");
    expect(container.querySelector('[aria-current="step"]')).toHaveTextContent("Review sources");
  });

  it("announces completion without making the full list live", () => {
    const { container } = render(
      <ResearchProgress steps={[{ id: "1", label: "Finish", status: "done" }]} />,
    );
    expect(screen.getByText("Research complete. 1 of 1 steps complete.")).toBeInTheDocument();
    expect(container.querySelector("ol")).not.toHaveAttribute("aria-live");
  });
});
