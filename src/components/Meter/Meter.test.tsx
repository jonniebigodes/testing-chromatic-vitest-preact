import { describe, test, expect } from "vitest";
import { render } from "../../test-setup";
import Meter from "./Meter";

import { configure, takeSnapshot } from "@chromatic-com/vitest";

configure({
  //title: "PolarizedMeter",
});

describe("Meter", () => {
  test("renders the label", async () => {
    const screen = await render(<Meter value={40}>Disk Usage</Meter>);
    await expect.element(screen.getByText("Disk Usage")).toBeVisible();
    await takeSnapshot("Meter - Default props");
  });

  test("colors the range green when the value is in the optimal band", async () => {
    // default thresholds: low=33, high=66; optimum defaults to max (100) > high
    // value 80 (> high) => green500 (#66BF3C)
    await render(<Meter value={80}>Health</Meter>);
    const range = document.querySelector(
      '[data-part="range"]',
    ) as HTMLElement | null;
    expect(range).not.toBeNull();
    expect(range!).toHaveStyle({ backgroundColor: "rgb(102, 191, 60)" });
    await takeSnapshot("Meter - Optimal range");
  });

  test("colors the range red when the value is far below optimum", async () => {
    // value 10 (< low) with optimum high => pink600 (#E81C61)
    await render(<Meter value={10}>Health</Meter>);
    const range = document.querySelector(
      '[data-part="range"]',
    ) as HTMLElement | null;
    expect(range).not.toBeNull();
    expect(range!).toHaveStyle({ backgroundColor: "rgb(232, 28, 97)" });
    await takeSnapshot("Meter - Far below optimum");
  });
});
