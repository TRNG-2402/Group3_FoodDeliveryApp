import { describe, expect, it, vi, beforeEach } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignUp } from "./SignUp";
import { api } from "../../../services/api";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate
}));

vi.mock("../../../services/api", () => ({
  api: {
    post: vi.fn()
  }
}));

vi.mock("./SignUp.view", () => ({
  SignUpView: ({
    handleSignUp,
    userInfo,
    setUserInfo,
    error
  }: any) => (
    <div>
      <input
        placeholder="Name"
        value={userInfo.name}
        onChange={(e) =>
          setUserInfo({
            ...userInfo,
            name: e.target.value
          })
        }
      />

      <input
        placeholder="Email"
        value={userInfo.email}
        onChange={(e) =>
          setUserInfo({
            ...userInfo,
            email: e.target.value
          })
        }
      />

      <input
        placeholder="Phone"
        value={userInfo.phone}
        onChange={(e) =>
          setUserInfo({
            ...userInfo,
            phone: e.target.value
          })
        }
      />

      <input
        placeholder="Password"
        value={userInfo.password}
        onChange={(e) =>
          setUserInfo({
            ...userInfo,
            password: e.target.value
          })
        }
      />

      <input
        placeholder="Address"
        value={userInfo.address || ""}
        onChange={(e) =>
          setUserInfo({
            ...userInfo,
            address: e.target.value
          })
        }
      />

      <input
        placeholder="Vehicle"
        value={userInfo.vehicleType || ""}
        onChange={(e) =>
          setUserInfo({
            ...userInfo,
            vehicleType: e.target.value
          })
        }
      />

      <select
        aria-label="User Type"
        value={userInfo.userType}
        onChange={(e) =>
          setUserInfo({
            ...userInfo,
            userType: e.target.value
          })
        }
      >
        <option value="customer">customer</option>
        <option value="driver">driver</option>
      </select>

      <button onClick={handleSignUp}>Sign Up</button>

      {error && <p>{error}</p>}
    </div>
  )
}));

describe("SignUp", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("shows error when name is empty", async () => {
    const user = userEvent.setup();

    render(<SignUp />);

    await user.click(screen.getByText("Sign Up"));

    expect(screen.getByText("Name cannot be empty")).toBeInTheDocument();
    expect(api.post).not.toHaveBeenCalled();
  });

  it("shows error when email is invalid", async () => {
    const user = userEvent.setup();

    render(<SignUp />);

    await user.type(screen.getByPlaceholderText("Name"), "Emma");
    await user.type(screen.getByPlaceholderText("Email"), "bademail");
    await user.click(screen.getByText("Sign Up"));

    expect(screen.getByText("Email is invalid")).toBeInTheDocument();
    expect(api.post).not.toHaveBeenCalled();
  });

  it("shows error when phone is empty", async () => {
    const user = userEvent.setup();

    render(<SignUp />);

    await user.type(screen.getByPlaceholderText("Name"), "Emma");
    await user.type(screen.getByPlaceholderText("Email"), "emma@test.com");
    await user.click(screen.getByText("Sign Up"));

    expect(screen.getByText("Phone cannot be empty")).toBeInTheDocument();
    expect(api.post).not.toHaveBeenCalled();
  });

  it("shows error when password is empty", async () => {
    const user = userEvent.setup();

    render(<SignUp />);

    await user.type(screen.getByPlaceholderText("Name"), "Emma");
    await user.type(screen.getByPlaceholderText("Email"), "emma@test.com");
    await user.type(screen.getByPlaceholderText("Phone"), "5551234567");
    await user.click(screen.getByText("Sign Up"));

    expect(screen.getByText("Password cannot be empty")).toBeInTheDocument();
    expect(api.post).not.toHaveBeenCalled();
  });

  it("shows error when customer address is empty", async () => {
    const user = userEvent.setup();

    render(<SignUp />);

    await user.type(screen.getByPlaceholderText("Name"), "Emma");
    await user.type(screen.getByPlaceholderText("Email"), "emma@test.com");
    await user.type(screen.getByPlaceholderText("Phone"), "5551234567");
    await user.type(screen.getByPlaceholderText("Password"), "Password123");
    await user.click(screen.getByText("Sign Up"));

    expect(screen.getByText("Address cannot be empty")).toBeInTheDocument();
    expect(api.post).not.toHaveBeenCalled();
  });

  it("shows error when driver vehicle is empty", async () => {
    const user = userEvent.setup();

    render(<SignUp />);

    await user.selectOptions(screen.getByLabelText("User Type"), "driver");
    await user.type(screen.getByPlaceholderText("Name"), "Alex");
    await user.type(screen.getByPlaceholderText("Email"), "alex@test.com");
    await user.type(screen.getByPlaceholderText("Phone"), "5551234567");
    await user.type(screen.getByPlaceholderText("Password"), "Password123");
    await user.click(screen.getByText("Sign Up"));

    expect(screen.getByText("Vehicle cannot be empty")).toBeInTheDocument();
    expect(api.post).not.toHaveBeenCalled();
  });

  it("registers customer and navigates to customer page", async () => {
    const user = userEvent.setup();

    vi.mocked(api.post).mockResolvedValueOnce({
      data: {
        token: "customer-token"
      }
    } as any);

    render(<SignUp />);

    await user.type(screen.getByPlaceholderText("Name"), "Emma");
    await user.type(screen.getByPlaceholderText("Email"), "emma@test.com");
    await user.type(screen.getByPlaceholderText("Phone"), "5551234567");
    await user.type(screen.getByPlaceholderText("Password"), "Password123");
    await user.type(screen.getByPlaceholderText("Address"), "123 Main St");
    await user.click(screen.getByText("Sign Up"));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith("auth/register", {
        name: "Emma",
        email: "emma@test.com",
        phone: "5551234567",
        password: "Password123",
        userType: "customer",
        address: "123 Main St",
        vehicleType: undefined
      });

      expect(localStorage.getItem("token")).toBe("customer-token");
      expect(mockNavigate).toHaveBeenCalledWith("/customer");
    });
  });

  it("registers driver and navigates to driver page", async () => {
    const user = userEvent.setup();

    vi.mocked(api.post).mockResolvedValueOnce({
      data: {
        token: "driver-token"
      }
    } as any);

    render(<SignUp />);

    await user.selectOptions(screen.getByLabelText("User Type"), "driver");
    await user.type(screen.getByPlaceholderText("Name"), "Alex");
    await user.type(screen.getByPlaceholderText("Email"), "alex@test.com");
    await user.type(screen.getByPlaceholderText("Phone"), "5551234567");
    await user.type(screen.getByPlaceholderText("Password"), "Password123");
    await user.type(screen.getByPlaceholderText("Vehicle"), "Car");
    await user.click(screen.getByText("Sign Up"));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith("auth/register", {
        name: "Alex",
        email: "alex@test.com",
        phone: "5551234567",
        password: "Password123",
        userType: "driver",
        address: "",
        vehicleType: "Car"
      });

      expect(localStorage.getItem("token")).toBe("driver-token");
      expect(mockNavigate).toHaveBeenCalledWith("/driver");
    });
  });

  it("shows api error when register fails", async () => {
    const user = userEvent.setup();

    vi.mocked(api.post).mockRejectedValueOnce({
      response: {
        data: "Email already exists"
      }
    });

    render(<SignUp />);

    await user.type(screen.getByPlaceholderText("Name"), "Emma");
    await user.type(screen.getByPlaceholderText("Email"), "emma@test.com");
    await user.type(screen.getByPlaceholderText("Phone"), "5551234567");
    await user.type(screen.getByPlaceholderText("Password"), "Password123");
    await user.type(screen.getByPlaceholderText("Address"), "123 Main St");
    await user.click(screen.getByText("Sign Up"));

    await waitFor(() => {
      expect(screen.getByText("Email already exists")).toBeInTheDocument();
    });
  });
});