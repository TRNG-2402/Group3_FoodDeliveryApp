using FoodDeliveryApp.API.Data;
using FoodDeliveryApp.API.Models;
using Microsoft.AspNetCore.Mvc;

public class RestaurantService
{
    public readonly IRestaurantRepo _restaurantRepo;

    public RestaurantService(IRestaurantRepo restaurantRepo)
    {
        _restaurantRepo = restaurantRepo;
    }

    async public Task<List<Restaurant>> GetAllRestaurant() =>
        await _restaurantRepo.GetAllRestaurantAsync();

    async public Task<Restaurant?> GetRestaurantById(int id) =>
        await _restaurantRepo.GetRestaurantByIdAsync(id);

    async public Task<Restaurant> CreateRestaurant(Restaurant restaurant) =>
        await _restaurantRepo.CreateRestaurantAsync(restaurant);

    async public Task<Restaurant> UpdateRestaurant(Restaurant restaurant) =>
        await _restaurantRepo.UpdateRestaurantAsync(restaurant);

    async public Task<Restaurant> DeleteRestaurant(Restaurant restaurant) =>
     await _restaurantRepo.DeleteRestaurantAsync(restaurant);

}