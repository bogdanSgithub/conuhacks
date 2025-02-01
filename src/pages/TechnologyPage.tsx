import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import EyeCursor from "@/components/EyeCursor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu, Camera, Mic, Radio } from "lucide-react";

const technologies = [
  {
    title: "YOLO Object Recognition",
    description: "Advanced real-time object detection using YOLOv8, capable of identifying products with 98% accuracy in various lighting conditions.",
    icon: Camera,
  },
  {
    title: "Raspberry Pi Processing",
    description: "Powered by Raspberry Pi 4 with 8GB RAM, enabling fast local processing and real-time response without cloud dependency.",
    icon: Cpu,
  },
  {
    title: "Voice Recognition",
    description: "High-fidelity microphone array with noise cancellation for clear voice command recognition in busy store environments.",
    icon: Mic,
  },
  {
    title: "Wireless Connectivity",
    description: "Dual-band Wi-Fi and Bluetooth 5.0 for seamless connection to smartphones and store networks.",
    icon: Radio,
  },
];

const TechnologyPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <EyeCursor />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 text-center">
          Technology Behind Scout
        </h1>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Discover the cutting-edge technology that powers Scout's ability to assist visually impaired shoppers
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {technologies.map((tech, index) => (
            <Card 
              key={tech.title} 
              className="animate-fade-up border-primary/10 transform transition-all duration-500 hover:scale-105" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <tech.icon className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="text-primary">{tech.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-secondary-foreground">{tech.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gray-50 p-8 rounded-lg mb-16">
          <h2 className="text-2xl font-bold text-primary mb-4">Technical Specifications</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• Processing Unit: Raspberry Pi 4 Model B (8GB RAM)</li>
            <li>• Camera: 12MP Sony IMX477 sensor with wide-angle lens</li>
            <li>• Audio: MEMs microphone array with noise cancellation</li>
            <li>• Battery: 5000mAh rechargeable lithium-ion</li>
            <li>• Connectivity: Wi-Fi 5 (802.11ac) and Bluetooth 5.0</li>
            <li>• Weight: 250g</li>
            <li>• Dimensions: 12cm x 8cm x 3cm</li>
          </ul>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-6">Experience the Future of Assisted Shopping</h2>
          <Button size="lg" className="bg-accent hover:bg-accent/90">
            Pre-order Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TechnologyPage;