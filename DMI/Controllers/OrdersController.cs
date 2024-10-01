using Microsoft.AspNetCore.Mvc;
using DMI.DTOs;
using DMI.Models;

namespace DMI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private static List<Order> _orders = new List<Order>();

    [HttpGet]
    public ActionResult<IEnumerable<OrderDto>> GetOrders()
    {
        var orderDtos = _orders.Select(o => new OrderDto
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

    [HttpPost]
    public ActionResult<OrderDto> PlaceOrder(OrderDto orderDto)
    {
        var order = new Order
        {
            Id = _orders.Count + 1,
            OrderDate = orderDto.OrderDate,
            OrderEntries = orderDto.OrderEntries.Select(oe => new OrderEntry
            {
                Id = oe.Id,
                ProductId = oe.ProductId,
                Quantity = oe.Quantity
            }).ToList(),
            Status = new OrderStatus { Id = 1, Status = "Pending" } // Default status
        };

        _orders.Add(order);
        return CreatedAtAction(nameof(GetOrders), new { id = order.Id }, orderDto);
    }

    [HttpPut("{id}/status")]
    public ActionResult UpdateOrderStatus(int id, OrderStatusDto statusDto)
    {
        var order = _orders.FirstOrDefault(o => o.Id == id);
        if (order == null)
        {
            return NotFound();
        }

        order.Status = new OrderStatus { Id = statusDto.Id, Status = statusDto.Status };
        return NoContent();
    }

    // Additional CRUD operations for orders
}