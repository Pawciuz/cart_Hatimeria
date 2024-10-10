namespace backend.Models;

public class CartItemBase
{
    public string Name { get; init; } = string.Empty;
    public decimal Price { get; init; }
    public decimal? OriginalPrice { get; init; }
    public int Quantity { get; init; }
    public List<Dictionary<string, string>> Params { get; init; } = new();
}

public class CartItem : CartItemBase
{
    public string Id { get; init; } = string.Empty;
}