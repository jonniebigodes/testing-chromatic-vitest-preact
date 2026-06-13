import type { Meta, StoryObj } from "@storybook/preact-vite";
import { fn } from "storybook/test";
import Footer from "./Footer";

const meta = {
  title: "Components/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "color",
      description: "Background color of the footer",
    },
    label: {
      control: "text",
      description: "Label text displayed in the footer",
    },
    children: {
      control: "object",
      description: "Array of link labels to populate the footer",
    },
    inverted: {
      control: "boolean",
      description: "Renders the footer in inverted colors",
    },
    onLinkClick: {
      description: "Callback when a link is clicked",
    },
  },
  args: {
    onLinkClick: fn(),
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default footer with dark background and copyright text
 */
export const Default: Story = {
  args: {
    color: "#1f2937",
    label: "© 2025 Company Name. All rights reserved.",
    children: [],
    inverted: false,
  },
  render: (args) => (
    <div
      style={{ minHeight: "400px", display: "flex", flexDirection: "column" }}
    >
      <div style={{ flex: 1, padding: "32px", backgroundColor: "#f9fafb" }}>
        <h1 style={{ color: "#1f2937" }}>Page Content</h1>
        <p style={{ color: "#6b7280" }}>
          This is sample page content. Scroll down to see the footer.
        </p>
      </div>
      <Footer {...args} />
    </div>
  ),
};

/**
 * Footer with custom blue color
 */
export const CustomColor: Story = {
  args: {
    color: "#1e40af",
    label: "© 2025 Blue Corp. All rights reserved.",
    children: [],
    inverted: false,
  },
  render: (args) => (
    <div
      style={{ minHeight: "400px", display: "flex", flexDirection: "column" }}
    >
      <div style={{ flex: 1, padding: "32px", backgroundColor: "#f9fafb" }}>
        <h1 style={{ color: "#1f2937" }}>Page Content</h1>
        <p style={{ color: "#6b7280" }}>
          Footer with custom blue background.
        </p>
      </div>
      <Footer {...args} />
    </div>
  ),
};

/**
 * Footer with custom green color
 */
export const GreenColor: Story = {
  args: {
    color: "#047857",
    label: "© 2025 Green Solutions. All rights reserved.",
    children: [],
    inverted: false,
  },
  render: (args) => (
    <div
      style={{ minHeight: "400px", display: "flex", flexDirection: "column" }}
    >
      <div style={{ flex: 1, padding: "32px", backgroundColor: "#f9fafb" }}>
        <h1 style={{ color: "#1f2937" }}>Page Content</h1>
        <p style={{ color: "#6b7280" }}>
          Footer with custom green background.
        </p>
      </div>
      <Footer {...args} />
    </div>
  ),
};

/**
 * Footer with inverted colors (light background)
 */
export const Inverted: Story = {
  args: {
    color: "#ffffff",
    label: "© 2025 Light Theme Inc. All rights reserved.",
    children: [],
    inverted: true,
  },
  render: (args) => (
    <div
      style={{ minHeight: "400px", display: "flex", flexDirection: "column" }}
    >
      <div style={{ flex: 1, padding: "32px", backgroundColor: "#1f2937" }}>
        <h1 style={{ color: "#ffffff" }}>Page Content</h1>
        <p style={{ color: "#d1d5db" }}>
          Dark page content with inverted footer (light background).
        </p>
      </div>
      <Footer {...args} />
    </div>
  ),
};

/**
 * Footer with links populated
 */
export const WithLinks: Story = {
  args: {
    color: "#1f2937",
    label: "© 2025 Acme Corporation. All rights reserved.",
    children: [
      "About Us",
      "Contact",
      "Privacy Policy",
      "Terms of Service",
      "Careers",
    ],
    inverted: false,
  },
  render: (args) => (
    <div
      style={{ minHeight: "400px", display: "flex", flexDirection: "column" }}
    >
      <div style={{ flex: 1, padding: "32px", backgroundColor: "#f9fafb" }}>
        <h1 style={{ color: "#1f2937" }}>Page Content</h1>
        <p style={{ color: "#6b7280" }}>
          Footer with navigation links.
        </p>
      </div>
      <Footer {...args} />
    </div>
  ),
};

/**
 * Footer with many links
 */
export const ManyLinks: Story = {
  args: {
    color: "#1f2937",
    label: "© 2025 Global Corp. All rights reserved.",
    children: [
      "Home",
      "About",
      "Services",
      "Products",
      "Blog",
      "Contact",
      "Support",
      "FAQ",
      "Privacy",
      "Terms",
    ],
    inverted: false,
  },
  render: (args) => (
    <div
      style={{ minHeight: "400px", display: "flex", flexDirection: "column" }}
    >
      <div style={{ flex: 1, padding: "32px", backgroundColor: "#f9fafb" }}>
        <h1 style={{ color: "#1f2937" }}>Page Content</h1>
        <p style={{ color: "#6b7280" }}>
          Footer with multiple navigation links.
        </p>
      </div>
      <Footer {...args} />
    </div>
  ),
};

/**
 * Footer with links and custom callback
 */
export const WithCallback: Story = {
  args: {
    color: "#7c3aed",
    label: "© 2025 Interactive Inc. All rights reserved.",
    children: ["Help Center", "Documentation", "API", "Status"],
    inverted: false,
    onLinkClick: fn((link) => {
      alert(`Clicked: ${link}`);
    }),
  },
  render: (args) => (
    <div
      style={{ minHeight: "400px", display: "flex", flexDirection: "column" }}
    >
      <div style={{ flex: 1, padding: "32px", backgroundColor: "#f9fafb" }}>
        <h1 style={{ color: "#1f2937" }}>Page Content</h1>
        <p style={{ color: "#6b7280" }}>
          Click on footer links to trigger callback.
        </p>
      </div>
      <Footer {...args} />
    </div>
  ),
};

/**
 * Inverted footer with links
 */
export const InvertedWithLinks: Story = {
  args: {
    color: "#ffffff",
    label: "© 2025 Modern App. All rights reserved.",
    children: ["Features", "Pricing", "Blog", "Support"],
    inverted: true,
  },
  render: (args) => (
    <div
      style={{ minHeight: "400px", display: "flex", flexDirection: "column" }}
    >
      <div
        style={{
          flex: 1,
          padding: "32px",
          backgroundColor: "#111827",
        }}
      >
        <h1 style={{ color: "#ffffff" }}>Page Content</h1>
        <p style={{ color: "#d1d5db" }}>
          Dark theme with inverted footer and links.
        </p>
      </div>
      <Footer {...args} />
    </div>
  ),
};
