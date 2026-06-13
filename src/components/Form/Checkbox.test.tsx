import { describe, test, expect, vi } from "vitest";
import { render } from "../../test-setup";
import Checkbox from "./Checkbox";

import { configure, takeSnapshot } from "@chromatic-com/vitest";

configure({
  //title: "PolarizedCheckbox",
});

describe("Checkbox", () => {
  test("renders its label", async () => {
    const screen = await render(<Checkbox>Accept terms</Checkbox>);
    await expect.element(screen.getByText("Accept terms")).toBeVisible();
    await takeSnapshot("Checkbox - Default props");
  });

  test("reflects the checked prop", async () => {
    const screen = await render(<Checkbox checked>Subscribed</Checkbox>);
    await expect.element(screen.getByRole("checkbox")).toBeChecked();
    await takeSnapshot("Checkbox - Checked state");
  });

  test("invokes onCheckedChange when toggled", async () => {
    const onCheckedChange = vi.fn();
    const screen = await render(
      <Checkbox onCheckedChange={onCheckedChange}>Toggle me</Checkbox>,
    );
    await screen.getByText("Toggle me").click();
    expect(onCheckedChange).toHaveBeenCalled();
    await takeSnapshot("Checkbox - Toggled");
  });

  test("does not toggle when disabled", async () => {
    const onCheckedChange = vi.fn();
    const screen = await render(
      <Checkbox disabled onCheckedChange={onCheckedChange}>
        Disabled
      </Checkbox>,
    );
    await screen.getByText("Disabled").click({ force: true });
    expect(onCheckedChange).not.toHaveBeenCalled();
    await takeSnapshot("Checkbox - Disabled state");
  });
});
