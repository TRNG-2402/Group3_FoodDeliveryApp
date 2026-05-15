using FoodDeliveryApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodDeliveryApp.API.Data;

public class MenuItemRepo : IMenuItemRepo
{
    private readonly AppDbContext _context;

    public MenuItemRepo(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<MenuItem>> GetAllMenuItemsAsync()
    {
        return await _context.MenuItems.Select(m => m).ToListAsync();
    }

    public async Task<MenuItem?> GetMenuItemByIdAsync(int menuItemId)
    {
        return await _context.MenuItems.FindAsync(menuItemId);
    }
    public async Task<List<MenuItem>> GetMenuItemsByRestaurantIdAsync(int restaurantId)
    {
        return await _context.MenuItems.Where(m => m.RestaurantId == restaurantId).ToListAsync();
    }

    public async Task<MenuItem> CreateMenuItemAsync(MenuItem menuItem)
    {
        _context.MenuItems.Add(menuItem);
        await _context.SaveChangesAsync();
        return menuItem;
    }
    public async Task<MenuItem> UpdateMenuItemAsync(MenuItem menuItem)
    {
        _context.Update(menuItem);
        await _context.SaveChangesAsync();
        return menuItem;
    }
    public async Task<MenuItem> DeleteMenuItemAsync(MenuItem menuItem)
    {
        _context.MenuItems.Remove(menuItem);
        await _context.SaveChangesAsync();
        return menuItem;
    }
}