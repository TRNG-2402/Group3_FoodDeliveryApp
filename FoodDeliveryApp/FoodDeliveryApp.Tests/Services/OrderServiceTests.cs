using FoodDeliveryApp.API.Data;
using FoodDeliveryApp.API.Models;
using FoodDeliveryApp.API.Services;

namespace FoodDeliveryApp.Tests.Services;

public class OrderServiceTests
{
    [Fact]
    public async Task GetAllOrders_Should_Return_All_Orders()
    {
        // Arrange
        var mockRepo = new Mock<IOrderRepo>();

        var orders = new List<Order>
        {
            new Order
            {
                OrderId = 1,
                CustomerId = 1,
                DriverId = 1,
                RestaurantId = 1,
                Status = "Pending",
                Total = 20,
                OrderDate = DateTime.UtcNow
            }
        };

        mockRepo.Setup(r => r.GetAllOrdersAsync())
            .ReturnsAsync(orders);

        var service = new OrderService(mockRepo.Object);

        // Act
        var result = await service.GetAllOrders();

        // Assert
        result.Should().HaveCount(1);
    }

    [Fact]
    public async Task GetOrderById_Should_Return_Order_When_Exists()
    {
        // Arrange
        var mockRepo = new Mock<IOrderRepo>();

        var order = new Order
        {
            OrderId = 1,
            CustomerId = 1,
            DriverId = 1,
            RestaurantId = 1,
            Status = "Pending",
            Total = 20,
            OrderDate = DateTime.UtcNow
        };

        mockRepo.Setup(r => r.GetOrderByIdAsync(1))
            .ReturnsAsync(order);

        var service = new OrderService(mockRepo.Object);

        // Act
        var result = await service.GetOrderById(1);

        // Assert
        result.Should().NotBeNull();

        result!.OrderId.Should().Be(1);
    }

    [Fact]
    public async Task GetOrderById_Should_Return_Null_When_Not_Found()
    {
        // Arrange
        var mockRepo = new Mock<IOrderRepo>();

        mockRepo.Setup(r => r.GetOrderByIdAsync(999))
            .ReturnsAsync((Order?)null);

        var service = new OrderService(mockRepo.Object);

        // Act
        var result = await service.GetOrderById(999);

        // Assert
        result.Should().BeNull();
    }

    [Fact]
    public async Task GetOrdersByCustomerId_Should_Return_Customer_Orders()
    {
        // Arrange
        var mockRepo = new Mock<IOrderRepo>();

        var orders = new List<Order>
        {
            new Order
            {
                OrderId = 1,
                CustomerId = 5,
                DriverId = 1,
                RestaurantId = 1,
                Status = "Pending",
                Total = 20,
                OrderDate = DateTime.UtcNow
            }
        };

        mockRepo.Setup(r => r.GetOrdersByCustomerIdAsync(5))
            .ReturnsAsync(orders);

        var service = new OrderService(mockRepo.Object);

        // Act
        var result = await service.GetOrdersByCustomerId(5);

        // Assert
        result.Should().HaveCount(1);

        result.First().CustomerId.Should().Be(5);
    }

    [Fact]
    public async Task GetOrdersByDriverId_Should_Return_Driver_Orders()
    {
        // Arrange
        var mockRepo = new Mock<IOrderRepo>();

        var orders = new List<Order>
        {
            new Order
            {
                OrderId = 1,
                CustomerId = 1,
                DriverId = 8,
                RestaurantId = 1,
                Status = "Pending",
                Total = 20,
                OrderDate = DateTime.UtcNow
            }
        };

        mockRepo.Setup(r => r.GetOrdersByDriverIdAsync(8))
            .ReturnsAsync(orders);

        var service = new OrderService(mockRepo.Object);

        // Act
        var result = await service.GetOrdersByDriverId(8);

        // Assert
        result.Should().HaveCount(1);

        result.First().DriverId.Should().Be(8);
    }

    [Fact]
    public async Task CreateOrder_Should_Call_Repo_And_Return_Order()
    {
        // Arrange
        var mockRepo = new Mock<IOrderRepo>();

        var order = new Order
        {
            OrderId = 1,
            CustomerId = 1,
            DriverId = 1,
            RestaurantId = 1,
            Status = "Pending",
            Total = 20,
            OrderDate = DateTime.UtcNow
        };

        mockRepo.Setup(r => r.CreateOrderAsync(order))
            .ReturnsAsync(order);

        var service = new OrderService(mockRepo.Object);

        // Act
        var result = await service.CreateOrder(order);

        // Assert
        result.Should().NotBeNull();

        result.OrderId.Should().Be(1);

        mockRepo.Verify(r => r.CreateOrderAsync(order), Times.Once);
    }

    [Fact]
    public async Task UpdateOrder_Should_Call_Repo_And_Return_Order()
    {
        // Arrange
        var mockRepo = new Mock<IOrderRepo>();

        var order = new Order
        {
            OrderId = 1,
            CustomerId = 1,
            DriverId = 1,
            RestaurantId = 1,
            Status = "Delivered",
            Total = 20,
            OrderDate = DateTime.UtcNow
        };

        mockRepo.Setup(r => r.UpdateOrderAsync(order))
            .ReturnsAsync(order);

        var service = new OrderService(mockRepo.Object);

        // Act
        var result = await service.UpdateOrder(order);

        // Assert
        result.Status.Should().Be("Delivered");

        mockRepo.Verify(r => r.UpdateOrderAsync(order), Times.Once);
    }

    [Fact]
    public async Task DeleteOrder_Should_Call_Repo_And_Return_Order()
    {
        // Arrange
        var mockRepo = new Mock<IOrderRepo>();

        var order = new Order
        {
            OrderId = 1,
            CustomerId = 1,
            DriverId = 1,
            RestaurantId = 1,
            Status = "Cancelled",
            Total = 20,
            OrderDate = DateTime.UtcNow
        };

        mockRepo.Setup(r => r.DeleteOrderAsync(order))
            .ReturnsAsync(order);

        var service = new OrderService(mockRepo.Object);

        // Act
        var result = await service.DeleteOrder(order);

        // Assert
        result.Should().NotBeNull();

        mockRepo.Verify(r => r.DeleteOrderAsync(order), Times.Once);
    }
}