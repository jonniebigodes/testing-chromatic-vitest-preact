import type { Meta, StoryObj } from "@storybook/preact-vite";
import { BounceElevation } from "./BounceElevation";

const meta = {
  title: "Animations/BounceElevation",
  component: BounceElevation,
  /*  parameters: {
    chromatic: {
      delay: 1000 + Math.floor(Math.random() * 14001),
    },
  }, */
} satisfies Meta<typeof BounceElevation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const HigherLift: Story = {
  args: {
    liftPx: 52,
    cycleMs: 1800,
  },
};

/* export const Unstable: Story = {
  args: {
    liftPx: Math.floor(Math.random() * 60) + 20,
    cycleMs: Math.floor(Math.random() * 3500) + 800,
  },
}; */
