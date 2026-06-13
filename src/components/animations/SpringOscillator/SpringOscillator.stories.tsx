import type { Meta, StoryObj } from "@storybook/preact-vite";
import { SpringOscillator } from "./SpringOscillator";

const meta = {
  title: "Animations/SpringOscillator",
  component: SpringOscillator,
  /* parameters: {
    chromatic: {
      delay: 1000 + Math.floor(Math.random() * 14001),
    },
  }, */
} satisfies Meta<typeof SpringOscillator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WiderSpan: Story = {
  args: {
    spanPx: 80,
  },
};

/* export const Unstable: Story = {
  args: {
    spanPx: Math.floor(Math.random() * 100) + 24,
  },
};
 */
