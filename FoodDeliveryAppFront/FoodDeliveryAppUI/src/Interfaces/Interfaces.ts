export interface IOrderItem {
    orderItemId: number;
    orderId: number;
    menuItemId: number;
    unitPrice: number;
    quantity: number;
}

export interface IOrder {
    orderId: number;
    customerId: number;
    driverId: number;
    restaurantId: number;
    orderDate: Date | string;
    status: string;
    total: number;
    orderItems: IOrderItem[];
}
