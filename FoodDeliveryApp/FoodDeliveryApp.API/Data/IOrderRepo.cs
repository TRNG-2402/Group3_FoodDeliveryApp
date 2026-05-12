using System.ComponentModel;
using FoodDeliveryApp.API.Models;

namespace FoodDeliveryApp.API.Data;

public interface IOrderRepo
{
    Task<List<Order>> GetAllOrdersAsync();
    Task<Order?> GetOrderByIdAsync(int id);
    Task<List<Order>> GetOrdersByCustomerIdAsync(int customerId);
    Task<List<Order>> GetOrdersByDriverIdAsync(int driverId);
    Task<Order> CreateOrderAsync(Order order);
    Task<Order> UpdateOrderAsync(Order order);
    Task<Order> DeleteOrderAsync(Order order);
}