import type { Meta, StoryObj } from "@storybook/react";
import { Citation } from "./Citation";

const meta: Meta<typeof Citation> = {
  title: "DataDisplay/Citation",
  component: Citation,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Citation>;

export const Default: Story = {
  render: () => (
    <p className="text-body-sm text-text-primary">
      Solar deployment accelerated in 2025
      <Citation index={1} href="https://example.com/a" title="IEA Renewables Report 2025" />
      , driven by falling panel costs
      <Citation index={2} href="https://example.com/b" title="BloombergNEF" />.
    </p>
  ),
};

export const RTL: Story = {
  render: () => (
    <p dir="rtl" lang="ar" className="text-body-sm text-text-primary">
      تسارع نشر الطاقة الشمسية في عام 2025
      <Citation index={1} href="https://example.com/a" title="تقرير الطاقة المتجددة" />
      نتيجة انخفاض تكاليف الألواح
      <Citation index={2} href="https://example.com/b" title="بلومبرغ" />.
    </p>
  ),
};
