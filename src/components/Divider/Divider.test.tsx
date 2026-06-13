import { describe, test, expect } from "vitest";
import { render } from "../../test-setup";
import Divider from "./Divider";

import { configure, takeSnapshot } from "@chromatic-com/vitest";

configure({
  title: "PolarizedDivider",
});

describe("Divider", () => {
  test("renders a separator line", async () => {
    const screen = await render(<Divider />);
    await expect.element(screen.getByRole("separator")).toBeInTheDocument();
    await takeSnapshot("Divider - Default props");
  });

  test("applies a custom color to the line", async () => {
    const screen = await render(<Divider color="rgb(255, 0, 0)" />);
    await expect
      .element(screen.getByRole("separator"))
      .toHaveStyle({ backgroundColor: "rgb(255, 0, 0)" });
    await takeSnapshot("Divider - Custom color");
  });
});
