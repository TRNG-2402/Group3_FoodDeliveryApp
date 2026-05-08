using FoodDeliveryApp.API.Models;

namespace FoodDeliveryApp.API.Data;

public interface IMenuItemRepo
{
    Task<MenuItem?> GetMenuItemByIdAsync(int menuItemId);
    Task<List<MenuItem>> GetMenuItemsByRestaurantIdAsync(int restaurantId);
    Task<MenuItem> CreateMenuItemAsync(MenuItem menuItem);
    Task<MenuItem> UpdateMenuItemAsync(MenuItem menuItem);
    Task<MenuItem> DeleteMenuItemAsync(MenuItem menuItem);
}