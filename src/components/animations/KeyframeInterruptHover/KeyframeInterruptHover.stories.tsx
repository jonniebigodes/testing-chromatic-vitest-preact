import type { Meta, StoryObj } from "@storybook/preact-vite";
import { KeyframeInterruptHover } from "./KeyframeInterruptHover";

const meta = {
  title: "Animations/KeyframeInterruptHover",
  component: KeyframeInterruptHover,
  /*  parameters: {
    chromatic: {
      delay: 1000 + Math.floor(Math.random() * 14001),
    },
  }, */
} satisfies Meta<typeof KeyframeInterruptHover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FasterInterrupts: Story = {
  args: {
    keyframeCycleMs: 1200,
    interruptCycleMs: 320,
  },
};
/* 
export const Unstable: Story = {
  args: {
    keyframeCycleMs: Math.floor(Math.random() * 2800) + 400,
    interruptCycleMs: Math.floor(Math.random() * 900) + 120,
  },
};
 */
