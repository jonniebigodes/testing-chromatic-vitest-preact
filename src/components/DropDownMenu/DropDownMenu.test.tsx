import { describe, test, expect, vi } from "vitest";
import { render } from "../../test-setup";
import DropDownMenu from "./DropDownMenu";

import { configure, takeSnapshot } from "@chromatic-com/vitest";

configure({
  //title: "PolarizedDropDownMenu",
});

const options = ["Edit", "Duplicate", "Delete"];

describe("DropDownMenu", () => {
  test("renders the trigger label", async () => {
    const screen = await render(
      <DropDownMenu label="Actions">{options}</DropDownMenu>,
    );
    await expect
      .element(screen.getByRole("button", { name: /Actions/ }))
      .toBeVisible();
    await takeSnapshot("DropDownMenu - Default props");
  });

  test("reveals the options when opened", async () => {
    const screen = await render(
      <DropDownMenu label="Actions">{options}</DropDownMenu>,
    );
    await screen.getByRole("button", { name: /Actions/ }).click();
    await expect
      .element(screen.getByRole("menuitem", { name: "Edit" }))
      .toBeVisible();
    await takeSnapshot("DropDownMenu - Options visible after click");
  });

  test("invokes onSelect with the chosen option", async () => {
    const onSelect = vi.fn();
    const screen = await render(
      <DropDownMenu label="Actions" onSelect={onSelect}>
        {options}
      </DropDownMenu>,
    );
    await screen.getByRole("button", { name: /Actions/ }).click();
    await screen.getByRole("menuitem", { name: "Delete" }).click();
    expect(onSelect).toHaveBeenCalledWith("Delete");
    await takeSnapshot("DropDownMenu - Option selected");
  });
});
