import { apiService } from "../../services/apiService";
import type { IMenuItem } from "../../Interfaces/MenuItem";

export interface CreateMenuItemRequest {
    restaurantId: number;
    name: string;
    price: number;
    description: string;
    imageURL: string;
}

export interface UpdateMenuItemRequest {
    name: string;
    price: number;
    description: string;
    imageURL: string;
}

export const createMenuItem = (data: CreateMenuItemRequest) =>
    apiService.post<CreateMenuItemRequest, IMenuItem>("/menuitem", data);

export const getMenuItemsByRestaurant = (restaurantId: number) =>
    apiService.get<IMenuItem[]>(`/menuitem/restaurant/${restaurantId}`);

export const updateMenuItem = (id: number, data: UpdateMenuItemRequest) =>
    apiService.put<UpdateMenuItemRequest, IMenuItem>(`/menuitem/${id}`, data);

export const deleteMenuItem = (id: number) =>
    apiService.delete<IMenuItem>(`/menuitem/${id}`);