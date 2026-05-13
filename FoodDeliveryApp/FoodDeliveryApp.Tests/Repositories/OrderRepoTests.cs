using FoodDeliveryApp.API.Data;
using FoodDeliveryApp.API.Models;
using FoodDeliveryApp.Tests.Helpers;

namespace FoodDeliveryApp.Tests.Repositories;

public class OrderRepoTests
{
    [Fact]
    public async Task GetAllOrdersAsync_Should_Return_All_Orders()
    {
        // Arrange
        var context = TestDbContextFactory.Create();

        context.Orders.Add(new Order
        {
            CustomerId = 1,
            DriverId = 1,
            RestaurantId = 1,
            Status = "Pending",
            Total = 20,
            OrderDate = DateTime.UtcNow
        });

        context.Orders.Add(new Order
        {
            CustomerId = 2,
            DriverId = 2,
            RestaurantId = 2,
            Status = "Delivered",
            Total = 50,
            OrderDate = DateTime.UtcNow
        });

        await context.SaveChangesAsync();

        var repo = new OrderRepo(context);

        // Act
        var result = await repo.GetAllOrdersAsync();

        // Assert
        result.Should().HaveCount(2);
    }

    [Fact]
    public async Task CreateOrderAsync_Should_Add_Order()
    {
        // Arrange
        var context = TestDbContextFactory.Create();

        var repo = new OrderRepo(context);

        var order = new Order
        {
            CustomerId = 1,
            DriverId = 1,
            RestaurantId = 1,
            Status = "Pending",
            Total = 30,
            OrderDate = DateTime.UtcNow
        };

        // Act
        var result = await repo.CreateOrderAsync(order);

        // Assert
        result.Should().NotBeNull();

        context.Orders.Count().Should().Be(1);
    }

    [Fact]
    public async Task UpdateOrderAsync_Should_Update_Order()
    {
        // Arrange
        var context = TestDbContextFactory.Create();

        var order = new Order
        {
            CustomerId = 1,
            DriverId = 1,
            RestaurantId = 1,
            Status = "Pending",
            Total = 15,
            OrderDate = DateTime.UtcNow
        };

        context.Orders.Add(order);

        await context.SaveChangesAsync();

        var repo = new OrderRepo(context);

        // Act
        order.Status = "Delivered";

        var updated = await repo.UpdateOrderAsync(order);

        // Assert
        updated.Status.Should().Be("Delivered");
    }

    [Fact]
    public async Task DeleteOrderAsync_Should_Remove_Order()
    {
        // Arrange
        var context = TestDbContextFactory.Create();

        var order = new Order
        {
            CustomerId = 1,
            DriverId = 1,
            RestaurantId = 1,
            Status = "Pending",
            Total = 15,
            OrderDate = DateTime.UtcNow
        };

        context.Orders.Add(order);

        await context.SaveChangesAsync();

        var repo = new OrderRepo(context);

        // Act
        var deleted = await repo.DeleteOrderAsync(order);

        // Assert
        deleted.Should().NotBeNull();

        context.Orders.Count().Should().Be(0);
    }

    [Fact]
    public async Task GetOrderByIdAsync_Should_Return_Order_When_Order_Exists()
    {
        // Arrange
        var context = TestDbContextFactory.Create();

        var order = new Order
        {
            CustomerId = 1,
            DriverId = 1,
            RestaurantId = 1,
            Status = "Pending",
            Total = 20,
            OrderDate = DateTime.UtcNow
        };

        context.Orders.Add(order);

        await context.SaveChangesAsync();

        var repo = new OrderRepo(context);

        // Act
        var result = await repo.GetOrderByIdAsync(order.OrderId);

        // Assert
        result.Should().NotBeNull();

        result!.OrderId.Should().Be(order.OrderId);
    }

    [Fact]
    public async Task GetOrderByIdAsync_Should_Return_Null_When_Order_Does_Not_Exist()
    {
        // Arrange
        var context = TestDbContextFactory.Create();

        var repo = new OrderRepo(context);

        // Act
        var result = await repo.GetOrderByIdAsync(999);

        // Assert
        result.Should().BeNull();
    }

    [Fact]
    public async Task GetOrdersByCustomerIdAsync_Should_Return_Customer_Orders()
    {
        // Arrange
        var context = TestDbContextFactory.Create();

        context.Orders.Add(new Order
        {
            CustomerId = 1,
            DriverId = 1,
            RestaurantId = 1,
            Status = "Pending",
            Total = 20,
            OrderDate = DateTime.UtcNow
        });

        context.Orders.Add(new Order
        {
            CustomerId = 2,
            DriverId = 1,
            RestaurantId = 1,
            Status = "Delivered",
            Total = 40,
            OrderDate = DateTime.UtcNow
        });

        await context.SaveChangesAsync();

        var repo = new OrderRepo(context);

        // Act
        var result = await repo.GetOrdersByCustomerIdAsync(1);

        // Assert
        result.Should().HaveCount(1);

        result.First().CustomerId.Should().Be(1);
    }

    [Fact]
    public async Task GetOrdersByDriverIdAsync_Should_Return_Driver_Orders()
    {
        // Arrange
        var context = TestDbContextFactory.Create();

        context.Orders.Add(new Order
        {
            CustomerId = 1,
            DriverId = 5,
            RestaurantId = 1,
            Status = "Pending",
            Total = 20,
            OrderDate = DateTime.UtcNow
        });

        context.Orders.Add(new Order
        {
            CustomerId = 2,
            DriverId = 2,
            RestaurantId = 1,
            Status = "Delivered",
            Total = 40,
            OrderDate = DateTime.UtcNow
        });

        await context.SaveChangesAsync();

        var repo = new OrderRepo(context);

        // Act
        var result = await repo.GetOrdersByDriverIdAsync(5);

        // Assert
        result.Should().HaveCount(1);

        result.First().DriverId.Should().Be(5);
    }
}