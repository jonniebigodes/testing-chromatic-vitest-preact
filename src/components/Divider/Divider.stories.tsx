import type { Meta, StoryObj } from "@storybook/preact-vite";
import Divider from "./Divider";

const meta = {
  title: "Components/Divider",
  component: Divider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "color",
      description: "Color of the divider line",
    },
    inverted: {
      control: "boolean",
      description: "Renders the divider in inverted colors",
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default divider with gray color
 */
export const Default: Story = {
  args: {
    color: "#d1d5db",
    inverted: false,
  },
  render: (args) => (
    <div style={{ width: "400px" }}>
      <p style={{ margin: "0 0 16px 0", color: "#374151" }}>
        Content above the divider
      </p>
      <Divider {...args} />
      <p style={{ margin: "16px 0 0 0", color: "#374151" }}>
        Content below the divider
      </p>
    </div>
  ),
};

/**
 * Divider with custom red color
 */
export const CustomColor: Story = {
  args: {
    color: "#ef4444",
    inverted: false,
  },
  render: (args) => (
    <div style={{ width: "400px" }}>
      <p style={{ margin: "0 0 16px 0", color: "#374151" }}>
        Content above the divider
      </p>
      <Divider {...args} />
      <p style={{ margin: "16px 0 0 0", color: "#374151" }}>
        Content below the divider
      </p>
    </div>
  ),
};

/**
 * Divider with custom blue color
 */
export const BlueColor: Story = {
  args: {
    color: "#3b82f6",
    inverted: false,
  },
  render: (args) => (
    <div style={{ width: "400px" }}>
      <p style={{ margin: "0 0 16px 0", color: "#374151" }}>
        Content above the divider
      </p>
      <Divider {...args} />
      <p style={{ margin: "16px 0 0 0", color: "#374151" }}>
        Content below the divider
      </p>
    </div>
  ),
};

/**
 * Divider with inverted colors (white divider on dark background)
 */
export const Inverted: Story = {
  args: {
    color: "#ffffff",
    inverted: true,
  },
  render: (args) => (
    <div style={{ width: "400px" }}>
      <p
        style={{
          margin: "0 0 16px 0",
          color: "#ffffff",
          padding: "16px 0 0 0",
        }}
      >
        Content above the divider
      </p>
      <Divider {...args} />
      <p
        style={{
          margin: "16px 0 0 0",
          color: "#ffffff",
          paddingBottom: "16px",
        }}
      >
        Content below the divider
      </p>
    </div>
  ),
};

/**
 * Divider with thick green line
 */
export const ThickGreen: Story = {
  args: {
    color: "#10b981",
    inverted: false,
  },
  render: (args) => (
    <div style={{ width: "400px" }}>
      <div
        style={{
          height: "2px",
          backgroundColor: "#10b981",
          margin: "16px 0",
        }}
      >
        <Divider {...args} />
      </div>
    </div>
  ),
};

/**
 * Multiple dividers showcasing different colors
 */
export const MultipleColors: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <h3 style={{ color: "#374151", margin: "0 0 8px 0" }}>
        Section 1
      </h3>
      <Divider color="#ef4444" />
      <h3 style={{ color: "#374151", margin: "0 0 8px 0" }}>
        Section 2
      </h3>
      <Divider color="#3b82f6" />
      <h3 style={{ color: "#374151", margin: "0 0 8px 0" }}>
        Section 3
      </h3>
      <Divider color="#10b981" />
      <h3 style={{ color: "#374151", margin: "0 0 8px 0" }}>
        Section 4
      </h3>
    </div>
  ),
};
