import type { Meta, StoryObj } from "@storybook/preact-vite";
import { fn } from "storybook/test";
import Pill from "./Pill";

const meta = {
  title: "Components/Pill",
  component: Pill,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "inverted", "warning", "success"],
      description: "Variant style of the pill",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Size of the pill",
    },
    children: {
      control: "text",
      description: "Content displayed in the pill",
    },
    onClick: {
      description: "Click event handler",
    },
    disabled: {
      control: "boolean",
      description: "Whether the pill is disabled",
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Pill>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default pill with medium size and default variant
 */
export const Default: Story = {
  args: {
    children: "Default Pill",
    variant: "default",
    size: "medium",
  },
};

/**
 * Pill with inverted colors
 */
export const Inverted: Story = {
  args: {
    children: "Inverted Pill",
    variant: "inverted",
    size: "medium",
  },
};

/**
 * Pill with warning variant
 */
export const Warning: Story = {
  args: {
    children: "Warning",
    variant: "warning",
    size: "medium",
  },
};

/**
 * Pill with success variant
 */
export const Success: Story = {
  args: {
    children: "Success",
    variant: "success",
    size: "medium",
  },
};

/**
 * Small sized pill
 */
export const Small: Story = {
  args: {
    children: "Small Pill",
    variant: "default",
    size: "small",
  },
};

/**
 * Medium sized pill (default)
 */
export const Medium: Story = {
  args: {
    children: "Medium Pill",
    variant: "default",
    size: "medium",
  },
};

/**
 * Large sized pill
 */
export const Large: Story = {
  args: {
    children: "Large Pill",
    variant: "default",
    size: "large",
  },
};

/**
 * Disabled pill
 */
export const Disabled: Story = {
  args: {
    children: "Disabled",
    variant: "default",
    size: "medium",
    disabled: true,
  },
};

/**
 * Clickable pill with handler
 */
export const Clickable: Story = {
  args: {
    children: "Click me",
    variant: "default",
    size: "medium",
    onClick: fn(() => alert("Pill clicked!")),
  },
};

/**
 * Pills showcasing all variants side by side
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Pill variant="default">Default</Pill>
      <Pill variant="inverted">Inverted</Pill>
      <Pill variant="warning">Warning</Pill>
      <Pill variant="success">Success</Pill>
    </div>
  ),
};

/**
 * Pills showcasing all sizes side by side
 */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Pill size="small" variant="default">
        Small
      </Pill>
      <Pill size="medium" variant="default">
        Medium
      </Pill>
      <Pill size="large" variant="default">
        Large
      </Pill>
    </div>
  ),
};

/**
 * Multiple pills displayed together as tags
 */
export const MultiplePills: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Pill variant="default" size="small">
        React
      </Pill>
      <Pill variant="success" size="small">
        TypeScript
      </Pill>
      <Pill variant="warning" size="small">
        JavaScript
      </Pill>
      <Pill variant="inverted" size="small">
        HTML
      </Pill>
      <Pill variant="default" size="small">
        CSS
      </Pill>
      <Pill variant="success" size="small">
        Storybook
      </Pill>
      <Pill variant="warning" size="small">
        Vitest
      </Pill>
      <Pill variant="inverted" size="small">
        Ark UI
      </Pill>
    </div>
  ),
};

/**
 * Pills with different sizes and variants combined
 */
export const MixedSizesAndVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "12px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Pill variant="default" size="small">
        Small Default
      </Pill>
      <Pill variant="success" size="medium">
        Medium Success
      </Pill>
      <Pill variant="warning" size="large">
        Large Warning
      </Pill>
      <Pill variant="inverted" size="medium">
        Medium Inverted
      </Pill>
    </div>
  ),
};

/**
 * Disabled pills in different variants
 */
export const DisabledVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Pill variant="default" disabled>
        Default
      </Pill>
      <Pill variant="inverted" disabled>
        Inverted
      </Pill>
      <Pill variant="warning" disabled>
        Warning
      </Pill>
      <Pill variant="success" disabled>
        Success
      </Pill>
    </div>
  ),
};
