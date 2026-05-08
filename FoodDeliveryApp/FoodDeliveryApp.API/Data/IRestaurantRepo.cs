using FoodDeliveryApp.API.Models;

namespace FoodDeliveryApp.API.Data;

public interface IRestaurantRepo
{
    Task<List<Restaurant>> GetAllRestaurantAsync();
    Task<Restaurant?> GetRestaurantByIdAsync(int id);
    Task<Restaurant> CreateRestaurantAsync(Restaurant restaurant);
    Task<Restaurant> DeleteRestaurantAsync(Restaurant restaurant);
    Task<Restaurant> UpdateRestaurantAsync(Restaurant restaurant);

}