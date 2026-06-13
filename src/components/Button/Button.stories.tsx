import type { Meta, StoryObj } from "@storybook/preact-vite";
import { fn } from "storybook/test";
import Button from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: {
      control: "color",
      description: "Background color of the button",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Size of the button",
    },
    label: {
      control: "text",
      description: "Label text displayed on the button",
    },
    onClick: {
      description: "Click event handler",
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default button with medium size and blue background
 */
export const Default: Story = {
  args: {
    label: "Click me",
    backgroundColor: "#3b82f6",
    size: "medium",
  },
};

/**
 * Button with custom red background color
 */
export const CustomBackgroundColor: Story = {
  args: {
    label: "Red Button",
    backgroundColor: "#ef4444",
    size: "medium",
  },
};

/**
 * Button with custom green background color
 */
export const GreenButton: Story = {
  args: {
    label: "Green Button",
    backgroundColor: "#10b981",
    size: "medium",
  },
};

/**
 * Small sized button
 */
export const Small: Story = {
  args: {
    label: "Small Button",
    backgroundColor: "#3b82f6",
    size: "small",
  },
};

/**
 * Medium sized button (default)
 */
export const Medium: Story = {
  args: {
    label: "Medium Button",
    backgroundColor: "#3b82f6",
    size: "medium",
  },
};

/**
 * Large sized button
 */
export const Large: Story = {
  args: {
    label: "Large Button",
    backgroundColor: "#3b82f6",
    size: "large",
  },
};

/**
 * Button showcasing all sizes side by side
 */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Button label="Small" size="small" backgroundColor="#3b82f6" />
      <Button label="Medium" size="medium" backgroundColor="#3b82f6" />
      <Button label="Large" size="large" backgroundColor="#3b82f6" />
    </div>
  ),
};

/**
 * Button with click handler
 */
export const WithClickHandler: Story = {
  args: {
    label: "Click to Alert",
    backgroundColor: "#8b5cf6",
    size: "medium",
    onClick: fn(() => alert("Button clicked!")),
  },
};
