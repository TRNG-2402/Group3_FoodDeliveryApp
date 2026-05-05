namespace FoodDeliveryApp.API.Models;

public class MenuItem
{
    public int MenuItemId { get; set; }
    public int RestaurantId { get; set; }
    public string Name { get; set; }
    public double Price { get; set; }
    public string Description { get; set; }
    public string ImageURL { get; set; }

}