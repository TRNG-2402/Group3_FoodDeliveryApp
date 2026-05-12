using FoodDeliveryApp.API.Data;
using FoodDeliveryApp.API.Models;

namespace FoodDeliveryApp.API.Services;

public interface IMenuItemService
{
    public Task<MenuItem?> GetMenuItemById(int id);
    public Task<List<MenuItem>> GetMenuItemsByRestaurantId(int id);
    public Task<MenuItem> CreateMenuItem(MenuItem menuItem);
    public Task<MenuItem> UpdateMenuItem(MenuItem menuItem);
    public Task<MenuItem> DeleteMenuItem(MenuItem menuItem);
}

public class MenuItemService : IMenuItemService
{
    private readonly IMenuItemRepo _menuItemRepo;

    public MenuItemService(IMenuItemRepo menuItemRepo)
    {
        _menuItemRepo = menuItemRepo;
    }

    async public Task<MenuItem?> GetMenuItemById(int id) =>
        await _menuItemRepo.GetMenuItemByIdAsync(id);

    async public Task<List<MenuItem>> GetMenuItemsByRestaurantId(int id) =>
        await _menuItemRepo.GetMenuItemsByRestaurantIdAsync(id);

    async public Task<MenuItem> CreateMenuItem(MenuItem menuItem) =>
        await _menuItemRepo.CreateMenuItemAsync(menuItem);

    async public Task<MenuItem> UpdateMenuItem(MenuItem menuItem) =>
        await _menuItemRepo.UpdateMenuItemAsync(menuItem);

    async public Task<MenuItem> DeleteMenuItem(MenuItem menuItem) =>
        await _menuItemRepo.DeleteMenuItemAsync(menuItem);
}