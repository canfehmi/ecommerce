using API.Data;
using API.DTO;
using API.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class CartController : ControllerBase
{
    private readonly DataContext _context;

    public CartController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<CartDto>> GetCart()
    {
        return CartToDto(await GetOrCreate(GetCustomerId()));
    }
    [HttpPost]
    public async Task<ActionResult> AddItemToCart(int productId, int quantity)
    {
        var cart = await GetOrCreate(GetCustomerId());
        var product = await _context.Products.FirstOrDefaultAsync(i => i.Id == productId);
        if (product == null) return NotFound("Ürün bulunamadı.");
        cart.AddItem(product, quantity);
        var result = await _context.SaveChangesAsync() > 0;
        if (result) return CreatedAtAction(nameof(GetCart), CartToDto(cart));
        return BadRequest(new ProblemDetails { Title = "Ürün sepete eklenemedi." });
    }

    [HttpDelete]
    public async Task<ActionResult> DeleteItemFromCart(int productId, int quantity)
    {
        var cart = await GetOrCreate(GetCustomerId());
        cart.DeleteItem(productId, quantity);
        var result = await _context.SaveChangesAsync() > 0;
        if (result) return CreatedAtAction(nameof(GetCart), CartToDto(cart));
        return BadRequest(new ProblemDetails { Title = "Ürün silinirken bir hata oluştu." });
    }

    private string GetCustomerId()
    {
        return User.Identity?.Name ?? Request.Cookies["customerId"]!;
    }

    //GetOrCreate Metodu; hem bu controller içerisinde, hem de AccountController içerisinde yazılmıştır.
    //Her ne kadar DRY (Don't Repeat Yourself) ihlal etmiş olsam da bu projedeki ana amacım React kısmını geliştirmektir.
    private async Task<Cart> GetOrCreate(string customerid)
    {
        var cart = await _context.Carts
            .Include(u => u.CartItems)
            .ThenInclude(t => t.Product)
            .Where(w => w.CustomerId == customerid)
            .FirstOrDefaultAsync();
        if (cart == null)
        {
            var customerId = User.Identity?.Name;
            if (string.IsNullOrEmpty(customerId))
            {
                customerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions
                {
                    Expires = DateTime.Now.AddMonths(1),
                    IsEssential = true
                };
                Response.Cookies.Append("customerId", customerId, cookieOptions);
            }
            cart = new Cart
            {
                CustomerId = customerId
            };
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
        }
        return cart;
    }

    private CartDto CartToDto(Cart cart)
    {
        return new CartDto
        {
            CartId = cart.CartId,
            CustomerId = cart.CustomerId,
            CartItems = cart.CartItems.Select(i => new CartItemDto
            {
                ProductId = i.ProductId,
                Name = i.Product.Name,
                Price = i.Product.Price,
                Quantity = i.Quantity,
                ImageUrl = i.Product.ImageUrl
            }).ToList()
        };
    }
}