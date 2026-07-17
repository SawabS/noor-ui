import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DropdownMenu, DropdownMenuItem } from "./DropdownMenu";
import { Button } from "../inputs/Button";

describe("DropdownMenu", () => {
  it("opens on trigger click, moves focus into the menu, and supports arrow-key navigation", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu trigger={<Button>Actions</Button>}>
        <DropdownMenuItem>Rename</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuItem destructive>Delete</DropdownMenuItem>
      </DropdownMenu>,
    );

    const trigger = screen.getByRole("button", { name: "Actions" });
    await user.click(trigger);

    expect(await screen.findByRole("menu")).toBeInTheDocument();
    const menuItems = screen.getAllByRole("menuitem");
    expect(menuItems).toHaveLength(3);

    await user.keyboard("{ArrowDown}");
    expect(menuItems[0]).toHaveFocus();

    await user.keyboard("{ArrowDown}");
    expect(menuItems[1]).toHaveFocus();
  });

  it("closes on Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu trigger={<Button>Actions</Button>}>
        <DropdownMenuItem>Rename</DropdownMenuItem>
      </DropdownMenu>,
    );

    const trigger = screen.getByRole("button", { name: "Actions" });
    await user.click(trigger);
    await screen.findByRole("menu");

    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("menu")).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("invokes onSelect and closes when a menu item is chosen", async () => {
    let selected = false;
    const user = userEvent.setup();
    render(
      <DropdownMenu trigger={<Button>Actions</Button>}>
        <DropdownMenuItem onSelect={() => (selected = true)}>Rename</DropdownMenuItem>
      </DropdownMenu>,
    );

    await user.click(screen.getByRole("button", { name: "Actions" }));
    await user.click(await screen.findByRole("menuitem", { name: "Rename" }));

    expect(selected).toBe(true);
    await waitFor(() => expect(screen.queryByRole("menu")).not.toBeInTheDocument());
  });
});
