import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import EyeCursor from "@/components/EyeCursor";
import { Features } from "@/components/Features";

const FeaturesPage = () => {
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
          Features
        </h1>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Discover how Scout empowers visually impaired individuals with shopping independence
        </p>

        <Features />

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-primary mb-6">Ready to Experience Scout?</h2>
          <Button size="lg" className="bg-accent hover:bg-accent/90">
            Pre-order Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;