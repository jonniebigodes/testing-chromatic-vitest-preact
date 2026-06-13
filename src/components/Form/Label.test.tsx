import { describe, test, expect } from "vitest";
import { render } from "../../test-setup";
import Label from "./Label";

import { configure, takeSnapshot } from "@chromatic-com/vitest";

configure({
  //title: "PolarizedLabel",
});

describe("Label", () => {
  test("renders its text", async () => {
    const screen = await render(<Label htmlFor="email">Email Address</Label>);
    await expect.element(screen.getByText("Email Address")).toBeVisible();
    await takeSnapshot("Label - Default props");
  });

  test("associates with a field via htmlFor", async () => {
    const screen = await render(<Label htmlFor="email">Email Address</Label>);
    await expect
      .element(screen.getByText("Email Address"))
      .toHaveAttribute("for", "email");
    await takeSnapshot("Label - Associated with field");
  });

  test("uses inverted text color when inverted", async () => {
    const screen = await render(<Label inverted>Inverted</Label>);
    // white text (#FFFFFF) in inverted mode
    await expect
      .element(screen.getByText("Inverted"))
      .toHaveStyle({ color: "rgb(255, 255, 255)" });
    await takeSnapshot("Label - Inverted styling");
  });
});
