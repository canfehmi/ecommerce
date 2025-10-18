using API.Entity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<Product> Products => Set<Product>();
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Product>().HasData(
            new List<Product>
            {
                new Product { Id=1, Name="Tshirt", Description="Yesyeni bir tshirt modeli", Price=250,Stock=100,ImageUrl="1.jpeg",IsActive=true},
                new Product { Id=2, Name="Şapka", Description="Yesyeni bir şapka modeli", Price=50,Stock=200,ImageUrl="2.jpeg",IsActive=true},
                new Product { Id=3, Name="Pantolon", Description="Yesyeni bir Pantolon modeli", Price=450,Stock=300,ImageUrl="3.jpeg",IsActive=true},
                new Product { Id=4, Name="Etek", Description="Yesyeni bir Etek modeli", Price=350,Stock=90,ImageUrl="4.jpeg",IsActive=true},
                new Product { Id=5, Name="Bluz", Description="Yesyeni bir Bluz modeli", Price=150,Stock=700,ImageUrl="5.jpeg",IsActive=true}
            }
        );
    }
}