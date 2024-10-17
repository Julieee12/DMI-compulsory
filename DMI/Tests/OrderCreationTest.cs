﻿using DMI.Controllers;
using DMI.Data;
using DMI.DTOs;
using DMI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

public class OrderCreationTest
{
    private readonly OrdersController _controller;
    private readonly ApplicationDbContext _context;

    public OrderCreationTest()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;

        _context = new ApplicationDbContext(options);
        _controller = new OrdersController(_context);
    }

    [Fact]
    public void PlaceOrder_ReturnsCreatedResult_WithValidData()
    {
        // Arrange
        var customerId = 1;
        var orderStatus = new OrderStatus { Id = 1, Status = "Pending" };
        var product = new Product
        {
            Id = 1,
            Name = "Very paper",
            Price = 50,
            Stock = 100,
            IsDiscontinued = false,
            Properties = "Eggshell White"
        };

        _context.Products.Add(product);
        _context.OrderStatuses.Add(orderStatus);
        _context.SaveChanges();

        var deliveryDate = DateTime.UtcNow.AddDays(5);

        var dto = new CreateOrderDto
        {
            CustomerId = customerId,
            DeliveryDate = deliveryDate,
            OrderEntries = new List<CreateOrderEntryDto>
            {
                new CreateOrderEntryDto { ProductId = product.Id, Quantity = 2 }
            }
        };

        // Act
        var result = _controller.PlaceOrder(dto);

        // Assert
        var createdResult = Assert.IsType<CreatedAtActionResult>(result.Result);
        var returnedOrder = Assert.IsType<OrderDto>(createdResult.Value);

        Assert.Equal(1, returnedOrder.Id); // The Id should be auto-generated by EF Core
        Assert.Equal(customerId, returnedOrder.CustomerId);
        Assert.Equal(100, returnedOrder.TotalAmount); // 2 * 50 = 100
        Assert.Single(returnedOrder.OrderEntries);
        Assert.Equal(product.Id, returnedOrder.OrderEntries.First().ProductId);
        Assert.Equal("Pending", returnedOrder.Status.Status);
    }
}