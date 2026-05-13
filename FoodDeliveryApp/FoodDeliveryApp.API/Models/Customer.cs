namespace FoodDeliveryApp.API.Models;

public class Customer : User
{
    public string Address { get; set; } = null!;
    public List<Order> Orders { get; set; } = new List<Order>();
}
