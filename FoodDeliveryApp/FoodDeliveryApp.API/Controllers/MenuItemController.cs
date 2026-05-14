using FoodDeliveryApp.API.DTOs;
using FoodDeliveryApp.API.Models;
using FoodDeliveryApp.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace FoodDeliveryApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MenuItemController : ControllerBase
{
    private readonly IMenuItemService _menuItemService;

    public MenuItemController(IMenuItemService menuItemService)
    {
        _menuItemService = menuItemService;
    }

    [HttpGet]
    public async Task<ActionResult<MenuItem>> GetAllMenuItems()
    {
        var menuItem = await _menuItemService.GetAllMenuItems();
        if (menuItem == null) return NotFound();
        return Ok(menuItem);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<MenuItem>> GetMenuItemById(int id)
    {
        var menuItem = await _menuItemService.GetMenuItemById(id);
        if (menuItem == null) return NotFound();
        return Ok(menuItem);
    }

    [HttpGet("restaurant/{restaurantId}")]
    public async Task<ActionResult<List<MenuItem>>> GetMenuItemsByRestaurantId(int restaurantId) =>
        Ok(await _menuItemService.GetMenuItemsByRestaurantId(restaurantId));

    [HttpPost]
    public async Task<ActionResult<MenuItem>> CreateMenuItem(CreateMenuItemDto dto)
    {
        var menuItem = new MenuItem
        {
            RestaurantId = dto.RestaurantId,
            Name = dto.Name!,
            Price = dto.Price,
            Description = dto.Description!,
            ImageURL = dto.ImageURL!
        };

        var created = await _menuItemService.CreateMenuItem(menuItem);
        return CreatedAtAction(nameof(GetMenuItemById), new { id = created.MenuItemId }, created);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<MenuItem>> UpdateMenuItem(int id, UpdateMenuItemDto dto)
    {
        var menuItem = await _menuItemService.GetMenuItemById(id);
        if (menuItem == null) return NotFound();

        menuItem.Name = dto.Name!;
        menuItem.Price = dto.Price;
        menuItem.Description = dto.Description!;
        menuItem.ImageURL = dto.ImageURL!;

        return Ok(await _menuItemService.UpdateMenuItem(menuItem));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<MenuItem>> DeleteMenuItem(int id)
    {
        var menuItem = await _menuItemService.GetMenuItemById(id);
        if (menuItem == null) return NotFound();

        return Ok(await _menuItemService.DeleteMenuItem(menuItem));
    }
}
