using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class CreateOrderDto
    {
        public string? FirstName { get; set; }
        public string? Surname { get; set; }
        public string? Phone { get; set; }
        public string? City { get; set; }
        public string? AdressDetail { get; set; }
        public string? CardName { get; set; }
        public string? CardNumber { get; set; }
        public string? CardExpiryYear { get; set; }
        public string? CardExpiryMonth { get; set; }
        public string? CardCvv { get; set; }
    }
}