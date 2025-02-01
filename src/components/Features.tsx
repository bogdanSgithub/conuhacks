import { Camera, Navigation, ShoppingCart, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Advanced Object Recognition",
    description: "Instantly identifies products and reads labels accurately",
    icon: Camera,
  },
  {
    title: "Navigation Assistance",
    description: "Guides users through stores with precise directions",
    icon: Navigation,
  },
  {
    title: "Product Finding",
    description: "Helps locate specific items on shelves quickly",
    icon: ShoppingCart,
  },
  {
    title: "Smart AI Technology",
    description: "Learns user preferences for better recommendations",
    icon: Sparkles,
  },
];

export const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
          Key Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={feature.title} className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <feature.icon className="w-12 h-12 text-accent mb-4" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-secondary">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};