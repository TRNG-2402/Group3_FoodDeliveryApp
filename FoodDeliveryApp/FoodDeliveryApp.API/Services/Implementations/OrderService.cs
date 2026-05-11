using FoodDeliveryApp.API.Data;
using FoodDeliveryApp.API.Models;
using Microsoft.EntityFrameworkCore;
namespace FoodDeliveryApp.API.Services.Implementations;
namespace FoodDeliveryApp.API.Services.Interfaces;
public class OrderService : IOrderService
{
    private readonly AppDbContext _context;
    private readonly IMatchingService _matchingService;

    public OrderService(
        AppDbContext context,
        IMatchingService matchingService)
    {
        _context = context;
        _matchingService = matchingService;
    }

    public async Task<Order> CreateOrderAsync(Order order)
    {
        decimal total = 0;

        foreach (var item in order.Items)
        {
            var menuItem = await _context.MenuItems
                .FindAsync(item.MenuItemId);

            if (menuItem == null)
                throw new Exception("Menu item not found");

            total += menuItem.Price * item.Quantity;
        }

        order.TotalPrice = total;
        order.Status = "pending";

        _context.Orders.Add(order);

        await _context.SaveChangesAsync();

        await _matchingService.MatchAsync();

        return order;
    }

    public async Task<Order> CompleteOrderAsync(int orderId)
    {
        var order = await _context.Orders
            .FirstOrDefaultAsync(o => o.Id == orderId);

        if (order == null)
            throw new Exception("Order not found");

        order.Status = "delivered";

        await _context.SaveChangesAsync();

        return order;
    }

    public async Task<List<Order>> GetOrdersAsync()
    {
        return await _context.Orders.ToListAsync();
    }
}