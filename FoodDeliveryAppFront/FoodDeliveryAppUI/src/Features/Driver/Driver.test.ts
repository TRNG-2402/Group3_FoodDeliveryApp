import { describe, expect, it, vi, beforeEach } from "vitest";
import { apiService } from "../../services/apiService";
import {
  getAllMenuItems,
  getAllRestaurants,
  getMenuItemsByRestaurantId,
  getCustomerById,
  postOrder,
  getOrderByCustomerId,
  getAllOrders,
  getRestaurantById
} from "./Driver";

vi.mock("../../services/apiService", () => ({
  apiService: {
    get: vi.fn(),
    post: vi.fn()
  }
}));

describe("Driver API functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getAllMenuItems calls menuitem endpoint", async () => {
    const mockMenuItems = [
      {
        menuItemId: 1,
        name: "Burger",
        price: 9.99
      }
    ];

    vi.mocked(apiService.get).mockResolvedValueOnce(mockMenuItems);

    const result = await getAllMenuItems();

    expect(result).toEqual(mockMenuItems);
    expect(apiService.get).toHaveBeenCalledWith("menuitem");
  });

  it("getAllRestaurants calls restaurant endpoint", async () => {
    const mockRestaurants = [
      {
        restaurantId: 1,
        name: "Pizza Palace"
      }
    ];

    vi.mocked(apiService.get).mockResolvedValueOnce(mockRestaurants);

    const result = await getAllRestaurants();

    expect(result).toEqual(mockRestaurants);
    expect(apiService.get).toHaveBeenCalledWith("restaurant");
  });

  it("getMenuItemsByRestaurantId calls menuitem restaurant endpoint", async () => {
    const mockMenuItems = [
      {
        menuItemId: 1,
        restaurantId: 5,
        name: "Taco"
      }
    ];

    vi.mocked(apiService.get).mockResolvedValueOnce(mockMenuItems);

    const result = await getMenuItemsByRestaurantId(5);

    expect(result).toEqual(mockMenuItems);
    expect(apiService.get).toHaveBeenCalledWith("menuitem/restaurant/5");
  });

  it("getCustomerById calls user endpoint", async () => {
    const mockCustomer = {
      userId: 7,
      name: "Emma"
    };

    vi.mocked(apiService.get).mockResolvedValueOnce(mockCustomer);

    const result = await getCustomerById(7);

    expect(result).toEqual(mockCustomer);
    expect(apiService.get).toHaveBeenCalledWith("user/7");
  });

  it("postOrder calls order endpoint", async () => {
    const body = {
      customerId: 1,
      restaurantId: 2,
      items: [
        {
          menuItemId: 1,
          quantity: 2,
          unitPrice: 9.99
        }
      ]
    };

    const mockOrder = {
      orderId: 1,
      total: 19.98
    };

    vi.mocked(apiService.post).mockResolvedValueOnce(mockOrder);

    const result = await postOrder(body);

    expect(result).toEqual(mockOrder);
    expect(apiService.post).toHaveBeenCalledWith("order", body);
  });

  it("getOrderByCustomerId calls order customer endpoint", async () => {
    const mockOrders = [
      {
        orderId: 1,
        customerId: 3
      }
    ];

    vi.mocked(apiService.get).mockResolvedValueOnce(mockOrders);

    const result = await getOrderByCustomerId(3);

    expect(result).toEqual(mockOrders);
    expect(apiService.get).toHaveBeenCalledWith("order/customer/3");
  });

  it("getAllOrders calls order endpoint", async () => {
    const mockOrders = [
      {
        orderId: 1,
        status: "Pending"
      }
    ];

    vi.mocked(apiService.get).mockResolvedValueOnce(mockOrders);

    const result = await getAllOrders();

    expect(result).toEqual(mockOrders);
    expect(apiService.get).toHaveBeenCalledWith("order");
  });

  it("getRestaurantById calls restaurant id endpoint", async () => {
    const mockRestaurant = {
      restaurantId: 4,
      name: "Burger House"
    };

    vi.mocked(apiService.get).mockResolvedValueOnce(mockRestaurant);

    const result = await getRestaurantById(4);

    expect(result).toEqual(mockRestaurant);
    expect(apiService.get).toHaveBeenCalledWith("restaurant/4");
  });
});