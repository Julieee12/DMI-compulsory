using DMI.Data;
using Microsoft.AspNetCore.Mvc;
using DMI.DTOs;
using DMI.Models;

namespace DMI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public OrdersController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public ActionResult<IEnumerable<OrderDto>> GetOrders()
    {
        var orderDtos = _context.Orders.Select(o => new OrderDto
        {
            Id = o.Id,
            CustomerId = o.CustomerId,
            TotalAmount = o.TotalAmount,
            DeliveryDate = o.DeliveryDate,
            Status = new OrderStatusDto
            {
                Id = o.Status.Id,
                Status = o.Status.Status
            },
            
            //TODO maybe add custumer name
            
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
    public ActionResult UpdateOrderStatus([FromRoute] int id, [FromBody] int statusId)
    {
        var order = _context.Orders.FirstOrDefault(o => o.Id == id);
        if (order == null)
        {
            return NotFound();
        }

        var status = _context.OrderStatuses.FirstOrDefault(os => os.Id == statusId);
        if (status == null)
        {
            return NotFound();
        }

        order.Status = status;
        _context.SaveChanges();
        return Ok(order);
    }

    [HttpGet("customer/{customerId}")]
    public ActionResult<IEnumerable<OrderDto>> GetOrdersForCustomer(int customerId)
    {
        var orderDtos = _context.Orders.Where(o => o.CustomerId == customerId).Select(o => new OrderDto
        {
            Id = o.Id,
            OrderDate = o.OrderDate,
            DeliveryDate = o.DeliveryDate,
            TotalAmount = o.TotalAmount,
            OrderEntries = o.OrderEntries.Select(oe => new OrderEntryDto
            {
                Id = oe.Id,
                ProductId = oe.ProductId,
                OrderId = oe.OrderId,
                Quantity = oe.Quantity
            }).ToList(),
            Status = new OrderStatusDto
            {
                Id = o.Status.Id,
                Status = o.Status.Status
            },
            CustomerId = o.CustomerId
        }).ToList();

        return Ok(orderDtos);
    }
}