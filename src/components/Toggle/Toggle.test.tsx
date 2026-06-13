import { describe, test, expect, vi } from "vitest";
import { render } from "../../test-setup";
import Toggle from "./Toggle";

import { configure, takeSnapshot } from "@chromatic-com/vitest";

configure({
  title: "PolarizedToggle",
});

describe("Toggle", () => {
  test("renders the accompanying label", async () => {
    const screen = await render(<Toggle>Notifications</Toggle>);
    await expect.element(screen.getByText("Notifications")).toBeVisible();
    await takeSnapshot("Toggle - Default props");
  });

  test("reflects the pressed state", async () => {
    const screen = await render(<Toggle pressed>On</Toggle>);
    await expect
      .element(screen.getByRole("button"))
      .toHaveAttribute("aria-pressed", "true");
    await takeSnapshot("Toggle - Pressed state");
  });

  test("invokes onPressedChange when clicked", async () => {
    const onPressedChange = vi.fn();
    const screen = await render(
      <Toggle onPressedChange={onPressedChange}>X</Toggle>,
    );
    await screen.getByRole("button").click();
    expect(onPressedChange).toHaveBeenCalledWith(true);
    await takeSnapshot("Toggle - Pressed state after click");
  });

  test("is disabled when the disabled prop is set", async () => {
    const screen = await render(<Toggle disabled>X</Toggle>);
    await expect.element(screen.getByRole("button")).toBeDisabled();
    await takeSnapshot("Toggle - Disabled state");
  });
});
