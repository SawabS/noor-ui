import { render, screen } from "@testing-library/react";
import { Inbox } from "lucide-react";
import { describe, expect, it } from "vitest";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("renders a lucide icon component passed as the icon prop", () => {
    const { container } = render(<EmptyState icon={Inbox} heading="Nothing here" />);
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
    // lucide renders an <svg>; before isIconComponent this threw
    // "Objects are not valid as a React child".
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("still accepts already-rendered icon markup", () => {
    render(<EmptyState icon={<span data-testid="custom" />} heading="Nothing here" />);
    expect(screen.getByTestId("custom")).toBeInTheDocument();
  });

  it("renders description and action", () => {
    render(
      <EmptyState
        icon={Inbox}
        heading="Nothing here"
        description="Upload a file to begin."
        action={<button type="button">Upload</button>}
      />,
    );
    expect(screen.getByText("Upload a file to begin.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Upload" })).toBeInTheDocument();
  });
});
