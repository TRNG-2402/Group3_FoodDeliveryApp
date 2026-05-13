using FoodDeliveryApp.API.Controllers;
using FoodDeliveryApp.API.DTOs;
using FoodDeliveryApp.API.Models;
using FoodDeliveryApp.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace FoodDeliveryApp.Tests.Controllers;

public class OrderControllerTests
{
    [Fact]
    public async Task GetAllOrders_Should_Return_Ok()
    {
        // Arrange
        var mockService = new Mock<IOrderService>();

        mockService.Setup(s => s.GetAllOrders())
            .ReturnsAsync(new List<Order>());

        var controller = new OrderController(mockService.Object);

        // Act
        var result = await controller.GetAllOrders();

        // Assert
        result.Result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task GetOrderById_Should_Return_Ok_When_Order_Exists()
    {
        // Arrange
        var mockService = new Mock<IOrderService>();

        var order = new Order
        {
            OrderId = 1,
            CustomerId = 1,
            RestaurantId = 1,
            Status = "Pending",
            Total = 20
        };

        mockService.Setup(s => s.GetOrderById(1))
            .ReturnsAsync(order);

        var controller = new OrderController(mockService.Object);

        // Act
        var result = await controller.GetOrderById(1);

        // Assert
        result.Result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task GetOrderById_Should_Return_NotFound_When_Order_Does_Not_Exist()
    {
        // Arrange
        var mockService = new Mock<IOrderService>();

        mockService.Setup(s => s.GetOrderById(1))
            .ReturnsAsync((Order?)null);

        var controller = new OrderController(mockService.Object);

        // Act
        var result = await controller.GetOrderById(1);

        // Assert
        result.Result.Should().BeOfType<NotFoundResult>();
    }

    [Fact]
    public async Task CreateOrder_Should_Return_CreatedAtAction()
    {
        // Arrange
        var mockService = new Mock<IOrderService>();

        var dto = new CreateOrderDto
        {
            CustomerId = 1,
            RestaurantId = 1,
            Items = new List<CreateOrderItemDto>
            {
                new CreateOrderItemDto
                {
                    MenuItemId = 1,
                    Quantity = 2,
                    UnitPrice = 10
                }
            }
        };

        var createdOrder = new Order
        {
            OrderId = 1,
            CustomerId = 1,
            RestaurantId = 1,
            Status = "Pending",
            Total = 20
        };

        mockService.Setup(s => s.CreateOrder(It.IsAny<Order>()))
            .ReturnsAsync(createdOrder);

        var controller = new OrderController(mockService.Object);

        // Act
        var result = await controller.CreateOrder(dto);

        // Assert
        result.Result.Should().BeOfType<CreatedAtActionResult>();
    }

    [Fact]
    public async Task UpdateOrder_Should_Return_NotFound_When_Order_Does_Not_Exist()
    {
        // Arrange
        var mockService = new Mock<IOrderService>();

        mockService.Setup(s => s.GetOrderById(1))
            .ReturnsAsync((Order?)null);

        var controller = new OrderController(mockService.Object);

        var dto = new UpdateOrderDto
        {
            Status = "Delivered",
            DriverId = 1
        };

        // Act
        var result = await controller.UpdateOrder(1, dto);

        // Assert
        result.Result.Should().BeOfType<NotFoundResult>();
    }

    [Fact]
    public async Task DeleteOrder_Should_Return_NotFound_When_Order_Does_Not_Exist()
    {
        // Arrange
        var mockService = new Mock<IOrderService>();

        mockService.Setup(s => s.GetOrderById(1))
            .ReturnsAsync((Order?)null);

        var controller = new OrderController(mockService.Object);

        // Act
        var result = await controller.DeleteOrder(1);

        // Assert
        result.Result.Should().BeOfType<NotFoundResult>();
    }
}