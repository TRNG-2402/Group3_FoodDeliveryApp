export interface IMenuItem {
    menuItemId: number;
    name: string;
    description?: string;
    price: number;
    imageURL?: string;
    quantity?: number;
    restaurantId?: number;
}