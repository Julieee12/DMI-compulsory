using DMI.Data;
using DMI.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace DMI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderStatusController : ControllerBase
{ 
    private readonly ApplicationDbContext _context;
    
    public OrderStatusController(ApplicationDbContext context)
    {
        _context = context;
        
    }
    
    [HttpGet]  
    public ActionResult<IEnumerable<OrderStatusDto>> GetOrderStatuses()
    {
        return Ok(_context.OrderStatuses);
    }
    

}