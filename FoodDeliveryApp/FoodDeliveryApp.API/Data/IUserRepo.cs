using FoodDeliveryApp.API.Models;

namespace FoodDeliveryApp.API.Data;

public interface IUserRepo
{
    Task<User?> GetByEmailAsync(string email);
}