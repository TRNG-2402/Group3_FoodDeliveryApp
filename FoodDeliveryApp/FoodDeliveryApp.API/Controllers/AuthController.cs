using FoodDeliveryApp.API.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace FoodDeliveryApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDTO dto)
    {
        var token = await _authService.RegisterAsync(dto);

        if (token == null)
        {
            return BadRequest("Email already exists.");
        }

        return Ok(new
        {
            Token = token
        });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDTO dto)
    {
        var token = await _authService.LoginAsync(dto);

        if (token == null)
        {
            return Unauthorized("Invalid email or password.");
        }

        return Ok(new
        {
            Token = token
        });
    }
}