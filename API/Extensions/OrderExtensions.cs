using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Entity;

namespace API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDto> OrderToDto(this IQueryable<Order> query)
        {
            return query.Select(i => new OrderDto
            {
                Id = i.Id,
                AdressDetail = i.AdressDetail,
                City = i.City,
                CustomerId = i.CustomerId,
                DeliveryPrice = i.DeliveryPrice,
                FirstName = i.FirstName,
                Phone = i.Phone,
                Surname = i.Surname,
                OrderDate = i.OrderDate,
                OrderStatus = i.OrderStatus,
                SubTotal = i.SubTotal,
                OrderItems = i.OrderItems.Select(item => new OrderItemDto
                {
                    Id = item.Id,
                    ProductName = item.ProductName,
                    ProductId = item.ProductId,
                    Price = item.Price,
                    ProductImage = item.ProductImage,
                    Quantity = item.Quantity
                }).ToList()
            });
        }
    }
}