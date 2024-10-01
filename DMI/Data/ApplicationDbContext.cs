// File: DMI/Data/ApplicationDbContext.cs
using Microsoft.EntityFrameworkCore;
using DMI.Models;

namespace DMI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<OrderStatus> OrderStatuses { get; set; }
        public DbSet<ProductProperty> ProductProperties { get; set; }
    }
}