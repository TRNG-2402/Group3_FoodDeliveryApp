import type { IMenuItem } from "../../Interfaces/MenuItem";
import { apiService } from "../../services/apiService"

export const getAllMenuItems = async (): Promise<IMenuItem[]> => {
    return await apiService.get("menuitem");
}

export const getAllRestaurants = async (): Promise<IMenuItem[]> => {
    return await apiService.get("restaurant");
}

export const getMenuItemsByRestaurantId = async (id: number): Promise<IMenuItem[]> => {
    return await apiService.get(`menuitem/restaurant/${id}`);
}

export const getCustomerById = async (id: number): Promise<IMenuItem[]> => {
    return await apiService.get(`user/${id}`);
}

export const postOrder = async (body: any) => {
    return await apiService.post("order", body);
}

export const getOrderByCustomerId = async (id: number) => {
    return await apiService.get(`order/customer/${id}`);
}

export const getOrderByDriverId = async (id: number) => {
    return await apiService.get(`order/driver/${id}`);
}

export const getAllOrders = async () => {
    return await apiService.get(`order`);
}

export const getRestaurantById = async (id: number) => {
    return await apiService.get(`restaurant/${id}`);
}

export const updateOrder = async (orderId: number, body: any) => {
    return await apiService.put(`order/${orderId}`, body);
}