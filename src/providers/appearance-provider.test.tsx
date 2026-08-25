import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderToString } from "react-dom/server";
import {
  AppearanceProvider,
  type AppearanceProviderProps,
  useAppearance,
} from "./appearance-provider";

function Consumer() {
  const { appearance, transparency, setAppearance, setTransparency } = useAppearance();
  return (
    <div>
      <span data-testid="appearance">{appearance}</span>
      <span data-testid="transparency">{transparency}</span>
      <button onClick={() => setAppearance("lumen")}>Use Lumen</button>
      <button onClick={() => setTransparency("reduce")}>Reduce transparency</button>
    </div>
  );
}

function renderProvider(props: Partial<AppearanceProviderProps> = {}) {
  return render(
    <AppearanceProvider {...props}>
      <Consumer />
    </AppearanceProvider>,
  );
}

describe("AppearanceProvider", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute("data-noor-appearance");
    document.documentElement.removeAttribute("data-noor-transparency");
  });

  it("defaults to the compatible appearance and updates root attributes", async () => {
    const user = userEvent.setup();
    renderProvider();

    expect(screen.getByTestId("appearance")).toHaveTextContent("default");
    expect(document.documentElement).toHaveAttribute("data-noor-appearance", "default");
    expect(document.documentElement).toHaveAttribute("data-noor-transparency", "system");

    await user.click(screen.getByText("Use Lumen"));
    expect(document.documentElement).toHaveAttribute("data-noor-appearance", "lumen");
  });

  it("persists valid values and ignores invalid stored values", async () => {
    window.localStorage.setItem("test-appearance", "invalid");
    window.localStorage.setItem("test-transparency", "invalid");
    const user = userEvent.setup();
    renderProvider({
      appearanceStorageKey: "test-appearance",
      transparencyStorageKey: "test-transparency",
    });

    expect(screen.getByTestId("appearance")).toHaveTextContent("default");
    expect(screen.getByTestId("transparency")).toHaveTextContent("system");
    await user.click(screen.getByText("Use Lumen"));
    await user.click(screen.getByText("Reduce transparency"));
    expect(window.localStorage.getItem("test-appearance")).toBe("lumen");
    expect(window.localStorage.getItem("test-transparency")).toBe("reduce");
  });

  it("supports controlled values and change callbacks", async () => {
    const onAppearanceChange = vi.fn();
    const onTransparencyChange = vi.fn();
    const user = userEvent.setup();
    renderProvider({
      appearance: "default",
      transparency: "system",
      onAppearanceChange,
      onTransparencyChange,
    });

    await user.click(screen.getByText("Use Lumen"));
    await user.click(screen.getByText("Reduce transparency"));
    expect(onAppearanceChange).toHaveBeenCalledWith("lumen");
    expect(onTransparencyChange).toHaveBeenCalledWith("reduce");
    expect(screen.getByTestId("appearance")).toHaveTextContent("default");
  });

  it("supports scoped and nested scoped providers without touching the root", () => {
    act(() => document.documentElement.setAttribute("data-noor-appearance", "default"));
    render(
      <AppearanceProvider appearance="lumen" scope="scoped">
        <div data-testid="outer">
          <AppearanceProvider appearance="default" transparency="reduce" scope="scoped">
            <div data-testid="inner">nested</div>
          </AppearanceProvider>
        </div>
      </AppearanceProvider>,
    );

    expect(document.documentElement).toHaveAttribute("data-noor-appearance", "default");
    expect(screen.getByTestId("outer").parentElement).toHaveAttribute(
      "data-noor-appearance",
      "lumen",
    );
    expect(screen.getByTestId("inner").parentElement).toHaveAttribute(
      "data-noor-transparency",
      "reduce",
    );
  });

  it("restores pre-existing root attributes during cleanup", () => {
    document.documentElement.setAttribute("data-noor-appearance", "default");
    document.documentElement.setAttribute("data-noor-transparency", "reduce");
    const { unmount } = renderProvider({ appearance: "lumen", transparency: "system" });
    unmount();
    expect(document.documentElement).toHaveAttribute("data-noor-appearance", "default");
    expect(document.documentElement).toHaveAttribute("data-noor-transparency", "reduce");
  });

  it("renders safely when browser globals are unavailable", () => {
    const browserWindow = globalThis.window;
    vi.stubGlobal("window", undefined);
    try {
      expect(
        renderToString(
          <AppearanceProvider defaultAppearance="lumen">
            <span>Server content</span>
          </AppearanceProvider>,
        ),
      ).toContain("Server content");
    } finally {
      vi.stubGlobal("window", browserWindow);
    }
  });
});
