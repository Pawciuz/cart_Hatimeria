using backend.Models;
using backend.Services;

namespace backend.Controllers;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class CartController : ControllerBase
{
    private readonly CartService _cartService = new();

    [HttpGet]
    public IActionResult GetCart()
    {
        var items = _cartService.GetCartItems();
        return Ok(items);
    }

    [HttpPost]
    public IActionResult AddItem([FromBody] CartItemBase item)
    {
        var addedItem = _cartService.AddItem(item);
        return Ok(addedItem);
    }

    [HttpDelete("{id}")]
    public IActionResult RemoveItem(string id)
    {
        _cartService.RemoveItem(id);
        return Ok("Item "+id+" removed from cart.");
    }
}
