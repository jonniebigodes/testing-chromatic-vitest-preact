import type { Meta, StoryObj } from "@storybook/preact-vite";
import { fn } from "storybook/test";
import DropDownMenu from "./DropDownMenu";

const meta = {
  title: "Components/DropDownMenu",
  component: DropDownMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "color",
      description: "Background color of the dropdown button",
    },
    label: {
      control: "text",
      description: "Label text displayed on the dropdown button",
    },
    children: {
      control: "object",
      description: "Array of strings to populate the dropdown options",
    },
    inverted: {
      control: "boolean",
      description: "Renders the dropdown menu in inverted colors",
    },
    onSelect: {
      description: "Callback when an option is selected",
    },
  },
  args: {
    onSelect: fn(),
  },
} satisfies Meta<typeof DropDownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default dropdown menu with blue button and sample options
 */
export const Default: Story = {
  args: {
    label: "Options",
    color: "#3b82f6",
    children: ["Option 1", "Option 2", "Option 3", "Option 4"],
    inverted: false,
  },
};

/**
 * Dropdown menu with custom red color
 */
export const CustomColor: Story = {
  args: {
    label: "Actions",
    color: "#ef4444",
    children: ["Edit", "Delete", "Archive", "Share"],
    inverted: false,
  },
};

/**
 * Dropdown menu with custom green color
 */
export const GreenColor: Story = {
  args: {
    label: "Choose",
    color: "#10b981",
    children: ["Accept", "Decline", "Pending", "Review"],
    inverted: false,
  },
};

/**
 * Dropdown menu with inverted colors (dark mode)
 */
export const Inverted: Story = {
  args: {
    label: "Settings",
    color: "#1f2937",
    children: ["Profile", "Preferences", "Security", "Logout"],
    inverted: true,
  },
  render: (args) => (
    <div
      style={{
        backgroundColor: "#1f2937",
        padding: "32px",
        borderRadius: "8px",
        minHeight: "300px",
      }}
    >
      <DropDownMenu {...args} />
    </div>
  ),
};

/**
 * Dropdown menu with many options
 */
export const ManyOptions: Story = {
  args: {
    label: "Countries",
    color: "#8b5cf6",
    children: [
      "United States",
      "United Kingdom",
      "Canada",
      "Australia",
      "Germany",
      "France",
      "Japan",
      "Brazil",
      "India",
      "Mexico",
    ],
    inverted: false,
  },
};

/**
 * Dropdown menu with short options
 */
export const ShortOptions: Story = {
  args: {
    label: "Priority",
    color: "#f59e0b",
    children: ["High", "Medium", "Low"],
    inverted: false,
  },
};

/**
 * Dropdown menu with selected item callback
 */
export const WithCallback: Story = {
  args: {
    label: "File",
    color: "#3b82f6",
    children: ["New", "Open", "Save", "Save As", "Exit"],
    inverted: false,
    onSelect: fn((item) => {
      alert(`Selected: ${item}`);
    }),
  },
};

/**
 * Multiple dropdown menus side by side
 */
export const Multiple: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px" }}>
      <DropDownMenu
        label="File"
        color="#3b82f6"
        children={["New", "Open", "Save"]}
      />
      <DropDownMenu
        label="Edit"
        color="#ef4444"
        children={["Cut", "Copy", "Paste"]}
      />
      <DropDownMenu
        label="View"
        color="#10b981"
        children={["Zoom In", "Zoom Out", "Reset"]}
      />
    </div>
  ),
};
