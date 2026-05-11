using FoodDeliveryApp.API.Data;

public class DriverService : IDriverService
{
    private readonly AppDbContext _context;
    private readonly IMatchingService _matchingService;

    public DriverService(
        AppDbContext context,
        IMatchingService matchingService)
    {
        _context = context;
        _matchingService = matchingService;
    }

    public async Task JoinQueueAsync(int driverId)
    {
        var driver = await _context.Drivers.FindAsync(driverId);

        if (driver == null)
            throw new Exception("Driver not found");

        await _matchingService.MatchAsync();
    }
}