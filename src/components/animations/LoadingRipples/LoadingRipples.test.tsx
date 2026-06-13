import { describe, test, expect } from "vitest";
import { render } from "../../../test-setup";
import { LoadingRipples } from "./LoadingRipples";

import { configure, takeSnapshot } from "@chromatic-com/vitest";

// Adding a random delay to help surface potential timing-related issues in Chromatic's visual testing
configure({
  //delay: 1000 + Math.floor(Math.random() * 14001),
  // title: "PolarizedLoadingRipples",
});

describe("LoadingRipples", () => {
  test("Default - renders with default props", async () => {
    const screen = await render(<LoadingRipples />);
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot("LoadingRipples - Default props");
  });

  test("WarmTone - renders with custom color, ringCount, and cycleMs", async () => {
    const screen = await render(
      <LoadingRipples color="#ea580c" ringCount={4} cycleMs={3000} />,
    );
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot("LoadingRipples - WarmTone props");
  });
  /* 
  test("Unstable - renders with random ringCount, cycleMs, and color", async () => {
    const screen = await render(
      <LoadingRipples
        ringCount={Math.floor(Math.random() * 6) + 2}
        cycleMs={Math.floor(Math.random() * 5000) + 800}
        color={`#${Math.floor(Math.random() * 0xffffff)
          .toString(16)
          .padStart(6, "0")}`}
      />,
    );
    expect(screen.container.firstChild).toBeTruthy();
    // await takeSnapshot("LoadingRipples - Unstable rest with random options");
  });
   test("Unstable - Parameterized test with delay", async () => {
    const screen = await render(
      <LoadingRipples
        ringCount={Math.floor(Math.random() * 6) + 2}
        cycleMs={Math.floor(Math.random() * 5000) + 800}
        color={`#${Math.floor(Math.random() * 0xffffff)
          .toString(16)
          .padStart(6, "0")}`}
      />,
    );
    await takeSnapshot(
      "LoadingRipples - Test with parameterized delay and random options - Initial Render",
    );
    expect(screen.container.firstChild).toBeTruthy();
    configure({
      delay: 1000 + Math.floor(Math.random() * 14001),
    });
    await takeSnapshot(
      "LoadingRipples - Test with parameterized delay and random options - After delay",
    );
  }); */
});
