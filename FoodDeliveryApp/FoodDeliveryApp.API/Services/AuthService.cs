using BCrypt.Net;
using FoodDeliveryApp.API.DTOs;
using FoodDeliveryApp.API.Helpers;
using FoodDeliveryApp.API.Data;
using FoodDeliveryApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodDeliveryApp.API.Services;

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthService(
        AppDbContext context,
        IConfiguration configuration
    )
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task<string?> RegisterAsync(RegisterDTO dto)
    {
        var existingUser = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == dto.Email);

        if (existingUser != null)
            return null;

        User user;

        if (dto.UserType?.ToLower() == "customer")
        {
            user = new Customer
            {
                Name = dto.Name!,
                Email = dto.Email!,
                Phone = dto.Phone!,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Address = dto.Address!
            };
        }
        else
        {
            user = new Driver
            {
                Name = dto.Name!,
                Email = dto.Email!,
                Phone = dto.Phone!,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                VehicleType = dto.VehicleType!,
                MoneyEarned = 0
            };
        }

        _context.Users.Add(user);

        await _context.SaveChangesAsync();

        return JwtTokenGenerator.GenerateToken(user, _configuration);
    }

    public async Task<string?> LoginAsync(LoginDTO dto)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == dto.Email);

        if (user == null)
            return null;

        bool validPassword = BCrypt.Net.BCrypt.Verify(
            dto.Password,
            user.Password
        );

        if (validPassword)
        {
            return JwtTokenGenerator.GenerateToken(user, _configuration);
        }

        return null;
    }
}