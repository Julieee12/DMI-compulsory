namespace DMI.DTOs;

public class OrderDto
{
    public int Id { get; set; }
    public DateTime OrderDate { get; set; }
    public DateTime DeliveryDate { get; set; }
    public int TotalAmount { get; set; }
    public List<OrderEntryDto> OrderEntries { get; set; }
    public OrderStatusDto Status { get; set; }

    public int CustomerId { get; set; }
}