import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import EyeCursor from "@/components/EyeCursor";

const ShoppingListPage = () => {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");
  const { logout } = useAuth();
  const { toast } = useToast();

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