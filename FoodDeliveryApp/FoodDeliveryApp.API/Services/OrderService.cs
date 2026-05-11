using FoodDeliveryApp.API.Data;
using FoodDeliveryApp.API.Models;

public interface IOrderService
{
    public Task<List<Order>> GetAllOrders();
    public Task<Order> CreateOrder(Order order);
    public Task<Order> UpdateOrder(Order order);
    public Task<Order> DeleteOrder(Order order);
    public Task<Order?> GetOrderById(int id);
}

public class OrderService : IOrderService
{
    private readonly IOrderRepo _orderRepo;

    public OrderService(IOrderRepo orderRepo)
    {
        _orderRepo = orderRepo;
    }

    async public Task<List<Order>> GetAllOrders() =>
        await _orderRepo.GetAllOrdersAsync();

    async public Task<Order> CreateOrder(Order order) =>
        await _orderRepo.CreateOrderAsync(order);

    async public Task<Order> UpdateOrder(Order order) =>
        await _orderRepo.UpdateOrderAsync(order);

    async public Task<Order> DeleteOrder(Order order) =>
        await _orderRepo.DeleteOrderAsync(order);

    async public Task<Order?> GetOrderById(int id) =>
        await _orderRepo.GetOrderByIdAsync(id);
}