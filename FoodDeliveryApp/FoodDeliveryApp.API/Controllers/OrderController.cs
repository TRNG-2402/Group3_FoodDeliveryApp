
using FoodDeliveryApp.API.Models;
using FoodDeliveryApp.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace FoodDeliveryApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
   private readonly IOrderService _orderService;

   public OrderController(IOrderService orderService)
   {
      _orderService = orderService;
   }

   // Nathan update this file and remove this comment
   [HttpGet]
   async public Task<ActionResult<List<Order>>> GetAllOrders() => 
      await _orderService.GetAllOrders();
   
}
