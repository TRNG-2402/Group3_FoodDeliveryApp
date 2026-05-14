import { describe, expect, it, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

describe("Input", () => {
  it("renders input with placeholder", () => {
    render(
      <Input
        type="text"
        placeholder="Enter name"
        value=""
        onChange={vi.fn()}
      />
    );

    expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument();
  });

  it("renders input with correct type", () => {
    render(
      <Input
        type="password"
        placeholder="Enter password"
        value=""
        onChange={vi.fn()}
      />
    );

    const input = screen.getByPlaceholderText("Enter password");

    expect(input).toHaveAttribute("type", "password");
  });

  it("calls onChange when typing", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Input
        type="text"
        placeholder="Enter email"
        value=""
        onChange={handleChange}
      />
    );

    await user.type(screen.getByPlaceholderText("Enter email"), "test@test.com");

    expect(handleChange).toHaveBeenCalled();
  });

  it("renders icon when provided", () => {
    render(
      <Input
        type="text"
        placeholder="Search"
        value=""
        onChange={vi.fn()}
        icon={<span data-testid="test-icon">icon</span>}
      />
    );

    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("does not render icon when not provided", () => {
    render(
      <Input
        type="text"
        placeholder="No icon"
        value=""
        onChange={vi.fn()}
      />
    );

    expect(screen.queryByTestId("test-icon")).not.toBeInTheDocument();
  });
});