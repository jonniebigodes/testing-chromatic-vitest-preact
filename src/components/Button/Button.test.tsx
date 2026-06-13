import { describe, test, expect, vi } from "vitest";
import { render } from "../../test-setup";
import Button from "./Button";
import { configure, takeSnapshot } from "@chromatic-com/vitest";

// Adding a random delay to help surface potential timing-related issues in Chromatic's visual testing
configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
  //title: "PolarizedButton",
});

describe("Button", () => {
  test("renders the provided label", async () => {
    const screen = await render(<Button label="Click me" />);
    await expect
      .element(screen.getByRole("button", { name: "Click me" }))
      .toBeVisible();
    await takeSnapshot("Button - Default props");
  });

  test("applies the requested background color", async () => {
    const screen = await render(
      <Button label="Red" backgroundColor="rgb(239, 68, 68)" />,
    );
    await expect
      .element(screen.getByRole("button"))
      .toHaveStyle({ backgroundColor: "rgb(239, 68, 68)" });
    await takeSnapshot("Button - Red background");
  });

  test("invokes onClick when pressed", async () => {
    const onClick = vi.fn();
    const screen = await render(<Button label="Press" onClick={onClick} />);
    await screen.getByRole("button").click();
    expect(onClick).toHaveBeenCalledTimes(1);
    await takeSnapshot("Button - Click interaction");
  });

  test("honors the large size variant height", async () => {
    const screen = await render(<Button label="Large" size="large" />);
    await expect
      .element(screen.getByRole("button"))
      .toHaveStyle({ height: "40px" });
    await takeSnapshot("Button - Large size");
  });

  test("honors the small size variant height", async () => {
    const screen = await render(
      <Button label="Smallish button" size="small" />,
    );
    await expect
      .element(screen.getByRole("button"))
      .toHaveStyle({ height: "24px" });
    await takeSnapshot("Button - Small size");
  });
  /*   test("Unstable - Random test", async () => {
    const screen = await render(
      <Button
        label={`Button with random label ${Math.random()}`}
        size="large"
      />,
    );
    await expect
      .element(screen.getByRole("button"))
      .toHaveStyle({ height: "40px" });
    await takeSnapshot("Button - Unstable test with random label");
  });*/
});
