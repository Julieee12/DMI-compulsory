using DMI.Controllers;
using DMI.Data;
using DMI.DTOs;
using DMI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Xunit;

public class CustomerControllerTests
{
    private readonly CustomersController _controller;
    private readonly ApplicationDbContext _context;

    public CustomerControllerTests()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;

        _context = new ApplicationDbContext(options);
        _controller = new CustomersController(_context);
    }

    [Fact]
    public void CreateCustomer_ReturnsCreatedResult_WithValidData()
    {
        // Arrange
        var customerDto = new CustomerDto
        {
            Name = "John Doe",
            Email = "john@example.com",
            Phone = 4567890,
            Address = "123 Main St"
        };

        // Act
        var result = _controller.CreateCustomer(customerDto);

        // Assert
        var createdResult = Assert.IsType<CreatedAtActionResult>(result.Result);
        var returnedCustomer = Assert.IsType<CustomerDto>(createdResult.Value);

        Assert.Equal(customerDto.Name, returnedCustomer.Name);
        Assert.Equal(customerDto.Email, returnedCustomer.Email);
        Assert.Equal(customerDto.Phone, returnedCustomer.Phone);
        Assert.Equal(customerDto.Address, returnedCustomer.Address);

        var customerInDb = _context.Customers.FirstOrDefault(c => c.Email == customerDto.Email);
        Assert.NotNull(customerInDb);
        Assert.Equal(customerDto.Name, customerInDb.Name);
        Assert.Equal(customerDto.Email, customerInDb.Email);
        Assert.Equal(customerDto.Phone, customerInDb.Phone);
        Assert.Equal(customerDto.Address, customerInDb.Address);
    }
}