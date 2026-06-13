import type { Meta, StoryObj } from "@storybook/preact-vite";
import { BasicAnimation } from "./BasicAnimation";

const meta = {
  title: "Animations/BasicAnimation",
  component: BasicAnimation,
  /*  parameters: {
    chromatic: {
      delay: 1000 + Math.floor(Math.random() * 14001),
    },
  }, */
} satisfies Meta<typeof BasicAnimation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/* export const Unstable: Story = {
  args: {
    tickMs: Math.floor(Math.random() * 4500) + 500,
    widthMaxPx: Math.floor(Math.random() * 400) + 120,
  },
};
 */
