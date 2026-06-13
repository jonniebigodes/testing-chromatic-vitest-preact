import type { Meta, StoryObj } from "@storybook/preact-vite";
import Accordion from "./Accordion";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        title: "What is PReact?",
        content:
          "Preact is a fast 3kB alternative to React with the same modern API. It lets you create reusable components that manage their own state.",
      },
    ],
  },
};

export const MultipleItems: Story = {
  args: {
    items: [
      {
        title: "What is PReact?",
        content:
          "Preact is a fast 3kB alternative to React with the same modern API. It lets you create reusable components that manage their own state.",
      },
      {
        title: "What is Ark UI?",
        content:
          "Ark UI is a headless UI library that provides accessible and customizable components for React, Vue, and Solid applications.",
      },
      {
        title: "What is Storybook?",
        content:
          "Storybook is a tool for developing UI components in isolation. It makes building stunning UIs organized and efficient.",
      },
    ],
  },
};

export const Inverted: Story = {
  args: {
    inverted: true,
    items: [
      {
        title: "What is PReact?",
        content:
          "Preact is a fast 3kB alternative to React with the same modern API. It lets you create reusable components that manage their own state.",
      },
      {
        title: "What is Ark UI?",
        content:
          "Ark UI is a headless UI library that provides accessible and customizable components for React, Vue, and Solid applications.",
      },
      {
        title: "What is Storybook?",
        content:
          "Storybook is a tool for developing UI components in isolation. It makes building stunning UIs organized and efficient.",
      },
    ],
  },
  globals: {
    backgrounds: { value: "dark" },
  },
};

export const InvertedSingleItem: Story = {
  args: {
    inverted: true,
    items: [
      {
        title: "Dark Mode Example",
        content:
          "This accordion is displayed with inverted colors suitable for dark backgrounds.",
      },
    ],
  },
  globals: {
    backgrounds: { value: "dark" },
  },
};

export const LongContent: Story = {
  args: {
    items: [
      {
        title: "Getting Started with Accordion",
        content:
          "The accordion component is a vertically stacked set of interactive headings that each reveal a section of content. Users can expand and collapse these sections to show or hide information. This pattern is commonly used in FAQs, documentation, and settings panels where you want to progressively disclose information to avoid overwhelming users with too much content at once.",
      },
      {
        title: "Accessibility Features",
        content:
          "Our accordion implementation follows ARIA best practices, including proper keyboard navigation with arrow keys, home/end key support, and correct ARIA attributes for screen readers. Each accordion item has appropriate aria-expanded states and role attributes.",
      },
    ],
  },
};

export const ManyItems: Story = {
  args: {
    items: [
      { title: "Section 1", content: "Content for section 1" },
      { title: "Section 2", content: "Content for section 2" },
      { title: "Section 3", content: "Content for section 3" },
      { title: "Section 4", content: "Content for section 4" },
      { title: "Section 5", content: "Content for section 5" },
      { title: "Section 6", content: "Content for section 6" },
      { title: "Section 7", content: "Content for section 7" },
      { title: "Section 8", content: "Content for section 8" },
    ],
  },
};
