import { describe, test, expect } from "vitest";
import { render } from "../../test-setup";
import AspectRatio from "./AspectRatio";
import { configure, takeSnapshot } from "@chromatic-com/vitest";

configure({
  //title: "PolarizedAspectRatio",
});

describe("AspectRatio", () => {
  test("renders its children", async () => {
    const screen = await render(
      <AspectRatio ratio={16 / 9}>
        <span>Framed</span>
      </AspectRatio>,
    );
    await expect.element(screen.getByText("Framed")).toBeVisible();
    await takeSnapshot("AspectRatio with child content");
  });

  test("centers content inside the frame", async () => {
    const screen = await render(
      <AspectRatio ratio={1}>
        <span>Square</span>
      </AspectRatio>,
    );
    const inner = screen.getByText("Square").element().parentElement!;
    expect(inner).toHaveStyle({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    });
    await takeSnapshot("AspectRatio with centered content");
  });
});
