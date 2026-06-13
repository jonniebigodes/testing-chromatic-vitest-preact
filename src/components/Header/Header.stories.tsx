import type { Meta, StoryObj } from "@storybook/preact-vite";
import Header from "./Header";
import { fn } from "storybook/test";

const meta = {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Header title text",
    },
    links: {
      control: "object",
      description: "Array of {label, href} for navigation links",
    },
    isSticky: {
      control: "boolean",
      description: "Makes header sticky at top",
    },
    inverted: {
      control: "boolean",
      description: "Use inverted (dark) theme",
    },
    logo: {
      control: "text",
      description: "Logo image URL",
    },
    fullWidth: {
      control: "boolean",
      description: "Span full viewport width",
    },
    onLinkClick: {
      description: "Callback when a link is clicked",
    },
  },
  args: {
    onLinkClick: fn(),
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Default header */
export const Default: Story = {
  args: {
    title: "My App",
    links: [],
    isSticky: false,
    inverted: false,
    logo: undefined,
    fullWidth: false,
  },
  render: (args) => (
    <div style={{ minHeight: "200px", backgroundColor: "#f9fafb" }}>
      <Header {...args} />
      <div style={{ padding: "16px" }}>
        <p style={{ color: "#374151" }}>Main content below header…</p>
      </div>
    </div>
  ),
};

/** Header with navigation links */
export const WithLinks: Story = {
  args: {
    title: "My App",
    links: [
      { label: "Home", href: "#" },
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "About", href: "#" },
    ],
    isSticky: false,
    inverted: false,
    logo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    fullWidth: false,
  },
  render: (args) => (
    <div style={{ minHeight: "200px", backgroundColor: "#f9fafb" }}>
      <Header {...args} />
      <div style={{ padding: "16px" }}>
        <p style={{ color: "#374151" }}>Main content below header…</p>
      </div>
    </div>
  ),
};

/** Inverted (dark) header */
export const Inverted: Story = {
  args: {
    title: "Dark App",
    links: [
      { label: "Docs", href: "#" },
      { label: "API", href: "#" },
      { label: "Community", href: "#" },
    ],
    isSticky: true,
    inverted: true,
    logo: undefined,
    fullWidth: true,
  },
  render: (args) => (
    <div style={{ minHeight: "200px", backgroundColor: "#111827" }}>
      <Header {...args} />
      <div style={{ padding: "16px" }}>
        <p style={{ color: "#e5e7eb" }}>Main content below header…</p>
      </div>
    </div>
  ),
};
