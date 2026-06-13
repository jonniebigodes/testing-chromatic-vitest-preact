import { describe, test, expect, vi } from "vitest";
import { render } from "../../test-setup";
import Pill from "./Pill";

import { configure, takeSnapshot } from "@chromatic-com/vitest";

configure({
  title: "PolarizedPill",
});

describe("Pill", () => {
  test("renders its content", async () => {
    const screen = await render(<Pill>New</Pill>);
    await expect.element(screen.getByText("New")).toBeVisible();
    await takeSnapshot("Pill - Default props");
  });

  test("renders the success variant with a green background", async () => {
    const screen = await render(<Pill variant="success">Done</Pill>);
    await expect
      .element(screen.getByText("Done"))
      .toHaveStyle({ backgroundColor: "rgb(102, 191, 60)" });
    await takeSnapshot("Pill - Success variant");
  });

  test("renders the warning variant with a yellow background", async () => {
    const screen = await render(<Pill variant="warning">Careful</Pill>);
    await expect
      .element(screen.getByText("Careful"))
      .toHaveStyle({ backgroundColor: "rgb(255, 174, 0)" });
    await takeSnapshot("Pill - Warning variant");
  });

  test("invokes onClick when interactive", async () => {
    const onClick = vi.fn();
    const screen = await render(<Pill onClick={onClick}>Tap</Pill>);
    await screen.getByText("Tap").click();
    expect(onClick).toHaveBeenCalledTimes(1);
    await takeSnapshot("Pill - Clickable");
  });

  test("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    const screen = await render(
      <Pill onClick={onClick} disabled>
        Off
      </Pill>,
    );
    await screen.getByText("Off").click();
    expect(onClick).not.toHaveBeenCalled();
    await takeSnapshot("Pill - Disabled");
  });
});
