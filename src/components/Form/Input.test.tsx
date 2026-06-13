import { describe, test, expect } from "vitest";
import { render } from "../../test-setup";
import Input from "./Input";

import { configure, takeSnapshot } from "@chromatic-com/vitest";

configure({
  //title: "PolarizedInput",
});

describe("Input", () => {
  test("renders with the given placeholder", async () => {
    const screen = await render(<Input placeholder="john@example.com" />);
    await expect
      .element(screen.getByRole("textbox"))
      .toHaveAttribute("placeholder", "john@example.com");
    await takeSnapshot("Input - Default props");
  });

  test("accepts typed text", async () => {
    const screen = await render(<Input placeholder="name" />);
    const input = screen.getByRole("textbox");
    await input.fill("Jane");
    await expect.element(input).toHaveValue("Jane");
    await takeSnapshot("Input - Typed text");
  });

  test("renders inverted styling", async () => {
    const screen = await render(<Input placeholder="name" inverted />);
    // inverted background is slate800 (#33373d -> hsl based); white text instead
    await expect
      .element(screen.getByRole("textbox"))
      .toHaveStyle({ color: "rgb(255, 255, 255)" });
    await takeSnapshot("Input - Inverted styling");
  });
});
