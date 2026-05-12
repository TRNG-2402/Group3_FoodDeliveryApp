namespace FoodDeliveryApp.API.DTOs;

public class RegisterDTO
{
    public string? Name { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Password { get; set; }

    // Customer or Driver
    public string? UserType { get; set; }

    // Customer only
    public string? Address { get; set; }

    // Driver only
    public string? VehicleType { get; set; }
}