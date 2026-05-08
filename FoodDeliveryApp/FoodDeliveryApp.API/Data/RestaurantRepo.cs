using FoodDeliveryApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodDeliveryApp.API.Data;

public class RestaurantRepo : IRestaurantRepo
{
    private readonly AppDbContext _context;

    public RestaurantRepo(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Restaurant>> GetAllRestaurantAsync()
    {
        return await _context.Restaurants.ToListAsync();
    }
    public async Task<Restaurant?> GetRestaurantByIdAsync(int id)
    {
        return await _context.Restaurants.FindAsync(id);
    }
    public async Task<Restaurant> CreateRestaurantAsync(Restaurant restaurant)
    {
        _context.Restaurants.Add(restaurant);
        await _context.SaveChangesAsync();
        return restaurant;
    }
    public async Task<Restaurant> UpdateRestaurantAsync(Restaurant restaurant)
    {
        _context.Update(restaurant);
        await _context.SaveChangesAsync();
        return restaurant;
    }
    public async Task<Restaurant> DeleteRestaurantAsync(Restaurant restaurant)
    {
        _context.Restaurants.Remove(restaurant);
        await _context.SaveChangesAsync();
        return restaurant;
    }
}