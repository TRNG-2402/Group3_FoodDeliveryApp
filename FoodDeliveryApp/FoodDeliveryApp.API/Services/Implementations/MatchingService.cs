using FoodDeliveryApp.API.Data;
using Microsoft.EntityFrameworkCore;

public class MatchingService : IMatchingService
{
    private readonly AppDbContext _context;

    public MatchingService(AppDbContext context)
    {
        _context = context;
    }

    public async Task MatchAsync()
    {
        var order = await _context.Orders
            .Where(o => o.Status == "pending")
            .OrderBy(o => o.CreatedAt)
            .FirstOrDefaultAsync();

        var driver = await _context.Drivers
            .OrderBy(d => d.Id)
            .FirstOrDefaultAsync();

        if (order == null || driver == null)
            return;

        order.Status = "assigned";

        await _context.SaveChangesAsync();
    }
}