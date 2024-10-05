// File: DMI/Controllers/ProductsController.cs
using DMI.Data;
using Microsoft.AspNetCore.Mvc;
using DMI.DTOs;
using DMI.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DMI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ProductsController(ApplicationDbContext context)
    {
        _context = context;
    }

    //GET all products
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
    {
        var products = await _context.Products
            .Include(p => p.Properties)
            .Select(p => new ProductDto
            {
           
                Name = p.Name,
                Price = p.Price,
                Stock = p.Stock,
                IsDiscontinued = p.IsDiscontinued,
                Properties = p.Properties
                
            }

        return Ok(products);
    }
    
    
    

       

    [HttpPost]
    public ActionResult<ProductDto> CreateProduct(ProductDto productDto)
    {
        var product = new Product
        {
            Name = productDto.Name,
            Price = productDto.Price,
            Stock = productDto.Stock,
            IsDiscontinued = productDto.IsDiscontinued,
            Properties = productDto.Properties.Select(pp => new ProductProperties
            {
                Name = pp.Name
            }).ToList()
        };

        _context.Products.Add(product);
        _context.SaveChanges();

        return CreatedAtAction(nameof(GetProducts), new { id = product.Id }, productDto);
    }

    [HttpPut("{id}/discontinue")]
    public ActionResult DiscontinueProduct(int id)
    {
        var product = _context.Products.Find(id);
        if (product == null)
        {
            return NotFound();
        }

        product.IsDiscontinued = true;
        _context.SaveChanges();

        return NoContent();
    }

    [HttpPut("{id}/restock")]
    public ActionResult RestockProduct(int id, [FromBody] int quantity)
    {
        var product = _context.Products.Find(id);
        if (product == null)
        {
            return NotFound();
        }

        product.Stock += quantity;
        _context.SaveChanges();

        return NoContent();
    }

    [HttpPost("{id}/properties")]
    public ActionResult AddProductProperty(int id, [FromBody] ProductPropertiesDto propertiesDto)
    {
        var product = _context.Products.Include(p => p.Properties).FirstOrDefault(p => p.Id == id);
        if (product == null)
        {
            return NotFound();
        }

        var property = new ProductProperties
        {
            Name = propertiesDto.Name,
            ProductId = id
        };

        product.Properties.Add(property);
        _context.SaveChanges();

        return CreatedAtAction(nameof(GetProducts), new { id = product.Id }, propertiesDto);
    }

    // Additional CRUD operations for products
}