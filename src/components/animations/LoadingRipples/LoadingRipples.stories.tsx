import type { Meta, StoryObj } from "@storybook/preact-vite";
import { LoadingRipples } from "./LoadingRipples";

const meta = {
  title: "Animations/LoadingRipples",
  component: LoadingRipples,
  /*  parameters: {
    chromatic: {
      delay: 1000 + Math.floor(Math.random() * 14001),
    },
  }, */
} satisfies Meta<typeof LoadingRipples>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WarmTone: Story = {
  args: {
    color: "#ea580c",
    ringCount: 4,
    cycleMs: 3000,
  },
};

/* export const Unstable: Story = {
  args: {
    ringCount: Math.floor(Math.random() * 6) + 2,
    cycleMs: Math.floor(Math.random() * 5000) + 800,
    color: `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")}`,
  },
};
 */
