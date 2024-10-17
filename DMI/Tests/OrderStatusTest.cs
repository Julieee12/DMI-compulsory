using DMI.Controllers;
using DMI.Data;
using DMI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Xunit;

public class OrderStatusTest
{
    private readonly OrdersController _controller;
    private readonly ApplicationDbContext _context;

    public OrderStatusTest()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;

        _context = new ApplicationDbContext(options);
        _controller = new OrdersController(_context);
    }

    [Fact]
    public void UpdateOrderStatus_ReturnsOkResult_WithValidData()
    {
        // Arrange
        var orderStatusPending = new OrderStatus { Id = 1, Status = "Pending" };
        var orderStatusShipped = new OrderStatus { Id = 2, Status = "Shipped" };
        var order = new Order
        {
            Id = 1,
            OrderDate = DateTime.UtcNow,
            DeliveryDate = DateTime.UtcNow.AddDays(5),
            TotalAmount = 100,
            Status = orderStatusPending,
            CustomerId = 1
        };

        _context.OrderStatuses.Add(orderStatusPending);
        _context.OrderStatuses.Add(orderStatusShipped);
        _context.Orders.Add(order);
        _context.SaveChanges();

        // Act
        var result = _controller.UpdateOrderStatus(order.Id, orderStatusShipped.Id);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var updatedOrder = Assert.IsType<Order>(okResult.Value);

        Assert.Equal(order.Id, updatedOrder.Id);
        Assert.Equal(orderStatusShipped.Id, updatedOrder.Status.Id);
        Assert.Equal(orderStatusShipped.Status, updatedOrder.Status.Status);
    }
}