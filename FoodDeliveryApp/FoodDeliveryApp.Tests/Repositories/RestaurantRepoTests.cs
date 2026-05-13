using FoodDeliveryApp.API.Data;
using FoodDeliveryApp.API.Models;
using FoodDeliveryApp.Tests.Helpers;

namespace FoodDeliveryApp.Tests.Repositories;

public class RestaurantRepoTests
{
    [Fact]
    public async Task GetAllRestaurantAsync_Should_Return_All_Restaurants()
    {
        // Arrange
        var context = TestDbContextFactory.Create();

        context.Restaurants.Add(new Restaurant
        {
            Name = "Pizza Palace",
            Address = "123 Pizza St",
            Phone = "5551111111"
        });

        context.Restaurants.Add(new Restaurant
        {
            Name = "Burger House",
            Address = "456 Burger Ave",
            Phone = "5552222222"
        });

        await context.SaveChangesAsync();

        var repo = new RestaurantRepo(context);

        // Act
        var result = await repo.GetAllRestaurantAsync();

        // Assert
        result.Should().HaveCount(2);
    }

    [Fact]
    public async Task GetRestaurantByIdAsync_Should_Return_Restaurant_When_Exists()
    {
        // Arrange
        var context = TestDbContextFactory.Create();

        var restaurant = new Restaurant
        {
            Name = "Taco Spot",
            Address = "789 Taco Rd",
            Phone = "5553333333",
            MenuItems = new List<MenuItem>
            {
                new MenuItem
                {
                    Name = "Taco",
                    Description = "Beef taco",
                    Price = 3.99,
                    ImageURL = "taco.jpg"
                }
            }
        };

        context.Restaurants.Add(restaurant);

        await context.SaveChangesAsync();

        var repo = new RestaurantRepo(context);

        // Act
        var result = await repo.GetRestaurantByIdAsync(restaurant.RestaurantId);

        // Assert
        result.Should().NotBeNull();

        result!.RestaurantId.Should().Be(restaurant.RestaurantId);

        result.MenuItems.Should().HaveCount(1);
    }

    [Fact]
    public async Task GetRestaurantByIdAsync_Should_Return_Null_When_Not_Found()
    {
        // Arrange
        var context = TestDbContextFactory.Create();

        var repo = new RestaurantRepo(context);

        // Act
        var result = await repo.GetRestaurantByIdAsync(999);

        // Assert
        result.Should().BeNull();
    }

    [Fact]
    public async Task CreateRestaurantAsync_Should_Add_Restaurant()
    {
        // Arrange
        var context = TestDbContextFactory.Create();

        var repo = new RestaurantRepo(context);

        var restaurant = new Restaurant
        {
            Name = "Sushi Place",
            Address = "123 Sushi St",
            Phone = "5554444444"
        };

        // Act
        var result = await repo.CreateRestaurantAsync(restaurant);

        // Assert
        result.Should().NotBeNull();

        context.Restaurants.Count().Should().Be(1);
    }

    [Fact]
    public async Task UpdateRestaurantAsync_Should_Update_Restaurant()
    {
        // Arrange
        var context = TestDbContextFactory.Create();

        var restaurant = new Restaurant
        {
            Name = "Old Name",
            Address = "Old Address",
            Phone = "5555555555"
        };

        context.Restaurants.Add(restaurant);

        await context.SaveChangesAsync();

        var repo = new RestaurantRepo(context);

        // Act
        restaurant.Name = "New Name";

        var updated = await repo.UpdateRestaurantAsync(restaurant);

        // Assert
        updated.Name.Should().Be("New Name");
    }

    [Fact]
    public async Task DeleteRestaurantAsync_Should_Remove_Restaurant()
    {
        // Arrange
        var context = TestDbContextFactory.Create();

        var restaurant = new Restaurant
        {
            Name = "Delete Me",
            Address = "123 Delete St",
            Phone = "5556666666"
        };

        context.Restaurants.Add(restaurant);

        await context.SaveChangesAsync();

        var repo = new RestaurantRepo(context);

        // Act
        var deleted = await repo.DeleteRestaurantAsync(restaurant);

        // Assert
        deleted.Should().NotBeNull();

        context.Restaurants.Count().Should().Be(0);
    }
}