import type { Meta, StoryObj } from "@storybook/preact-vite";
import Input from "./Input";
import { Label } from "./index";

const meta = {
  title: "Components/Form/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    inverted: {
      control: "boolean",
      description: "Renders the input in inverted colors",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url"],
      description: "Input type",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default input with no placeholder
 */
export const Default: Story = {
  args: {
    inverted: false,
    type: "text",
  },
  render: (args) => (
    <div style={{ minWidth: "300px", padding: "16px" }}>
      <Input {...args} />
    </div>
  ),
};

/**
 * Input with placeholder text
 */
export const WithPlaceholder: Story = {
  args: {
    placeholder: "Enter your email",
    type: "email",
    inverted: false,
  },
  render: (args) => (
    <div style={{ minWidth: "300px", padding: "16px" }}>
      <Input {...args} />
    </div>
  ),
};

/**
 * Input with inverted colors (dark mode)
 */
export const Inverted: Story = {
  args: {
    placeholder: "Enter text",
    inverted: true,
    type: "text",
  },
  render: (args) => (
    <div
      style={{
        minWidth: "300px",
        padding: "32px",
        backgroundColor: "#111827",
        borderRadius: "8px",
      }}
    >
      <Input {...args} />
    </div>
  ),
};

/**
 * Password input with placeholder
 */
export const PasswordInput: Story = {
  args: {
    placeholder: "Enter your password",
    type: "password",
    inverted: false,
  },
  render: (args) => (
    <div style={{ minWidth: "300px", padding: "16px" }}>
      <Input {...args} />
    </div>
  ),
};

/**
 * Number input with placeholder
 */
export const NumberInput: Story = {
  args: {
    placeholder: "Enter a number",
    type: "number",
    inverted: false,
  },
  render: (args) => (
    <div style={{ minWidth: "300px", padding: "16px" }}>
      <Input {...args} />
    </div>
  ),
};

/**
 * Input with label
 */
export const WithLabel: Story = {
  args: {
    placeholder: "john@example.com",
    type: "email",
    inverted: false,
  },
  render: (args) => (
    <div style={{ minWidth: "300px", padding: "16px" }}>
      <Label htmlFor="email-input">Email Address</Label>
      <Input id="email-input" {...args} />
    </div>
  ),
};

/**
 * Inverted input with label
 */
export const InvertedWithLabel: Story = {
  args: {
    placeholder: "Enter your username",
    type: "text",
    inverted: true,
  },
  render: (args) => (
    <div
      style={{
        minWidth: "300px",
        padding: "32px",
        backgroundColor: "#111827",
        borderRadius: "8px",
      }}
    >
      <Label htmlFor="username-input" inverted>
        Username
      </Label>
      <Input id="username-input" {...args} />
    </div>
  ),
};

/**
 * Multiple inputs in a form
 */
export const FormExample: Story = {
  render: () => (
    <form
      style={{
        minWidth: "400px",
        padding: "24px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        border: "1px solid #e5e7eb",
      }}
    >
      <div style={{ marginBottom: "16px" }}>
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" type="text" placeholder="John Doe" />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" placeholder="john@example.com" />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="••••••••" />
      </div>

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "10px 16px",
          backgroundColor: "#3b82f6",
          color: "#ffffff",
          border: "none",
          borderRadius: "6px",
          fontSize: "14px",
          fontWeight: "500",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </form>
  ),
};

/**
 * Disabled input
 */
export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    type: "text",
    disabled: true,
    inverted: false,
  },
  render: (args) => (
    <div style={{ minWidth: "300px", padding: "16px" }}>
      <Label htmlFor="disabled-input">Disabled Field</Label>
      <Input id="disabled-input" {...args} />
    </div>
  ),
};

/**
 * Input with default value
 */
export const WithValue: Story = {
  args: {
    placeholder: "Enter text",
    type: "text",
    defaultValue: "Pre-filled value",
    inverted: false,
  },
  render: (args) => (
    <div style={{ minWidth: "300px", padding: "16px" }}>
      <Label htmlFor="value-input">Pre-filled Input</Label>
      <Input id="value-input" {...args} />
    </div>
  ),
};
