namespace DMI.DTOs;

public class OrderDto
{
    public int Id { get; set; }
    public DateTime OrderDate { get; set; }
    public List<OrderEntryDto> OrderEntries { get; set; }
}