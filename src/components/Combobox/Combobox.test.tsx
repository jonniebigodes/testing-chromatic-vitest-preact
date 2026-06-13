import { describe, test, expect, vi } from "vitest";
import { render } from "../../test-setup";
import Combobox from "./Combobox";

import { configure, takeSnapshot } from "@chromatic-com/vitest";

configure({
  title: "PolarizedCombobox",
});

const items = ["React", "Vue", "Svelte"];

describe("Combobox", () => {
  test("renders the label", async () => {
    const screen = await render(<Combobox label="Framework" items={items} />);
    await expect.element(screen.getByText("Framework")).toBeVisible();
    await takeSnapshot("Combobox - Default props");
  });

  test("renders an input with the placeholder", async () => {
    const screen = await render(
      <Combobox items={items} placeholder="Choose one..." />,
    );
    await expect
      .element(screen.getByRole("combobox"))
      .toHaveAttribute("placeholder", "Choose one...");
    await takeSnapshot("Combobox default props");
  });

  test("filters and selects an option by typing", async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <Combobox items={items} onValueChange={onValueChange} />,
    );
    const input = screen.getByRole("combobox");
    await input.fill("Vue");
    await screen.getByRole("option", { name: "Vue" }).click();
    expect(onValueChange).toHaveBeenCalledWith(
      expect.objectContaining({ value: ["Vue"] }),
    );
    await takeSnapshot("Combobox - Option selected");
  });
});
