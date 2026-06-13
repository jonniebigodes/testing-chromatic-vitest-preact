import type { Meta, StoryObj } from "@storybook/preact-vite";
import { FillTextLoading } from "./FillTextLoading";

const meta = {
  title: "Animations/FillTextLoading",
  component: FillTextLoading,
  /*  parameters: {
    chromatic: {
      delay: 1000 + Math.floor(Math.random() * 14001),
    },
  }, */
} satisfies Meta<typeof FillTextLoading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongLabel: Story = {
  args: {
    label: "Synchronizing",
    cycleMs: 3000,
  },
};
/* 
const UNSTABLE_LABELS = [
  "Loading",
  "Synchronizing",
  "Rendering",
  "Processing",
  "Stand by",
];

export const Unstable: Story = {
  args: {
    label:
      UNSTABLE_LABELS[Math.floor(Math.random() * UNSTABLE_LABELS.length)] ??
      "Loading",
    cycleMs: Math.floor(Math.random() * 5000) + 600,
  },
};
 */
