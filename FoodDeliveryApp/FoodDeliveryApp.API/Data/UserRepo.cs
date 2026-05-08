using FoodDeliveryApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodDeliveryApp.API.Data;

public class UserRepo : IUserRepo
{
    private readonly AppDbContext _context;

    public UserRepo(AppDbContext context)
    {
        _context = context;
    }

    public async Task<User> GetByEmailAsync(string email)
    {
        return await _context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Email == email);
    }
}
