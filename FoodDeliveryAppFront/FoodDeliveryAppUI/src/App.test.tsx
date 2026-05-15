import { describe, expect, it, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import App from "./App";

vi.mock("./Features/Auth/Login/Login", () => ({
  Login: () => <div>Login Page</div>
}));

vi.mock("./Features/Auth/SignUp/SignUp", () => ({
  SignUp: () => <div>Sign Up Page</div>
}));

vi.mock("./Features/Cutomer/Customer.view", () => ({
  Customer: () => <div>Customer Page</div>
}));

vi.mock("./Features/Driver/Driver.view", () => ({
  Driver: () => <div>Driver Page</div>
}));

describe("App routing", () => {
  it("renders login page at root route", () => {
    window.history.pushState({}, "", "/");

    render(<App />);

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("renders login page at /login", () => {
    window.history.pushState({}, "", "/login");

    render(<App />);

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("renders signup page at /signup", () => {
    window.history.pushState({}, "", "/signup");

    render(<App />);

    expect(screen.getByText("Sign Up Page")).toBeInTheDocument();
  });

  it("renders customer page at /customer", () => {
    window.history.pushState({}, "", "/customer");

    render(<App />);

    expect(screen.getByText("Customer Page")).toBeInTheDocument();
  });

  it("renders driver page at /driver", () => {
    window.history.pushState({}, "", "/driver");

    render(<App />);

    expect(screen.getByText("Driver Page")).toBeInTheDocument();
  });
});