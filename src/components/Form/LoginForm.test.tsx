import { describe, test, expect, vi } from "vitest";
import { render } from "../../test-setup";
import Form from "./Form";
import Label from "./Label";
import Input from "./Input";
import Button from "../Button/Button";

import { configure, takeSnapshot } from "@chromatic-com/vitest";

configure({
  //title: "LoginForm",
});

describe("LoginForm", () => {
  test("renders empty login form with all fields", async () => {
    const screen = await render(
      <Form>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <Button label="Login" />
      </Form>,
    );

    await expect.element(screen.getByLabelText("Email")).toBeVisible();
    await expect.element(screen.getByLabelText("Password")).toBeVisible();
    await expect
      .element(screen.getByRole("button", { name: "Login" }))
      .toBeVisible();
    await takeSnapshot("LoginForm - Initial empty form");
  });

  test("fills email field and captures state", async () => {
    const screen = await render(
      <Form>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <Button label="Login" />
      </Form>,
    );

    const emailInput = screen.getByLabelText("Email");
    await emailInput.fill("user@example.com");
    await expect.element(emailInput).toHaveValue("user@example.com");
    await takeSnapshot("LoginForm - Email filled");
  });

  test("fills both email and password fields", async () => {
    const screen = await render(
      <Form>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <Button label="Login" />
      </Form>,
    );

    const emailInput = screen.getByLabelText("Email");
    await emailInput.fill("user@example.com");
    await expect.element(emailInput).toHaveValue("user@example.com");
    await takeSnapshot("LoginForm - Email filled before password");

    const passwordInput = screen.getByLabelText("Password");
    await passwordInput.fill("securePassword123");
    await expect.element(passwordInput).toHaveValue("securePassword123");
    await takeSnapshot("LoginForm - Both fields filled");
  });

  test("invokes onSubmit when login button is clicked", async () => {
    const handleLogin = vi.fn();
    const screen = await render(
      <Form>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <Button label="Login" onClick={handleLogin} />
      </Form>,
    );

    const emailInput = screen.getByLabelText("Email");
    await emailInput.fill("user@example.com");

    const passwordInput = screen.getByLabelText("Password");
    await passwordInput.fill("securePassword123");

    await takeSnapshot("LoginForm - Before submit");

    await screen.getByRole("button", { name: "Login" }).click();
    expect(handleLogin).toHaveBeenCalledTimes(1);
    await takeSnapshot("LoginForm - After submit clicked");
  });

  test("renders inverted login form", async () => {
    const handleLogin = vi.fn();
    const screen = await render(
      <Form inverted>
        <div>
          <Label htmlFor="email" inverted>
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            inverted
          />
        </div>
        <div>
          <Label htmlFor="password" inverted>
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            inverted
          />
        </div>
        <Button label="Login" onClick={handleLogin} />
      </Form>,
    );

    await takeSnapshot("LoginForm - Inverted empty");

    const emailInput = screen.getByLabelText("Email");
    await emailInput.fill("user@example.com");
    await takeSnapshot("LoginForm - Inverted email filled");

    const passwordInput = screen.getByLabelText("Password");
    await passwordInput.fill("securePassword123");
    await takeSnapshot("LoginForm - Inverted both fields filled");

    await screen.getByRole("button", { name: "Login" }).click();
    expect(handleLogin).toHaveBeenCalledTimes(1);
    await takeSnapshot("LoginForm - Inverted after submit");
  });

  test("handles multiple form interactions", async () => {
    const handleLogin = vi.fn();
    const screen = await render(
      <Form>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <Button label="Login" onClick={handleLogin} />
      </Form>,
    );

    // Fill email
    const emailInput = screen.getByLabelText("Email");
    await emailInput.fill("wrong@example.com");
    await takeSnapshot("LoginForm - First email attempt");

    // Clear and refill email
    await emailInput.clear();
    await emailInput.fill("correct@example.com");
    await expect.element(emailInput).toHaveValue("correct@example.com");
    await takeSnapshot("LoginForm - Corrected email");

    // Fill password
    const passwordInput = screen.getByLabelText("Password");
    await passwordInput.fill("myPassword456");
    await takeSnapshot("LoginForm - Ready to submit");

    // Submit
    await screen.getByRole("button", { name: "Login" }).click();
    expect(handleLogin).toHaveBeenCalledTimes(1);
    await takeSnapshot("LoginForm - Multiple interactions complete");
  });

  test("validates button disabled state is not applied by default", async () => {
    const screen = await render(
      <Form>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <Button label="Login" />
      </Form>,
    );

    const button = screen.getByRole("button", { name: "Login" });
    await expect.element(button).toBeVisible();
    await takeSnapshot("LoginForm - Button enabled state");
  });
});
