using DMI.Controllers;
using DMI.Data;
using DMI.DTOs;
using DMI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace DMI.Tests
{
    public class UpdateProductTest
    {
        private readonly ProductsController _controller;
        private readonly ApplicationDbContext _context;

        public UpdateProductTest()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            _context = new ApplicationDbContext(options);
            _controller = new ProductsController(_context);
        }

        [Fact]
        public void UpdateProduct_ReturnsNoContent_WithValidData()
        {
            // Arrange
            var product = new Product
            {
                Id = 1,
                Name = "Original Product",
                Price = 10.0m,
                Stock = 100,
                IsDiscontinued = false,
                Properties = "Original Properties"
            };

            _context.Products.Add(product);
            _context.SaveChanges();

            var updatedProductDto = new ProductDto
            {
                Name = "Updated Product",
                Price = 20.0m,
                Stock = 200,
                IsDiscontinued = true,
                Properties = "Updated Properties"
            };

            // Act
            var result = _controller.UpdateProduct(product.Id, updatedProductDto);

            // Assert
            Assert.IsType<NoContentResult>(result);

            var updatedProduct = _context.Products.Find(product.Id);
            Assert.NotNull(updatedProduct);
            Assert.Equal(updatedProductDto.Name, updatedProduct.Name);
            Assert.Equal(updatedProductDto.Price, updatedProduct.Price);
            Assert.Equal(updatedProductDto.Stock, updatedProduct.Stock);
            Assert.Equal(updatedProductDto.IsDiscontinued, updatedProduct.IsDiscontinued);
            Assert.Equal(updatedProductDto.Properties, updatedProduct.Properties);
        }
    }
}