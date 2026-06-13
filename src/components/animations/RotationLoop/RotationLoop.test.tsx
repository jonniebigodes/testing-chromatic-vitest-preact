import { describe, test, expect } from "vitest";
import { render } from "../../../test-setup";
import { RotationLoop } from "./RotationLoop";

import { configure, takeSnapshot } from "@chromatic-com/vitest";

// Adding a random delay to help surface potential timing-related issues in Chromatic's visual testing
configure({
  /*  delay: 1000 + Math.floor(Math.random() * 14001), */
  //title: "PolarizedRotationLoop",
});

describe("RotationLoop", () => {
  test("Default - renders with default props", async () => {
    const screen = await render(<RotationLoop />);
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot("RotationLoop - Default props");
  });

  test("Slower - renders with custom durationMs", async () => {
    const screen = await render(<RotationLoop durationMs={6000} />);
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot("RotationLoop - Slower props");
  });
  /*
  test("Unstable - renders with random durationMs", async () => {
    const screen = await render(
      <RotationLoop durationMs={Math.floor(Math.random() * 14000) + 400} />,
    );
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot("RotationLoop - Unstable rest with random options");
  });
   test("Unstable - Parameterized test with delay", async () => {
    const screen = await render(
      <RotationLoop durationMs={Math.floor(Math.random() * 14000) + 400} />,
    );
    await takeSnapshot(
      "RotationLoop - Test with parameterized delay and random options - Initial Render",
    );
    expect(screen.container.firstChild).toBeTruthy();
    configure({
      delay: 1000 + Math.floor(Math.random() * 14001),
    });
    await takeSnapshot(
      "RotationLoop - Test with parameterized delay and random options - After delay",
    );
  }); */
});
