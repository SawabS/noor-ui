import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./Card";
import { Button } from "../inputs/Button";

const meta: Meta<typeof Card> = {
  title: "DataDisplay/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="max-w-content-sm">
      <CardHeader>
        <CardTitle>Research summary</CardTitle>
        <CardDescription>Generated from 12 sources across 4 domains.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-body-sm text-text-secondary">
          The report synthesizes findings on renewable energy adoption trends in 2025.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm" variant="secondary">
          View sources
        </Button>
        <Button size="sm">Open report</Button>
      </CardFooter>
    </Card>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Card interactive className="max-w-content-sm">
      <CardTitle>Click me</CardTitle>
      <CardDescription>Interactive cards show a subtle border and shadow on hover.</CardDescription>
    </Card>
  ),
};

export const LumenSurfaces: Story = {
  render: () => (
    <div className="grid max-w-content-lg gap-4 sm:grid-cols-2">
      {(["solid", "tonal", "material", "elevated"] as const).map((surface) => (
        <Card key={surface} surface={surface}>
          <CardTitle className="capitalize">{surface}</CardTitle>
          <CardDescription>Semantic {surface} surface under Noor Lumen.</CardDescription>
        </Card>
      ))}
    </div>
  ),
  globals: { appearance: "lumen", theme: "dark" },
};
