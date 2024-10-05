using DMI.Data;
using Microsoft.AspNetCore.Mvc;
using DMI.DTOs;
using DMI.Models;

namespace DMI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    [HttpGet("{id}/orders")]
    public ActionResult<IEnumerable<OrderDto>> GetCustomerOrders(int id)
    {
        var customer = _context.Customers.FirstOrDefault(product => product.Id == id);
        if (customer == null)
        {
            return NotFound();
        }

        var orderDtos = customer.Orders.Select(o => new OrderDto
        {
            Id = o.Id,
            OrderDate = o.OrderDate,
            OrderEntries = o.OrderEntries.Select(oe => new OrderEntryDto
            {
                Id = oe.Id,
                ProductId = oe.ProductId,
                Quantity = oe.Quantity
            }).ToList()
        }).ToList();

        return Ok(orderDtos);
    }
    [HttpGet]  
    public ActionResult<IEnumerable<CustomerDto>> GetCustomers()
    {
        return Ok(_context.Customers);
    }
    [HttpPost]
    public ActionResult<CustomerDto> CreateCustomer(CustomerDto customerDto)
    {
        var customer = new Customer
        {
            Name = customerDto.Name,
            Email = customerDto.Email,
            Phone = customerDto.Phone,
            Address = customerDto.Address
        };

        _context.Add(customer);
        _context.SaveChanges();
        

        return CreatedAtAction(nameof(GetCustomers), new { id = customer.Id }, customerDto);
    }
    
    public CustomersController(ApplicationDbContext context)
    {
        _context = context;
    }
}