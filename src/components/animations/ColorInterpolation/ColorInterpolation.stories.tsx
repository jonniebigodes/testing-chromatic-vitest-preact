import type { Meta, StoryObj } from "@storybook/preact-vite";
import { ColorInterpolation } from "./ColorInterpolation";

const meta = {
  title: "Animations/ColorInterpolation",
  component: ColorInterpolation,
  /*  parameters: {
    chromatic: {
      delay: 1000 + Math.floor(Math.random() * 14001),
    },
  }, */
} satisfies Meta<typeof ColorInterpolation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SlowerSweep: Story = {
  args: {
    durationMs: 6000,
  },
};

/* export const Unstable: Story = {
  args: {
    durationMs: Math.floor(Math.random() * 12000) + 800,
  },
};
 */
