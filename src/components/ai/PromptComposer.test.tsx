import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { PromptComposer } from "./PromptComposer";

function ControlledComposer(props: Partial<React.ComponentProps<typeof PromptComposer>>) {
  const [value, setValue] = React.useState(props.value ?? "");
  const onSubmit = props.onSubmit ?? vi.fn();
  return <PromptComposer value={value} onValueChange={setValue} onSubmit={onSubmit} {...props} />;
}

describe("PromptComposer", () => {
  it("submits on Enter and clears nothing on its own (consumer owns value)", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<ControlledComposer onSubmit={onSubmit} />);

    const textbox = screen.getByRole("textbox", { name: "Message" });
    await user.type(textbox, "Hello there");
    await user.keyboard("{Enter}");

    expect(onSubmit).toHaveBeenCalledWith("Hello there");
  });

  it("inserts a newline on Shift+Enter instead of submitting", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<ControlledComposer onSubmit={onSubmit} />);

    const textbox = screen.getByRole("textbox", { name: "Message" }) as HTMLTextAreaElement;
    await user.type(textbox, "line one");
    await user.keyboard("{Shift>}{Enter}{/Shift}");
    await user.type(textbox, "line two");

    expect(onSubmit).not.toHaveBeenCalled();
    expect(textbox.value).toBe("line one\nline two");
  });

  it("does not submit an empty or whitespace-only message", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<ControlledComposer onSubmit={onSubmit} />);

    const textbox = screen.getByRole("textbox", { name: "Message" });
    await user.type(textbox, "   ");
    await user.keyboard("{Enter}");

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("disables the textarea and blocks submission while loading", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<ControlledComposer value="hi" onSubmit={onSubmit} loading />);

    const textbox = screen.getByRole("textbox", { name: "Message" });
    expect(textbox).toBeDisabled();
    expect(screen.getByRole("button", { name: "Send message" })).toBeDisabled();

    await user.keyboard("{Enter}");
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("shows a Stop button while streaming and calls onStop", async () => {
    const onStop = vi.fn();
    const user = userEvent.setup();
    render(<ControlledComposer value="hi" streaming onStop={onStop} />);

    const stopButton = screen.getByRole("button", { name: "Stop generating" });
    await user.click(stopButton);
    expect(onStop).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("button", { name: "Send message" })).not.toBeInTheDocument();
  });

  it("disables the whole composer when disabled is set", () => {
    render(<ControlledComposer value="hi" disabled />);
    expect(screen.getByRole("textbox", { name: "Message" })).toBeDisabled();
  });
});
