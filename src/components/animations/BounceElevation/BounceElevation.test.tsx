import { describe, test, expect } from "vitest";
import { render } from "../../../test-setup";
import { BounceElevation } from "./BounceElevation";

import { configure, takeSnapshot } from "@chromatic-com/vitest";

// Adding a random delay to help surface potential timing-related issues in Chromatic's visual testing
configure({
  //delay: 1000 + Math.floor(Math.random() * 14001),
  //title: "PolarizedBounceElevation",
});

describe("BounceElevation", () => {
  test("Default - renders with default props", async () => {
    const screen = await render(<BounceElevation />);
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot("BounceElevation - Default props");
  });

  test("HigherLift - renders with custom liftPx and cycleMs", async () => {
    const screen = await render(<BounceElevation liftPx={52} cycleMs={1800} />);
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot("BounceElevation - Custom liftPx and cycleMs");
  });
  /* 
  test("Unstable - renders with random liftPx and cycleMs", async () => {
    const screen = await render(
      <BounceElevation
        liftPx={Math.floor(Math.random() * 60) + 20}
        cycleMs={Math.floor(Math.random() * 3500) + 800}
      />,
    );
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot("BounceElevation - Unstable rest with random options");
  });
   test("Unstable - Parameterized test with delay", async () => {
    const screen = await render(
      <BounceElevation
        liftPx={Math.floor(Math.random() * 60) + 20}
        cycleMs={Math.floor(Math.random() * 3500) + 800}
      />,
    );
    await takeSnapshot(
      "BounceElevation - Test with parameterized delay and random options - Initial Render",
    );
    expect(screen.container.firstChild).toBeTruthy();
    configure({
      delay: 1000 + Math.floor(Math.random() * 14001),
    });
    await takeSnapshot(
      "BounceElevation - Test with parameterized delay and random options - After delay",
    );
  }); */
});
