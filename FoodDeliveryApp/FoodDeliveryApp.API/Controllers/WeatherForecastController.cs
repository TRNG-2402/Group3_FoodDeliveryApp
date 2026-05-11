using Microsoft.AspNetCore.Mvc;

namespace FoodDeliveryApp.API.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    WeatherForecastController()
    {
        // Delete this file.
        Console.WriteLine("Test API");
    }
}
