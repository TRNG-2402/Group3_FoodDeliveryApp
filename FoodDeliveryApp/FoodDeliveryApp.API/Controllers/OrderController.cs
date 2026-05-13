using FoodDeliveryApp.API.DTOs;
using FoodDeliveryApp.API.Models;
using FoodDeliveryApp.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace FoodDeliveryApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private readonly IOrderService _orderService;

    public OrderController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Order>>> GetAllOrders() =>
        Ok(await _orderService.GetAllOrders());

    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrderById(int id)
    {
        var order = await _orderService.GetOrderById(id);
        if (order == null) return NotFound();
        return Ok(order);
    }

    [HttpGet("customer/{customerId}")]
    public async Task<ActionResult<List<Order>>> GetOrdersByCustomerId(int customerId) =>
        Ok(await _orderService.GetOrdersByCustomerId(customerId));

    [HttpGet("driver/{driverId}")]
    public async Task<ActionResult<List<Order>>> GetOrdersByDriverId(int driverId) =>
        Ok(await _orderService.GetOrdersByDriverId(driverId));

    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto dto)
    {
        var order = new Order
        {
            CustomerId = dto.CustomerId,
            RestaurantId = dto.RestaurantId,
            OrderDate = DateTime.UtcNow,
            Status = "Pending",
            DriverId = 0,
            OrderItems = dto.Items.Select(i => new OrderItem
            {
                MenuItemId = i.MenuItemId,
                Quantity = i.Quantity,
                UnitPrice = i.UnitPrice
            }).ToList()
        };

        order.Total = order.OrderItems.Sum(i => i.UnitPrice * i.Quantity);

        var created = await _orderService.CreateOrder(order);
        return CreatedAtAction(nameof(GetOrderById), new { id = created.OrderId }, created);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Order>> UpdateOrder(int id, UpdateOrderDto dto)
    {
        var order = await _orderService.GetOrderById(id);
        if (order == null) return NotFound();

        order.Status = dto.Status!;
        order.DriverId = dto.DriverId;

        return Ok(await _orderService.UpdateOrder(order));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Order>> DeleteOrder(int id)
    {
        var order = await _orderService.GetOrderById(id);
        if (order == null) return NotFound();

        return Ok(await _orderService.DeleteOrder(order));
    }
}
