namespace FoodDeliveryApp.API.Models;

public class OrderItem
{
    public int OrderItemId { get; set; }
    public int OrderId { get; set; }
    public int MenuItemId { get; set; }
    public double UnitPrice { get; set; }
    public int Quantity { get; set; }
}