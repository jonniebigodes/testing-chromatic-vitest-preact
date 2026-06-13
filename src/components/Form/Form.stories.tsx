import type { Meta, StoryObj } from "@storybook/preact-vite";
import Form from "./Form";
import { Label, Input } from "./index";
import { expect, within, userEvent } from "storybook/test";

const meta = {
  title: "Components/Form/Form",
  component: Form,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    inverted: {
      control: "boolean",
      description: "Renders the form in inverted colors",
    },
    gap: {
      control: "text",
      description: "Sets the gap between form elements",
    },
    children: {
      description: "Form content (typically form fields)",
    },
  },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default form with standard gap (16px)
 */
export const Default: Story = {
  args: {
    inverted: false,
    gap: "16px",
  },
  render: (args) => (
    <Form {...args}>
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" type="text" placeholder="John Doe" />
      </div>
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" placeholder="john@example.com" />
      </div>
      <button
        type="submit"
        style={{
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
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const name = c.getByLabelText(/full name/i) as HTMLInputElement;
    await userEvent.type(name, "John Doe");
    expect(name.value).toBe("John Doe");

    const email = c.getByLabelText(/email address/i) as HTMLInputElement;
    await userEvent.type(email, "john@example.com");
    expect(email.value).toBe("john@example.com");
  },
};

/**
 * Form with custom gap (small - 8px)
 */
export const SmallGap: Story = {
  args: {
    inverted: false,
    gap: "8px",
  },
  render: (args) => (
    <Form {...args}>
      <div>
        <Label htmlFor="name-small">Full Name</Label>
        <Input id="name-small" type="text" placeholder="John Doe" />
      </div>
      <div>
        <Label htmlFor="email-small">Email Address</Label>
        <Input id="email-small" type="email" placeholder="john@example.com" />
      </div>
      <div>
        <Label htmlFor="phone-small">Phone Number</Label>
        <Input id="phone-small" type="tel" placeholder="+1 (555) 000-0000" />
      </div>
      <button
        type="submit"
        style={{
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
    </Form>
  ),
};

/**
 * Form with custom gap (large - 24px)
 */
export const LargeGap: Story = {
  args: {
    inverted: false,
    gap: "24px",
  },
  render: (args) => (
    <Form {...args}>
      <div>
        <Label htmlFor="name-large">Full Name</Label>
        <Input id="name-large" type="text" placeholder="John Doe" />
      </div>
      <div>
        <Label htmlFor="email-large">Email Address</Label>
        <Input id="email-large" type="email" placeholder="john@example.com" />
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <textarea
          id="message"
          placeholder="Enter your message"
          rows={4}
          style={{
            width: "100%",
            padding: "10px 12px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            fontSize: "14px",
            outline: "none",
            resize: "vertical",
          }}
        />
      </div>
      <button
        type="submit"
        style={{
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
    </Form>
  ),
};

/**
 * Form with inverted colors (dark mode)
 */
export const Inverted: Story = {
  args: {
    inverted: true,
    gap: "16px",
  },
  render: (args) => (
    <Form {...args}>
      <div>
        <Label htmlFor="name-inverted" inverted>
          Full Name
        </Label>
        <Input id="name-inverted" type="text" placeholder="John Doe" inverted />
      </div>
      <div>
        <Label htmlFor="email-inverted" inverted>
          Email Address
        </Label>
        <Input
          id="email-inverted"
          type="email"
          placeholder="john@example.com"
          inverted
        />
      </div>
      <button
        type="submit"
        style={{
          padding: "10px 16px",
          backgroundColor: "#60a5fa",
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
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const name = c.getByLabelText(/full name/i) as HTMLInputElement;
    await userEvent.type(name, "Alice");
    expect(name.value).toBe("Alice");

    const email = c.getByLabelText(/email address/i) as HTMLInputElement;
    await userEvent.type(email, "alice@example.com");
    expect(email.value).toBe("alice@example.com");
  },
};

/**
 * Inverted form with custom gap
 */
export const InvertedWithLargeGap: Story = {
  args: {
    inverted: true,
    gap: "24px",
  },
  render: (args) => (
    <Form {...args}>
      <div>
        <Label htmlFor="username" inverted>
          Username
        </Label>
        <Input id="username" type="text" placeholder="username" inverted />
      </div>
      <div>
        <Label htmlFor="password-inverted" inverted>
          Password
        </Label>
        <Input
          id="password-inverted"
          type="password"
          placeholder="••••••••"
          inverted
        />
      </div>
      <div>
        <Label htmlFor="confirm-password" inverted>
          Confirm Password
        </Label>
        <Input
          id="confirm-password"
          type="password"
          placeholder="••••••••"
          inverted
        />
      </div>
      <button
        type="submit"
        style={{
          padding: "10px 16px",
          backgroundColor: "#60a5fa",
          color: "#ffffff",
          border: "none",
          borderRadius: "6px",
          fontSize: "14px",
          fontWeight: "500",
          cursor: "pointer",
        }}
      >
        Create Account
      </button>
    </Form>
  ),
};

/**
 * Registration form with multiple fields
 */
export const RegistrationForm: Story = {
  args: {
    inverted: false,
    gap: "16px",
  },
  render: (args) => (
    <Form {...args} style={{ minWidth: "400px" }}>
      <h2
        style={{
          margin: "0 0 8px 0",
          fontSize: "20px",
          fontWeight: "600",
          color: "#1f2937",
        }}
      >
        Create Account
      </h2>
      <div>
        <Label htmlFor="reg-name">Full Name</Label>
        <Input id="reg-name" type="text" placeholder="John Doe" />
      </div>
      <div>
        <Label htmlFor="reg-email">Email Address</Label>
        <Input id="reg-email" type="email" placeholder="john@example.com" />
      </div>
      <div>
        <Label htmlFor="reg-password">Password</Label>
        <Input id="reg-password" type="password" placeholder="••••••••" />
      </div>
      <div>
        <Label htmlFor="reg-confirm">Confirm Password</Label>
        <Input id="reg-confirm" type="password" placeholder="••••••••" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input id="terms" type="checkbox" style={{ cursor: "pointer" }} />
        <Label htmlFor="terms">I agree to the Terms and Conditions</Label>
      </div>
      <button
        type="submit"
        style={{
          padding: "12px 16px",
          backgroundColor: "#3b82f6",
          color: "#ffffff",
          border: "none",
          borderRadius: "6px",
          fontSize: "14px",
          fontWeight: "500",
          cursor: "pointer",
        }}
      >
        Sign Up
      </button>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    expect(c.getByRole("heading", { name: /create account/i })).toBeTruthy();

    const name = c.getByLabelText(/full name/i) as HTMLInputElement;
    await userEvent.type(name, "John Doe");
    expect(name.value).toBe("John Doe");

    const email = c.getByLabelText(/email address/i) as HTMLInputElement;
    await userEvent.type(email, "john@example.com");
    expect(email.value).toBe("john@example.com");

    const password = c.getByLabelText(/^password$/i) as HTMLInputElement;
    await userEvent.type(password, "hunter2");
    expect(password.value).toBe("hunter2");

    const confirm = c.getByLabelText(/confirm password/i) as HTMLInputElement;
    await userEvent.type(confirm, "hunter2");
    expect(confirm.value).toBe("hunter2");

    const terms = c.getByLabelText(/terms and conditions/i) as HTMLInputElement;
    await userEvent.click(terms);
    expect(terms.checked).toBe(true);
  },
};

/**
 * Login form (minimal)
 */
export const LoginForm: Story = {
  args: {
    inverted: false,
    gap: "16px",
  },
  render: (args) => (
    <Form {...args}>
      <h2
        style={{
          margin: "0 0 8px 0",
          fontSize: "20px",
          fontWeight: "600",
          color: "#1f2937",
        }}
      >
        Login
      </h2>
      <div>
        <Label htmlFor="login-email">Email</Label>
        <Input id="login-email" type="email" placeholder="your@email.com" />
      </div>
      <div>
        <Label htmlFor="login-password">Password</Label>
        <Input id="login-password" type="password" placeholder="••••••••" />
      </div>
      <button
        type="submit"
        style={{
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
        Sign In
      </button>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const email = c.getByLabelText(/email/i) as HTMLInputElement;
    await userEvent.type(email, "user@example.com");
    expect(email.value).toBe("user@example.com");

    const password = c.getByLabelText(/password/i) as HTMLInputElement;
    await userEvent.type(password, "p@ssw0rd");
    expect(password.value).toBe("p@ssw0rd");
  },
};

/**
 * Contact form with numeric gap
 */
export const ContactForm: Story = {
  args: {
    inverted: false,
    gap: 20,
  },
  render: (args) => (
    <Form {...args} style={{ minWidth: "400px" }}>
      <h2
        style={{
          margin: "0 0 8px 0",
          fontSize: "20px",
          fontWeight: "600",
          color: "#1f2937",
        }}
      >
        Contact Us
      </h2>
      <div>
        <Label htmlFor="contact-name">Name</Label>
        <Input id="contact-name" type="text" placeholder="Your name" />
      </div>
      <div>
        <Label htmlFor="contact-email">Email</Label>
        <Input id="contact-email" type="email" placeholder="your@email.com" />
      </div>
      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" type="text" placeholder="How can we help?" />
      </div>
      <div>
        <Label htmlFor="contact-message">Message</Label>
        <textarea
          id="contact-message"
          placeholder="Your message"
          rows={5}
          style={{
            width: "100%",
            padding: "10px 12px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            fontSize: "14px",
            outline: "none",
            resize: "vertical",
          }}
        />
      </div>
      <button
        type="submit"
        style={{
          padding: "12px 16px",
          backgroundColor: "#10b981",
          color: "#ffffff",
          border: "none",
          borderRadius: "6px",
          fontSize: "14px",
          fontWeight: "500",
          cursor: "pointer",
        }}
      >
        Send Message
      </button>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const name = c.getByLabelText(/name/i) as HTMLInputElement;
    await userEvent.type(name, "Jane");
    expect(name.value).toBe("Jane");

    const email = c.getByLabelText(/^email$/i) as HTMLInputElement;
    await userEvent.type(email, "jane@example.com");
    expect(email.value).toBe("jane@example.com");

    const subject = c.getByLabelText(/subject/i) as HTMLInputElement;
    await userEvent.type(subject, "Question");
    expect(subject.value).toBe("Question");

    const message = c.getByLabelText(/message/i) as HTMLTextAreaElement;
    await userEvent.type(message, "Hello Team");
    expect(message.value).toBe("Hello Team");
  },
};
