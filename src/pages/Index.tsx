import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import EyeCursor from "@/components/EyeCursor";

const Index = () => {
  return (
    <div className="min-h-screen">
      <EyeCursor />
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            <div className="text-xl font-bold text-primary">Scout</div>
            <div className="space-x-4">
              <Link to="/features">
                <Button variant="ghost">Features</Button>
              </Link>
              <Button className="bg-accent hover:bg-accent/90">Pre-order</Button>
            </div>
          </nav>
        </div>
      </header>
      
      <main className="pt-16">
        <Hero />
        <Features />
        
        <section className="py-20 bg-primary text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience Shopping Independence?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Pre-order Scout today and be among the first to transform your shopping experience.
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Pre-order Now
            </Button>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Scout</h3>
              <p className="opacity-70">
                Empowering visually impaired people with shopping independence.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <p className="opacity-70">Email: info@scoutdevice.com</p>
              <p className="opacity-70">Phone: (555) 123-4567</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Follow Us</h3>
              <div className="space-x-4">
                <a href="#" className="opacity-70 hover:opacity-100">Twitter</a>
                <a href="#" className="opacity-70 hover:opacity-100">LinkedIn</a>
                <a href="#" className="opacity-70 hover:opacity-100">Instagram</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center opacity-70">
            <p>&copy; {new Date().getFullYear()} Scout. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;