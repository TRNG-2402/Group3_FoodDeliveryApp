namespace FoodDeliveryApp.API.DTOs;

public class CreateMenuItemDto
{
    public int RestaurantId { get; set; }
    public string Name { get; set; }
    public double Price { get; set; }
    public string Description { get; set; }
    public string ImageURL { get; set; }
}

public class UpdateMenuItemDto
{
    public string Name { get; set; }
    public double Price { get; set; }
    public string Description { get; set; }
    public string ImageURL { get; set; }
}
