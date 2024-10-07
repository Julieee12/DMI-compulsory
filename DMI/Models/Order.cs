namespace DMI.Models;

public class Order
{
    public int Id { get; set; }
    
    public DateTime OrderDate { get; set; }
    public DateTime DeliveryDate { get; set; }
    public int TotalAmount { get; set; }
    public List<OrderEntry> OrderEntries { get; set; }
    public OrderStatus Status { get; set; }
    public int OrderStatusId { get; set; }

    public Customer Customer { get; set; }

    public int CustomerId { get; set; }
}