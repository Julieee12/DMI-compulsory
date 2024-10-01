namespace DMI.Models;

public class ProductProperties
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int ProductId { get; set; }
    public Product Product { get; set; }
}