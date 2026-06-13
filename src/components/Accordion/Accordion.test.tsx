import { describe, test, expect } from "vitest";
import { render } from "../../test-setup";
import Accordion from "./Accordion";

import { configure, takeSnapshot } from "@chromatic-com/vitest";

configure({
  title: "PolarizedAccordion",
});

const items = [
  { title: "First", content: "First content" },
  { title: "Second", content: "Second content" },
];

describe("Accordion", () => {
  test("renders every item title", async () => {
    const screen = await render(<Accordion items={items} />);
    await expect
      .element(screen.getByRole("button", { name: /First/ }))
      .toBeVisible();
    await expect
      .element(screen.getByRole("button", { name: /Second/ }))
      .toBeVisible();
    await takeSnapshot("Accordion - Default props");
  });

  test("shows the first item content by default", async () => {
    const screen = await render(<Accordion items={items} />);
    await expect.element(screen.getByText("First content")).toBeVisible();
    await takeSnapshot("Accordion - First item content visible");
  });

  test("expands a collapsed item on trigger click", async () => {
    const screen = await render(<Accordion items={items} />);
    await screen.getByText("Second").click();
    await expect.element(screen.getByText("Second content")).toBeVisible();
    await takeSnapshot("Accordion - Second item content visible after click");
  });
});
