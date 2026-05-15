import { describe, expect, it } from "vitest";
import { screen, render } from "@testing-library/react";
import { SidebarItem } from "./SidebarItem";

describe("SidebarItem", () => {
  it("renders sidebar item text", () => {
    render(
      <SidebarItem
        icon={<span data-testid="test-icon">icon</span>}
        text="Orders"
      />
    );

    expect(screen.getByText("Orders")).toBeInTheDocument();
  });

  it("renders sidebar item icon", () => {
    render(
      <SidebarItem
        icon={<span data-testid="test-icon">icon</span>}
        text="Dashboard"
      />
    );

    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("renders wrapper classes", () => {
    const { container } = render(
      <SidebarItem
        icon={<span data-testid="test-icon">icon</span>}
        text="Profile"
      />
    );

    expect(container.querySelector(".sidebarItem")).toBeInTheDocument();
    expect(container.querySelector(".sidebarItemIcon")).toBeInTheDocument();
    expect(container.querySelector(".sidebarItemText")).toBeInTheDocument();
  });
});