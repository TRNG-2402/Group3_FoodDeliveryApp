using Microsoft.EntityFrameworkCore;
using FoodDeliveryApp.API.Models;

public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Driver> Drivers { get; set; }

    public DbSet<Restaurant> Restaurants { get; set; }
    public DbSet<MenuItem> MenuItems { get; set; }

    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        //Inheritance
        modelBuilder.Entity<User>()
            .HasDiscriminator<string>("UserType")
            .HasValue<Customer>("Customer")
            .HasValue<Driver>("Driver");

        //Relationships
        //Customer to Orders
        modelBuilder.Entity<Customer>()
            .HasMany(c => c.Orders)
            .WithOne()
            .HasForeignKey(o => o.CustomerId)
            .OnDelete(DeleteBehavior.Restrict);
        
        //Driver to Orders
        modelBuilder.Entity<Driver>()
            .HasMany(d => d.Orders)
            .WithOne()
            .HasForeignKey(o => o.DriverId)
            .OnDelete(DeleteBehavior.Restrict);
        
        //Restaurant to Orders
        modelBuilder.Entity<Restaurant>()
            .HasMany(r => r.Orders)
            .WithOne()
            .HasForeignKey(o => o.RestaurantId)
            .OnDelete(DeleteBehavior.Restrict);

        //Restaurant to MenuItems
        modelBuilder.Entity<Restaurant>()
            .HasMany(r => r.MenuItems)
            .WithOne()
            .HasForeignKey(m => m.RestaurantId);

        //Order to OrderItems
        modelBuilder.Entity<Order>()
            .HasMany(o => o.OrderItems)
            .WithOne()
            .HasForeignKey(oi => oi.OrderId);

        //Some constraints
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();
    }
}