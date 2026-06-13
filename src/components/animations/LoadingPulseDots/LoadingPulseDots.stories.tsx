import type { Meta, StoryObj } from "@storybook/preact-vite";
import { LoadingPulseDots } from "./LoadingPulseDots";

const meta = {
  title: "Animations/LoadingPulseDots",
  component: LoadingPulseDots,
  /* parameters: {
    chromatic: {
      delay: 1000 + Math.floor(Math.random() * 14001),
    },
  }, */
} satisfies Meta<typeof LoadingPulseDots>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Compact: Story = {
  args: {
    dotCount: 7,
    cycleMs: 1000,
    color: "#0d9488",
  },
};

/* export const Unstable: Story = {
  args: {
    dotCount: Math.floor(Math.random() * 10) + 3,
    cycleMs: Math.floor(Math.random() * 4000) + 400,
    color: `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")}`,
  },
};
 */
