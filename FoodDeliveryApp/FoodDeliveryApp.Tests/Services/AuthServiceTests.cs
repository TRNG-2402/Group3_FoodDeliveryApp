using FoodDeliveryApp.API.DTOs;
using FoodDeliveryApp.API.Models;
using FoodDeliveryApp.API.Services;
using FoodDeliveryApp.Tests.Helpers;
using Microsoft.Extensions.Configuration;

namespace FoodDeliveryApp.Tests.Services;

public class AuthServiceTests
{
    private IConfiguration GetConfiguration()
    {
        var settings = new Dictionary<string, string?>
        {
            { "Jwt:Key", "SUPER_SECRET_KEY_123456789012345" },
            { "Jwt:Issuer", "TestIssuer" },
            { "Jwt:Audience", "TestAudience" }
        };

        return new ConfigurationBuilder()
            .AddInMemoryCollection(settings)
            .Build();
    }

    [Fact]
    public async Task RegisterAsync_Should_Create_Customer()
    {
        // Arrange
        var context = TestDbContextFactory.Create();

        var service = new AuthService(
            context,
            GetConfiguration()
        );

        var dto = new RegisterDTO
        {
            Name = "Emma",
            Email = "emma@test.com",
            Phone = "1234567890",
            Password = "Password123",
            UserType = "Customer",
            Address = "123 Main"
        };

        // Act
        var token = await service.RegisterAsync(dto);

        // Assert
        token.Should().NotBeNull();

        context.Customers.Count().Should().Be(1);
    }

    [Fact]
    public async Task LoginAsync_Should_Return_Null_For_Invalid_Password()
    {
        // Arrange
        var context = TestDbContextFactory.Create();

        context.Customers.Add(new Customer
        {
            Name = "Emma",
            Email = "emma@test.com",
            Phone = "123",
            Password = BCrypt.Net.BCrypt.HashPassword("CorrectPassword"),
            Address = "123 Main"
        });

        await context.SaveChangesAsync();

        var service = new AuthService(
            context,
            GetConfiguration()
        );

        var dto = new LoginDTO
        {
            Email = "emma@test.com",
            Password = "WrongPassword"
        };

        // Act
        var result = await service.LoginAsync(dto);

        // Assert
        result.Should().BeNull();
    }
}