namespace FoodDeliveryApp.API.Models;

public class Driver : User
{
    public string VehicleType { get; set; } = null!;
    public double MoneyEarned { get; set; }
    public List<Order> Orders { get; set; } = new List<Order>();
}
