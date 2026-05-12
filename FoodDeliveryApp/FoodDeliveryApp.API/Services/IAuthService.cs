using FoodDeliveryApp.API.DTOs;

public interface IAuthService
{
    Task<string?> LoginAsync(LoginDTO dto);

    Task<string?> RegisterAsync(RegisterDTO dto);
}