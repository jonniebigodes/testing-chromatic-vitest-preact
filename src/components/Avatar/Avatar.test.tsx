import { describe, test, expect } from "vitest";
import { render } from "../../test-setup";
import { Avatar } from "./Avatar";
import { configure, takeSnapshot } from "@chromatic-com/vitest";

configure({
  //title: "PolarizedAvatar",
});
describe("Avatar", () => {
  test("renders the fallback initials", async () => {
    const screen = await render(<Avatar alt="John Doe" fallback="JD" />);
    await expect.element(screen.getByText("JD")).toBeVisible();
    await takeSnapshot("Avatar - Default props");
  });

  test("applies a circular root shape", async () => {
    const screen = await render(
      <Avatar alt="John Doe" fallback="JD" ids={{ root: "avatar-root" }} />,
    );
    const root = screen.getByText("JD").element().parentElement!;
    expect(root).toHaveStyle({ borderRadius: "50%" });
    await takeSnapshot("Avatar - Circular shape");
  });
});
