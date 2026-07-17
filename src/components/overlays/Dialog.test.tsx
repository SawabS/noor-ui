import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dialog } from "./Dialog";
import { Button } from "../inputs/Button";

describe("Dialog", () => {
  it("opens on trigger click, exposes an accessible dialog with its title, and closes on Escape returning focus to the trigger", async () => {
    const user = userEvent.setup();
    render(
      <Dialog
        trigger={<Button>Open</Button>}
        title="Delete conversation"
        description="This cannot be undone."
      >
        <p>Body content</p>
      </Dialog>,
    );

    const trigger = screen.getByRole("button", { name: "Open" });
    await user.click(trigger);

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText("Delete conversation")).toBeInTheDocument();
    expect(dialog).toHaveAccessibleName("Delete conversation");

    await user.keyboard("{Escape}");

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("closes via the close button", async () => {
    const user = userEvent.setup();
    render(
      <Dialog trigger={<Button>Open</Button>} title="Settings">
        <p>Body</p>
      </Dialog>,
    );

    await user.click(screen.getByRole("button", { name: "Open" }));
    await screen.findByRole("dialog");

    await user.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("supports controlled open state", async () => {
    const { rerender } = render(
      <Dialog
        trigger={<Button>Open</Button>}
        title="Controlled"
        open={false}
        onOpenChange={() => {}}
      >
        <p>Body</p>
      </Dialog>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    rerender(
      <Dialog
        trigger={<Button>Open</Button>}
        title="Controlled"
        open={true}
        onOpenChange={() => {}}
      >
        <p>Body</p>
      </Dialog>,
    );
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });
});
