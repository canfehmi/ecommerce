using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entity;

namespace API.DTO
{
    public class OrderDto
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? Surname { get; set; }
        public string? Phone { get; set; }
        public string? City { get; set; }
        public string? AdressDetail { get; set; }
        public string? CustomerId { get; set; }
        public decimal SubTotal { get; set; }
        public decimal DeliveryPrice { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public List<OrderItemDto> OrderItems { get; set; } = new();
        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
    }

    public class OrderItemDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; } = null!;
        public string ProductImage { get; set; } = null!;
        public decimal Price { get; set; }
        public int Quantity { get; set; }

    }
}