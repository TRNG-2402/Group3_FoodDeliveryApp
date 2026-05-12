using FoodDeliveryApp.API.DTOs;
using FoodDeliveryApp.API.Models;
using FoodDeliveryApp.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace FoodDeliveryApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserResponseDto>> GetUserById(int id)
    {
        var user = await _userService.GetUserById(id);
        if (user == null) return NotFound();
        return Ok(MapToDto(user));
    }

    [HttpGet("email/{email}")]
    public async Task<ActionResult<UserResponseDto>> GetUserByEmail(string email)
    {
        var user = await _userService.GetUserByEmail(email);
        if (user == null) return NotFound();
        return Ok(MapToDto(user));
    }

    private static UserResponseDto MapToDto(User user)
    {
        return user switch
        {
            Customer c => new UserResponseDto
            {
                UserId = c.UserId,
                Name = c.Name,
                Email = c.Email,
                Phone = c.Phone,
                UserType = "Customer",
                Address = c.Address
            },
            Driver d => new UserResponseDto
            {
                UserId = d.UserId,
                Name = d.Name,
                Email = d.Email,
                Phone = d.Phone,
                UserType = "Driver",
                VehicleType = d.VehicleType
            },
            _ => new UserResponseDto
            {
                UserId = user.UserId,
                Name = user.Name,
                Email = user.Email,
                Phone = user.Phone,
                UserType = "Unknown"
            }
        };
    }
}
