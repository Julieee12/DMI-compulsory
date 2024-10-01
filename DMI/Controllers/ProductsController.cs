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

    [HttpGet]
    public ActionResult<IEnumerable<ProductDto>> GetProducts([FromQuery] string search, [FromQuery] string filter, [FromQuery] string orderBy)
    {
        var products = _context.Products.Include(p => p.Properties).AsQueryable();

        if (!string.IsNullOrEmpty(search))
        {
            products = products.Where(p => p.Name.Contains(search) || p.Description.Contains(search));
        }

        if (!string.IsNullOrEmpty(filter))
        {
            products = products.Where(p => p.Properties.Any(pp => pp.Name == filter));
        }

        if (!string.IsNullOrEmpty(orderBy))
        {
            products = orderBy switch
            {
                "price" => products.OrderBy(p => p.Price),
                "name" => products.OrderBy(p => p.Name),
                _ => products
            };
        }

        var productDtos = products.Select(p => new ProductDto
        {
            Id = p.Id,
            Name = p.Name,
            Description = p.Description,
            Price = p.Price,
            Stock = p.Stock,
            IsDiscontinued = p.IsDiscontinued,
            Properties = p.Properties.Select(pp => new ProductPropertiesDto
            {
                Id = pp.Id,
                Name = pp.Name
            }).ToList()
        }).ToList();

        return Ok(productDtos);
    }

    [HttpPost]
    public ActionResult<ProductDto> CreateProduct(ProductDto productDto)
    {
        var product = new Product
        {
            Name = productDto.Name,
            Description = productDto.Description,
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