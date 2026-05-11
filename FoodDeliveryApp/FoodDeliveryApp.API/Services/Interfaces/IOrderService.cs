using FoodDeliveryApp.API.Models;

public interface IOrderService
{
    Task<Order> CreateOrderAsync(Order order);

    Task<Order> CompleteOrderAsync(int orderId);

    Task<List<Order>> GetOrdersAsync();
}