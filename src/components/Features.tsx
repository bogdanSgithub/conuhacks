import { Camera, ShoppingCart, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Advanced Object Recognition",
    description: "Identifies products and their relative positions quickly",
    icon: Camera,
  },
  {
    title: "Product Finding",
    description: "Helps locate specific items on shelves quickly",
    icon: ShoppingCart,
  },
  {
    title: "Smart AI Technology",
    description: "Speech recognition enables voice commands for managing shopping lists",
    icon: Sparkles,
  },
];

export const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
          Key Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="animate-fade-up border-primary/10 transform transition-all duration-500 hover:scale-105 hover:-translate-y-2" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <feature.icon className="w-12 h-12 text-primary mb-4 transform transition-all duration-300 hover:rotate-12" />
                <CardTitle className="text-primary">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-secondary-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};