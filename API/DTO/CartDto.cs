namespace API.DTO;

public class CartDto
{
    public int CartId { get; set; }
    public string? CustomerId { get; set; }
    public List<CartItemDto> CartItems { get; set; } = new();
}
public class CartItemDto
{
    public int ProductId { get; set; }
    public string? Name { get; set; }
    public decimal Price { get; set; }
    public string? ImageUrl { get; set; }
    public int Quantity { get; set; }
}