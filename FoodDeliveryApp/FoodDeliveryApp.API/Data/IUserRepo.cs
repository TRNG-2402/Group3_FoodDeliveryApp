using FoodDeliveryApp.API.Models;

namespace FoodDeliveryApp.API.Data;

public interface IUserRepo
{
    Task<User?> GetByEmailAsync(string email);
    Task<User?> GetUserByIdAsync(int id);
    Task<User> CreateUserAsync(User user);
}