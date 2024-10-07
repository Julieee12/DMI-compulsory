using DMI.Models;

namespace DMI.DTOs;

public class CreateOrderDto
{
    //public int Id { get; set; } Assigned upon creation
    //public DateTime OrderDate { get; set; } // Possibly left out and assigned upon creation on backend
    public DateTime DeliveryDate { get; set; }
    //public int TotalAmount { get; set; } Calculated on backend
    public List<CreateOrderEntryDto> OrderEntries { get; set; }
    public int CustomerId { get; set; }
}