import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "./Table";

const meta: Meta<typeof Table> = {
  title: "DataDisplay/Table",
  component: Table,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Table>;

const rows = [
  { model: "Noor-Reasoning-Large", latency: "1.2s", context: "200K tokens", status: "Stable" },
  { model: "Noor-Reasoning-Compact", latency: "0.4s", context: "128K tokens", status: "Stable" },
  {
    model: "Noor-Research-Preview",
    latency: "3.8s",
    context: "1M tokens",
    status: "Experimental release channel",
  },
];

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Model comparison — updated 2026-07-01</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Model</TableHead>
          <TableHead>Latency</TableHead>
          <TableHead>Context window</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.model}>
            <TableCell className="font-medium">{row.model}</TableCell>
            <TableCell>{row.latency}</TableCell>
            <TableCell>{row.context}</TableCell>
            <TableCell>{row.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const NarrowContainerOverflow: Story = {
  render: () => (
    <div className="max-w-xs">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Column A</TableHead>
            <TableHead>Column B</TableHead>
            <TableHead>Column C</TableHead>
            <TableHead>Column D</TableHead>
            <TableHead>Column E</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Value</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};
