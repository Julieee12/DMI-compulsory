using DMI.Data;
using Microsoft.AspNetCore.Mvc;
using DMI.DTOs;
using DMI.Models;

namespace DMI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private static List<Product> _products = new List<Product>();
    
    private readonly ApplicationDbContext _context;

    [HttpGet]
    public ActionResult<IEnumerable<ProductDto>> GetProducts([FromQuery] string search, [FromQuery] string filter, [FromQuery] string orderBy)
    {
        var products = _products.AsQueryable();

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
            Properties = p.Properties.Select(pp => new ProductPropertyDto
            {
                Id = pp.Id,
                Name = pp.Name,
                Value = pp.Value
            }).ToList()
        }).ToList();

        return Ok(productDtos);
    }

    [HttpPost]
    public ActionResult<ProductDto> CreateProduct(ProductDto productDto)
    {
        var product = new Product
        {
            Id = _products.Count + 1,
            Name = productDto.Name,
            Description = productDto.Description,
            Price = productDto.Price,
            Stock = productDto.Stock,
            IsDiscontinued = productDto.IsDiscontinued,
            Properties = productDto.Properties.Select(pp => new ProductProperty
            {
                Id = pp.Id,
                Name = pp.Name,
                Value = pp.Value
            }).ToList()
        };

        _products.Add(product);
        return CreatedAtAction(nameof(GetProducts), new { id = product.Id }, productDto);
    }

    [HttpPut("{id}/discontinue")]
    public ActionResult DiscontinueProduct(int id)
    {
        var product = _products.FirstOrDefault(p => p.Id == id);
        if (product == null)
        {
            return NotFound();
        }

        product.IsDiscontinued = true;
        return NoContent();
    }

    [HttpPut("{id}/restock")]
    public ActionResult RestockProduct(int id, [FromBody] int quantity)
    {
        var product = _products.FirstOrDefault(p => p.Id == id);
        if (product == null)
        {
            return NotFound();
        }

        product.Stock += quantity;
        return NoContent();
    }

    [HttpPost("{id}/properties")]
    public ActionResult AddProductProperty(int id, [FromBody] ProductPropertyDto propertyDto)
    {
        var product = _products.FirstOrDefault(p => p.Id == id);
        if (product == null)
        {
            return NotFound();
        }

        var property = new ProductProperty
        {
            Id = product.Properties.Count + 1,
            Name = propertyDto.Name,
            Value = propertyDto.Value,
            ProductId = id
        };

        product.Properties.Add(property);
        return CreatedAtAction(nameof(GetProducts), new { id = product.Id }, propertyDto);
    }

    // Additional CRUD operations for products
}