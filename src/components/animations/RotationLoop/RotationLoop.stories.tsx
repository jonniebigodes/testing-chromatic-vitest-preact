import type { Meta, StoryObj } from "@storybook/preact-vite";
import { RotationLoop } from "./RotationLoop";

const meta = {
  title: "Animations/RotationLoop",
  component: RotationLoop,
  /*  parameters: {
    chromatic: {
      delay: 1000 + Math.floor(Math.random() * 14001),
    },
  }, */
} satisfies Meta<typeof RotationLoop>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Slower: Story = {
  args: {
    durationMs: 6000,
  },
};
/* 
export const Unstable: Story = {
  args: {
    durationMs: Math.floor(Math.random() * 14000) + 400,
  },
};
 */
