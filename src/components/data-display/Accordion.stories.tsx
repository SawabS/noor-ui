import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "DataDisplay/Accordion",
  component: Accordion,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="max-w-content-sm">
      <AccordionItem value="reasoning">
        <AccordionTrigger>Show reasoning</AccordionTrigger>
        <AccordionContent>
          The model weighed three approaches before selecting the one with lowest estimated latency.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="sources">
        <AccordionTrigger>Sources (4)</AccordionTrigger>
        <AccordionContent>Four sources were consulted to compile this answer.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="max-w-content-sm">
      <AccordionItem value="a">
        <AccordionTrigger>Section A</AccordionTrigger>
        <AccordionContent>Content A</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Section B</AccordionTrigger>
        <AccordionContent>Content B</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
