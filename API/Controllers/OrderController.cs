using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Entity;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly DataContext _context;

        public OrderController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("GetOrders")]
        public async Task<ActionResult<List<OrderDto>>> GetOrders()
        {
            return await _context.Orders
                    .Include(u => u.OrderItems)
                    .OrderToDto()
                    .Where(x => x.CustomerId == User.Identity!.Name)
                    .ToListAsync();
        }
        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<ActionResult<OrderDto?>> GetOrder(int id)
        {
            return await _context.Orders
                    .Include(u => u.OrderItems)
                    .OrderToDto()
                    .Where(x => x.CustomerId == User.Identity!.Name && x.Id == id)
                    .FirstOrDefaultAsync();
        }

        [HttpPost("CreateOrder")]
        public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto dto)
        {
            var cart = await _context.Carts.Include(i => i.CartItems)
                .ThenInclude(x => x.Product)
                .Where(u => u.CustomerId == User.Identity!.Name)
                .FirstOrDefaultAsync();

            if (cart == null) return BadRequest(new ProblemDetails { Title = "Sepet getirilirken hata oluştu" });

            var items = new List<OrderItem>();
            foreach (var item in cart.CartItems)
            {
                var product = await _context.Products.FindAsync(item.ProductId);
                var orderItem = new OrderItem
                {
                    ProductId = product!.Id,
                    ProductName = product.Name!,
                    ProductImage = product.ImageUrl!,
                    Price = product.Price,
                    Quantity = item.Quantity
                };
                items.Add(orderItem);
                product.Stock -= item.Quantity;
            }

            var subTotal = items.Sum(i => i.Price * i.Quantity);
            var deliveryPrice = 0;

            var order = new Order
            {
                OrderItems = items,
                CustomerId = User.Identity!.Name,
                FirstName = dto.FirstName,
                Surname = dto.Surname,
                Phone = dto.Phone,
                City = dto.City,
                AdressDetail = dto.AdressDetail,
                SubTotal = subTotal,
                DeliveryPrice = deliveryPrice
            };
            _context.Add(order);
            _context.Carts.Remove(cart);
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order.Id);

            return BadRequest(new ProblemDetails { Title = "Sipariş aşamasında bir hata oluştu" });
        }
    }
}