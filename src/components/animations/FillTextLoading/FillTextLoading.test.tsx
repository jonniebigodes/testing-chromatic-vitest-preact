import { describe, test, expect } from "vitest";
import { render } from "../../../test-setup";
import { FillTextLoading } from "./FillTextLoading";

import { configure, takeSnapshot } from "@chromatic-com/vitest";

// Adding a random delay to help surface potential timing-related issues in Chromatic's visual testing
configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
  title: "PolarizedFillTextLoading",
});

describe("FillTextLoading", () => {
  test("Default - renders with default props", async () => {
    const screen = await render(<FillTextLoading />);
    expect(screen.container.firstChild).toBeTruthy();
    await expect.element(screen.getByText("Loading").first()).toBeVisible();
    await takeSnapshot("FillTextLoading - Default props");
  });

  test("LongLabel - renders with custom label and cycleMs", async () => {
    const screen = await render(
      <FillTextLoading label="Synchronizing" cycleMs={3000} />,
    );
    expect(screen.container.firstChild).toBeTruthy();
    await expect
      .element(screen.getByText("Synchronizing").first())
      .toBeVisible();
    await takeSnapshot("FillTextLoading - LongLabel props");
  });

  /*   test("Unstable - renders with random label and cycleMs", async () => {
    const UNSTABLE_LABELS = [
      "Loading",
      "Synchronizing",
      "Rendering",
      "Processing",
      "Stand by",
    ];
    const label =
      UNSTABLE_LABELS[Math.floor(Math.random() * UNSTABLE_LABELS.length)] ??
      "Loading";
    const screen = await render(
      <FillTextLoading
        label={label}
        cycleMs={Math.floor(Math.random() * 5000) + 600}
      />,
    );
    expect(screen.container.firstChild).toBeTruthy();
    await expect.element(screen.getByText(label).first()).toBeVisible();
    await takeSnapshot("FillTextLoading - Unstable rest with random options");
  }); */
  /* test("Unstable - Parameterized test with delay", async () => {
    const UNSTABLE_LABELS = [
      "Loading",
      "Synchronizing",
      "Rendering",
      "Processing",
      "Stand by",
    ];
    const label =
      UNSTABLE_LABELS[Math.floor(Math.random() * UNSTABLE_LABELS.length)] ??
      "Loading";
    const screen = await render(
      <FillTextLoading
        label={label}
        cycleMs={Math.floor(Math.random() * 5000) + 600}
      />,
    );
    await takeSnapshot(
      "FillTextLoading - Test with parameterized delay and random options - Initial Render",
    );
    expect(screen.container.firstChild).toBeTruthy();
    configure({
      delay: 1000 + Math.floor(Math.random() * 14001),
    });
    await expect.element(screen.getByText(label).first()).toBeVisible();
    await takeSnapshot(
      "FillTextLoading - Test with parameterized delay and random options - After delay",
    );
  }); */
});
