import { describe, expect, it, vi, beforeEach } from "vitest";
import { apiService } from "../../services/apiService";
import { createMenuItem } from "./MenuItem";
import type { CreateMenuItemRequest } from "./MenuItem";

vi.mock("../../services/apiService", () => ({
  apiService: {
    post: vi.fn()
  }
}));

describe("MenuItem API functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("createMenuItem calls /menuitem endpoint with data", async () => {
    const request: CreateMenuItemRequest = {
      restaurantId: 1,
      name: "Burger",
      price: 9.99,
      description: "Cheeseburger with fries",
      imageURL: "burger.png"
    };

    const mockResponse = {
      menuItemId: 10,
      ...request
    };

    vi.mocked(apiService.post).mockResolvedValueOnce(mockResponse);

    const result = await createMenuItem(request);

    expect(result).toEqual(mockResponse);
    expect(apiService.post).toHaveBeenCalledWith("/menuitem", request);
  });

  it("createMenuItem throws when apiService.post rejects", async () => {
    const request: CreateMenuItemRequest = {
      restaurantId: 1,
      name: "Burger",
      price: 9.99,
      description: "Cheeseburger with fries",
      imageURL: "burger.png"
    };

    vi.mocked(apiService.post).mockRejectedValueOnce(new Error("Create failed"));

    await expect(createMenuItem(request)).rejects.toThrow("Create failed");
  });
});