namespace FoodDeliveryApp.API.DTOs;

public class UserResponseDto
{
    public int UserId { get; set; }
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Phone { get; set; } = null!;
    public string UserType { get; set; } = null!;
    public string? Address { get; set; }
    public string? VehicleType { get; set; }
}
