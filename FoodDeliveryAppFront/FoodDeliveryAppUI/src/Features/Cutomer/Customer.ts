import type { IMenuItem } from "../../Interfaces/MenuItem";
import { apiService } from "../../services/apiService"

export const getAllMenuItems = async ():Promise<IMenuItem[]> => {
        return await apiService.get("menuitem");
}