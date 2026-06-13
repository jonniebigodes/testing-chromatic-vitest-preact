import { describe, test, expect } from "vitest";
import { render } from "../../../test-setup";
import { ScrambleTextReveal } from "./ScrambleTextReveal";

import { configure, takeSnapshot } from "@chromatic-com/vitest";

// Adding a random delay to help surface potential timing-related issues in Chromatic's visual testing
configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
  //title: "PolarizedScrambleTextReveal",
});

describe("ScrambleTextReveal", () => {
  test("Default - renders with default props", async () => {
    const screen = await render(<ScrambleTextReveal />);
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot("ScrambleTextReveal - Default props");
  });

  test("StatusLabels - renders with custom words and timing", async () => {
    const screen = await render(
      <ScrambleTextReveal
        words={["Idle", "Fetching", "Ready"]}
        wordHoldMs={2800}
        scrambleTickMs={40}
      />,
    );
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot("ScrambleTextReveal - StatusLabels props");
  });
  /* 
  test("Unstable - renders with random words and timing", async () => {
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
    const screen = await render(
      <ScrambleTextReveal
        words={Array.from(
          { length: Math.floor(Math.random() * 4) + 2 },
          () =>
            SCRAMBLE_POOL[Math.floor(Math.random() * SCRAMBLE_POOL.length)] ??
            "X",
        )}
        wordHoldMs={Math.floor(Math.random() * 4000) + 800}
        scrambleTickMs={Math.floor(Math.random() * 80) + 20}
      />,
    );
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot(
      "ScrambleTextReveal - Unstable rest with random options",
    );
  });
  test("Unstable - Parameterized test with delay", async () => {
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
    const screen = await render(
      <ScrambleTextReveal
        words={Array.from(
          { length: Math.floor(Math.random() * 4) + 2 },
          () =>
            SCRAMBLE_POOL[Math.floor(Math.random() * SCRAMBLE_POOL.length)] ??
            "X",
        )}
        wordHoldMs={Math.floor(Math.random() * 4000) + 800}
        scrambleTickMs={Math.floor(Math.random() * 80) + 20}
      />,
    );
    await takeSnapshot(
      "ScrambleTextReveal - Test with parameterized delay and random options - Initial Render",
    );
    expect(screen.container.firstChild).toBeTruthy();
    configure({
      delay: 1000 + Math.floor(Math.random() * 14001),
    });
    await takeSnapshot(
      "ScrambleTextReveal - Test with parameterized delay and random options - After delay",
    );
  }); */
});
