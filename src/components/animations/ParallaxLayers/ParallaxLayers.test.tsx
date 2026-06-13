import { describe, test, expect } from "vitest";
import { render } from "../../../test-setup";
import { ParallaxLayers } from "./ParallaxLayers";

import { configure, takeSnapshot } from "@chromatic-com/vitest";

// Adding a random delay to help surface potential timing-related issues in Chromatic's visual testing
configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
  title: "PolarizedParallaxLayers",
});

describe("ParallaxLayers", () => {
  test("Horizontal - renders with horizontal axis", async () => {
    const screen = await render(<ParallaxLayers axis="horizontal" />);
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot("ParallaxLayers - Default props");
  });

  test("Vertical - renders with vertical axis and custom durationMs", async () => {
    const screen = await render(
      <ParallaxLayers axis="vertical" durationMs={4200} />,
    );
    expect(screen.container.firstChild).toBeTruthy();
  });
  /* 
  test("Unstable - renders with random axis and durationMs", async () => {
    const screen = await render(
      <ParallaxLayers
        axis={Math.random() < 0.5 ? "horizontal" : "vertical"}
        durationMs={Math.floor(Math.random() * 9000) + 1200}
      />,
    );
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot("ParallaxLayers - Unstable rest with random options");
  });
  test("Unstable - Parameterized test with delay", async () => {
    const screen = await render(
      <ParallaxLayers
        axis={Math.random() < 0.5 ? "horizontal" : "vertical"}
        durationMs={Math.floor(Math.random() * 9000) + 1200}
      />,
    );
    await takeSnapshot(
      "ParallaxLayers - Test with parameterized delay and random options - Initial Render",
    );
    expect(screen.container.firstChild).toBeTruthy();
    configure({
      delay: 1000 + Math.floor(Math.random() * 14001),
    });
    await takeSnapshot(
      "ParallaxLayers - Test with parameterized delay and random options - After delay",
    );
  }); */
});
