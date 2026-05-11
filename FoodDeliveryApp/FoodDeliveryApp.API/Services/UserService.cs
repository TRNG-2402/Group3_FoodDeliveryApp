using FoodDeliveryApp.API.Data;
using FoodDeliveryApp.API.Models;

namespace FoodDeliveryApp.API.Services;

public interface IUserService
{
    public Task<User> GetUserByEmail(string email);    
}

public class UserService : IUserService
{
    private readonly IUserRepo _userRepo;

    public UserService(IUserRepo userRepo)
    {
        _userRepo = userRepo;
    }

    async public Task<User> GetUserByEmail(string email)
    {
        // Might need to check if customer exist first
        User user = await _userRepo.GetByEmailAsync(email);
        return user;
    }
}