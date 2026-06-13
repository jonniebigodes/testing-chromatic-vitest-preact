import { describe, test, expect } from "vitest";
import { render } from "../../test-setup";
import Toolbar from "./Toolbar";

import { configure, takeSnapshot } from "@chromatic-com/vitest";

configure({
  // title: "PolarizedToolbar",
});

describe("Toolbar", () => {
  test("renders children inside a toolbar role", async () => {
    configure({
      title: "PolarizedToolbar - Default props - two buttons",
    });
    const screen = await render(
      <Toolbar>
        <button>One</button>
        <button>Two</button>
      </Toolbar>,
    );
    await expect.element(screen.getByRole("toolbar")).toBeVisible();
    await expect
      .element(screen.getByRole("button", { name: "One" }))
      .toBeVisible();
    await takeSnapshot("Toolbar - Default props");
  });

  test("lays out horizontally by default", async () => {
    const screen = await render(
      <Toolbar>
        <button>X</button>
      </Toolbar>,
    );
    await expect
      .element(screen.getByRole("toolbar"))
      .toHaveStyle({ flexDirection: "row" });
    await takeSnapshot("Toolbar - Horizontal layout");
  });

  test("lays out vertically when requested", async () => {
    const screen = await render(
      <Toolbar orientation="vertical">
        <button>X</button>
      </Toolbar>,
    );
    await expect
      .element(screen.getByRole("toolbar"))
      .toHaveStyle({ flexDirection: "column" });
    await takeSnapshot("Toolbar - Vertical layout");
  });
});
