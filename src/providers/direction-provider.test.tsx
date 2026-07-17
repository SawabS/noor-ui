import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DirectionProvider, useDirection, isRtlLocale } from "./direction-provider";

function Consumer() {
  const { direction, setDirection } = useDirection();
  return (
    <div>
      <span data-testid="direction">{direction}</span>
      <button onClick={() => setDirection("rtl")}>rtl</button>
    </div>
  );
}

describe("DirectionProvider", () => {
  it("defaults to ltr and applies dir to <html>", () => {
    render(
      <DirectionProvider>
        <Consumer />
      </DirectionProvider>,
    );
    expect(screen.getByTestId("direction")).toHaveTextContent("ltr");
    expect(document.documentElement.getAttribute("dir")).toBe("ltr");
  });

  it("switches to rtl and updates <html dir>", async () => {
    const user = userEvent.setup();
    render(
      <DirectionProvider>
        <Consumer />
      </DirectionProvider>,
    );
    await user.click(screen.getByText("rtl"));
    expect(screen.getByTestId("direction")).toHaveTextContent("rtl");
    expect(document.documentElement.getAttribute("dir")).toBe("rtl");
  });

  it("does not touch the document when applyToDocument is false", async () => {
    document.documentElement.setAttribute("dir", "ltr");
    const user = userEvent.setup();
    render(
      <DirectionProvider applyToDocument={false}>
        <Consumer />
      </DirectionProvider>,
    );
    await user.click(screen.getByText("rtl"));
    expect(screen.getByTestId("direction")).toHaveTextContent("rtl");
    expect(document.documentElement.getAttribute("dir")).toBe("ltr");
  });
});

describe("isRtlLocale", () => {
  it("recognizes Arabic and Kurdish (Sorani) locale codes as RTL", () => {
    expect(isRtlLocale("ar")).toBe(true);
    expect(isRtlLocale("ar-SA")).toBe(true);
    expect(isRtlLocale("ckb")).toBe(true);
  });

  it("does not flag English or Kurmanji (Latin-script Kurdish) as RTL", () => {
    expect(isRtlLocale("en")).toBe(false);
    expect(isRtlLocale("kmr")).toBe(false);
  });
});
