namespace FoodDeliveryApp.API.Models;

public class Restaurant
{
    public int RestaurantId { get; set; }
    public string Name { get; set; } = null!;
    public string Address { get; set; } = null!;
    public string Phone { get; set; } = null!;
    public List<MenuItem> MenuItems { get; set; } = new List<MenuItem>();
    public List<Order> Orders { get; set; } = new List<Order>();
}
