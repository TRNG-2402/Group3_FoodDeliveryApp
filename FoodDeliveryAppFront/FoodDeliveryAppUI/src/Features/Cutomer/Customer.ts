import { useNavigate } from "react-router-dom";
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

export const getCustomer = async (id: number): Promise<IMenuItem[]> => {
        return await apiService.get(`user/${id}`);
}

export const postOrder = async (body: any) => {
        return await apiService.post("order", body);
} 