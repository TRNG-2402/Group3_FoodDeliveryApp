import { apiService } from "../../services/apiService";

export interface CreateMenuItemRequest {
    restaurantId: number;
    name: string;
    price: number;
    description: string;
    imageURL: string;
}

export const createMenuItem = (data: CreateMenuItemRequest) =>
    apiService.post<CreateMenuItemRequest, unknown>("/menuitem", data);
