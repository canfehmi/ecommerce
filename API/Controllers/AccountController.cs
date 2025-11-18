using API.Data;
using API.DTO;
using API.Entity;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly TokenService _tokenService;
    private readonly DataContext _context;

    public AccountController(UserManager<AppUser> userManager, TokenService tokenService, DataContext context)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _context = context;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto model)
    {
        var user = await _userManager.FindByNameAsync(model.UserName);

        if (user == null)
        {
            return BadRequest(new ProblemDetails { Title = "Kullanıcı Adı Hatalı" });
        }

        var result = await _userManager.CheckPasswordAsync(user, model.Password);

        if (result)
        {
            var userCart = await GetOrCreate(model.UserName);
            var cookieCart = await GetOrCreate(Request.Cookies["customerId"]!);
            if (userCart != null)
            {
                foreach (var item in userCart.CartItems)
                {
                    cookieCart.AddItem(item.Product, item.Quantity);
                }
                _context.Carts.Remove(userCart);
            }

            cookieCart.CustomerId = model.UserName;
            await _context.SaveChangesAsync();
            return Ok(new UserDto { Name = user.Name!, Token = await _tokenService.GenerateToken(user) });
        }

        return Unauthorized();
    }

    [HttpPost("register")]
    public async Task<IActionResult> CreateUser(RegisterDto model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = new AppUser
        {
            Email = model.Email,
            Name = model.Name,
            UserName = model.UserName
        };

        var result = await _userManager.CreateAsync(user, model.Password);

        if (result.Succeeded)
        {
            await _userManager.AddToRoleAsync(user, "Customer");
            return StatusCode(201);
        }

        return BadRequest(result.Errors);
    }
    [Authorize]
    [HttpGet("getuser")]
    public async Task<ActionResult<UserDto>> GetUser()
    {
        var user = await _userManager.FindByNameAsync(User.Identity?.Name!);

        if (user == null)
        {
            return BadRequest(new ProblemDetails { Title = "Kullanıcı Bulunamadı." });
        }

        return new UserDto
        {
            Name = user.Name!,
            Token = await _tokenService.GenerateToken(user)
        };
    }

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
}