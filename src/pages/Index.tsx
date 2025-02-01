import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Features } from "@/components/Features";
import EyeCursor from "@/components/EyeCursor";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <EyeCursor />
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">Scout</Link>
          <div className="space-x-4">
            <Link to="/technology" className="text-gray-600 hover:text-primary">Technology</Link>
            <Link to="/login" className="text-gray-600 hover:text-primary">Login</Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4">
        <section className="py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
            Your Smart Shopping Assistant
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Scout helps visually impaired individuals navigate stores and find products independently
          </p>
          <Button size="lg" className="gap-2">
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Button>
        </section>

        <Features />

        <section className="py-20 text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Ready to Transform Your Shopping Experience?
          </h2>
          <Button size="lg" className="bg-accent hover:bg-accent/90">
            Pre-order Now
          </Button>
        </section>
      </main>
    </div>
  );
};

export default Index;