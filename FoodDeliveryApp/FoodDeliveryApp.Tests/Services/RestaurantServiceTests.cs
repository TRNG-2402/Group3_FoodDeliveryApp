using FoodDeliveryApp.API.Data;
using FoodDeliveryApp.API.Models;
using FoodDeliveryApp.API.Services;

namespace FoodDeliveryApp.Tests.Services;

public class RestaurantServiceTests
{
    [Fact]
    public async Task GetAllRestaurant_Should_Return_All_Restaurants()
    {
        // Arrange
        var mockRepo = new Mock<IRestaurantRepo>();

        var restaurants = new List<Restaurant>
        {
            new Restaurant
            {
                RestaurantId = 1,
                Name = "Pizza Palace",
                Address = "123 Pizza St",
                Phone = "5551111111"
            }
        };

        mockRepo.Setup(r => r.GetAllRestaurantAsync())
            .ReturnsAsync(restaurants);

        var service = new RestaurantService(mockRepo.Object);

        // Act
        var result = await service.GetAllRestaurant();

        // Assert
        result.Should().HaveCount(1);

        result.First().Name.Should().Be("Pizza Palace");
    }

    [Fact]
    public async Task GetRestaurantById_Should_Return_Restaurant_When_Exists()
    {
        // Arrange
        var mockRepo = new Mock<IRestaurantRepo>();

        var restaurant = new Restaurant
        {
            RestaurantId = 1,
            Name = "Burger House",
            Address = "456 Burger Ave",
            Phone = "5552222222"
        };

        mockRepo.Setup(r => r.GetRestaurantByIdAsync(1))
            .ReturnsAsync(restaurant);

        var service = new RestaurantService(mockRepo.Object);

        // Act
        var result = await service.GetRestaurantById(1);

        // Assert
        result.Should().NotBeNull();

        result!.RestaurantId.Should().Be(1);
    }

    [Fact]
    public async Task GetRestaurantById_Should_Return_Null_When_Not_Found()
    {
        // Arrange
        var mockRepo = new Mock<IRestaurantRepo>();

        mockRepo.Setup(r => r.GetRestaurantByIdAsync(999))
            .ReturnsAsync((Restaurant?)null);

        var service = new RestaurantService(mockRepo.Object);

        // Act
        var result = await service.GetRestaurantById(999);

        // Assert
        result.Should().BeNull();
    }

    [Fact]
    public async Task CreateRestaurant_Should_Call_Repo_And_Return_Restaurant()
    {
        // Arrange
        var mockRepo = new Mock<IRestaurantRepo>();

        var restaurant = new Restaurant
        {
            RestaurantId = 1,
            Name = "Taco Spot",
            Address = "789 Taco Rd",
            Phone = "5553333333"
        };

        mockRepo.Setup(r => r.CreateRestaurantAsync(restaurant))
            .ReturnsAsync(restaurant);

        var service = new RestaurantService(mockRepo.Object);

        // Act
        var result = await service.CreateRestaurant(restaurant);

        // Assert
        result.Should().NotBeNull();

        result.Name.Should().Be("Taco Spot");

        mockRepo.Verify(r => r.CreateRestaurantAsync(restaurant), Times.Once);
    }

    [Fact]
    public async Task UpdateRestaurant_Should_Call_Repo_And_Return_Restaurant()
    {
        // Arrange
        var mockRepo = new Mock<IRestaurantRepo>();

        var restaurant = new Restaurant
        {
            RestaurantId = 1,
            Name = "Updated Restaurant",
            Address = "Updated Address",
            Phone = "5554444444"
        };

        mockRepo.Setup(r => r.UpdateRestaurantAsync(restaurant))
            .ReturnsAsync(restaurant);

        var service = new RestaurantService(mockRepo.Object);

        // Act
        var result = await service.UpdateRestaurant(restaurant);

        // Assert
        result.Name.Should().Be("Updated Restaurant");

        mockRepo.Verify(r => r.UpdateRestaurantAsync(restaurant), Times.Once);
    }

    [Fact]
    public async Task DeleteRestaurant_Should_Call_Repo_And_Return_Restaurant()
    {
        // Arrange
        var mockRepo = new Mock<IRestaurantRepo>();

        var restaurant = new Restaurant
        {
            RestaurantId = 1,
            Name = "Delete Me",
            Address = "123 Delete St",
            Phone = "5555555555"
        };

        mockRepo.Setup(r => r.DeleteRestaurantAsync(restaurant))
            .ReturnsAsync(restaurant);

        var service = new RestaurantService(mockRepo.Object);

        // Act
        var result = await service.DeleteRestaurant(restaurant);

        // Assert
        result.Should().NotBeNull();

        mockRepo.Verify(r => r.DeleteRestaurantAsync(restaurant), Times.Once);
    }
}