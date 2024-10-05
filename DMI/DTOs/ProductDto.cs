namespace DMI.DTOs;

public class ProductDto
{
   
    public string Name { get; set; }
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public bool IsDiscontinued { get; set; }
    public List<ProductPropertiesDto> Properties { get; set; }
}