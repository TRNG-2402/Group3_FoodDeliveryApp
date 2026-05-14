import { describe, expect, it } from "vitest";
import { screen, render } from "@testing-library/react";
import { Sidebar } from "./Sidebar";

describe("Sidebar", () => {
  it("renders the app logo text", () => {
    render(<Sidebar />);

    expect(screen.getByText("Turbo Feast")).toBeInTheDocument();
  });

  it("renders all sidebar menu items", () => {
    render(<Sidebar />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Restaurants")).toBeInTheDocument();
    expect(screen.getByText("Orders")).toBeInTheDocument();
    expect(screen.getByText("Delivery")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders the sidebar container", () => {
    const { container } = render(<Sidebar />);

    const sidebar = container.querySelector(".sidebar");

    expect(sidebar).toBeInTheDocument();
  });

  it("renders the sidebar menu container", () => {
    const { container } = render(<Sidebar />);

    const sidebarMenu = container.querySelector(".sidebarMenu");

    expect(sidebarMenu).toBeInTheDocument();
  });
});