import { describe, test, expect } from "vitest";
import { render } from "../../test-setup";
import Collapsible from "./Collapsible";

import { configure, takeSnapshot } from "@chromatic-com/vitest";

configure({
  //title: "PolarizedCollapsible",
});

describe("Collapsible", () => {
  test("renders the trigger label", async () => {
    const screen = await render(
      <Collapsible label="Details">
        <p>Hidden body</p>
      </Collapsible>,
    );
    await expect.element(screen.getByText("Details")).toBeVisible();
    await takeSnapshot("Collapsible - Default props");
  });

  test("reveals content when open", async () => {
    const screen = await render(
      <Collapsible label="Details" open>
        <p>Visible body</p>
      </Collapsible>,
    );
    await expect.element(screen.getByText("Visible body")).toBeVisible();
    await takeSnapshot("Collapsible - Open state");
  });

  test("disables the trigger when disabled", async () => {
    const screen = await render(
      <Collapsible label="Details" disabled>
        <p>Body</p>
      </Collapsible>,
    );
    await expect
      .element(screen.getByRole("button", { name: "Details" }))
      .toBeDisabled();
    await takeSnapshot("Collapsible - Disabled state");
  });
});
