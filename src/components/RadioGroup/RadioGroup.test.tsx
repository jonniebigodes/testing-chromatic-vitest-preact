import { describe, test, expect, vi } from "vitest";
import { render } from "../../test-setup";
import RadioGroup from "./RadioGroup";

import { configure, takeSnapshot } from "@chromatic-com/vitest";

configure({
  //title: "PolarizedRadioGroup",
});

const options = [
  { label: "Small", value: "sm" },
  { label: "Medium", value: "md" },
  { label: "Large", value: "lg" },
];

describe("RadioGroup", () => {
  test("renders the group label", async () => {
    const screen = await render(
      <RadioGroup options={options}>Pick a size</RadioGroup>,
    );
    await expect.element(screen.getByText("Pick a size")).toBeVisible();
    await takeSnapshot("RadioGroup - Default props");
  });

  test("renders every option label", async () => {
    const screen = await render(<RadioGroup options={options} />);
    await expect.element(screen.getByText("Small")).toBeVisible();
    await expect.element(screen.getByText("Medium")).toBeVisible();
    await expect.element(screen.getByText("Large")).toBeVisible();
    await takeSnapshot("RadioGroup - Option labels");
  });

  test("invokes onValueChange when an option is chosen", async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <RadioGroup options={options} onValueChange={onValueChange} />,
    );
    await screen.getByText("Medium").click();
    await takeSnapshot("RadioGroup - Medium option clicked");
    expect(onValueChange).toHaveBeenCalledWith({ value: "md" });
    await takeSnapshot("RadioGroup - Value change");
  });
});
