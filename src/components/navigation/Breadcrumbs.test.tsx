import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Breadcrumbs } from "./Breadcrumbs";

const items = [
  { label: "Home", href: "/" },
  { label: "Conversations", href: "/conversations" },
  { label: "Kurdish grammar rules" },
];

describe("Breadcrumbs", () => {
  it("exposes a Breadcrumb navigation landmark and marks the last item as the current page", () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();

    const current = screen.getByText("Kurdish grammar rules");
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current.tagName).toBe("SPAN");
  });

  it("renders earlier items as real links", () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Conversations" })).toHaveAttribute(
      "href",
      "/conversations",
    );
  });

  it("renders correctly under an RTL ancestor without needing per-item direction logic", () => {
    render(
      <div dir="rtl">
        <Breadcrumbs items={[{ label: "الرئيسية", href: "/" }, { label: "قواعد اللغة الكردية" }]} />
      </div>,
    );
    expect(screen.getByRole("link", { name: "الرئيسية" })).toBeInTheDocument();
    expect(screen.getByText("قواعد اللغة الكردية")).toHaveAttribute("aria-current", "page");
  });
});
