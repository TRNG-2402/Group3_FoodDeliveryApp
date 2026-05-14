import { describe, expect, it, vi, beforeEach } from "vitest";
import { apiService } from "./apiService";
import { api } from "./api";

vi.mock("./api", () => ({
  api: {
    get: vi.fn(),
    post: vi.fn()
  }
}));

describe("apiService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("get returns response data", async () => {
    const mockData = [
      {
        restaurantId: 1,
        name: "Pizza Palace"
      }
    ];

    vi.mocked(api.get).mockResolvedValueOnce({
      data: mockData
    } as any);

    const result = await apiService.get<typeof mockData>("/restaurants");

    expect(result).toEqual(mockData);
    expect(api.get).toHaveBeenCalledWith("/restaurants");
  });

  it("post returns response data", async () => {
    const request = {
      email: "test@test.com",
      password: "Password123"
    };

    const response = {
      token: "fake-token"
    };

    vi.mocked(api.post).mockResolvedValueOnce({
      data: response
    } as any);

    const result = await apiService.post<typeof request, typeof response>(
      "/auth/login",
      request
    );

    expect(result).toEqual(response);
    expect(api.post).toHaveBeenCalledWith("/auth/login", request);
  });

  it("get throws when api.get rejects", async () => {
    vi.mocked(api.get).mockRejectedValueOnce(new Error("Network error"));

    await expect(apiService.get("/bad-endpoint")).rejects.toThrow("Network error");
  });

  it("post throws when api.post rejects", async () => {
    vi.mocked(api.post).mockRejectedValueOnce(new Error("Post failed"));

    await expect(
      apiService.post("/bad-endpoint", { test: true })
    ).rejects.toThrow("Post failed");
  });
});