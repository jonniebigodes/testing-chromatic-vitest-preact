import { describe, test, expect } from "vitest";
import { render } from "../../test-setup";
import Progress from "./Progress";

import { configure, takeSnapshot } from "@chromatic-com/vitest";

configure({
  // title: "PolarizedProgress",
});

describe("Progress", () => {
  test("renders the default label", async () => {
    const screen = await render(<Progress value={50} />);
    await expect.element(screen.getByText("Loading...")).toBeVisible();
    await takeSnapshot("Progress - Default props");
  });

  test("renders a custom label", async () => {
    const screen = await render(<Progress value={50}>Uploading</Progress>);
    await expect.element(screen.getByText("Uploading")).toBeVisible();
    await takeSnapshot("Progress - Custom label");
  });

  test("exposes the value via the progressbar role", async () => {
    const screen = await render(<Progress value={75} />);
    await expect
      .element(screen.getByRole("progressbar"))
      .toHaveAttribute("aria-valuenow", "75");
    await takeSnapshot("Progress - ARIA attributes");
  });
});
