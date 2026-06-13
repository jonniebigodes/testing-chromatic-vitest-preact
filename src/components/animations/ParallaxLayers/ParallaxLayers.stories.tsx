import type { Meta, StoryObj } from "@storybook/preact-vite";
import { ParallaxLayers } from "./ParallaxLayers";

const meta = {
  title: "Animations/ParallaxLayers",
  component: ParallaxLayers,
  /*  parameters: {
    chromatic: {
      delay: 1000 + Math.floor(Math.random() * 14001),
    },
  }, */
} satisfies Meta<typeof ParallaxLayers>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    axis: "horizontal",
  },
};

export const Vertical: Story = {
  args: {
    axis: "vertical",
    durationMs: 4200,
  },
};

/* export const Unstable: Story = {
  args: {
    axis: Math.random() < 0.5 ? "horizontal" : "vertical",
    durationMs: Math.floor(Math.random() * 9000) + 1200,
  },
};
 */
