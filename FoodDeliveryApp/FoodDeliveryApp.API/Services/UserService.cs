using FoodDeliveryApp.API.Data;
using FoodDeliveryApp.API.Models;

namespace FoodDeliveryApp.API.Services;

public interface IUserService
{
    public Task<User?> GetUserByEmail(string email);
    public Task<User?> GetUserById(int id);
    public Task<User> CreateUser(User user);
}

public class UserService : IUserService
{
    private readonly IUserRepo _userRepo;

    public UserService(IUserRepo userRepo)
    {
        _userRepo = userRepo;
    }

    async public Task<User?> GetUserByEmail(string email) =>
        await _userRepo.GetByEmailAsync(email);

    async public Task<User?> GetUserById(int id) =>
        await _userRepo.GetUserByIdAsync(id);

    async public Task<User> CreateUser(User user) =>
        await _userRepo.CreateUserAsync(user);
}