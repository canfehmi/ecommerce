using Microsoft.AspNetCore.Identity;

namespace API.Entity;

public static class SeedDatabase
{
    public static async void Initialize(IApplicationBuilder app)
    {
        var userManager = app.ApplicationServices
            .CreateScope()
            .ServiceProvider
            .GetRequiredService<UserManager<AppUser>>();

        var roleManager = app.ApplicationServices
            .CreateScope()
            .ServiceProvider
            .GetRequiredService<RoleManager<AppRole>>();

        if (!roleManager.Roles.Any())
        {
            var customer = new AppRole { Name = "Customer" };
            var admin = new AppRole { Name = "Admin" };
            await roleManager.CreateAsync(customer);
            await roleManager.CreateAsync(admin);
        }

        if (!userManager.Users.Any())
        {
            var customer = new AppUser { Name = "Süleyman Demirel", UserName = "demirel", Email = "suleymandemirel@gmail.com" };
            var admin = new AppUser { Name = "Kenan Evren", UserName = "evren", Email = "kenanevren@gmail.com" };

            await userManager.CreateAsync(customer, "Demirel123.");
            await userManager.AddToRoleAsync(customer, "Customer");
            await userManager.CreateAsync(admin, "Evren123.");
            await userManager.AddToRoleAsync(admin, "Admin");
        }
    }
}