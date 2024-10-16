// File: Service.Tests/OrderTests.cs
using Xunit;
using DMI.Data;
using DMI.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

public class OrderTests
{
    private readonly ApplicationDbContext _context;

    public OrderTests()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;
        _context = new ApplicationDbContext(options);
    }

    [Fact]
    public void PlaceOrder_ShouldAddOrderToDatabase()
    {
        var customer = new Customer { Name = "John Doe", Email = "john@example.com" };
        _context.Customers.Add(customer);
        _context.SaveChanges();

        var product = new Product { Name = "Product1", Price = 10.0m, Stock = 100 };
        _context.Products.Add(product);
        _context.SaveChanges();

        var order = new Order
        {
            CustomerId = customer.Id,
            OrderDate = DateTime.Now,
            OrderEntries = new List<OrderEntry>
            {
                new OrderEntry { ProductId = product.Id, Quantity = 2 }
            }
        };

        _context.Orders.Add(order);
        _context.SaveChanges();

        Assert.Equal(1, _context.Orders.Count());
        Assert.Equal(2, _context.OrderEntries.First().Quantity);
    }
}