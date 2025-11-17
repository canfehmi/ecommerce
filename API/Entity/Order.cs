namespace API.Entity
{
    public class Order
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
        public decimal TotalPrice() { return SubTotal + DeliveryPrice; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public List<OrderItem> OrderItems { get; set; } = new();
        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
        public string? ConversationId { get; set; }
        public string? BasketId { get; set; }
    }

    public class OrderItem
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; } = null!;
        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;
        public string ProductName { get; set; } = null!;
        public string ProductImage { get; set; } = null!;
        public decimal Price { get; set; }
        public int Quantity { get; set; }

    }

    public enum OrderStatus
    {
        Pending,
        Approved,
        PaymentFailed,
        Completed
    }
}