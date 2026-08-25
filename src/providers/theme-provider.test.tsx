import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, useTheme } from "./theme-provider";

function Consumer() {
  const { theme, resolvedTheme, activeTheme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <span data-testid="active">{activeTheme}</span>
      <button onClick={() => setTheme("dark")}>dark</button>
      <button onClick={() => setTheme("light")}>light</button>
      <button onClick={() => setTheme("dracula")}>dracula</button>
    </div>
  );
}

describe("ThemeProvider", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("defaults to light and switches to dark, updating data-theme on <html>", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultTheme="light">
        <Consumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("resolved")).toHaveTextContent("light");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");

    await user.click(screen.getByText("dark"));

    expect(screen.getByTestId("resolved")).toHaveTextContent("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("persists the choice to localStorage under the given key", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultTheme="light" storageKey="test-theme">
        <Consumer />
      </ThemeProvider>,
    );

    await user.click(screen.getByText("dark"));
    expect(window.localStorage.getItem("test-theme")).toBe("dark");
  });

  it("applies a named palette while exposing its underlying color scheme", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultTheme="light">
        <Consumer />
      </ThemeProvider>,
    );

    await user.click(screen.getByText("dracula"));

    expect(screen.getByTestId("theme")).toHaveTextContent("dracula");
    expect(screen.getByTestId("active")).toHaveTextContent("dracula");
    expect(screen.getByTestId("resolved")).toHaveTextContent("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dracula");
    expect(document.documentElement.style.colorScheme).toBe("dark");
  });

  it("ignores an invalid persisted theme", () => {
    window.localStorage.setItem("test-theme", "not-a-theme");

    render(
      <ThemeProvider defaultTheme="github-light" storageKey="test-theme">
        <Consumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("theme")).toHaveTextContent("github-light");
    expect(screen.getByTestId("active")).toHaveTextContent("github-light");
  });

  it("scoped mode wraps children in a themed div instead of touching <html>", () => {
    act(() => {
      document.documentElement.setAttribute("data-theme", "light");
    });
    render(
      <ThemeProvider defaultTheme="dark" scope="scoped">
        <Consumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("resolved")).toHaveTextContent("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });
});
