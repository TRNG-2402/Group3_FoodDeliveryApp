import { describe, expect, it, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  it("renders children text", () => {
    render(
      <Button onClick={vi.fn()}>
        Submit
      </Button>
    );

    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button onClick={handleClick}>
        Click Me
      </Button>
    );

    await user.click(screen.getByText("Click Me"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies className and customStyle", () => {
    render(
      <Button
        onClick={vi.fn()}
        className="primary-button"
        customStyle={{ backgroundColor: "red" }}
      >
        Styled Button
      </Button>
    );

    const button = screen.getByRole("button", { name: "Styled Button" });

    expect(button).toHaveClass("primary-button");
    expect(button).toHaveStyle("background-color: rgb(255, 0, 0)");
  });

  it("scales button on mouse down and resets on mouse up", async () => {
    const user = userEvent.setup();

    render(
      <Button onClick={vi.fn()}>
        Animated Button
      </Button>
    );

    const button = screen.getByRole("button", { name: "Animated Button" });

    await user.pointer({ keys: "[MouseLeft>]", target: button });
    expect(button).toHaveStyle({ transform: "scale(0.98)" });

    await user.pointer({ keys: "[/MouseLeft]", target: button });
    expect(button).toHaveStyle({ transform: "scale(1)" });
  });
});