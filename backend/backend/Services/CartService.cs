using backend.Models;
using System.Text.Json;
using System.Net;
using Newtonsoft.Json;

namespace backend.Services;

public class CartService
{
    private readonly string _filePath = Path.Combine(AppContext.BaseDirectory, "Utils", "cart.json");
    


    public List<CartItem> GetCartItems()
    {
        try
        {
            if (!File.Exists(_filePath))
                throw new FileNotFoundException("Cart file not found.");

            var jsonData = File.ReadAllText(_filePath);
            
            return JsonConvert.DeserializeObject<List<CartItem>>(jsonData) ?? new List<CartItem>();
        }
        catch (FileNotFoundException ex)
        {
            throw new HttpResponseException(HttpStatusCode.NotFound, ex.Message);
        }
        catch
        {
            throw new HttpResponseException(HttpStatusCode.InternalServerError, "Error occurred while fetching cart items.");
        }
    }

    private async void SaveCartItems(List<CartItem> items)
    {
        try
        {
            var jsonData = JsonConvert.SerializeObject(items);
            await File.WriteAllTextAsync(_filePath, jsonData);
        }
        catch
        {
            throw new HttpResponseException(HttpStatusCode.InternalServerError, "Error occurred while saving cart items.");
        }
    }

    public CartItem AddItem(CartItemBase itemWithoutId)
    {
        try
        {
            var items = GetCartItems();
            
            string newId;
            if (items.Count > 0)
            {
                var maxId = items.Max(i => int.Parse(i.Id));
                newId = (maxId + 1).ToString();
            }
            else
            {
                newId = "1";
            }
            
            var newItem = new CartItem
            {
                Id = newId,
                Name = itemWithoutId.Name,
                Price = itemWithoutId.Price,
                OriginalPrice = itemWithoutId.OriginalPrice,
                Quantity = itemWithoutId.Quantity,
                Params = itemWithoutId.Params
            };
            
            items.Add(newItem);
            SaveCartItems(items);

            return newItem;
        }
        catch
        {
            throw new HttpResponseException(HttpStatusCode.InternalServerError, "Error occurred while adding the item.");
        }
    }

    public void RemoveItem(string id)
    {
        try
        {
            var items = GetCartItems();
            var itemToRemove = items.FirstOrDefault(x => x.Id == id);

            if (itemToRemove == null)
                throw new HttpResponseException(HttpStatusCode.NotFound, $"Item with ID {id} not found.");

            items.Remove(itemToRemove);
            SaveCartItems(items);
        }
        catch (HttpResponseException)
        {
            throw; 
        }
        catch
        {
            throw new HttpResponseException(HttpStatusCode.InternalServerError, "Error occurred while removing the item.");
        }
    }
}


