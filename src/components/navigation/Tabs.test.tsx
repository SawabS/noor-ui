import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs } from "./Tabs";

const items = [
  { value: "chat", label: "Chat", content: <p>Chat panel</p> },
  { value: "sources", label: "Sources", content: <p>Sources panel</p> },
  { value: "settings", label: "Settings", content: <p>Settings panel</p> },
];

describe("Tabs", () => {
  it("shows the first tab's content by default", () => {
    render(<Tabs items={items} />);
    expect(screen.getByText("Chat panel")).toBeVisible();
    expect(screen.getByRole("tab", { name: "Chat" })).toHaveAttribute("aria-selected", "true");
  });

  it("activates a tab on click", async () => {
    const user = userEvent.setup();
    render(<Tabs items={items} />);
    await user.click(screen.getByRole("tab", { name: "Sources" }));
    expect(screen.getByRole("tab", { name: "Sources" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Sources panel")).toBeVisible();
  });

  it("moves focus and selection between tabs with arrow keys", async () => {
    const user = userEvent.setup();
    render(<Tabs items={items} />);

    screen.getByRole("tab", { name: "Chat" }).focus();
    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("tab", { name: "Sources" })).toHaveFocus();
    expect(screen.getByRole("tab", { name: "Sources" })).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Settings" })).toHaveFocus();

    await user.keyboard("{ArrowLeft}");
    expect(screen.getByRole("tab", { name: "Sources" })).toHaveFocus();
  });

  it("skips disabled tabs", async () => {
    const withDisabled = [
      { value: "a", label: "A", content: <p>A</p> },
      { value: "b", label: "B", content: <p>B</p>, disabled: true },
      { value: "c", label: "C", content: <p>C</p> },
    ];
    const user = userEvent.setup();
    render(<Tabs items={withDisabled} />);

    screen.getByRole("tab", { name: "A" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "C" })).toHaveFocus();
  });
});
