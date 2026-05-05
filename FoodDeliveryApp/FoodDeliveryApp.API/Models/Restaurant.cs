namespace FoodDeliveryApp.API.Models;

public class Restaurant
{
    public int RestaurantId { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public string Phone { get; set; }
    public List<MenuItem> MenuItems { get; set; } = new List<MenuItem>();
}