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
        public DbSet<ProductProperties> ProductProperties { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Product-ProductProperty relationship
            // modelBuilder.Entity<Product>()
            //     .HasMany(p => p.Properties)
            //     .WithOne(pp => pp.Product)
            //     .HasForeignKey(pp => pp.ProductId);

            // Order-OrderEntry relationship
            modelBuilder.Entity<Order>()
                .HasMany(o => o.OrderEntries)
                .WithOne(oe => oe.Order)
                .HasForeignKey(oe => oe.OrderId);

            // OrderEntry-Product relationship
            modelBuilder.Entity<OrderEntry>()
                .HasOne(oe => oe.Product)
                .WithMany()
                .HasForeignKey(oe => oe.ProductId);

            // Customer-Order relationship
            modelBuilder.Entity<Customer>()
                .HasMany(c => c.Orders)
                .WithOne(o => o.Customer)
                .HasForeignKey(o => o.CustomerId);

            // Order-OrderStatus relationship
            modelBuilder.Entity<Order>()
                .HasOne(o => o.Status)
                .WithMany()
                .HasForeignKey(o => o.OrderStatusId);
        }
    }
}