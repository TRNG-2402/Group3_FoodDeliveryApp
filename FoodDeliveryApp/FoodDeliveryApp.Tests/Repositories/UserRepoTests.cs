using FoodDeliveryApp.API.Data;
using FoodDeliveryApp.API.Models;
using FoodDeliveryApp.Tests.Helpers;

namespace FoodDeliveryApp.Tests.Repositories;

public class UserRepoTests
{
    [Fact]
    public async Task CreateUserAsync_Should_Add_User()
    {
        // Arrange
        var context = TestDbContextFactory.Create();

        var repo = new UserRepo(context);

        var user = new Customer
        {
            Name = "Emma",
            Email = "emma@test.com",
            Phone = "1234567890",
            Password = "Password123",
            Address = "123 Main"
        };

        // Act
        var result = await repo.CreateUserAsync(user);

        // Assert
        result.Should().NotBeNull();

        context.Users.Count().Should().Be(1);
    }

    [Fact]
    public async Task GetByEmailAsync_Should_Return_User_When_User_Exists()
    {
        // Arrange
        var context = TestDbContextFactory.Create();

        context.Users.Add(new Customer
        {
            Name = "Emma",
            Email = "emma@test.com",
            Phone = "1234567890",
            Password = "Password123",
            Address = "123 Main"
        });

        await context.SaveChangesAsync();

        var repo = new UserRepo(context);

        // Act
        var result = await repo.GetByEmailAsync("emma@test.com");

        // Assert
        result.Should().NotBeNull();

        result!.Email.Should().Be("emma@test.com");
    }

    [Fact]
    public async Task GetByEmailAsync_Should_Return_Null_When_User_Does_Not_Exist()
    {
        // Arrange
        var context = TestDbContextFactory.Create();

        var repo = new UserRepo(context);

        // Act
        var result = await repo.GetByEmailAsync("missing@test.com");

        // Assert
        result.Should().BeNull();
    }

    [Fact]
    public async Task GetUserByIdAsync_Should_Return_User_When_User_Exists()
    {
        // Arrange
        var context = TestDbContextFactory.Create();

        var user = new Customer
        {
            Name = "Emma",
            Email = "emma@test.com",
            Phone = "1234567890",
            Password = "Password123",
            Address = "123 Main"
        };

        context.Users.Add(user);

        await context.SaveChangesAsync();

        var repo = new UserRepo(context);

        // Act
        var result = await repo.GetUserByIdAsync(user.UserId);

        // Assert
        result.Should().NotBeNull();

        result!.UserId.Should().Be(user.UserId);
    }

    [Fact]
    public async Task GetUserByIdAsync_Should_Return_Null_When_User_Does_Not_Exist()
    {
        // Arrange
        var context = TestDbContextFactory.Create();

        var repo = new UserRepo(context);

        // Act
        var result = await repo.GetUserByIdAsync(999);

        // Assert
        result.Should().BeNull();
    }
}