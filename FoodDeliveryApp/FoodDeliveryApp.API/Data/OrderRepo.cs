using FoodDeliveryApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodDeliveryApp.API.Data;

public class OrderRepo : IOrderRepo
{
    private readonly AppDbContext _context;

    public OrderRepo(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Order>> GetAllOrdersAsync()
    {
        List<Order> result = await _context.Orders.ToListAsync();
        return result;
    }

    public async Task<Order> CreateOrderAsync(Order order)
    {
        _context.Orders.Add(order);
        await _context.SaveChangesAsync();
        return order;
    }
    public async Task<Order> UpdateOrderAsync(Order order)
    {
        _context.Update(order);
        await _context.SaveChangesAsync();
        return order;
    }
    public async Task<Order> DeleteOrderAsync(Order order)
    {
        _context.Orders.Remove(order);
        await _context.SaveChangesAsync();
        return order;
    }
    public async Task<Order?> GetOrderByIdAsync(int id)
    {
        return await _context.Orders.FindAsync(id);
    }
}