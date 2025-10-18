using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class SeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Description", "ImageUrl", "IsActive", "Name", "Price", "Stock" },
                values: new object[,]
                {
                    { 1, "Yesyeni bir tshirt modeli", "1.jpeg", true, "Tshirt", 250m, 100 },
                    { 2, "Yesyeni bir şapka modeli", "2.jpeg", true, "Şapka", 50m, 200 },
                    { 3, "Yesyeni bir Pantolon modeli", "3.jpeg", true, "Pantolon", 450m, 300 },
                    { 4, "Yesyeni bir Etek modeli", "4.jpeg", true, "Etek", 350m, 90 },
                    { 5, "Yesyeni bir Bluz modeli", "5.jpeg", true, "Bluz", 150m, 700 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5);
        }
    }
}
