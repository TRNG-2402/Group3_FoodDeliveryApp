using FoodDeliveryApp.API.Controllers;
using FoodDeliveryApp.API.DTOs;
using FoodDeliveryApp.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace FoodDeliveryApp.Tests.Controllers;

public class AuthControllerTests
{
    [Fact]
    public async Task Login_Should_Return_Ok_When_Valid()
    {
        var mockService = new Mock<IAuthService>();

        mockService.Setup(s => s.LoginAsync(It.IsAny<LoginDTO>()))
            .ReturnsAsync("fake-jwt-token");

        var controller = new AuthController(mockService.Object);

        var dto = new LoginDTO
        {
            Email = "emma@test.com",
            Password = "Password123"
        };

        var result = await controller.Login(dto);

        result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task Login_Should_Return_Unauthorized_When_Invalid()
    {
        var mockService = new Mock<IAuthService>();

        mockService.Setup(s => s.LoginAsync(It.IsAny<LoginDTO>()))
            .ReturnsAsync((string?)null);

        var controller = new AuthController(mockService.Object);

        var dto = new LoginDTO
        {
            Email = "emma@test.com",
            Password = "WrongPassword"
        };

        var result = await controller.Login(dto);

        result.Should().BeOfType<UnauthorizedObjectResult>();
    }
}