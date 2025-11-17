using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Entity;
using API.Extensions;
using Iyzipay;
using Iyzipay.Model;
using Iyzipay.Request;
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
        private readonly IConfiguration _config;

        public OrderController(DataContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
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

            var items = new List<Entity.OrderItem>();
            foreach (var item in cart.CartItems)
            {
                var product = await _context.Products.FindAsync(item.ProductId);
                var orderItem = new Entity.OrderItem
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

            var paymentResult = await ProcessPayment(dto, cart);

            if (paymentResult.Status == "failure")
            {
                return BadRequest(new ProblemDetails { Title = paymentResult.ErrorMessage });
            }

            order.ConversationId = paymentResult.ConversationId;
            order.BasketId = paymentResult.BasketId;

            _context.Add(order);
            _context.Carts.Remove(cart);
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order.Id);

            return BadRequest(new ProblemDetails { Title = "Sipariş aşamasında bir hata oluştu" });
        }

        private async Task<Payment> ProcessPayment(CreateOrderDto dto, Cart cart)
        {
            Options options = new Options();
            options.ApiKey = _config["PaymentSettings:APIKey"];
            options.SecretKey = _config["PaymentSettings:SecretKey"];
            options.BaseUrl = "https://sandbox-api.iyzipay.com";

            CreatePaymentRequest request = new CreatePaymentRequest();
            request.Locale = Locale.TR.ToString();
            request.ConversationId = Guid.NewGuid().ToString();
            request.Price = cart.CalculateTotal().ToString();
            request.PaidPrice = cart.CalculatePaidTotal().ToString();
            request.Currency = Currency.TRY.ToString();
            request.Installment = 1;
            request.BasketId = cart.CartId.ToString();
            request.PaymentChannel = PaymentChannel.WEB.ToString();
            request.PaymentGroup = PaymentGroup.PRODUCT.ToString();

            PaymentCard paymentCard = new PaymentCard();
            paymentCard.CardHolderName = dto.CardName;
            paymentCard.CardNumber = dto.CardNumber;
            paymentCard.ExpireMonth = dto.CardExpiryMonth;
            paymentCard.ExpireYear = dto.CardExpiryYear;
            paymentCard.Cvc = dto.CardCvv;
            paymentCard.RegisterCard = 0;
            request.PaymentCard = paymentCard;

            Buyer buyer = new Buyer();
            buyer.Id = "BY789";
            buyer.Name = dto.FirstName;
            buyer.Surname = dto.Surname;
            buyer.GsmNumber = dto.Phone;
            buyer.Email = "email@email.com";
            buyer.IdentityNumber = "74300864791";
            buyer.LastLoginDate = "2015-10-05 12:43:35";
            buyer.RegistrationDate = "2013-04-21 15:12:09";
            buyer.RegistrationAddress = dto.AdressDetail;
            buyer.Ip = "85.34.78.112";
            buyer.City = dto.City;
            buyer.Country = "Türkiye";
            buyer.ZipCode = "34732";
            request.Buyer = buyer;

            Address shippingAddress = new Address();
            shippingAddress.ContactName = dto.FirstName + " " + dto.Surname;
            shippingAddress.City = dto.City;
            shippingAddress.Country = "Türkiye";
            shippingAddress.Description = dto.AdressDetail;
            shippingAddress.ZipCode = "34742";
            request.ShippingAddress = shippingAddress;

            request.BillingAddress = shippingAddress;

            List<BasketItem> basketItems = new List<BasketItem>();

            foreach (var item in cart.CartItems)
            {
                BasketItem basketItem = new BasketItem();
                basketItem.Id = item.ProductId.ToString();
                basketItem.Name = item.Product.Name;
                basketItem.Category1 = "Tekstil";
                basketItem.ItemType = BasketItemType.PHYSICAL.ToString();
                basketItem.Price = ((double)item.Product.Price * item.Quantity).ToString();
                basketItems.Add(basketItem);
            }

            request.BasketItems = basketItems;
            return await Payment.Create(request, options);
        }
    }
}