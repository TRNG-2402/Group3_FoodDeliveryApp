import { describe, expect, it, vi, beforeEach } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Login } from "./Login";
import { api } from "../../../services/api";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate
}));

vi.mock("../../../services/api", () => ({
  api: {
    post: vi.fn(),
    get: vi.fn()
  }
}));

vi.mock("./Login.view", () => ({
  LoginView: ({
    handleLogin,
    email,
    setEmail,
    password,
    setPassword,
    error
  }: any) => (
    <div>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      {error && <p>{error}</p>}
    </div>
  )
}));

describe("Login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("shows error when email is invalid", async () => {
    const user = userEvent.setup();

    render(<Login />);

    await user.type(screen.getByPlaceholderText("Email"), "bademail");
    await user.type(screen.getByPlaceholderText("Password"), "Password123");
    await user.click(screen.getByText("Login"));

    expect(screen.getByText("Email is invalid")).toBeInTheDocument();
    expect(api.post).not.toHaveBeenCalled();
  });

  it("shows error when password is empty", async () => {
    const user = userEvent.setup();

    render(<Login />);

    await user.type(screen.getByPlaceholderText("Email"), "test@test.com");
    await user.click(screen.getByText("Login"));

    expect(screen.getByText("Password cannot be empty")).toBeInTheDocument();
    expect(api.post).not.toHaveBeenCalled();
  });

  it("logs in customer and navigates to customer page", async () => {
    const user = userEvent.setup();

    vi.mocked(api.post).mockResolvedValueOnce({
      data: {
        token: "fake-token"
      }
    } as any);

    vi.mocked(api.get).mockResolvedValueOnce({
      data: {
        userType: "Customer"
      }
    } as any);

    render(<Login />);

    await user.type(screen.getByPlaceholderText("Email"), "customer@test.com");
    await user.type(screen.getByPlaceholderText("Password"), "Password123");
    await user.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe("fake-token");
      expect(api.post).toHaveBeenCalledWith("auth/login", {
        email: "customer@test.com",
        password: "Password123"
      });
      expect(api.get).toHaveBeenCalledWith("user/email/customer@test.com");
      expect(mockNavigate).toHaveBeenCalledWith("/customer");
    });
  });

  it("logs in driver and navigates to driver page", async () => {
    const user = userEvent.setup();

    vi.mocked(api.post).mockResolvedValueOnce({
      data: {
        token: "driver-token"
      }
    } as any);

    vi.mocked(api.get).mockResolvedValueOnce({
      data: {
        userType: "Driver"
      }
    } as any);

    render(<Login />);

    await user.type(screen.getByPlaceholderText("Email"), "driver@test.com");
    await user.type(screen.getByPlaceholderText("Password"), "Password123");
    await user.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe("driver-token");
      expect(mockNavigate).toHaveBeenCalledWith("/driver");
    });
  });

  it("shows api error message when login fails with response data", async () => {
    const user = userEvent.setup();

    vi.mocked(api.post).mockRejectedValueOnce({
      response: {
        data: "Invalid login"
      }
    });

    render(<Login />);

    await user.type(screen.getByPlaceholderText("Email"), "test@test.com");
    await user.type(screen.getByPlaceholderText("Password"), "WrongPassword");
    await user.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(screen.getByText("Invalid login")).toBeInTheDocument();
    });
  });

  it("shows default error message when login fails without response data", async () => {
    const user = userEvent.setup();

    vi.mocked(api.post).mockRejectedValueOnce(new Error("Network error"));

    render(<Login />);

    await user.type(screen.getByPlaceholderText("Email"), "test@test.com");
    await user.type(screen.getByPlaceholderText("Password"), "WrongPassword");
    await user.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(screen.getByText("Invalid email or password")).toBeInTheDocument();
    });
  });
});