namespace FoodDeliveryApp.API.DTOs;

public class CreateRestaurantDto
{
    public string? Name { get; set; }
    public string? Address { get; set; }
    public string? Phone { get; set; }
}

public class UpdateRestaurantDto
{
    public string? Name { get; set; }
    public string? Address { get; set; }
    public string? Phone { get; set; }
}
