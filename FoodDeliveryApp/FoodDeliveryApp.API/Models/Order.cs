namespace FoodDeliveryApp.API.Models;

public class Order
{
    public int OrderId { get; set; }
    public int CustomerId { get; set; }
    public int DriverId { get; set; }
    public int RestaurantId { get; set; }
    public DateTime OrderDate { get; set; }
    public string Status { get; set; }
    public double Total { get; set; }
    public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

}