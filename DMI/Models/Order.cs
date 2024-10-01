namespace DMI.Models;

public class Order
{
    public int Id { get; set; }
    public DateTime OrderDate { get; set; }
    public List<OrderEntry> OrderEntries { get; set; }
    public OrderStatus Status { get; set; }
}