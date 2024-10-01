namespace DMI.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string Description { get; set; }
    public int Stock { get; set; }
    public bool IsDiscontinued { get; set; }
    public List<ProductProperties> Properties { get; set; }
}