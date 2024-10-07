using DMI.Data;
using Microsoft.AspNetCore.Mvc;
using DMI.DTOs;
using DMI.Models;

namespace DMI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private static List<Order> _orders = new List<Order>();
    
    private readonly ApplicationDbContext _context;

    public OrdersController(ApplicationDbContext context)
    {
        _context = context;
    }

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
    public ActionResult<OrderDto> PlaceOrder(CreateOrderDto dto)
    {
        // Map the DTO to the model based on information in the DTO
        var order = new Order
        {
            OrderDate =  DateTime.UtcNow,
            DeliveryDate = DateTime.SpecifyKind(dto.DeliveryDate, DateTimeKind.Utc),
            OrderEntries = dto.OrderEntries.Select(oe => new OrderEntry
            {
                ProductId = oe.ProductId, // TODO: Validate that the ProductId exists
                Quantity = oe.Quantity // TODO: Validate that the Quantity is positive
            }).ToList(),
            CustomerId = dto.CustomerId
        };
        
        var pendingStatusId = _context.OrderStatuses.FirstOrDefault(os => os.Status == "Pending");
        order.Status = pendingStatusId;
        
        // Calculate the total amount based on the Product Ids and quantities in the OrderEntries
        var productsInOrder = order.OrderEntries.Select(oe => _context.Products.FirstOrDefault(p => p.Id == oe.ProductId));
        // Calculate the total amount based on the Product prices and quantities
        order.TotalAmount = (int)productsInOrder.Select((p, i) => p.Price * order.OrderEntries[i].Quantity).Sum();
        
        _context.Orders.Add(order);
        _context.OrderEntry.AddRange(order.OrderEntries); // Reference to the Order is set automatically (?)
        _context.SaveChanges();
        
        return CreatedAtAction(nameof(GetOrders), new { id = order.Id }, new OrderDto
        {
            Id = order.Id,
            OrderDate = order.OrderDate,
            DeliveryDate = order.DeliveryDate,
            TotalAmount = order.TotalAmount,
            OrderEntries = order.OrderEntries.Select(oe => new OrderEntryDto
            {
                Id = oe.Id,
                ProductId = oe.ProductId,
                OrderId = oe.OrderId,
                Quantity = oe.Quantity
            }).ToList(),
            Status = new OrderStatusDto
            {
                Id = order.Status.Id,
                Status = order.Status.Status
            },
            CustomerId = order.CustomerId
        });
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