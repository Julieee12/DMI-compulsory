using DMI.Controllers;
using DMI.Data;
using DMI.DTOs;
using DMI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace DMI.Tests
{
    public class OrderHistoryTest
    {
        private readonly OrdersController _controller;
        private readonly ApplicationDbContext _context;

        public OrderHistoryTest()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            _context = new ApplicationDbContext(options);
            _controller = new OrdersController(_context);
        }

        [Fact]
        public void GetOrders_ReturnsOkResult_WithOrderHistory()
        {
            // Arrange
            var orderStatus = new OrderStatus { Id = 1, Status = "Pending" };
            var customer = new Customer
            {
                Id = 1,
                Name = "John Doe",
                Address = "123 Main St",
                Email = "john@example.com",
                Phone = 4567890
            };
            var order1 = new Order
            {
                Id = 1,
                OrderDate = DateTime.UtcNow,
                DeliveryDate = DateTime.UtcNow.AddDays(5),
                TotalAmount = 100,
                Status = orderStatus,
                CustomerId = customer.Id,
                Customer = customer,
                OrderEntries = new List<OrderEntry>()
            };
            var order2 = new Order
            {
                Id = 2,
                OrderDate = DateTime.UtcNow,
                DeliveryDate = DateTime.UtcNow.AddDays(10),
                TotalAmount = 200,
                Status = orderStatus,
                CustomerId = customer.Id,
                Customer = customer,
                OrderEntries = new List<OrderEntry>()
            };

            _context.OrderStatuses.Add(orderStatus);
            _context.Customers.Add(customer);
            _context.Orders.AddRange(order1, order2);
            _context.SaveChanges();

            // Act
            var result = _controller.GetOrders();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var orders = Assert.IsType<List<OrderDto>>(okResult.Value);

            Assert.Equal(2, orders.Count);
            Assert.Contains(orders, o => o.Id == order1.Id);
            Assert.Contains(orders, o => o.Id == order2.Id);
        }
    }
}