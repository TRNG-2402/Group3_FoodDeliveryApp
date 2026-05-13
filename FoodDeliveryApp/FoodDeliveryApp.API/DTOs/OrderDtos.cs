namespace FoodDeliveryApp.API.DTOs;

public class CreateOrderDto
{
    public int CustomerId { get; set; }
    public int RestaurantId { get; set; }
    public List<CreateOrderItemDto> Items { get; set; } = new List<CreateOrderItemDto>();
}

public class CreateOrderItemDto
{
    public int MenuItemId { get; set; }
    public int Quantity { get; set; }
    public double UnitPrice { get; set; }
}

public class UpdateOrderDto
{
    public string? Status { get; set; }
    public int DriverId { get; set; }
}
