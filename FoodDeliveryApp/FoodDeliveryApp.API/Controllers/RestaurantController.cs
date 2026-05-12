using FoodDeliveryApp.API.DTOs;
using FoodDeliveryApp.API.Models;
using FoodDeliveryApp.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace FoodDeliveryApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RestaurantController : ControllerBase
{
    private readonly IRestaurantService _restaurantService;

    public RestaurantController(IRestaurantService restaurantService)
    {
        _restaurantService = restaurantService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Restaurant>>> GetAllRestaurants() =>
        Ok(await _restaurantService.GetAllRestaurant());

    [HttpGet("{id}")]
    public async Task<ActionResult<Restaurant>> GetRestaurantById(int id)
    {
        var restaurant = await _restaurantService.GetRestaurantById(id);
        if (restaurant == null) return NotFound();
        return Ok(restaurant);
    }

    [HttpPost]
    public async Task<ActionResult<Restaurant>> CreateRestaurant(CreateRestaurantDto dto)
    {
        var restaurant = new Restaurant
        {
            Name = dto.Name!,
            Address = dto.Address!,
            Phone = dto.Phone!
        };

        var created = await _restaurantService.CreateRestaurant(restaurant);
        return CreatedAtAction(nameof(GetRestaurantById), new { id = created.RestaurantId }, created);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Restaurant>> UpdateRestaurant(int id, UpdateRestaurantDto dto)
    {
        var restaurant = await _restaurantService.GetRestaurantById(id);
        if (restaurant == null) return NotFound();

        restaurant.Name = dto.Name!;
        restaurant.Address = dto.Address!;
        restaurant.Phone = dto.Phone!;

        return Ok(await _restaurantService.UpdateRestaurant(restaurant));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Restaurant>> DeleteRestaurant(int id)
    {
        var restaurant = await _restaurantService.GetRestaurantById(id);
        if (restaurant == null) return NotFound();

        return Ok(await _restaurantService.DeleteRestaurant(restaurant));
    }
}
