import { describe, test, expect } from "vitest";
import { render } from "../../../test-setup";
import { BasicAnimation } from "./BasicAnimation";

import { configure, takeSnapshot } from "@chromatic-com/vitest";

// Adding a random delay to help surface potential timing-related issues in Chromatic's visual testing
configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
  //title: "PolarizedBasicAnimation",
});

describe("BasicAnimation", () => {
  test("Default - renders with default props", async () => {
    const screen = await render(<BasicAnimation />);
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot("BasicAnimation - Default props");
  });
  /*  
  test("Unstable - renders with random tickMs and widthMaxPx", async () => {
    const screen = await render(
      <BasicAnimation
        tickMs={Math.floor(Math.random() * 4500) + 500}
        widthMaxPx={Math.floor(Math.random() * 400) + 120}
      />,
    );
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot("BasicAnimation - Unstable rest with random options");
  });
 test("Unstable - Parameterized test with delay", async () => {
    const screen = await render(
      <BasicAnimation
        tickMs={Math.floor(Math.random() * 4500) + 500}
        widthMaxPx={Math.floor(Math.random() * 400) + 120}
      />,
    );
    await takeSnapshot(
      "BasicAnimation - Test with parameterized delay and random options - Initial Render",
    );
    expect(screen.container.firstChild).toBeTruthy();
    configure({
      delay: 1000 + Math.floor(Math.random() * 14001),
    });
    await takeSnapshot(
      "BasicAnimation - Test with parameterized delay and random options - After delay",
    );
  }); */
});
