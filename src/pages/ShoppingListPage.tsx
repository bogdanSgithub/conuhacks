import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import EyeCursor from "@/components/EyeCursor";

interface ProductModel {
  id: string;
  name: string;
  quantity: number;
  img: string;
}

const ShoppingListPage = () => {
  const [items, setItems] = useState<ProductModel[]>([]);
  const [newItem, setNewItem] = useState("");
  const [newQuantity, setNewQuantity] = useState(1);
  const { logout } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const savedItems = localStorage.getItem("shoppingList");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(items));
  }, [items]);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.trim()) {
      const newProduct: ProductModel = {
        id: crypto.randomUUID(),
        name: newItem.trim(),
        quantity: newQuantity,
        img: "/placeholder.svg", // Default placeholder image
      };
      setItems([...items, newProduct]);
      setNewItem("");
      setNewQuantity(1);
      toast({
        title: "Item Added",
        description: `${newItem} has been added to your shopping list.`,
      });
    }
  };

  const handleRemoveItem = (id: string) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    toast({
      title: "Item Removed",
      description: "Item has been removed from your shopping list.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">My Shopping List</h1>
          <div className="flex items-center gap-4">
            <EyeCursor />
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleAddItem} className="flex gap-4 mb-6">
            <Input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add new item..."
              className="flex-1"
            />
            <Input
              type="number"
              value={newQuantity}
              onChange={(e) => setNewQuantity(parseInt(e.target.value) || 1)}
              min="1"
              className="w-24"
            />
            <Button type="submit">Add Item</Button>
          </form>

          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg animate-fade-up"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      Qty: {item.quantity}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveItem(item.id)}
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