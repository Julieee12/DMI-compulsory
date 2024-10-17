using DMI.Controllers;
using DMI.Data;
using DMI.DTOs;
using DMI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace DMI.Tests
{
    public class ProductCreationTest
    {
        private readonly ProductsController _controller;
        private readonly ApplicationDbContext _context;

        public ProductCreationTest()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            _context = new ApplicationDbContext(options);
            _controller = new ProductsController(_context);
        }

        [Fact]
        public void CreateProduct_ReturnsCreatedResult_WithValidData()
        {
            // Arrange
            var productDto = new ProductDto
            {
                Name = "New Product",
                Price = 15.0m,
                Stock = 50,
                IsDiscontinued = false,
                Properties = "New Properties"
            };

            // Act
            var result = _controller.CreateProduct(productDto);

            // Assert
            var createdResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var returnedProduct = Assert.IsType<ProductDto>(createdResult.Value);

            Assert.Equal(productDto.Name, returnedProduct.Name);
            Assert.Equal(productDto.Price, returnedProduct.Price);
            Assert.Equal(productDto.Stock, returnedProduct.Stock);
            Assert.Equal(productDto.IsDiscontinued, returnedProduct.IsDiscontinued);
            Assert.Equal(productDto.Properties, returnedProduct.Properties);

            var productInDb = _context.Products.FirstOrDefault(p => p.Name == productDto.Name);
            Assert.NotNull(productInDb);
            Assert.Equal(productDto.Name, productInDb.Name);
            Assert.Equal(productDto.Price, productInDb.Price);
            Assert.Equal(productDto.Stock, productInDb.Stock);
            Assert.Equal(productDto.IsDiscontinued, productInDb.IsDiscontinued);
            Assert.Equal(productDto.Properties, productInDb.Properties);
        }
    }
}