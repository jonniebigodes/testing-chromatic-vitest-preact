import type { Meta, StoryObj } from "@storybook/preact-vite";
import { ScrambleTextReveal } from "./ScrambleTextReveal";

const meta = {
  title: "Animations/ScrambleTextReveal",
  component: ScrambleTextReveal,
  /* parameters: {
    chromatic: {
      delay: 1000 + Math.floor(Math.random() * 14001),
    },
  }, */
} satisfies Meta<typeof ScrambleTextReveal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const StatusLabels: Story = {
  args: {
    words: ["Idle", "Fetching", "Ready"],
    wordHoldMs: 2800,
    scrambleTickMs: 40,
  },
};
/* 
const SCRAMBLE_POOL = [
  "Alpha",
  "Beta",
  "Gamma",
  "Delta",
  "Omega",
  "Flux",
  "Nexus",
  "Pulse",
];

export const Unstable: Story = {
  args: {
    words: Array.from(
      { length: Math.floor(Math.random() * 4) + 2 },
      () =>
        SCRAMBLE_POOL[Math.floor(Math.random() * SCRAMBLE_POOL.length)] ?? "X",
    ),
    wordHoldMs: Math.floor(Math.random() * 4000) + 800,
    scrambleTickMs: Math.floor(Math.random() * 80) + 20,
  },
};
 */
