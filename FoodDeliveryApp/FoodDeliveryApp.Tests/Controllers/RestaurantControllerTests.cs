using FoodDeliveryApp.API.Controllers;
using FoodDeliveryApp.API.DTOs;
using FoodDeliveryApp.API.Models;
using FoodDeliveryApp.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace FoodDeliveryApp.Tests.Controllers;

public class RestaurantControllerTests
{
    [Fact]
    public async Task GetAllRestaurants_Should_Return_Ok()
    {
        // Arrange
        var mockService = new Mock<IRestaurantService>();

        mockService.Setup(s => s.GetAllRestaurant())
            .ReturnsAsync(new List<Restaurant>());

        var controller = new RestaurantController(mockService.Object);

        // Act
        var result = await controller.GetAllRestaurants();

        // Assert
        result.Result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task GetRestaurantById_Should_Return_Ok_When_Restaurant_Exists()
    {
        // Arrange
        var mockService = new Mock<IRestaurantService>();

        var restaurant = new Restaurant
        {
            RestaurantId = 1,
            Name = "Pizza Palace",
            Address = "123 Pizza St",
            Phone = "5555555555"
        };

        mockService.Setup(s => s.GetRestaurantById(1))
            .ReturnsAsync(restaurant);

        var controller = new RestaurantController(mockService.Object);

        // Act
        var result = await controller.GetRestaurantById(1);

        // Assert
        result.Result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task GetRestaurantById_Should_Return_NotFound_When_Restaurant_Does_Not_Exist()
    {
        // Arrange
        var mockService = new Mock<IRestaurantService>();

        mockService.Setup(s => s.GetRestaurantById(1))
            .ReturnsAsync((Restaurant?)null);

        var controller = new RestaurantController(mockService.Object);

        // Act
        var result = await controller.GetRestaurantById(1);

        // Assert
        result.Result.Should().BeOfType<NotFoundResult>();
    }

    [Fact]
    public async Task CreateRestaurant_Should_Return_CreatedAtAction()
    {
        // Arrange
        var mockService = new Mock<IRestaurantService>();

        var dto = new CreateRestaurantDto
        {
            Name = "Burger House",
            Address = "123 Burger Ln",
            Phone = "5551234567"
        };

        var restaurant = new Restaurant
        {
            RestaurantId = 1,
            Name = "Burger House",
            Address = "123 Burger Ln",
            Phone = "5551234567"
        };

        mockService.Setup(s => s.CreateRestaurant(It.IsAny<Restaurant>()))
            .ReturnsAsync(restaurant);

        var controller = new RestaurantController(mockService.Object);

        // Act
        var result = await controller.CreateRestaurant(dto);

        // Assert
        result.Result.Should().BeOfType<CreatedAtActionResult>();
    }

    [Fact]
    public async Task UpdateRestaurant_Should_Return_NotFound_When_Restaurant_Does_Not_Exist()
    {
        // Arrange
        var mockService = new Mock<IRestaurantService>();

        mockService.Setup(s => s.GetRestaurantById(1))
            .ReturnsAsync((Restaurant?)null);

        var controller = new RestaurantController(mockService.Object);

        var dto = new UpdateRestaurantDto
        {
            Name = "Updated Name",
            Address = "Updated Address",
            Phone = "5559999999"
        };

        // Act
        var result = await controller.UpdateRestaurant(1, dto);

        // Assert
        result.Result.Should().BeOfType<NotFoundResult>();
    }

    [Fact]
    public async Task DeleteRestaurant_Should_Return_NotFound_When_Restaurant_Does_Not_Exist()
    {
        // Arrange
        var mockService = new Mock<IRestaurantService>();

        mockService.Setup(s => s.GetRestaurantById(1))
            .ReturnsAsync((Restaurant?)null);

        var controller = new RestaurantController(mockService.Object);

        // Act
        var result = await controller.DeleteRestaurant(1);

        // Assert
        result.Result.Should().BeOfType<NotFoundResult>();
    }
}