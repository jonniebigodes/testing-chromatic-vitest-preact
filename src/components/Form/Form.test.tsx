import { describe, test, expect } from "vitest";
import { render } from "../../test-setup";
import Form from "./Form";
import Label from "./Label";
import Input from "./Input";

import { configure, takeSnapshot } from "@chromatic-com/vitest";

configure({
  title: "PolarizedForm",
});
describe("Form", () => {
  test("renders its field children", async () => {
    const screen = await render(
      <Form>
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" type="text" placeholder="John Doe" />
        </div>
      </Form>,
    );
    await expect.element(screen.getByLabelText("Full Name")).toBeVisible();
    await takeSnapshot("Form - Default props");
  });

  test("accepts typed input (default scenario)", async () => {
    const screen = await render(
      <Form>
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" type="text" placeholder="John Doe" />
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" placeholder="john@example.com" />
        </div>
      </Form>,
    );

    const name = screen.getByLabelText("Full Name");
    await name.fill("John Doe");
    await expect.element(name).toHaveValue("John Doe");

    const email = screen.getByLabelText("Email Address");
    await email.fill("john@example.com");
    await expect.element(email).toHaveValue("john@example.com");
    await takeSnapshot("Form - Default scenario");
  });

  test("renders correctly in the inverted scenario", async () => {
    const screen = await render(
      <Form inverted>
        <div>
          <Label htmlFor="user" inverted>
            Username
          </Label>
          <Input id="user" type="text" placeholder="username" inverted />
        </div>
      </Form>,
    );
    const user = screen.getByLabelText("Username");
    await user.fill("alice");
    await expect.element(user).toHaveValue("alice");
    await takeSnapshot("Form - Inverted scenario");
  });

  test("applies a custom gap", async () => {
    const screen = await render(
      <Form gap="24px" aria-label="spaced">
        <Input id="x" type="text" placeholder="x" />
      </Form>,
    );
    await expect
      .element(screen.getByRole("form", { name: "spaced" }))
      .toHaveStyle({ gap: "24px" });
    await takeSnapshot("Form - Custom gap");
  });
});
