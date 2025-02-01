import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import EyeCursor from "@/components/EyeCursor";
import { searchProducts } from "@/lib/mockApi";
import type { Product } from "@/lib/mockApi";

const ShoppingListPage = () => {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { logout } = useAuth();
  const { toast } = useToast();

  // Load items from localStorage when component mounts
  useEffect(() => {
    const savedItems = localStorage.getItem("shoppingList");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(items));
  }, [items]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setIsSearching(true);
      try {
        const results = await searchProducts(query);
        setSearchResults(results);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to search products",
        });
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.trim()) {
      setItems([...items, newItem.trim()]);
      setNewItem("");
      toast({
        title: "Item Added",
        description: `${newItem} has been added to your shopping list.`,
      });
    }
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    toast({
      title: "Item Removed",
      description: "Item has been removed from your shopping list.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <EyeCursor />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">My Shopping List</h1>
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Search Products</h2>
            <Input
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search for products..."
              className="mb-4"
            />
            {isSearching ? (
              <p>Searching...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-md mb-2"
                    />
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-gray-600">{product.price}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => {
                        setItems([...items, product.name]);
                        toast({
                          title: "Item Added",
                          description: `${product.name} has been added to your shopping list.`,
                        });
                      }}
                    >
                      Add to List
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={handleAddItem} className="flex gap-4 mb-6">
            <Input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add new item..."
              className="flex-1"
            />
            <Button type="submit">Add Item</Button>
          </form>

          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <span>{item}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </Button>
              </div>
            ))}
            {items.length === 0 && (
              <p className="text-center text-gray-500">
                Your shopping list is empty. Add some items!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingListPage;