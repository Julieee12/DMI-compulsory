namespace DMI.DTOs;

public class CustomerDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public List<OrderDto> Orders { get; set; }
}