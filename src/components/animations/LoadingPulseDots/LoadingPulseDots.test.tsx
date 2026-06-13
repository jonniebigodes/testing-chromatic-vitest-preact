import { describe, test, expect } from "vitest";
import { render } from "../../../test-setup";
import { LoadingPulseDots } from "./LoadingPulseDots";

import { configure, takeSnapshot } from "@chromatic-com/vitest";

// Adding a random delay to help surface potential timing-related issues in Chromatic's visual testing
configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
  title: "PolarizedLoadingPulseDots",
});

describe("LoadingPulseDots", () => {
  test("Default - renders with default props", async () => {
    const screen = await render(<LoadingPulseDots />);
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot("LoadingPulseDots - Default props");
  });

  test("Compact - renders with custom dotCount, cycleMs, and color", async () => {
    const screen = await render(
      <LoadingPulseDots dotCount={7} cycleMs={1000} color="#0d9488" />,
    );
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot("LoadingPulseDots - Compact props");
  });
  /*  
  test("Unstable - renders with random dotCount, cycleMs, and color", async () => {
    const screen = await render(
      <LoadingPulseDots
        dotCount={Math.floor(Math.random() * 10) + 3}
        cycleMs={Math.floor(Math.random() * 4000) + 400}
        color={`#${Math.floor(Math.random() * 0xffffff)
          .toString(16)
          .padStart(6, "0")}`}
      />,
    );
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot("LoadingPulseDots - Unstable rest with random options");
  });
 test("Unstable - Parameterized test with delay", async () => {
    const screen = await render(
      <LoadingPulseDots
        dotCount={Math.floor(Math.random() * 10) + 3}
        cycleMs={Math.floor(Math.random() * 4000) + 400}
        color={`#${Math.floor(Math.random() * 0xffffff)
          .toString(16)
          .padStart(6, "0")}`}
      />,
    );
    await takeSnapshot(
      "LoadingPulseDots - Test with parameterized delay and random options - Initial Render",
    );
    expect(screen.container.firstChild).toBeTruthy();
    configure({
      delay: 1000 + Math.floor(Math.random() * 14001),
    });
    await takeSnapshot(
      "LoadingPulseDots - Test with parameterized delay and random options - After delay",
    );
  }); */
});
