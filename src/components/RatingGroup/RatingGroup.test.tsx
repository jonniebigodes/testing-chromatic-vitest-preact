import { describe, test, expect, vi } from "vitest";
import { render } from "../../test-setup";
import RatingGroup from "./RatingGroup";

import { configure, takeSnapshot } from "@chromatic-com/vitest";

configure({
  //title: "PolarizedRatingGroup",
});

describe("RatingGroup", () => {
  test("renders the label", async () => {
    const screen = await render(<RatingGroup max={5}>Rate us</RatingGroup>);
    await expect.element(screen.getByText("Rate us")).toBeVisible();
    await takeSnapshot("RatingGroup - Default props");
  });

  test("renders one item per star in the range", async () => {
    const screen = await render(<RatingGroup min={1} max={5} />);
    // Ark exposes rating items as radios within the group
    expect(screen.getByRole("radio").elements()).toHaveLength(5);
    await takeSnapshot("RatingGroup - Star items");
  });

  test("invokes onValueChange when a star is selected", async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <RatingGroup min={1} max={5} onValueChange={onValueChange} />,
    );
    await screen.getByRole("radio").nth(2).click();
    expect(onValueChange).toHaveBeenCalled();
    await takeSnapshot("RatingGroup - Star selected");
  });
});
