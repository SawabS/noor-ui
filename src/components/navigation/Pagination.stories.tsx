import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Navigation/Pagination",
  component: Pagination,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Pagination>;

function DefaultPagination() {
  const [page, setPage] = useState(1);
  return <Pagination currentPage={page} totalPages={12} onPageChange={setPage} />;
}

export const Default: Story = {
  render: () => <DefaultPagination />,
};

function RTLPagination() {
  const [page, setPage] = useState(5);
  return (
    <div dir="rtl">
      <Pagination currentPage={page} totalPages={12} onPageChange={setPage} />
    </div>
  );
}

export const RTL: Story = {
  render: () => <RTLPagination />,
};
