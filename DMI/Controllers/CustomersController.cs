using Microsoft.AspNetCore.Mvc;
using DMI.DTOs;
using DMI.Models;

namespace DMI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{
    private static List<Customer> _customers = new List<Customer>();

    [HttpGet("{id}/orders")]
    public ActionResult<IEnumerable<OrderDto>> GetCustomerOrders(int id)
    {
        var customer = _customers.FirstOrDefault(c => c.Id == id);
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

    // Additional CRUD operations for customers
}