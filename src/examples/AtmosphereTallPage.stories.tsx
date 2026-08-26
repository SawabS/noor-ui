import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "../components/data-display/Card";
import { Typography } from "../components/primitives/Typography";

/**
 * Acceptance fixture for the atmosphere layer (tests/visual/upstream.spec.ts).
 *
 * `.n-atmosphere::before` used to be `position: absolute` with the glow sized
 * `100% 100%`, so both the gradient and the fade mask stretched with the
 * element. On a page this tall that turned a tidy vignette into a wash of
 * accent colour over the top half of the entire document — the shell looked
 * completely different before and after a dataset loaded. The pseudo-element's
 * height must equal the viewport height, not `document.scrollHeight`.
 */
function TallAtmospherePage() {
  return (
    <div className="n-atmosphere min-h-screen p-6" data-testid="atmosphere">
      <div className="mx-auto flex max-w-content-md flex-col gap-4">
        {Array.from({ length: 40 }, (_, i) => (
          <Card key={i} surface="material" className="p-6">
            <Typography variant="heading-sm">Section {i + 1}</Typography>
            <Typography variant="body-sm" color="secondary">
              Enough content to push the document well past a single viewport, which is exactly the
              condition under which the old absolute atmosphere layer stopped being a vignette.
            </Typography>
          </Card>
        ))}
      </div>
    </div>
  );
}

const meta: Meta<typeof TallAtmospherePage> = {
  title: "Examples/AtmosphereTallPage",
  component: TallAtmospherePage,
  parameters: { layout: "fullscreen", a11y: { test: "error" } },
  globals: { appearance: "lumen", theme: "dark" },
};

export default meta;
type Story = StoryObj<typeof TallAtmospherePage>;

export const Dark: Story = {};

export const Light: Story = {
  globals: { appearance: "lumen", theme: "light" },
};
