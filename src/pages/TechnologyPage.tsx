import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Eye, Cpu, Mic, Speaker } from "lucide-react";
import EyeCursor from "@/components/EyeCursor";

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
          Discover the cutting-edge technology that powers Scout's ability to assist visually impaired individuals
        </p>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6 animate-fade-up p-8 rounded-lg">
            <div className="flex items-center gap-4">
              <Eye className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold text-primary">YOLO Object Recognition</h2>
            </div>
            <p className="text-gray-600">
              Scout utilizes the state-of-the-art YOLO (You Only Look Once) object detection system, 
              which provides real-time recognition of products with remarkable accuracy. This advanced 
              AI model can identify thousands of different products in milliseconds, making shopping 
              both efficient and reliable.
            </p>
          </div>

          <div className="space-y-6 animate-fade-up p-8 rounded-lg">
            <div className="flex items-center gap-4">
              <Cpu className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold text-primary">Raspberry Pi Processing Unit</h2>
            </div>
            <p className="text-gray-600">
              At the heart of Scout is a powerful Raspberry Pi computer, which processes 
              the video feed and runs our AI algorithms. This compact yet capable unit 
              ensures Scout can perform complex computations while remaining portable 
              and energy-efficient.
            </p>
          </div>

          <div className="space-y-6 animate-fade-up p-8 rounded-lg">
            <div className="flex items-center gap-4">
              <Mic className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold text-primary">High-Fidelity Audio System</h2>
            </div>
            <p className="text-gray-600">
              Scout features a premium microphone for clear voice commands and a 
              high-quality speaker for crisp audio feedback. The audio system uses 
              advanced noise cancellation to ensure clear communication even in busy 
              shopping environments. Users can easily interact with Scout through 
              voice commands and receive clear, detailed audio descriptions of 
              products and their surroundings.
            </p>
          </div>

          <div className="space-y-6 animate-fade-up p-8 rounded-lg">
            <div className="flex items-center gap-4">
              <Speaker className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold text-primary">How It All Works Together</h2>
            </div>
            <p className="text-gray-600">
              When you point Scout at a product, the camera captures the image and 
              sends it to the Raspberry Pi. The YOLO model quickly identifies the 
              product, and the system provides immediate audio feedback through the 
              speaker. Voice commands are picked up by the microphone, processed by 
              our natural language understanding system, and Scout responds accordingly. 
              This seamless integration of technologies creates a fluid, intuitive 
              shopping experience.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-primary mb-6">Experience the Future of Shopping Assistance</h2>
          <Button size="lg" className="bg-accent hover:bg-accent/90">
            Pre-order Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TechnologyPage;