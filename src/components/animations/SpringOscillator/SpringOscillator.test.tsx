import { describe, test, expect } from "vitest";
import { render } from "../../../test-setup";
import { SpringOscillator } from "./SpringOscillator";

import { configure, takeSnapshot } from "@chromatic-com/vitest";

// Adding a random delay to help surface potential timing-related issues in Chromatic's visual testing
configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
  //title: "PolarizedSpringOscillator",
});

describe("SpringOscillator", () => {
  test("Default - renders with default props", async () => {
    const screen = await render(<SpringOscillator />);
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot("SpringOscillator - Default props");
  });

  test("WiderSpan - renders with custom spanPx", async () => {
    const screen = await render(<SpringOscillator spanPx={80} />);
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot("SpringOscillator - WiderSpan props");
  });
  /* 
  test("Unstable - renders with random spanPx", async () => {
    const screen = await render(
      <SpringOscillator spanPx={Math.floor(Math.random() * 100) + 24} />,
    );
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot("SpringOscillator - Unstable rest with random options");
  });
  test("Unstable - Parameterized test with delay", async () => {
    const screen = await render(
      <SpringOscillator spanPx={Math.floor(Math.random() * 100) + 24} />,
    );
    await takeSnapshot(
      "SpringOscillator - Test with parameterized delay and random options - Initial Render",
    );
    expect(screen.container.firstChild).toBeTruthy();
    configure({
      delay: 1000 + Math.floor(Math.random() * 14001),
    });
    await takeSnapshot(
      "SpringOscillator - Test with parameterized delay and random options - After delay",
    );
  }); */
});
