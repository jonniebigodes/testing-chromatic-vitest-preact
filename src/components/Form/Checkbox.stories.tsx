import type { Meta, StoryObj } from "@storybook/preact-vite";
import { fn } from "storybook/test";
import { useState } from "react";
import Checkbox from "./Checkbox";

const meta = {
  title: "Components/Form/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "The controlled checked state of the checkbox",
    },
    onCheckedChange: {
      description: "Callback invoked when the checked state changes",
    },
    disabled: {
      control: "boolean",
      description: "Whether the checkbox is disabled",
    },
    required: {
      control: "boolean",
      description: "Whether the checkbox is required",
    },
    name: {
      control: "text",
      description: "The name attribute for form submission",
    },
    value: {
      control: "text",
      description: "The value attribute for form submission",
    },
    readOnly: {
      control: "boolean",
      description: "Whether the checkbox is read-only",
    },
    children: {
      control: "text",
      description: "Content to be rendered as the checkbox label",
    },
  },
  args: {
    onCheckedChange: fn(),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default checkbox with a label
 */
export const Default: Story = {
  args: {
    children: "Accept terms and conditions",
  },
};

/**
 * Checkbox in checked state
 */
export const Checked: Story = {
  args: {
    checked: true,
    children: "I agree to the terms",
  },
};

/**
 * Disabled checkbox
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "This option is disabled",
  },
};

/**
 * Disabled and checked checkbox
 */
export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
    children: "This option is disabled and checked",
  },
};

/**
 * Required checkbox
 */
export const Required: Story = {
  args: {
    required: true,
    children: "I agree to the terms (required)",
  },
};

/**
 * Checkbox with name and value attributes for form submission
 */
export const WithNameAndValue: Story = {
  args: {
    name: "terms",
    value: "accepted",
    children: "Accept terms (check the DOM for name and value)",
  },
};

/**
 * Read-only checkbox
 */
export const ReadOnly: Story = {
  args: {
    readOnly: true,
    checked: true,
    children: "This checkbox is read-only",
  },
};

/**
 * Checkbox without label
 */
export const WithoutLabel: Story = {
  args: {},
};

/**
 * Checkbox with custom label content
 */
export const CustomLabelContent: Story = {
  render: (args) => (
    <Checkbox {...args}>
      <span>
        I agree to the{" "}
        <a
          href="#"
          style={{ color: "#3b82f6", textDecoration: "underline" }}
          onClick={(e) => e.preventDefault()}
        >
          terms and conditions
        </a>
      </span>
    </Checkbox>
  ),
};

/**
 * Checkbox with long label text
 */
export const LongLabel: Story = {
  args: {
    children:
      "I agree to receive marketing communications, promotional offers, and newsletters from the company. I understand I can unsubscribe at any time.",
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Controlled checkbox with state management
 */
export const Controlled: Story = {
  render: () => {
    const ControlledCheckbox = () => {
      const [checked, setChecked] = useState(false);

      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Checkbox
            checked={checked}
            onCheckedChange={(details) => {
              const checkedValue = typeof details.checked === "boolean" ? details.checked : details.checked === "on";
              setChecked(checkedValue);
            }}
          >
            Controlled checkbox (currently: {checked ? "checked" : "unchecked"})
          </Checkbox>
          <button
            onClick={() => setChecked(!checked)}
            style={{
              padding: "8px 16px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Toggle from outside
          </button>
        </div>
      );
    };

    return <ControlledCheckbox />;
  },
};

/**
 * Multiple checkboxes in a form
 */
export const MultipleCheckboxes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Checkbox name="newsletter" value="yes">
        Subscribe to newsletter
      </Checkbox>
      <Checkbox name="marketing" value="yes">
        Receive marketing emails
      </Checkbox>
      <Checkbox name="updates" value="yes" checked>
        Get product updates
      </Checkbox>
      <Checkbox name="notifications" value="yes" disabled>
        Push notifications (coming soon)
      </Checkbox>
    </div>
  ),
};

/**
 * Checkbox with onCheckedChange handler
 */
export const WithChangeHandler: Story = {
  render: () => {
    const CheckboxWithHandler = () => {
      const [message, setMessage] = useState("");

      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Checkbox
            onCheckedChange={(details) => {
              setMessage(
                `Checkbox is now ${details.checked ? "checked" : "unchecked"}`
              );
            }}
          >
            Click me to trigger the handler
          </Checkbox>
          {message && (
            <div
              style={{
                padding: "8px 12px",
                backgroundColor: "#e0f2fe",
                color: "#0c4a6e",
                borderRadius: "4px",
                fontSize: "14px",
              }}
            >
              {message}
            </div>
          )}
        </div>
      );
    };

    return <CheckboxWithHandler />;
  },
};

/**
 * Checkbox in a form context
 */
export const InFormContext: Story = {
  render: () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        alert(JSON.stringify(data, null, 2));
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "20px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        maxWidth: "400px",
      }}
    >
      <div>
        <h3 style={{ margin: "0 0 16px 0", fontSize: "16px" }}>
          Sign Up Form
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Checkbox name="terms" value="accepted" required>
            I accept the terms and conditions *
          </Checkbox>
          <Checkbox name="privacy" value="accepted" required>
            I accept the privacy policy *
          </Checkbox>
          <Checkbox name="newsletter" value="yes">
            Subscribe to newsletter (optional)
          </Checkbox>
        </div>
      </div>
      <button
        type="submit"
        style={{
          padding: "10px 16px",
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "500",
        }}
      >
        Submit Form
      </button>
    </form>
  ),
};
