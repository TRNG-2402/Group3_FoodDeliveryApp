import { apiService } from "../../services/apiService"

export const getAllOrders = async () => {
    try {
        // /api/MenuItem/restaurant/{restaurantId}
        
        const res = await apiService.get("order");
        return res;
    } catch (error) {
        return error;
    }   
}