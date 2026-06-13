import type { Meta, StoryObj } from "@storybook/preact-vite";
import Label from "./Label";

const meta = {
  title: "Components/Form/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    htmlFor: {
      control: "text",
      description: "Links the label to a form element by ID",
    },
    inverted: {
      control: "boolean",
      description: "Renders the label in inverted colors",
    },
    children: {
      control: "text",
      description: "Content to display inside the label",
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default label with text content
 */
export const Default: Story = {
  args: {
    children: "Email Address",
    inverted: false,
  },
  render: (args) => (
    <div style={{ padding: "16px" }}>
      <Label {...args} />
    </div>
  ),
};

/**
 * Label linked to an input field using htmlFor
 */
export const WithHtmlFor: Story = {
  args: {
    htmlFor: "email-input",
    children: "Email Address",
    inverted: false,
  },
  render: (args) => (
    <div style={{ padding: "16px" }}>
      <Label {...args} />
      <input
        id="email-input"
        type="email"
        placeholder="Enter your email"
        style={{
          display: "block",
          width: "100%",
          padding: "10px 12px",
          border: "1px solid #d1d5db",
          borderRadius: "6px",
          fontSize: "14px",
          outline: "none",
        }}
      />
    </div>
  ),
};

/**
 * Label with inverted colors (dark background)
 */
export const Inverted: Story = {
  args: {
    children: "Username",
    inverted: true,
  },
  render: (args) => (
    <div
      style={{
        padding: "32px",
        backgroundColor: "#f9fafb",
        borderRadius: "8px",
      }}
    >
      <Label {...args} />
    </div>
  ),
};

/**
 * Inverted label with linked input field
 */
export const InvertedWithInput: Story = {
  args: {
    htmlFor: "username-input",
    children: "Username",
    inverted: true,
  },
  render: (args) => (
    <div
      style={{
        padding: "32px",
        backgroundColor: "#111827",
        borderRadius: "8px",
        minWidth: "300px",
      }}
    >
      <Label {...args} />
      <input
        id="username-input"
        type="text"
        placeholder="Enter your username"
        style={{
          display: "block",
          width: "100%",
          padding: "10px 12px",
          border: "1px solid #374151",
          borderRadius: "6px",
          fontSize: "14px",
          outline: "none",
          backgroundColor: "#1f2937",
          color: "#ffffff",
        }}
      />
    </div>
  ),
};

/**
 * Form with multiple labels
 */
/* export const FormExample: Story = {
  render: () => (
    <form
      style={{
        padding: "24px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        border: "1px solid #e5e7eb",
        minWidth: "400px",
      }}
    >
      <div style={{ marginBottom: "16px" }}>
        <Label htmlFor="name">Full Name</Label>
        <input
          id="name"
          type="text"
          placeholder="John Doe"
          style={{
            display: "block",
            width: "100%",
            padding: "10px 12px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            fontSize: "14px",
            outline: "none",
          }}
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <Label htmlFor="email">Email Address</Label>
        <input
          id="email"
          type="email"
          placeholder="john@example.com"
          style={{
            display: "block",
            width: "100%",
            padding: "10px 12px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            fontSize: "14px",
            outline: "none",
          }}
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <Label htmlFor="password">Password</Label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          style={{
            display: "block",
            width: "100%",
            padding: "10px 12px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            fontSize: "14px",
            outline: "none",
          }}
        />
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
}; */

/**
 * Label with custom styling (using children as ReactNode)
 */
export const WithCustomContent: Story = {
  render: () => (
    <div style={{ padding: "16px" }}>
      <Label htmlFor="terms">
        <span>
          I agree to the{" "}
          <a
            href="#"
            style={{ color: "#3b82f6", textDecoration: "underline" }}
          >
            Terms and Conditions
          </a>
        </span>
      </Label>
      <input
        id="terms"
        type="checkbox"
        style={{
          marginLeft: "8px",
          cursor: "pointer",
        }}
      />
    </div>
  ),
};

/**
 * Required field label with asterisk
 */
export const RequiredField: Story = {
  render: () => (
    <div style={{ padding: "16px" }}>
      <Label htmlFor="required-email">
        Email Address <span style={{ color: "#ef4444" }}>*</span>
      </Label>
      <input
        id="required-email"
        type="email"
        placeholder="Enter your email"
        required
        style={{
          display: "block",
          width: "100%",
          padding: "10px 12px",
          border: "1px solid #d1d5db",
          borderRadius: "6px",
          fontSize: "14px",
          outline: "none",
        }}
      />
    </div>
  ),
};
