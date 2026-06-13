import { describe, test, expect } from "vitest";
import { render } from "../../../test-setup";
import { KeyframeInterruptHover } from "./KeyframeInterruptHover";

import { configure, takeSnapshot } from "@chromatic-com/vitest";

// Adding a random delay to help surface potential timing-related issues in Chromatic's visual testing
configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
  //title: "PolarizedKeyframeInterruptHover",
});

describe("KeyframeInterruptHover", () => {
  test("Default - renders with default props", async () => {
    const screen = await render(<KeyframeInterruptHover />);
    expect(screen.container.firstChild).toBeTruthy();
    await expect.element(screen.getByText("Keyframe (remount)")).toBeVisible();
    await expect.element(screen.getByText("Hover-like")).toBeVisible();
    await expect
      .element(screen.getByText("Interruptible timing"))
      .toBeVisible();
    await takeSnapshot("KeyframeInterruptHover - Default props");
  });

  test("FasterInterrupts - renders with custom timing", async () => {
    const screen = await render(
      <KeyframeInterruptHover keyframeCycleMs={1200} interruptCycleMs={320} />,
    );
    expect(screen.container.firstChild).toBeTruthy();
    await expect.element(screen.getByText("Hover-like")).toBeVisible();
    await takeSnapshot("KeyframeInterruptHover - FasterInterrupts props");
  });
  /* 
  test("Unstable - renders with random timing", async () => {
    const screen = await render(
      <KeyframeInterruptHover
        keyframeCycleMs={Math.floor(Math.random() * 2800) + 400}
        interruptCycleMs={Math.floor(Math.random() * 900) + 120}
      />,
    );
    expect(screen.container.firstChild).toBeTruthy();
    await expect.element(screen.getByText("Hover-like")).toBeVisible();
    await takeSnapshot(
      "KeyframeInterruptHover - Unstable rest with random options",
    );
  });
  test("Unstable - Parameterized test with delay", async () => {
    const screen = await render(
      <KeyframeInterruptHover
        keyframeCycleMs={Math.floor(Math.random() * 2800) + 400}
        interruptCycleMs={Math.floor(Math.random() * 900) + 120}
      />,
    );
    await takeSnapshot(
      "KeyframeInterruptHover - Test with parameterized delay and random options - Initial Render",
    );
    expect(screen.container.firstChild).toBeTruthy();
    configure({
      delay: 1000 + Math.floor(Math.random() * 14001),
    });
    await expect.element(screen.getByText("Hover-like")).toBeVisible();
    await takeSnapshot(
      "KeyframeInterruptHover - Test with parameterized delay and random options - After delay",
    );
  }); */
});
