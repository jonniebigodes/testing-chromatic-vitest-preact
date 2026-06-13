import { describe, test, expect } from "vitest";
import { render } from "../../../test-setup";
import { ColorInterpolation } from "./ColorInterpolation";

import { configure, takeSnapshot } from "@chromatic-com/vitest";

// Adding a random delay to help surface potential timing-related issues in Chromatic's visual testing
configure({
  //delay: 1000 + Math.floor(Math.random() * 14001),
  title: "PolarizedColorInterpolation",
});

describe("ColorInterpolation", () => {
  test("Default - renders with default props", async () => {
    const screen = await render(<ColorInterpolation />);
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot("ColorInterpolation - Default props");
  });

  test("SlowerSweep - renders with custom durationMs", async () => {
    const screen = await render(<ColorInterpolation durationMs={6000} />);
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot("ColorInterpolation - SlowerSweep props");
  });
  /* 
  test("Unstable - renders with random durationMs", async () => {
    const screen = await render(
      <ColorInterpolation
        durationMs={Math.floor(Math.random() * 12000) + 800}
      />,
    );
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot(
      "ColorInterpolation - Unstable rest with random options",
    );
  });
   test("Unstable - Parameterized test with delay", async () => {
    const screen = await render(
      <ColorInterpolation
        durationMs={Math.floor(Math.random() * 12000) + 800}
      />,
    );
    await takeSnapshot(
      "ColorInterpolation - Test with parameterized delay and random options - Initial Render",
    );
    expect(screen.container.firstChild).toBeTruthy();
    configure({
      delay: 1000 + Math.floor(Math.random() * 14001),
    });
    await takeSnapshot(
      "ColorInterpolation - Test with parameterized delay and random options - After delay",
    );
  }); */
});
